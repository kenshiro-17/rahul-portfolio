"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { SKILLS } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Brain-like central structure
function NeuralBrain() {
    const brainRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!brainRef.current) return;
        brainRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        brainRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05);
    });

    return (
        <mesh ref={brainRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[4, 2]} />
            <meshStandardMaterial
                color="#1a0a2e"
                emissive="#7b2ff8"
                emissiveIntensity={0.3}
                wireframe
                transparent
                opacity={0.8}
            />
        </mesh>
    );
}

// Neural connection lines
function NeuralConnections({ count = 50 }: { count?: number }) {
    const linesRef = useRef<THREE.Group>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 15 : qualityLevel === "medium" ? 30 : count;

    const connections = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => {
            const startAngle = Math.random() * Math.PI * 2;
            const endAngle = Math.random() * Math.PI * 2;
            const startRadius = 5 + Math.random() * 3;
            const endRadius = 5 + Math.random() * 3;

            return {
                start: new THREE.Vector3(
                    Math.cos(startAngle) * startRadius,
                    (Math.random() - 0.5) * 8,
                    Math.sin(startAngle) * startRadius
                ),
                end: new THREE.Vector3(
                    Math.cos(endAngle) * endRadius,
                    (Math.random() - 0.5) * 8,
                    Math.sin(endAngle) * endRadius
                ),
                color: ["#ff6b00", "#00e5ff", "#7b2ff8", "#ffeb3b"][Math.floor(Math.random() * 4)],
                pulseOffset: Math.random() * Math.PI * 2,
            };
        });
    }, [actualCount]);

    useFrame((state) => {
        if (!linesRef.current) return;
        linesRef.current.children.forEach((child, i) => {
            const line = child as THREE.Line;
            const material = line.material as THREE.LineBasicMaterial;
            material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + connections[i].pulseOffset) * 0.3;
        });
    });

    return (
        <group ref={linesRef}>
            {connections.map((conn, i) => {
                const points = [conn.start, conn.end];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                return (
                    // @ts-expect-error - line is a valid R3F element but conflicts with SVG line
                    <line key={i} geometry={geometry}>
                        <lineBasicMaterial color={conn.color} transparent opacity={0.5} />
                    </line>
                );
            })}
        </group>
    );
}

// Skill orb
function SkillOrb({ skill, index, total }: {
    skill: { name: string; color: string };
    index: number;
    total: number;
}) {
    const orbRef = useRef<THREE.Group>(null);
    const angle = (index / total) * Math.PI * 2;
    const radius = 10;
    const yOffset = (index % 3 - 1) * 2;

    useFrame((state) => {
        if (!orbRef.current) return;
        const time = state.clock.elapsedTime;
        orbRef.current.position.x = Math.cos(angle + time * 0.15) * radius;
        orbRef.current.position.z = Math.sin(angle + time * 0.15) * radius;
        orbRef.current.position.y = yOffset + Math.sin(time * 0.5 + index) * 0.5;
    });

    return (
        <group ref={orbRef}>
            <mesh>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1, 1.2, 32]} />
                <meshBasicMaterial color={skill.color} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>

            {/* Label */}
            <Html position={[0, 1.5, 0]} center>
                <div
                    className="px-3 py-1 rounded-lg text-xs font-orbitron whitespace-nowrap"
                    style={{
                        backgroundColor: `${skill.color}33`,
                        borderColor: skill.color,
                        borderWidth: 1,
                        color: skill.color,
                    }}
                >
                    {skill.name}
                </div>
            </Html>
        </group>
    );
}

// Hex grid floor
function HexGrid() {
    return (
        <group position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            {Array.from({ length: 100 }).map((_, i) => {
                const x = ((i % 10) - 5) * 5;
                const y = (Math.floor(i / 10) - 5) * 4.5 + (i % 2 === 0 ? 0 : 2.25);
                const glows = Math.random() > 0.7;

                return (
                    <mesh key={i} position={[x, y, 0]}>
                        <circleGeometry args={[2, 6]} />
                        <meshBasicMaterial
                            color={glows ? "#7b2ff8" : "#1a0a2e"}
                            transparent
                            opacity={glows ? 0.3 : 0.1}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

export default function CyberpunkSkills({ visible }: ZoneProps) {
    const allSkills = [...SKILLS.primary, ...SKILLS.secondary];

    if (!visible) return null;

    return (
        <group>
            {/* Central brain */}
            <NeuralBrain />

            {/* Neural connections */}
            <NeuralConnections />

            {/* Hex grid floor */}
            <HexGrid />

            {/* Skill orbs */}
            {allSkills.map((skill, i) => (
                <SkillOrb key={skill.name} skill={skill} index={i} total={allSkills.length} />
            ))}

            {/* Title */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={1.5}
                    position={[0, 12, -5]}
                    color="#7b2ff8"
                    anchorX="center"
                    anchorY="middle"
                >
                    SKILLS MATRIX
                </Text>
                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.5}
                    position={[0, 10, -5]}
                    color="#ff6b00"
                    anchorX="center"
                    anchorY="middle"
                >
                    Neural Network of Expertise
                </Text>
            </Float>

            {/* Lighting */}
            <pointLight position={[0, 0, 0]} color="#7b2ff8" intensity={2} distance={20} />
            <pointLight position={[10, 5, 0]} color="#ff6b00" intensity={0.8} distance={25} />
            <pointLight position={[-10, 5, 0]} color="#00e5ff" intensity={0.8} distance={25} />
            <pointLight position={[0, 10, 10]} color="#ffeb3b" intensity={0.5} distance={30} />

            <ambientLight intensity={0.15} />
        </group>
    );
}
