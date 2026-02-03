"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  PointerLockControls, 
  Stars, 
  Environment,
  Preload,
  AdaptiveDpr,
  PerformanceMonitor,
  KeyboardControls,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useGameStore } from "@/lib/gameStore";
import Player from "./Player";
import GameEnvironment from "./GameEnvironment";
import ZoneManager from "./ZoneManager";
import InteractiveElements from "./InteractiveElements";

// Keyboard control mapping
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "sprint", keys: ["ShiftLeft"] },
  { name: "interact", keys: ["KeyE"] },
];

function GameCanvas() {
  const controlsRef = useRef<any>(null);
  const { isStarted, isPaused, setCanMove } = useGameStore();

  useEffect(() => {
    const handleLock = () => setCanMove(true);
    const handleUnlock = () => setCanMove(false);

    const controls = controlsRef.current;
    if (controls) {
      controls.addEventListener("lock", handleLock);
      controls.addEventListener("unlock", handleUnlock);
    }

    return () => {
      if (controls) {
        controls.removeEventListener("lock", handleLock);
        controls.removeEventListener("unlock", handleUnlock);
      }
    };
  }, [setCanMove]);

  return (
    <>
      {/* Skybox with stars */}
      <Stars 
        radius={300} 
        depth={100} 
        count={8000} 
        factor={6} 
        saturation={0.5} 
        fade 
        speed={0.5}
      />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight 
        position={[50, 50, 25]} 
        intensity={0.5} 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Colored point lights for atmosphere */}
      <pointLight position={[0, 10, 0]} color="#8b5cf6" intensity={2} distance={30} />
      <pointLight position={[15, 5, 0]} color="#ec4899" intensity={1.5} distance={20} />
      <pointLight position={[-15, 5, 0]} color="#10b981" intensity={1.5} distance={20} />
      <pointLight position={[0, 5, -20]} color="#3b82f6" intensity={1.5} distance={20} />
      <pointLight position={[0, 5, 20]} color="#f59e0b" intensity={1.5} distance={20} />

      {/* Player with first-person controls */}
      <Player controlsRef={controlsRef} />
      
      {/* Pointer lock controls */}
      {isStarted && !isPaused && (
        <PointerLockControls ref={controlsRef} />
      )}

      {/* Game environment (ground, structures) */}
      <GameEnvironment />

      {/* Zone-specific content */}
      <ZoneManager />

      {/* Interactive elements */}
      <InteractiveElements />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom 
          intensity={0.8} 
          luminanceThreshold={0.4} 
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette offset={0.3} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export default function GameWorld() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
          }}
          dpr={[1, 2]}
          camera={{ fov: 75, near: 0.1, far: 1000 }}
          style={{ background: "#020617" }}
        >
          <Suspense fallback={null}>
            <PerformanceMonitor>
              <GameCanvas />
            </PerformanceMonitor>
            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
