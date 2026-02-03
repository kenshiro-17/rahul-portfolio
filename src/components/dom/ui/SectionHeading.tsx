"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GradientText from "./GradientText";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  align?: "left" | "center" | "right";
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  highlight,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      className={cn("max-w-2xl mb-16", alignClass[align], className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {subtitle && (
        <motion.p
          className="text-electric-400 text-sm font-medium uppercase tracking-wider mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}

      <h2 className="text-heading text-white">
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <GradientText animate>{highlight}</GradientText>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {children && (
        <motion.div
          className="mt-4 text-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      )}

      {/* Decorative line */}
      <motion.div
        className={cn(
          "h-1 w-20 mt-6 rounded-full bg-gradient-to-r from-electric-500 to-pink-500",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto"
        )}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </motion.div>
  );
}
