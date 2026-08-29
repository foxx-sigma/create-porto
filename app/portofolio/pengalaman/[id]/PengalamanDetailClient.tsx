"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, type Variants } from "motion/react";
import { PengalamanItem } from "@/app/data/pengalaman";
import ImageWithFallback from "@/app/components/ImageWithFallback";
import "@/app/animations.css";

gsap.registerPlugin(ScrollTrigger);

interface PengalamanDetailClientProps {
  item: PengalamanItem;
}

// Motion variant helpers (sama dengan ProjectDetailClient)
const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

export default function PengalamanDetailClient({
  item,
}: PengalamanDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      // --- Main image parallax (hanya jika ada gambar) ---
      if (mainImageRef.current && item.gambar) {
        gsap.to(
          mainImageRef.current.querySelector("img, .parallax-inner"),
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: mainImageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }

      // --- Section reveal ---
      if (overviewRef.current) {
        const children = Array.from(overviewRef.current.children);
        gsap.from(children, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: overviewRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-6">

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="/portofolio/pengalaman"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </motion.svg>
            <span>← Kembali</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="max-w-5xl mx-auto mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="mb-6">
            {/* Chip tahun */}
            {item.tahun && (
              <motion.span
                className="inline-block px-3 py-1 mb-4 bg-red-500/20 border border-red-400/30 text-red-300 text-sm font-medium rounded-full"
                variants={staggerItem}
              >
                {item.tahun}
              </motion.span>
            )}

            {/* Judul */}
            <motion.h1
              className="text-4xl lg:text-6xl font-bold mb-5"
              variants={staggerItem}
            >
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                {item.nama}
              </span>
            </motion.h1>

            {/* Deskripsi singkat di atas gambar */}
            <motion.p
              className="text-xl text-zinc-400 leading-relaxed"
              variants={staggerItem}
            >
              {item.deskripsiSingkat}
            </motion.p>
          </div>
        </motion.div>

        {/* Main Image — dengan parallax via GSAP */}
        <div className="max-w-6xl mx-auto mb-16" ref={mainImageRef}>
          <motion.div
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          >
            <ImageWithFallback
              src={item.gambar}
              alt={item.nama}
              fill
              unoptimized
              className="object-cover scale-105"
            />
          </motion.div>
        </div>

        {/* Detail Konten — HANYA deskripsi lengkap, tanpa Tech Stack & Fitur */}
        <div className="max-w-4xl mx-auto mb-20">
          <div ref={overviewRef} className="space-y-12">

            {/* Tentang Kegiatan */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Tentang Kegiatan
              </h2>
              <div className="space-y-5">
                {/* Render setiap paragraf dalam deskripsiLengkap */}
                {item.deskripsiLengkap.map((paragraf, i) => (
                  <p key={i} className="text-lg text-zinc-400 leading-relaxed">
                    {paragraf}
                  </p>
                ))}
              </div>
            </div>

            {/* Dokumentasi — hanya tampil jika linkDokumentasi diisi */}
            {item.linkDokumentasi && (() => {
              const url = item.linkDokumentasi.url;
              return (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Dokumentasi
                  </h2>
                  <motion.a
                    href={item.linkDokumentasi!.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-red-500/40 hover:bg-white/8 transition-colors duration-300"
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Ikon — YouTube, Instagram, atau generic link */}
                    {item.linkDokumentasi.url.includes("youtube") ||
                      item.linkDokumentasi.url.includes("youtu.be") ? (
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-shadow duration-300">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                    ) : item.linkDokumentasi.url.includes("instagram.com") ? (
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-shadow duration-300">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-zinc-700 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-zinc-600 transition-colors duration-300">
                        <svg
                          className="w-5 h-5 text-zinc-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Label & URL preview */}
                    <div className="flex flex-col text-left">
                      <span className="text-white font-semibold group-hover:text-red-400 transition-colors duration-200">
                        {item.linkDokumentasi!.label}
                      </span>
                      <span className="text-zinc-500 text-sm truncate max-w-xs">
                        {item.linkDokumentasi!.url}
                      </span>
                    </div>

                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-200 ml-auto shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.a>
                </div>
              );
            })()}


          </div>
        </div>

      </div>
    </div>
  );
}
