"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, type Variants } from "motion/react";
import { PortofolioItem } from "@/app/data/portofolio";
import ImageWithFallback from "@/app/components/ImageWithFallback";
import "@/app/animations.css";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailClientProps {
  project: PortofolioItem;
}

// Motion variant helpers
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
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};


export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // --- Main image parallax ---
    if (mainImageRef.current) {
      gsap.to(mainImageRef.current.querySelector("img, .parallax-inner"), {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: mainImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // --- Section reveals via ScrollTrigger ---
    const sections = [
      overviewRef.current,
      techRef.current,
      featuresRef.current,
      ctaRef.current,
    ].filter(Boolean);

    sections.forEach((section) => {
      if (!section) return;
      const children = Array.from(section.children);
      gsap.from(children, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });
    });
  }, { scope: containerRef });

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
            href="/portofolio/produk"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
            <span>← Kembali</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="mb-8">

            {/* Title */}
            <motion.h1
              className="text-4xl lg:text-6xl font-bold mb-6"
              variants={staggerItem}
            >
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                {project.name}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl text-zinc-400 leading-relaxed"
              variants={staggerItem}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Project Info Grid — Peran Saya */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-12"
            variants={staggerContainer}
          >
            {[
              { label: "Peran Saya", value: project.role },
            ].map((info) => (
              <motion.div
                key={info.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                variants={staggerItem}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-sm text-zinc-500 mb-2">{info.label}</h3>
                <p className={`font-semibold ${info.value ? "text-white" : "text-zinc-600 italic"}`}>
                  {info.value || "—"}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
              src={project.image}
              alt={project.name}
              fill
              unoptimized
              className="object-cover scale-105" // sedikit scale untuk ruang parallax
            />
          </motion.div>
        </div>

        {/* Project Details */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="space-y-16">

            {/* Overview Section */}
            <div ref={overviewRef}>
              <h2 className="text-3xl font-bold text-white mb-6">Tentang Project</h2>
              <div className="space-y-4">
                <p className="text-lg text-zinc-400 leading-relaxed">{project.description}</p>
                {project.overview && (
                  <p className="text-lg text-zinc-400 leading-relaxed">{project.overview}</p>
                )}
              </div>
            </div>

            {/* Technologies Section */}
            <div ref={techRef}>
              <h2 className="text-3xl font-bold text-white mb-6">Teknologi yang Dipakai</h2>
              {project.tools.length > 0 ? (
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={staggerContainer}
                >
                  {project.tools.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 cursor-default"
                      variants={staggerItem}
                      whileHover={{ scale: 1.07, borderColor: "rgba(239,68,68,0.4)", color: "#fff" }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <p className="text-zinc-500 text-sm italic">Tools belum ditambahkan.</p>
              )}
            </div>

            {/* Key Features Section */}
            {project.features.length > 0 && (
              <div ref={featuresRef}>
                <h2 className="text-3xl font-bold text-white mb-6">Fitur Utama</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                      whileHover={{ y: -5, borderColor: "rgba(239,68,68,0.3)" }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-sm">
                        {i + 1}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-zinc-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
