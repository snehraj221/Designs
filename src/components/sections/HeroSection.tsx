import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ChapterId } from '../../lib/archiveLogic';

export interface HeroSectionProps {
  onNavigateChapter: (chapter: ChapterId) => void;
  onResetRotation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateChapter,
}) => {
  return (
    <section
      id="chapter-hero"
      aria-label="Chapter 01: The Entry"
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 md:px-14 max-w-[1440px] mx-auto pointer-events-none"
    >
      {/* Minimal Editorial Kicker */}
      <div className="text-xs font-mono tracking-[0.2em] text-[#525D6B]">
        01 · THE ENTRY
      </div>

      {/* Asymmetric Left-Anchored Editorial Composition (Right 55% is pure 3D negative space) */}
      <div className="my-auto max-w-xl bg-[#F6F5F0]/85 lg:bg-transparent p-6 lg:p-0 pointer-events-auto">
        <h1
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] text-[#0F141A] mb-6"
          style={{ textWrap: 'balance' }}
        >
          THE FUTURE
          <br />
          <span className="text-[#087E8B]">HAS A FORM.</span>
        </h1>

        <p className="font-sans text-base md:text-lg text-[#525D6B] max-w-md leading-relaxed mb-10">
          An experimental archive of objects, ideas and technologies from
          possible futures.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={() => onNavigateChapter('archive')}
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0F141A] text-[#FFFFFF] font-mono text-xs font-medium tracking-[0.16em] hover:bg-[#087E8B] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>EXPLORE THE ARCHIVE</span>
            <ArrowDownRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigateChapter('philosophy')}
            className="px-4 py-3.5 text-xs font-mono tracking-[0.16em] text-[#525D6B] hover:text-[#0F141A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            DISCOVER OUR THINKING
          </button>
        </div>
      </div>

      {/* Quiet Bottom Horizon Line */}
      <div className="flex items-center justify-between border-t border-black/10 pt-5 text-xs font-mono text-[#525D6B] pointer-events-auto">
        <span>DRAG TO ROTATE 3D FORM</span>
        <button
          type="button"
          onClick={() => onNavigateChapter('archive')}
          className="text-[#0F141A] hover:text-[#087E8B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          SCROLL TO ARCHIVE ↓
        </button>
      </div>
    </section>
  );
};
