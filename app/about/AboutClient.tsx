"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import "../animations.css";

gsap.registerPlugin(ScrollTrigger);

// ── Data Placeholders ─────────────────────────────────────────────────────────
// TODO: isi nama, judul, dan bio singkat
const heroData = {
  name: "Aesar", // TODO: ganti dengan nama lengkap jika perlu
  title: "Front-End Developer", // TODO: sesuaikan judul/role
  bio: "TODO: Tulis 1–2 kalimat bio singkat di sini. Contoh: seorang developer yang bersemangat membangun antarmuka web yang elegan dan responsif.",
};

// TODO: tulis bio lengkap sebagai string paragraf-paragraf
const fullBio: string[] = [
  // TODO: isi paragraf pertama bio lengkap
  "TODO: Paragraf pertama — ceritakan latar belakang, motivasi, atau perjalanan kamu masuk ke dunia teknologi.",
  // TODO: isi paragraf kedua (bisa dihapus jika hanya 1 paragraf)
  "TODO: Paragraf kedua — tambahkan hal lain yang ingin disampaikan, misalnya minat, nilai, atau visi kamu sebagai developer.",
];

// TODO: isi array ini dengan nama-nama teknologi/skill kamu
const skills: string[] = [
  // Contoh format: "React", "TypeScript", "Next.js", "Tailwind CSS"
  // TODO: isi manual
];

// ── Timeline ──────────────────────────────────────────────────────────────────
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

// TODO: isi array timeline dengan pengalaman, pendidikan, atau pencapaian
const timeline: TimelineItem[] = [
  // Contoh format:
  // { year: "2024", title: "SMK Telkom Malang", description: "Mulai belajar web development." },
  // TODO: isi manual
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced || !heroRef.current) return;

      const children = Array.from(heroRef.current.children);
      gsap.from(children, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* ── Hero / Headline ─────────────────────────────────────────────── */}
        <div ref={heroRef} className="mb-20">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-zinc-300">About Me</span>
          </div>

          {/* Name & Title */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">
            <span className="text-white">{heroData.name}</span>
          </h1>
          <p className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent mb-6">
            {heroData.title} {/* TODO: sesuaikan */}
          </p>

          {/* Short Bio */}
          <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl">
            {heroData.bio} {/* TODO: isi bio singkat di heroData di atas */}
          </p>
        </div>

        {/* ── Bio Lengkap ─────────────────────────────────────────────────── */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-gradient-to-r from-red-500 to-red-600" />
            <h2 className="text-2xl font-bold text-white">My Story</h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 space-y-4">
            {/* Gradient accent top-left */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            {fullBio.map((paragraph, i) => (
              <p
                key={i}
                className="text-zinc-300 leading-relaxed relative z-10"
              >
                {paragraph}
                {/* TODO: ganti teks placeholder di atas dengan bio asli kamu */}
              </p>
            ))}
          </div>
        </motion.section>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-gradient-to-r from-red-500 to-red-600" />
            <h2 className="text-2xl font-bold text-white">Skills &amp; Technologies</h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-3 relative z-10">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-zinc-200 hover:border-red-400/50 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            ) : (
              /* Empty state — akan hilang begitu skills diisi */
              <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-sm">
                  {/* TODO: isi array `skills` di bagian atas file ini */}
                  Skills belum diisi — tambahkan ke array <code className="text-red-400 bg-red-500/10 px-1 rounded">skills</code> di file ini.
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── Timeline / Pengalaman ────────────────────────────────────────── */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-gradient-to-r from-red-500 to-red-600" />
            <h2 className="text-2xl font-bold text-white">Experience &amp; Education</h2>
          </div>

          <AnimatePresence mode="wait">
            {timeline.length > 0 ? (
              /* Timeline list — ditampilkan saat array sudah diisi */
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-red-500/60 via-red-500/30 to-transparent" />

                <div className="space-y-10">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      className="relative"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                    >
                      {/* Dot */}
                      <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-red-500 border-2 border-black shadow-sm shadow-red-500/50" />

                      {/* Card */}
                      <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-white/20 transition-colors duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                          <span className="inline-block px-3 py-0.5 bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-medium rounded-full mb-3">
                            {item.year}
                          </span>
                          <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty state — akan hilang begitu timeline diisi */
              <motion.div
                key="timeline-empty"
                className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">
                    {/* TODO: isi array `timeline` di bagian atas file ini */}
                    Timeline belum diisi — tambahkan ke array <code className="text-red-400 bg-red-500/10 px-1 rounded">timeline</code> di file ini.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="inline-block bg-gradient-to-r from-red-500/10 via-red-600/10 to-red-700/10 rounded-3xl p-10 border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-3">Let&apos;s Work Together</h2>
            <p className="text-zinc-400 mb-6 max-w-sm mx-auto text-sm">
              Punya proyek atau kolaborasi yang menarik? Jangan ragu untuk menghubungi saya.
            </p>
            <motion.a
              href="https://wa.me/6281232896909"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full text-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(239,68,68,0.5)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Hubungi Saya
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
