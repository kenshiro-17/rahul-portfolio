"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCE } from "@/lib/constants";

const services = [
  "LLM Application Engineering",
  "RAG & Retrieval Systems",
  "Backend API Architecture",
  "AI Evaluation & QA",
  "Data Pipeline Engineering",
];

const stats = [
  { value: "50+", label: "Projects and systems shipped" },
  { value: "2M+", label: "Records processed daily in production" },
  { value: "99.9%", label: "Uptime achieved on deployed services" },
];

const cardBase =
  "rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_10px_28px_rgba(15,23,42,0.08)]";

const chipBase =
  "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700";

function ProjectCover({ index, subtitle }: { index: number; subtitle: string }) {
  const sources = [
    "/images/project-covers/cover-1.svg",
    "/images/project-covers/cover-2.svg",
    "/images/project-covers/cover-3.svg",
    "/images/project-covers/cover-4.svg",
    "/images/project-covers/cover-5.svg",
    "/images/project-covers/cover-6.svg",
  ] as const;

  return (
    <div className="relative h-[230px] overflow-hidden bg-slate-100 md:h-[250px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={sources[index % sources.length]}
        alt={`${subtitle} cover image`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/40 bg-slate-900/60 px-3 py-1.5 text-xs text-white backdrop-blur">
        {subtitle}
      </div>
    </div>
  );
}

export function FramerInspiredPortfolio() {
  const heroPortraitSrc = "/images/rahul-hero.jpg";
  const workItems = PROJECTS.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#EEF2F7] text-slate-900 selection:bg-sky-100">
      <div className="pointer-events-none fixed inset-0 opacity-55">
        <div className="absolute inset-0 [background-image:radial-gradient(#0f172a15_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#EEF2F7]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="#top" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroPortraitSrc}
              alt={`${PERSONAL_INFO.fullName} avatar`}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
            />
            <div>
              <p className="text-sm font-semibold text-slate-900">Rahul Raj</p>
              <p className="text-xs text-slate-600">AI-Focused Software Engineer</p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            <a href="#work" className={chipBase}>Works</a>
            <a href="#experience" className={chipBase}>Experience</a>
            <a href="#contact" className={chipBase}>Contact</a>
          </nav>

          <div className="flex items-center gap-2 text-sm">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className={chipBase}
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className={chipBase}
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-8 md:px-6 md:pt-10">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className={`${cardBase} p-6 md:p-8 lg:p-10`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Available for work
              </span>
              <span className="text-xs font-medium text-slate-500">Based in {PERSONAL_INFO.location}</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Building production-grade AI products that teams trust.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              I&apos;m {PERSONAL_INFO.fullName}. I design and build LLM-powered applications,
              retrieval systems, and backend APIs with a strong focus on reliability,
              maintainability, and measurable product outcomes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                View Work
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400"
              >
                Start a Project
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className={`${cardBase} overflow-hidden p-3`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroPortraitSrc}
                alt={`${PERSONAL_INFO.fullName} portrait`}
                className="h-[340px] w-full rounded-2xl object-cover md:h-[420px]"
              />
            </div>

            <div className={`${cardBase} p-5`}>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Core Focus</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {services.slice(0, 4).map((service) => (
                  <span key={service} className={chipBase}>
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className={`${cardBase} flex flex-wrap items-center gap-2 p-4`}>
            {services.map((service) => (
              <span key={service} className={chipBase}>
                {service}
              </span>
            ))}
          </div>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {PERSONAL_INFO.email}
          </a>
        </section>

        <section id="work" className="mt-14">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Selected Work</h2>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4"
            >
              View all on GitHub
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workItems.map((project, index) => (
              <motion.article
                key={project.id}
                className={`${cardBase} overflow-hidden`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="border-b border-slate-200 bg-slate-100">
                  <ProjectCover index={index} subtitle={project.subtitle} />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{project.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className={chipBase}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-14">
          <h2 className="mb-5 text-3xl font-semibold tracking-tight md:text-4xl">Experience</h2>
          <div className="space-y-3">
            {WORK_EXPERIENCE.map((item) => (
              <div key={item.id} className={`${cardBase} p-5 md:p-6`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{item.company}</p>
                    <p className="text-sm text-slate-600">{item.title}</p>
                  </div>
                  <p className="rounded-full border border-slate-200/80 bg-slate-100/80 px-3 py-1 text-xs font-medium text-slate-600">
                    {item.period}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-14">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="block">
            <div className="relative overflow-hidden rounded-[30px] bg-slate-900 px-6 py-14 text-white md:px-10 md:py-16">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Get in touch</p>
              <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Let&apos;s build your next AI product.
              </h2>
              <p className="mt-6 text-lg text-slate-200">{PERSONAL_INFO.email}</p>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}
