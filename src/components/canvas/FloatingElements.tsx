"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Icosahedron, Octahedron, Torus } from "@react-three/drei";
import * as THREE from "three";
import { useMouseStore } from "@/lib/store";

// Individual floating shape component
function FloatingShape({
  position,
  color,
  scale,
  speed,
  rotationSpeed,
  distort,
  shape,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  rotationSpeed: number;
  distort: number;
  shape: "icosahedron" | "octahedron" | "torus";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseStore = useMouseStore();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotation
    meshRef.current.rotation.x += delta * rotationSpeed;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.5;

    // Mouse influence
    const targetX = position[0] + mouseStore.normalizedX * 0.5;
    const targetY = position[1] + mouseStore.normalizedY * 0.5;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.02
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.02
    );
  });

  const ShapeComponent = {
    icosahedron: Icosahedron,
    octahedron: Octahedron,
    torus: Torus,
  }[shape];

  const args = shape === "torus" ? [0.5, 0.2, 16, 32] : [1, 1];

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.2, 0.2]}
    >
      <ShapeComponent
        ref={meshRef}
        args={args as [number, number]}
        scale={scale}
        position={position}
      >
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.6}
        />
      </ShapeComponent>
    </Float>
  );
}

// Glowing core orb
function GlowingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseStore = useMouseStore();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Pulsing scale
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    meshRef.current.scale.setScalar(scale);
    
    // Follow mouse slightly
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouseStore.normalizedX * 0.3,
      0.01
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouseStore.normalizedY * 0.3,
      0.01
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function FloatingElements() {
  const shapes = useMemo(
    () => [
      { position: [-4, 2, -3] as [number, number, number], color: "#8b5cf6", scale: 0.3, speed: 2, rotationSpeed: 0.5, distort: 0.3, shape: "icosahedron" as const },
      { position: [4, -2, -4] as [number, number, number], color: "#ec4899", scale: 0.25, speed: 1.5, rotationSpeed: 0.3, distort: 0.4, shape: "octahedron" as const },
      { position: [-3, -3, -5] as [number, number, number], color: "#3b82f6", scale: 0.35, speed: 1.8, rotationSpeed: 0.4, distort: 0.2, shape: "torus" as const },
      { position: [3, 3, -6] as [number, number, number], color: "#a78bfa", scale: 0.2, speed: 2.2, rotationSpeed: 0.6, distort: 0.5, shape: "icosahedron" as const },
      { position: [5, 0, -4] as [number, number, number], color: "#c4b5fd", scale: 0.15, speed: 1.2, rotationSpeed: 0.35, distort: 0.25, shape: "octahedron" as const },
      { position: [-5, 1, -5] as [number, number, number], color: "#f472b6", scale: 0.28, speed: 1.6, rotationSpeed: 0.45, distort: 0.35, shape: "torus" as const },
    ],
    []
  );

  return (
    <group>
      {/* Central glowing orb */}
      <GlowingOrb />
      
      {/* Floating geometric shapes */}
      {shapes.map((props, i) => (
        <FloatingShape key={i} {...props} />
      ))}
      
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -5]}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
      
      {/* Second orbital ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} position={[0, 0, -5]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
