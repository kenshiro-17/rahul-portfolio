"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { SectionHeading, Button, Card } from "./ui";
import GradientText from "./ui/GradientText";

// Social icon components
const SocialIcons = {
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  mail: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

// Contact info item
function ContactInfo({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-4 rounded-xl bg-void-900/50 border border-electric-500/10 hover:border-electric-500/30 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-electric-500/10 flex items-center justify-center text-electric-400 group-hover:bg-electric-500/20 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-white font-medium group-hover:text-electric-300 transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section relative"
    >
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            subtitle="Get In Touch"
            title="Let's Work Together"
            highlight="Together"
            align="center"
          >
            <p>
              I&apos;m currently looking to join a cross-functional team that values
              improving people&apos;s lives through accessible design. Have a project
              in mind? Let&apos;s connect.
            </p>
          </SectionHeading>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12" variant="gradient">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Message */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white">
                    Let&apos;s create something{" "}
                    <GradientText animate>amazing</GradientText> together
                  </h3>
                  <p className="text-body">
                    Whether you have a project idea, job opportunity, or just want
                    to say hi, my inbox is always open. I&apos;ll get back to you as
                    soon as possible!
                  </p>

                  {/* CTA Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      window.location.href = `mailto:${PERSONAL_INFO.email}`;
                    }}
                    className="w-full sm:w-auto"
                  >
                    Send Me an Email
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </Button>

                  {/* Or copy email */}
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-electric-400 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {copied ? "Copied!" : "Copy email address"}
                  </button>
                </div>

                {/* Right side - Contact Info */}
                <div className="space-y-4">
                  <ContactInfo
                    icon={SocialIcons.mail}
                    label="Email"
                    value={PERSONAL_INFO.email}
                    href={`mailto:${PERSONAL_INFO.email}`}
                  />
                  <ContactInfo
                    icon={SocialIcons.linkedin}
                    label="LinkedIn"
                    value="linkedin.com/in/rahulraj013"
                    href={PERSONAL_INFO.linkedin}
                  />
                  <ContactInfo
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                    label="Location"
                    value={PERSONAL_INFO.location}
                    href="https://maps.google.com/?q=Cottbus,Germany"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-void-900 border border-electric-500/10 flex items-center justify-center text-gray-400 hover:text-electric-400 hover:border-electric-500/30 hover:bg-electric-500/10 transition-all duration-300"
                aria-label={link.name}
              >
                {SocialIcons[link.icon as keyof typeof SocialIcons]}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-500/10 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
