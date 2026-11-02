import React from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { ChapterId } from '../../lib/archiveLogic';
import { ObjectId } from '../../data/objects';

export interface FinalSectionProps {
  onNavigateChapter: (chapter: ChapterId) => void;
  onInspectObject: (id: ObjectId) => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({
  onNavigateChapter,
}) => {
  return (
    <section
      id="chapter-final"
      aria-label="Chapter 06: The Final Transmission"
      className="relative min-h-screen w-full pt-32 pb-12 px-6 md:px-14 max-w-[1440px] mx-auto flex flex-col justify-between pointer-events-none"
    >
      <div className="text-xs font-mono tracking-[0.2em] text-[#525D6B]">
        06 · THE FINAL TRANSMISSION
      </div>

      {/* Central Closing Statement */}
      <div className="my-auto py-16 flex flex-col items-center text-center max-w-2xl mx-auto pointer-events-auto">
        <h2
          className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-[#0F141A] leading-[0.98] mb-5"
          style={{ textWrap: 'balance' }}
        >
          THE NEXT CHAPTER
          <br />
          <span className="text-[#525D6B]">HASN&apos;T BEEN WRITTEN.</span>
        </h2>
        <p className="font-serif-editorial italic text-2xl md:text-3xl text-[#525D6B] mb-10">
          &ldquo;Perhaps it begins with what we imagine today.&rdquo;
        </p>

        <button
          type="button"
          onClick={() => onNavigateChapter('archive')}
          className="inline-flex items-center gap-3 px-7 py-4 bg-[#0F141A] text-[#FFFFFF] font-mono text-xs font-medium tracking-[0.18em] hover:bg-[#087E8B] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer"
        >
          <ArrowUpLeft className="w-4 h-4" />
          <span>RE-ENTER THE ARCHIVE</span>
        </button>
      </div>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-black/10 pt-8 pointer-events-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono tracking-[0.16em] text-[#525D6B]">
          <div>
            <span className="text-[#0F141A] font-semibold">
              TOMORROW//OBJECTS
            </span>{' '}
            · A SPECULATIVE DIGITAL EXPERIENCE.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigateChapter('archive')}
              className="hover:text-[#087E8B] transition-colors cursor-pointer"
            >
              ARCHIVE
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigateChapter('timeline')}
              className="hover:text-[#087E8B] transition-colors cursor-pointer"
            >
              TIMELINE
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigateChapter('philosophy')}
              className="hover:text-[#087E8B] transition-colors cursor-pointer"
            >
              PHILOSOPHY
            </button>
          </div>

          <div className="tabular-nums">2026 — EXPERIMENTAL CONCEPT</div>
        </div>
      </footer>
    </section>
  );
};
