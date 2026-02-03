"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import { useCinematicStore } from "@/lib/cinematicStore";
import { ZONE_WORLD_POSITIONS } from "@/lib/experienceData";
import InteractiveCamera, { PointerLockOverlay, Crosshair } from "./InteractiveCamera";
import ExperienceSelector from "./ExperienceSelector";
import ControlsHUD from "./ControlsHUD";
import AudioManager from "./AudioManager";
import TouchControls from "./TouchControls";

// Zone environments - dynamically imported
import CyberpunkLanding from "./zones/cyberpunk/CyberpunkLanding";
import CyberpunkIdentity from "./zones/cyberpunk/CyberpunkIdentity";
import CyberpunkExperience from "./zones/cyberpunk/CyberpunkExperience";
import CyberpunkSkills from "./zones/cyberpunk/CyberpunkSkills";
import CyberpunkProjects from "./zones/cyberpunk/CyberpunkProjects";
import CyberpunkContact from "./zones/cyberpunk/CyberpunkContact";

import GhibliLanding from "./zones/ghibli/GhibliLanding";
import GhibliIdentity from "./zones/ghibli/GhibliIdentity";
import GhibliExperience from "./zones/ghibli/GhibliExperience";
import GhibliSkills from "./zones/ghibli/GhibliSkills";
import GhibliProjects from "./zones/ghibli/GhibliProjects";
import GhibliContact from "./zones/ghibli/GhibliContact";

// Loading fallback
function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#7c3aed" wireframe />
        </mesh>
    );
}

// Cyberpunk scene - all zones positioned for exploration
// Layout: zones arranged in a hexagonal pattern using ZONE_WORLD_POSITIONS
function CyberpunkScene() {
    return (
        <>
            {/* Landing zone at origin */}
            <group position={ZONE_WORLD_POSITIONS.landing}>
                <CyberpunkLanding visible={true} />
            </group>

            {/* Identity zone - north */}
            <group position={ZONE_WORLD_POSITIONS.identity}>
                <CyberpunkIdentity visible={true} />
            </group>

            {/* Experience zone - northeast */}
            <group position={ZONE_WORLD_POSITIONS.experience}>
                <CyberpunkExperience visible={true} />
            </group>

            {/* Skills zone - southeast */}
            <group position={ZONE_WORLD_POSITIONS.skills}>
                <CyberpunkSkills visible={true} />
            </group>

            {/* Projects zone - south */}
            <group position={ZONE_WORLD_POSITIONS.projects}>
                <CyberpunkProjects visible={true} />
            </group>

            {/* Contact zone - west */}
            <group position={ZONE_WORLD_POSITIONS.contact}>
                <CyberpunkContact visible={true} />
            </group>
        </>
    );
}

// Ghibli scene - all zones positioned for exploration
function GhibliScene() {
    return (
        <>
            {/* Landing zone at origin */}
            <group position={ZONE_WORLD_POSITIONS.landing}>
                <GhibliLanding visible={true} />
            </group>

            {/* Identity zone - north */}
            <group position={ZONE_WORLD_POSITIONS.identity}>
                <GhibliIdentity visible={true} />
            </group>

            {/* Experience zone - northeast */}
            <group position={ZONE_WORLD_POSITIONS.experience}>
                <GhibliExperience visible={true} />
            </group>

            {/* Skills zone - southeast */}
            <group position={ZONE_WORLD_POSITIONS.skills}>
                <GhibliSkills visible={true} />
            </group>

            {/* Projects zone - south */}
            <group position={ZONE_WORLD_POSITIONS.projects}>
                <GhibliProjects visible={true} />
            </group>

            {/* Contact zone - west */}
            <group position={ZONE_WORLD_POSITIONS.contact}>
                <GhibliContact visible={true} />
            </group>
        </>
    );
}

// Post-processing effects
function PostProcessingEffects() {
    const { qualityLevel, experienceType } = useCinematicStore();
    const isGhibli = experienceType === "ghibli";

    // Reduce effects on lower quality
    const bloomIntensity = qualityLevel === "high" ? (isGhibli ? 0.6 : 1.2) : (isGhibli ? 0.4 : 0.8);
    const chromaticEnabled = qualityLevel === "high";

    return (
        <EffectComposer>
            <Bloom
                intensity={bloomIntensity}
                luminanceThreshold={isGhibli ? 0.8 : 0.35}
                luminanceSmoothing={0.9}
                radius={0.8}
            />
            <Vignette
                offset={0.25}
                darkness={isGhibli ? 0.4 : 0.75}
                blendFunction={BlendFunction.NORMAL}
            />
            {chromaticEnabled ? (
                <ChromaticAberration
                    offset={new THREE.Vector2(isGhibli ? 0.0005 : 0.002, isGhibli ? 0.0005 : 0.002)}
                    blendFunction={BlendFunction.NORMAL}
                    radialModulation={false}
                    modulationOffset={0.5}
                />
            ) : <group />}
        </EffectComposer>
    );
}

// Main 3D scene
function Scene() {
    const { experienceType, isExperienceSelected } = useCinematicStore();

    if (!isExperienceSelected) return null;

    return (
        <>
            {/* Interactive Camera controller */}
            <InteractiveCamera />

            {/* Ambient lighting */}
            <ambientLight intensity={experienceType === "ghibli" ? 0.8 : 0.3} />

            {/* Main directional light */}
            <directionalLight
                position={[10, 10, 5]}
                intensity={experienceType === "ghibli" ? 1.5 : 0.5}
                color={experienceType === "cyberpunk" ? "#7c3aed" : "#fff7ed"}
            />

            {/* Experience-specific scene */}
            <Suspense fallback={<LoadingFallback />}>
                {experienceType === "cyberpunk" ? <CyberpunkScene /> : <GhibliScene />}
            </Suspense>

            {/* Post-processing */}
            <PostProcessingEffects />

            {/* Preload assets */}
            <Preload all />
        </>
    );
}

// Device detection and initialization
function useDeviceCapabilities() {
    const { setIsMobile, setIsTouchDevice, setDeviceTier } = useCinematicStore();

    useEffect(() => {
        // Check mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        setIsMobile(isMobile);

        // Check touch
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(isTouchDevice);

        // Estimate device tier based on hardware concurrency and memory
        const cores = navigator.hardwareConcurrency || 4;
        // @ts-expect-error - deviceMemory is not in the standard types
        const memory = navigator.deviceMemory || 4;

        if (cores >= 8 && memory >= 8) {
            setDeviceTier("high");
        } else if (cores >= 4 && memory >= 4) {
            setDeviceTier("mid");
        } else {
            setDeviceTier("low");
        }
    }, [setIsMobile, setIsTouchDevice, setDeviceTier]);
}

export default function CinematicExperience() {
    useDeviceCapabilities();

    const { isExperienceSelected, setLoading } = useCinematicStore();

    // Set loading complete after initial render
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [setLoading]);

    return (
        <div className="fixed inset-0 w-full h-full bg-void-950">
            {/* Experience selector overlay */}
            <ExperienceSelector />

            {/* 3D Canvas */}
            {isExperienceSelected && (
                <Canvas
                    className="w-full h-full"
                    camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 5, 30] }}
                    gl={{
                        antialias: true,
                        powerPreference: "high-performance",
                        alpha: false,
                    }}
                    dpr={[1, 2]}
                >
                    <Scene />
                </Canvas>
            )}

            {/* Controls HUD */}
            <ControlsHUD />

            {/* Interactive mode overlays */}
            <PointerLockOverlay />
            <Crosshair />

            {/* Audio Manager */}
            <AudioManager />

            {/* Touch Controls for Mobile */}
            <TouchControls />
        </div>
    );
}
