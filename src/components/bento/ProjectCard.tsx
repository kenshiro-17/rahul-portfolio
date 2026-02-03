"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
}

export function ProjectCard({
    title,
    description,
    tags,
    liveUrl,
    githubUrl,
    featured = false,
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6 }}
            className={`group relative rounded-3xl overflow-hidden ${featured ? "col-span-1 md:col-span-2" : "col-span-1"
                }`}
        >
            {/* Soft gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#a8e6a3]/20 via-transparent to-[#a8d4f0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card content */}
            <div className="relative h-full p-6 md:p-8 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl shadow-[0_4px_20px_rgba(44,62,80,0.06)]">
                {/* Explore badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#e8f4fc] text-[#4a8c5e] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity border border-[#c9e4f5]">
                    Explore →
                </div>

                {/* Project icon/preview area */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#a8e6a3]/40 to-[#7bc47f]/40 border border-[#7bc47f]/20 flex items-center justify-center mb-6 text-2xl shadow-sm">
                    {featured ? "🌸" : "🍃"}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-[#2c3e50] mb-3 group-hover:text-[#4a8c5e] transition-colors">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-[#4a5568] text-sm md:text-base mb-6 line-clamp-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-[#e8f4fc] border border-[#c9e4f5] text-xs text-[#4a5568]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    {liveUrl && liveUrl !== "#" && (
                        <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7bc47f] to-[#4a8c5e] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#4a8c5e]/20 transition-all"
                        >
                            View Live
                        </a>
                    )}
                    {githubUrl && githubUrl !== "#" && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full bg-white border-2 border-[#7bc47f] text-[#4a8c5e] text-sm font-medium hover:bg-[#a8e6a3]/20 transition-colors"
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
