"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface WebGLArtifactProps {
  seed: number;
  colorA: string;
  colorB: string;
}

function ArtifactMesh({ seed, colorA, colorB }: WebGLArtifactProps) {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const [a, b] = useMemo(() => [new THREE.Color(colorA), new THREE.Color(colorB)], [colorA, colorB]);

  useFrame((state) => {
    const t = state.clock.elapsedTime + seed * 0.35;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (orbRef.current) {
      orbRef.current.position.y = Math.sin(t * 1.1) * 0.15;
      orbRef.current.rotation.x = t * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.35}>
        <mesh ref={orbRef} position={[-0.2, 0.05, 0]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color={a} roughness={0.25} metalness={0.55} />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[1.2, 0.3, 0.5]}>
        <torusGeometry args={[1.45, 0.13, 20, 88]} />
        <meshStandardMaterial color={b} roughness={0.35} metalness={0.65} />
      </mesh>

      <mesh position={[0.55, -0.55, -0.5]}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color={a.clone().lerp(b, 0.45)} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

export function WebGLArtifact({ seed, colorA, colorB }: WebGLArtifactProps) {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.3], fov: 44 }}>
        <color attach="background" args={["#efe8db"]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={1.3} />
        <pointLight position={[-3, -2, 2]} intensity={0.7} />
        <ArtifactMesh seed={seed} colorA={colorA} colorB={colorB} />
      </Canvas>
    </div>
  );
}

