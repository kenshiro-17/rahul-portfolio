"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { PERSONAL_INFO, PROJECTS, WORK_EXPERIENCE } from "@/lib/constants";

const WebGLArtifact = dynamic(
  () => import("@/components/framer/WebGLArtifact").then((mod) => ({ default: mod.WebGLArtifact })),
  { ssr: false },
);

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
  "rounded-[24px] border border-black/10 bg-white shadow-[0_8px_22px_rgba(17,24,39,0.06)]";

export function FramerInspiredPortfolio() {
  const heroPortraitSrc = "/images/rahul-hero.jpg";
  const workItems = PROJECTS.slice(0, 6);
  const artifactPalettes = [
    { colorA: "#5b7cff", colorB: "#67d4ff" },
    { colorA: "#7a5cff", colorB: "#c17dff" },
    { colorA: "#00a489", colorB: "#76e1b6" },
    { colorA: "#ff6a5e", colorB: "#ffb17a" },
    { colorA: "#4c7e62", colorB: "#c9d76f" },
    { colorA: "#2667ff", colorB: "#7dd3fc" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#161616] selection:bg-[#d9ddf3]">
      <header className="border-b border-black/10 bg-[#f5f6f8]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <a href="#top" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroPortraitSrc}
              alt={`${PERSONAL_INFO.fullName} avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">Rahul Raj</p>
              <p className="text-xs text-black/60">AI-Focused Software Engineer</p>
            </div>
          </a>

          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-black/65 md:inline">Available for work</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/20 px-3 py-1.5"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/20 px-3 py-1.5"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:px-6">
        <section className="grid gap-6 md:grid-cols-[1fr_1.25fr]">
          <div className={`${cardBase} overflow-hidden`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroPortraitSrc}
              alt={`${PERSONAL_INFO.fullName} portrait`}
              className="h-[360px] w-full object-cover md:h-[460px]"
            />
          </div>

          <div className="space-y-4">
            <div className={`${cardBase} p-6 md:p-8`}>
              <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                “I build AI systems that are useful, reliable, and ready for
                production.”
              </h1>
              <div className="mt-5 h-24 overflow-hidden rounded-2xl border border-black/10">
                <WebGLArtifact seed={999} colorA="#2f5ef7" colorB="#8de0ff" />
              </div>
            </div>
            <div className={`${cardBase} p-6 md:p-8`}>
              <p className="text-sm leading-relaxed text-black/75 md:text-base">
                I&apos;m {PERSONAL_INFO.fullName}, based in {PERSONAL_INFO.location}.
                I focus on LLM applications, retrieval pipelines, backend APIs,
                and automation workflows that move from prototype to production.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <a href="#work" className="underline decoration-black/30 underline-offset-4">
                  works
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="underline decoration-black/30 underline-offset-4"
                >
                  reach out
                </a>
              </div>
              <p className="mt-4 text-sm text-black/65">{PERSONAL_INFO.email}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-wrap gap-3">
          {services.map((service) => (
            <div key={service} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm">
              {service}
            </div>
          ))}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Email me
          </a>
        </section>

        <section id="work" className="mt-14">
          <h2 className="mb-5 text-3xl font-semibold">Works</h2>
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
                <div className="overflow-hidden border-b border-black/10 bg-[#efe8db]">
                  <div className="relative h-[220px]">
                    <WebGLArtifact
                      seed={project.id}
                      colorA={artifactPalettes[index % artifactPalettes.length].colorA}
                      colorB={artifactPalettes[index % artifactPalettes.length].colorB}
                    />
                    <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/35 bg-black/45 px-3 py-1 text-xs text-white backdrop-blur">
                      {project.subtitle}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-1 text-sm text-black/62">{project.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-black/75">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-3 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className={`${cardBase} p-6`}>
              <p className="text-4xl font-semibold">{item.value}</p>
              <p className="mt-2 text-sm text-black/62">{item.label}</p>
            </div>
          ))}
        </section>

        <section id="experience" className="mt-14">
          <h2 className="mb-5 text-3xl font-semibold">Experiences</h2>
          <div className="space-y-3">
            {WORK_EXPERIENCE.map((item) => (
              <div key={item.id} className={`${cardBase} p-5`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{item.company}</p>
                    <p className="text-sm text-black/65">{item.title}</p>
                  </div>
                  <p className="text-sm text-black/65">{item.period}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-14">
          <a href={`mailto:${PERSONAL_INFO.email}`} className="block">
            <div className="rounded-[28px] bg-black px-6 py-14 text-white md:px-10 md:py-16">
              <p className="text-sm uppercase tracking-[0.18em] text-white/70">Get in touch</p>
              <h2 className="mt-2 text-4xl font-semibold leading-tight md:text-6xl">
                start your next ai project
              </h2>
              <p className="mt-6 text-lg text-white/85">{PERSONAL_INFO.email}</p>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}
