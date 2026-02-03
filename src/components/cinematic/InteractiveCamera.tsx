"use client";

import { useRef, useEffect, useCallback } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCinematicStore, Zone } from "@/lib/cinematicStore";
import { getZonesForExperience, ZONE_WORLD_POSITIONS, ZONE_DETECTION_RADIUS } from "@/lib/experienceData";

// Movement and look sensitivity
const MOVE_SPEED = 15;
const LOOK_SENSITIVITY = 0.002;
const DAMPING = 0.1;

// Key state tracking
interface KeyState {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
}

export default function InteractiveCamera() {
    const { camera, gl } = useThree();

    const velocityRef = useRef(new THREE.Vector3());
    const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
    const isPointerLocked = useRef(false);
    const keysRef = useRef<KeyState>({
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false,
    });

    const {
        experienceType,
        isExperienceSelected,
        isPlaying,
        setCurrentZone,
        markZoneVisited,
    } = useCinematicStore();

    const zones = experienceType ? getZonesForExperience(experienceType) : [];

    // Initialize camera euler from current rotation
    useEffect(() => {
        euler.current.setFromQuaternion(camera.quaternion);
    }, [camera]);

    // Handle pointer lock
    const requestPointerLock = useCallback(() => {
        gl.domElement.requestPointerLock();
    }, [gl]);

    const exitPointerLock = useCallback(() => {
        document.exitPointerLock();
    }, []);

    // Mouse move handler with pointer lock
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isPointerLocked.current || !isPlaying) return;

        const movementX = e.movementX || 0;
        const movementY = e.movementY || 0;

        euler.current.y -= movementX * LOOK_SENSITIVITY;
        euler.current.x -= movementY * LOOK_SENSITIVITY;

        // Clamp vertical rotation to prevent flipping
        euler.current.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, euler.current.x));
    }, [isPlaying]);

    // Keyboard handlers
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isExperienceSelected || !isPlaying) return;

        switch (e.code) {
            case "KeyW":
            case "ArrowUp":
                keysRef.current.forward = true;
                break;
            case "KeyS":
            case "ArrowDown":
                keysRef.current.backward = true;
                break;
            case "KeyA":
            case "ArrowLeft":
                keysRef.current.left = true;
                break;
            case "KeyD":
            case "ArrowRight":
                keysRef.current.right = true;
                break;
            case "Space":
                keysRef.current.up = true;
                break;
            case "ShiftLeft":
            case "ShiftRight":
                keysRef.current.down = true;
                break;
            case "Escape":
                exitPointerLock();
                break;
        }
    }, [isExperienceSelected, isPlaying, exitPointerLock]);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        switch (e.code) {
            case "KeyW":
            case "ArrowUp":
                keysRef.current.forward = false;
                break;
            case "KeyS":
            case "ArrowDown":
                keysRef.current.backward = false;
                break;
            case "KeyA":
            case "ArrowLeft":
                keysRef.current.left = false;
                break;
            case "KeyD":
            case "ArrowRight":
                keysRef.current.right = false;
                break;
            case "Space":
                keysRef.current.up = false;
                break;
            case "ShiftLeft":
            case "ShiftRight":
                keysRef.current.down = false;
                break;
        }
    }, []);

    // Pointer lock state handler
    const handlePointerLockChange = useCallback(() => {
        isPointerLocked.current = document.pointerLockElement === gl.domElement;
    }, [gl]);

    // Canvas click handler to request pointer lock
    const handleCanvasClick = useCallback(() => {
        if (!isPointerLocked.current && isPlaying) {
            requestPointerLock();
        }
    }, [isPlaying, requestPointerLock]);

    // Setup event listeners
    useEffect(() => {
        if (!isExperienceSelected) return;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("pointerlockchange", handlePointerLockChange);
        gl.domElement.addEventListener("click", handleCanvasClick);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("pointerlockchange", handlePointerLockChange);
            gl.domElement.removeEventListener("click", handleCanvasClick);
        };
    }, [isExperienceSelected, handleMouseMove, handleKeyDown, handleKeyUp, handlePointerLockChange, handleCanvasClick, gl]);

    // Animation frame - movement and camera update
    useFrame((_, delta) => {
        if (!isExperienceSelected || !isPlaying) return;

        const keys = keysRef.current;
        const direction = new THREE.Vector3();

        // Get forward and right vectors from camera orientation
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

        // Flatten to horizontal plane for movement
        forward.y = 0;
        forward.normalize();
        right.y = 0;
        right.normalize();

        // Calculate movement direction
        if (keys.forward) direction.add(forward);
        if (keys.backward) direction.sub(forward);
        if (keys.right) direction.add(right);
        if (keys.left) direction.sub(right);
        if (keys.up) direction.y += 1;
        if (keys.down) direction.y -= 1;

        // Normalize and apply speed
        if (direction.length() > 0) {
            direction.normalize();
            direction.multiplyScalar(MOVE_SPEED * delta);
        }

        // Apply to velocity with damping
        velocityRef.current.lerp(direction, DAMPING);

        // Update camera position
        camera.position.add(velocityRef.current);

        // Update camera rotation from euler
        camera.quaternion.setFromEuler(euler.current);

        // Check which zone we're in based on world position
        const zoneIds: Zone[] = ["landing", "identity", "experience", "skills", "projects", "contact"];
        let closestZoneIndex = 0;
        let closestDistance = Infinity;

        zoneIds.forEach((zoneId, index) => {
            const worldPos = ZONE_WORLD_POSITIONS[zoneId];
            const zonePos = new THREE.Vector3(worldPos[0], worldPos[1], worldPos[2]);
            // Only consider horizontal distance (X/Z plane)
            const dx = camera.position.x - zonePos.x;
            const dz = camera.position.z - zonePos.z;
            const distance = Math.sqrt(dx * dx + dz * dz);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestZoneIndex = index;
            }
        });

        const currentZoneId = zoneIds[closestZoneIndex];
        setCurrentZone(currentZoneId, closestZoneIndex);

        // Only mark as visited if within detection radius
        if (closestDistance < ZONE_DETECTION_RADIUS) {
            markZoneVisited(currentZoneId);
        }
    });

    return null;
}

// Overlay for pointer lock instructions
export function PointerLockOverlay() {
    const { isExperienceSelected, isPlaying } = useCinematicStore();

    if (!isExperienceSelected || !isPlaying) return null;

    return (
        <div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{ opacity: document.pointerLockElement ? 0 : 1, transition: "opacity 0.3s" }}
        >
            <div className="glass-controls px-6 py-3 text-center">
                <p className="font-orbitron text-sm text-white mb-1">CLICK TO EXPLORE</p>
                <p className="font-rajdhani text-xs text-gray-400">Use WASD to move • Mouse to look • ESC to pause</p>
            </div>
        </div>
    );
}

// Crosshair for first-person view
export function Crosshair() {
    const { isExperienceSelected, isPlaying } = useCinematicStore();

    if (!isExperienceSelected || !isPlaying) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="relative w-6 h-6">
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/40 -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-white/40 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/60 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
}
