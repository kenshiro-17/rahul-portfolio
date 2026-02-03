"use client";

import { motion } from "framer-motion";
import { BentoCard } from "./BentoCard";
import { PERSONAL_INFO } from "@/lib/constants";

const socialLinks = [
    {
        name: "GitHub",
        url: PERSONAL_INFO.github,
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        url: PERSONAL_INFO.linkedin,
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        name: "Email",
        url: `mailto:${PERSONAL_INFO.email}`,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

export function ContactSection() {
    return (
        <section id="contact" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Let&apos;s{" "}
                        <span className="bg-gradient-to-r from-[#4a8c5e] via-[#7bc47f] to-[#7fc4eb] bg-clip-text text-transparent">
                            Connect
                        </span>
                    </h2>
                    <p className="text-[#4a5568] max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                    </p>
                </motion.div>

                {/* Contact grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Email card */}
                    <BentoCard colSpan={2} delay={0.1} glowColor="rgba(252, 217, 125, 0.3)">
                        <div className="text-center py-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fef9e7] to-[#fcd97d]/30 flex items-center justify-center mx-auto mb-6 text-3xl border border-[#fcd97d]/30 shadow-sm">
                                <span role="img" aria-label="mail">🌻</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#2c3e50] mb-2">
                                Drop me an email
                            </h3>
                            <a
                                href={`mailto:${PERSONAL_INFO.email}`}
                                className="text-xl text-[#4a8c5e] hover:text-[#2d5a3d] transition-colors font-medium"
                            >
                                {PERSONAL_INFO.email}
                            </a>
                            <p className="text-[#6b7c8a] text-sm mt-4">
                                I usually respond within 24 hours
                            </p>
                        </div>
                    </BentoCard>

                    {/* Social links */}
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="relative rounded-3xl p-6 bg-white/85 backdrop-blur-xl border border-white/90 hover:border-[#7bc47f]/40 transition-all group shadow-[0_4px_20px_rgba(44,62,80,0.06)]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#e8f4fc] flex items-center justify-center text-[#4a5568] group-hover:text-[#4a8c5e] transition-colors border border-[#c9e4f5]">
                                    {link.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#2c3e50] group-hover:text-[#4a8c5e] transition-colors">
                                        {link.name}
                                    </h4>
                                    <p className="text-sm text-[#6b7c8a]">
                                        Connect with me
                                    </p>
                                </div>
                                <svg
                                    className="w-5 h-5 text-[#6b7c8a] group-hover:text-[#4a8c5e] ml-auto transition-all group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-20 pt-8 border-t border-[#c9e4f5]/50"
                >
                    <p className="text-[#6b7c8a] text-sm">
                        Designed & Built by Rahul Raj
                    </p>
                    <p className="text-[#6b7c8a]/60 text-xs mt-2">
                        © 2024 All rights reserved
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
