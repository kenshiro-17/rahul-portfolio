import { create } from "zustand";

// Experience types
export type ExperienceType = "cyberpunk" | "ghibli";

// Zone types for each experience
export type CyberpunkZone = 
  | "landing" 
  | "identity" 
  | "experience" 
  | "skills" 
  | "projects" 
  | "contact";

export type GhibliZone = 
  | "landing" 
  | "identity" 
  | "experience" 
  | "skills" 
  | "projects" 
  | "contact";

export type Zone = CyberpunkZone | GhibliZone;

// Quality settings for adaptive performance
export type QualityLevel = "low" | "medium" | "high";

// Playback speed options
export type PlaybackSpeed = 1 | 2 | 3;

// Device capability tiers
export type DeviceTier = "low" | "mid" | "high";

// Zone data structure
export interface ZoneData {
  id: Zone;
  name: string;
  description: string;
  duration: number; // seconds to spend in zone
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  colorPrimary: string;
  colorAccent: string;
  colorGlow: string;
}

// Cinematic state interface
interface CinematicState {
  // Experience selection
  experienceType: ExperienceType | null;
  isExperienceSelected: boolean;
  setExperienceType: (type: ExperienceType) => void;
  resetExperience: () => void;

  // Playback control
  isPlaying: boolean;
  isPaused: boolean;
  playbackSpeed: PlaybackSpeed;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  setPlaybackSpeed: (speed: PlaybackSpeed) => void;

  // Timeline & Progress
  progress: number; // 0-100
  currentTime: number; // seconds
  totalDuration: number;
  setProgress: (progress: number) => void;
  setCurrentTime: (time: number) => void;

  // Zone management
  currentZone: Zone;
  currentZoneIndex: number;
  visitedZones: Set<Zone>;
  setCurrentZone: (zone: Zone, index: number) => void;
  markZoneVisited: (zone: Zone) => void;
  jumpToZone: (index: number) => void;

  // Transition state
  isTransitioning: boolean;
  transitionProgress: number;
  setIsTransitioning: (transitioning: boolean) => void;
  setTransitionProgress: (progress: number) => void;

  // Audio
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;

  // Quality & Performance
  qualityLevel: QualityLevel;
  deviceTier: DeviceTier;
  fps: number;
  setQualityLevel: (level: QualityLevel) => void;
  setDeviceTier: (tier: DeviceTier) => void;
  setFps: (fps: number) => void;

  // UI State
  showControls: boolean;
  showZoneMenu: boolean;
  isFullscreen: boolean;
  toggleControls: () => void;
  toggleZoneMenu: () => void;
  setFullscreen: (fullscreen: boolean) => void;

  // Loading
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  // Mobile
  isMobile: boolean;
  isTouchDevice: boolean;
  setIsMobile: (mobile: boolean) => void;
  setIsTouchDevice: (touch: boolean) => void;
}

// Total journey duration per experience (60 seconds)
const TOTAL_DURATION = 60;

export const useCinematicStore = create<CinematicState>((set, get) => ({
  // Experience selection
  experienceType: null,
  isExperienceSelected: false,
  setExperienceType: (type) => set({ 
    experienceType: type, 
    isExperienceSelected: true,
    currentZone: "landing",
    currentZoneIndex: 0,
    progress: 0,
    currentTime: 0,
  }),
  resetExperience: () => set({ 
    experienceType: null, 
    isExperienceSelected: false,
    isPlaying: false,
    isPaused: false,
    progress: 0,
    currentTime: 0,
    currentZone: "landing",
    currentZoneIndex: 0,
    visitedZones: new Set(["landing"]),
  }),

  // Playback control
  isPlaying: false,
  isPaused: false,
  playbackSpeed: 1,
  play: () => set({ isPlaying: true, isPaused: false }),
  pause: () => set({ isPlaying: false, isPaused: true }),
  togglePlayPause: () => {
    const { isPlaying } = get();
    if (isPlaying) {
      set({ isPlaying: false, isPaused: true });
    } else {
      set({ isPlaying: true, isPaused: false });
    }
  },
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  // Timeline & Progress
  progress: 0,
  currentTime: 0,
  totalDuration: TOTAL_DURATION,
  setProgress: (progress) => set({ 
    progress: Math.max(0, Math.min(100, progress)),
    currentTime: (progress / 100) * TOTAL_DURATION,
  }),
  setCurrentTime: (time) => set({ 
    currentTime: Math.max(0, Math.min(TOTAL_DURATION, time)),
    progress: (time / TOTAL_DURATION) * 100,
  }),

  // Zone management
  currentZone: "landing",
  currentZoneIndex: 0,
  visitedZones: new Set(["landing"]),
  setCurrentZone: (zone, index) => set({ 
    currentZone: zone, 
    currentZoneIndex: index,
  }),
  markZoneVisited: (zone) => set((state) => ({
    visitedZones: new Set([...state.visitedZones, zone]),
  })),
  jumpToZone: (index) => {
    // Calculate time based on zone index (each zone is 10 seconds)
    const zoneTime = index * 10;
    set({
      currentTime: zoneTime,
      progress: (zoneTime / TOTAL_DURATION) * 100,
      currentZoneIndex: index,
    });
  },

  // Transition state
  isTransitioning: false,
  transitionProgress: 0,
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setTransitionProgress: (progress) => set({ transitionProgress: progress }),

  // Audio
  isMuted: false,
  volume: 0.7,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  // Quality & Performance
  qualityLevel: "high",
  deviceTier: "high",
  fps: 60,
  setQualityLevel: (level) => set({ qualityLevel: level }),
  setDeviceTier: (tier) => {
    // Auto-set quality based on device tier
    const qualityMap: Record<DeviceTier, QualityLevel> = {
      low: "low",
      mid: "medium",
      high: "high",
    };
    set({ deviceTier: tier, qualityLevel: qualityMap[tier] });
  },
  setFps: (fps) => {
    set({ fps });
    // Auto-downgrade quality if FPS is low
    const { qualityLevel } = get();
    if (fps < 30 && qualityLevel !== "low") {
      set({ qualityLevel: "low" });
    } else if (fps < 45 && qualityLevel === "high") {
      set({ qualityLevel: "medium" });
    }
  },

  // UI State
  showControls: true,
  showZoneMenu: false,
  isFullscreen: false,
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),
  toggleZoneMenu: () => set((state) => ({ showZoneMenu: !state.showZoneMenu })),
  setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),

  // Loading
  isLoading: true,
  loadingProgress: 0,
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  // Mobile
  isMobile: false,
  isTouchDevice: false,
  setIsMobile: (mobile) => set({ isMobile: mobile }),
  setIsTouchDevice: (touch) => set({ isTouchDevice: touch }),
}));

// Helper hooks for common state combinations
export const usePlaybackState = () => {
  const { isPlaying, isPaused, playbackSpeed, play, pause, togglePlayPause, setPlaybackSpeed } = 
    useCinematicStore();
  return { isPlaying, isPaused, playbackSpeed, play, pause, togglePlayPause, setPlaybackSpeed };
};

export const useProgressState = () => {
  const { progress, currentTime, totalDuration, currentZone, currentZoneIndex } = 
    useCinematicStore();
  return { progress, currentTime, totalDuration, currentZone, currentZoneIndex };
};

export const useQualityState = () => {
  const { qualityLevel, deviceTier, fps, setQualityLevel, setDeviceTier, setFps } = 
    useCinematicStore();
  return { qualityLevel, deviceTier, fps, setQualityLevel, setDeviceTier, setFps };
};
