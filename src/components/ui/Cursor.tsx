import React, { useEffect, useRef, useState } from 'react';

export const Cursor: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const ring = ringRef.current;
    if (!ring) return;

    const onMove = (e: PointerEvent) => {
      if (!active) setActive(true);
      ring.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion, active]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full border border-[#087E8B]/45 pointer-events-none z-50 transition-opacity duration-200 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
