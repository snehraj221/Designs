import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2, RotateCcw } from 'lucide-react';
import {
  CLASSIFICATION_CATEGORIES,
  ClassificationCategory,
  ObjectId,
} from '../../data/objects';
import {
  filterObjectsByCategory,
  getAdjacentObjectId,
  getObjectById,
} from '../../lib/archiveLogic';

export interface ArchiveSectionProps {
  selectedObjectId: ObjectId;
  onSelectObject: (id: ObjectId) => void;
  onOpenInspection: (id: ObjectId) => void;
  onResetRotation: () => void;
}

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({
  selectedObjectId,
  onSelectObject,
  onOpenInspection,
  onResetRotation,
}) => {
  const filteredObjects = filterObjectsByCategory('All', '');
  const activeObject = getObjectById(selectedObjectId);

  const handlePrev = () => {
    onSelectObject(getAdjacentObjectId(selectedObjectId, 'prev'));
  };

  const handleNext = () => {
    onSelectObject(getAdjacentObjectId(selectedObjectId, 'next'));
  };

  return (
    <section
      id="chapter-archive"
      aria-label="Chapter 02: The Archive"
      className="relative min-h-screen w-full py-24 px-6 md:px-14 max-w-[1440px] mx-auto flex flex-col justify-between pointer-events-none"
    >
      {/* Top Minimal Header & Horizontal Object Index */}
      <div className="pointer-events-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/10">
          <div>
            <p className="text-xs font-mono tracking-[0.2em] text-[#525D6B] mb-2">
              02 · THE ARCHIVE
            </p>
            <h2
              className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#0F141A] leading-[1.04]"
              style={{ textWrap: 'balance' }}
            >
              NOT INVENTED YET.{' '}
              <span className="text-[#525D6B]">NOT IMPOSSIBLE.</span>
            </h2>
          </div>

          {/* Single-Row Horizontal Object Selector Strip */}
          <div
            role="tablist"
            aria-label="Speculative Archive Objects"
            className="flex flex-wrap items-center gap-6"
          >
            {filteredObjects.map((obj) => {
              const isSelected = obj.id === selectedObjectId;
              return (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => onSelectObject(obj.id)}
                  aria-pressed={isSelected}
                  className={`py-1.5 text-xs font-mono tracking-[0.15em] transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                    isSelected
                      ? 'border-[#087E8B] text-[#0F141A] font-medium'
                      : 'border-transparent text-[#525D6B] hover:text-[#0F141A]'
                  }`}
                >
                  {obj.number} · {obj.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Central Vast Negative Space for the 3D Sculpture */}
      <div className="my-auto min-h-[420px] md:min-h-[480px] pointer-events-none" />

      {/* Bottom Curatorial Caption & Action Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-black/10 bg-[#F6F5F0]/90 pointer-events-auto">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 text-xs font-mono text-[#525D6B] mb-2">
            <span className="text-[#087E8B] font-medium">
              OBJECT {activeObject.number} / {activeObject.title}
            </span>
            <span aria-hidden="true">·</span>
            <span>{activeObject.classification}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums text-[#9A6F28]">
              {activeObject.eraYear}
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0F141A] mb-2">
            {activeObject.subtitle}
          </h3>
          <p className="text-sm text-[#525D6B] max-w-xl leading-relaxed">
            {activeObject.description}
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Archive Object"
            className="p-3 text-xs font-mono text-[#0F141A] hover:text-[#087E8B] border border-black/15 hover:border-[#087E8B] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onResetRotation}
            aria-label="Reset 3D Object Viewpoint"
            className="px-3.5 py-3 text-xs font-mono text-[#525D6B] hover:text-[#0F141A] border border-black/15 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Archive Object"
            className="p-3 text-xs font-mono text-[#0F141A] hover:text-[#087E8B] border border-black/15 hover:border-[#087E8B] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            data-testid="open-inspection-btn"
            onClick={() => onOpenInspection(activeObject.id)}
            className="py-3 px-5 bg-[#0F141A] hover:bg-[#087E8B] text-[#FFFFFF] font-mono text-xs font-medium tracking-[0.14em] transition-colors rounded-sm inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>OPEN 3D INSPECTION CHAMBER</span>
          </button>
        </div>
      </div>
    </section>
  );
};
