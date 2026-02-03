"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { 
  MeshReflectorMaterial, 
  Float, 
  Ring,
  Torus,
  Box,
  Sphere,
  Cylinder,
} from "@react-three/drei";
import * as THREE from "three";
import { ZONES } from "@/lib/gameStore";

// Ground platform with reflections
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <circleGeometry args={[60, 64]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050510"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  );
}

// Grid lines on the ground
function GridFloor() {
  return (
    <gridHelper
      args={[120, 60, "#8b5cf620", "#8b5cf610"]}
      position={[0, 0.01, 0]}
    />
  );
}

// Central hub structure
function CentralHub() {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.15;
      ring2Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      {/* Central pillar */}
      <Cylinder args={[0.5, 0.8, 3, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Rotating rings */}
      <Ring
        ref={ringRef}
        args={[3, 3.3, 64]}
        position={[0, 2, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </Ring>

      <Ring
        ref={ring2Ref}
        args={[4, 4.2, 64]}
        position={[0, 2.5, 0]}
        rotation={[Math.PI / 3, 0, 0]}
      >
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Floating orb on top */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.6, 32, 32]} position={[0, 4.5, 0]}>
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
      </Float>
    </group>
  );
}

// Zone platform/pedestal
function ZonePlatform({ 
  position, 
  color, 
  name 
}: { 
  position: [number, number, number]; 
  color: string;
  name: string;
}) {
  const glowRef = useRef<THREE.Mesh>(null);
  const pillarRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
    if (pillarRef.current) {
      pillarRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Base platform */}
      <Cylinder args={[4, 5, 0.3, 32]} position={[0, 0.15, 0]}>
        <meshStandardMaterial
          color="#0a0a1a"
          metalness={0.9}
          roughness={0.3}
        />
      </Cylinder>

      {/* Glowing ring */}
      <Ring
        args={[4.5, 5, 64]}
        position={[0, 0.32, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Inner glow circle */}
      <mesh ref={glowRef} position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Floating decorative elements */}
      <group ref={pillarRef}>
        {[0, 1, 2, 3].map((i) => (
          <Float key={i} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Box
              args={[0.3, 1.5, 0.3]}
              position={[
                Math.cos((i * Math.PI) / 2) * 3,
                1.5,
                Math.sin((i * Math.PI) / 2) * 3,
              ]}
            >
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.2}
              />
            </Box>
          </Float>
        ))}
      </group>

      {/* Light beam */}
      <pointLight
        position={[0, 3, 0]}
        color={color}
        intensity={3}
        distance={15}
      />
    </group>
  );
}

// Connecting pathways between zones
function Pathways() {
  const pathPositions = [
    { start: [0, 0, 0], end: [15, 0, 0], color: "#ec4899" },
    { start: [0, 0, 0], end: [-15, 0, 0], color: "#10b981" },
    { start: [0, 0, 0], end: [0, 0, -20], color: "#3b82f6" },
    { start: [0, 0, 0], end: [0, 0, 20], color: "#f59e0b" },
  ];

  return (
    <>
      {pathPositions.map((path, i) => {
        const midX = ((path.start[0] as number) + (path.end[0] as number)) / 2;
        const midZ = ((path.start[2] as number) + (path.end[2] as number)) / 2;
        const length = Math.sqrt(
          Math.pow((path.end[0] as number) - (path.start[0] as number), 2) +
          Math.pow((path.end[2] as number) - (path.start[2] as number), 2)
        );
        const angle = Math.atan2(
          (path.end[2] as number) - (path.start[2] as number),
          (path.end[0] as number) - (path.start[0] as number)
        );

        return (
          <group key={i}>
            {/* Pathway strip */}
            <mesh
              position={[midX, 0.02, midZ]}
              rotation={[-Math.PI / 2, 0, -angle]}
            >
              <planeGeometry args={[length - 8, 1.5]} />
              <meshStandardMaterial
                color={path.color}
                emissive={path.color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.3}
              />
            </mesh>

            {/* Glowing dots along path */}
            {Array.from({ length: Math.floor(length / 3) }).map((_, j) => {
              const t = (j + 1) / (Math.floor(length / 3) + 1);
              const x = (path.start[0] as number) + t * ((path.end[0] as number) - (path.start[0] as number));
              const z = (path.start[2] as number) + t * ((path.end[2] as number) - (path.start[2] as number));
              return (
                <mesh key={j} position={[x, 0.05, z]}>
                  <sphereGeometry args={[0.1, 16, 16]} />
                  <meshStandardMaterial
                    color={path.color}
                    emissive={path.color}
                    emissiveIntensity={1}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </>
  );
}

// Floating ambient particles
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 20 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color().setHSL(Math.random() * 0.2 + 0.7, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GameEnvironment() {
  return (
    <group>
      <Ground />
      <GridFloor />
      <CentralHub />
      <AmbientParticles />
      <Pathways />

      {/* Zone platforms */}
      {ZONES.filter((z) => z.id !== "landing").map((zone) => (
        <ZonePlatform
          key={zone.id}
          position={zone.position}
          color={zone.color}
          name={zone.name}
        />
      ))}
    </group>
  );
}
