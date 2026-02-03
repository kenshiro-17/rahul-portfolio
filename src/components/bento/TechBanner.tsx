"use client";

import { motion } from "framer-motion";

const technologies = [
    { name: "TypeScript", icon: "TS" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Python", icon: "🐍" },
    { name: "Node.js", icon: "⬢" },
    { name: "TensorFlow", icon: "🧠" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁️" },
    { name: "Git", icon: "⎇" },
    { name: "GraphQL", icon: "◈" },
    { name: "Redis", icon: "💾" },
];

export function TechBanner() {
    return (
        <section className="py-12 overflow-hidden border-y border-white/5 bg-white/[0.02]">
            <div className="relative">
                {/* Gradient fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a1a] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a1a] to-transparent z-10" />

                {/* Scrolling container */}
                <motion.div
                    animate={{ x: [0, -1200] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    className="flex gap-12 items-center"
                >
                    {/* Double the items for seamless loop */}
                    {[...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={`${tech.name}-${index}`}
                            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 whitespace-nowrap hover:bg-white/10 transition-colors cursor-default"
                        >
                            <span className="text-xl">{tech.icon}</span>
                            <span className="text-gray-300 font-medium">{tech.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
