"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScrollStore, useUIStore } from "@/lib/store";

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const setScroll = useScrollStore((state) => state.setScroll);
  const isReducedMotion = useUIStore((state) => state.isReducedMotion);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || isReducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Scroll handler
    lenis.on("scroll", ({ scroll, progress }: { scroll: number; progress: number }) => {
      setScroll(scroll, progress);
    });

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScroll, isReducedMotion]);

  return lenisRef;
}

export default useSmoothScroll;
