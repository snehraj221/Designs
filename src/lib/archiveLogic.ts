import {
  ClassificationCategory,
  ObjectId,
  SPECULATIVE_OBJECTS,
  SpeculativeObject,
} from '../data/objects';
import { TIMELINE_ERAS, TimelineEra } from '../data/timeline';

export type ChapterId =
  | 'hero'
  | 'archive'
  | 'inspection'
  | 'timeline'
  | 'philosophy'
  | 'final';

export type InspectionLightingMode = 'studio' | 'warm-gold' | 'cyber-cyan';

export function getObjectById(id: ObjectId): SpeculativeObject {
  const found = SPECULATIVE_OBJECTS.find((obj) => obj.id === id);
  return found ?? SPECULATIVE_OBJECTS[0];
}

export function filterObjectsByCategory(
  category: ClassificationCategory,
  searchQuery = '',
): SpeculativeObject[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return SPECULATIVE_OBJECTS.filter((obj) => {
    const matchesCategory =
      category === 'All' || obj.classification === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      obj.title.toLowerCase().includes(normalizedQuery) ||
      obj.concept.toLowerCase().includes(normalizedQuery) ||
      obj.description.toLowerCase().includes(normalizedQuery) ||
      obj.classification.toLowerCase().includes(normalizedQuery) ||
      obj.number.includes(normalizedQuery)
    );
  });
}

export function getAdjacentObjectId(
  currentId: ObjectId,
  direction: 'next' | 'prev',
): ObjectId {
  const index = SPECULATIVE_OBJECTS.findIndex((o) => o.id === currentId);
  const safeIndex = index === -1 ? 0 : index;
  const total = SPECULATIVE_OBJECTS.length;
  const nextIndex =
    direction === 'next'
      ? (safeIndex + 1) % total
      : (safeIndex - 1 + total) % total;
  return SPECULATIVE_OBJECTS[nextIndex].id;
}

export function getEraByYear(year: 2030 | 2035 | 2045): TimelineEra {
  const found = TIMELINE_ERAS.find((e) => e.year === year);
  return found ?? TIMELINE_ERAS[0];
}

export function getObjectsForEra(year: 2030 | 2035 | 2045): SpeculativeObject[] {
  const era = getEraByYear(year);
  return era.linkedObjectIds.map((id) => getObjectById(id));
}

export function clampExplodedFactor(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function clampZoomLevel(value: number): number {
  if (Number.isNaN(value)) return 1;
  return Math.max(0.65, Math.min(1.65, value));
}

export interface CameraTargetState {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export function computeStageCameraTarget(
  chapter: ChapterId,
  selectedObjectId: ObjectId,
  selectedEraYear: 2030 | 2035 | 2045,
  zoomLevel = 1,
): CameraTargetState {
  const safeZoom = clampZoomLevel(zoomLevel);

  switch (chapter) {
    case 'hero':
      return {
        position: [0, 0.3, 6.2],
        lookAt: [0, 0.1, 0],
        fov: 42,
      };
    case 'archive': {
      const obj = getObjectById(selectedObjectId);
      const [ox, oy, oz] = obj.cameraOffset;
      return {
        position: [ox * 0.22, oy * 0.35 + 0.2, 5.4 + oz * 0.15],
        lookAt: [0, 0.05, 0],
        fov: 40,
      };
    }
    case 'inspection': {
      const dist = 4.2 / safeZoom;
      return {
        position: [0, 0.15, dist],
        lookAt: [0, 0.05, 0],
        fov: 38,
      };
    }
    case 'timeline': {
      const yearIndex =
        selectedEraYear === 2030 ? -1 : selectedEraYear === 2035 ? 0 : 1;
      return {
        position: [yearIndex * 1.4, 0.6, 6.8],
        lookAt: [yearIndex * 0.4, 0, 0],
        fov: 45,
      };
    }
    case 'philosophy':
      return {
        position: [0, 0.8, 8.2],
        lookAt: [0, 0.2, 0],
        fov: 48,
      };
    case 'final':
      return {
        position: [0, 1.6, 13.5],
        lookAt: [0, 0, 0],
        fov: 52,
      };
  }
}

export function getLoadingStageText(progress: number): string {
  const clamped = Math.max(0, Math.min(100, progress));
  if (clamped < 20) return 'INITIALIZING POINT SOURCE';
  if (clamped < 45) return 'SYNTHESIZING PARTICLE FIELD';
  if (clamped < 75) return 'COMPILING PROCEDURAL GEOMETRY';
  if (clamped < 95) return 'CALIBRATING PBR ENVIRONMENT';
  return 'ENTERING EXHIBITION HALL';
}
