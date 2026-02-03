"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
    glowColor?: string;
    delay?: number;
}

export function BentoCard({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    glowColor = "rgba(122, 196, 127, 0.3)",
    delay = 0,
}: BentoCardProps) {
    const colClasses = {
        1: "col-span-1",
        2: "col-span-1 md:col-span-2",
        3: "col-span-1 md:col-span-2 lg:col-span-3",
    };

    const rowClasses = {
        1: "row-span-1",
        2: "row-span-1 md:row-span-2",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={clsx(
                // Base styles
                "relative rounded-3xl p-6 overflow-hidden",
                // Ghibli glassmorphism - soft white with subtle transparency
                "bg-white/85 backdrop-blur-xl",
                "border border-white/90",
                // Grid span
                colClasses[colSpan],
                rowClasses[rowSpan],
                className
            )}
            style={{
                boxShadow: `
                    0 4px 20px rgba(44, 62, 80, 0.06),
                    0 1px 4px rgba(44, 62, 80, 0.04),
                    0 0 0 1px rgba(122, 196, 127, 0.1),
                    0 20px 40px -20px ${glowColor}
                `,
            }}
        >
            {/* Soft gradient overlay on hover */}
            <motion.div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 60%)`,
                }}
                whileHover={{ opacity: 0.15 }}
            />

            {/* Content */}
            <div className="relative z-10 h-full">{children}</div>

            {/* Subtle border highlight effect */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, rgba(122, 196, 127, 0.2) 0%, transparent 50%, rgba(127, 196, 235, 0.1) 100%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />
        </motion.div>
    );
}
