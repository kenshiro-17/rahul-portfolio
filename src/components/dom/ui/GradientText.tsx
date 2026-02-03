"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  from?: string;
  via?: string;
  to?: string;
}

export default function GradientText({
  children,
  className,
  animate = false,
  from = "from-electric-400",
  via = "via-electric-500",
  to = "to-pink-500",
}: GradientTextProps) {
  const gradientClass = `bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent`;

  if (animate) {
    return (
      <motion.span
        className={cn(gradientClass, "bg-[length:200%_200%]", className)}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.span>
    );
  }

  return <span className={cn(gradientClass, className)}>{children}</span>;
}
