import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const maxDuration = 300; // Set max duration to 300 seconds (5 minutes)

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();

    if (!messages || !sessionId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const lastMessage = messages[messages.length - 1].content;

    const response = await ragChat.chat(lastMessage, { 
      streaming: true, 
      sessionId,
      config: {
        temperature: 0.7,
        max_tokens: 1000, // Increase max tokens
        presence_penalty: 0.6,
        frequency_penalty: 0.6
      }
    });

    return aiUseChatAdapter(response);
  } catch (error) {
    console.error('Chat stream error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};