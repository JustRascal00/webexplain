import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

async function fetchWebPageContent(url: string) {
  try {
    const validUrl = new URL(url);
    const response = await fetch(validUrl.toString(), {
      // Add headers to mimic a browser request
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch webpage: ${response.statusText}`);
    }
    
    const content = await response.text();
    return content;
  } catch (error) {
    console.error('Error fetching webpage:', error);
    throw error;
  }
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) => decodeURIComponent(component));
  const rawUrl = decodedComponents.join("/");
  
  if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    return `https://${rawUrl}`;
  }
  
  return rawUrl;
}

const Page = async ({ params }: PageProps) => {
  const sessionCookie = cookies().get("sessionId")?.value;
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });
  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "");

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);
  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId });

  if (!isAlreadyIndexed) {
    try {
      const content = await fetchWebPageContent(reconstructedUrl);
      
      // Split content into smaller chunks if it's too large
      const chunkSize = 4000; // Adjust this value based on your needs
      const chunks = [];
      
      for (let i = 0; i < content.length; i += chunkSize) {
        chunks.push(content.slice(i, i + chunkSize));
      }

      // Add each chunk to the context
      for (const chunk of chunks) {
        await ragChat.context.add({
          type: "text",
          data: chunk
        });
      }

      await redis.sadd("indexed-urls", reconstructedUrl);
    } catch (error) {
      console.error('Error processing webpage:', error);
    }
  }

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default Page;