'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('a, button, input, select, textarea, [data-interactive="true"]');
        setIsPointer(!!isInteractive);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const followCursor = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };
    animationFrameId = requestAnimationFrame(followCursor);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Inner Dot */}
      <div
        className={`fixed w-3 h-3 rounded-full bg-dental-blue transition-transform duration-75 ease-out shadow-[0_0_12px_#0F9DFF] ${
          isPointer ? 'scale-150 bg-dental-mint shadow-[0_0_15px_#00C9A7]' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Outer Glow Halo */}
      <div
        className={`fixed rounded-full border border-dental-blue/40 bg-dental-blue/5 backdrop-blur-xs transition-all duration-200 ${
          isPointer ? 'w-12 h-12 border-dental-mint/60 bg-dental-mint/10' : 'w-9 h-9'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
