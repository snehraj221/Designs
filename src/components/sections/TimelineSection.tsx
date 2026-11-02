import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ObjectId } from '../../data/objects';
import { TIMELINE_ERAS } from '../../data/timeline';
import { getEraByYear, getObjectsForEra } from '../../lib/archiveLogic';

export interface TimelineSectionProps {
  selectedEraYear: 2030 | 2035 | 2045;
  onSelectEraYear: (year: 2030 | 2035 | 2045) => void;
  onInspectObject: (id: ObjectId) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  selectedEraYear,
  onSelectEraYear,
  onInspectObject,
}) => {
  const activeEra = getEraByYear(selectedEraYear);
  const eraObjects = getObjectsForEra(selectedEraYear);

  return (
    <section
      id="chapter-timeline"
      aria-label="Chapter 04: Future Timeline"
      className="relative min-h-screen w-full py-32 px-6 md:px-14 max-w-[1440px] mx-auto flex flex-col justify-between pointer-events-none"
    >
      {/* Left-Anchored Header, Year Switcher & Editorial Narrative (Right half frames the 3D Era Object in open space) */}
      <div className="max-w-xl bg-[#F6F5F0]/90 pointer-events-auto">
        <p className="text-xs font-mono tracking-[0.2em] text-[#525D6B] mb-3">
          04 · FUTURE TIMELINE
        </p>
        <h2
          className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#0F141A] leading-[1.05] mb-8"
          style={{ textWrap: 'balance' }}
        >
          THE FUTURE IS NOT A DESTINATION.
          <br />
          <span className="text-[#9A6F28]">
            IT IS A SEQUENCE OF DECISIONS.
          </span>
        </h2>

        {/* Clean Typographic Year Switcher in Left Column */}
        <div
          role="tablist"
          aria-label="Select speculative timeline era"
          className="flex items-center gap-8 pb-6 mb-8 border-b border-black/10"
        >
          {TIMELINE_ERAS.map((era) => {
            const isSelected = era.year === selectedEraYear;
            return (
              <button
                key={era.year}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => onSelectEraYear(era.year)}
                className={`text-left pb-2 border-b-2 transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#087E8B] text-[#0F141A]'
                    : 'border-transparent text-[#525D6B] hover:text-[#0F141A]'
                }`}
              >
                <span className="block font-display text-2xl sm:text-3xl font-semibold tabular-nums">
                  {era.year}
                </span>
                <span className="block font-mono text-[10px] tracking-[0.16em] text-[#9A6F28]">
                  {era.title}
                </span>
              </button>
            );
          })}
        </div>

        <p className="font-mono text-xs tracking-[0.18em] text-[#087E8B] font-medium mb-2">
          {activeEra.code} · {activeEra.keyShift}
        </p>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F141A] mb-3">
          {activeEra.year} — {activeEra.title}
        </h3>
        <p className="text-base text-[#0F141A]/90 leading-relaxed mb-4">
          {activeEra.summary}
        </p>
        <p className="text-sm text-[#525D6B] leading-relaxed mb-8">
          {activeEra.editorialNarrative}
        </p>

        {/* Clean Unboxed Horizon Metrics */}
        <div className="grid grid-cols-3 gap-6 py-6 border-y border-black/10 mb-8">
          {activeEra.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-display text-2xl font-semibold tabular-nums text-[#087E8B]">
                {metric.value}
              </p>
              <p className="font-mono text-[11px] text-[#0F141A] mt-1">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Linked Objects Inline Links */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-xs text-[#525D6B]">
            ERA ARTEFACTS:
          </span>
          {eraObjects.map((obj) => (
            <button
              key={obj.id}
              type="button"
              onClick={() => onInspectObject(obj.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FFFFFF] border border-black/15 hover:border-[#087E8B] text-xs font-mono text-[#0F141A] hover:text-[#087E8B] transition-colors cursor-pointer"
            >
              <span>
                {obj.number} · {obj.title}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
