"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoCard";
import { Floating3DElement, FloatingTorus } from "./Floating3DElement";
import { SKILLS, PERSONAL_INFO } from "@/lib/constants";

const skills = [
    { category: "AI & ML", items: SKILLS.categories["AI & ML"].slice(0, 4) },
    { category: "Programming", items: SKILLS.categories["Programming"].slice(0, 4) },
    { category: "Cloud & DevOps", items: SKILLS.categories["Cloud & DevOps"].slice(0, 4) },
    { category: "Web & Desktop", items: SKILLS.categories["Web & Desktop"].slice(0, 4) },
];

export function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        A little bit{" "}
                        <span className="bg-gradient-to-r from-[#4a8c5e] via-[#7bc47f] to-[#7fc4eb] bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h2>
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Main intro card */}
                    <BentoCard colSpan={2} delay={0.1} glowColor="rgba(127, 196, 235, 0.3)">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7bc47f] to-[#4a8c5e] flex items-center justify-center text-xl shadow-md">
                                    <span role="img" aria-label="lightbulb">🌱</span>
                                </div>
                                <h3 className="text-lg font-semibold text-[#2c3e50]">
                                    I build software that drives innovation
                                </h3>
                            </div>
                            <p className="text-[#4a5568] leading-relaxed">
                                {PERSONAL_INFO.bio}
                            </p>
                        </div>
                    </BentoCard>

                    {/* 3D element card */}
                    <BentoCard delay={0.2} glowColor="rgba(232, 164, 184, 0.3)">
                        <Floating3DElement>
                            <FloatingTorus color="#7bc47f" />
                        </Floating3DElement>
                    </BentoCard>

                    {/* Skills card */}
                    <BentoCard delay={0.3} glowColor="rgba(122, 196, 127, 0.3)">
                        <h3 className="text-lg font-semibold text-[#2c3e50] mb-4 flex items-center gap-2">
                            <span className="text-[#4a8c5e]">
                                <span role="img" aria-label="sparkles">✨</span>
                            </span>
                            My Expertise
                        </h3>
                        <div className="space-y-3">
                            {skills.slice(0, 2).map((skill) => (
                                <div key={skill.category}>
                                    <p className="text-sm text-[#6b7c8a] mb-1">{skill.category}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {skill.items.map((item) => (
                                            <span
                                                key={item}
                                                className="px-2 py-1 text-xs rounded-md bg-[#e8f4fc] text-[#4a5568] border border-[#c9e4f5]"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* More skills card */}
                    <BentoCard delay={0.4} glowColor="rgba(127, 196, 235, 0.3)">
                        <h3 className="text-lg font-semibold text-[#2c3e50] mb-4 flex items-center gap-2">
                            <span className="text-[#7fc4eb]">
                                <span role="img" aria-label="tools">🛠️</span>
                            </span>
                            Tech Stack
                        </h3>
                        <div className="space-y-3">
                            {skills.slice(2).map((skill) => (
                                <div key={skill.category}>
                                    <p className="text-sm text-[#6b7c8a] mb-1">{skill.category}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {skill.items.map((item) => (
                                            <span
                                                key={item}
                                                className="px-2 py-1 text-xs rounded-md bg-[#fef9e7] text-[#4a5568] border border-[#fcd97d]/30"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Location/availability card */}
                    <BentoCard delay={0.5} glowColor="rgba(252, 217, 125, 0.3)">
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[#2c3e50] mb-2 flex items-center gap-2">
                                    <span className="text-[#f4a261]">
                                        <span role="img" aria-label="location">📍</span>
                                    </span>
                                    Based in {PERSONAL_INFO.location}
                                </h3>
                                <p className="text-[#4a5568] text-sm">
                                    Open to remote opportunities worldwide
                                </p>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#4a8c5e] animate-pulse" />
                                <span className="text-sm text-[#4a8c5e] font-medium">Available for hire</span>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
}
