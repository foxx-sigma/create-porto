"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { PengalamanItem } from "../../data/pengalaman";
import ImageWithFallback from "../../components/ImageWithFallback";
import "../../animations.css";

gsap.registerPlugin(ScrollTrigger);

interface PengalamanClientProps {
  items: PengalamanItem[];
}

export default function PengalamanClient({ items }: PengalamanClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP: header entrance
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const headerEls = headerRef.current?.children;
      if (headerEls) {
        gsap.from(Array.from(headerEls), {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.2,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Pengalaman
            </span>
          </h1>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="portfolio-card"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-red-500/10 flex flex-col h-full"
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Clickable upper area */}
                  <Link
                    href={`/portofolio/pengalaman/${item.id}`}
                    className="block flex-1 flex flex-col"
                  >
                    {/* Image Container — fixed aspect ratio */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900 shrink-0">
                      <ImageWithFallback
                        src={item.gambar}
                        alt={item.nama}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white">
                            <span className="text-sm font-medium">Lihat Detail</span>
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content — flex-grow agar semua card sejajar */}
                    <div className="p-6 pb-4 flex flex-col flex-1">
                      {/* Chip tahun */}
                      {item.tahun && (
                        <span className="inline-block self-start px-3 py-0.5 mb-3 bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-medium rounded-full">
                          {item.tahun}
                        </span>
                      )}

                      {/* Nama — fixed 2 baris max */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                        {item.nama}
                      </h3>

                      {/* Deskripsi singkat — fixed 3 baris max, teks panjang ter-crop */}
                      <p className="text-zinc-400 text-sm line-clamp-3 flex-1">
                        {item.deskripsiSingkat}
                      </p>
                    </div>
                  </Link>

                  {/* Action Button — selalu di bawah */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={`/portofolio/pengalaman/${item.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 transition-all duration-200 shadow-sm hover:shadow-red-500/30 hover:shadow-md"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Lihat Detail
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
