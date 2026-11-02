import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ObjectId, SPECULATIVE_OBJECTS } from '../../data/objects';
import {
  ChapterId,
  computeStageCameraTarget,
  InspectionLightingMode,
} from '../../lib/archiveLogic';
import {
  createHeroGenesisArtefact,
  createObjectArtefact,
  ProceduralArtefactHandle,
} from '../objects/proceduralObjects';

export interface MuseumCanvasProps {
  activeChapter: ChapterId;
  selectedObjectId: ObjectId;
  selectedEraYear: 2030 | 2035 | 2045;
  explodedFactor: number;
  zoomLevel: number;
  wireframeMode: boolean;
  lightingMode: InspectionLightingMode;
  rotationResetTrigger: number;
  reducedMotion: boolean;
  onWebGLReady?: () => void;
}

export const MuseumCanvas: React.FC<MuseumCanvasProps> = ({
  activeChapter,
  selectedObjectId,
  selectedEraYear,
  explodedFactor,
  zoomLevel,
  wireframeMode,
  lightingMode,
  rotationResetTrigger,
  reducedMotion,
  onWebGLReady,
}) => {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  const stateRef = useRef({
    activeChapter,
    selectedObjectId,
    selectedEraYear,
    explodedFactor,
    zoomLevel,
    wireframeMode,
    lightingMode,
    reducedMotion,
  });

  const userRotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const pointerParallaxRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    stateRef.current = {
      activeChapter,
      selectedObjectId,
      selectedEraYear,
      explodedFactor,
      zoomLevel,
      wireframeMode,
      lightingMode,
      reducedMotion,
    };
  }, [
    activeChapter,
    selectedObjectId,
    selectedEraYear,
    explodedFactor,
    zoomLevel,
    wireframeMode,
    lightingMode,
    reducedMotion,
  ]);

  useEffect(() => {
    userRotationRef.current.targetX = 0;
    userRotationRef.current.targetY = 0;
  }, [rotationResetTrigger, selectedObjectId]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Check WebGL capability and detect software WebGL (SwiftShader / llvmpipe)
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl =
        probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        onWebGLReady?.();
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
        gpu,
      );
    } catch {
      setWebglSupported(false);
      onWebGLReady?.();
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      onWebGLReady?.();
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2),
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf6f5f0, 1);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf6f5f0, 0.016);

    // Mandatory Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04,
    ).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      120,
    );
    camera.position.set(0, 0.3, 6.2);

    // 3-Point Daylight Museum Gallery Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2ddd2, 1.35);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff8eb, 2.2);
    keyLight.position.set(4.5, 6.0, 5.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x087e8b, 1.45);
    rimLight.position.set(-5.0, 3.0, -4.5);
    scene.add(rimLight);

    const accentPoint = new THREE.PointLight(0x9a6f28, 1.2, 18);
    accentPoint.position.set(0, -2.0, 2.5);
    scene.add(accentPoint);

    // Build Hero Genesis Artefact + All 6 Archive Objects
    const heroHandle = createHeroGenesisArtefact(isSoftwareGl);
    heroHandle.group.scale.setScalar(0.84);
    scene.add(heroHandle.group);

    const objectHandles = new Map<ObjectId, ProceduralArtefactHandle>();
    SPECULATIVE_OBJECTS.forEach((spec) => {
      const handle = createObjectArtefact(spec.id, isSoftwareGl);
      handle.group.scale.setScalar(0.86);
      handle.group.visible = false;
      scene.add(handle.group);
      objectHandles.set(spec.id, handle);
    });

    // Subtle Ambient Dust Field (no distracting giant diagonal lines)
    const particleCount = isSoftwareGl ? 30 : 70;
    const particleGeo = new THREE.OctahedronGeometry(0.018, 0);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.2,
    });
    const particleInstanced = new THREE.InstancedMesh(
      particleGeo,
      particleMat,
      particleCount,
    );
    const dummy = new THREE.Object3D();
    for (let i = 0; i < particleCount; i++) {
      const radius = 3.2 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6.0;
      dummy.position.set(
        Math.cos(theta) * radius,
        y,
        Math.sin(theta) * radius - 2.0,
      );
      dummy.scale.setScalar(0.4 + Math.random() * 0.8);
      dummy.updateMatrix();
      particleInstanced.setMatrixAt(i, dummy.matrix);
    }
    particleInstanced.instanceMatrix.needsUpdate = true;
    particleInstanced.computeBoundingSphere();
    scene.add(particleInstanced);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    onWebGLReady?.();

    // Pointer / Drag Interaction Listeners
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointerParallaxRef.current = { x: nx, y: ny };

      if (isDraggingRef.current) {
        const dx = e.clientX - prevPointerRef.current.x;
        const dy = e.clientY - prevPointerRef.current.y;
        prevPointerRef.current = { x: e.clientX, y: e.clientY };
        userRotationRef.current.targetY += dx * 0.008;
        userRotationRef.current.targetX = Math.max(
          -1.1,
          Math.min(1.1, userRotationRef.current.targetX + dy * 0.008),
        );
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('resize', onResize);

    // Pre-allocated math helpers outside render loop
    const _targetCamPos = new THREE.Vector3();
    const _currentLookAt = new THREE.Vector3(0, 0.1, 0);
    const _targetLookAt = new THREE.Vector3();
    const clock = new THREE.Clock();
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const st = stateRef.current;

      // Smoothly damp user drag rotation
      userRotationRef.current.x = THREE.MathUtils.damp(
        userRotationRef.current.x,
        userRotationRef.current.targetX,
        8,
        delta,
      );
      userRotationRef.current.y = THREE.MathUtils.damp(
        userRotationRef.current.y,
        userRotationRef.current.targetY,
        8,
        delta,
      );

      // Update lighting presets
      if (st.lightingMode === 'warm-gold') {
        keyLight.color.setHex(0xffd28a);
        rimLight.color.setHex(0x9a6f28);
      } else if (st.lightingMode === 'cyber-cyan') {
        keyLight.color.setHex(0xe0f7fa);
        rimLight.color.setHex(0x087e8b);
      } else {
        keyLight.color.setHex(0xfff8eb);
        rimLight.color.setHex(0x087e8b);
      }

      // Compute target camera position per chapter
      const camState = computeStageCameraTarget(
        st.activeChapter,
        st.selectedObjectId,
        st.selectedEraYear,
        st.zoomLevel,
      );

      const px = st.reducedMotion ? 0 : pointerParallaxRef.current.x * 0.2;
      const py = st.reducedMotion ? 0 : pointerParallaxRef.current.y * 0.14;

      _targetCamPos.set(
        camState.position[0] + px,
        camState.position[1] + py,
        camState.position[2],
      );
      _targetLookAt.set(
        camState.lookAt[0],
        camState.lookAt[1],
        camState.lookAt[2],
      );

      camera.position.lerp(_targetCamPos, 1 - Math.exp(-4.5 * delta));
      _currentLookAt.lerp(_targetLookAt, 1 - Math.exp(-5.0 * delta));
      camera.lookAt(_currentLookAt);

      // Toggle visibility & update active 3D sculpture
      const showHero =
        st.activeChapter === 'hero' ||
        st.activeChapter === 'philosophy' ||
        st.activeChapter === 'final';

      heroHandle.group.visible = showHero;
      if (showHero) {
        const isDesktop = window.innerWidth >= 1024;
        const targetHeroX =
          st.activeChapter === 'hero' && isDesktop ? 1.45 : 0;
        heroHandle.group.position.x = THREE.MathUtils.damp(
          heroHandle.group.position.x,
          targetHeroX,
          5,
          delta,
        );
        heroHandle.setWireframe(st.activeChapter === 'philosophy');
        heroHandle.update(
          elapsed,
          delta,
          st.activeChapter === 'philosophy' ? 0.35 : 0,
          st.reducedMotion,
        );
        heroHandle.group.rotation.x = userRotationRef.current.x;
        heroHandle.group.rotation.y =
          userRotationRef.current.y + (st.reducedMotion ? 0 : elapsed * 0.12);
      }

      objectHandles.forEach((handle, id) => {
        const isSelected =
          (st.activeChapter === 'archive' || st.activeChapter === 'inspection') &&
          id === st.selectedObjectId;
        const isEraLinked =
          st.activeChapter === 'timeline' &&
          ((st.selectedEraYear === 2030 && id === 'aura') ||
            (st.selectedEraYear === 2035 && id === 'nest') ||
            (st.selectedEraYear === 2045 && id === 'orbit'));

        const visible = isSelected || isEraLinked;
        handle.group.visible = visible;

        if (visible) {
          const isDesktop = window.innerWidth >= 1024;
          const targetObjX =
            st.activeChapter === 'timeline' && isDesktop ? 1.55 : 0;
          const targetObjY =
            st.activeChapter === 'archive' ? -0.05 : 0;
          handle.group.position.x = THREE.MathUtils.damp(
            handle.group.position.x,
            targetObjX,
            5,
            delta,
          );
          handle.group.position.y = THREE.MathUtils.damp(
            handle.group.position.y,
            targetObjY,
            5,
            delta,
          );
          const activeExplode =
            st.activeChapter === 'inspection' ? st.explodedFactor : 0;
          handle.setWireframe(
            st.activeChapter === 'inspection' ? st.wireframeMode : false,
          );
          handle.update(elapsed, delta, activeExplode, st.reducedMotion);
          handle.group.rotation.x = userRotationRef.current.x;
          handle.group.rotation.y =
            userRotationRef.current.y + (st.reducedMotion ? 0 : elapsed * 0.18);
        }
      });

      if (!st.reducedMotion) {
        particleInstanced.rotation.y = elapsed * 0.015;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div
        className="fixed inset-0 z-0 flex items-center justify-center bg-[#F6F5F0]"
        data-testid="webgl-fallback"
      >
        <div className="relative w-72 h-72 rounded-full border border-[#087E8B]/30 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-[#9A6F28]/40 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#087E8B]/20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasMountRef}
      data-testid="museum-webgl-canvas"
      aria-label="Interactive 3D speculative artefact viewport"
      className="fixed inset-0 z-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
};
