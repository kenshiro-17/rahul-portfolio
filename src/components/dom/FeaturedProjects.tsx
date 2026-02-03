"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/lib/constants";
import { SectionHeading, Card, Button } from "./ui";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
  isReversed: boolean;
}

function ProjectCard({ project, index, isReversed }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        isReversed && "lg:direction-rtl"
      )}
      style={{ opacity }}
    >
      {/* Content */}
      <motion.div
        className={cn("space-y-6", isReversed && "lg:order-2 lg:direction-ltr")}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Label */}
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            Featured Project
          </span>
          <span className="text-gray-500 text-sm">0{index + 1}</span>
        </div>

        {/* Title */}
        <h3 className="text-heading text-white">{project.title}</h3>

        {/* Subtitle */}
        <p className="text-electric-400 font-medium">{project.subtitle}</p>

        {/* Description Card */}
        <Card className="p-6" variant="glass" hover={false}>
          <p className="text-body">{project.description}</p>
        </Card>

        {/* Metrics */}
        <div className="flex flex-wrap gap-4">
          {project.metrics.map((metric, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-900/50 border border-electric-500/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: project.color }}
              />
              <span className="text-sm text-gray-300">{metric}</span>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-void-800 text-gray-300 border border-void-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Visual */}
      <motion.div
        className={cn(
          "relative aspect-[4/3] rounded-2xl overflow-hidden",
          isReversed && "lg:order-1 lg:direction-ltr"
        )}
        style={{ y }}
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Device Mockup Container */}
        <div className="relative w-full h-full bg-gradient-to-br from-void-800 to-void-900 rounded-2xl border border-electric-500/20 p-8 flex items-center justify-center">
          {/* Browser Window Mockup */}
          <div className="relative w-full max-w-md bg-void-950 rounded-xl overflow-hidden border border-electric-500/10 shadow-2xl">
            {/* Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-void-900 border-b border-electric-500/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 rounded-md bg-void-800 px-3 flex items-center">
                  <span className="text-xs text-gray-500 truncate">
                    {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                  </span>
                </div>
              </div>
            </div>

            {/* Browser Content */}
            <div className="aspect-video bg-void-950 p-6 flex flex-col items-center justify-center text-center">
              {/* Project visualization placeholder */}
              <div
                className="w-20 h-20 rounded-2xl mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
                  boxShadow: `0 0 40px ${project.color}30`,
                }}
              >
                <span className="text-3xl font-bold text-white">
                  {project.title.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                {project.subtitle}
              </p>
              <div className="mt-4 flex gap-2">
                {project.tech.slice(0, 2).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      background: `${project.color}20`,
                      color: project.color,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-4 right-4 w-16 h-16 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${project.color}30, transparent)`,
              border: `1px solid ${project.color}20`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-12 h-12 rounded-full"
            style={{
              background: `radial-gradient(circle, ${project.color}40, transparent)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${isReversed ? "30%" : "70%"} 50%, ${project.color}10 0%, transparent 50%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section relative"
    >
      <div className="container">
        <SectionHeading
          subtitle="Portfolio"
          title="Featured Projects"
          highlight="Projects"
        >
          <p>
            A selection of AI/ML projects showcasing deep learning, NLP, and
            data engineering expertise.
          </p>
        </SectionHeading>

        {/* Projects List */}
        <div className="space-y-32">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-electric-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
