"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, type Variants } from "motion/react";
import { PortofolioItem } from "@/app/data/portofolio";
import "@/app/animations.css";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailClientProps {
  project: PortofolioItem;
  relatedProjects: PortofolioItem[];
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
  relatedProjects,
}: ProjectDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
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
      relatedRef.current,
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

    // --- Related project cards stagger ---
    if (relatedRef.current) {
      const cards = relatedRef.current.querySelectorAll(".related-card");
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.12,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }
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
            <span>Back to Portfolio</span>
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

            {/* Badges Row: Category + Type */}
            <motion.div className="flex flex-wrap items-center gap-3 mb-6" variants={staggerItem}>
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-400/30">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span className="text-sm text-red-300">
                  {project.category === "mobile" ? "Mobile Application" : "Website Design"}
                </span>
              </div>

              {/* Type Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full border text-sm font-medium ${
                  project.type === "Produk"
                    ? "bg-red-500/25 border-red-400/50 text-red-200"
                    : project.type === "Development"
                    ? "bg-red-500/15 border-red-400/30 text-red-300"
                    : "bg-red-500/8 border-red-400/15 text-red-400/70"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.type === "Produk"
                      ? "bg-red-300"
                      : project.type === "Development"
                      ? "bg-red-400"
                      : "bg-red-500/50"
                  }`}
                />
                {project.type}
              </div>
            </motion.div>

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

          {/* Project Info Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
          >
            {[
              { label: "Category", value: project.category === "mobile" ? "Mobile App" : "Website" },
              { label: "Year", value: "2024" },
              { label: "Status", value: project.status, showDot: true },
            ].map((info) => (
              <motion.div
                key={info.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                variants={staggerItem}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-sm text-zinc-500 mb-2">{info.label}</h3>
                <div className="flex items-center gap-2">
                  {info.showDot && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                  <p className="text-white font-semibold">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Image — dengan parallax via GSAP */}
        <div className="max-w-6xl mx-auto mb-16" ref={mainImageRef}>
          <motion.div
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          >
            <Image
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
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <div className="space-y-4">
                <p className="text-lg text-zinc-400 leading-relaxed">{project.description}</p>
                {project.overview && (
                  <p className="text-lg text-zinc-400 leading-relaxed">{project.overview}</p>
                )}
              </div>
            </div>

            {/* Technologies Section */}
            <div ref={techRef}>
              <h2 className="text-3xl font-bold text-white mb-6">Technologies Used</h2>
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
            <div ref={featuresRef}>
              <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                    title: "Fast Performance",
                    desc: "Optimized for speed and efficiency",
                  },
                  {
                    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
                    title: "Responsive Design",
                    desc: "Works seamlessly on all devices",
                  },
                  {
                    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                    title: "Modern UI",
                    desc: "Clean and intuitive interface",
                  },
                  {
                    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                    title: "Secure",
                    desc: "Built with security best practices",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                    whileHover={{ y: -5, borderColor: "rgba(239,68,68,0.3)" }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-zinc-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div ref={relatedRef} className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((related) => (
                <Link
                  href={`/portofolio/produk/${related.id}`}
                  key={related.id}
                  className="group related-card"
                >
                  <motion.div
                    className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300"
                    whileHover={{ y: -6, scale: 1.01, boxShadow: "0 20px 40px rgba(239,68,68,0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-zinc-400 text-sm line-clamp-2">{related.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center max-w-4xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-700/10 border border-white/10 p-12 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-red-500/30 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-red-600/30 rounded-full blur-3xl animate-blob-delayed"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Interested in Working Together?
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Let&apos;s discuss your next project and bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/6281232896909"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(239,68,68,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Contact Me
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="/portofolio/produk"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-300"
                  >
                    View All Projects
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
