/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { ObjectId } from './data/objects';
import { ChapterId, InspectionLightingMode } from './lib/archiveLogic';
import { useReducedMotion } from './hooks/useReducedMotion';
import { MuseumCanvas } from './components/scenes/MuseumCanvas';
import { Navigation } from './components/navigation/Navigation';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Cursor } from './components/ui/Cursor';
import { HeroSection } from './components/sections/HeroSection';
import { ArchiveSection } from './components/sections/ArchiveSection';
import { InspectionSection } from './components/sections/InspectionSection';
import { TimelineSection } from './components/sections/TimelineSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { FinalSection } from './components/sections/FinalSection';

export default function App() {
  const reducedMotion = useReducedMotion();

  const [introFinished, setIntroFinished] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1';
  });
  const [webglReady, setWebglReady] = useState<boolean>(false);

  const [activeChapter, setActiveChapter] = useState<ChapterId>('hero');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [selectedObjectId, setSelectedObjectId] = useState<ObjectId>('aura');
  const [selectedEraYear, setSelectedEraYear] = useState<2030 | 2035 | 2045>(
    2030,
  );

  // Inspection Chamber State (Chapter 03)
  const [inspectionOpen, setInspectionOpen] = useState<boolean>(false);
  const [explodedFactor, setExplodedFactor] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [lightingMode, setLightingMode] =
    useState<InspectionLightingMode>('studio');
  const [rotationResetTrigger, setRotationResetTrigger] = useState<number>(0);

  const handleWebGLReady = useCallback(() => {
    setWebglReady(true);
  }, []);

  const handleCompleteIntro = useCallback(() => {
    setIntroFinished(true);
  }, []);

  const handleResetRotation = useCallback(() => {
    setRotationResetTrigger((prev) => prev + 1);
    setExplodedFactor(0);
    setZoomLevel(1);
    setWireframeMode(false);
    setLightingMode('studio');
  }, []);

  const handleOpenInspection = useCallback((id?: ObjectId) => {
    if (id) {
      setSelectedObjectId(id);
    }
    setInspectionOpen(true);
  }, []);

  const handleCloseInspection = useCallback(() => {
    setInspectionOpen(false);
    setExplodedFactor(0);
    setWireframeMode(false);
  }, []);

  const handleNavigateChapter = useCallback((chapter: ChapterId) => {
    setInspectionOpen(false);
    setActiveChapter(chapter);
    const sectionMap: Record<ChapterId, string> = {
      hero: 'chapter-hero',
      archive: 'chapter-archive',
      inspection: 'chapter-archive',
      timeline: 'chapter-timeline',
      philosophy: 'chapter-philosophy',
      final: 'chapter-final',
    };
    const targetEl = document.getElementById(sectionMap[chapter]);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Track scroll progress and active chapter via IntersectionObserver
  useEffect(() => {
    const updateScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)));
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const sectionIds: { id: string; chapter: ChapterId }[] = [
      { id: 'chapter-hero', chapter: 'hero' },
      { id: 'chapter-archive', chapter: 'archive' },
      { id: 'chapter-timeline', chapter: 'timeline' },
      { id: 'chapter-philosophy', chapter: 'philosophy' },
      { id: 'chapter-final', chapter: 'final' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            const matched = sectionIds.find((s) => s.id === entry.target.id);
            if (matched) {
              setActiveChapter(matched.chapter);
            }
          }
        });
      },
      { threshold: [0.35, 0.6] },
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', updateScroll);
      observer.disconnect();
    };
  }, []);

  const effectiveChapter: ChapterId = inspectionOpen
    ? 'inspection'
    : activeChapter;

  return (
    <div
      data-chapter={effectiveChapter}
      data-selected-object={selectedObjectId}
      className="relative min-h-screen bg-[#F6F5F0] text-[#0F141A] selection:bg-[#087E8B]/15 selection:text-[#087E8B]"
    >
      {/* Subtle Desktop Custom Cursor Ring */}
      <Cursor reducedMotion={reducedMotion} />

      {/* Custom Cinematic Loading Experience */}
      {!introFinished && (
        <LoadingScreen
          webglReady={webglReady}
          onComplete={handleCompleteIntro}
        />
      )}

      {/* Persistent Interactive 3D WebGL Environment */}
      <MuseumCanvas
        activeChapter={effectiveChapter}
        selectedObjectId={selectedObjectId}
        selectedEraYear={selectedEraYear}
        explodedFactor={explodedFactor}
        zoomLevel={zoomLevel}
        wireframeMode={wireframeMode}
        lightingMode={lightingMode}
        rotationResetTrigger={rotationResetTrigger}
        reducedMotion={reducedMotion}
        onWebGLReady={handleWebGLReady}
      />

      {/* Persistent Top Navigation (hidden during full-screen 3D inspection) */}
      {!inspectionOpen && (
        <Navigation
          activeChapter={effectiveChapter}
          scrollProgress={scrollProgress}
          selectedObjectId={selectedObjectId}
          onNavigateChapter={handleNavigateChapter}
          onOpenInspection={() => handleOpenInspection(selectedObjectId)}
        />
      )}

      {/* Chapter 03: Full-Screen Interactive Object Exploration Chamber */}
      <InspectionSection
        isOpen={inspectionOpen}
        selectedObjectId={selectedObjectId}
        explodedFactor={explodedFactor}
        zoomLevel={zoomLevel}
        wireframeMode={wireframeMode}
        lightingMode={lightingMode}
        onSelectObject={setSelectedObjectId}
        onChangeExploded={setExplodedFactor}
        onChangeZoom={setZoomLevel}
        onToggleWireframe={() => setWireframeMode((prev) => !prev)}
        onChangeLighting={setLightingMode}
        onResetViewpoint={handleResetRotation}
        onCloseInspection={handleCloseInspection}
      />

      {/* Six-Chapter Curatorial Experience */}
      <main
        className={`relative z-10 transition-opacity duration-200 ${
          inspectionOpen
            ? 'opacity-0 pointer-events-none invisible h-screen overflow-hidden'
            : 'opacity-100'
        }`}
      >
        {/* Chapter 01: The Entry */}
        <HeroSection
          onNavigateChapter={handleNavigateChapter}
          onResetRotation={handleResetRotation}
        />

        {/* Chapter 02: The Archive */}
        <ArchiveSection
          selectedObjectId={selectedObjectId}
          onSelectObject={setSelectedObjectId}
          onOpenInspection={handleOpenInspection}
          onResetRotation={handleResetRotation}
        />

        {/* Chapter 04: Future Timeline */}
        <TimelineSection
          selectedEraYear={selectedEraYear}
          onSelectEraYear={setSelectedEraYear}
          onInspectObject={handleOpenInspection}
        />

        {/* Chapter 05: The Philosophy */}
        <PhilosophySection />

        {/* Chapter 06: The Final Transmission */}
        <FinalSection
          onNavigateChapter={handleNavigateChapter}
          onInspectObject={handleOpenInspection}
        />
      </main>
    </div>
  );
}
