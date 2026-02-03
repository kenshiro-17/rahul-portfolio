"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html, Cloud } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { SKILLS } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Castle Core
function FloatingCastle() {
    const castleRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!castleRef.current) return;
        castleRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 2;
        castleRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <group ref={castleRef} position={[0, 0, 0]}>
            {/* Base */}
            <mesh position={[0, -2, 0]}>
                <sphereGeometry args={[15, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#57534e" roughness={1} />
            </mesh>
            
            {/* Main Tower */}
             <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[5, 8, 15, 8]} />
                <meshStandardMaterial color="#e5e5e5" />
            </mesh>
             <mesh position={[0, 15, 0]}>
                 <coneGeometry args={[6, 8, 8]} />
                 <meshStandardMaterial color="#0284c7" />
            </mesh>

            {/* Rings */}
             <mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[12, 1, 8, 32]} />
                <meshStandardMaterial color="#7dd3fc" />
            </mesh>
             <mesh position={[0, 5, 0]} rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[8, 0.8, 8, 32]} />
                <meshStandardMaterial color="#38bdf8" />
            </mesh>
        </group>
    );
}

// Skill Clouds
function SkillCloud({ skill, index, total }: {
    skill: { name: string; color: string };
    index: number;
    total: number;
}) {
    const cloudRef = useRef<THREE.Group>(null);
    // Spherical distribution
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    
    const radius = 25;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    useFrame((state) => {
        if (!cloudRef.current) return;
        const time = state.clock.elapsedTime;
        cloudRef.current.rotation.z = time * 0.1;
        cloudRef.current.position.y += Math.sin(time + index) * 0.02;
    });

    return (
        <group ref={cloudRef} position={[x, y, z]}>
            <mesh>
                 <sphereGeometry args={[2, 16, 16]} />
                 <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
            
            <Html position={[0, 0, 2]} center>
                <div
                    className="px-3 py-1.5 rounded-full backdrop-blur-sm border shadow-lg whitespace-nowrap"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderColor: skill.color,
                        borderWidth: 2,
                    }}
                >
                    <span className="font-bold text-sm" style={{ color: "#0f172a" }}>{skill.name}</span>
                </div>
            </Html>
        </group>
    );
}

export default function GhibliSkills({ visible }: ZoneProps) {
    const allSkills = [...SKILLS.primary, ...SKILLS.secondary];

    if (!visible) return null;

    return (
        <group>
            {/* Sky */}
            <mesh position={[0, 0, 0]}>
                 <sphereGeometry args={[200, 32, 32]} />
                 <meshBasicMaterial color="#bae6fd" side={THREE.BackSide} />
            </mesh>

            {/* Castle */}
            <FloatingCastle />

            {/* Skill Clouds */}
            {allSkills.map((skill, i) => (
                <SkillCloud key={skill.name} skill={skill} index={i} total={allSkills.length} />
            ))}

            {/* Floating Islands/Debris */}
            {[...Array(10)].map((_, i) => (
                <mesh key={i} position={[Math.random() * 60 - 30, Math.random() * 40 - 20, Math.random() * 60 - 30]}>
                    <dodecahedronGeometry args={[Math.random() * 2]} />
                    <meshStandardMaterial color="#78716c" />
                </mesh>
            ))}

            {/* Title */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={2.5}
                    position={[0, 35, 0]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#0369a1"
                >
                    CASTLE OF KNOWLEDGE
                </Text>
            </Float>

            {/* Lighting */}
            <ambientLight intensity={0.6} color="#e0f2fe" />
            <directionalLight position={[50, 50, 50]} intensity={1.5} color="#ffffff" castShadow />
        </group>
    );
}
