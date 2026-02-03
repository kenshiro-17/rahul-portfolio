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

// Moon
function Moon() {
    return (
        <group position={[0, 20, -40]}>
            <mesh>
                <sphereGeometry args={[8, 32, 32]} />
                <meshStandardMaterial color="#fef9c3" emissive="#fef08a" emissiveIntensity={0.5} />
            </mesh>
             {/* Glow */}
            <pointLight intensity={1} color="#fef08a" distance={100} decay={2} />
        </group>
    );
}

// Shooting Stars
function ShootingStars({ count = 5 }: { count?: number }) {
    const stars = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            x: (Math.random() - 0.5) * 100,
            y: 20 + Math.random() * 20,
            z: -50,
            speed: 1 + Math.random(),
            offset: Math.random() * 10,
        }));
    }, [count]);

    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        groupRef.current.children.forEach((star, i) => {
            const s = stars[i];
            const t = (time * s.speed + s.offset) % 10;
            if (t < 2) { // Active duration
                 star.position.x = s.x + t * 20;
                 star.position.y = s.y - t * 10;
                 star.scale.setScalar(1);
            } else {
                 star.scale.setScalar(0);
            }
        });
    });

    return (
        <group ref={groupRef}>
            {stars.map((_, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[0.2, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            ))}
        </group>
    );
}

// Contact Info
function ContactInfo() {
    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[0, 10, -10]}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={1.5}
                    position={[0, 5, 0]}
                    color="#fef08a"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#854d0e"
                >
                    CONNECT
                </Text>

                <Html position={[0, 0, 0]} center>
                    <div className="flex flex-col gap-4 items-center">
                         <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
                            {/* Email */}
                            <a
                                href={`mailto:${PERSONAL_INFO.email}`}
                                className="flex items-center gap-3 text-white hover:text-yellow-200 transition-colors"
                            >
                                <span className="text-2xl">📧</span>
                                <span className="font-rajdhani text-lg">{PERSONAL_INFO.email}</span>
                            </a>
                             {/* Phone */}
                            <a
                                href={`tel:${PERSONAL_INFO.phone}`}
                                className="flex items-center gap-3 text-white hover:text-yellow-200 transition-colors"
                            >
                                <span className="text-2xl">📱</span>
                                <span className="font-rajdhani text-lg">{PERSONAL_INFO.phone}</span>
                            </a>
                             {/* Location */}
                            <div className="flex items-center gap-3 text-white">
                                <span className="text-2xl">📍</span>
                                <span className="font-rajdhani text-lg">{PERSONAL_INFO.location}</span>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-2xl"
                                >
                                    {link.name === "LinkedIn" ? "💼" : link.name === "GitHub" ? "🐙" : "✉️"}
                                </a>
                            ))}
                        </div>
                    </div>
                </Html>
            </group>
        </Float>
    );
}

export default function GhibliContact({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
             {/* Night Sky */}
             <mesh position={[0, 0, -100]}>
                <planeGeometry args={[300, 200]} />
                <meshBasicMaterial color="#0f172a" />
            </mesh>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            
            {/* Moon */}
            <Moon />

            {/* Shooting Stars */}
            <ShootingStars />

            {/* Hill silhouette */}
             <mesh position={[0, -20, -50]}>
                <sphereGeometry args={[60, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#020617" />
            </mesh>

            {/* Contact Info */}
            <ContactInfo />

            {/* Lighting */}
            <ambientLight intensity={0.2} color="#1e1b4b" />
        </group>
    );
}
