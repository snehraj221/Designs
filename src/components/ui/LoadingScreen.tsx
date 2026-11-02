import React, { useEffect, useState } from 'react';
import { getLoadingStageText } from '../../lib/archiveLogic';

export interface LoadingScreenProps {
  webglReady: boolean;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  webglReady,
  onComplete,
}) => {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const cap = webglReady ? 100 : 85;
        if (prev >= cap) return prev;
        const step = webglReady ? 18 : 9;
        return Math.min(cap, prev + step);
      });
    }, 90);

    return () => window.clearInterval(interval);
  }, [webglReady]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = window.setTimeout(() => {
        onComplete();
      }, 280);
      return () => window.clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const stageLabel = getLoadingStageText(progress);

  return (
    <div
      role="region"
      aria-label="Exhibition Loading Experience"
      data-testid="loading-screen"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F6F5F0] text-[#0F141A] p-8 md:p-14 select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-[#525D6B]">
          CURATORIAL ARCHIVE · 2030—2045
        </span>
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 text-xs font-mono tracking-[0.16em] text-[#0F141A] border border-black/20 hover:border-[#087E8B] hover:text-[#087E8B] transition-colors rounded-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087E8B] cursor-pointer"
        >
          SKIP INTRO
        </button>
      </div>

      {/* Central Geometric Point of Light & Developing Form */}
      <div className="my-auto flex flex-col items-center text-center max-w-xl mx-auto">
        <div className="relative w-44 h-44 mb-10 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border border-[#087E8B]/40 transition-transform duration-500"
            style={{
              transform: `scale(${0.4 + (progress / 100) * 0.6}) rotate(${progress * 1.8}deg)`,
            }}
          />
          <div
            className="absolute inset-4 rounded-full border border-[#9A6F28]/45 transition-transform duration-500"
            style={{
              transform: `scale(${0.3 + (progress / 100) * 0.7}) rotate(-${progress * 1.2}deg)`,
            }}
          />
          <div
            className="w-3.5 h-3.5 rounded-full bg-[#087E8B] shadow-[0_0_24px_rgba(8,126,139,0.5)] transition-transform duration-300"
            style={{
              transform: `scale(${0.6 + (progress / 100) * 0.8})`,
            }}
          />
        </div>

        <h1 className="font-display text-2xl md:text-4xl font-semibold tracking-[0.22em] text-[#0F141A] mb-3">
          TOMORROW//OBJECTS
        </h1>
        <p className="font-mono text-xs md:text-sm tracking-[0.24em] text-[#525D6B]">
          A MUSEUM OF POSSIBLE FUTURES.
        </p>
      </div>

      {/* Bottom Progress Readout */}
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between text-xs font-mono tracking-[0.14em] text-[#525D6B] mb-2">
          <span>{stageLabel}</span>
          <span className="tabular-nums text-[#087E8B] font-medium">
            {progress}%
          </span>
        </div>
        <div className="h-[2px] w-full bg-black/10 overflow-hidden">
          <div
            className="h-full bg-[#087E8B] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
