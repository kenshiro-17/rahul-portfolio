"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Nebula cloud background
function NebulaCloud() {
    const cloudRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!cloudRef.current) return;
        cloudRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        cloudRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    });

    return (
        <mesh ref={cloudRef} position={[0, 0, -50]}>
            <sphereGeometry args={[80, 32, 32]} />
            <meshBasicMaterial
                color="#1a0a2e"
                side={THREE.BackSide}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}

// Star dust vortex
function StarDustVortex({ count = 3000 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 500 : qualityLevel === "medium" ? 1500 : count;

    const particles = useMemo(() => {
        return Array.from({ length: actualCount }).map((_, i) => {
            const radius = 5 + Math.random() * 30;
            const angle = (i / actualCount) * Math.PI * 20 + Math.random() * 0.5;
            const height = (Math.random() - 0.5) * 40;

            return {
                radius,
                angle,
                height,
                speed: 0.1 + Math.random() * 0.2,
                size: 0.02 + Math.random() * 0.03,
            };
        });
    }, [actualCount]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const dummy = new THREE.Object3D();
        const time = state.clock.elapsedTime;

        particles.forEach((p, i) => {
            const currentAngle = p.angle + time * p.speed;
            const x = Math.cos(currentAngle) * p.radius;
            const z = Math.sin(currentAngle) * p.radius;
            const y = p.height + Math.sin(time * 0.5 + i) * 0.5;

            dummy.position.set(x, y, z);
            dummy.scale.setScalar(p.size);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#48dbfb" transparent opacity={0.7} />
        </instancedMesh>
    );
}

// Constellation line
function ConstellationLine({ points }: { points: [number, number, number][] }) {
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(points.flat());
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [points]);

    return (
        // @ts-expect-error - line is a valid R3F element but conflicts with SVG line
        <line geometry={geometry}>
            <lineBasicMaterial color="#ff6b6b" transparent opacity={0.5} />
        </line>
    );
}

// Contact info display
function ContactDisplay() {
    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[0, 5, 0]}>
                {/* Title */}
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={1.8}
                    position={[0, 5, 0]}
                    color="#ff6b6b"
                    anchorX="center"
                    anchorY="middle"
                >
                    CONNECT
                </Text>

                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.6}
                    position={[0, 3.5, 0]}
                    color="#48dbfb"
                    anchorX="center"
                    anchorY="middle"
                >
                    Let&apos;s Build Something Amazing Together
                </Text>

                {/* Contact cards */}
                <Html position={[0, 0, 0]} center>
                    <div className="flex flex-col gap-4 items-center">
                        {/* Email */}
                        <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            className="glass-controls px-6 py-3 flex items-center gap-3 hover:scale-105 transition-transform"
                        >
                            <span className="text-2xl">📧</span>
                            <div className="text-left">
                                <div className="font-orbitron text-xs text-gray-400">EMAIL</div>
                                <div className="font-rajdhani text-white">{PERSONAL_INFO.email}</div>
                            </div>
                        </a>

                        {/* Phone */}
                        <a
                            href={`tel:${PERSONAL_INFO.phone}`}
                            className="glass-controls px-6 py-3 flex items-center gap-3 hover:scale-105 transition-transform"
                        >
                            <span className="text-2xl">📱</span>
                            <div className="text-left">
                                <div className="font-orbitron text-xs text-gray-400">PHONE</div>
                                <div className="font-rajdhani text-white">{PERSONAL_INFO.phone}</div>
                            </div>
                        </a>

                        {/* Social links */}
                        <div className="flex gap-4 mt-4">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-button p-4 hover:scale-110 transition-transform"
                                >
                                    <span className="text-xl">
                                        {link.name === "LinkedIn" ? "💼" : link.name === "GitHub" ? "🐙" : "✉️"}
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Location */}
                        <div className="mt-4 text-center">
                            <div className="font-orbitron text-xs text-gray-500">LOCATION</div>
                            <div className="font-rajdhani text-lg text-white">📍 {PERSONAL_INFO.location}</div>
                        </div>
                    </div>
                </Html>
            </group>
        </Float>
    );
}

export default function CyberpunkContact({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
            {/* Nebula background */}
            <NebulaCloud />

            {/* Stars */}
            <Stars
                radius={100}
                depth={50}
                count={2000}
                factor={4}
                saturation={0}
                fade
                speed={0.3}
            />

            {/* Star dust vortex */}
            <StarDustVortex />

            {/* Constellation lines */}
            <ConstellationLine points={[[-10, 8, -20], [-5, 12, -25], [0, 8, -22]]} />
            <ConstellationLine points={[[5, 10, -20], [10, 14, -25], [15, 11, -22]]} />
            <ConstellationLine points={[[0, 15, -30], [-8, 18, -28], [-12, 14, -32]]} />

            {/* Contact display */}
            <ContactDisplay />

            {/* Lighting */}
            <pointLight position={[0, 10, 0]} color="#ff6b6b" intensity={1} distance={50} />
            <pointLight position={[-15, 5, -10]} color="#48dbfb" intensity={0.6} distance={40} />
            <pointLight position={[15, 5, -10]} color="#feca57" intensity={0.6} distance={40} />

            <ambientLight intensity={0.2} />
        </group>
    );
}
