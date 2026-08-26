"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import type { NavItem } from "@/components/ui/spotlight-navbar";

gsap.registerPlugin(ScrollTrigger);

const navItems: NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/portofolio/produk", label: "Portofolio" },
  { href: "/portofolio/sertifikasi", label: "Sertifikat" },
  { href: "/portofolio/pengalaman", label: "Pengalaman" },
  { href: "/about", label: "Tentang Saya" },
];

/** Cocokkan pathname ke index navItems.
 *  - "/" → exact match
 *  - path lain → startsWith
 */
function getActiveIndex(pathname: string): number {
  // Cek dari belakang (more specific dulu) supaya "/portofolio/produk"
  // tidak ikut match "/" atau "/portofolio" yang lebih luas
  for (let i = navItems.length - 1; i >= 0; i--) {
    const { href } = navItems[i];
    if (href === "/") {
      if (pathname === "/") return i;
    } else if (pathname.startsWith(href)) {
      return i;
    }
  }
  return 0; // fallback Beranda
}

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const activeIndex = getActiveIndex(pathname);

  // GSAP: entrance animation + scroll blur
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!headerRef.current) return;

      if (!prefersReduced) {
        gsap.from(headerRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
      }

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
    },
    { scope: headerRef }
  );

  const handleNavClick = (item: NavItem) => {
    router.push(item.href);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="relative flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="group flex items-center gap-2 shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.08, rotate: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Mobile: w-8 h-8 / Desktop: w-10 h-10 */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-shadow duration-300">
                <Image
                  src="/img/profile/fotoku.jpg"
                  alt="Aesar"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </motion.div>
            {/* Mobile: text-base / Desktop: text-xl */}
            <span className="text-base sm:text-xl font-bold text-white hidden sm:block">
              aesr
            </span>
          </Link>

          {/* ── SpotlightNavbar — Desktop & Tablet (≥768px) — posisi tengah absolut ── */}
          {/*
            `pt-10` default SpotlightNavbar dihapus via className override.
            Tablet (768–1023px): compact-nav class mengecilkan padding+font via globals.css
          */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <SpotlightNavbar
              items={navItems}
              activeIndex={activeIndex}
              onItemClick={handleNavClick}
              className="compact-nav-wrapper"
            />
          </div>

          {/* ── Hamburger — Mobile (<768px) ── */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.svg
                  key="close"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* ── Mobile Dropdown Menu ── */}
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
                {navItems.map((item, i) => {
                  const active = activeIndex === i;
                  return (
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
                          active
                            ? "bg-red-500/20 border border-red-500/40 text-red-400"
                            : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-transparent hover:border-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;