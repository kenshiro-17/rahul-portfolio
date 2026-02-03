"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematicStore } from "@/lib/cinematicStore";
import { getZonesForExperience } from "@/lib/experienceData";

// Icons as inline SVGs
const PlayIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

const SkipBackIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </svg>
);

const SkipForwardIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </svg>
);

const SoundOnIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
);

const SoundOffIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
);

const MenuIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
);

const FullscreenIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
);

// Zone jump menu component
function ZoneMenu({ onClose }: { onClose: () => void }) {
    const { experienceType, currentZoneIndex, jumpToZone, play } = useCinematicStore();

    const zones = experienceType ? getZonesForExperience(experienceType) : [];

    const handleZoneClick = (index: number) => {
        jumpToZone(index);
        play();
        onClose();
    };

    return (
        <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 glass-controls p-4 min-w-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-orbitron text-sm uppercase tracking-wider text-white">
                    Jump to Zone
                </h3>
                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
                    <CloseIcon />
                </button>
            </div>

            <div className="space-y-2">
                {zones.map((zone, index) => (
                    <button
                        key={zone.id}
                        onClick={() => handleZoneClick(index)}
                        className={`
              w-full flex items-center gap-3 p-3 rounded-lg transition-all
              ${index === currentZoneIndex
                                ? "bg-purple-500/30 border border-purple-400/50"
                                : "hover:bg-white/10"
                            }
            `}
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: zone.colorAccent }}
                        />
                        <div className="text-left">
                            <div className="font-rajdhani text-sm text-white">{zone.name}</div>
                            <div className="text-xs text-gray-400">{zone.description}</div>
                        </div>
                        {index === currentZoneIndex && (
                            <div className="ml-auto text-xs text-purple-400 font-mono">NOW</div>
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-4 text-center text-xs text-gray-500">
                Press <kbd className="px-1 bg-white/10 rounded">M</kbd> to toggle menu
            </div>
        </motion.div>
    );
}

export default function ControlsHUD() {
    const {
        experienceType,
        isExperienceSelected,
        isPlaying,
        playbackSpeed,
        progress,
        currentTime,
        totalDuration,
        currentZone,
        currentZoneIndex,
        showControls,
        showZoneMenu,
        isMuted,
        isFullscreen,
        togglePlayPause,
        setPlaybackSpeed,
        toggleMute,
        toggleZoneMenu,
        toggleControls,
        setFullscreen,
        resetExperience,
        jumpToZone,
        play,
    } = useCinematicStore();

    const zones = experienceType ? getZonesForExperience(experienceType) : [];
    const currentZoneData = zones[currentZoneIndex];

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullscreen(true);
        } else {
            document.exitFullscreen();
            setFullscreen(false);
        }
    }, [setFullscreen]);

    // Keyboard controls
    useEffect(() => {
        if (!isExperienceSelected) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case " ": // Spacebar - play/pause
                    e.preventDefault();
                    togglePlayPause();
                    break;
                case "Enter":
                case "ArrowRight": // Skip forward
                    if (currentZoneIndex < zones.length - 1) {
                        jumpToZone(currentZoneIndex + 1);
                    }
                    break;
                case "ArrowLeft": // Skip back
                    if (currentZoneIndex > 0) {
                        jumpToZone(currentZoneIndex - 1);
                    }
                    break;
                case "1":
                    setPlaybackSpeed(1);
                    break;
                case "2":
                    setPlaybackSpeed(2);
                    break;
                case "3":
                    setPlaybackSpeed(3);
                    break;
                case "m":
                case "M":
                    toggleZoneMenu();
                    break;
                case "Escape":
                    if (showZoneMenu) {
                        toggleZoneMenu();
                    } else {
                        resetExperience();
                    }
                    break;
                case "s":
                case "S":
                    toggleMute();
                    break;
                case "f":
                case "F":
                    toggleFullscreen();
                    break;
                case "h":
                case "H":
                    toggleControls();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isExperienceSelected, currentZoneIndex, zones.length, showZoneMenu, togglePlayPause, jumpToZone, setPlaybackSpeed, toggleZoneMenu, resetExperience, toggleMute, toggleFullscreen, toggleControls]);

    // Don't render if experience not selected
    if (!isExperienceSelected) return null;

    return (
        <AnimatePresence>
            {showControls && (
                <motion.div
                    className="fixed bottom-0 left-0 right-0 z-40 p-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Main controls container */}
                    <div className="max-w-4xl mx-auto">
                        {/* Zone name display */}
                        <motion.div
                            key={currentZone}
                            className="text-center mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-1">
                                {currentZoneData?.name || "Loading..."}
                            </h2>
                            <p className="font-rajdhani text-sm text-gray-400">
                                {currentZoneData?.description}
                            </p>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="relative mb-4">
                            <div className="progress-bar">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Zone markers */}
                            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1">
                                {zones.map((zone, index) => {
                                    const position = (index / (zones.length - 1)) * 100;
                                    return (
                                        <button
                                            key={zone.id}
                                            className={`
                        zone-marker -mx-1
                        ${index === currentZoneIndex ? "active" : ""}
                        ${index < currentZoneIndex ? "visited" : ""}
                      `}
                                            style={{ marginLeft: index === 0 ? 0 : "auto" }}
                                            onClick={() => {
                                                jumpToZone(index);
                                                play();
                                            }}
                                            title={zone.name}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Control buttons */}
                        <div className="glass-controls p-3 flex items-center justify-between gap-4">
                            {/* Left section - Time */}
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-sm text-gray-400 min-w-[80px]">
                                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                                </span>
                            </div>

                            {/* Center section - Playback controls */}
                            <div className="flex items-center gap-2">
                                {/* Skip back */}
                                <button
                                    className="glass-button p-2"
                                    onClick={() => currentZoneIndex > 0 && jumpToZone(currentZoneIndex - 1)}
                                    disabled={currentZoneIndex === 0}
                                >
                                    <SkipBackIcon />
                                </button>

                                {/* Play/Pause */}
                                <button
                                    className="glass-button p-3 bg-purple-500/30"
                                    onClick={togglePlayPause}
                                >
                                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                                </button>

                                {/* Skip forward */}
                                <button
                                    className="glass-button p-2"
                                    onClick={() => currentZoneIndex < zones.length - 1 && jumpToZone(currentZoneIndex + 1)}
                                    disabled={currentZoneIndex === zones.length - 1}
                                >
                                    <SkipForwardIcon />
                                </button>
                            </div>

                            {/* Right section - Speed & utilities */}
                            <div className="flex items-center gap-2">
                                {/* Speed controls */}
                                <div className="flex gap-1">
                                    {[1, 2, 3].map((speed) => (
                                        <button
                                            key={speed}
                                            className={`
                        px-2 py-1 text-xs font-mono rounded
                        ${playbackSpeed === speed
                                                    ? "bg-purple-500/50 text-white"
                                                    : "text-gray-400 hover:bg-white/10"
                                                }
                      `}
                                            onClick={() => setPlaybackSpeed(speed as 1 | 2 | 3)}
                                        >
                                            {speed}x
                                        </button>
                                    ))}
                                </div>

                                {/* Sound toggle */}
                                <button className="glass-button p-2" onClick={toggleMute}>
                                    {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
                                </button>

                                {/* Zone menu */}
                                <div className="relative">
                                    <button className="glass-button p-2" onClick={toggleZoneMenu}>
                                        <MenuIcon />
                                    </button>
                                    <AnimatePresence>
                                        {showZoneMenu && <ZoneMenu onClose={toggleZoneMenu} />}
                                    </AnimatePresence>
                                </div>

                                {/* Fullscreen */}
                                <button className="glass-button p-2" onClick={toggleFullscreen}>
                                    <FullscreenIcon />
                                </button>
                            </div>
                        </div>

                        {/* Keyboard hints */}
                        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
                            <span><kbd className="px-1 bg-white/10 rounded">SPACE</kbd> Play/Pause</span>
                            <span><kbd className="px-1 bg-white/10 rounded">←</kbd><kbd className="px-1 bg-white/10 rounded">→</kbd> Navigate</span>
                            <span><kbd className="px-1 bg-white/10 rounded">M</kbd> Menu</span>
                            <span><kbd className="px-1 bg-white/10 rounded">ESC</kbd> Exit</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
