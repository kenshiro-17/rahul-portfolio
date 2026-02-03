"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCinematicStore } from "@/lib/cinematicStore";

interface ContentDisplayProps {
    title: string;
    subtitle?: string;
    description?: string;
    children?: React.ReactNode;
    variant?: "cyberpunk" | "ghibli";
    position?: "center" | "left" | "right";
    size?: "small" | "medium" | "large";
}

export default function ContentDisplay({
    title,
    subtitle,
    description,
    children,
    variant = "cyberpunk",
    position = "center",
    size = "medium",
}: ContentDisplayProps) {
    const { experienceType } = useCinematicStore();
    const actualVariant = variant || (experienceType === "ghibli" ? "ghibli" : "cyberpunk");

    const sizeClasses = {
        small: "max-w-sm",
        medium: "max-w-md",
        large: "max-w-2xl",
    };

    const positionClasses = {
        center: "items-center text-center",
        left: "items-start text-left",
        right: "items-end text-right",
    };

    const variantStyles = {
        cyberpunk: {
            titleColor: "text-cyan-400",
            titleGlow: "neon-text-cyan",
            subtitleColor: "text-purple-400",
            bgColor: "bg-violet-950/30",
            borderColor: "border-cyan-400/30",
        },
        ghibli: {
            titleColor: "text-sky-700",
            titleGlow: "neon-text-gold",
            subtitleColor: "text-emerald-600",
            bgColor: "bg-white/40",
            borderColor: "border-sky-400/30",
        },
    };

    const styles = variantStyles[actualVariant];

    return (
        <AnimatePresence>
            <motion.div
                className={`
          flex flex-col gap-4 p-6 rounded-2xl backdrop-blur-lg
          ${sizeClasses[size]}
          ${positionClasses[position]}
          ${styles.bgColor}
          border ${styles.borderColor}
        `}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Title */}
                <motion.h2
                    className={`
            font-orbitron font-bold uppercase tracking-wider
            ${styles.titleColor}
            ${size === "large" ? "text-4xl md:text-5xl" : size === "medium" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}
          `}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {title}
                </motion.h2>

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        className={`
              font-rajdhani font-medium
              ${styles.subtitleColor}
              ${size === "large" ? "text-xl" : size === "medium" ? "text-lg" : "text-base"}
            `}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Description */}
                {description && (
                    <motion.p
                        className={`
              font-sans text-gray-300 leading-relaxed
              ${size === "large" ? "text-lg" : "text-base"}
            `}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {description}
                    </motion.p>
                )}

                {/* Children content */}
                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {children}
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

// Metric badge component
export function MetricBadge({
    value,
    label,
    variant = "cyberpunk",
}: {
    value: string;
    label?: string;
    variant?: "cyberpunk" | "ghibli";
}) {
    const variantStyles = {
        cyberpunk: "bg-cyan-500/20 border-cyan-400/50 text-cyan-300",
        ghibli: "bg-sky-500/20 border-sky-400/50 text-sky-700",
    };

    return (
        <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border
      ${variantStyles[variant]}
    `}>
            <span className="font-orbitron font-bold text-sm">{value}</span>
            {label && <span className="font-rajdhani text-xs opacity-80">{label}</span>}
        </div>
    );
}

// Tech tag component
export function TechTag({
    name,
    variant = "cyberpunk",
}: {
    name: string;
    variant?: "cyberpunk" | "ghibli";
}) {
    const variantStyles = {
        cyberpunk: "bg-purple-500/20 border-purple-400/30 text-purple-300",
        ghibli: "bg-emerald-500/20 border-emerald-400/30 text-emerald-700",
    };

    return (
        <span className={`
      inline-block px-2 py-0.5 rounded text-xs font-mono border
      ${variantStyles[variant]}
    `}>
            {name}
        </span>
    );
}
