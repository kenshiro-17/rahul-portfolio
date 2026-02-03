"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS, PERSONAL_INFO } from "@/lib/constants";
import GradientText from "./ui/GradientText";

// Simple skill icon component with hover effects
function SkillIcon({
  skill,
  index,
}: {
  skill: { name: string; color: string };
  index: number;
}) {
  return (
    <motion.div
      className="group relative flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      {/* Icon container */}
      <div
        className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
          border: `1px solid ${skill.color}30`,
          boxShadow: `0 0 0 0 ${skill.color}00`,
        }}
      >
        {/* Skill initial or icon */}
        <span
          className="text-lg font-bold transition-all duration-300"
          style={{ color: skill.color }}
        >
          {skill.name.slice(0, 2)}
        </span>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0 0 20px ${skill.color}40, inset 0 0 10px ${skill.color}20`,
          }}
        />
      </div>

      {/* Skill name */}
      <span className="text-xs text-gray-400 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 absolute -bottom-6 whitespace-nowrap">
        {skill.name}
      </span>

      {/* Tooltip */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10"
        style={{
          background: `${skill.color}20`,
          color: skill.color,
          border: `1px solid ${skill.color}40`,
          backdropFilter: "blur(10px)",
        }}
      >
        {skill.name}
      </div>
    </motion.div>
  );
}

// Skill type
type Skill = { name: string; icon: string; color: string };

// Infinite scroll marquee for skills
function SkillsMarquee({
  skills,
  direction = "left",
  speed = 30,
}: {
  skills: readonly Skill[];
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-8"
        animate={{
          x: direction === "left" ? [0, -1920] : [-1920, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate skills for seamless loop */}
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <SkillIcon key={`${skill.name}-${index}`} skill={skill} index={index % skills.length} />
        ))}
      </motion.div>

      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-void-950 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-void-950 to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default function SkillsBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-body max-w-2xl mx-auto">
            I&apos;m currently looking to join a{" "}
            <GradientText animate className="font-semibold">
              cross-functional
            </GradientText>{" "}
            team that values improving people&apos;s lives through accessible design
            and intelligent solutions.
          </p>
        </motion.div>

        {/* Skills Rows */}
        <div className="space-y-4">
          <SkillsMarquee skills={SKILLS.primary} direction="left" speed={40} />
          <SkillsMarquee skills={SKILLS.secondary} direction="right" speed={35} />
        </div>

        {/* Static Skills Grid (for accessibility / no-motion preference) */}
        <noscript>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-6 mt-8">
            {[...SKILLS.primary, ...SKILLS.secondary].map((skill, index) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-2 p-4 rounded-xl"
                style={{
                  background: `${skill.color}10`,
                  border: `1px solid ${skill.color}20`,
                }}
              >
                <span style={{ color: skill.color }}>{skill.name}</span>
              </div>
            ))}
          </div>
        </noscript>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-500/5 to-transparent pointer-events-none" />
    </section>
  );
}
