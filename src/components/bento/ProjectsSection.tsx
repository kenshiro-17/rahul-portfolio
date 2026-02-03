"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS, PERSONAL_INFO } from "@/lib/constants";

// Transform PROJECTS data for ProjectCard component
const projects = PROJECTS.slice(0, 6).map((project, index) => ({
    title: project.title,
    description: project.description,
    tags: [...project.tech],
    liveUrl: "#",
    githubUrl: project.githubUrl || "#",
    featured: index < 2, // First two projects are featured
}));

export function ProjectsSection() {
    return (
        <section id="projects" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-[#4a8c5e] via-[#7bc47f] to-[#7fc4eb] bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-[#4a5568] max-w-2xl mx-auto">
                        A collection of projects I&apos;ve built, from AI-powered applications to
                        full-stack web platforms. Each one represents a unique challenge solved.
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            {...project}
                        />
                    ))}
                </div>

                {/* View all link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#4a8c5e] hover:text-[#2d5a3d] transition-colors group font-medium"
                    >
                        View all projects on GitHub
                        <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
