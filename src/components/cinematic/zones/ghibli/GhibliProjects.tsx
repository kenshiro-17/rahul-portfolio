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

// Garden Floor
function GardenFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[150, 150]} />
            <meshStandardMaterial
                color="#86efac"
                roughness={1}
            />
        </mesh>
    );
}

// Giant Flowers
function GiantFlowers({ count = 20 }: { count?: number }) {
    const flowers = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            x: (Math.random() - 0.5) * 80,
            z: (Math.random() - 0.5) * 60,
            scale: 0.5 + Math.random() * 1.5,
            color: ["#f472b6", "#fbbf24", "#c084fc", "#60a5fa"][Math.floor(Math.random() * 4)],
        }));
    }, [count]);

    return (
        <group>
            {flowers.map((f, i) => (
                <group key={i} position={[f.x, -2, f.z]} scale={f.scale}>
                    {/* Stem */}
                    <mesh position={[0, 2, 0]}>
                         <cylinderGeometry args={[0.1, 0.2, 4, 8]} />
                         <meshStandardMaterial color="#166534" />
                    </mesh>
                    {/* Petals */}
                    <mesh position={[0, 4, 0]} rotation={[0.5, 0, 0]}>
                         <coneGeometry args={[1.5, 1, 6]} />
                         <meshStandardMaterial color={f.color} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// Project Painting/Easel
function ProjectEasel({ project, position }: {
    project: typeof PROJECTS[number];
    position: [number, number, number];
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Easel */}
            <mesh position={[0, 1, -0.2]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[3.2, 2.2, 0.1]} />
                <meshStandardMaterial color="#78350f" />
            </mesh>

            {/* Canvas */}
             <mesh position={[0, 1, 0]}>
                <planeGeometry args={[3, 2]} />
                <meshStandardMaterial color={project.color} />
            </mesh>

            {/* Content */}
            <group position={[0, 1, 0.1]}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={0.25}
                    position={[0, 0.5, 0]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2.8}
                    textAlign="center"
                    outlineWidth={0.01}
                    outlineColor="#000000"
                >
                    {project.title}
                </Text>
                
                 <Html position={[0, -0.2, 0]} center>
                    <div className="bg-white/90 p-2 rounded-lg text-center w-48 shadow-lg">
                        <p className="font-rajdhani text-xs text-gray-800 mb-1">{project.subtitle}</p>
                         <div className="flex gap-1 flex-wrap justify-center">
                            {project.tech.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-[10px] bg-sky-100 text-sky-800 px-1 rounded">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </Html>
            </group>
        </group>
    );
}

export default function GhibliProjects({ visible }: ZoneProps) {
    const projectPositions: [number, number, number][] = [
        [-10, 0, 0],
        [-3, 0, -5],
        [3, 0, -5],
        [10, 0, 0],
    ];

    if (!visible) return null;

    return (
        <group>
            <GardenFloor />
            <GiantFlowers />

            {/* Project Easels */}
            {PROJECTS.map((project, i) => (
                <ProjectEasel 
                    key={project.id} 
                    project={project} 
                    position={projectPositions[i % 4]} // Fallback for >4 projects
                />
            ))}

            {/* Title */}
             <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <Text
                    font="/fonts/Orbitron-Bold.ttf"
                    fontSize={1.5}
                    position={[0, 6, -5]}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#c026d3"
                >
                    SECRET GARDEN
                </Text>
            </Float>

            {/* Lighting */}
             <ambientLight intensity={0.6} color="#fdf4ff" />
             <directionalLight position={[-10, 20, 10]} intensity={1.2} color="#fef3c7" castShadow />
        </group>
    );
}
