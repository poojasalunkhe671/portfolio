import React, { useState, useCallback, useMemo } from 'react';

interface MinimapProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scrollProgress: number;
}

export const Minimap: React.FC<MinimapProps> = ({ scrollRef, scrollProgress }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateScroll(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const updateScroll = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (!scrollRef.current) return;
    
    const track = e.currentTarget as HTMLElement;
    const rect = track.getBoundingClientRect();
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    
    // We want the center of the viewport indicator to be where the mouse is
    // So percentage is calculated based on the center of the viewport
    const percentage = y / rect.height;
    
    const target = scrollRef.current;
    target.scrollTop = percentage * (target.scrollHeight - target.clientHeight);
  }, [scrollRef]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isDragging) {
      updateScroll(e);
    }
  }, [isDragging, updateScroll]);

  // Generate fake lines that vaguely look like code
  const lines = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => {
      const width = 10 + Math.random() * 80;
      const color = Math.random() > 0.8 ? 'bg-ide-keyword' : Math.random() > 0.6 ? 'bg-ide-string' : 'bg-ide-muted';
      const indent = Math.random() > 0.7 ? 6 : Math.random() > 0.4 ? 2 : 0;
      return { width, color, indent, id: i };
    });
  }, []);

  return (
    <div 
      className="hidden lg:block w-[60px] bg-ide-bg border-l border-ide-border relative shrink-0 cursor-pointer overflow-hidden touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      title="Minimap (Drag to scroll)"
    >
      <div className="absolute inset-0 p-1 flex flex-col justify-between opacity-40 pointer-events-none">
        {lines.map((line) => (
          <div 
            key={line.id} 
            className={`h-0.5 rounded ${line.color}`} 
            style={{ width: `${line.width}%`, marginLeft: `${line.indent}px` }} 
          />
        ))}
      </div>
      
      {/* Viewport Indicator */}
      <div 
        className="absolute left-0 right-0 bg-white/10 hover:bg-white/20 border border-white/20 transition-colors pointer-events-none"
        style={{ 
          height: '15%', 
          top: `${scrollProgress * 85}%` 
        }}
      />
    </div>
  );
};
