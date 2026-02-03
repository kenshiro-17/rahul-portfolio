import { create } from "zustand";

// Game zones
export type Zone = 
  | "landing" 
  | "about" 
  | "experience" 
  | "skills" 
  | "projects" 
  | "contact";

export interface ZoneData {
  id: Zone;
  name: string;
  position: [number, number, number];
  color: string;
  description: string;
}

export const ZONES: ZoneData[] = [
  {
    id: "landing",
    name: "Command Center",
    position: [0, 0, 0],
    color: "#8b5cf6",
    description: "Welcome to Rahul's Universe",
  },
  {
    id: "about",
    name: "Identity Core",
    position: [15, 0, 0],
    color: "#ec4899",
    description: "Who I Am",
  },
  {
    id: "experience",
    name: "Experience Vault",
    position: [0, 0, -20],
    color: "#3b82f6",
    description: "Career Journey",
  },
  {
    id: "skills",
    name: "Skills Matrix",
    position: [-15, 0, 0],
    color: "#10b981",
    description: "Technical Arsenal",
  },
  {
    id: "projects",
    name: "Project Nexus",
    position: [0, 0, 20],
    color: "#f59e0b",
    description: "My Creations",
  },
  {
    id: "contact",
    name: "Communication Hub",
    position: [0, 10, 0],
    color: "#ef4444",
    description: "Get In Touch",
  },
];

// Player state
interface PlayerState {
  position: [number, number, number];
  rotation: [number, number, number];
  velocity: [number, number, number];
  isMoving: boolean;
  canMove: boolean;
}

// Game state
interface GameState {
  // Player
  player: PlayerState;
  setPlayerPosition: (pos: [number, number, number]) => void;
  setPlayerRotation: (rot: [number, number, number]) => void;
  setPlayerVelocity: (vel: [number, number, number]) => void;
  setIsMoving: (moving: boolean) => void;
  setCanMove: (can: boolean) => void;

  // Zones
  currentZone: Zone;
  visitedZones: Set<Zone>;
  setCurrentZone: (zone: Zone) => void;
  markZoneVisited: (zone: Zone) => void;

  // UI
  showHUD: boolean;
  showMinimap: boolean;
  activePanel: Zone | null;
  toggleHUD: () => void;
  toggleMinimap: () => void;
  setActivePanel: (panel: Zone | null) => void;

  // Game state
  isStarted: boolean;
  isPaused: boolean;
  isLoading: boolean;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setLoading: (loading: boolean) => void;

  // Camera
  cameraMode: "first-person" | "third-person" | "orbit";
  setCameraMode: (mode: "first-person" | "third-person" | "orbit") => void;

  // Interactions
  nearbyInteractable: string | null;
  setNearbyInteractable: (id: string | null) => void;

  // Collectibles
  collectedItems: Set<string>;
  collectItem: (id: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Player initial state
  player: {
    position: [0, 1.6, 8],
    rotation: [0, 0, 0],
    velocity: [0, 0, 0],
    isMoving: false,
    canMove: true,
  },
  setPlayerPosition: (pos) =>
    set((state) => ({ player: { ...state.player, position: pos } })),
  setPlayerRotation: (rot) =>
    set((state) => ({ player: { ...state.player, rotation: rot } })),
  setPlayerVelocity: (vel) =>
    set((state) => ({ player: { ...state.player, velocity: vel } })),
  setIsMoving: (moving) =>
    set((state) => ({ player: { ...state.player, isMoving: moving } })),
  setCanMove: (can) =>
    set((state) => ({ player: { ...state.player, canMove: can } })),

  // Zones
  currentZone: "landing",
  visitedZones: new Set(["landing"]),
  setCurrentZone: (zone) => set({ currentZone: zone }),
  markZoneVisited: (zone) =>
    set((state) => ({
      visitedZones: new Set([...state.visitedZones, zone]),
    })),

  // UI
  showHUD: true,
  showMinimap: true,
  activePanel: null,
  toggleHUD: () => set((state) => ({ showHUD: !state.showHUD })),
  toggleMinimap: () => set((state) => ({ showMinimap: !state.showMinimap })),
  setActivePanel: (panel) => set({ activePanel: panel }),

  // Game state
  isStarted: false,
  isPaused: false,
  isLoading: true,
  startGame: () => set({ isStarted: true, isLoading: false }),
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  setLoading: (loading) => set({ isLoading: loading }),

  // Camera
  cameraMode: "first-person",
  setCameraMode: (mode) => set({ cameraMode: mode }),

  // Interactions
  nearbyInteractable: null,
  setNearbyInteractable: (id) => set({ nearbyInteractable: id }),

  // Collectibles
  collectedItems: new Set(),
  collectItem: (id) =>
    set((state) => ({
      collectedItems: new Set([...state.collectedItems, id]),
    })),
}));
