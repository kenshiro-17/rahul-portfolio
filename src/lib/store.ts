import { create } from "zustand";

// ========================================
// MOUSE POSITION STORE
// ========================================

interface MouseState {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  velocity: { x: number; y: number };
  isMoving: boolean;
  setPosition: (x: number, y: number) => void;
}

export const useMouseStore = create<MouseState>((set, get) => ({
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
  velocity: { x: 0, y: 0 },
  isMoving: false,
  setPosition: (x: number, y: number) => {
    const state = get();
    const velocity = {
      x: x - state.x,
      y: y - state.y,
    };
    set({
      x,
      y,
      normalizedX: (x / window.innerWidth) * 2 - 1,
      normalizedY: -(y / window.innerHeight) * 2 + 1,
      velocity,
      isMoving: Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1,
    });
  },
}));

// ========================================
// SCROLL STORE
// ========================================

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  direction: "up" | "down" | null;
  isScrolling: boolean;
  activeSection: string;
  setScroll: (scrollY: number, progress: number) => void;
  setActiveSection: (section: string) => void;
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  scrollY: 0,
  scrollProgress: 0,
  direction: null,
  isScrolling: false,
  activeSection: "home",
  setScroll: (scrollY: number, progress: number) => {
    const state = get();
    const direction = scrollY > state.scrollY ? "down" : "up";
    set({
      scrollY,
      scrollProgress: progress,
      direction,
      isScrolling: true,
    });
    // Reset isScrolling after a delay
    setTimeout(() => set({ isScrolling: false }), 150);
  },
  setActiveSection: (section: string) => set({ activeSection: section }),
}));

// ========================================
// UI STORE
// ========================================

interface UIState {
  isLoading: boolean;
  isMenuOpen: boolean;
  isReducedMotion: boolean;
  cursorVariant: "default" | "pointer" | "text" | "hidden";
  theme: "dark" | "light";
  setLoading: (loading: boolean) => void;
  toggleMenu: () => void;
  setMenuOpen: (open: boolean) => void;
  setCursorVariant: (variant: UIState["cursorVariant"]) => void;
  setReducedMotion: (reduced: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  isMenuOpen: false,
  isReducedMotion: false,
  cursorVariant: "default",
  theme: "dark",
  setLoading: (loading) => set({ isLoading: loading }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  setReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
}));

// ========================================
// 3D SCENE STORE
// ========================================

interface SceneState {
  isSceneReady: boolean;
  activeModel: string | null;
  interactionMode: "orbit" | "scroll" | "none";
  cameraPosition: { x: number; y: number; z: number };
  setSceneReady: (ready: boolean) => void;
  setActiveModel: (model: string | null) => void;
  setInteractionMode: (mode: SceneState["interactionMode"]) => void;
  setCameraPosition: (pos: { x: number; y: number; z: number }) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  isSceneReady: false,
  activeModel: null,
  interactionMode: "scroll",
  cameraPosition: { x: 0, y: 0, z: 5 },
  setSceneReady: (ready) => set({ isSceneReady: ready }),
  setActiveModel: (model) => set({ activeModel: model }),
  setInteractionMode: (mode) => set({ interactionMode: mode }),
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
}));
