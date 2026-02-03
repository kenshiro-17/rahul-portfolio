"use client";

import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Floating3DElementProps {
    children: React.ReactNode;
    floatIntensity?: number;
    rotationSpeed?: number;
    followMouse?: boolean;
}

function FloatingWrapper({
    children,
    floatIntensity = 0.3,
    rotationSpeed = 0.2,
}: {
    children: React.ReactNode;
    floatIntensity?: number;
    rotationSpeed?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;

        const t = clock.getElapsedTime();

        // Gentle floating motion
        groupRef.current.position.y = Math.sin(t * 0.8) * floatIntensity;
        groupRef.current.position.x = Math.sin(t * 0.5) * floatIntensity * 0.3;

        // Subtle rotation
        groupRef.current.rotation.y = Math.sin(t * rotationSpeed) * 0.1;
        groupRef.current.rotation.z = Math.cos(t * rotationSpeed * 0.7) * 0.05;
    });

    return <group ref={groupRef}>{children}</group>;
}

export function Floating3DElement({
    children,
    floatIntensity = 0.3,
    rotationSpeed = 0.2,
}: Floating3DElementProps) {
    return (
        <div className="w-full h-full min-h-[200px]">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />

                <Suspense fallback={null}>
                    <FloatingWrapper
                        floatIntensity={floatIntensity}
                        rotationSpeed={rotationSpeed}
                    >
                        {children}
                    </FloatingWrapper>
                </Suspense>
            </Canvas>
        </div>
    );
}

// Pre-built floating shapes
export function FloatingCube({ color = "#7c3aed" }: { color?: string }) {
    return (
        <mesh>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
    );
}

export function FloatingSphere({ color = "#3b82f6" }: { color?: string }) {
    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
    );
}

export function FloatingTorus({ color = "#7c3aed" }: { color?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.5;
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <torusGeometry args={[1, 0.4, 16, 100]} />
            <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}
