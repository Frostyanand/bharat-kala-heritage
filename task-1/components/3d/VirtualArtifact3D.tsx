'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Artifact } from '@/data/artifacts';
import { Rotate3D, ZoomIn, ZoomOut, Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  artifact: Artifact;
  autoRotate?: boolean;
}

export const VirtualArtifact3D: React.FC<Props> = ({ artifact, autoRotate = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(autoRotate);
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
    scene.background = new THREE.Color('#FAF7F0');

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.4);
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
    const ambientLight = new THREE.AmbientLight(0xFFFBF2, 1.8);
    scene.add(ambientLight);

    // Direct frontal gallery wash light to vividly illuminate the artwork
    const frontGalleryLight = new THREE.DirectionalLight(0xFFF5E6, 2.2);
    frontGalleryLight.position.set(0, 1.5, 4.5);
    scene.add(frontGalleryLight);

    // Key spotlight for warm bronze/gold highlights
    const keySpot = new THREE.SpotLight(0xFFE8D0, 2.5);
    keySpot.position.set(3, 5, 4);
    keySpot.angle = Math.PI / 4;
    keySpot.penumbra = 0.6;
    scene.add(keySpot);

    // Warm terracotta rim light
    const rimLight = new THREE.DirectionalLight(0xB85D3B, 1.2);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    // Soft lapis fill light from below
    const fillLight = new THREE.DirectionalLight(0x7EA5C9, 0.6);
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // 5. Artifact 3D Presentation Group
    const artifactGroup = new THREE.Group();
    meshGroupRef.current = artifactGroup;
    scene.add(artifactGroup);

    // Load High-Res Museum Plate Texture
    const textureLoader = new THREE.TextureLoader();
    const artifactTexture = textureLoader.load(artifact.imageUrl);
    artifactTexture.colorSpace = THREE.SRGBColorSpace;
    artifactTexture.generateMipmaps = true;
    artifactTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Generate dynamic Archival Reverse Texture for back of specimen
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 1024;
    backCanvas.height = 1024;
    const ctx = backCanvas.getContext('2d');
    if (ctx) {
      // Aged parchment background
      ctx.fillStyle = '#EADECA';
      ctx.fillRect(0, 0, 1024, 1024);

      // Fine linen grain
      ctx.strokeStyle = '#D5C4AB';
      ctx.lineWidth = 1;
      for (let i = 0; i < 1024; i += 8) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(1024, i);
        ctx.stroke();
      }

      // Archival museum seal & inscription
      ctx.strokeStyle = '#8C4F3B';
      ctx.lineWidth = 4;
      ctx.strokeRect(80, 80, 864, 864);
      ctx.strokeRect(95, 95, 834, 834);

      ctx.fillStyle = '#8C4F3B';
      ctx.font = 'bold 36px serif';
      ctx.textAlign = 'center';
      ctx.fillText('ARCHAEOLOGICAL SURVEY OF BHARAT', 512, 180);
      ctx.fillText('अभिलेखीय धरोहर · NATIONAL REPOSITORY', 512, 230);

      ctx.fillStyle = '#2C251E';
      ctx.font = '28px sans-serif';
      ctx.fillText(`SPECIMEN: ${artifact.title.toUpperCase()}`, 512, 360);
      ctx.fillText(`ERA: ${artifact.era.toUpperCase()} (${artifact.dateRange})`, 512, 420);
      ctx.fillText(`PROVENANCE: ${artifact.region.toUpperCase()}`, 512, 480);
      ctx.fillText(`MEDIUM: ${artifact.medium.toUpperCase()}`, 512, 540);

      // Wax stamp seal
      ctx.beginPath();
      ctx.arc(512, 720, 90, 0, Math.PI * 2);
      ctx.fillStyle = '#B85D3B';
      ctx.fill();
      ctx.strokeStyle = '#8A3D22';
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 22px serif';
      ctx.fillText('VERIFIED ARCHIVE', 512, 715);
      ctx.font = '16px sans-serif';
      ctx.fillText('BHARAT KALA', 512, 740);
    }

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;

    // Physical Material properties tuned per artifact class
    let metalnessVal = 0.1;
    let roughnessVal = 0.6;
    let edgeColor = 0xD4C6AA;

    if (artifact.medium.toLowerCase().includes('bronze') || artifact.id.includes('nataraja') || artifact.id.includes('dancing-girl')) {
      metalnessVal = 0.65;
      roughnessVal = 0.38;
      edgeColor = 0x4A3E30; // Dark antique bronze edge
    } else if (artifact.medium.toLowerCase().includes('gold') || artifact.id.includes('tanjore')) {
      metalnessVal = 0.75;
      roughnessVal = 0.28;
      edgeColor = 0xC29B38; // 22k gold leaf edge
    } else if (artifact.medium.toLowerCase().includes('sandstone') || artifact.id.includes('ashoka')) {
      metalnessVal = 0.15;
      roughnessVal = 0.7;
      edgeColor = 0xC4A778; // Buff Chunar sandstone edge
    } else if (artifact.medium.toLowerCase().includes('schist') || artifact.id.includes('gandhara')) {
      metalnessVal = 0.2;
      roughnessVal = 0.65;
      edgeColor = 0x484B52; // Grey schist edge
    }

    // 6. Build the 3D Museum Stela / Tablet (High-Definition Interactive Specimen)
    const tabletWidth = 1.85;
    const tabletHeight = 2.45;
    const tabletDepth = 0.14;

    const tabletGeo = new THREE.BoxGeometry(tabletWidth, tabletHeight, tabletDepth, 4, 4, 2);

    const edgeMat = new THREE.MeshStandardMaterial({
      color: edgeColor,
      roughness: roughnessVal,
      metalness: metalnessVal
    });

    const frontMat = new THREE.MeshStandardMaterial({
      map: artifactTexture,
      roughness: 0.42,
      metalness: 0.15,
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.85,
      metalness: 0.05
    });

    const materials = [
      edgeMat, // Right edge
      edgeMat, // Left edge
      edgeMat, // Top edge
      edgeMat, // Bottom edge
      frontMat, // Front Artwork
      backMat  // Archival Back
    ];

    const specimenMesh = new THREE.Mesh(tabletGeo, materials);
    specimenMesh.position.y = 0.2;
    specimenMesh.castShadow = true;
    specimenMesh.receiveShadow = true;
    artifactGroup.add(specimenMesh);

    // Ornate Beveled Outer Frame for Gilded Paintings & Miniatures
    if (artifact.modelType === 'gilded-frame' || artifact.modelType === 'miniature-scroll') {
      const frameGeo = new THREE.BoxGeometry(tabletWidth + 0.18, tabletHeight + 0.18, tabletDepth + 0.04);
      const frameMat = new THREE.MeshStandardMaterial({
        color: artifact.modelType === 'gilded-frame' ? 0xD4AF37 : 0x6E482B,
        roughness: 0.35,
        metalness: artifact.modelType === 'gilded-frame' ? 0.75 : 0.2
      });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      frameMesh.position.set(0, 0.2, -0.02);
      artifactGroup.add(frameMesh);
    }

    // Architectural Museum Pedestal Base
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -1.2;
    artifactGroup.add(pedestalGroup);

    // Tier 1: Upper brass mount collar
    const collarGeo = new THREE.CylinderGeometry(0.95, 1.05, 0.12, 48);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xC29B38,
      roughness: 0.4,
      metalness: 0.8
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = 0.14;
    pedestalGroup.add(collarMesh);

    // Tier 2: Sandstone block base
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.35, 0.28, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xE2D6C3,
      roughness: 0.85,
      metalness: 0.1
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.receiveShadow = true;
    pedestalGroup.add(baseMesh);

    // Front Brass Plaque with Inscription
    const plaqueGeo = new THREE.PlaneGeometry(1.2, 0.18);
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 512;
    plaqueCanvas.height = 96;
    const pCtx = plaqueCanvas.getContext('2d');
    if (pCtx) {
      pCtx.fillStyle = '#C29B38';
      pCtx.fillRect(0, 0, 512, 96);
      pCtx.fillStyle = '#1C1A17';
      pCtx.font = 'bold 26px serif';
      pCtx.textAlign = 'center';
      pCtx.fillText(artifact.title.length > 28 ? artifact.title.slice(0, 26) + '...' : artifact.title, 256, 42);
      pCtx.font = '18px sans-serif';
      pCtx.fillText(`${artifact.era} · ${artifact.dateRange}`, 256, 75);
    }
    const plaqueTexture = new THREE.CanvasTexture(plaqueCanvas);
    plaqueTexture.colorSpace = THREE.SRGBColorSpace;

    const plaqueMat = new THREE.MeshStandardMaterial({
      map: plaqueTexture,
      roughness: 0.35,
      metalness: 0.7
    });
    const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaqueMesh.position.set(0, 0, 1.28);
    pedestalGroup.add(plaqueMesh);

    // Ambient floating golden dust particles
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 3.5;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 3.0;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 7. Interactive Handlers (Drag to Rotate 360°)
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.012;
      meshGroupRef.current.rotation.x = Math.max(Math.min(meshGroupRef.current.rotation.x + deltaY * 0.012, 0.45), -0.45);

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch Handlers for Mobile / Tablet
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
      meshGroupRef.current.rotation.x = Math.max(Math.min(meshGroupRef.current.rotation.x + deltaY * 0.015, 0.45), -0.45);

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

    // 8. Render & Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (isRotating && !isDraggingRef.current && meshGroupRef.current) {
        meshGroupRef.current.rotation.y += 0.007;
      }

      // Gentle floating of dust
      if (dustParticles) {
        dustParticles.rotation.y = time * 0.03;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Listener
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
    const step = inOut === 'in' ? -0.45 : 0.45;
    const newZ = Math.min(Math.max(cameraRef.current.position.z + step, 2.2), 6.5);
    cameraRef.current.position.z = newZ;
  };

  const resetOrientation = () => {
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0.2, 4.4);
    }
  };

  return (
    <div 
      className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#E7DFD2] shadow-inner select-none cursor-grab active:cursor-grabbing"
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
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E7DFD2] shadow-sm text-xs font-medium text-[#4A453F]">
          <Sparkles className="w-3.5 h-3.5 text-[#B85D3B]" />
          <span>Rotate 360° to inspect sculpture & archival seal</span>
        </div>

        <button
          onClick={resetOrientation}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[11px] font-semibold text-[#A84B29] border border-[#E7DFD2] shadow-sm transition-all"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset View</span>
        </button>
      </div>
    </div>
  );
};
