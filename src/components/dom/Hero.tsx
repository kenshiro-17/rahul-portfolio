"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import GradientText from "./ui/GradientText";
import Button from "./ui/Button";

// Typing effect hook
function useTypingEffect(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayText("");
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
}

export default function Hero() {
  const { displayText, isComplete } = useTypingEffect(
    "I'm a Software Engineer & AI Specialist.",
    50
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <motion.div
        className="container relative z-10 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-500/10 border border-electric-500/20 text-electric-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-electric-500 animate-pulse" />
              Hello! I Am{" "}
              <span className="text-electric-300">{PERSONAL_INFO.name}</span>
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg mb-4"
          >
            {PERSONAL_INFO.subtitle}
          </motion.p>

          {/* Main Tagline */}
          <motion.h1
            variants={itemVariants}
            className="text-display mb-6"
          >
            <span className="text-white">{PERSONAL_INFO.tagline}</span>
            <br />
            <GradientText
              animate
              className="inline-block"
              from="from-electric-400"
              via="via-pink-500"
              to="to-electric-300"
            >
              {PERSONAL_INFO.taglineHighlight}
            </GradientText>
          </motion.h1>

          {/* Typing Effect */}
          <motion.div
            variants={itemVariants}
            className="mb-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-8 bg-electric-500 ml-1 align-middle"
              />
            </h2>
          </motion.div>

          {/* Current Role */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 mb-8 flex items-center justify-center gap-2"
          >
            Currently pursuing{" "}
            <span className="text-electric-400">{PERSONAL_INFO.currentRole}</span>
            at{" "}
            <a
              href="https://www.b-tu.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-electric-300 hover:text-electric-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                  clipRule="evenodd"
                />
              </svg>
              BTU Cottbus
            </a>
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-body max-w-2xl mx-auto mb-10"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View My Work
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-electric-500/50 flex justify-center pt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div className="w-1 h-2 rounded-full bg-electric-500" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
