"use client";

import { motion } from "framer-motion";
import {
  CORE_COMPETENCIES,
  LANGUAGES,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
  WORK_EXPERIENCE,
  EDUCATION,
} from "@/lib/constants";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const cardBase =
  "rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-sm shadow-[0_14px_35px_rgba(0,0,0,0.08)]";

function FloatingObject({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.55, delay }}
      drag
      dragElastic={0.12}
      dragMomentum={false}
      whileHover={{ y: -3 }}
    >
      {children}
    </motion.div>
  );
}

export function FramerInspiredPortfolio() {
  const featuredProjects = PROJECTS.slice(0, 6);
  const topSkills = [...SKILLS.primary, ...SKILLS.secondary].slice(0, 10);

  return (
    <div className="min-h-screen bg-[#efece5] text-[#1e1e1e] selection:bg-[#d8cdbf]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute inset-0 [background-image:radial-gradient(#9b9b9b22_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-black/10 bg-[#f5f1ea]/90 px-4 py-3 backdrop-blur">
          <a href="#top" className="text-sm font-semibold tracking-wide">
            RAHUL RAJ
          </a>
          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium hover:bg-[#f7f3ed]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="rounded-full bg-[#222] px-4 py-2 text-xs font-semibold text-white"
          >
            Let&apos;s talk
          </a>
        </nav>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-10">
        <section className="relative overflow-hidden rounded-[36px] border border-black/10 bg-[#f6f2eb] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:p-10">
          <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-center">
            <div>
              <p className="mb-3 inline-block rounded-full border border-black/10 bg-white px-3 py-1 text-xs tracking-wide">
                Software Engineer + AI Specialist
              </p>
              <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                Designing thoughtful AI products that people actually enjoy
                using.
              </h1>
              <p className="mt-5 max-w-lg text-sm text-black/70 md:text-base">
                I&apos;m {PERSONAL_INFO.fullName}, currently based in{" "}
                {PERSONAL_INFO.location}. I build full-stack systems, AI
                tooling, and product experiences with a strong focus on
                reliability and visual clarity.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-medium text-white"
                >
                  View Projects
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="relative min-h-[300px]">
              <FloatingObject
                delay={0.15}
                className={`absolute left-2 top-2 w-[72%] p-4 ${cardBase}`}
              >
                <p className="text-xs uppercase tracking-wide text-black/45">
                  Current Focus
                </p>
                <p className="mt-2 text-sm font-medium">
                  LLM apps, retrieval systems, and human-first interface design.
                </p>
              </FloatingObject>

              <FloatingObject
                delay={0.25}
                className={`absolute right-0 top-20 w-[68%] p-4 ${cardBase}`}
              >
                <p className="text-xs uppercase tracking-wide text-black/45">
                  Location
                </p>
                <p className="mt-2 text-sm font-medium">
                  {PERSONAL_INFO.location}
                </p>
              </FloatingObject>

              <FloatingObject
                delay={0.35}
                className={`absolute bottom-2 left-8 w-[74%] p-4 ${cardBase}`}
              >
                <p className="text-xs uppercase tracking-wide text-black/45">
                  Contact
                </p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="mt-2 block text-sm font-medium underline decoration-black/25 underline-offset-4"
                >
                  {PERSONAL_INFO.email}
                </a>
              </FloatingObject>
            </div>
          </div>
        </section>

        <section id="about" className="mt-12 grid gap-4 md:grid-cols-3">
          <div className={`${cardBase} p-5`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              Current Role
            </p>
            <p className="mt-3 text-sm text-black/80">{PERSONAL_INFO.currentRole}</p>
            <p className="mt-2 text-sm text-black/65">{PERSONAL_INFO.university}</p>
          </div>
          <div className={`${cardBase} p-5 md:col-span-2`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              About
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/80 md:text-base">
              {PERSONAL_INFO.bio}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-full border border-black/10 bg-[#f8f4ee] px-3 py-1 text-xs"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-3">
          <div className={`${cardBase} p-5`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              Education
            </p>
            <div className="mt-3 space-y-4">
              {EDUCATION.map((item) => (
                <div key={item.degree}>
                  <p className="text-sm font-medium">{item.degree}</p>
                  <p className="mt-1 text-xs text-black/65">
                    {item.institution}
                  </p>
                  <p className="text-xs text-black/50">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${cardBase} p-5`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              Languages
            </p>
            <div className="mt-3 space-y-3">
              {LANGUAGES.map((item) => (
                <div key={item.name}>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-black/60">{item.level}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${cardBase} p-5`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              Core Competencies
            </p>
            <ul className="mt-3 space-y-2">
              {CORE_COMPETENCIES.map((item) => (
                <li key={item} className="text-sm text-black/75">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projects" className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold md:text-3xl">Projects</h2>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium"
            >
              GitHub
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className={`${cardBase} p-5`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <p className="text-xs text-black/50">{project.subtitle}</p>
                <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm text-black/70">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/10 bg-[#f8f4ee] px-2.5 py-1 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-xs font-medium underline decoration-black/30 underline-offset-4"
                  >
                    Open repository
                  </a>
                ) : (
                  <p className="mt-4 text-xs text-black/45">Private project</p>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-14">
          <h2 className="mb-5 text-2xl font-semibold md:text-3xl">Experience</h2>
          <div className="space-y-4">
            {WORK_EXPERIENCE.map((item, index) => (
              <motion.article
                key={item.id}
                className={`${cardBase} p-5`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-sm text-black/70">
                      {item.company} · {item.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-black/10 bg-[#f8f4ee] px-3 py-1 text-xs">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-black/75">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-14">
          <div className={`${cardBase} p-7 md:p-10`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              Contact
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
              Interested in collaborating on AI, product engineering, or
              creative web experiences?
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-medium text-white"
              >
                {PERSONAL_INFO.email}
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium"
              >
                LinkedIn
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
