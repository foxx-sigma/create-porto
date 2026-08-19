"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/portofolio/produk", label: "Portfolio" },
    { href: "/portofolio/sertifikasi", label: "Sertifikasi" },
    { href: "/about", label: "About Me" },
  ];

  // Active: exact match untuk "/", startsWith untuk path lain
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // GSAP: entrance animation + scroll shrink
  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!headerRef.current) return;

    // --- Entrance: slide-down dari atas ---
    if (!prefersReduced) {
      gsap.from(headerRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });
    }

    // --- Scroll shrink: kurangi padding saat scroll ---
    ScrollTrigger.create({
      start: "top top",
      end: "+=120",
      onUpdate: (self) => {
        if (prefersReduced) return;
        const progress = self.progress;
        gsap.set(headerRef.current, {
          backdropFilter: `blur(${12 + progress * 12}px)`,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id === "header-scroll") t.kill();
      });
    };
  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.08, rotate: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-shadow duration-300">
                <Image src="/img/profile/fotoku.jpg" alt="Aesar" fill unoptimized className="object-cover" />
              </div>

            </motion.div>
            <span className="text-xl font-bold text-white hidden sm:block">
              aesr
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-6 py-2.5 rounded-full font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-black"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {/* Active pill background */}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://wa.me/6281232896909"
              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(239,68,68,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Contact Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.svg
                  key="close"
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu — AnimatePresence untuk smooth open/close */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <ul className="space-y-2">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-white text-black"
                          : "bg-white/5 text-zinc-300 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.06 }}
                >
                  <a
                    href="https://wa.me/6281232896909"
                    className="block px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl text-center"
                  >
                    Contact Me
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;