import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
  RotateCcw,
  Sun,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ObjectId } from '../../data/objects';
import {
  clampExplodedFactor,
  clampZoomLevel,
  getAdjacentObjectId,
  getObjectById,
  InspectionLightingMode,
} from '../../lib/archiveLogic';

export interface InspectionSectionProps {
  isOpen: boolean;
  selectedObjectId: ObjectId;
  explodedFactor: number;
  zoomLevel: number;
  wireframeMode: boolean;
  lightingMode: InspectionLightingMode;
  onSelectObject: (id: ObjectId) => void;
  onChangeExploded: (val: number) => void;
  onChangeZoom: (val: number) => void;
  onToggleWireframe: () => void;
  onChangeLighting: (mode: InspectionLightingMode) => void;
  onResetViewpoint: () => void;
  onCloseInspection: () => void;
}

export const InspectionSection: React.FC<InspectionSectionProps> = ({
  isOpen,
  selectedObjectId,
  explodedFactor,
  zoomLevel,
  wireframeMode,
  lightingMode,
  onSelectObject,
  onChangeExploded,
  onChangeZoom,
  onToggleWireframe,
  onChangeLighting,
  onResetViewpoint,
  onCloseInspection,
}) => {
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const obj = getObjectById(selectedObjectId);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseInspection();
      } else if (e.key === 'h' || e.key === 'H') {
        setDockCollapsed((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        onSelectObject(getAdjacentObjectId(selectedObjectId, 'next'));
      } else if (e.key === 'ArrowLeft') {
        onSelectObject(getAdjacentObjectId(selectedObjectId, 'prev'));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, selectedObjectId, onCloseInspection, onSelectObject]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Object ${obj.number} ${obj.title} 3D Inspection Environment`}
      data-testid="inspection-modal"
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-10 pointer-events-none"
    >
      {/* Minimal Top Bar */}
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4 border-b border-black/10 pb-4 bg-[#F6F5F0]/90 pointer-events-auto">
        <div className="flex items-center gap-3 text-xs font-mono tracking-[0.16em]">
          <span className="text-[#087E8B] font-medium">
            03 · OBJECT EXPLORATION
          </span>
          <span aria-hidden="true" className="text-[#525D6B]">
            /
          </span>
          <span className="text-[#0F141A] font-medium">
            OBJECT {obj.number} · {obj.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              onSelectObject(getAdjacentObjectId(selectedObjectId, 'prev'))
            }
            className="px-3 py-1.5 text-xs font-mono text-[#0F141A] hover:text-[#087E8B] border border-black/15 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onSelectObject(getAdjacentObjectId(selectedObjectId, 'next'))
            }
            className="px-3 py-1.5 text-xs font-mono text-[#0F141A] hover:text-[#087E8B] border border-black/15 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onCloseInspection}
            aria-label="Close Inspection"
            className="px-4 py-1.5 text-xs font-mono bg-[#0F141A] text-[#FFFFFF] hover:bg-[#087E8B] transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Inspection</span>
          </button>
        </div>
      </div>

      {/* Main Inspection Grid: Unboxed Airy Side Columns & Vast Central 3D Stage */}
      <div className="max-w-[1440px] w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Essential Curatorial Identity */}
        <div
          className={`lg:col-span-3 bg-[#F6F5F0]/88 p-4 pointer-events-auto transition-opacity duration-200 ${
            dockCollapsed ? 'opacity-15 hover:opacity-100' : 'opacity-100'
          }`}
        >
          <p className="font-mono text-xs tracking-[0.18em] text-[#087E8B] font-medium mb-1">
            OBJECT {obj.number} / {obj.title}
          </p>
          <h2 className="font-display text-2xl font-semibold text-[#0F141A] mb-3">
            {obj.subtitle}
          </h2>
          <p className="text-xs text-[#525D6B] leading-relaxed mb-6">
            {obj.description}
          </p>

          <dl className="border-t border-black/10 divide-y divide-black/10 text-xs font-mono">
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#525D6B]">Classification</dt>
              <dd className="text-[#0F141A] text-right">{obj.classification}</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#525D6B]">Origin</dt>
              <dd className="text-[#0F141A] text-right">{obj.origin}</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#525D6B]">Status</dt>
              <dd className="text-[#9A6F28] font-medium text-right">
                {obj.status}
              </dd>
            </div>
          </dl>
        </div>

        {/* Center: Unobstructed 3D Viewport */}
        <div className="hidden lg:flex lg:col-span-6 h-full items-center justify-center pointer-events-none" />

        {/* Right Side: Clean Materials & Applications */}
        <div
          className={`lg:col-span-3 bg-[#F6F5F0]/88 p-4 pointer-events-auto transition-opacity duration-200 ${
            dockCollapsed ? 'opacity-15 hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="border-b border-black/10 pb-3 mb-4 flex justify-between text-xs font-mono">
            <span className="text-[#525D6B]">DIMENSIONS</span>
            <span className="text-[#0F141A] tabular-nums">{obj.dimensions}</span>
          </div>

          <div className="mb-5">
            <h3 className="font-mono text-[11px] tracking-[0.15em] text-[#9A6F28] font-medium mb-2">
              MATERIALS
            </h3>
            <ul className="space-y-1.5 text-xs text-[#0F141A]/90">
              {obj.materials.map((mat) => (
                <li key={mat}>{mat}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] tracking-[0.15em] text-[#087E8B] font-medium mb-2">
              IMAGINED APPLICATIONS
            </h3>
            <ul className="space-y-1.5 text-xs text-[#525D6B]">
              {obj.imaginedApplications.map((app) => (
                <li key={app}>{app}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Collapsible Unified Bottom Control Dock */}
      <div className="max-w-[880px] w-full mx-auto flex flex-col items-center pointer-events-auto">
        <button
          type="button"
          onClick={() => setDockCollapsed((prev) => !prev)}
          className="px-4 py-1 bg-[#FFFFFF] border border-b-0 border-black/15 text-[11px] font-mono tracking-[0.14em] text-[#525D6B] hover:text-[#0F141A] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>SHOW CONTROLS (H)</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>HIDE CONTROLS (H)</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div className="w-full bg-[#FFFFFF]/95 border border-black/15 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
            {/* Exploded View Slider */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="exploded-view-slider"
                className="text-xs font-mono text-[#525D6B] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Layers className="w-3.5 h-3.5 text-[#087E8B]" />
                <span>EXPLODE</span>
              </label>
              <input
                id="exploded-view-slider"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={explodedFactor}
                onChange={(e) =>
                  onChangeExploded(clampExplodedFactor(parseFloat(e.target.value)))
                }
                className="w-28 accent-[#087E8B] cursor-pointer"
              />
              <span className="text-xs font-mono tabular-nums text-[#0F141A] w-9">
                {Math.round(explodedFactor * 100)}%
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChangeZoom(clampZoomLevel(zoomLevel - 0.15))}
                aria-label="Zoom Out"
                className="p-2 bg-[#F6F5F0] text-[#0F141A] hover:text-[#087E8B] border border-black/10 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-mono tabular-nums text-[#525D6B]">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => onChangeZoom(clampZoomLevel(zoomLevel + 0.15))}
                aria-label="Zoom In"
                className="p-2 bg-[#F6F5F0] text-[#0F141A] hover:text-[#087E8B] border border-black/10 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lighting Mode Presets */}
            <div className="flex items-center gap-1 bg-[#F6F5F0] p-1 border border-black/10">
              <Sun className="w-3.5 h-3.5 text-[#9A6F28] mx-1.5" />
              {(
                [
                  { id: 'studio', label: 'Studio' },
                  { id: 'warm-gold', label: 'Solar' },
                  { id: 'cyber-cyan', label: 'Ion' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onChangeLighting(preset.id)}
                  className={`px-2.5 py-1 text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lightingMode === preset.id
                      ? 'bg-[#087E8B] text-[#FFFFFF] font-medium'
                      : 'text-[#525D6B] hover:text-[#0F141A]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Wireframe & Reset Viewpoint */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleWireframe}
                aria-pressed={wireframeMode}
                className={`px-3 py-1.5 text-xs font-mono border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  wireframeMode
                    ? 'bg-[#9A6F28] text-[#FFFFFF] border-[#9A6F28] font-medium'
                    : 'bg-[#F6F5F0] text-[#0F141A] border-black/10 hover:border-black/30'
                }`}
              >
                Wireframe
              </button>

              <button
                type="button"
                onClick={onResetViewpoint}
                className="px-3 py-1.5 text-xs font-mono bg-[#F6F5F0] text-[#525D6B] hover:text-[#0F141A] border border-black/10 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
