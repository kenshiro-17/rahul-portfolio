"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store";

// Particle component that safely handles window
function Particle({ index }: { index: number }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Set random position after mount (when window is available)
    setPosition({
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
    });
  }, []);

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-electric-500/30"
      initial={{
        x: position.x,
        y: position.y,
        scale: Math.random() * 0.5 + 0.5,
        opacity: 0,
      }}
      animate={{
        y: position.y - 50,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 2 + 1,
        repeat: Infinity,
        delay: index * 0.1,
      }}
    />
  );
}

export default function LoadingScreen() {
  const { isLoading, setLoading } = useUIStore();
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Ensure loading completes after 3 seconds max
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setLoading, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-4xl">R</span>
              </div>
              
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-electric-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="text-gray-400 text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading experience...
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-1 rounded-full bg-void-800 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-4 text-electric-400 font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.p>

          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <Particle key={i} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
