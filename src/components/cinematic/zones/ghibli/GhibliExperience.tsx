"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { WORK_EXPERIENCE } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Red Bridge
function BathhouseBridge() {
    return (
        <group position={[0, -2, 0]}>
            {/* Bridge Deck */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 100]} />
                <meshStandardMaterial color="#991b1b" />
            </mesh>
            
            {/* Railings */}
             <mesh position={[-4.8, 2, 0]}>
                <boxGeometry args={[0.4, 4, 100]} />
                 <meshStandardMaterial color="#ef4444" />
            </mesh>
             <mesh position={[4.8, 2, 0]}>
                <boxGeometry args={[0.4, 4, 100]} />
                 <meshStandardMaterial color="#ef4444" />
            </mesh>

            {/* Arches */}
            {[-40, -20, 0, 20, 40].map((z, i) => (
                <mesh key={i} position={[0, 6, z]}>
                    <torusGeometry args={[6, 0.5, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#b91c1c" />
                </mesh>
            ))}
        </group>
    );
}

// Steam Particles
function SteamParticles({ count = 100 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 40 : count;

    const particles = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => ({
            x: (Math.random() - 0.5) * 20,
            z: (Math.random() - 0.5) * 100,
            y: Math.random() * 5,
            speed: 0.5 + Math.random() * 0.5,
            scale: 0.5 + Math.random(),
        }));
    }, [actualCount]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const dummy = new THREE.Object3D();
        const time = state.clock.elapsedTime;

        particles.forEach((p, i) => {
            const y = p.y + (time * p.speed) % 10;
            const x = p.x + Math.sin(time + i) * 0.5;
            
            dummy.position.set(x, y, p.z);
            dummy.scale.setScalar(p.scale * (1 - y/10));
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </instancedMesh>
    );
}

// Experience lantern
function ExperienceLantern({ experience, index }: {
    experience: typeof WORK_EXPERIENCE[number];
    index: number;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        groupRef.current.position.y = 5 + Math.sin(time * 2 + index) * 0.5;
        groupRef.current.rotation.y = time * 0.2;
    });

    return (
        <group ref={groupRef} position={[(index % 2 === 0 ? -1 : 1) * 3, 5, (index - 1) * 15]}>
            {/* Lantern Body */}
            <mesh>
                 <cylinderGeometry args={[1.5, 1.2, 4, 8]} />
                 <meshStandardMaterial color="#fca5a5" emissive="#fecaca" emissiveIntensity={0.5} />
            </mesh>
            {/* Lantern Cap */}
             <mesh position={[0, 2.2, 0]}>
                 <coneGeometry args={[2, 1, 8]} />
                 <meshStandardMaterial color="#1e293b" />
            </mesh>
            {/* Lantern Base */}
             <mesh position={[0, -2.1, 0]}>
                 <cylinderGeometry args={[1.2, 1.2, 0.2, 8]} />
                 <meshStandardMaterial color="#1e293b" />
            </mesh>

            {/* Content */}
            <group position={[0, 0, 1.6]}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={0.4}
                    color="#450a0a"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#ffffff"
                >
                    {experience.title}
                </Text>
                <Text
                    font="/fonts/Rajdhani-SemiBold.ttf"
                    fontSize={0.3}
                    position={[0, -0.6, 0]}
                    color="#7f1d1d"
                    anchorX="center"
                    anchorY="middle"
                >
                    {experience.company}
                </Text>
                 <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.25}
                    position={[0, -1.0, 0]}
                    color="#4b5563"
                    anchorX="center"
                    anchorY="middle"
                >
                    {experience.period}
                </Text>
            </group>
        </group>
    );
}

export default function GhibliExperience({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
            {/* Bridge */}
            <BathhouseBridge />

            {/* Steam */}
            <SteamParticles />

            {/* Experience lanterns */}
            {WORK_EXPERIENCE.map((exp, i) => (
                <ExperienceLantern key={exp.id} experience={exp} index={i} />
            ))}

            {/* Title */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={1.5}
                    position={[0, 8, 10]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#b91c1c"
                >
                    JOURNEY OF WORK
                </Text>
                <Text
                    font="/fonts/Rajdhani-Medium.ttf"
                    fontSize={0.6}
                    position={[0, 6.5, 10]}
                    color="#fb7185"
                    anchorX="center"
                    anchorY="middle"
                >
                    Experience & Growth
                </Text>
            </Float>

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 10, 0]} color="#fecaca" intensity={0.8} distance={50} />
             <fog attach="fog" args={["#fff1f2", 10, 80]} />
        </group>
    );
}
