"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { PERSONAL_INFO } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Building generator for city skyline
function Building({ position, height, width, depth }: {
    position: [number, number, number];
    height: number;
    width: number;
    depth: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowColor = useMemo(() => {
        const colors = ["#ff00ff", "#00ffff", "#ff6b00", "#7c3aed"];
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color="#0a0a1a"
                    metalness={0.9}
                    roughness={0.1}
                    emissive={glowColor}
                    emissiveIntensity={0.05}
                />
            </mesh>

            {/* Edge glow */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
                <lineBasicMaterial color={glowColor} transparent opacity={0.6} />
            </lineSegments>

            {/* Random windows */}
            {Array.from({ length: Math.floor(height / 2) }).map((_, i) => (
                <mesh
                    key={i}
                    position={[width / 2 + 0.01, -height / 2 + i * 2 + 1, 0]}
                >
                    <planeGeometry args={[0.5, 0.3]} />
                    <meshBasicMaterial
                        color={Math.random() > 0.3 ? glowColor : "#000000"}
                        transparent
                        opacity={Math.random() * 0.5 + 0.5}
                    />
                </mesh>
            ))}
        </group>
    );
}

// City skyline
function CitySkline() {
    const buildings = useMemo(() => {
        const result = [];
        for (let i = 0; i < 20; i++) {
            const x = (i - 10) * 8 + (Math.random() - 0.5) * 4;
            const z = -30 - Math.random() * 30;
            const height = 15 + Math.random() * 25;
            const width = 3 + Math.random() * 4;
            const depth = 3 + Math.random() * 4;
            result.push({ x, z, height, width, depth, id: i });
        }
        return result;
    }, []);

    return (
        <group>
            {buildings.map((b) => (
                <Building
                    key={b.id}
                    position={[b.x, b.height / 2, b.z]}
                    height={b.height}
                    width={b.width}
                    depth={b.depth}
                />
            ))}
        </group>
    );
}

// Neon rain particles
function NeonRain({ count = 3000 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 500 : qualityLevel === "medium" ? 1500 : count;

    const positions = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => ({
            x: (Math.random() - 0.5) * 80,
            y: Math.random() * 50,
            z: (Math.random() - 0.5) * 60 - 20,
            speed: 0.3 + Math.random() * 0.7,
        }));
    }, [actualCount]);

    useFrame(() => {
        if (!meshRef.current) return;

        const dummy = new THREE.Object3D();

        positions.forEach((pos, i) => {
            pos.y -= pos.speed;
            if (pos.y < -5) pos.y = 50;

            dummy.position.set(pos.x, pos.y, pos.z);
            dummy.scale.set(0.015, 0.3, 0.015);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]}>
            <cylinderGeometry args={[1, 1, 1, 4]} />
            <meshBasicMaterial color="#4cc9f0" transparent opacity={0.4} />
        </instancedMesh>
    );
}

// Wet ground with reflections
function WetGround() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial
                color="#0a0a1a"
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}

// Identity content display
function IdentityDisplay() {
    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[0, 8, -15]}>
                {/* Name */}
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={2.5}
                    color="#00ffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.03}
                    outlineColor="#ff00ff"
                >
                    {PERSONAL_INFO.name.toUpperCase()}
                </Text>

                {/* Title */}
                <Text
                    font="/fonts/Rajdhani-SemiBold.ttf"
                    fontSize={0.8}
                    position={[0, -2, 0]}
                    color="#ff00ff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {PERSONAL_INFO.title}
                </Text>

                {/* Tagline */}
                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.5}
                    position={[0, -3.5, 0]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={20}
                    textAlign="center"
                >
                    {PERSONAL_INFO.tagline} {PERSONAL_INFO.taglineHighlight}
                </Text>

                {/* Location badge */}
                <Html position={[0, -5, 0]} center>
                    <div className="glass-controls px-4 py-2 whitespace-nowrap">
                        <span className="font-rajdhani text-cyan-400 text-sm">
                            📍 {PERSONAL_INFO.location}
                        </span>
                    </div>
                </Html>
            </group>
        </Float>
    );
}

// Holographic billboard
function HolographicBillboard({ position, text }: { position: [number, number, number]; text: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const material = meshRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    });

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <planeGeometry args={[6, 3]} />
                <meshBasicMaterial
                    color="#7c3aed"
                    transparent
                    opacity={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <Text
                font="/fonts/Orbitron-Bold.ttf"
                fontSize={0.5}
                position={[0, 0, 0.1]}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
        </group>
    );
}

export default function CyberpunkIdentity({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
            {/* City */}
            <CitySkline />

            {/* Rain */}
            <NeonRain />

            {/* Ground */}
            <WetGround />

            {/* Identity content */}
            <IdentityDisplay />

            {/* Holographic billboards */}
            <HolographicBillboard position={[-15, 12, -25]} text="INNOVATE" />
            <HolographicBillboard position={[15, 15, -30]} text="CREATE" />
            <HolographicBillboard position={[0, 20, -40]} text="EVOLVE" />

            {/* Lighting */}
            <pointLight position={[0, 20, 0]} color="#ff00ff" intensity={1} distance={50} />
            <pointLight position={[-20, 10, -10]} color="#00ffff" intensity={0.8} distance={40} />
            <pointLight position={[20, 10, -10]} color="#ff6b00" intensity={0.6} distance={40} />

            {/* Fog */}
            <fog attach="fog" args={["#0a0a1a", 10, 80]} />
        </group>
    );
}
