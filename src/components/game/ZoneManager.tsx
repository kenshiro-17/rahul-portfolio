"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Float, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore, ZONES, Zone } from "@/lib/gameStore";
import { PERSONAL_INFO, WORK_EXPERIENCE, SKILLS, PROJECTS } from "@/lib/constants";

// Floating info panel that appears in 3D space
function InfoPanel({ 
  position, 
  title, 
  children, 
  color,
  isVisible 
}: { 
  position: [number, number, number];
  title: string;
  children: React.ReactNode;
  color: string;
  isVisible: boolean;
}) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const target = isVisible ? 1 : 0;
    const interval = setInterval(() => {
      setOpacity((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.05) {
          clearInterval(interval);
          return target;
        }
        return prev + diff * 0.1;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (opacity < 0.01) return null;

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={position}>
        <Html
          center
          distanceFactor={15}
          style={{
            opacity,
            transition: "opacity 0.3s",
            pointerEvents: isVisible ? "auto" : "none",
          }}
        >
          <div 
            className="w-[400px] p-6 rounded-2xl backdrop-blur-xl border"
            style={{
              background: `linear-gradient(135deg, ${color}20, rgba(10,10,26,0.95))`,
              borderColor: `${color}50`,
              boxShadow: `0 0 40px ${color}30`,
            }}
          >
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color }}
            >
              {title}
            </h3>
            <div className="text-gray-300 text-sm leading-relaxed">
              {children}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// About/Identity Zone Content
function AboutZone({ isActive }: { isActive: boolean }) {
  return (
    <group position={[15, 0, 0]}>
      {/* Main info panel */}
      <InfoPanel
        position={[0, 4, 0]}
        title="Identity Core"
        color="#ec4899"
        isVisible={isActive}
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold text-lg">{PERSONAL_INFO.name}</h4>
            <p className="text-pink-400">{PERSONAL_INFO.title}</p>
          </div>
          <p>{PERSONAL_INFO.bio}</p>
          <div className="flex items-center gap-2 text-pink-300">
            <span>📍</span>
            <span>{PERSONAL_INFO.location}</span>
          </div>
          <div className="flex items-center gap-2 text-pink-300">
            <span>🎓</span>
            <span>{PERSONAL_INFO.currentRole}</span>
          </div>
        </div>
      </InfoPanel>

      {/* Floating decorative text */}
      <Billboard position={[0, 7, 0]}>
        <Text
          fontSize={0.8}
          color="#ec4899"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {PERSONAL_INFO.taglineHighlight}
        </Text>
      </Billboard>
    </group>
  );
}

// Experience Zone Content
function ExperienceZone({ isActive }: { isActive: boolean }) {
  const [activeExp, setActiveExp] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setActiveExp((prev) => (prev + 1) % WORK_EXPERIENCE.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <group position={[0, 0, -20]}>
      {/* Experience cards floating in a circle */}
      {WORK_EXPERIENCE.map((exp, i) => {
        const angle = (i / WORK_EXPERIENCE.length) * Math.PI * 2;
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <InfoPanel
            key={exp.id}
            position={[x, 3 + (activeExp === i ? 1 : 0), z]}
            title={exp.title}
            color={exp.color}
            isVisible={isActive}
          >
            <div className="space-y-2">
              <p className="font-semibold" style={{ color: exp.color }}>{exp.company}</p>
              <p className="text-xs text-gray-400">{exp.period} • {exp.location}</p>
              <p className="text-sm">{exp.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {exp.highlights.map((h, j) => (
                  <span 
                    key={j}
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{ 
                      background: `${exp.color}20`,
                      color: exp.color,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </InfoPanel>
        );
      })}

      {/* Zone label */}
      <Billboard position={[0, 8, 0]}>
        <Text
          fontSize={1}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          EXPERIENCE VAULT
        </Text>
      </Billboard>
    </group>
  );
}

// Skills Zone Content
function SkillsZone({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const allSkills = [...SKILLS.primary, ...SKILLS.secondary];

  return (
    <group position={[-15, 0, 0]}>
      {/* Orbiting skill nodes */}
      <group ref={groupRef}>
        {allSkills.map((skill, i) => {
          const angle = (i / allSkills.length) * Math.PI * 2;
          const radius = 4 + (i % 3) * 1.5;
          const height = 2 + Math.sin(i * 0.5) * 2;

          return (
            <Float key={skill.name} speed={2} rotationIntensity={0.3}>
              <group
                position={[
                  Math.cos(angle) * radius,
                  height,
                  Math.sin(angle) * radius,
                ]}
              >
                {/* Skill orb */}
                <mesh>
                  <icosahedronGeometry args={[0.3, 1]} />
                  <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={0.6}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>

                {/* Label */}
                {isActive && (
                  <Html center distanceFactor={10}>
                    <div
                      className="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                      style={{
                        background: `${skill.color}30`,
                        color: skill.color,
                        border: `1px solid ${skill.color}50`,
                      }}
                    >
                      {skill.name}
                    </div>
                  </Html>
                )}
              </group>
            </Float>
          );
        })}
      </group>

      {/* Main info panel */}
      <InfoPanel
        position={[0, 6, 0]}
        title="Skills Matrix"
        color="#10b981"
        isVisible={isActive}
      >
        <div className="space-y-3">
          {Object.entries(SKILLS.categories).map(([category, skills]) => (
            <div key={category}>
              <h5 className="text-emerald-400 font-medium text-sm mb-1">{category}</h5>
              <div className="flex flex-wrap gap-1">
                {skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-emerald-500/20 rounded text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </InfoPanel>

      {/* Zone label */}
      <Billboard position={[0, 9, 0]}>
        <Text
          fontSize={1}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          SKILLS MATRIX
        </Text>
      </Billboard>
    </group>
  );
}

// Projects Zone Content
function ProjectsZone({ isActive }: { isActive: boolean }) {
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % PROJECTS.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <group position={[0, 0, 20]}>
      {/* Project display screens */}
      {PROJECTS.map((project, i) => {
        const angle = (i / PROJECTS.length) * Math.PI - Math.PI / 2;
        const radius = 7;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isHighlighted = activeProject === i;

        return (
          <group key={project.id} position={[x, isHighlighted ? 4 : 3, z]}>
            {/* Screen frame */}
            <mesh>
              <boxGeometry args={[4, 2.5, 0.2]} />
              <meshStandardMaterial
                color="#0a0a1a"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>

            {/* Screen content */}
            <Html
              center
              distanceFactor={8}
              transform
              position={[0, 0, 0.15]}
              style={{
                width: "350px",
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.5s",
              }}
            >
              <div
                className={`p-4 rounded-lg transition-all duration-500 ${
                  isHighlighted ? "scale-105" : "scale-100 opacity-70"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${project.color}20, transparent)`,
                  border: `1px solid ${project.color}${isHighlighted ? "80" : "30"}`,
                }}
              >
                <h4 className="text-white font-bold text-base mb-1">{project.title}</h4>
                <p className="text-xs mb-2" style={{ color: project.color }}>{project.subtitle}</p>
                <p className="text-gray-400 text-xs mb-2 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded text-[10px]"
                      style={{ background: `${project.color}30`, color: project.color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {project.metrics.map((m, j) => (
                    <span key={j} className="text-[10px] text-gray-500">{m}</span>
                  ))}
                </div>
              </div>
            </Html>

            {/* Glow effect for active */}
            {isHighlighted && (
              <pointLight
                position={[0, 0, 1]}
                color={project.color}
                intensity={2}
                distance={5}
              />
            )}
          </group>
        );
      })}

      {/* Zone label */}
      <Billboard position={[0, 8, 0]}>
        <Text
          fontSize={1}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          PROJECT NEXUS
        </Text>
      </Billboard>
    </group>
  );
}

// Contact Zone Content
function ContactZone({ isActive }: { isActive: boolean }) {
  return (
    <group position={[0, 10, 0]}>
      {/* This zone is above, reached by looking up or jumping */}
      <InfoPanel
        position={[0, 2, 0]}
        title="Communication Hub"
        color="#ef4444"
        isVisible={isActive}
      >
        <div className="space-y-4">
          <p>Ready to connect? Let&apos;s build something amazing together.</p>
          
          <div className="space-y-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
            >
              <span>📧</span>
              <span>{PERSONAL_INFO.email}</span>
            </a>
            
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
            >
              <span>💼</span>
              <span>LinkedIn Profile</span>
            </a>
            
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 transition-colors"
            >
              <span>🐙</span>
              <span>GitHub</span>
            </a>
          </div>

          <p className="text-xs text-gray-500">
            📍 {PERSONAL_INFO.location}
          </p>
        </div>
      </InfoPanel>

      {/* Floating beacon */}
      <Float speed={1} rotationIntensity={0.5}>
        <mesh position={[0, -2, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ZoneManager() {
  const { currentZone, player } = useGameStore();

  // Check if player is near contact zone (looking up)
  const isNearContact = player.position[1] > 5;

  return (
    <>
      <AboutZone isActive={currentZone === "about"} />
      <ExperienceZone isActive={currentZone === "experience"} />
      <SkillsZone isActive={currentZone === "skills"} />
      <ProjectsZone isActive={currentZone === "projects"} />
      <ContactZone isActive={currentZone === "contact" || isNearContact} />
    </>
  );
}
