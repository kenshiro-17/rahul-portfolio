import { ZoneData, ExperienceType, Zone } from "./cinematicStore";

// ========================================
// ZONE CONFIGURATIONS
// ========================================

// Zone timeline (each zone is ~10 seconds, totaling 60s) - Legacy for cinematic mode
export const ZONE_TIMELINE = {
    landing: { start: 0, end: 10 },
    identity: { start: 10, end: 22 },
    experience: { start: 22, end: 34 },
    skills: { start: 34, end: 46 },
    projects: { start: 46, end: 58 },
    contact: { start: 58, end: 60 },
} as const;

// ========================================
// ZONE WORLD POSITIONS (Interactive Mode)
// ========================================
// Layout: Zones arranged in a hexagonal pattern for exploration
// Distance between zones: ~60 units for comfortable walking

export const ZONE_WORLD_POSITIONS: Record<Zone, [number, number, number]> = {
    landing: [0, 0, 0],           // Center origin
    identity: [0, 0, -60],        // North
    experience: [52, 0, -30],     // Northeast (60 * cos(30°), y, 60 * sin(30°))
    skills: [52, 0, 30],          // Southeast
    projects: [0, 0, 60],         // South
    contact: [-52, 0, 0],         // West
};

// Detection radius for each zone (how close you need to be to "enter" a zone)
export const ZONE_DETECTION_RADIUS = 35;

// ========================================
// CYBERPUNK EXPERIENCE
// ========================================

export const CYBERPUNK_ZONES: ZoneData[] = [
    {
        id: "landing",
        name: "Deep Space Sector",
        description: "Welcome to Rahul's Universe",
        duration: 10,
        cameraPosition: [0, 5, 30],
        cameraTarget: [0, 0, 0],
        colorPrimary: "#0a0e27",
        colorAccent: "#7c3aed",
        colorGlow: "#4cc9f0",
    },
    {
        id: "identity",
        name: "Neon Cyber City",
        description: "Identity Core",
        duration: 12,
        cameraPosition: [0, 8, 15],
        cameraTarget: [0, 2, -5],
        colorPrimary: "#0f0a1a",
        colorAccent: "#ff00ff",
        colorGlow: "#00ffff",
    },
    {
        id: "experience",
        name: "Data Stream Realm",
        description: "Experience Vault",
        duration: 12,
        cameraPosition: [0, 3, 20],
        cameraTarget: [0, 0, -10],
        colorPrimary: "#051a0a",
        colorAccent: "#00ff41",
        colorGlow: "#0aff0a",
    },
    {
        id: "skills",
        name: "Neural Network Space",
        description: "Skills Matrix",
        duration: 12,
        cameraPosition: [0, 6, 18],
        cameraTarget: [0, 0, 0],
        colorPrimary: "#1a0a2e",
        colorAccent: "#ff6b00",
        colorGlow: "#7b2ff8",
    },
    {
        id: "projects",
        name: "Digital Gallery",
        description: "Project Nexus",
        duration: 12,
        cameraPosition: [0, 4, 22],
        cameraTarget: [0, 1, 0],
        colorPrimary: "#050505",
        colorAccent: "#ffffff",
        colorGlow: "#ffeb3b",
    },
    {
        id: "contact",
        name: "Stellar Cloud",
        description: "Communication Hub",
        duration: 2,
        cameraPosition: [0, 10, 15],
        cameraTarget: [0, 5, 0],
        colorPrimary: "#1a0a2e",
        colorAccent: "#ff6b6b",
        colorGlow: "#48dbfb",
    },
];

// ========================================
// GHIBLI EXPERIENCE
// ========================================

export const GHIBLI_ZONES: ZoneData[] = [
    {
        id: "landing",
        name: "Valley of the Wind",
        description: "A Journey Begins",
        duration: 10,
        cameraPosition: [0, 8, 25],
        cameraTarget: [0, 2, 0],
        colorPrimary: "#e0f2fe", // Sky blue
        colorAccent: "#4ade80", // Grass green
        colorGlow: "#fef08a", // Sun yellow
    },
    {
        id: "identity",
        name: "Spirit Forest",
        description: "The Core Self",
        duration: 12,
        cameraPosition: [0, 5, 18],
        cameraTarget: [0, 3, -5],
        colorPrimary: "#f0fdf4", // Mint white
        colorAccent: "#16a34a", // Forest green
        colorGlow: "#86efac", // Soft green
    },
    {
        id: "experience",
        name: "Bathhouse Bridge",
        description: "Path of Work",
        duration: 12,
        cameraPosition: [0, 4, 20],
        cameraTarget: [0, 2, -10],
        colorPrimary: "#fff1f2", // Rose white
        colorAccent: "#f43f5e", // Bridge red
        colorGlow: "#fb7185", // Lantern pink
    },
    {
        id: "skills",
        name: "Castle in the Sky",
        description: "Knowledge Fortress",
        duration: 12,
        cameraPosition: [0, 12, 20],
        cameraTarget: [0, 8, 0],
        colorPrimary: "#f0f9ff", // Cloud white
        colorAccent: "#0ea5e9", // Sky blue
        colorGlow: "#7dd3fc", // Light blue
    },
    {
        id: "projects",
        name: "Secret Garden",
        description: "Creation Gallery",
        duration: 12,
        cameraPosition: [0, 5, 22],
        cameraTarget: [0, 2, 0],
        colorPrimary: "#fff7ed", // Warm white
        colorAccent: "#f59e0b", // Flower orange
        colorGlow: "#fcd34d", // Pollen gold
    },
    {
        id: "contact",
        name: "Starry Hill",
        description: "Connect & Dream",
        duration: 2,
        cameraPosition: [0, 15, 18],
        cameraTarget: [0, 8, 0],
        colorPrimary: "#1e1b4b", // Night blue
        colorAccent: "#fbbf24", // Star gold
        colorGlow: "#c084fc", // Dream purple
    },
];

// ========================================
// CAMERA PATH WAYPOINTS
// ========================================

export interface CameraWaypoint {
    position: [number, number, number];
    target: [number, number, number];
    time: number; // Normalized time (0-1)
    zone: Zone;
    easing?: "linear" | "easeIn" | "easeOut" | "easeInOut";
}

export const CYBERPUNK_CAMERA_PATH: CameraWaypoint[] = [
    // Landing - Deep Space
    { position: [0, 5, 50], target: [0, 0, 0], time: 0, zone: "landing", easing: "easeOut" },
    { position: [0, 3, 30], target: [0, 0, 0], time: 0.08, zone: "landing" },
    { position: [0, 5, 20], target: [0, 0, -5], time: 0.15, zone: "landing", easing: "easeIn" },

    // Identity - Cyber City
    { position: [5, 8, 15], target: [0, 2, -10], time: 0.18, zone: "identity", easing: "easeOut" },
    { position: [0, 6, 10], target: [0, 3, -15], time: 0.25, zone: "identity" },
    { position: [-5, 8, 8], target: [0, 2, -20], time: 0.35, zone: "identity", easing: "easeIn" },

    // Experience - Data Stream
    { position: [0, 3, 25], target: [0, 0, 0], time: 0.38, zone: "experience", easing: "easeOut" },
    { position: [0, 2, 15], target: [0, 0, -10], time: 0.48, zone: "experience" },
    { position: [0, 4, 5], target: [0, 0, -20], time: 0.55, zone: "experience", easing: "easeIn" },

    // Skills - Neural Network
    { position: [0, 8, 20], target: [0, 0, 0], time: 0.58, zone: "skills", easing: "easeOut" },
    { position: [8, 6, 15], target: [0, 0, 0], time: 0.68, zone: "skills" },
    { position: [-8, 6, 15], target: [0, 0, 0], time: 0.75, zone: "skills", easing: "easeIn" },

    // Projects - Digital Gallery
    { position: [0, 4, 25], target: [0, 1, 0], time: 0.78, zone: "projects", easing: "easeOut" },
    { position: [10, 4, 15], target: [5, 1, 0], time: 0.85, zone: "projects" },
    { position: [-10, 4, 15], target: [-5, 1, 0], time: 0.92, zone: "projects", easing: "easeIn" },

    // Contact - Stellar Cloud
    { position: [0, 10, 20], target: [0, 5, 0], time: 0.95, zone: "contact", easing: "easeOut" },
    { position: [0, 8, 12], target: [0, 5, 0], time: 1, zone: "contact" },
];

export const GHIBLI_CAMERA_PATH: CameraWaypoint[] = [
    // Landing - Valley
    { position: [0, 10, 50], target: [0, 5, 0], time: 0, zone: "landing", easing: "easeOut" },
    { position: [0, 8, 30], target: [0, 3, 0], time: 0.08, zone: "landing" },
    { position: [0, 6, 20], target: [0, 2, -5], time: 0.15, zone: "landing", easing: "easeIn" },

    // Identity - Forest
    { position: [5, 5, 18], target: [0, 3, -5], time: 0.18, zone: "identity", easing: "easeOut" },
    { position: [0, 4, 12], target: [0, 3, -10], time: 0.28, zone: "identity" },
    { position: [-5, 5, 8], target: [0, 3, -15], time: 0.35, zone: "identity", easing: "easeIn" },

    // Experience - Bridge
    { position: [0, 4, 25], target: [0, 2, 0], time: 0.38, zone: "experience", easing: "easeOut" },
    { position: [0, 3, 15], target: [0, 2, -10], time: 0.48, zone: "experience" },
    { position: [0, 4, 5], target: [0, 2, -20], time: 0.55, zone: "experience", easing: "easeIn" },

    // Skills - Sky Castle
    { position: [0, 15, 25], target: [0, 10, 0], time: 0.58, zone: "skills", easing: "easeOut" },
    { position: [10, 12, 18], target: [0, 8, 0], time: 0.68, zone: "skills" },
    { position: [-10, 12, 18], target: [0, 8, 0], time: 0.75, zone: "skills", easing: "easeIn" },

    // Projects - Garden
    { position: [0, 6, 28], target: [0, 2, 0], time: 0.78, zone: "projects", easing: "easeOut" },
    { position: [12, 5, 18], target: [6, 2, 0], time: 0.85, zone: "projects" },
    { position: [-12, 5, 18], target: [-6, 2, 0], time: 0.92, zone: "projects", easing: "easeIn" },

    // Contact - Night Hill
    { position: [0, 18, 25], target: [0, 10, 0], time: 0.95, zone: "contact", easing: "easeOut" },
    { position: [0, 15, 15], target: [0, 8, 0], time: 1, zone: "contact" },
];

// ========================================
// COLOR PALETTES
// ========================================

export const CYBERPUNK_PALETTE = {
    void: "#0a0e27",
    deepPurple: "#1a0a2e",
    neonViolet: "#7c3aed",
    neonPink: "#ec4899",
    neonCyan: "#4cc9f0",
    neonMagenta: "#ff00ff",
    matrixGreen: "#00ff41",
    terminalGreen: "#0aff0a",
    synapseOrange: "#ff6b00",
    consciousPurple: "#7b2ff8",
    white: "#ffffff",
    spotlightGold: "#ffeb3b",
    stellarCoral: "#ff6b6b",
    stellarGold: "#feca57",
    stellarBlue: "#48dbfb",
} as const;

export const GHIBLI_PALETTE = {
    skyBlue: "#bae6fd", // Sky
    cloudWhite: "#f0f9ff", // Clouds
    grassGreen: "#4ade80", // Grass
    forestGreen: "#15803d", // Deep forest
    sunYellow: "#fde047", // Sun
    flowerPink: "#f9a8d4", // Flowers
    waterBlue: "#60a5fa", // Water
    woodBrown: "#92400e", // Wood/Earth
    spiritTransparent: "rgba(255, 255, 255, 0.6)", // Spirits
    nightBlue: "#1e1b4b", // Night sky
    starGold: "#fef08a", // Stars
    lanternRed: "#ef4444", // Lanterns
    stoneGray: "#94a3b8", // Stone
    magicPurple: "#c084fc", // Magic
    windWhite: "rgba(255, 255, 255, 0.4)", // Wind
} as const;

// ========================================
// PARTICLE CONFIGURATIONS
// ========================================

export interface ParticleConfig {
    count: number;
    countMobile: number;
    size: number;
    color: string;
    opacity: number;
    speed: number;
}

export const PARTICLE_CONFIGS = {
    cyberpunk: {
        landing: {
            stars: { count: 2000, countMobile: 500, size: 0.05, color: "#ffffff", opacity: 0.8, speed: 0.1 },
            dust: { count: 500, countMobile: 150, size: 0.02, color: "#4cc9f0", opacity: 0.4, speed: 0.05 },
        },
        identity: {
            rain: { count: 3000, countMobile: 1000, size: 0.015, color: "#4cc9f0", opacity: 0.6, speed: 2 },
            neonGlow: { count: 100, countMobile: 30, size: 0.1, color: "#ff00ff", opacity: 0.3, speed: 0.02 },
        },
        experience: {
            dataPackets: { count: 500, countMobile: 150, size: 0.03, color: "#00ff41", opacity: 0.8, speed: 1.5 },
            matrixRain: { count: 1000, countMobile: 300, size: 0.02, color: "#0aff0a", opacity: 0.6, speed: 3 },
        },
        skills: {
            neurons: { count: 300, countMobile: 100, size: 0.04, color: "#7b2ff8", opacity: 0.7, speed: 0.3 },
            synapses: { count: 200, countMobile: 50, size: 0.02, color: "#ff6b00", opacity: 0.5, speed: 0.5 },
        },
        projects: {
            dust: { count: 200, countMobile: 50, size: 0.02, color: "#ffffff", opacity: 0.3, speed: 0.02 },
        },
        contact: {
            starDust: { count: 3000, countMobile: 500, size: 0.03, color: "#ffffff", opacity: 0.7, speed: 0.2 },
            nebula: { count: 500, countMobile: 150, size: 0.08, color: "#48dbfb", opacity: 0.4, speed: 0.05 },
        },
    },
    ghibli: {
        landing: {
            clouds: { count: 50, countMobile: 20, size: 2, color: "#ffffff", opacity: 0.9, speed: 0.05 },
            petals: { count: 300, countMobile: 100, size: 0.1, color: "#f9a8d4", opacity: 0.8, speed: 0.2 },
        },
        identity: {
            spirits: { count: 200, countMobile: 50, size: 0.15, color: "#ffffff", opacity: 0.6, speed: 0.1 },
            leaves: { count: 150, countMobile: 40, size: 0.1, color: "#4ade80", opacity: 0.8, speed: 0.15 },
        },
        experience: {
            steam: { count: 300, countMobile: 100, size: 0.5, color: "#ffffff", opacity: 0.3, speed: 0.2 },
            sootSprites: { count: 50, countMobile: 20, size: 0.1, color: "#000000", opacity: 0.9, speed: 0.4 },
        },
        skills: {
            birds: { count: 50, countMobile: 15, size: 0.2, color: "#ffffff", opacity: 0.9, speed: 0.5 },
            robotParts: { count: 20, countMobile: 5, size: 0.3, color: "#94a3b8", opacity: 0.7, speed: 0.05 },
        },
        projects: {
            butterflies: { count: 100, countMobile: 30, size: 0.1, color: "#fcd34d", opacity: 0.9, speed: 0.2 },
            pollen: { count: 500, countMobile: 150, size: 0.02, color: "#fef08a", opacity: 0.5, speed: 0.1 },
        },
        contact: {
            fireflies: { count: 300, countMobile: 100, size: 0.1, color: "#fde047", opacity: 0.9, speed: 0.1 },
            stars: { count: 2000, countMobile: 500, size: 0.05, color: "#ffffff", opacity: 0.9, speed: 0.01 },
        },
    },
} as const;

// ========================================
// HELPER FUNCTIONS
// ========================================

export function getZonesForExperience(type: ExperienceType): ZoneData[] {
    return type === "cyberpunk" ? CYBERPUNK_ZONES : GHIBLI_ZONES;
}

export function getCameraPathForExperience(type: ExperienceType): CameraWaypoint[] {
    return type === "cyberpunk" ? CYBERPUNK_CAMERA_PATH : GHIBLI_CAMERA_PATH;
}

export function getZoneAtTime(time: number, totalDuration: number = 60): Zone {
    const normalizedTime = time / totalDuration;

    if (normalizedTime < 0.17) return "landing";
    if (normalizedTime < 0.37) return "identity";
    if (normalizedTime < 0.57) return "experience";
    if (normalizedTime < 0.77) return "skills";
    if (normalizedTime < 0.97) return "projects";
    return "contact";
}

export function getZoneIndex(zone: Zone): number {
    const zones: Zone[] = ["landing", "identity", "experience", "skills", "projects", "contact"];
    return zones.indexOf(zone);
}

export function getZoneByIndex(index: number): Zone {
    const zones: Zone[] = ["landing", "identity", "experience", "skills", "projects", "contact"];
    return zones[Math.max(0, Math.min(5, index))];
}
