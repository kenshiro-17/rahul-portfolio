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

// Stylized Trees (Ghibli style - round and fluffy)
function SpiritTrees({ count = 20 }: { count?: number }) {
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 8 : qualityLevel === "medium" ? 15 : count;

    const trees = useMemo(() => {
        return Array.from({ length: actualCount }).map((_, i) => {
            const angle = (i / actualCount) * Math.PI * 2;
            const radius = 20 + Math.random() * 15;
            return {
                x: Math.cos(angle) * radius + (Math.random() - 0.5) * 5,
                z: Math.sin(angle) * radius + (Math.random() - 0.5) * 5,
                scale: 1 + Math.random() * 0.5,
            };
        });
    }, [actualCount]);

    return (
        <group>
            {trees.map((tree, i) => (
                <group key={i} position={[tree.x, 0, tree.z]} scale={tree.scale}>
                    {/* Trunk */}
                    <mesh position={[0, 2, 0]}>
                        <cylinderGeometry args={[0.5, 0.8, 4, 8]} />
                        <meshStandardMaterial color="#5d4037" />
                    </mesh>
                    {/* Canopy - Bottom */}
                    <mesh position={[0, 4, 0]}>
                        <sphereGeometry args={[2.5, 16, 16]} />
                        <meshStandardMaterial color="#15803d" />
                    </mesh>
                     {/* Canopy - Mid */}
                    <mesh position={[0, 6, 0]}>
                        <sphereGeometry args={[2, 16, 16]} />
                        <meshStandardMaterial color="#16a34a" />
                    </mesh>
                    {/* Canopy - Top */}
                    <mesh position={[0, 7.5, 0]}>
                        <sphereGeometry args={[1.5, 16, 16]} />
                        <meshStandardMaterial color="#22c55e" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// Kodama Spirits (Little white glowing guys)
function KodamaSpirits({ count = 10 }: { count?: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 5 : count;

    const spirits = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => ({
            x: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 20,
            y: 0.5 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
        }));
    }, [actualCount]);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        
        groupRef.current.children.forEach((spirit, i) => {
             const s = spirits[i];
             spirit.position.y = s.y + Math.sin(time * 2 + s.phase) * 0.1;
             spirit.rotation.z = Math.sin(time * 5 + s.phase) * 0.1; // Head tilt
        });
    });

    return (
        <group ref={groupRef}>
            {spirits.map((s, i) => (
                <group key={i} position={[s.x, s.y, s.z]}>
                    {/* Head */}
                     <mesh position={[0, 0.6, 0]}>
                        <sphereGeometry args={[0.25, 16, 16]} />
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
                    </mesh>
                     {/* Body */}
                    <mesh position={[0, 0.2, 0]}>
                         <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
                         <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
                    </mesh>
                     {/* Eyes */}
                    <mesh position={[-0.1, 0.65, 0.2]}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                     <mesh position={[0.1, 0.65, 0.2]}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshBasicMaterial color="black" />
                    </mesh>
                     {/* Mouth */}
                    <mesh position={[0, 0.55, 0.22]}>
                        <sphereGeometry args={[0.02, 8, 8]} />
                         <meshBasicMaterial color="black" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// Forest floor
function ForestFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial
                color="#14532d"
                roughness={1}
            />
        </mesh>
    );
}

// Identity display
function ForestIdentityDisplay() {
    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[0, 8, -10]}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={2}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.03}
                    outlineColor="#166534"
                >
                    {PERSONAL_INFO.name.toUpperCase()}
                </Text>

                <Text
                    font="/fonts/Rajdhani-SemiBold.ttf"
                    fontSize={0.7}
                    position={[0, -1.5, 0]}
                    color="#fcd34d"
                    anchorX="center"
                    anchorY="middle"
                >
                    {PERSONAL_INFO.title}
                </Text>

                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.4}
                    position={[0, -2.8, 0]}
                    color="#e2e8f0"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={15}
                    textAlign="center"
                >
                    {PERSONAL_INFO.bio.substring(0, 150)}...
                </Text>

                <Html position={[0, -4.5, 0]} center>
                    <div className="glass-controls px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                        <span className="font-rajdhani text-emerald-100 text-sm">
                            📍 {PERSONAL_INFO.location}
                        </span>
                    </div>
                </Html>
            </group>
        </Float>
    );
}

export default function GhibliIdentity({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
            {/* Forest floor */}
            <ForestFloor />

            {/* Trees */}
            <SpiritTrees />

            {/* Kodama */}
            <KodamaSpirits />

            {/* Identity display */}
            <ForestIdentityDisplay />

            {/* God rays lighting */}
            <directionalLight
                position={[10, 30, 5]}
                intensity={1}
                color="#fcd34d"
                castShadow
            />
            <ambientLight intensity={0.5} color="#dcfce7" />
            
            {/* Fog for depth */}
            <fog attach="fog" args={["#dcfce7", 5, 60]} />
        </group>
    );
}
