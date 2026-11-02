import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampExplodedFactor,
  clampZoomLevel,
  computeStageCameraTarget,
  filterObjectsByCategory,
  getAdjacentObjectId,
  getEraByYear,
  getLoadingStageText,
  getObjectById,
  getObjectsForEra,
} from './archiveLogic';
import { SPECULATIVE_OBJECTS } from '../data/objects';
import { TIMELINE_ERAS } from '../data/timeline';

test('SPECULATIVE_OBJECTS contains all 6 required objects with complete metadata', () => {
  assert.equal(SPECULATIVE_OBJECTS.length, 6);
  const titles = SPECULATIVE_OBJECTS.map((o) => o.title);
  assert.deepEqual(titles, ['AURA', 'SOLA', 'MEMENTO', 'NEST', 'MYCEL', 'ORBIT']);
  for (const obj of SPECULATIVE_OBJECTS) {
    assert.ok(obj.number.length === 3);
    assert.ok(obj.materials.length >= 3);
    assert.ok(obj.imaginedApplications.length >= 3);
    assert.ok(obj.components.length >= 3);
  }
});

test('filterObjectsByCategory filters by classification and search query', () => {
  const all = filterObjectsByCategory('All');
  assert.equal(all.length, 6);

  const energy = filterObjectsByCategory('Energy & Materials');
  assert.equal(energy.length, 2);
  assert.deepEqual(
    energy.map((o) => o.id),
    ['sola', 'mycel'],
  );

  const searched = filterObjectsByCategory('All', 'memory');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'memento');
});

test('getAdjacentObjectId cycles forward and backward through all 6 objects', () => {
  assert.equal(getAdjacentObjectId('aura', 'next'), 'sola');
  assert.equal(getAdjacentObjectId('aura', 'prev'), 'orbit');
  assert.equal(getAdjacentObjectId('orbit', 'next'), 'aura');
  assert.equal(getAdjacentObjectId('memento', 'next'), 'nest');
});

test('TIMELINE_ERAS contains 2030, 2035, and 2045 with linked objects', () => {
  assert.equal(TIMELINE_ERAS.length, 3);
  const era2030 = getEraByYear(2030);
  assert.equal(era2030.title, 'THE TRANSITION');
  const objects2035 = getObjectsForEra(2035);
  assert.deepEqual(
    objects2035.map((o) => o.id),
    ['memento', 'nest'],
  );
});

test('computeStageCameraTarget calculates distinct camera states and respects zoom clamping', () => {
  const heroCam = computeStageCameraTarget('hero', 'aura', 2030);
  const finalCam = computeStageCameraTarget('final', 'aura', 2030);
  assert.ok(finalCam.position[2] > heroCam.position[2]);

  const inspectDefault = computeStageCameraTarget('inspection', 'aura', 2030, 1.0);
  const inspectZoomed = computeStageCameraTarget('inspection', 'aura', 2030, 1.5);
  assert.ok(inspectZoomed.position[2] < inspectDefault.position[2]);

  assert.equal(clampExplodedFactor(-0.5), 0);
  assert.equal(clampExplodedFactor(2.4), 1);
  assert.equal(clampZoomLevel(0.1), 0.65);
  assert.equal(clampZoomLevel(5.0), 1.65);
});

test('getLoadingStageText returns progressive status messages', () => {
  assert.equal(getLoadingStageText(5), 'INITIALIZING POINT SOURCE');
  assert.equal(getLoadingStageText(55), 'COMPILING PROCEDURAL GEOMETRY');
  assert.equal(getLoadingStageText(100), 'ENTERING EXHIBITION HALL');
});
