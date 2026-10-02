import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeProductStageProps {
  imageSrc: string;
}

export const ThreeProductStage: React.FC<ThreeProductStageProps> = ({ imageSrc }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.9);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xf59e0b, 3);
    spotLight.position.set(5, 8, 5);
    spotLight.angle = 0.6;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    const rimLight = new THREE.PointLight(0xd97706, 2, 10);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    // Pedestal Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Golden Circular Pedestal
    const baseGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.35, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1f1712,
      metalness: 0.8,
      roughness: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.4;
    stageGroup.add(baseMesh);

    // Golden Rim on Pedestal
    const rimGeo = new THREE.TorusGeometry(2.22, 0.05, 16, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = -1.22;
    stageGroup.add(rimMesh);

    // Small floating glowing flakes
    const flakeCount = 45;
    const flakeGeo = new THREE.BufferGeometry();
    const flakePos = new Float32Array(flakeCount * 3);
    for (let i = 0; i < flakeCount; i++) {
      flakePos[i * 3] = (Math.random() - 0.5) * 5;
      flakePos[i * 3 + 1] = Math.random() * 3 - 1.2;
      flakePos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    flakeGeo.setAttribute('position', new THREE.BufferAttribute(flakePos, 3));

    const flakeMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.12,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const flakes = new THREE.Points(flakeGeo, flakeMat);
    stageGroup.add(flakes);

    // Animation & Mouse drag
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = 0.005;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      stageGroup.rotation.y += deltaX * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      stageGroup.rotation.y += deltaX * 0.012;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      clock.getDelta();

      if (!isDragging) {
        stageGroup.rotation.y += rotationVelocity;
      }

      // Gentle floating flakes
      const pos = flakeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < flakeCount; i++) {
        const yIndex = i * 3 + 1;
        pos[yIndex] += Math.sin(clock.getElapsedTime() + i) * 0.003;
      }
      flakeGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      baseGeo.dispose();
      baseMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      flakeGeo.dispose();
      flakeMat.dispose();
      renderer.dispose();
    };
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative"
    />
  );
};
