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

const cardBase = "rounded-[26px] border border-black/10 bg-white shadow-[0_14px_35px_rgba(0,0,0,0.07)]";

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
  const heroPortraitSrc = "/images/rahul-hero.jpg";
  const featuredProjects = PROJECTS.slice(0, 5);
  const sideProjects = PROJECTS.slice(5, 8);
  const topSkills = [...SKILLS.primary, ...SKILLS.secondary].slice(0, 10);
  const stats = [
    { label: "Records Processed Daily", value: "2M+" },
    { label: "Concurrent Users Supported", value: "100+" },
    { label: "Production Uptime", value: "99.9%" },
    { label: "ML Classification Accuracy", value: "87%" },
  ];
  const services = [
    "LLM Application Engineering",
    "RAG & Retrieval Pipelines",
    "Backend API Architecture",
    "AI Evaluation & QA Automation",
    "Data Pipeline Engineering",
  ];

  return (
    <div className="min-h-screen bg-[#ece6db] text-[#141414] selection:bg-[#d7cfbf]">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute inset-0 [background-image:radial-gradient(#8f8f8f1f_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-black/10 bg-[#f7f2e8]/95 px-4 py-3 backdrop-blur">
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
            className="rounded-full bg-[#1a1a1a] px-4 py-2 text-xs font-semibold text-white"
          >
            Let&apos;s talk
          </a>
        </nav>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-10">
        <section className="relative overflow-hidden rounded-[34px] border border-black/10 bg-[#f8f4ec] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:p-10">
          <div className="pointer-events-none absolute -left-14 top-8 h-40 w-40 rounded-full bg-[#f4d0b7]/55 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-6 h-40 w-40 rounded-full bg-[#bfcde7]/50 blur-3xl" />
          <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-center">
            <div>
              <p className="mb-4 inline-block rounded-full border border-black/10 bg-white px-3 py-1 text-xs tracking-wide">
                Software Engineer + AI Specialist
              </p>
              <h1 className="max-w-xl text-4xl font-semibold leading-[1.02] md:text-[72px]">
                &quot;I build AI systems that solve real business problems&quot;
              </h1>
              <p className="mt-5 max-w-lg text-sm text-black/70 md:text-[17px]">
                I&apos;m {PERSONAL_INFO.fullName}, currently based in{" "}
                {PERSONAL_INFO.location}. I design and ship LLM systems, RAG
                products, and backend-heavy applications from architecture to
                deployment.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  View Projects
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="relative min-h-[360px]">
              <FloatingObject
                delay={0.15}
                className={`absolute left-0 top-0 w-[82%] p-5 ${cardBase}`}
              >
                <p className="text-xs uppercase tracking-wide text-black/50">Current Focus</p>
                <p className="mt-2 text-base font-medium">
                  LLM apps, retrieval systems, and secure AI orchestration.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["RAG", "Embeddings", "FastAPI", "Playwright"].map((tag) => (
                    <span key={tag} className="rounded-full border border-black/10 bg-[#f8f4ec] px-2 py-1 text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </FloatingObject>

              <FloatingObject
                delay={0.25}
                className={`absolute right-0 top-24 w-[70%] p-5 ${cardBase}`}
              >
                <p className="mb-2 text-xs uppercase tracking-wide text-black/50">Portrait</p>
                <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-black/10 bg-[#f4ede2] p-2 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroPortraitSrc}
                    alt={`${PERSONAL_INFO.fullName} portrait`}
                    className="h-full w-full rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
              </FloatingObject>

              <FloatingObject
                delay={0.35}
                className={`absolute bottom-0 left-8 w-[74%] p-5 ${cardBase}`}
              >
                <p className="text-xs uppercase tracking-wide text-black/50">Core Identity</p>
                <p className="mt-2 text-sm font-medium">{PERSONAL_INFO.title}</p>
                <p className="mt-2 text-xs text-black/60">{PERSONAL_INFO.currentRole}</p>
              </FloatingObject>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className={`${cardBase} p-5`}>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-black/45">Services</p>
            <div className="grid gap-2 md:grid-cols-5">
              {services.map((service) => (
                <div
                  key={service}
                  className="rounded-2xl border border-black/10 bg-[#f8f4ec] px-3 py-3 text-xs font-medium leading-relaxed"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 md:grid-cols-4">
          {stats.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${cardBase} p-4`}
            >
              <p className="text-2xl font-semibold md:text-3xl">{item.value}</p>
              <p className="mt-1 text-xs text-black/55">{item.label}</p>
            </motion.div>
          ))}
        </section>

        <section id="about" className="mt-12 grid gap-4 md:grid-cols-12">
          <div className={`${cardBase} p-5`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              Current Role
            </p>
            <p className="mt-3 text-sm text-black/80">{PERSONAL_INFO.currentRole}</p>
            <p className="mt-2 text-sm text-black/65">{PERSONAL_INFO.university}</p>
          </div>
          <div className={`${cardBase} p-6 md:col-span-7`}>
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
          <div className={`${cardBase} p-5 md:col-span-4`}>
            <p className="text-xs uppercase tracking-wide text-black/45">Core Competencies</p>
            <ul className="mt-3 space-y-2">
              {CORE_COMPETENCIES.map((item) => (
                <li key={item} className="text-sm text-black/75">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${cardBase} p-5 md:col-span-3`}>
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
          <div className={`${cardBase} p-5 md:col-span-5`}>
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
          <div className={`${cardBase} p-5 md:col-span-4`}>
            <p className="text-xs uppercase tracking-wide text-black/45">Featured Stack</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {topSkills.slice(0, 8).map((skill) => (
                <div key={skill.name} className="rounded-xl border border-black/10 bg-[#f8f4ec] px-3 py-2 text-xs">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mt-16">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold md:text-3xl">Works</h2>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-medium"
            >
              GitHub
            </a>
          </div>
          <div className="space-y-4">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className={`${cardBase} p-6 md:p-8`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="md:max-w-[72%]">
                    <p className="text-xs uppercase tracking-[0.18em] text-black/45">
                      {String(index + 1).padStart(2, "0")} · {project.subtitle}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold leading-tight md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-black/72 md:text-base">
                      {project.description}
                    </p>
                  </div>
                  <div className="md:min-w-[170px] md:text-right">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Case Study</p>
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-block rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium"
                      >
                        Open Repository
                      </a>
                    ) : (
                      <p className="mt-2 text-xs text-black/45">Private project</p>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-black/10 bg-[#f8f4ee] px-2.5 py-1 text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 border-t border-black/8 pt-4">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <span key={metric} className="text-xs text-black/55">
                      • {metric}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {sideProjects.map((project) => (
              <article key={project.id} className={`${cardBase} p-5`}>
                <p className="text-xs text-black/50">{project.subtitle}</p>
                <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm text-black/70">{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-14">
          <h2 className="mb-5 text-2xl font-semibold md:text-3xl">Experiences</h2>
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
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.highlights.map((h) => (
                    <span key={h} className="rounded-full border border-black/10 bg-[#f8f4ee] px-2.5 py-1 text-[11px]">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-14 grid gap-4 md:grid-cols-3">
          <div className={`${cardBase} p-6 md:col-span-2 md:p-10`}>
            <p className="text-xs uppercase tracking-wide text-black/45">
              Contact
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
              Have an AI or backend-heavy product to build? I can help from idea
              to shipping.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-medium text-white"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>
          <div className={`${cardBase} p-5`}>
            <p className="text-xs uppercase tracking-wide text-black/45">Next Step</p>
            <p className="mt-2 text-sm text-black/75">
              Send your project context, timeline, and success criteria. I can
              respond with a build plan and architecture direction.
            </p>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="mt-4 inline-block text-sm font-medium underline decoration-black/35 underline-offset-4">
              Start a conversation
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
