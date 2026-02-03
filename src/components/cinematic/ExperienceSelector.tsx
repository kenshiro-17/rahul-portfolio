"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCinematicStore, ExperienceType } from "@/lib/cinematicStore";

// Portal card component
function PortalCard({
    type,
    title,
    subtitle,
    isSelected,
    onSelect,
    onHover,
}: {
    type: ExperienceType;
    title: string;
    subtitle: string;
    isSelected: boolean;
    onSelect: () => void;
    onHover: (hovering: boolean) => void;
}) {
    const isCyberpunk = type === "cyberpunk";

    return (
        <motion.button
            className={`
        relative group flex flex-col items-center justify-center
        w-full max-w-md aspect-[3/4] rounded-3xl cursor-pointer
        transition-all duration-500 overflow-hidden
        ${isSelected ? "scale-105" : "scale-100"}
                        ${isCyberpunk ? "portal-cyberpunk" : "portal-ghibli"}
      `}
            onClick={onSelect}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-80">
                <div
                    className={`
            absolute inset-0 
            ${isCyberpunk
                            ? "bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500"
                            : "bg-gradient-to-br from-sky-400 via-blue-400 to-emerald-400"
                        }
          `}
                />
                {/* Animated overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    animate={{
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Particle effect overlay */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`
              absolute w-1 h-1 rounded-full
              ${isCyberpunk ? "bg-cyan-400" : "bg-white"}
            `}
                        initial={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center p-8">
                {/* Icon */}
                <motion.div
                    className={`
            w-24 h-24 mb-6 rounded-2xl flex items-center justify-center
            ${isCyberpunk
                            ? "bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30"
                            : "bg-gradient-to-br from-sky-100/30 to-white/30 border border-white/50"
                        }
          `}
                    animate={{
                        boxShadow: isCyberpunk
                            ? ["0 0 20px rgba(0,255,255,0.3)", "0 0 40px rgba(0,255,255,0.5)", "0 0 20px rgba(0,255,255,0.3)"]
                            : ["0 0 20px rgba(255,255,255,0.4)", "0 0 40px rgba(255,255,255,0.6)", "0 0 20px rgba(255,255,255,0.4)"],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {isCyberpunk ? (
                        // Cyberpunk city icon
                        <svg className="w-12 h-12 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 21V8l4-4v17H3zm7 0V4l4 4v13h-4zm7 0V9l4 4v8h-4z" />
                        </svg>
                    ) : (
                        // Cloud/Wind icon
                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M18.5,4c-1.1,0-2.1,0.5-2.8,1.4c-0.7,0.9-1.5,1.7-2.6,2.3C12.4,8.1,11.6,8.6,11.3,9C11,8.6,10.2,8.1,9.6,7.7 C8.5,7.1,7.7,6.3,7,5.4C6.3,4.5,5.3,4,4.2,4C1.9,4,0,5.9,0,8.2s1.9,4.2,4.2,4.2c1.1,0,2.1-0.5,2.8-1.4c0.7-0.9,1.5-1.7,2.6-2.3 c0.7-0.4,1.5-0.9,1.8-1.3c0.3,0.4,1.1,0.9,1.7,1.3c1.1,0.6,1.9,1.4,2.6,2.3c0.7,0.9,1.7,1.4,2.8,1.4c2.3,0,4.2-1.9,4.2-4.2 S20.8,4,18.5,4z"/>
                        </svg>
                    )}
                </motion.div>

                {/* Title */}
                <h2
                    className={`
            font-orbitron text-2xl md:text-3xl font-bold mb-2 uppercase tracking-wider
            ${isCyberpunk ? "text-cyan-300" : "text-white"}
            ${isCyberpunk ? "animate-rgb-split" : ""}
          `}
                >
                    {title}
                </h2>

                {/* Subtitle */}
                <p
                    className={`
            font-rajdhani text-lg md:text-xl opacity-90
            ${isCyberpunk ? "text-purple-200" : "text-sky-100"}
          `}
                >
                    {subtitle}
                </p>

                {/* Enter prompt */}
                <motion.div
                    className={`
            mt-8 px-6 py-3 rounded-full font-orbitron text-sm uppercase tracking-widest
            ${isCyberpunk
                            ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300"
                            : "bg-white/20 border border-white/50 text-white"
                        }
          `}
                    animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.02, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Click to Enter
                </motion.div>
            </div>

            {/* Hover glow effect */}
            <motion.div
                className={`
          absolute inset-0 pointer-events-none rounded-3xl
          ${isCyberpunk
                        ? "shadow-[inset_0_0_60px_rgba(0,255,255,0.3)]"
                        : "shadow-[inset_0_0_60px_rgba(255,255,255,0.4)]"
                    }
        `}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    );
}

export default function ExperienceSelector() {
    const { isExperienceSelected, setExperienceType } = useCinematicStore();
    const [selectedPreview, setSelectedPreview] = useState<ExperienceType | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleSelect = useCallback((type: ExperienceType) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        // Transition animation before setting experience
        setTimeout(() => {
            setExperienceType(type);
        }, 800);
    }, [isTransitioning, setExperienceType]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isExperienceSelected || isTransitioning) return;

            switch (e.key) {
                        case " ": // Spacebar to cycle
                    e.preventDefault();
                    setSelectedPreview((prev) => (prev === "cyberpunk" ? "ghibli" : "cyberpunk"));
                    break;
                case "Enter": // Enter to select
                    if (selectedPreview) {
                        handleSelect(selectedPreview);
                    }
                    break;
                case "1":
                    handleSelect("cyberpunk");
                    break;
                case "2":
                    handleSelect("ghibli");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isExperienceSelected, isTransitioning, selectedPreview, handleSelect]);

    // Don't render if experience is already selected
    if (isExperienceSelected) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void-950"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    scale: 1.1,
                    filter: "blur(20px)",
                }}
                transition={{ duration: 0.8 }}
            >
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Star field */}
                    {[...Array(100)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white rounded-full"
                            initial={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent via-void-950/50 to-void-950" />
                </div>

                {/* Title */}
                <motion.div
                    className="relative z-10 text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-wider">
                        SELECT YOUR{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            DIMENSION
                        </span>
                    </h1>
                    <p className="font-rajdhani text-lg md:text-xl text-gray-400">
                        Choose your journey through Rahul&apos;s portfolio
                    </p>
                </motion.div>

                {/* Portal cards */}
                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 px-8 max-w-5xl w-full">
                    <PortalCard
                        type="cyberpunk"
                        title="Cyber Dimension"
                        subtitle="Neon Nights & Digital Dreams"
                        isSelected={selectedPreview === "cyberpunk"}
                        onSelect={() => handleSelect("cyberpunk")}
                        onHover={(hovering) => hovering && setSelectedPreview("cyberpunk")}
                    />
                    <PortalCard
                        type="ghibli"
                        title="Ghibli Dimension"
                        subtitle="A Journey of Winds & Spirits"
                        isSelected={selectedPreview === "ghibli"}
                        onSelect={() => handleSelect("ghibli")}
                        onHover={(hovering) => hovering && setSelectedPreview("ghibli")}
                    />
                </div>

                {/* Keyboard hints */}
                <motion.div
                    className="relative z-10 mt-12 flex gap-6 text-sm text-gray-500 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <span className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-white/10 rounded text-xs">SPACE</kbd>
                        <span>Toggle</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-white/10 rounded text-xs">ENTER</kbd>
                        <span>Select</span>
                    </span>
                    <span className="flex items-center gap-2">
                        <kbd className="px-2 py-1 bg-white/10 rounded text-xs">1</kbd>
                        <kbd className="px-2 py-1 bg-white/10 rounded text-xs">2</kbd>
                        <span>Quick Select</span>
                    </span>
                </motion.div>

                {/* Transition overlay */}
                <AnimatePresence>
                    {isTransitioning && (
                        <motion.div
                            className="absolute inset-0 z-50 bg-void-950"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className={`
                    w-4 h-4 rounded-full
                    ${selectedPreview === "cyberpunk" ? "bg-cyan-400" : "bg-sky-400"}
                  `}
                                    animate={{
                                        scale: [1, 100],
                                        opacity: [1, 0],
                                    }}
                                    transition={{ duration: 0.8, ease: "easeIn" }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}
