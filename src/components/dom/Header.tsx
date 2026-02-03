"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { useScrollStore, useUIStore } from "@/lib/store";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMenuOpen, toggleMenu, setMenuOpen } = useUIStore();
  const { scrollY, activeSection } = useScrollStore();

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  // Close menu on navigation
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-void-950/80 backdrop-blur-xl border-b border-electric-500/10"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="container flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#home" className="relative z-10">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block">
                Rahul Raj
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-300",
                    activeSection === item.href.slice(1)
                      ? "text-electric-400"
                      : "text-gray-400 hover:text-white"
                  )}
                  onClick={handleNavClick}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-500 to-pink-500 rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button - Desktop */}
          <Link
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-electric-600 to-electric-500 text-white text-sm font-medium hover:from-electric-500 hover:to-electric-400 transition-all duration-300 shadow-lg shadow-electric-500/25"
          >
            Let&apos;s Talk
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-white rounded-full origin-left"
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 0 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-white rounded-full"
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  x: isMenuOpen ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-white rounded-full origin-left"
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? 0 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-void-950/95 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="absolute inset-0 flex flex-col items-center justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-3xl font-semibold transition-colors duration-300",
                      activeSection === item.href.slice(1)
                        ? "text-electric-400"
                        : "text-white hover:text-electric-400"
                    )}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link
                  href="#contact"
                  className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-electric-600 to-electric-500 text-white text-lg font-medium"
                  onClick={handleNavClick}
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
