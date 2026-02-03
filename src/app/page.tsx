"use client";

import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues with Three.js
const BentoPortfolio = dynamic(
  () => import("@/components/bento/BentoPortfolio").then(mod => ({ default: mod.BentoPortfolio })),
  { ssr: false }
);

const Navbar = dynamic(
  () => import("@/components/bento/Navbar").then(mod => ({ default: mod.Navbar })),
  { ssr: false }
);

const HeroSection = dynamic(
  () => import("@/components/bento/HeroSection").then(mod => ({ default: mod.HeroSection })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-b from-[#d4e8f2] via-[#e8f0f5] to-[#f0ebe3] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#7bc47f]/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-[#7bc47f] rounded-full animate-spin" />
          </div>
          <p className="text-[#4a5568]">Loading experience...</p>
        </div>
      </div>
    ),
  }
);

const TechBanner = dynamic(
  () => import("@/components/bento/TechBanner").then(mod => ({ default: mod.TechBanner })),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import("@/components/bento/AboutSection").then(mod => ({ default: mod.AboutSection })),
  { ssr: false }
);

const ProjectsSection = dynamic(
  () => import("@/components/bento/ProjectsSection").then(mod => ({ default: mod.ProjectsSection })),
  { ssr: false }
);

const ExperienceSection = dynamic(
  () => import("@/components/bento/ExperienceSection").then(mod => ({ default: mod.ExperienceSection })),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import("@/components/bento/ContactSection").then(mod => ({ default: mod.ContactSection })),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <BentoPortfolio>
        <HeroSection />
        <TechBanner />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </BentoPortfolio>

      {/* Accessibility fallback */}
      <noscript>
        <div className="fixed inset-0 bg-gradient-to-b from-[#d4e8f2] via-[#e8f0f5] to-[#f0ebe3] flex items-center justify-center p-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl font-bold text-[#2c3e50] mb-4">
              Rahul Raj - Software Engineer &amp; AI Specialist
            </h1>
            <p className="text-[#4a5568] mb-6">
              This portfolio requires JavaScript. Please enable JavaScript or visit my LinkedIn profile.
            </p>
            <a
              href="https://linkedin.com/in/rahulraj013"
              className="text-[#4a8c5e] hover:text-[#2d5a3d]"
            >
              View LinkedIn Profile
            </a>
          </div>
        </div>
      </noscript>
    </>
  );
}
