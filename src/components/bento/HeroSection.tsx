"use client";

import { motion } from "framer-motion";
import { HeroMascot } from "./HeroMascot";

// Floating petal component
function FloatingPetal({ delay, left, size }: { delay: number; left: string; size: number }) {
    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left, top: -20 }}
            initial={{ opacity: 0, y: -20, rotate: 0 }}
            animate={{
                opacity: [0, 0.7, 0.7, 0],
                y: [0, 400, 800],
                x: [0, 30, -20, 50],
                rotate: [0, 180, 360],
            }}
            transition={{
                duration: 12,
                delay,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <div
                className="rounded-[50%_0_50%_50%]"
                style={{
                    width: size,
                    height: size,
                    background: "linear-gradient(135deg, #fce4ec 0%, #e8a4b8 100%)",
                }}
            />
        </motion.div>
    );
}

// Floating leaf component
function FloatingLeaf({ delay, left }: { delay: number; left: string }) {
    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left, top: "20%" }}
            animate={{
                y: [0, -15, -5, -20, 0],
                x: [0, 10, -5, 15, 0],
                rotate: [0, 10, -5, 5, 0],
            }}
            transition={{
                duration: 10,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <div
                className="w-4 h-2.5 rounded-[50%_0_50%_0] opacity-60"
                style={{
                    background: "linear-gradient(135deg, #7bc47f 0%, #a8e6a3 100%)",
                }}
            />
        </motion.div>
    );
}

// Sparkle component
function Sparkle({ delay, left, top }: { delay: number; left: string; top: string }) {
    return (
        <motion.div
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{ left, top, background: "#fcd97d" }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
            }}
            transition={{
                duration: 3,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export function HeroSection() {
    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Petals */}
                <FloatingPetal delay={0} left="10%" size={12} />
                <FloatingPetal delay={2} left="25%" size={10} />
                <FloatingPetal delay={4} left="45%" size={14} />
                <FloatingPetal delay={6} left="70%" size={11} />
                <FloatingPetal delay={8} left="85%" size={13} />

                {/* Leaves */}
                <FloatingLeaf delay={0} left="15%" />
                <FloatingLeaf delay={3} left="60%" />
                <FloatingLeaf delay={6} left="80%" />

                {/* Sparkles */}
                <Sparkle delay={0} left="20%" top="30%" />
                <Sparkle delay={1} left="50%" top="20%" />
                <Sparkle delay={2} left="75%" top="40%" />
                <Sparkle delay={1.5} left="35%" top="60%" />
                <Sparkle delay={2.5} left="65%" top="70%" />

                {/* Soft cloud decorations */}
                <motion.div
                    className="absolute top-20 right-10 w-32 h-16 rounded-full opacity-40"
                    style={{ background: "rgba(255, 255, 255, 0.6)", filter: "blur(8px)" }}
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-40 left-20 w-24 h-12 rounded-full opacity-30"
                    style={{ background: "rgba(255, 255, 255, 0.5)", filter: "blur(6px)" }}
                    animate={{ x: [0, -15, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4 items-center">
                    {/* Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center lg:text-left order-2 lg:order-1 relative z-20"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#7bc47f]/30 mb-6 shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#4a8c5e] animate-pulse" />
                            <span className="text-sm text-[#2c3e50]">Available for work</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                        >
                            <span className="text-[#2c3e50]">Hi, I&apos;m </span>
                            <span className="bg-gradient-to-r from-[#4a8c5e] via-[#7bc47f] to-[#7fc4eb] bg-clip-text text-transparent">
                                Rahul
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-lg sm:text-xl text-[#4a5568] mb-8 max-w-xl mx-auto lg:mx-0"
                        >
                            A <span className="text-[#4a8c5e] font-medium">Systems Engineer</span> turned <span className="text-[#7fc4eb] font-medium">AI Specialist</span> building meaningful digital products that bridge machine intelligence with exceptional user experiences.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => scrollToSection("#contact")}
                                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7bc47f] to-[#4a8c5e] text-white font-medium hover:shadow-lg hover:shadow-[#4a8c5e]/30 transition-all hover:scale-105 hover:-translate-y-0.5"
                            >
                                Contact Me
                            </button>
                            <button
                                onClick={() => scrollToSection("#projects")}
                                className="group px-8 py-3 rounded-full bg-white/80 border-2 border-[#7bc47f] text-[#4a8c5e] font-medium hover:bg-[#a8e6a3]/30 transition-all flex items-center gap-2"
                            >
                                Explore My Work
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* 3D Mascot */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="order-1 lg:order-2 relative z-10 lg:-ml-16"
                    >
                        <HeroMascot />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-[#7bc47f]/40 p-1 bg-white/50"
                >
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-[#4a8c5e] mx-auto"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
