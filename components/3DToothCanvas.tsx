'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDToothCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Group for mouse parallax rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- PROCEDURAL 3D TOOTH MODEL ---
    const toothGroup = new THREE.Group();

    // Tooth Crown (smooth organic top with cusps)
    const crownShape = new THREE.Shape();
    crownShape.moveTo(-0.9, 0);
    crownShape.bezierCurveTo(-1.1, 0.6, -0.7, 1.2, -0.3, 1.25);
    crownShape.bezierCurveTo(0, 1.3, 0.3, 1.25, 0.7, 1.25);
    crownShape.bezierCurveTo(1.1, 1.2, 1.1, 0.6, 0.9, 0);
    crownShape.bezierCurveTo(0.7, -0.3, -0.7, -0.3, -0.9, 0);

    const extrudeSettings = {
      steps: 4,
      depth: 0.6,
      bevelEnabled: true,
      bevelThickness: 0.4,
      bevelSize: 0.3,
      bevelOffset: 0,
      bevelSegments: 8,
    };

    const crownGeo = new THREE.ExtrudeGeometry(crownShape, extrudeSettings);
    crownGeo.center();

    // Luxury Porcelain Pearl Shader Material
    const pearlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.25, // Glass translucency
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      ior: 1.5,
    });

    const crownMesh = new THREE.Mesh(crownGeo, pearlMaterial);
    crownMesh.castShadow = true;
    crownMesh.receiveShadow = true;
    toothGroup.add(crownMesh);

    // Tooth Roots (Dual organic roots)
    const rootGeoLeft = new THREE.ConeGeometry(0.35, 1.4, 32);
    rootGeoLeft.translate(-0.4, -1.0, 0);
    rootGeoLeft.rotateZ(0.15);
    const rootMeshLeft = new THREE.Mesh(rootGeoLeft, pearlMaterial);
    toothGroup.add(rootMeshLeft);

    const rootGeoRight = new THREE.ConeGeometry(0.32, 1.3, 32);
    rootGeoRight.translate(0.4, -0.95, 0);
    rootGeoRight.rotateZ(-0.15);
    const rootMeshRight = new THREE.Mesh(rootGeoRight, pearlMaterial);
    toothGroup.add(rootMeshRight);

    toothGroup.position.set(0, 0.2, 0);
    mainGroup.add(toothGroup);

    // --- ORBITING DENTAL ACCESSORIES ---

    // 1. Glowing Mint Ring Orbit
    const ringGeo = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00c9a7,
      emissive: 0x00c9a7,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    // 2. Floating 3D Sparkle / Diamond Stars
    const sparklesGroup = new THREE.Group();
    const sparkleGeo = new THREE.OctahedronGeometry(0.18, 0);
    const sparkleMat = new THREE.MeshStandardMaterial({
      color: 0x0f9dff,
      emissive: 0x0f9dff,
      emissiveIntensity: 1,
    });

    const sparklePositions = [
      [1.8, 1.2, 0.5],
      [-1.9, -0.8, 0.8],
      [1.5, -1.5, -0.6],
      [-1.4, 1.6, -0.4],
      [0, 2.1, 0.2],
    ];

    sparklePositions.forEach((pos) => {
      const sp = new THREE.Mesh(sparkleGeo, sparkleMat);
      sp.position.set(pos[0], pos[1], pos[2]);
      sparklesGroup.add(sp);
    });
    mainGroup.add(sparklesGroup);

    // 3. Floating Toothbrush Handle Accent
    const brushGroup = new THREE.Group();
    const handleGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 16);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0x0f9dff,
      roughness: 0.3,
    });
    const handleMesh = new THREE.Mesh(handleGeo, handleMat);
    brushGroup.add(handleMesh);

    const bristleGeo = new THREE.BoxGeometry(0.15, 0.3, 0.12);
    const bristleMat = new THREE.MeshStandardMaterial({ color: 0x00c9a7 });
    const bristleMesh = new THREE.Mesh(bristleGeo, bristleMat);
    bristleMesh.position.set(0, 0.8, 0.08);
    brushGroup.add(bristleMesh);

    brushGroup.position.set(-2.2, 0.6, -0.5);
    brushGroup.rotation.z = -Math.PI / 4;
    mainGroup.add(brushGroup);

    // --- PARTICLES DUST FIELD ---
    const particlesCount = 80;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0f9dff, 5, 20);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const mintLight = new THREE.PointLight(0x00c9a7, 4, 20);
    mintLight.position.set(-5, -3, 4);
    scene.add(mintLight);

    const topSun = new THREE.DirectionalLight(0xffffff, 2);
    topSun.position.set(0, 8, 5);
    topSun.castShadow = true;
    scene.add(topSun);

    // --- MOUSE PARALLAX & ANIMATION LOOP ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Parallax interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 0.5 + elapsedTime * 0.3;
      mainGroup.rotation.x = -targetY * 0.3;

      // Floating tooth oscillation
      toothGroup.position.y = 0.2 + Math.sin(elapsedTime * 1.8) * 0.15;
      toothGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.05;

      // Orbiting ring
      ringMesh.rotation.z = elapsedTime * 0.4;
      sparklesGroup.rotation.y = -elapsedTime * 0.6;
      brushGroup.position.y = 0.6 + Math.cos(elapsedTime * 1.5) * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[450px] sm:h-[550px] lg:h-[620px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      {/* Background Soft Ambient Light Glow Pill */}
      <div className="absolute inset-0 bg-gradient-to-tr from-dental-blue/20 via-dental-mint/20 to-transparent rounded-full blur-3xl -z-10 animate-pulse-glow" />
    </div>
  );
}
