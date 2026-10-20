'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Artifact } from '@/data/artifacts';
import { Rotate3D, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

interface Props {
  artifact: Artifact;
  autoRotate?: boolean;
}

export const VirtualArtifact3D: React.FC<Props> = ({ artifact, autoRotate = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F3EB'); // Warm museum pedestal background

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.replaceChildren(renderer.domElement);

    // 4. Museum Lighting
    const ambientLight = new THREE.AmbientLight(0xFFF8EE, 1.2);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xFFE6C2, 2.8);
    mainSpot.position.set(3, 5, 4);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.5;
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0xA84B29, 1.4); // Terracotta rim light
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x7EA5C9, 0.8); // Soft blue sky fill
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // 5. Build Artifact 3D Mesh Representation
    const artifactGroup = new THREE.Group();
    meshGroupRef.current = artifactGroup;
    scene.add(artifactGroup);

    // Texture Loader for artifact plate
    const textureLoader = new THREE.TextureLoader();
    const artifactTexture = textureLoader.load(artifact.imageUrl);
    artifactTexture.colorSpace = THREE.SRGBColorSpace;

    // Circular Museum Pedestal Base
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.2, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xE4D9C8,
      roughness: 0.85,
      metalness: 0.1
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.3;
    pedestal.receiveShadow = true;
    artifactGroup.add(pedestal);

    // Specific 3D Model representations based on artifact.modelType
    switch (artifact.modelType) {
      case 'bronze-statue': {
        // Harappan bronze figure sculpture with lost-wax texture
        const bronzeMat = new THREE.MeshStandardMaterial({
          color: 0x3E4B42,
          roughness: 0.45,
          metalness: 0.75,
          bumpScale: 0.05
        });

        // Torso & head
        const headGeo = new THREE.SphereGeometry(0.32, 24, 24);
        const head = new THREE.Mesh(headGeo, bronzeMat);
        head.position.y = 0.85;

        // Chignon bun
        const bunGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const bun = new THREE.Mesh(bunGeo, bronzeMat);
        bun.position.set(0.18, 0.95, -0.15);
        head.add(bun);

        // Slender Tribhanga Torso
        const torsoGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.8, 16);
        const torso = new THREE.Mesh(torsoGeo, bronzeMat);
        torso.position.y = 0.25;
        torso.rotation.z = -0.12; // Dynamic curve

        // Arms with stacked bangles
        const leftArmGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.75, 12);
        const leftArm = new THREE.Mesh(leftArmGeo, bronzeMat);
        leftArm.position.set(-0.35, 0.2, 0.1);
        leftArm.rotation.z = 0.45;

        // Legs
        const legGeo = new THREE.CylinderGeometry(0.09, 0.07, 1.0, 12);
        const legLeft = new THREE.Mesh(legGeo, bronzeMat);
        legLeft.position.set(-0.16, -0.65, 0.05);
        const legRight = new THREE.Mesh(legGeo, bronzeMat);
        legRight.position.set(0.16, -0.65, -0.05);
        legRight.rotation.z = -0.1;

        artifactGroup.add(head);
        artifactGroup.add(torso);
        artifactGroup.add(leftArm);
        artifactGroup.add(legLeft);
        artifactGroup.add(legRight);
        break;
      }

      case 'sandstone-capital': {
        // Ashoka Lion Capital (Monolithic sandstone cylinder with 4 lions abacus)
        const sandstoneMat = new THREE.MeshStandardMaterial({
          color: 0xD6A962,
          roughness: 0.6,
          metalness: 0.15
        });

        // Inverted bell lotus base
        const bellGeo = new THREE.CylinderGeometry(0.8, 0.4, 0.7, 32);
        const bell = new THREE.Mesh(bellGeo, sandstoneMat);
        bell.position.y = -0.7;

        // Abacus drum with Dharmachakra wheels
        const abacusGeo = new THREE.CylinderGeometry(0.9, 0.85, 0.45, 32);
        const abacus = new THREE.Mesh(abacusGeo, sandstoneMat);
        abacus.position.y = -0.15;

        // Four stylized lions sitting back-to-back
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          const lionGeo = new THREE.BoxGeometry(0.5, 0.8, 0.5);
          const lion = new THREE.Mesh(lionGeo, sandstoneMat);
          lion.position.set(Math.cos(angle) * 0.35, 0.45, Math.sin(angle) * 0.35);
          lion.rotation.y = -angle;
          artifactGroup.add(lion);
        }

        artifactGroup.add(bell);
        artifactGroup.add(abacus);
        break;
      }

      case 'flaming-ring': {
        // Chola Nataraja flaming halo (prabhamandala) and dancing figure
        const bronzeMat = new THREE.MeshStandardMaterial({
          color: 0x544738,
          roughness: 0.4,
          metalness: 0.82
        });

        // Flaming ring (Torus)
        const ringGeo = new THREE.TorusGeometry(1.15, 0.08, 16, 64);
        const ring = new THREE.Mesh(ringGeo, bronzeMat);
        ring.position.y = 0.1;

        // Flames on the ring perimeter
        const flameGeo = new THREE.ConeGeometry(0.06, 0.18, 8);
        for (let i = 0; i < 28; i++) {
          const angle = (i / 28) * Math.PI * 2;
          const flame = new THREE.Mesh(flameGeo, bronzeMat);
          flame.position.set(Math.cos(angle) * 1.22, Math.sin(angle) * 1.22 + 0.1, 0);
          flame.rotation.z = angle - Math.PI / 2;
          artifactGroup.add(flame);
        }

        // Dancing Nataraja Center
        const bodyGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.9, 12);
        const body = new THREE.Mesh(bodyGeo, bronzeMat);
        body.position.y = 0.2;

        // Raised leg in Ananda Tandava
        const raisedLegGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.7, 8);
        const raisedLeg = new THREE.Mesh(raisedLegGeo, bronzeMat);
        raisedLeg.position.set(-0.25, -0.05, 0.15);
        raisedLeg.rotation.z = 1.1;

        // Standing leg crushing Apasmara
        const standingLegGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.65, 8);
        const standingLeg = new THREE.Mesh(standingLegGeo, bronzeMat);
        standingLeg.position.set(0.1, -0.4, 0);

        // Apasmara dwarf base
        const dwarfGeo = new THREE.BoxGeometry(0.5, 0.18, 0.3);
        const dwarf = new THREE.Mesh(dwarfGeo, bronzeMat);
        dwarf.position.set(0.1, -0.75, 0);

        artifactGroup.add(ring);
        artifactGroup.add(body);
        artifactGroup.add(raisedLeg);
        artifactGroup.add(standingLeg);
        artifactGroup.add(dwarf);
        break;
      }

      default: {
        // High fidelity museum tablet/canvas replica for paintings and murals
        const plateGeo = new THREE.BoxGeometry(1.6, 2.2, 0.12);
        const materials = [
          new THREE.MeshStandardMaterial({ color: 0xD4C6AA, roughness: 0.8 }), // right
          new THREE.MeshStandardMaterial({ color: 0xD4C6AA, roughness: 0.8 }), // left
          new THREE.MeshStandardMaterial({ color: 0xD4C6AA, roughness: 0.8 }), // top
          new THREE.MeshStandardMaterial({ color: 0xD4C6AA, roughness: 0.8 }), // bottom
          new THREE.MeshStandardMaterial({
            map: artifactTexture,
            roughness: 0.5,
            metalness: artifact.modelType === 'gilded-frame' ? 0.35 : 0.05
          }), // front image
          new THREE.MeshStandardMaterial({ color: 0x8C7862, roughness: 0.9 })  // back
        ];
        const plate = new THREE.Mesh(plateGeo, materials);
        plate.position.y = 0.1;
        plate.castShadow = true;
        plate.receiveShadow = true;
        artifactGroup.add(plate);

        // Add ornate frame if it's a gilded or miniature frame
        if (artifact.modelType === 'gilded-frame' || artifact.modelType === 'miniature-scroll') {
          const frameGeo = new THREE.BoxGeometry(1.75, 2.35, 0.14);
          const frameMat = new THREE.MeshStandardMaterial({
            color: artifact.modelType === 'gilded-frame' ? 0xD4AF37 : 0x8A5A36,
            roughness: 0.35,
            metalness: artifact.modelType === 'gilded-frame' ? 0.8 : 0.2
          });
          const frame = new THREE.Mesh(frameGeo, frameMat);
          frame.position.set(0, 0.1, -0.02);
          artifactGroup.add(frame);
        }
        break;
      }
    }

    // 6. Interaction Handlers (Mouse & Touch Drag to Rotate 360°)
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch handlers
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.015;
      meshGroupRef.current.rotation.x += deltaY * 0.015;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // 7. Render Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && !isDraggingRef.current && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Listener
    const handleResize = () => {
      if (!container || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [artifact, isRotating]);

  const handleZoom = (inOut: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const step = inOut === 'in' ? -0.5 : 0.5;
    const newZ = Math.min(Math.max(cameraRef.current.position.z + step, 2.0), 6.5);
    cameraRef.current.position.z = newZ;
  };

  const resetOrientation = () => {
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div 
      className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#E7DFD2] shadow-inner select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="w-full h-full absolute inset-0" />

      {/* Floating 3D Interaction Control HUD */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => setIsRotating(!isRotating)}
          title={isRotating ? "Pause Auto-rotation" : "Resume Auto-rotation"}
          className={`p-2.5 rounded-full border shadow-sm transition-all duration-300 ${
            isRotating 
              ? 'bg-[#A84B29] text-white border-[#873C20]' 
              : 'bg-white/90 text-[#3D352E] hover:bg-white border-[#E2D9CC]'
          }`}
        >
          <Rotate3D className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </button>

        <button
          onClick={() => handleZoom('in')}
          title="Zoom In"
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#3D352E] border border-[#E2D9CC] shadow-sm transition-all duration-200"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleZoom('out')}
          title="Zoom Out"
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#3D352E] border border-[#E2D9CC] shadow-sm transition-all duration-200"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Prompt / Instruction Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E7DFD2] shadow-sm text-xs font-medium text-[#4A453F]">
          <Sparkles className="w-3.5 h-3.5 text-[#B85D3B]" />
          <span>Click & Drag to rotate 360° replica</span>
        </div>
        <button
          onClick={resetOrientation}
          className="pointer-events-auto px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[11px] font-semibold text-[#A84B29] border border-[#E7DFD2] shadow-sm transition-all"
        >
          Reset View
        </button>
      </div>
    </div>
  );
};
