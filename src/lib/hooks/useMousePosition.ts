"use client";

import { useEffect, useCallback, useRef } from "react";
import { useMouseStore } from "@/lib/store";

export function useMousePosition() {
  const setPosition = useMouseStore((state) => state.setPosition);
  const rafId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastUpdate = useRef(0);

  const updatePosition = useCallback(() => {
    setPosition(mousePos.current.x, mousePos.current.y);
    rafId.current = null;
  }, [setPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle to ~60fps
      const now = Date.now();
      if (now - lastUpdate.current < 16) return;
      lastUpdate.current = now;

      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updatePosition]);

  return useMouseStore();
}

export default useMousePosition;
