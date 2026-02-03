"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoCard";
import { WORK_EXPERIENCE } from "@/lib/constants";

export function ExperienceSection() {
    return (
        <section id="experience" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Work{" "}
                        <span className="bg-gradient-to-r from-[#4a8c5e] via-[#7bc47f] to-[#7fc4eb] bg-clip-text text-transparent">
                            Experience
                        </span>
                    </h2>
                    <p className="text-[#4a5568] max-w-2xl mx-auto">
                        My professional journey building software that matters
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7bc47f] via-[#7fc4eb] to-transparent" />

                    {/* Experience items */}
                    <div className="space-y-12">
                        {WORK_EXPERIENCE.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#7bc47f] border-4 border-[#f5f9fc] z-10 shadow-md" />

                                {/* Content card */}
                                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                                    }`}>
                                    <BentoCard delay={index * 0.1} glowColor="rgba(122, 196, 127, 0.2)">
                                        {/* Period badge */}
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#e8f4fc] text-[#4a8c5e] text-xs font-medium mb-4 border border-[#c9e4f5]">
                                            {exp.period}
                                        </div>

                                        {/* Company & Role */}
                                        <h3 className="text-xl font-bold text-[#2c3e50] mb-1">
                                            {exp.title}
                                        </h3>
                                        <p className="text-[#4a8c5e] font-medium mb-1">
                                            {exp.company}
                                        </p>
                                        <p className="text-[#6b7c8a] text-sm mb-3">
                                            {exp.location}
                                        </p>

                                        {/* Description */}
                                        <p className="text-[#4a5568] text-sm mb-4">
                                            {exp.description}
                                        </p>

                                        {/* Highlights */}
                                        <ul className="space-y-2">
                                            {exp.highlights.map((highlight) => (
                                                <li
                                                    key={highlight}
                                                    className="flex items-start gap-2 text-sm text-[#4a5568]"
                                                >
                                                    <span className="text-[#7bc47f] mt-1">✦</span>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </BentoCard>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
