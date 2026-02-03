"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore, ZONES } from "@/lib/gameStore";

interface PlayerProps {
  controlsRef: React.RefObject<any>;
}

const SPEED = 8;
const SPRINT_MULTIPLIER = 1.8;
const JUMP_FORCE = 5;
const GRAVITY = -20;

export default function Player({ controlsRef }: PlayerProps) {
  const { camera } = useThree();
  const velocityRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());
  const isOnGround = useRef(true);

  const {
    player,
    setPlayerPosition,
    setIsMoving,
    setCurrentZone,
    markZoneVisited,
    setNearbyInteractable,
    isStarted,
    isPaused,
  } = useGameStore();

  const [, getKeys] = useKeyboardControls();

  // Set initial camera position
  useEffect(() => {
    camera.position.set(...player.position);
  }, []);

  useFrame((state, delta) => {
    if (!isStarted || isPaused) return;

    const { forward, backward, left, right, jump, sprint } = getKeys();
    const controls = controlsRef.current;

    if (!controls?.isLocked) return;

    // Get camera direction
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    // Calculate movement direction
    const sideways = new THREE.Vector3();
    sideways.crossVectors(camera.up, cameraDirection).normalize();

    directionRef.current.set(0, 0, 0);

    if (forward) directionRef.current.add(cameraDirection);
    if (backward) directionRef.current.sub(cameraDirection);
    if (left) directionRef.current.add(sideways);
    if (right) directionRef.current.sub(sideways);

    directionRef.current.normalize();

    // Apply movement speed
    const speed = SPEED * (sprint ? SPRINT_MULTIPLIER : 1);
    
    if (directionRef.current.length() > 0) {
      velocityRef.current.x = directionRef.current.x * speed;
      velocityRef.current.z = directionRef.current.z * speed;
      setIsMoving(true);
    } else {
      velocityRef.current.x *= 0.9;
      velocityRef.current.z *= 0.9;
      if (Math.abs(velocityRef.current.x) < 0.01) velocityRef.current.x = 0;
      if (Math.abs(velocityRef.current.z) < 0.01) velocityRef.current.z = 0;
      setIsMoving(false);
    }

    // Jump
    if (jump && isOnGround.current) {
      velocityRef.current.y = JUMP_FORCE;
      isOnGround.current = false;
    }

    // Apply gravity
    velocityRef.current.y += GRAVITY * delta;

    // Update position
    camera.position.x += velocityRef.current.x * delta;
    camera.position.y += velocityRef.current.y * delta;
    camera.position.z += velocityRef.current.z * delta;

    // Ground collision (simple floor at y=1.6)
    if (camera.position.y < 1.6) {
      camera.position.y = 1.6;
      velocityRef.current.y = 0;
      isOnGround.current = true;
    }

    // Boundary limits
    const BOUNDARY = 50;
    camera.position.x = Math.max(-BOUNDARY, Math.min(BOUNDARY, camera.position.x));
    camera.position.z = Math.max(-BOUNDARY, Math.min(BOUNDARY, camera.position.z));
    camera.position.y = Math.min(20, camera.position.y);

    // Update player position in store
    setPlayerPosition([
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ]);

    // Check which zone player is in
    let closestZone = ZONES[0];
    let closestDistance = Infinity;

    for (const zone of ZONES) {
      const distance = Math.sqrt(
        Math.pow(camera.position.x - zone.position[0], 2) +
        Math.pow(camera.position.z - zone.position[2], 2)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestZone = zone;
      }
    }

    // Update current zone if close enough
    if (closestDistance < 12) {
      setCurrentZone(closestZone.id);
      markZoneVisited(closestZone.id);
    }

    // Check for nearby interactables
    if (closestDistance < 6) {
      setNearbyInteractable(closestZone.id);
    } else {
      setNearbyInteractable(null);
    }
  });

  return null; // Player is the camera itself in first-person
}
