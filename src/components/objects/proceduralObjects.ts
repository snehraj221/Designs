import * as THREE from 'three';
import { ObjectId } from '../../data/objects';

export interface ProceduralArtefactHandle {
  group: THREE.Group;
  update: (elapsed: number, delta: number, exploded: number, reducedMotion: boolean) => void;
  setWireframe: (enabled: boolean) => void;
}

function registerExplodablePart(
  mesh: THREE.Object3D,
  explodeVector: [number, number, number],
) {
  mesh.userData.basePos = mesh.position.clone();
  mesh.userData.explodeVec = new THREE.Vector3(
    explodeVector[0],
    explodeVector[1],
    explodeVector[2],
  );
}

function applyExplodeDamping(
  group: THREE.Group,
  exploded: number,
  delta: number,
) {
  group.children.forEach((child) => {
    const basePos = child.userData.basePos as THREE.Vector3 | undefined;
    const explodeVec = child.userData.explodeVec as THREE.Vector3 | undefined;
    if (basePos && explodeVec) {
      const targetX = basePos.x + explodeVec.x * exploded;
      const targetY = basePos.y + explodeVec.y * exploded;
      const targetZ = basePos.z + explodeVec.z * exploded;
      child.position.x = THREE.MathUtils.damp(child.position.x, targetX, 6, delta);
      child.position.y = THREE.MathUtils.damp(child.position.y, targetY, 6, delta);
      child.position.z = THREE.MathUtils.damp(child.position.z, targetZ, 6, delta);
    }
  });
}

function createContactShadow(): THREE.Mesh {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
    grad.addColorStop(0, 'rgba(15, 20, 26, 0.28)');
    grad.addColorStop(0.5, 'rgba(15, 20, 26, 0.08)');
    grad.addColorStop(1, 'rgba(246, 245, 240, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
    opacity: 0.85,
  });
  const disc = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), mat);
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = -1.55;
  return disc;
}

export function createHeroGenesisArtefact(isSoftwareGl: boolean): ProceduralArtefactHandle {
  const group = new THREE.Group();
  group.position.set(0.35, 0.1, 0);

  // 1. Central Sculpted Brushed Titanium TorusKnot Core
  const knotGeo = new THREE.TorusKnotGeometry(0.68, 0.18, isSoftwareGl ? 72 : 128, isSoftwareGl ? 16 : 32, 2, 3);
  const knotMat = new THREE.MeshPhysicalMaterial({
    color: 0x24303c,
    metalness: 0.65,
    roughness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });
  const knotMesh = new THREE.Mesh(knotGeo, knotMat);
  registerExplodablePart(knotMesh, [0, 0, 0]);
  group.add(knotMesh);

  // 2. Inner Deep Teal Singularity Sphere
  const coreGeo = new THREE.OctahedronGeometry(0.42, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x087e8b,
    emissive: 0x087e8b,
    emissiveIntensity: 0.55,
    roughness: 0.2,
    metalness: 0.2,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  registerExplodablePart(coreMesh, [0, 0.85, 0]);
  group.add(coreMesh);

  // 3. Outer Smoked Glass Containment Shell
  const shellGeo = new THREE.IcosahedronGeometry(1.18, isSoftwareGl ? 2 : 3);
  const shellMat = new THREE.MeshPhysicalMaterial({
    color: 0x087e8b,
    metalness: 0.05,
    roughness: 0.08,
    transmission: isSoftwareGl ? 0 : 0.85,
    transparent: true,
    opacity: isSoftwareGl ? 0.18 : 0.9,
    ior: 1.52,
    thickness: 0.9,
    depthWrite: false,
  });
  const shellMesh = new THREE.Mesh(shellGeo, shellMat);
  shellMesh.renderOrder = 2;
  registerExplodablePart(shellMesh, [0, 0, 1.1]);
  group.add(shellMesh);

  // 4. Primary Brushed Architectural Bronze Gimbal Ring
  const ring1Geo = new THREE.TorusGeometry(1.46, 0.036, 16, isSoftwareGl ? 64 : 100);
  const ring1Mat = new THREE.MeshStandardMaterial({
    color: 0x9a6f28,
    metalness: 0.72,
    roughness: 0.24,
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  registerExplodablePart(ring1, [0.9, 0.4, 0]);
  group.add(ring1);

  // 5. Secondary Deep Teal Precision Gimbal Ring
  const ring2Geo = new THREE.TorusGeometry(1.72, 0.026, 16, isSoftwareGl ? 64 : 100);
  const ring2Mat = new THREE.MeshStandardMaterial({
    color: 0x087e8b,
    metalness: 0.55,
    roughness: 0.25,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 4;
  registerExplodablePart(ring2, [-0.9, -0.4, 0]);
  group.add(ring2);

  // 6. Equatorial Satellite Nodes
  const satellites = new THREE.Group();
  const satGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.3, 12);
  const satMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.65,
    roughness: 0.22,
  });
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const sat = new THREE.Mesh(satGeo, satMat);
    sat.position.set(Math.cos(angle) * 1.9, Math.sin(angle * 2) * 0.2, Math.sin(angle) * 1.9);
    sat.lookAt(0, 0, 0);
    satellites.add(sat);
  }
  registerExplodablePart(satellites, [0, -0.7, 0]);
  group.add(satellites);

  // 7. Grounding Pedestal Ring & Contact Shadow
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.75, 0.98, 0.22, 32),
    new THREE.MeshStandardMaterial({
      color: 0xd6d1c7,
      metalness: 0.25,
      roughness: 0.5,
    }),
  );
  pedestal.position.y = -1.35;
  registerExplodablePart(pedestal, [0, -0.8, 0]);
  group.add(pedestal);

  const shadow = createContactShadow();
  group.add(shadow);

  return {
    group,
    update(elapsed, delta, exploded, reducedMotion) {
      applyExplodeDamping(group, exploded, delta);
      if (reducedMotion) return;
      knotMesh.rotation.x = elapsed * 0.22;
      knotMesh.rotation.y = elapsed * 0.31;
      coreMesh.rotation.y = -elapsed * 0.5;
      const pulse = 1 + Math.sin(elapsed * 2.2) * 0.05;
      coreMesh.scale.setScalar(pulse);
      ring1.rotation.z = elapsed * 0.18;
      ring2.rotation.x = Math.PI / 4 + elapsed * 0.14;
      satellites.rotation.y = -elapsed * 0.12;
    },
    setWireframe(enabled) {
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && obj !== shadow) {
          const mat = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
          mat.wireframe = enabled;
        }
      });
    },
  };
}

export function createObjectArtefact(
  id: ObjectId,
  isSoftwareGl: boolean,
): ProceduralArtefactHandle {
  const group = new THREE.Group();
  const shadow = createContactShadow();
  group.add(shadow);

  if (id === 'aura') {
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x087e8b,
      emissive: 0x087e8b,
      emissiveIntensity: 0.55,
      roughness: 0.22,
      metalness: 0.2,
    });
    const nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 2), nucleusMat);
    registerExplodablePart(nucleus, [0, 0.75, 0]);
    group.add(nucleus);

    const latticeMat = new THREE.MeshStandardMaterial({
      color: 0x9a6f28,
      metalness: 0.75,
      roughness: 0.25,
      wireframe: true,
    });
    const lattice = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7, 1), latticeMat);
    registerExplodablePart(lattice, [0, 0.35, 0]);
    group.add(lattice);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x24303c,
      metalness: 0.75,
      roughness: 0.22,
    });
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.028, 16, 64), ringMat);
    innerRing.rotation.x = Math.PI / 2.4;
    registerExplodablePart(innerRing, [0.85, 0, 0]);
    group.add(innerRing);

    const outerRing = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.032, 16, 72), ringMat);
    outerRing.rotation.y = Math.PI / 3;
    registerExplodablePart(outerRing, [-0.85, 0, 0]);
    group.add(outerRing);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x087e8b,
      metalness: 0.05,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.86,
      transparent: true,
      opacity: isSoftwareGl ? 0.22 : 0.92,
      ior: 1.48,
      thickness: 0.8,
      clearcoat: 1.0,
      depthWrite: false,
    });
    const vessel = new THREE.Mesh(new THREE.SphereGeometry(1.12, isSoftwareGl ? 24 : 48, isSoftwareGl ? 24 : 48), glassMat);
    vessel.renderOrder = 2;
    registerExplodablePart(vessel, [0, 0, 1.05]);
    group.add(vessel);

    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x24303c,
      metalness: 0.55,
      roughness: 0.38,
    });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.82, 0.24, 32), baseMat);
    base.position.y = -1.25;
    registerExplodablePart(base, [0, -0.75, 0]);
    group.add(base);

    return {
      group,
      update(elapsed, delta, exploded, reducedMotion) {
        applyExplodeDamping(group, exploded, delta);
        if (reducedMotion) return;
        nucleus.scale.setScalar(1 + Math.sin(elapsed * 2.5) * 0.06);
        lattice.rotation.y = elapsed * 0.35;
        lattice.rotation.z = elapsed * 0.2;
        innerRing.rotation.z = elapsed * 0.45;
        outerRing.rotation.x = elapsed * 0.28;
      },
      setWireframe(enabled) {
        group.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh && obj !== shadow) {
            ((obj as THREE.Mesh).material as THREE.MeshStandardMaterial).wireframe = enabled;
          }
        });
      },
    };
  }

  if (id === 'sola') {
    const waveGroup = new THREE.Group();
    const stripCount = 9;
    const stripMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < stripCount; i++) {
      const t = (i / (stripCount - 1)) * 2 - 1;
      const curvePoints: THREE.Vector3[] = [];
      for (let j = 0; j <= 16; j++) {
        const u = (j / 16) * 2 - 1;
        const x = u * 1.25;
        const z = t * 0.95;
        const y = Math.sin(u * Math.PI + t * 1.5) * 0.35;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.045, 8, false);
      const isGold = i % 2 === 0;
      const mat = new THREE.MeshPhysicalMaterial({
        color: isGold ? 0x9a6f28 : 0x087e8b,
        metalness: 0.65,
        roughness: 0.22,
        clearcoat: 0.8,
      });
      const mesh = new THREE.Mesh(tubeGeo, mat);
      stripMeshes.push(mesh);
      waveGroup.add(mesh);
    }
    registerExplodablePart(waveGroup, [0, 0.65, 0]);
    group.add(waveGroup);

    const membraneGeo = new THREE.PlaneGeometry(2.4, 1.8, 28, 28);
    const posAttr = membraneGeo.attributes.position;
    for (let k = 0; k < posAttr.count; k++) {
      const px = posAttr.getX(k);
      const py = posAttr.getY(k);
      posAttr.setZ(k, Math.sin(px * 2.2 + py * 1.8) * 0.25);
    }
    membraneGeo.computeVertexNormals();
    const membraneMat = new THREE.MeshPhysicalMaterial({
      color: 0x334155,
      metalness: 0.35,
      roughness: 0.25,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
      clearcoat: 1.0,
    });
    const membrane = new THREE.Mesh(membraneGeo, membraneMat);
    membrane.rotation.x = -Math.PI / 2.3;
    registerExplodablePart(membrane, [0, 0, 0.75]);
    group.add(membrane);

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.75,
      roughness: 0.25,
    });
    const frameRing = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.038, 16, 64), frameMat);
    frameRing.rotation.x = Math.PI / 2.3;
    registerExplodablePart(frameRing, [0, -0.65, 0]);
    group.add(frameRing);

    return {
      group,
      update(elapsed, delta, exploded, reducedMotion) {
        applyExplodeDamping(group, exploded, delta);
        if (reducedMotion) return;
        waveGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.25;
        membrane.rotation.z = Math.cos(elapsed * 0.4) * 0.12;
        stripMeshes.forEach((m, idx) => {
          m.position.y = Math.sin(elapsed * 2 + idx * 0.6) * 0.08;
        });
      },
      setWireframe(enabled) {
        group.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh && obj !== shadow) {
            ((obj as THREE.Mesh).material as THREE.MeshStandardMaterial).wireframe = enabled;
          }
        });
      },
    };
  }

  if (id === 'memento') {
    const strataCount = 5;
    const strataMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < strataCount; i++) {
      const yOffset = (i - (strataCount - 1) / 2) * 0.42;
      const plateGeo = new THREE.BoxGeometry(1.5 - i * 0.12, 0.045, 1.5 - i * 0.12);
      const plateMat = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0x087e8b : 0x334155,
        metalness: 0.15,
        roughness: 0.12,
        transmission: isSoftwareGl ? 0 : 0.8,
        transparent: true,
        opacity: isSoftwareGl ? 0.38 : 0.9,
        ior: 1.52,
        depthWrite: false,
      });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.y = yOffset;
      plate.rotation.y = (i * Math.PI) / 10;
      plate.renderOrder = 2;
      registerExplodablePart(plate, [0, (i - 2) * 0.48, 0]);
      strataMeshes.push(plate);
      group.add(plate);
    }

    const prismMat = new THREE.MeshStandardMaterial({
      color: 0x9a6f28,
      emissive: 0x9a6f28,
      emissiveIntensity: 0.45,
      metalness: 0.7,
      roughness: 0.2,
    });
    const prism = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), prismMat);
    registerExplodablePart(prism, [0.9, 0, 0]);
    group.add(prism);

    const railMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const railsGroup = new THREE.Group();
    const corners = [
      [-0.78, -0.78],
      [0.78, -0.78],
      [0.78, 0.78],
      [-0.78, 0.78],
    ];
    corners.forEach(([cx, cz]) => {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 2.2, 12), railMat);
      rod.position.set(cx, 0, cz);
      railsGroup.add(rod);
    });
    registerExplodablePart(railsGroup, [-0.9, 0, 0]);
    group.add(railsGroup);

    return {
      group,
      update(elapsed, delta, exploded, reducedMotion) {
        applyExplodeDamping(group, exploded, delta);
        if (reducedMotion) return;
        strataMeshes.forEach((plate, idx) => {
          plate.rotation.y = (idx * Math.PI) / 10 + Math.sin(elapsed * 0.8 + idx * 0.5) * 0.22;
        });
        prism.rotation.y = -elapsed * 0.6;
        prism.rotation.x = elapsed * 0.4;
      },
      setWireframe(enabled) {
        group.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh && obj !== shadow) {
            ((obj as THREE.Mesh).material as THREE.MeshStandardMaterial).wireframe = enabled;
          }
        });
      },
    };
  }

  if (id === 'nest') {
    const finGroup = new THREE.Group();
    const finCount = 8;
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x9a6f28,
      metalness: 0.7,
      roughness: 0.28,
    });
    const fins: THREE.Mesh[] = [];
    for (let i = 0; i < finCount; i++) {
      const angle = (i / finCount) * Math.PI * 2;
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.65, 0.48), finMat);
      fin.position.set(Math.cos(angle) * 0.95, 0, Math.sin(angle) * 0.95);
      fin.lookAt(0, 0, 0);
      fins.push(fin);
      finGroup.add(fin);
    }
    registerExplodablePart(finGroup, [0, 0.7, 0]);
    group.add(finGroup);

    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.75,
      roughness: 0.25,
      wireframe: true,
    });
    const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 1), cageMat);
    registerExplodablePart(cage, [0.95, 0, 0]);
    group.add(cage);

    const podMat = new THREE.MeshPhysicalMaterial({
      color: 0x087e8b,
      roughness: 0.18,
      metalness: 0.2,
      clearcoat: 1.0,
    });
    const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.2, 24), podMat);
    registerExplodablePart(pod, [-0.95, 0, 0]);
    group.add(pod);

    const baseRing = new THREE.Mesh(
      new THREE.CylinderGeometry(1.18, 1.28, 0.18, 8),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.55, roughness: 0.4 }),
    );
    baseRing.position.y = -1.05;
    registerExplodablePart(baseRing, [0, -0.75, 0]);
    group.add(baseRing);

    return {
      group,
      update(elapsed, delta, exploded, reducedMotion) {
        applyExplodeDamping(group, exploded, delta);
        if (reducedMotion) return;
        fins.forEach((fin, idx) => {
          fin.rotation.z = Math.sin(elapsed * 1.4 + idx * 0.7) * 0.25;
        });
        cage.rotation.y = elapsed * 0.15;
      },
      setWireframe(enabled) {
        group.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh && obj !== shadow) {
            ((obj as THREE.Mesh).material as THREE.MeshStandardMaterial).wireframe = enabled;
          }
        });
      },
    };
  }

  if (id === 'mycel') {
    const branchGroup = new THREE.Group();
    const branchMat = new THREE.MeshPhysicalMaterial({
      color: 0x8a5f20,
      roughness: 0.42,
      metalness: 0.25,
      clearcoat: 0.6,
    });

    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const pts = [
        new THREE.Vector3(0, -1.0, 0),
        new THREE.Vector3(Math.cos(angle) * 0.35, -0.2, Math.sin(angle) * 0.35),
        new THREE.Vector3(Math.cos(angle + 0.4) * 0.85, 0.55, Math.sin(angle + 0.4) * 0.85),
        new THREE.Vector3(Math.cos(angle) * 0.5, 1.05, Math.sin(angle) * 0.5),
      ];
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.065, 8, false), branchMat);
      branchGroup.add(tube);
    }
    registerExplodablePart(branchGroup, [0, 0.65, 0]);
    group.add(branchGroup);

    const nodeGroup = new THREE.Group();
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x087e8b,
      emissive: 0x087e8b,
      emissiveIntensity: 0.45,
      roughness: 0.2,
    });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const r = 0.4 + (i % 3) * 0.22;
      const y = -0.4 + (i / 12) * 1.4;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 12), nodeMat);
      node.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      nodeGroup.add(node);
    }
    registerExplodablePart(nodeGroup, [0.85, 0.2, 0]);
    group.add(nodeGroup);

    const substrate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.92, 0.35, 24),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.65, metalness: 0.25 }),
    );
    substrate.position.y = -1.1;
    registerExplodablePart(substrate, [0, -0.75, 0]);
    group.add(substrate);

    return {
      group,
      update(elapsed, delta, exploded, reducedMotion) {
        applyExplodeDamping(group, exploded, delta);
        if (reducedMotion) return;
        branchGroup.rotation.y = elapsed * 0.22;
        nodeGroup.rotation.y = elapsed * 0.22;
        nodeGroup.position.y = Math.sin(elapsed * 2) * 0.05;
      },
      setWireframe(enabled) {
        group.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh && obj !== shadow) {
            ((obj as THREE.Mesh).material as THREE.MeshStandardMaterial).wireframe = enabled;
          }
        });
      },
    };
  }

  // OBJECT 006 — ORBIT
  const coreSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, isSoftwareGl ? 24 : 36, isSoftwareGl ? 24 : 36),
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.55,
    }),
  );
  registerExplodablePart(coreSphere, [0, 0, 0]);
  group.add(coreSphere);

  const fairingMat = new THREE.MeshPhysicalMaterial({
    color: 0x475569,
    metalness: 0.72,
    roughness: 0.18,
    clearcoat: 1.0,
  });
  const leftFairing = new THREE.Mesh(
    new THREE.SphereGeometry(0.88, 32, 32, 0, Math.PI * 0.85, 0.2, Math.PI - 0.4),
    fairingMat,
  );
  leftFairing.rotation.y = -0.4;
  registerExplodablePart(leftFairing, [-0.95, 0, 0]);
  group.add(leftFairing);

  const rightFairing = new THREE.Mesh(
    new THREE.SphereGeometry(0.88, 32, 32, Math.PI, Math.PI * 0.85, 0.2, Math.PI - 0.4),
    fairingMat,
  );
  rightFairing.rotation.y = -0.4;
  registerExplodablePart(rightFairing, [0.95, 0, 0]);
  group.add(rightFairing);

  const statorMat = new THREE.MeshStandardMaterial({
    color: 0x087e8b,
    emissive: 0x087e8b,
    emissiveIntensity: 0.4,
    metalness: 0.65,
    roughness: 0.22,
  });
  const statorRing = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.045, 16, 64), statorMat);
  statorRing.rotation.x = Math.PI / 2.1;
  registerExplodablePart(statorRing, [0, 0.75, 0]);
  group.add(statorRing);

  const archRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.36, 0.028, 16, 64),
    new THREE.MeshStandardMaterial({ color: 0x9a6f28, metalness: 0.75, roughness: 0.22 }),
  );
  archRing.rotation.y = Math.PI / 4;
  registerExplodablePart(archRing, [0, -0.75, 0]);
  group.add(archRing);

  return {
    group,
    update(elapsed, delta, exploded, reducedMotion) {
      applyExplodeDamping(group, exploded, delta);
      if (reducedMotion) return;
      coreSphere.rotation.x = elapsed * 0.8;
      statorRing.rotation.z = -elapsed * 0.5;
      archRing.rotation.x = elapsed * 0.3;
    },
    setWireframe(enabled) {
      group.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh && obj !== shadow) {
          ((obj as THREE.Mesh).material as THREE.MeshStandardMaterial).wireframe = enabled;
        }
      });
    },
  };
}
