"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WORK_EXPERIENCE } from "@/lib/constants";
import { SectionHeading, Card } from "./ui";
import { cn } from "@/lib/utils";

// Icon components
const Icons = {
  rocket: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  gamepad: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  brain: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

interface ExperienceCardProps {
  experience: (typeof WORK_EXPERIENCE)[number];
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group h-full p-6 cursor-pointer"
        whileHover={{
          y: -8,
          rotateX: 5,
          rotateY: index % 2 === 0 ? 5 : -5,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${experience.color}20, ${experience.color}40)`,
            boxShadow: `0 0 20px ${experience.color}30`,
          }}
        >
          <span style={{ color: experience.color }}>
            {Icons[experience.icon as keyof typeof Icons]}
          </span>
        </div>

        {/* Title & Company */}
        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-electric-300 transition-colors">
          {experience.title}
        </h3>
        <p
          className="font-medium mb-2"
          style={{ color: experience.color }}
        >
          {experience.company}
        </p>

        {/* Period & Location */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {experience.period}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {experience.location}
          </span>
        </div>

        {/* Description */}
        <p className="text-body text-sm mb-4 line-clamp-3">
          {experience.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {experience.highlights.map((highlight, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300"
              style={{
                background: `${experience.color}15`,
                color: experience.color,
                border: `1px solid ${experience.color}30`,
              }}
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Learn More */}
        <motion.div
          className="mt-4 pt-4 border-t border-electric-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        >
          <span
            className="inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: experience.color }}
          >
            Learn More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </motion.div>

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${experience.color}10 0%, transparent 70%)`,
          }}
        />
      </Card>
    </motion.div>
  );
}

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section relative"
    >
      <div className="container">
        <SectionHeading
          subtitle="Career Journey"
          title="Work Experience"
          highlight="Experience"
        >
          <p>
            From enterprise systems to AI research, here&apos;s my professional journey
            building impactful digital solutions.
          </p>
        </SectionHeading>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {WORK_EXPERIENCE.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-electric-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
