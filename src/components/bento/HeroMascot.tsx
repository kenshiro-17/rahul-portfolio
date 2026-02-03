"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Ghibli-style forest spirit mascot (Totoro-inspired)
function ForestSpirit() {
    const groupRef = useRef<THREE.Group>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    useFrame(({ clock, pointer }) => {
        if (!groupRef.current) return;

        // Smooth mouse following - very subtle
        mousePos.current.x += (pointer.x * 0.1 - mousePos.current.x) * 0.02;
        mousePos.current.y += (pointer.y * 0.1 - mousePos.current.y) * 0.02;

        // Very gentle body rotation following mouse (reduced to show face more)
        groupRef.current.rotation.y = mousePos.current.x * 0.25;

        // Breathing/bouncing animation
        const t = clock.getElapsedTime();
        groupRef.current.position.y = Math.sin(t * 1.5) * 0.1;
        groupRef.current.scale.y = 1 + Math.sin(t * 2) * 0.02;
    });

    return (
        <group ref={groupRef} scale={1.2}>
            {/* Main body - round and fluffy (slightly smaller to let face features pop out) */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial
                    color="#f0f0f0"
                    roughness={0.9}
                    metalness={0}
                />
            </mesh>

            {/* Belly patch - lighter and in front */}
            <mesh position={[0, -0.15, 0.65]}>
                <sphereGeometry args={[0.45, 32, 32]} />
                <meshStandardMaterial
                    color="#fafafa"
                    roughness={0.95}
                    metalness={0}
                />
            </mesh>

            {/* Left ear */}
            <group position={[-0.35, 0.75, 0]} rotation={[0, 0, -0.3]}>
                <mesh>
                    <coneGeometry args={[0.12, 0.4, 16]} />
                    <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
                </mesh>
                {/* Inner ear */}
                <mesh position={[0.02, -0.03, 0.06]}>
                    <coneGeometry args={[0.06, 0.25, 16]} />
                    <meshStandardMaterial color="#ffb6c1" roughness={0.9} />
                </mesh>
            </group>

            {/* Right ear */}
            <group position={[0.35, 0.75, 0]} rotation={[0, 0, 0.3]}>
                <mesh>
                    <coneGeometry args={[0.12, 0.4, 16]} />
                    <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
                </mesh>
                {/* Inner ear */}
                <mesh position={[-0.02, -0.03, 0.06]}>
                    <coneGeometry args={[0.06, 0.25, 16]} />
                    <meshStandardMaterial color="#ffb6c1" roughness={0.9} />
                </mesh>
            </group>

            {/* ===== FACE - positioned well in front of body ===== */}

            {/* Left eye - large anime style */}
            <group position={[-0.22, 0.15, 0.72]}>
                {/* Eye white */}
                <mesh>
                    <sphereGeometry args={[0.14, 24, 24]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.2} />
                </mesh>
                {/* Pupil - black */}
                <mesh position={[0, 0, 0.08]}>
                    <sphereGeometry args={[0.09, 24, 24]} />
                    <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
                </mesh>
                {/* Eye shine - big */}
                <mesh position={[0.04, 0.04, 0.12]}>
                    <sphereGeometry args={[0.035, 12, 12]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                {/* Eye shine - small */}
                <mesh position={[-0.02, -0.02, 0.12]}>
                    <sphereGeometry args={[0.02, 12, 12]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </group>

            {/* Right eye - large anime style */}
            <group position={[0.22, 0.15, 0.72]}>
                {/* Eye white */}
                <mesh>
                    <sphereGeometry args={[0.14, 24, 24]} />
                    <meshStandardMaterial color="#ffffff" roughness={0.2} />
                </mesh>
                {/* Pupil - black */}
                <mesh position={[0, 0, 0.08]}>
                    <sphereGeometry args={[0.09, 24, 24]} />
                    <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
                </mesh>
                {/* Eye shine - big */}
                <mesh position={[0.04, 0.04, 0.12]}>
                    <sphereGeometry args={[0.035, 12, 12]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
                {/* Eye shine - small */}
                <mesh position={[-0.02, -0.02, 0.12]}>
                    <sphereGeometry args={[0.02, 12, 12]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </group>

            {/* Nose - cute button nose - dark and prominent */}
            <mesh position={[0, 0.02, 0.85]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#2d2d2d" roughness={0.3} />
            </mesh>

            {/* Mouth - cute W-shaped cat smile */}
            <group position={[0, -0.1, 0.82]}>
                {/* Left part of smile */}
                <mesh position={[-0.06, 0, 0]} rotation={[0.1, 0.3, 0]}>
                    <torusGeometry args={[0.06, 0.025, 8, 16, Math.PI * 0.6]} />
                    <meshStandardMaterial color="#2d2d2d" roughness={0.3} />
                </mesh>
                {/* Right part of smile */}
                <mesh position={[0.06, 0, 0]} rotation={[0.1, -0.3, 0]}>
                    <torusGeometry args={[0.06, 0.025, 8, 16, Math.PI * 0.6]} />
                    <meshStandardMaterial color="#2d2d2d" roughness={0.3} />
                </mesh>
            </group>

            {/* Blush marks - rosy cheeks */}
            <mesh position={[-0.38, 0.02, 0.58]} rotation={[0, 0.4, 0]}>
                <circleGeometry args={[0.09, 24]} />
                <meshBasicMaterial color="#ffb6c1" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.38, 0.02, 0.58]} rotation={[0, -0.4, 0]}>
                <circleGeometry args={[0.09, 24]} />
                <meshBasicMaterial color="#ffb6c1" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Little arms/paws */}
            <mesh position={[-0.65, -0.15, 0.25]} rotation={[0, 0, 0.5]}>
                <capsuleGeometry args={[0.1, 0.18, 8, 16]} />
                <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
            </mesh>
            <mesh position={[0.65, -0.15, 0.25]} rotation={[0, 0, -0.5]}>
                <capsuleGeometry args={[0.1, 0.18, 8, 16]} />
                <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
            </mesh>

            {/* Little feet */}
            <mesh position={[-0.25, -0.75, 0.2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
            </mesh>
            <mesh position={[0.25, -0.75, 0.2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
            </mesh>

            {/* Leaf on head - nature element */}
            <group position={[0.12, 0.85, 0.08]} rotation={[0.3, 0.5, 0.2]}>
                <mesh>
                    <sphereGeometry args={[0.1, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color="#7bc47f"
                        roughness={0.8}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                {/* Leaf stem */}
                <mesh position={[0, 0.07, 0]} rotation={[0.3, 0, 0]}>
                    <cylinderGeometry args={[0.01, 0.012, 0.08, 8]} />
                    <meshStandardMaterial color="#4a8c5e" roughness={0.8} />
                </mesh>
            </group>
        </group>
    );
}

// Floating cherry blossom petals
function CherryBlossoms() {
    const petalsRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!petalsRef.current) return;
        petalsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    });

    return (
        <group ref={petalsRef}>
            {[...Array(10)].map((_, i) => (
                <Float
                    key={i}
                    speed={1 + Math.random()}
                    rotationIntensity={0.5}
                    floatIntensity={0.8}
                >
                    <mesh
                        position={[
                            (Math.random() - 0.5) * 6,
                            (Math.random() - 0.5) * 4,
                            (Math.random() - 0.5) * 3 - 2,
                        ]}
                        rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                        ]}
                    >
                        <planeGeometry args={[0.15, 0.15]} />
                        <meshBasicMaterial
                            color={i % 2 === 0 ? "#fce4ec" : "#ffb6c1"}
                            transparent
                            opacity={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

// Soft fluffy clouds
function GhibliClouds() {
    return (
        <>
            <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.3}>
                <group position={[3.5, 1.5, -4]}>
                    <mesh>
                        <sphereGeometry args={[0.6, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>
                    <mesh position={[0.5, 0.1, 0]}>
                        <sphereGeometry args={[0.45, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>
                    <mesh position={[0.25, 0.35, 0]}>
                        <sphereGeometry args={[0.4, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>
                </group>
            </Float>

            <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.4}>
                <group position={[-4, 0.5, -5]}>
                    <mesh>
                        <sphereGeometry args={[0.5, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>
                    <mesh position={[0.4, 0.15, 0]}>
                        <sphereGeometry args={[0.4, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>
                </group>
            </Float>

            <Float speed={1} rotationIntensity={0.05} floatIntensity={0.5}>
                <group position={[1.5, -2, -3]}>
                    <mesh>
                        <sphereGeometry args={[0.35, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>
                    <mesh position={[0.3, 0.1, 0]}>
                        <sphereGeometry args={[0.28, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" roughness={1} />
                    </mesh>
                </group>
            </Float>
        </>
    );
}

// Small floating sparkles/dust motes
function Sparkles() {
    return (
        <>
            {[...Array(15)].map((_, i) => (
                <Float
                    key={i}
                    speed={2 + Math.random() * 2}
                    rotationIntensity={0}
                    floatIntensity={1}
                >
                    <mesh
                        position={[
                            (Math.random() - 0.5) * 8,
                            (Math.random() - 0.5) * 6,
                            (Math.random() - 0.5) * 4 - 1,
                        ]}
                    >
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshBasicMaterial
                            color="#fcd97d"
                            transparent
                            opacity={0.6 + Math.random() * 0.4}
                        />
                    </mesh>
                </Float>
            ))}
        </>
    );
}

export function HeroMascot() {
    return (
        <div className="w-full aspect-square max-w-[600px] mx-auto">
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 50 }}
                gl={{
                    alpha: true,
                    antialias: true,
                    premultipliedAlpha: false,
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
                style={{ background: "none" }}
            >
                {/* Warm, soft lighting like Ghibli films */}
                <ambientLight intensity={0.8} color="#fff8e7" />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.2}
                    color="#fff5e6"
                />
                <directionalLight
                    position={[-3, 2, 4]}
                    intensity={0.6}
                    color="#ffe4ec"
                />
                <pointLight position={[0, 3, 3]} intensity={0.5} color="#fcd97d" />
                {/* Front fill light to illuminate face */}
                <pointLight position={[0, 0, 4]} intensity={0.4} color="#ffffff" />

                <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
                        <ForestSpirit />
                    </Float>
                    <CherryBlossoms />
                    <GhibliClouds />
                    <Sparkles />
                    {/* Environment removed to allow transparent background */}
                </Suspense>
            </Canvas>
        </div>
    );
}
