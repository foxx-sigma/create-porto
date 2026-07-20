"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { PortofolioItem } from "../data/portofolio";
import "../animations.css";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioClientProps {
  projects: PortofolioItem[];
}

const categories = [
  { id: "all", label: "All Projects" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "website", label: "Websites" },
];

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPortfolio =
    activeCategory === "all"
      ? projects
      : projects.filter((item) => item.category === activeCategory);

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-sm text-zinc-300">My Work</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h1>

          <p className="text-lg text-zinc-400">
            A collection of my recent work in web and mobile design. Each project represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Category Filter — Motion layout animation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? "text-white"
                  : "bg-white/5 backdrop-blur-sm text-zinc-300 border border-white/10 hover:text-white hover:border-white/20"
              }`}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Active background pill dengan layout animation */}
              {activeCategory === category.id && (
                <motion.span
                  layoutId="category-active"
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((project) => (
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
                <Link href={`/portofolio/${project.id}`} className="group block">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-red-500/10"
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >

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
                            <span className="text-sm font-medium">View Project</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/30">
                          {project.category === "mobile" ? "Mobile App" : "Website"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredPortfolio.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-zinc-400">Try selecting a different category</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="inline-block bg-gradient-to-r from-red-500/10 via-red-600/10 to-red-700/10 rounded-3xl p-12 border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Have a project in mind? I&apos;d love to hear about it and help bring your ideas to life.
            </p>
            <motion.a
              href="https://wa.me/6281232896909"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full"
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(239,68,68,0.5)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get In Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}