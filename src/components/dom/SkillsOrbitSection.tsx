"use client";

import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import dynamic from "next/dynamic";
import { SectionHeading } from "./ui";
import { SKILLS } from "@/lib/constants";

// Dynamically import the 3D component to avoid SSR issues
const SkillsOrbit = dynamic(
  () => import("@/components/canvas/SkillsOrbit"),
  { ssr: false }
);

// Fallback loading component
function CanvasLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-electric-500/20 border-t-electric-500 rounded-full animate-spin" />
    </div>
  );
}

// Skills categories list
function SkillsCategories() {
  const categories = Object.entries(SKILLS.categories);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {categories.map(([category, skills], index) => (
        <motion.div
          key={category}
          className="p-6 rounded-2xl bg-void-900/50 border border-electric-500/10 hover:border-electric-500/30 transition-all duration-300"
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h4 className="text-electric-400 font-semibold mb-3">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-sm text-gray-300 bg-electric-500/10 border border-electric-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function SkillsOrbitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section relative min-h-screen"
    >
      <div className="container">
        <SectionHeading
          subtitle="Technical Expertise"
          title="Skills & Technologies"
          highlight="Technologies"
          align="center"
        >
          <p>
            Drag to rotate the skills orbit. My expertise spans AI/ML,
            full-stack development, and cloud technologies.
          </p>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Skills Orbit */}
          <motion.div
            className="relative aspect-square max-w-lg mx-auto w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Canvas container */}
            <div className="w-full h-full rounded-3xl overflow-hidden bg-void-900/30 border border-electric-500/10">
              <Suspense fallback={<CanvasLoader />}>
                <Canvas
                  gl={{ antialias: true, alpha: true }}
                  dpr={[1, 2]}
                  style={{ background: "transparent" }}
                >
                  <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={0.5} />
                  <SkillsOrbit isVisible={isInView} />
                </Canvas>
              </Suspense>
            </div>

            {/* Interaction hint */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-void-900/80 border border-electric-500/20 text-sm text-gray-400 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Drag to explore
              </span>
            </motion.div>

            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-electric-500/5 via-transparent to-pink-500/5 rounded-3xl pointer-events-none" />
          </motion.div>

          {/* Skills Categories */}
          <div>
            <SkillsCategories />
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-500/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
