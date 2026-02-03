"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore, ZONES } from "@/lib/gameStore";

// Collectible orb that gives info/achievement
function Collectible({
  id,
  position,
  color,
  info,
}: {
  id: string;
  position: [number, number, number];
  color: string;
  info: string;
}) {
  const { camera } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const { collectedItems, collectItem, player } = useGameStore();
  const [showInfo, setShowInfo] = useState(false);

  const isCollected = collectedItems.has(id);

  useFrame((state) => {
    if (meshRef.current && !isCollected) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;

      // Check distance to player
      const distance = Math.sqrt(
        Math.pow(player.position[0] - position[0], 2) +
        Math.pow(player.position[1] - position[1], 2) +
        Math.pow(player.position[2] - position[2], 2)
      );

      if (distance < 2) {
        setShowInfo(true);
        if (distance < 1) {
          collectItem(id);
        }
      } else {
        setShowInfo(false);
      }
    }
  });

  if (isCollected) return null;

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Glow */}
        <pointLight color={color} intensity={2} distance={3} />

        {/* Info popup */}
        {showInfo && (
          <Html center distanceFactor={10}>
            <div
              className="px-3 py-2 rounded-lg text-xs max-w-[200px] text-center"
              style={{
                background: `${color}30`,
                border: `1px solid ${color}`,
                color: "white",
              }}
            >
              {info}
              <div className="text-[10px] mt-1 opacity-60">Walk closer to collect</div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

// Zone waypoint marker
function Waypoint({
  zone,
}: {
  zone: (typeof ZONES)[number];
}) {
  const { camera } = useThree();
  const { player, currentZone, visitedZones } = useGameStore();
  const ringRef = useRef<THREE.Mesh>(null);
  const [isNear, setIsNear] = useState(false);

  const isVisited = visitedZones.has(zone.id);
  const isCurrent = currentZone === zone.id;

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime;

      // Check distance
      const distance = Math.sqrt(
        Math.pow(player.position[0] - zone.position[0], 2) +
        Math.pow(player.position[2] - zone.position[2], 2)
      );
      setIsNear(distance < 15 && distance > 6);
    }
  });

  // Don't show waypoint for current zone
  if (isCurrent) return null;

  return (
    <group position={[zone.position[0], 8, zone.position[2]]}>
      {/* Beacon ring */}
      <Torus
        ref={ringRef}
        args={[0.8, 0.1, 8, 32]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color={zone.color}
          emissive={zone.color}
          emissiveIntensity={isVisited ? 0.3 : 0.8}
          transparent
          opacity={isVisited ? 0.5 : 1}
        />
      </Torus>

      {/* Vertical beam */}
      <mesh position={[0, -4, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 8, 8]} />
        <meshStandardMaterial
          color={zone.color}
          emissive={zone.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Label when near */}
      {isNear && (
        <Html center distanceFactor={20}>
          <div
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
            style={{
              background: `${zone.color}30`,
              border: `2px solid ${zone.color}`,
              color: zone.color,
              boxShadow: `0 0 20px ${zone.color}50`,
            }}
          >
            {zone.name}
            {!isVisited && (
              <span className="ml-2 text-xs opacity-60">NEW</span>
            )}
          </div>
        </Html>
      )}

      {/* Light */}
      <pointLight
        color={zone.color}
        intensity={isVisited ? 1 : 3}
        distance={20}
      />
    </group>
  );
}

// Floating holographic hints
function HolographicHint({
  position,
  text,
  color = "#8b5cf6",
}: {
  position: [number, number, number];
  text: string;
  color?: string;
}) {
  const { player } = useGameStore();
  const [visible, setVisible] = useState(false);

  useFrame(() => {
    const distance = Math.sqrt(
      Math.pow(player.position[0] - position[0], 2) +
      Math.pow(player.position[2] - position[2], 2)
    );
    setVisible(distance < 8);
  });

  return (
    <Float speed={1} floatIntensity={0.5}>
      <group position={position}>
        <Html center distanceFactor={15} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
          <div
            className="px-4 py-2 rounded-lg text-sm font-medium border backdrop-blur-sm"
            style={{
              background: `${color}15`,
              borderColor: `${color}40`,
              color: color,
              boxShadow: `0 0 15px ${color}20`,
            }}
          >
            {text}
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Teleporter pad (for quick navigation)
function Teleporter({
  from,
  to,
}: {
  from: [number, number, number];
  to: [number, number, number];
}) {
  const { player, setPlayerPosition } = useGameStore();
  const padRef = useRef<THREE.Mesh>(null);
  const [isActive, setIsActive] = useState(false);

  useFrame((state) => {
    if (padRef.current) {
      padRef.current.rotation.y = state.clock.elapsedTime * 2;

      // Check if player is on pad
      const distance = Math.sqrt(
        Math.pow(player.position[0] - from[0], 2) +
        Math.pow(player.position[2] - from[2], 2)
      );

      if (distance < 1.5 && !isActive) {
        setIsActive(true);
        // Teleport after brief delay
        setTimeout(() => {
          setPlayerPosition([to[0], 1.6, to[2]]);
          setIsActive(false);
        }, 500);
      }
    }
  });

  return (
    <group position={from}>
      {/* Base */}
      <mesh ref={padRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 1.2, 6]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={isActive ? 2 : 0.5}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow */}
      <pointLight
        color="#8b5cf6"
        intensity={isActive ? 5 : 2}
        distance={5}
      />

      {/* Label */}
      <Html center position={[0, 1.5, 0]} distanceFactor={10}>
        <div className="text-purple-400 text-xs font-medium px-2 py-1 bg-purple-500/20 rounded border border-purple-500/40">
          TELEPORT
        </div>
      </Html>
    </group>
  );
}

export default function InteractiveElements() {
  const collectibles = [
    { id: "cert-1", position: [5, 1.5, 5] as [number, number, number], color: "#8b5cf6", info: "GCP Certified: Core Infrastructure" },
    { id: "cert-2", position: [-5, 1.5, -5] as [number, number, number], color: "#ec4899", info: "Azure AI Fundamentals" },
    { id: "cert-3", position: [8, 1.5, -8] as [number, number, number], color: "#3b82f6", info: "Neural Networks & Deep Learning" },
    { id: "cert-4", position: [-8, 1.5, 8] as [number, number, number], color: "#10b981", info: "Azure Fundamentals" },
    { id: "lang-1", position: [3, 1.5, -3] as [number, number, number], color: "#f59e0b", info: "English: C1 Level" },
    { id: "lang-2", position: [-3, 1.5, 3] as [number, number, number], color: "#ef4444", info: "German: A2 (Learning)" },
  ];

  return (
    <>
      {/* Zone waypoints */}
      {ZONES.map((zone) => (
        <Waypoint key={zone.id} zone={zone} />
      ))}

      {/* Collectibles (certifications, languages) */}
      {collectibles.map((c) => (
        <Collectible key={c.id} {...c} />
      ))}

      {/* Helpful hints */}
      <HolographicHint
        position={[0, 2, 5]}
        text="Use WASD to move, Mouse to look"
        color="#8b5cf6"
      />
      <HolographicHint
        position={[7, 2, 0]}
        text="→ Identity Core: Learn about me"
        color="#ec4899"
      />
      <HolographicHint
        position={[-7, 2, 0]}
        text="← Skills Matrix: My tech stack"
        color="#10b981"
      />
      <HolographicHint
        position={[0, 2, -10]}
        text="↑ Experience Vault: Career journey"
        color="#3b82f6"
      />
      <HolographicHint
        position={[0, 2, 10]}
        text="↓ Project Nexus: My creations"
        color="#f59e0b"
      />
    </>
  );
}
