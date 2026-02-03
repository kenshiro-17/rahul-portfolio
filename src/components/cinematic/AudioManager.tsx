"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCinematicStore } from "@/lib/cinematicStore";

// Audio configuration for each zone
const ZONE_AUDIO_CONFIG = {
    cyberpunk: {
        ambient: "/audio/cyberpunk-ambient.mp3",
        zones: {
            "landing": { volume: 0.6, fadeIn: 2 },
            "identity": { volume: 0.7, fadeIn: 1.5 },
            "experience": { volume: 0.8, fadeIn: 1 },
            "skills": { volume: 0.7, fadeIn: 1.5 },
            "projects": { volume: 0.6, fadeIn: 2 },
            "contact": { volume: 0.5, fadeIn: 2.5 },
        },
    },
    ghibli: {
        ambient: "/audio/nature-ambient.mp3",
        zones: {
            "landing": { volume: 0.5, fadeIn: 2 },
            "identity": { volume: 0.6, fadeIn: 1.5 },
            "experience": { volume: 0.7, fadeIn: 1 },
            "skills": { volume: 0.6, fadeIn: 1.5 },
            "projects": { volume: 0.5, fadeIn: 2 },
            "contact": { volume: 0.4, fadeIn: 2.5 },
        },
    },
};

// Transition sound effects
const TRANSITION_SOUNDS = {
    zoneEnter: "/audio/zone-enter.mp3",
    zoneExit: "/audio/zone-exit.mp3",
    uiClick: "/audio/ui-click.mp3",
    warp: "/audio/warp.mp3",
};

export default function AudioManager() {
    const ambientRef = useRef<HTMLAudioElement | null>(null);
    const transitionRef = useRef<HTMLAudioElement | null>(null);

    const {
        experienceType,
        isExperienceSelected,
        isPlaying,
        isMuted,
        volume: audioVolume,
        currentZone,
    } = useCinematicStore();

    // Initialize audio context on user interaction
    const initAudio = useCallback(() => {
        if (!ambientRef.current && experienceType) {
            const config = ZONE_AUDIO_CONFIG[experienceType];
            ambientRef.current = new Audio(config.ambient);
            ambientRef.current.loop = true;
            ambientRef.current.volume = 0;

            // Start playing (will be silent until unmuted)
            ambientRef.current.play().catch(() => {
                // Auto-play blocked, will start on user interaction
                console.log("Audio autoplay blocked - waiting for user interaction");
            });
        }
    }, [experienceType]);

    // Handle experience selection
    useEffect(() => {
        if (isExperienceSelected && experienceType) {
            initAudio();
        }

        return () => {
            if (ambientRef.current) {
                ambientRef.current.pause();
                ambientRef.current = null;
            }
        };
    }, [isExperienceSelected, experienceType, initAudio]);

    // Handle mute state
    useEffect(() => {
        if (ambientRef.current) {
            ambientRef.current.muted = isMuted;
        }
    }, [isMuted]);

    // Handle volume changes
    useEffect(() => {
        if (ambientRef.current && experienceType && currentZone) {
            const config = ZONE_AUDIO_CONFIG[experienceType];
            const zoneConfig = config.zones[currentZone as keyof typeof config.zones];

            if (zoneConfig) {
                // Fade to target volume
                const targetVolume = zoneConfig.volume * audioVolume;
                const currentVolume = ambientRef.current.volume;
                const step = (targetVolume - currentVolume) / (zoneConfig.fadeIn * 60);

                let frame = 0;
                const fadeInterval = setInterval(() => {
                    if (ambientRef.current) {
                        const newVolume = currentVolume + step * frame;
                        if ((step > 0 && newVolume >= targetVolume) || (step < 0 && newVolume <= targetVolume)) {
                            ambientRef.current.volume = targetVolume;
                            clearInterval(fadeInterval);
                        } else {
                            ambientRef.current.volume = Math.max(0, Math.min(1, newVolume));
                        }
                    }
                    frame++;
                }, 1000 / 60);

                return () => clearInterval(fadeInterval);
            }
        }
    }, [currentZone, experienceType, audioVolume]);

    // Handle playback state
    useEffect(() => {
        if (ambientRef.current) {
            if (isPlaying) {
                ambientRef.current.play().catch(() => { });
            } else {
                // Fade out and pause
                const fadeOut = setInterval(() => {
                    if (ambientRef.current && ambientRef.current.volume > 0.01) {
                        ambientRef.current.volume *= 0.95;
                    } else if (ambientRef.current) {
                        ambientRef.current.pause();
                        clearInterval(fadeOut);
                    }
                }, 50);

                return () => clearInterval(fadeOut);
            }
        }
    }, [isPlaying]);

    // Play transition sound
    const playTransitionSound = useCallback((sound: keyof typeof TRANSITION_SOUNDS) => {
        if (isMuted) return;

        if (!transitionRef.current) {
            transitionRef.current = new Audio();
        }

        transitionRef.current.src = TRANSITION_SOUNDS[sound];
        transitionRef.current.volume = audioVolume * 0.5;
        transitionRef.current.play().catch(() => { });
    }, [isMuted, audioVolume]);

    // This component doesn't render anything visible
    return null;
}

// Hook for playing UI sounds
export function useAudioFeedback() {
    const { isMuted, volume: audioVolume } = useCinematicStore();

    const playClick = useCallback(() => {
        if (isMuted) return;

        const audio = new Audio(TRANSITION_SOUNDS.uiClick);
        audio.volume = audioVolume * 0.3;
        audio.play().catch(() => { });
    }, [isMuted, audioVolume]);

    const playWarp = useCallback(() => {
        if (isMuted) return;

        const audio = new Audio(TRANSITION_SOUNDS.warp);
        audio.volume = audioVolume * 0.5;
        audio.play().catch(() => { });
    }, [isMuted, audioVolume]);

    return { playClick, playWarp };
}
