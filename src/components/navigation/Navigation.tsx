import React from 'react';
import { ChapterId } from '../../lib/archiveLogic';
import { ObjectId, SPECULATIVE_OBJECTS } from '../../data/objects';

export interface NavigationProps {
  activeChapter: ChapterId;
  scrollProgress: number;
  selectedObjectId: ObjectId;
  onNavigateChapter: (chapter: ChapterId) => void;
  onOpenInspection: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeChapter,
  scrollProgress,
  selectedObjectId,
  onNavigateChapter,
  onOpenInspection,
}) => {
  const currentObj =
    SPECULATIVE_OBJECTS.find((o) => o.id === selectedObjectId) ??
    SPECULATIVE_OBJECTS[0];

  const navLinks: { id: ChapterId; label: string }[] = [
    { id: 'hero', label: 'ENTRY' },
    { id: 'archive', label: 'ARCHIVE' },
    { id: 'timeline', label: 'TIMELINE' },
    { id: 'philosophy', label: 'PHILOSOPHY' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F6F5F0]/95 border-b border-black/10">
      {/* Subtle top scroll progress hairline */}
      <div className="h-[2px] w-full bg-black/5 overflow-hidden">
        <div
          className="h-full bg-[#087E8B] transition-transform duration-150 origin-left"
          style={{ transform: `scaleX(${Math.max(0.02, scrollProgress)})` }}
        />
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 md:gap-8 px-4 md:px-10 py-3.5 md:py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigateChapter('hero')}
          className="font-display text-xs sm:text-sm md:text-base font-semibold tracking-[0.16em] md:tracking-[0.18em] text-[#0F141A] hover:text-[#087E8B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087E8B] cursor-pointer"
        >
          TOMORROW//OBJECTS
        </button>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Museum Navigation"
          className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.16em]"
        >
          {navLinks.map((item) => {
            const isActive =
              activeChapter === item.id ||
              (item.id === 'archive' && activeChapter === 'inspection');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigateChapter(item.id)}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087E8B] cursor-pointer ${
                  isActive
                    ? 'text-[#087E8B] font-medium'
                    : 'text-[#525D6B] hover:text-[#0F141A]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#087E8B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenInspection}
            className="px-3 md:px-4 py-1.5 md:py-2 text-[11px] md:text-xs font-mono tracking-[0.12em] text-[#FFFFFF] bg-[#0F141A] hover:bg-[#087E8B] transition-colors rounded-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087E8B] cursor-pointer"
          >
            <span>INSPECT {currentObj.number}</span>
            <span className="hidden sm:inline"> · {currentObj.title}</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Strip */}
      <nav
        aria-label="Mobile Museum Navigation"
        className="flex md:hidden items-center justify-around border-t border-black/10 px-4 py-2 bg-[#F6F5F0]"
      >
        {navLinks.map((item) => {
          const isActive =
            activeChapter === item.id ||
            (item.id === 'archive' && activeChapter === 'inspection');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigateChapter(item.id)}
              className={`px-2 py-1 text-[11px] font-mono tracking-[0.14em] whitespace-nowrap shrink-0 ${
                isActive ? 'text-[#087E8B] font-medium' : 'text-[#525D6B]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
