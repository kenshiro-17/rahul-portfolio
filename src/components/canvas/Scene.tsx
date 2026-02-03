"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useUIStore, useSceneStore } from "@/lib/store";
import { useCinematicStore } from "@/lib/cinematicStore";
import ParticleField from "./ParticleField";
import FloatingElements from "./FloatingElements";

// Loading fallback for 3D content
function Loader() {
  return null; // The loading state is handled by the main UI
}

// Post-processing effects
function Effects() {
  const { experienceType } = useCinematicStore();
  const isGhibli = experienceType === "ghibli";

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={isGhibli ? 0.3 : 0.5}
        luminanceThreshold={isGhibli ? 0.8 : 0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={isGhibli ? 0.4 : 0.7}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(isGhibli ? 0.0002 : 0.0005, isGhibli ? 0.0002 : 0.0005)}
      />
    </EffectComposer>
  );
}

// Main scene content
function SceneContent() {
  const setSceneReady = useSceneStore((state) => state.setSceneReady);
  const { experienceType } = useCinematicStore();
  const isGhibli = experienceType === "ghibli";

  useEffect(() => {
    // Delay to ensure smooth loading
    const timer = setTimeout(() => {
      setSceneReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [setSceneReady]);

  return (
    <>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={isGhibli ? 0.8 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isGhibli ? 1.5 : 0.5} color={isGhibli ? "#fff7ed" : "#ffffff"} />
      
      {/* Volumetric point lights */}
      {!isGhibli && (
        <>
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#ec4899" intensity={0.3} />
        </>
      )}

      {isGhibli && (
        <>
           <pointLight position={[0, 20, 0]} color="#fde047" intensity={0.8} distance={100} />
           <color attach="background" args={['#bae6fd']} />
           <fog attach="fog" args={['#e0f2fe', 10, 100]} />
        </>
      )}
      
      {/* Particle field background */}
      <ParticleField count={isGhibli ? 2000 : 8000} />
      
      {/* Floating geometric elements */}
      <FloatingElements />
      
      {/* Post-processing */}
      <Effects />
    </>
  );
}

interface SceneProps {
  className?: string;
}

export default function Scene({ className }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useUIStore((state) => state.isReducedMotion);
  const { experienceType } = useCinematicStore();
  const isGhibli = experienceType === "ghibli";

  // Skip 3D rendering for reduced motion preference
  if (isReducedMotion) {
    return (
      <div 
        className={`canvas-container ${className || ""}`}
        style={{ 
          background: isGhibli 
            ? "linear-gradient(to bottom, #bae6fd 0%, #f0f9ff 100%)" 
            : "radial-gradient(ellipse at center, #1e1b4b 0%, #020617 70%)" 
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`canvas-container ${className || ""}`}
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
        style={{ background: isGhibli ? "#bae6fd" : "transparent" }}
      >
        <Suspense fallback={<Loader />}>
          <PerformanceMonitor
            onDecline={() => {
              // Reduce quality on low-end devices
              console.log("Performance declining, reducing quality");
            }}
          >
            <SceneContent />
          </PerformanceMonitor>
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
      
      {/* Accessibility fallback */}
      <div className="sr-only">
        Animated 3D particle background with floating geometric shapes creating an immersive space atmosphere.
      </div>
    </div>
  );
}
