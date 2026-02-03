"use client";

import { useEffect, useCallback, useRef } from "react";
import { useCinematicStore } from "@/lib/cinematicStore";

interface TouchState {
    startX: number;
    startY: number;
    startTime: number;
    isSwipe: boolean;
}

// Touch gesture thresholds
const SWIPE_THRESHOLD = 50; // pixels
const SWIPE_TIME_THRESHOLD = 300; // ms
const TAP_THRESHOLD = 10; // pixels
const DOUBLE_TAP_THRESHOLD = 300; // ms

export default function TouchControls() {
    const touchStateRef = useRef<TouchState | null>(null);
    const lastTapRef = useRef<number>(0);

    const {
        isExperienceSelected,
        isMobile,
        togglePlayPause,
        jumpToZone,
        currentZoneIndex,
        toggleZoneMenu,
        showZoneMenu,
        toggleControls,
        showControls,
    } = useCinematicStore();

    // Don't run on non-mobile devices or before experience selected
    useEffect(() => {
        if (!isExperienceSelected || !isMobile) return;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            touchStateRef.current = {
                startX: touch.clientX,
                startY: touch.clientY,
                startTime: Date.now(),
                isSwipe: false,
            };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStateRef.current) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStateRef.current.startX;
            const deltaY = touch.clientY - touchStateRef.current.startY;

            // Check if this is becoming a swipe
            if (Math.abs(deltaX) > SWIPE_THRESHOLD || Math.abs(deltaY) > SWIPE_THRESHOLD) {
                touchStateRef.current.isSwipe = true;
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStateRef.current) return;

            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStateRef.current.startX;
            const deltaY = touch.clientY - touchStateRef.current.startY;
            const deltaTime = Date.now() - touchStateRef.current.startTime;

            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            // Check for swipe gestures
            if (deltaTime < SWIPE_TIME_THRESHOLD) {
                if (absX > SWIPE_THRESHOLD && absX > absY) {
                    // Horizontal swipe
                    if (deltaX > 0) {
                        // Swipe right - previous zone
                        if (currentZoneIndex > 0) {
                            jumpToZone(currentZoneIndex - 1);
                        }
                    } else {
                        // Swipe left - next zone
                        jumpToZone(currentZoneIndex + 1);
                    }
                    touchStateRef.current = null;
                    return;
                }

                if (absY > SWIPE_THRESHOLD && absY > absX) {
                    // Vertical swipe
                    if (deltaY > 0) {
                        // Swipe down - show controls
                        if (!showControls) {
                            toggleControls();
                        }
                    } else {
                        // Swipe up - hide controls or show zone menu
                        if (showControls && !showZoneMenu) {
                            toggleZoneMenu();
                        } else if (showControls) {
                            toggleControls();
                        }
                    }
                    touchStateRef.current = null;
                    return;
                }
            }

            // Check for tap gesture
            if (absX < TAP_THRESHOLD && absY < TAP_THRESHOLD && deltaTime < SWIPE_TIME_THRESHOLD) {
                const now = Date.now();

                // Check for double tap
                if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
                    // Double tap - toggle play/pause
                    togglePlayPause();
                    lastTapRef.current = 0;
                } else {
                    // Single tap - just record time
                    lastTapRef.current = now;

                    // Single tap shows/hides controls
                    setTimeout(() => {
                        if (lastTapRef.current !== 0 && Date.now() - lastTapRef.current >= DOUBLE_TAP_THRESHOLD) {
                            toggleControls();
                            lastTapRef.current = 0;
                        }
                    }, DOUBLE_TAP_THRESHOLD);
                }
            }

            touchStateRef.current = null;
        };

        // Add touch event listeners
        document.addEventListener("touchstart", handleTouchStart, { passive: true });
        document.addEventListener("touchmove", handleTouchMove, { passive: true });
        document.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isExperienceSelected, isMobile, currentZoneIndex, showControls, showZoneMenu]);

    // This component doesn't render anything visible
    return null;
}

// Mobile gesture hints overlay
export function MobileGestureHints({ show }: { show: boolean }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8 animate-fadeIn">
            <div className="glass-controls p-8 max-w-md">
                <h3 className="font-orbitron text-xl text-white mb-6 text-center">TOUCH CONTROLS</h3>

                <div className="space-y-4 text-gray-300">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="text-2xl">👆</span>
                        </div>
                        <div>
                            <div className="font-rajdhani text-white">Single Tap</div>
                            <div className="text-sm text-gray-400">Show/Hide Controls</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="text-2xl">👆👆</span>
                        </div>
                        <div>
                            <div className="font-rajdhani text-white">Double Tap</div>
                            <div className="text-sm text-gray-400">Play/Pause</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="text-2xl">👈</span>
                        </div>
                        <div>
                            <div className="font-rajdhani text-white">Swipe Left</div>
                            <div className="text-sm text-gray-400">Next Zone</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="text-2xl">👉</span>
                        </div>
                        <div>
                            <div className="font-rajdhani text-white">Swipe Right</div>
                            <div className="text-sm text-gray-400">Previous Zone</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <span className="text-2xl">👆</span>
                        </div>
                        <div>
                            <div className="font-rajdhani text-white">Swipe Up</div>
                            <div className="text-sm text-gray-400">Show Zone Menu</div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Tap anywhere to dismiss
                </p>
            </div>
        </div>
    );
}
