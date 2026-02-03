"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

interface BentoPortfolioProps {
    children: ReactNode;
}

export function BentoPortfolio({ children }: BentoPortfolioProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis smooth scroll
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
        });

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#d4e8f2] via-[#e8f0f5] to-[#f0ebe3] text-[#2c3e50] overflow-x-hidden">
            {/* Background ambient effects - Ghibli style soft pastels */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Soft pastel gradient orbs - more visible */}
                <div
                    className="absolute top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full opacity-50"
                    style={{
                        background: "radial-gradient(circle, rgba(168, 215, 163, 0.5) 0%, transparent 70%)",
                        filter: "blur(100px)",
                    }}
                />
                <div
                    className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-40"
                    style={{
                        background: "radial-gradient(circle, rgba(157, 196, 220, 0.5) 0%, transparent 70%)",
                        filter: "blur(100px)",
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-30"
                    style={{
                        background: "radial-gradient(circle, rgba(240, 200, 160, 0.4) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    className="absolute top-[10%] right-1/3 w-[400px] h-[400px] rounded-full opacity-35"
                    style={{
                        background: "radial-gradient(circle, rgba(220, 180, 200, 0.4) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    }}
                />
            </div>

            {/* Main content */}
            <main id="main-content" className="relative z-10">
                {children}
            </main>
        </div>
    );
}
