"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SKILLS } from "@/lib/constants";

// Individual orbiting skill node
function SkillNode({
  skill,
  orbitRadius,
  orbitSpeed,
  startAngle,
  yOffset,
  index,
}: {
  skill: { name: string; color: string };
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
  yOffset: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Orbital movement
    const angle = startAngle + state.clock.elapsedTime * orbitSpeed;
    meshRef.current.position.x = Math.cos(angle) * orbitRadius;
    meshRef.current.position.z = Math.sin(angle) * orbitRadius;
    meshRef.current.position.y = yOffset + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;

    // Pulse when hovered
    const scale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* Skill label */}
      {hovered && meshRef.current && (
        <Html
          position={[
            meshRef.current.position.x,
            meshRef.current.position.y + 0.5,
            meshRef.current.position.z,
          ]}
          center
          style={{
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div className="px-3 py-1 rounded-full bg-void-900/90 border border-electric-500/50 text-electric-300 text-sm font-medium whitespace-nowrap backdrop-blur-sm">
            {skill.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Central logo core
function LogoCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
      </mesh>
      
      {/* Core */}
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* "R" text */}
      <Text
        position={[0, 0, 0.55]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/SpaceGrotesk-Bold.ttf"
      >
        R
      </Text>
    </group>
  );
}

// Orbital rings
function OrbitalRings() {
  return (
    <group>
      {[1.5, 2.2, 3].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.3]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial
            color={["#8b5cf6", "#ec4899", "#3b82f6"][i]}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

interface SkillsOrbitProps {
  isVisible?: boolean;
}

export default function SkillsOrbit({ isVisible = true }: SkillsOrbitProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  // Combine all skills
  const allSkills = useMemo(() => {
    return [...SKILLS.primary, ...SKILLS.secondary];
  }, []);

  // Distribute skills across orbits
  const skillNodes = useMemo(() => {
    return allSkills.map((skill, i) => {
      const orbitIndex = Math.floor(i / 5); // 5 skills per orbit
      const orbitRadius = 1.5 + orbitIndex * 0.7;
      const angleStep = (2 * Math.PI) / Math.min(5, allSkills.length - orbitIndex * 5);
      const startAngle = (i % 5) * angleStep + orbitIndex * 0.5;
      const orbitSpeed = 0.2 - orbitIndex * 0.05;
      const yOffset = (Math.random() - 0.5) * 0.5;

      return {
        skill,
        orbitRadius,
        orbitSpeed,
        startAngle,
        yOffset,
        index: i,
      };
    });
  }, [allSkills]);

  useFrame(() => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central logo */}
      <LogoCore />
      
      {/* Orbital rings */}
      <OrbitalRings />
      
      {/* Skill nodes */}
      {skillNodes.map((props, i) => (
        <SkillNode key={i} {...props} />
      ))}
      
      {/* Orbit controls for interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
        domElement={gl.domElement}
      />
      
      {/* Lighting */}
      <pointLight position={[0, 0, 0]} color="#8b5cf6" intensity={2} distance={5} />
    </group>
  );
}
