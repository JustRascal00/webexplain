// src/components/SplitPaneLayout.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SplitPaneLayoutProps {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
}

export const SplitPaneLayout = ({ leftPane, rightPane }: SplitPaneLayoutProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const splitPaneRef = useRef<HTMLDivElement>(null);

  const startResize = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  const resize = (e: MouseEvent) => {
    if (isResizing && splitPaneRef.current) {
      const splitPane = splitPaneRef.current;
      const splitPaneRect = splitPane.getBoundingClientRect();
      const newPosition = ((e.clientX - splitPaneRect.left) / splitPaneRect.width) * 100;
      
      // Limit the minimum and maximum split positions
      const limitedPosition = Math.min(Math.max(newPosition, 20), 80);
      setSplitPosition(limitedPosition);
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    }

    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  const [isLeftPaneCollapsed, setIsLeftPaneCollapsed] = useState(false);

  const toggleLeftPane = () => {
    setIsLeftPaneCollapsed(!isLeftPaneCollapsed);
    if (isLeftPaneCollapsed) {
      setSplitPosition(50); // Restore to default position
    }
  };

  return (
    <div 
      ref={splitPaneRef}
      className="flex h-screen overflow-hidden bg-zinc-900"
    >
      {/* Left Pane */}
      <div 
        style={{ 
          width: isLeftPaneCollapsed ? '0%' : `${splitPosition}%`,
          transition: isResizing ? 'none' : 'width 0.3s ease'
        }}
        className="relative overflow-auto"
      >
        {leftPane}
      </div>

      {/* Resizer */}
      <div
        onMouseDown={startResize}
        className={`relative w-1 bg-zinc-700 cursor-col-resize hover:bg-blue-500 active:bg-blue-600 ${
          isLeftPaneCollapsed ? 'hidden' : ''
        }`}
      >
        <button
          onClick={toggleLeftPane}
          className="absolute top-4 -left-3 z-10 p-1 bg-zinc-800 rounded-full hover:bg-zinc-700"
        >
          {isLeftPaneCollapsed ? (
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-zinc-400" />
          )}
        </button>
      </div>

      {/* Right Pane */}
      <div 
        style={{ 
          width: isLeftPaneCollapsed ? '100%' : `${100 - splitPosition}%`,
          transition: isResizing ? 'none' : 'width 0.3s ease'
        }}
        className="overflow-auto"
      >
        {rightPane}
      </div>
    </div>
  );
};