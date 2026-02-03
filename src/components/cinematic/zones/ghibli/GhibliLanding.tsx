"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Cloud, Sky } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { PERSONAL_INFO } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Lush Green Hills
function LushHills() {
    const hills = useMemo(() => {
        return [
            { position: [-40, -10, -80], scale: [50, 20, 30], color: "#4ade80" }, // Far Left
            { position: [0, -12, -90], scale: [70, 25, 40], color: "#22c55e" },  // Far Center
            { position: [40, -10, -80], scale: [50, 20, 30], color: "#4ade80" }, // Far Right
            { position: [-20, -5, -40], scale: [30, 10, 20], color: "#86efac" }, // Near Left
            { position: [25, -5, -50], scale: [35, 12, 25], color: "#86efac" }, // Near Right
        ];
    }, []);

    return (
        <group>
            {hills.map((h, i) => (
                <mesh key={i} position={h.position as [number, number, number]}>
                    <sphereGeometry args={[1, 32, 16]} />
                    <meshStandardMaterial color={h.color} roughness={0.8} />
                    <group scale={h.scale as [number, number, number]}>
                         <sphereGeometry args={[1, 32, 16]} />
                         <meshStandardMaterial color={h.color} roughness={0.8} />
                    </group>
                </mesh>
            ))}
        </group>
    );
}

// Fluffy Clouds
function GhibliClouds() {
    return (
        <group>
             <Cloud
                position={[-20, 15, -40]}
                opacity={0.8}
                speed={0.2}
                segments={20}
                color="#ffffff"
            />
            <Cloud
                position={[25, 18, -45]}
                opacity={0.7}
                speed={0.15}
                segments={20}
                color="#ffffff"
            />
             <Cloud
                position={[0, 25, -60]}
                opacity={0.9}
                speed={0.1}
                segments={30}
                color="#ffffff"
            />
        </group>
    )
}


// Floating Petals
function Petals({ count = 100 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 40 : qualityLevel === "medium" ? 80 : count;

    const particles = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => ({
            x: (Math.random() - 0.5) * 60,
            y: Math.random() * 20,
            z: (Math.random() - 0.5) * 40 - 10,
            phase: Math.random() * Math.PI * 2,
            speed: 0.2 + Math.random() * 0.5,
        }));
    }, [actualCount]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const dummy = new THREE.Object3D();
        const time = state.clock.elapsedTime;

        particles.forEach((p, i) => {
            const x = p.x + Math.sin(time * 0.2 + p.phase) * 5;
            let y = p.y - (time * p.speed) % 20;
            if (y < 0) y += 20;
            const z = p.z + Math.cos(time * 0.1 + p.phase) * 2;

            dummy.position.set(x, y, z);
            dummy.rotation.set(time, time * 0.5, 0);
            dummy.scale.setScalar(0.08);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#fbcfe8" transparent opacity={0.8} side={THREE.DoubleSide} />
        </instancedMesh>
    );
}

// Endless Grass Floor
function GrassFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial
                color="#4ade80"
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}

// Welcome display
function GhibliWelcomeDisplay() {
    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
            <group position={[0, 8, -15]}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={2.5}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#0ea5e9"
                >
                    {PERSONAL_INFO.name.toUpperCase()}
                </Text>

                <Text
                    font="/fonts/Rajdhani-SemiBold.ttf"
                    fontSize={0.8}
                    position={[0, -1.8, 0]}
                    color="#1e293b"
                    anchorX="center"
                    anchorY="middle"
                >
                    {PERSONAL_INFO.title}
                </Text>

                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.5}
                    position={[0, -2.8, 0]}
                    color="#0f766e"
                    anchorX="center"
                    anchorY="middle"
                >
                    ENTERING SPIRIT REALM
                </Text>
            </group>
        </Float>
    );
}

export default function GhibliLanding({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
            {/* Sky */}
            <Sky sunPosition={[100, 20, 100]} turbidity={0.5} rayleigh={0.5} inclination={0.6} distance={1000} />

            {/* Clouds */}
            <GhibliClouds />

            {/* Hills */}
            <LushHills />

            {/* Ground */}
            <GrassFloor />

            {/* Petals */}
            <Petals />

            {/* Welcome display */}
            <GhibliWelcomeDisplay />

            {/* Lighting */}
            <directionalLight position={[50, 50, 25]} intensity={1.5} color="#fff7ed" castShadow />
            <ambientLight intensity={0.8} color="#e0f2fe" />
        </group>
    );
}
