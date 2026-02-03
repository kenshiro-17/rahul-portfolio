"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/gameStore";
import { PERSONAL_INFO } from "@/lib/constants";

export default function StartScreen() {
  const { isStarted, isLoading, startGame, setLoading } = useGameStore();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Simulate loading
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setReady(true);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (ready) {
      setLoading(false);
      startGame();
    }
  };

  if (isStarted) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{
          background: "radial-gradient(ellipse at center, #1e1b4b 0%, #020617 70%)",
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-500/30"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
              }}
              animate={{
                y: [null, -50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Logo/Avatar */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          >
            <div className="relative w-32 h-32 mx-auto">
              {/* Outer rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-pink-500/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-5xl font-bold text-white">R</span>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {PERSONAL_INFO.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="text-purple-400 text-lg mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {PERSONAL_INFO.tagline} <span className="text-pink-400">{PERSONAL_INFO.taglineHighlight}</span>
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="w-80 mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                style={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-gray-500 text-sm mt-2">
              {ready ? "Ready to explore" : `Loading experience... ${Math.round(loadingProgress)}%`}
            </p>
          </motion.div>

          {/* Start button */}
          <motion.button
            onClick={handleStart}
            disabled={!ready}
            className={`
              relative px-12 py-4 rounded-full font-bold text-lg
              transition-all duration-300
              ${ready 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 cursor-pointer" 
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={ready ? { scale: 1.05 } : {}}
            whileTap={ready ? { scale: 0.95 } : {}}
          >
            {ready ? (
              <>
                ENTER UNIVERSE
                <motion.span
                  className="absolute inset-0 rounded-full bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </>
            ) : (
              "INITIALIZING..."
            )}
          </motion.button>

          {/* Instructions */}
          {ready && (
            <motion.p
              className="text-gray-500 text-sm mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Click to lock cursor • Use WASD to move • Mouse to look around
            </motion.p>
          )}
        </motion.div>

        {/* Bottom info */}
        <motion.div
          className="absolute bottom-6 left-0 right-0 text-center text-gray-600 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p>Best experienced on desktop with Chrome or Firefox</p>
          <p className="mt-1">
            Built with Next.js, Three.js, and React Three Fiber
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
