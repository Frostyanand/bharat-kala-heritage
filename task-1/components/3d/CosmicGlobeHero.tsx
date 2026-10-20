'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Sparkles, ChevronDown, ArrowDown } from 'lucide-react';

interface Props {
  onScrollToTimeline?: () => void;
}

export const CosmicGlobeHero: React.FC<Props> = ({ onScrollToTimeline }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<'globe' | 'zoom' | 'disintegrating' | 'timeline'>('globe');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FAF7F0');
    scene.fog = new THREE.FogExp2('#FAF7F0', 0.035);

    // 2. Camera setup - centered to look at origin
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.replaceChildren(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xFFF9EE, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFE8D0, 2.6);
    sunLight.position.set(5, 4, 3);
    scene.add(sunLight);

    const softFill = new THREE.DirectionalLight(0xA84B29, 0.85);
    softFill.position.set(-4, -2, -2);
    scene.add(softFill);

    // 5. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Check if wide desktop screen
    const isDesktop = width >= 1024;
    const initialGlobeX = isDesktop ? 1.45 : 0;
    const initialGlobeY = 0.05;
    globeGroup.position.set(initialGlobeX, initialGlobeY, 0);

    // Earth Sphere with antique parchment texture
    const textureLoader = new THREE.TextureLoader();
    const parchmentMap = textureLoader.load('/textures/earth-parchment.jpg');
    parchmentMap.colorSpace = THREE.SRGBColorSpace;

    // Radius tuned so it is fully visible without clipping
    const globeRadius = 1.55;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: parchmentMap,
      roughness: 0.82,
      metalness: 0.08,
      bumpScale: 0.03,
      transparent: true,
      opacity: 1.0,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Latitude & Longitude wireframe ring
    const gridGeo = new THREE.SphereGeometry(globeRadius * 1.015, 24, 16);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0xC29B38,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    globeGroup.add(gridMesh);

    // India Pinpoint & Beacon Calculation
    // In our map texture, India is ~78°E, 22°N
    const lat = 22.0;
    const lon = 78.0;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const indiaX = -(globeRadius * Math.sin(phi) * Math.cos(theta));
    const indiaZ = globeRadius * Math.sin(phi) * Math.sin(theta);
    const indiaY = globeRadius * Math.cos(phi);

    // Golden Beacon Halo on India
    const beaconGeo = new THREE.RingGeometry(0.04, 0.18, 32);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xB85D3B,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.position.set(indiaX, indiaY, indiaZ);
    beaconMesh.lookAt(indiaX * 2, indiaY * 2, indiaZ * 2);
    globeGroup.add(beaconMesh);

    // 6. Particle Disintegration System (18,000 Particles)
    const particleCount = 18000;
    const particleGeo = new THREE.BufferGeometry();
    const origPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const targetVelocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colTerracotta = new THREE.Color(0xA84B29);
    const colGold = new THREE.Color(0xD4AF37);
    const colSand = new THREE.Color(0xE4D9C8);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const pTheta = u * 2.0 * Math.PI;
      const pPhi = Math.acos(2.0 * v - 1.0);
      const r = globeRadius * (0.98 + Math.random() * 0.05);

      const px = r * Math.sin(pPhi) * Math.cos(pTheta);
      const py = r * Math.cos(pPhi);
      const pz = r * Math.sin(pPhi) * Math.sin(pTheta);

      origPositions[i * 3] = px;
      origPositions[i * 3 + 1] = py;
      origPositions[i * 3 + 2] = pz;

      currentPositions[i * 3] = px;
      currentPositions[i * 3 + 1] = py;
      currentPositions[i * 3 + 2] = pz;

      // Disintegration velocity vector (scatter outwards and curl downward into timeline river)
      targetVelocities[i * 3] = (px / r) * 1.5 + (Math.random() - 0.5) * 1.8;
      targetVelocities[i * 3 + 1] = (py / r) * 1.2 - 2.8 - Math.random() * 2.0;
      targetVelocities[i * 3 + 2] = (pz / r) * 1.5 + (Math.random() - 0.5) * 1.8;

      const randChoice = Math.random();
      const chosenColor = randChoice < 0.4 ? colGold : randChoice < 0.75 ? colTerracotta : colSand;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.0,
      blending: THREE.NormalBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Initial globe orientation:
    // Adding Math.PI (3.14) to 1.2 => 4.34 rad brings India & Eastern hemisphere directly front and center!
    const baseRotationY = 4.34;
    const baseRotationX = 0.22;
    globeGroup.rotation.y = baseRotationY;
    globeGroup.rotation.x = baseRotationX;

    // 7. Scroll Listener & Scrollytelling Choreography
    let scrollVal = 0;
    const maxHeroScroll = 1200;

    const handleScroll = () => {
      scrollVal = Math.min(Math.max(window.scrollY, 0), maxHeroScroll);
      const progress = scrollVal / maxHeroScroll;
      setScrollProgress(progress);

      if (progress < 0.3) {
        setCurrentStage('globe');
      } else if (progress < 0.6) {
        setCurrentStage('zoom');
      } else if (progress < 0.95) {
        setCurrentStage('disintegrating');
      } else {
        setCurrentStage('timeline');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const progress = scrollVal / maxHeroScroll;
      const isCurrentlyDesktop = (container?.clientWidth || window.innerWidth) >= 1024;
      const targetBaseX = isCurrentlyDesktop ? 1.45 : 0;

      if (progress < 0.35) {
        // Stage 1: Globe on the right with gentle idle breathing, India in view
        const pPhase = progress / 0.35;
        globeGroup.position.x = THREE.MathUtils.lerp(targetBaseX, targetBaseX * 0.7, pPhase);
        globeGroup.position.y = initialGlobeY;
        globeGroup.rotation.y = baseRotationY + pPhase * 0.35;
        globeGroup.rotation.x = baseRotationX + pPhase * 0.1;
        camera.position.z = 5.0 - pPhase * 1.0;

        globeMat.opacity = 1.0;
        gridMat.opacity = 0.22;
        particleMat.opacity = 0.0;
        beaconMat.opacity = 0.6 + Math.sin(time * 3.5) * 0.3;
      } else if (progress < 0.65) {
        // Stage 2: Zoom toward India & center the globe
        const zoomPhase = (progress - 0.35) / 0.3;
        globeGroup.position.x = THREE.MathUtils.lerp(targetBaseX * 0.7, 0, zoomPhase);
        globeGroup.position.y = THREE.MathUtils.lerp(initialGlobeY, 0, zoomPhase);
        globeGroup.rotation.y = (baseRotationY + 0.35) + zoomPhase * 0.45;
        globeGroup.rotation.x = (baseRotationX + 0.1) - zoomPhase * 0.15;
        camera.position.z = 4.0 - zoomPhase * 1.5;

        globeMat.opacity = 1.0 - zoomPhase * 0.5;
        gridMat.opacity = 0.22 - zoomPhase * 0.15;
        particleMat.opacity = zoomPhase * 0.9;
        beaconMat.opacity = (1.0 - zoomPhase) * (0.8 + Math.sin(time * 6) * 0.2);

        // Position particle system to match globe center
        particleSystem.position.copy(globeGroup.position);
        particleSystem.rotation.copy(globeGroup.rotation);
      } else {
        // Stage 3 & 4: Particle Disintegration into Timeline ribbon!
        const disPhase = Math.min((progress - 0.65) / 0.35, 1.0);
        globeMat.opacity = Math.max(0, 0.5 - disPhase * 1.0);
        gridMat.opacity = 0;
        beaconMat.opacity = 0;
        particleMat.opacity = Math.max(0, 1.0 - disPhase * 0.4);

        particleSystem.position.copy(globeGroup.position);
        particleSystem.rotation.copy(globeGroup.rotation);

        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const origX = origPositions[idx];
          const origY = origPositions[idx + 1];
          const origZ = origPositions[idx + 2];

          const vx = targetVelocities[idx];
          const vy = targetVelocities[idx + 1];
          const vz = targetVelocities[idx + 2];

          posArray[idx] = origX + vx * disPhase * 1.8 + Math.sin(origY * 3 + time) * 0.15 * disPhase;
          posArray[idx + 1] = origY + vy * disPhase * 2.2;
          posArray[idx + 2] = origZ + vz * disPhase * 1.5;
        }
        posAttr.needsUpdate = true;
      }

      beaconMesh.scale.setScalar(1.0 + Math.sin(time * 3) * 0.2);

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const scrollToTimeline = () => {
    if (onScrollToTimeline) {
      onScrollToTimeline();
    } else {
      const timelineElem = document.getElementById('timeline-section');
      if (timelineElem) {
        timelineElem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 1250, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full h-[180vh]">
      {/* Sticky 3D WebGL Canvas Layer */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* WebGL 3D Canvas in background */}
        <div ref={mountRef} className="w-full h-full absolute inset-0" />

        {/* Hero Narrative Overlay - Structured with Left Column for Text and Right Column for Globe */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between py-12 pointer-events-none">
          
          {/* Top Left Curatorial Header - Dedicated Left Column with Zero Globe Overlap */}
          <div className="pt-16 sm:pt-20 lg:w-[48%] max-w-xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D8CCA8] shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B85D3B] animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C4F3B]">
                Archaeological & Visual Heritage Archive · National Repository
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading text-[#1C1A17] leading-[1.08] tracking-tight">
              KALA PRAVAH
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-[#B85D3B] mt-2 font-body-editorial italic">
                काल प्रवाह · Five Millennia of Artistic Consciousness
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#3D352E] font-body-editorial leading-relaxed">
              An interactive chronological odyssey from the proto-historic bronze artisans of Mohenjo-daro to classical Gupta murals, imperial Chola metallurgy, and living tribal cosmologies.
            </p>
          </div>

          {/* Bottom Controls HUD */}
          <div className="pb-8 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pointer-events-auto">
            {/* Scrollytelling Stage Callout - Confined to left column so globe stays clear */}
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#E7DFD2] shadow-sm max-w-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B85D3B] uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>
                  {currentStage === 'globe' && 'Act I: The Earth in Antiquity'}
                  {currentStage === 'zoom' && 'Act II: Descent into Bharatvarsha'}
                  {currentStage === 'disintegrating' && 'Act III: The Mahapralaya Disintegration'}
                  {currentStage === 'timeline' && 'Act IV: Entering Kala Pravah Timeline'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A453F]">
                {currentStage === 'globe' && 'Scroll downward to initiate the smooth descent into the Indian subcontinent.'}
                {currentStage === 'zoom' && 'Targeting coordinates 20.6°N, 78.9°E — ancient cradle of Harappan & Vedic arts.'}
                {currentStage === 'disintegrating' && 'The terrestrial globe dissolves into 18,000 golden particles forming the River of Time.'}
                {currentStage === 'timeline' && 'Welcome to the interactive chronological exhibition. Click any artifact to inspect.'}
              </p>

              {/* Progress bar */}
              <div className="w-full h-1 bg-[#E7DFD2] rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#B85D3B] via-[#C29B38] to-[#1F3A52] transition-all duration-150"
                  style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollToTimeline}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#A84B29] hover:bg-[#8C3D20] text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold"
              >
                <span>Explore Timeline</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Prompt Arrow */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none opacity-80 animate-bounce">
          <span className="text-[11px] uppercase tracking-widest text-[#7E766D] font-medium">Scroll to Unfold</span>
          <ChevronDown className="w-4 h-4 text-[#A84B29]" />
        </div>
      </div>
    </div>
  );
};
