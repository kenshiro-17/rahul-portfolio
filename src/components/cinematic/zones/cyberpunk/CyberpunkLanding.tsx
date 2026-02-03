"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { PERSONAL_INFO } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Animated star field
function StarField({ count = 2000 }: { count?: number }) {
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 500 : qualityLevel === "medium" ? 1000 : count;

    return (
        <Stars
            radius={100}
            depth={50}
            count={actualCount}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
        />
    );
}

// Floating space dust particles
function SpaceDust({ count = 500 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 150 : qualityLevel === "medium" ? 300 : count;

    const positions = useMemo(() => {
        const pos = new Float32Array(actualCount * 3);
        for (let i = 0; i < actualCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        return pos;
    }, [actualCount]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        const dummy = new THREE.Object3D();

        for (let i = 0; i < actualCount; i++) {
            const x = positions[i * 3] + Math.sin(time * 0.1 + i) * 0.5;
            const y = positions[i * 3 + 1] + Math.cos(time * 0.15 + i * 0.5) * 0.3;
            const z = positions[i * 3 + 2] + Math.sin(time * 0.08 + i * 0.3) * 0.5;

            dummy.position.set(x, y, z);
            dummy.scale.setScalar(0.02 + Math.sin(time + i) * 0.01);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#4cc9f0" transparent opacity={0.4} />
        </instancedMesh>
    );
}

// Floating platform
function Platform() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <group position={[0, -3, 0]}>
            <mesh ref={meshRef}>
                <cylinderGeometry args={[15, 18, 1, 32]} />
                <meshStandardMaterial
                    color="#1a0a2e"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#7c3aed"
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Grid overlay */}
            <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[30, 30, 30, 30]} />
                <meshBasicMaterial
                    color="#7c3aed"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
}

// Welcome text display
function WelcomeDisplay() {
    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 5, -10]}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={2}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#7c3aed"
                >
                    {PERSONAL_INFO.name.toUpperCase()}
                </Text>

                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.6}
                    position={[0, -1.5, 0]}
                    color="#a78bfa"
                    anchorX="center"
                    anchorY="middle"
                >
                    {PERSONAL_INFO.title}
                </Text>

                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.4}
                    position={[0, -2.5, 0]}
                    color="#4cc9f0"
                    anchorX="center"
                    anchorY="middle"
                >
                    ENTERING CYBER DIMENSION
                </Text>
            </group>
        </Float>
    );
}

// Nebula background effect
function Nebula() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.01;
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.005;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -80]}>
            <sphereGeometry args={[60, 32, 32]} />
            <meshBasicMaterial
                color="#1a0a2e"
                side={THREE.BackSide}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
}

export default function CyberpunkLanding({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
            {/* Background elements */}
            <Nebula />
            <StarField />
            <SpaceDust />

            {/* Platform */}
            <Platform />

            {/* Welcome display */}
            <WelcomeDisplay />

            {/* Ambient point lights */}
            <pointLight position={[10, 10, 10]} color="#7c3aed" intensity={0.5} />
            <pointLight position={[-10, 5, -10]} color="#ec4899" intensity={0.3} />
            <pointLight position={[0, 20, 0]} color="#4cc9f0" intensity={0.4} />
        </group>
    );
}
