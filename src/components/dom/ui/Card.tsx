"use client";

import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "glass" | "solid" | "gradient";
  hover?: boolean;
  glow?: boolean;
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "glass",
      hover = true,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative rounded-2xl overflow-hidden transition-all duration-500";

    const variants = {
      glass: `
        bg-gradient-to-br from-electric-500/10 via-void-900/80 to-electric-500/5
        backdrop-blur-xl
        border border-electric-500/20
      `,
      solid: `
        bg-void-900
        border border-void-700
      `,
      gradient: `
        bg-gradient-to-br from-electric-600/20 via-void-900 to-pink-500/10
        border border-electric-500/30
      `,
    };

    const hoverStyles = hover
      ? `
        hover:border-electric-500/40
        hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]
        hover:translate-y-[-2px]
      `
      : "";

    const glowStyles = glow
      ? `
        shadow-[0_0_20px_rgba(139,92,246,0.2)]
        animate-pulse-glow
      `
      : "";

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          glowStyles,
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        {...props}
      >
        {/* Gradient border overlay */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-electric-500/30 via-transparent to-pink-500/20 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-electric-500/5 to-transparent pointer-events-none" />
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
