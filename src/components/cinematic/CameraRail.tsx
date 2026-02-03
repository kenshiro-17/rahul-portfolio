"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCinematicStore } from "@/lib/cinematicStore";
import {
    getCameraPathForExperience,
    getZoneAtTime,
    getZoneIndex,
    CameraWaypoint
} from "@/lib/experienceData";

// Catmull-Rom spline interpolation for smooth camera paths
function catmullRom(
    t: number,
    p0: THREE.Vector3,
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    p3: THREE.Vector3,
    tension: number = 0.5
): THREE.Vector3 {
    const t2 = t * t;
    const t3 = t2 * t;

    const v0 = p2.clone().sub(p0).multiplyScalar(tension);
    const v1 = p3.clone().sub(p1).multiplyScalar(tension);

    const a = p1.clone().multiplyScalar(2).sub(p2.clone().multiplyScalar(2)).add(v0).add(v1);
    const b = p1.clone().multiplyScalar(-3).add(p2.clone().multiplyScalar(3)).sub(v0.clone().multiplyScalar(2)).sub(v1);
    const c = v0;
    const d = p1;

    return a.multiplyScalar(t3).add(b.multiplyScalar(t2)).add(c.multiplyScalar(t)).add(d);
}

// Smooth step easing function
function smoothStep(t: number): number {
    return t * t * (3 - 2 * t);
}

// Ease in-out cubic
function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function CameraRail() {
    const { camera } = useThree();
    const previousTimeRef = useRef(0);
    const targetPositionRef = useRef(new THREE.Vector3());
    const targetLookAtRef = useRef(new THREE.Vector3());
    const currentPositionRef = useRef(new THREE.Vector3());
    const currentLookAtRef = useRef(new THREE.Vector3());

    const {
        experienceType,
        isPlaying,
        playbackSpeed,
        currentTime,
        totalDuration,
        setCurrentTime,
        setCurrentZone,
        markZoneVisited,
    } = useCinematicStore();

    // Get camera path for current experience
    const cameraPath = useMemo(() => {
        if (!experienceType) return [];
        return getCameraPathForExperience(experienceType);
    }, [experienceType]);

    // Convert waypoints to Vector3 arrays for interpolation
    const pathPositions = useMemo(() => {
        return cameraPath.map(wp => new THREE.Vector3(...wp.position));
    }, [cameraPath]);

    const pathTargets = useMemo(() => {
        return cameraPath.map(wp => new THREE.Vector3(...wp.target));
    }, [cameraPath]);

    // Find the camera position and look-at target for a given normalized time
    const getCameraStateAtTime = (normalizedTime: number): { position: THREE.Vector3; target: THREE.Vector3 } => {
        if (cameraPath.length < 2) {
            return {
                position: new THREE.Vector3(0, 5, 30),
                target: new THREE.Vector3(0, 0, 0),
            };
        }

        // Find segment
        let segmentIndex = 0;
        for (let i = 0; i < cameraPath.length - 1; i++) {
            if (normalizedTime >= cameraPath[i].time && normalizedTime <= cameraPath[i + 1].time) {
                segmentIndex = i;
                break;
            }
        }

        // Prevent overshooting
        if (segmentIndex >= cameraPath.length - 1) {
            segmentIndex = cameraPath.length - 2;
        }

        const startTime = cameraPath[segmentIndex].time;
        const endTime = cameraPath[segmentIndex + 1].time;
        const segmentDuration = endTime - startTime;

        // Local time within this segment (0-1)
        let localT = segmentDuration > 0
            ? (normalizedTime - startTime) / segmentDuration
            : 0;

        // Apply easing based on waypoint config
        const easing = cameraPath[segmentIndex].easing || "linear";
        switch (easing) {
            case "easeIn":
                localT = localT * localT;
                break;
            case "easeOut":
                localT = 1 - (1 - localT) * (1 - localT);
                break;
            case "easeInOut":
                localT = easeInOutCubic(localT);
                break;
            default:
                // linear, no change
                break;
        }

        // Get 4 points for Catmull-Rom (we need points before and after current segment)
        const p0 = pathPositions[Math.max(0, segmentIndex - 1)];
        const p1 = pathPositions[segmentIndex];
        const p2 = pathPositions[Math.min(pathPositions.length - 1, segmentIndex + 1)];
        const p3 = pathPositions[Math.min(pathPositions.length - 1, segmentIndex + 2)];

        const t0 = pathTargets[Math.max(0, segmentIndex - 1)];
        const t1 = pathTargets[segmentIndex];
        const t2 = pathTargets[Math.min(pathTargets.length - 1, segmentIndex + 1)];
        const t3 = pathTargets[Math.min(pathTargets.length - 1, segmentIndex + 2)];

        const position = catmullRom(localT, p0, p1, p2, p3);
        const target = catmullRom(localT, t0, t1, t2, t3);

        return { position, target };
    };

    // Initialize camera on mount
    useEffect(() => {
        if (cameraPath.length > 0) {
            const { position, target } = getCameraStateAtTime(0);
            camera.position.copy(position);
            camera.lookAt(target);
            currentPositionRef.current.copy(position);
            currentLookAtRef.current.copy(target);
        }
    }, [cameraPath, camera]);

    // Animation frame loop
    useFrame((_, delta) => {
        if (!experienceType || !isPlaying) return;

        // Update current time based on playback speed
        const newTime = currentTime + delta * playbackSpeed;

        // Clamp to total duration
        if (newTime >= totalDuration) {
            setCurrentTime(totalDuration);
            return;
        }

        setCurrentTime(newTime);

        // Calculate normalized time (0-1)
        const normalizedTime = newTime / totalDuration;

        // Get target camera state
        const { position: targetPos, target: targetLook } = getCameraStateAtTime(normalizedTime);
        targetPositionRef.current.copy(targetPos);
        targetLookAtRef.current.copy(targetLook);

        // Smooth interpolation for buttery movement
        const lerpFactor = 1 - Math.pow(0.001, delta);
        currentPositionRef.current.lerp(targetPositionRef.current, lerpFactor);
        currentLookAtRef.current.lerp(targetLookAtRef.current, lerpFactor);

        // Apply to camera
        camera.position.copy(currentPositionRef.current);
        camera.lookAt(currentLookAtRef.current);

        // Update zone state
        const currentZone = getZoneAtTime(newTime, totalDuration);
        const zoneIndex = getZoneIndex(currentZone);

        setCurrentZone(currentZone, zoneIndex);
        markZoneVisited(currentZone);
    });

    return null; // This component only controls the camera, no visual output
}

// Helper component to visualize camera path (for debugging)
export function CameraPathVisualizer() {
    const { experienceType } = useCinematicStore();

    const cameraPath = useMemo(() => {
        if (!experienceType) return [];
        return getCameraPathForExperience(experienceType);
    }, [experienceType]);

    if (cameraPath.length < 2) return null;

    const points = cameraPath.map(wp => new THREE.Vector3(...wp.position));
    const curve = new THREE.CatmullRomCurve3(points);
    const curvePoints = curve.getPoints(100);

    return (
        <group>
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(curvePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#ff00ff" opacity={0.5} transparent />
            </line>
            {cameraPath.map((wp, i) => (
                <mesh key={i} position={wp.position}>
                    <sphereGeometry args={[0.3, 8, 8]} />
                    <meshBasicMaterial color={i === 0 ? "#00ff00" : "#ff0000"} />
                </mesh>
            ))}
        </group>
    );
}
