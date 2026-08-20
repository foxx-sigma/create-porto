"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { PortofolioItem } from "../../data/portofolio";
import "../../animations.css";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioClientProps {
  projects: PortofolioItem[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP: header entrance + card stagger
  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // --- Header entrance ---
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

    // NOTE: Card entrance ditangani oleh Motion whileInView (lihat JSX di bawah)
    // GSAP ScrollTrigger tidak dipakai untuk cards agar tidak konflik dengan Motion
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Daftar Project
            </span>
          </h1>
        </div>


        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                className="portfolio-card"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-red-500/10 flex flex-col"
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Clickable upper area: Image + Content */}
                  <Link href={`/portofolio/produk/${project.id}`} className="block flex-1">

                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white">
                            <span className="text-sm font-medium">Lihat Project</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pb-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
                    {/* Tombol: Lihat Project (primary – filled red) */}
                    <Link
                      href={`/portofolio/produk/${project.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 transition-all duration-200 shadow-sm hover:shadow-red-500/30 hover:shadow-md"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Lihat Project
                    </Link>

                    {/* Tombol: Lihat Repo (secondary – outline, hanya tampil jika repoUrl terisi) */}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-zinc-300 hover:border-red-500/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* GitHub icon (inline SVG — tanpa dependency tambahan) */}
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        Lihat Repo
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>



        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          
        </motion.div>

      </div>
    </div>
  );
}
