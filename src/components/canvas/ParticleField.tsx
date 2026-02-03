"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseStore, useScrollStore } from "@/lib/store";

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 8000 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseStore = useMouseStore();
  const scrollStore = useScrollStore();

  // Generate particle positions and properties
  const { positions, colors, sizes, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#8b5cf6"), // Electric violet
      new THREE.Color("#a78bfa"), // Light violet
      new THREE.Color("#c4b5fd"), // Pale violet
      new THREE.Color("#ec4899"), // Pink
      new THREE.Color("#3b82f6"), // Blue
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere
      const radius = 15 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 10;

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random sizes
      sizes[i] = Math.random() * 2 + 0.5;

      // Initial velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions, colors, sizes, velocities };
  }, [count]);

  // Create geometry with attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  // Animation frame
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const positionAttribute = meshRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const positionArray = positionAttribute.array as Float32Array;

    // Get mouse influence
    const mouseX = mouseStore.normalizedX;
    const mouseY = mouseStore.normalizedY;
    const mouseVelocity = Math.sqrt(
      mouseStore.velocity.x ** 2 + mouseStore.velocity.y ** 2
    );

    // Get scroll influence
    const scrollProgress = scrollStore.scrollProgress;

    // Update each particle
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base movement
      positionArray[i3] += velocities[i3] + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
      positionArray[i3 + 1] += velocities[i3 + 1] + Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.001;
      positionArray[i3 + 2] += velocities[i3 + 2];

      // Mouse influence - particles react to cursor
      const dx = mouseX * 10 - positionArray[i3];
      const dy = mouseY * 10 - positionArray[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 5 && dist > 0) {
        const force = (5 - dist) / 5 * 0.1 * (1 + mouseVelocity * 0.01);
        positionArray[i3] -= (dx / dist) * force;
        positionArray[i3 + 1] -= (dy / dist) * force;
      }

      // Scroll parallax
      positionArray[i3 + 2] += scrollProgress * 0.0001;

      // Boundary wrapping
      const maxDist = 40;
      const currentDist = Math.sqrt(
        positionArray[i3] ** 2 +
        positionArray[i3 + 1] ** 2 +
        (positionArray[i3 + 2] + 10) ** 2
      );

      if (currentDist > maxDist) {
        // Reset particle position
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 15 + Math.random() * 10;
        
        positionArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positionArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positionArray[i3 + 2] = radius * Math.cos(phi) - 10;
      }
    }

    positionAttribute.needsUpdate = true;

    // Slow rotation of entire particle system
    meshRef.current.rotation.y += delta * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
