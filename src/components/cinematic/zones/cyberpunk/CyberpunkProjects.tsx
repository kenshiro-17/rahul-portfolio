"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import { PROJECTS } from "@/lib/constants";

interface ZoneProps {
    visible: boolean;
}

// Infinite grid floor
function GalleryFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial
                color="#050505"
                metalness={0.95}
                roughness={0.05}
            />
        </mesh>
    );
}

// Spotlight cone
function Spotlight({ position, target }: {
    position: [number, number, number];
    target: [number, number, number];
}) {
    const lightRef = useRef<THREE.SpotLight>(null);

    return (
        <spotLight
            ref={lightRef}
            position={position}
            target-position={target}
            intensity={50}
            angle={0.3}
            penumbra={0.5}
            color="#ffeb3b"
            castShadow
        />
    );
}

// Dust motes in spotlight
function DustMotes({ position, count = 50 }: {
    position: [number, number, number];
    count?: number;
}) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { qualityLevel } = useCinematicStore();
    const actualCount = qualityLevel === "low" ? 15 : qualityLevel === "medium" ? 30 : count;

    const particles = useMemo(() => {
        return Array.from({ length: actualCount }).map(() => ({
            x: (Math.random() - 0.5) * 5,
            y: Math.random() * 8,
            z: (Math.random() - 0.5) * 5,
            speedY: 0.005 + Math.random() * 0.01,
            speedX: (Math.random() - 0.5) * 0.002,
        }));
    }, [actualCount]);

    useFrame(() => {
        if (!meshRef.current) return;

        const dummy = new THREE.Object3D();

        particles.forEach((p, i) => {
            p.y -= p.speedY;
            p.x += p.speedX;
            if (p.y < 0) p.y = 8;

            dummy.position.set(position[0] + p.x, position[1] + p.y - 4, position[2] + p.z);
            dummy.scale.setScalar(0.02);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, actualCount]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </instancedMesh>
    );
}

// Project canvas frame
function ProjectCanvas({ project, position }: {
    project: typeof PROJECTS[number];
    position: [number, number, number];
}) {
    const frameRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!frameRef.current) return;
        frameRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;
    });

    return (
        <group ref={frameRef} position={position}>
            {/* Frame */}
            <mesh>
                <boxGeometry args={[8, 6, 0.3]} />
                <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Canvas background */}
            <mesh position={[0, 0, 0.16]}>
                <planeGeometry args={[7.2, 5.2]} />
                <meshBasicMaterial color={project.color} />
            </mesh>

            {/* Project content */}
            <group position={[0, 0, 0.2]}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={0.5}
                    position={[0, 1.5, 0]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={6}
                    textAlign="center"
                >
                    {project.title}
                </Text>

                <Text
                    font="/fonts/Rajdhani-SemiBold.ttf"
                    fontSize={0.25}
                    position={[0, 0.8, 0]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={6}
                >
                    {project.subtitle}
                </Text>

                {/* Tech tags */}
                <Html position={[0, -0.5, 0]} center>
                    <div className="flex gap-2 flex-wrap justify-center max-w-[280px]">
                        {project.tech.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-white/20 rounded text-xs text-white"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </Html>

                {/* Metrics */}
                <Html position={[0, -1.5, 0]} center>
                    <div className="flex gap-3">
                        {project.metrics.map((metric, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 bg-black/50 border border-white/20 rounded text-xs text-yellow-400 font-mono"
                            >
                                {metric}
                            </span>
                        ))}
                    </div>
                </Html>
            </group>
        </group>
    );
}

// Abstract sculpture
function Sculpture({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
                color="#ffffff"
                metalness={0.9}
                roughness={0.1}
                wireframe
            />
        </mesh>
    );
}

export default function CyberpunkProjects({ visible }: ZoneProps) {
    const projectPositions: [number, number, number][] = [
        [-10, 2, -8],
        [10, 2, -8],
        [-10, 2, 8],
        [10, 2, 8],
    ];

    if (!visible) return null;

    return (
        <group>
            {/* Floor */}
            <GalleryFloor />

            {/* Title */}
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={1.5}
                    position={[0, 10, -5]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    PROJECT NEXUS
                </Text>
            </Float>

            {/* Project canvases */}
            {PROJECTS.map((project, i) => (
                <group key={project.id}>
                    <ProjectCanvas project={project} position={projectPositions[i]} />
                    <Spotlight
                        position={[projectPositions[i][0], 12, projectPositions[i][2] + 2]}
                        target={projectPositions[i]}
                    />
                    <DustMotes position={projectPositions[i]} />
                </group>
            ))}

            {/* Sculptures */}
            <Sculpture position={[0, 1, 0]} />
            <Sculpture position={[-5, 1, 0]} />
            <Sculpture position={[5, 1, 0]} />

            {/* Ambient lighting */}
            <ambientLight intensity={0.1} />
        </group>
    );
}
