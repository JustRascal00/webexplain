// src/components/WebpageViewer.tsx
"use client";

import DOMPurify from 'dompurify';

interface WebpageViewerProps {
  content: string;
  url: string;
}

export const WebpageViewer = ({ content, url }: WebpageViewerProps) => {
  // Extract only the main content from Wikipedia pages
  const extractMainContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // For Wikipedia, get the main content
    const mainContent = doc.querySelector('#mw-content-text');
    if (mainContent) {
      return mainContent.innerHTML;
    }
    
    return htmlContent;
  };

  const sanitizedContent = DOMPurify.sanitize(extractMainContent(content));

  return (
    <div className="bg-white text-black dark:bg-zinc-800 dark:text-white min-h-full">
      <div className="p-4">
        <div className="mb-4 p-2 bg-zinc-700 rounded-md">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            {url}
          </a>
        </div>
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
        />
      </div>
    </div>
  );
};