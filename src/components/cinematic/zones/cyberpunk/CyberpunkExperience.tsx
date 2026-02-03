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

// Matrix rain effect particles
function MatrixRain({ count = 1000 }: { count?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 300 : qualityLevel === "medium" ? 600 : count;

    const particles = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => ({
            x: (Math.random() - 0.5) * 60,
            y: Math.random() * 40 - 20,
            z: (Math.random() - 0.5) * 40,
            speed: 0.5 + Math.random() * 1.5,
            char: Math.floor(Math.random() * 10),
        }));
    }, [actualCount]);

    useFrame(() => {
        if (!meshRef.current) return;

        const dummy = new THREE.Object3D();

        particles.forEach((p, i) => {
            p.y -= p.speed * 0.1;
            if (p.y < -20) p.y = 20;

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.setScalar(0.08);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]}>
            <boxGeometry args={[1, 2, 0.1]} />
            <meshBasicMaterial color="#00ff41" transparent opacity={0.6} />
        </instancedMesh>
    );
}

// Data tube/pipeline
function DataTube({ start, end, color }: {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}) {
    const tubeRef = useRef<THREE.Mesh>(null);

    const curve = useMemo(() => {
        const startVec = new THREE.Vector3(...start);
        const endVec = new THREE.Vector3(...end);
        const mid = startVec.clone().add(endVec).multiplyScalar(0.5);
        mid.y += 5;
        return new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
    }, [start, end]);

    const geometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 32, 0.3, 8, false);
    }, [curve]);

    useFrame((state) => {
        if (!tubeRef.current) return;
        const material = tubeRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    });

    return (
        <mesh ref={tubeRef} geometry={geometry}>
            <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
    );
}

// Grid floor with glowing nodes
function DataGrid() {
    const gridRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!gridRef.current) return;
        gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    });

    return (
        <group ref={gridRef} position={[0, -5, 0]}>
            <gridHelper args={[100, 50, "#00ff41", "#003311"]} />

            {/* Glowing intersection nodes */}
            {Array.from({ length: 25 }).map((_, i) => {
                const x = ((i % 5) - 2) * 10;
                const z = (Math.floor(i / 5) - 2) * 10;
                return (
                    <mesh key={i} position={[x, 0.1, z]}>
                        <sphereGeometry args={[0.3, 8, 8]} />
                        <meshBasicMaterial color="#00ff41" />
                    </mesh>
                );
            })}
        </group>
    );
}

// Experience card floating in space
function ExperienceCard({ experience, index }: {
    experience: typeof WORK_EXPERIENCE[number];
    index: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const angle = (index / WORK_EXPERIENCE.length) * Math.PI * 2;
    const radius = 12;

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime;
        groupRef.current.position.x = Math.cos(angle + time * 0.1) * radius;
        groupRef.current.position.z = Math.sin(angle + time * 0.1) * radius;
        groupRef.current.position.y = 3 + Math.sin(time + index) * 0.5;
        groupRef.current.lookAt(0, 3, 0);
    });

    return (
        <group ref={groupRef}>
            {/* Card background */}
            <mesh>
                <planeGeometry args={[8, 5]} />
                <meshBasicMaterial color="#051a0a" transparent opacity={0.9} />
            </mesh>

            {/* Border */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(8, 5)]} />
                <lineBasicMaterial color="#00ff41" />
            </lineSegments>

            {/* Content */}
            <Text
                font="/fonts/Orbitron-Bold.ttf"
                fontSize={0.4}
                position={[0, 1.5, 0.1]}
                color="#00ff41"
                anchorX="center"
                anchorY="middle"
                maxWidth={7}
            >
                {experience.title}
            </Text>

            <Text
                font="/fonts/Rajdhani-SemiBold.ttf"
                fontSize={0.3}
                position={[0, 0.8, 0.1]}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
            >
                {experience.company}
            </Text>

            <Text
                font="/fonts/Rajdhani-Medium.ttf"
                fontSize={0.2}
                position={[0, 0.3, 0.1]}
                color="#888888"
                anchorX="center"
                anchorY="middle"
            >
                {experience.period} • {experience.location}
            </Text>

            {/* Highlights */}
            <group position={[0, -0.8, 0.1]}>
                {experience.highlights.slice(0, 3).map((highlight, i) => (
                    <Html key={i} position={[(i - 1) * 2.2, 0, 0]} center>
                        <div className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-400 whitespace-nowrap">
                            {highlight}
                        </div>
                    </Html>
                ))}
            </group>
        </group>
    );
}

export default function CyberpunkExperience({ visible }: ZoneProps) {
    if (!visible) return null;

    return (
        <group>
            {/* Matrix rain */}
            <MatrixRain />

            {/* Data grid floor */}
            <DataGrid />

            {/* Data tubes */}
            <DataTube start={[-20, 5, -10]} end={[20, 5, -10]} color="#00ff41" />
            <DataTube start={[-15, 8, 5]} end={[15, 2, -15]} color="#00ffff" />
            <DataTube start={[0, 15, -5]} end={[0, 0, 10]} color="#0aff0a" />

            {/* Experience cards */}
            {WORK_EXPERIENCE.map((exp, i) => (
                <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}

            {/* Center title */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={1.2}
                    position={[0, 10, -5]}
                    color="#00ff41"
                    anchorX="center"
                    anchorY="middle"
                >
                    EXPERIENCE VAULT
                </Text>
            </Float>

            {/* Lighting */}
            <pointLight position={[0, 10, 0]} color="#00ff41" intensity={1} distance={50} />
            <pointLight position={[-15, 5, 5]} color="#00ffff" intensity={0.5} distance={30} />
            <pointLight position={[15, 5, -5]} color="#0aff0a" intensity={0.5} distance={30} />

            {/* Ambient */}
            <ambientLight intensity={0.1} />
        </group>
    );
}
