"use client";

import Image from "next/image";
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
  title: "Junior Full-Stack Developer", // TODO: sesuaikan judul/role
  bio: "Jago nyalahin CSS padahal salah sendiri, tapi tetep produktif.",
};

// TODO: tulis bio lengkap sebagai string paragraf-paragraf
const fullBio: string[] = [
  // TODO: isi paragraf pertama bio lengkap
  "Perkenalkan, namaku Aesar, siswa RPL di SMK Telkom Malang yang awalnya cuma penasaran kenapa website bisa gerak-gerak sendiri, terus keterusan sampai sekarang bolak-balik ngoding frontend dan backend.",
  // TODO: isi paragraf kedua (bisa dihapus jika hanya 1 paragraf)
  "Perjalanan dimulai dari nyoba-nyoba HTML dan CSS yang berantakan, lanjut ke JavaScript yang bikin pusing tapi ketagihan, sampai akhirnya nyemplung ke Next.js dan NestJS buat bikin aplikasi web yang beneran jalan.",
  
  "Salah satu project yang paling berkesan: MockeT, website digitalisasi sekolah lengkap dengan sistem tiket online dan sistem refund. Dari sini belajar banyak hal yang nggak diajarin di kelas, seperti gimana caranya bikin alur tiket yang nggak bikin bingung user, sampai gimana handle logic refund yang ternyata jauh lebih ribet dari kelihatannya.",

  "Di luar ngoding, tetap manusia biasa yang butuh kopi, kadang stuck di error yang ternyata cuma salah titik koma, dan masih terus belajar satu error demi satu error. Karena buatku, tiap bug yang berhasil dibenerin itu kayak level-up kecil menuju jadi developer yang lebih jago."
];

// TODO: isi array ini dengan nama-nama teknologi/skill kamu
const skills: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "Prisma",
  "MySQL",
  "Shadcn/ui",
  "Figma",
  "Vite",
  "Git",
  "Github",
  "Postman",
  "Laravel",
  "PHP",
  
  
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
   { 
    year: "2024 - Sekarang", 
    title: "SMK Telkom Malang", 
    description: "Siswa jurusan Rekayasa Perangkat Lunak (RPL). Mempelajari dasar pemrograman, pengembangan web frontend dan backend." 
  },
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

          {/* 2-column grid: photo left, text right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Profile Photo ── */}
            <motion.div
              className="relative flex justify-center lg:justify-start order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                {/* Decorative blobs */}
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-red-500/25 rounded-full blur-3xl animate-blob pointer-events-none" />
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-red-600/25 rounded-full blur-3xl animate-blob-delayed pointer-events-none" />

                {/* Photo frame */}
                <motion.div
                  className="relative z-10 w-72 h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden ring-4 ring-white/10 shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Image
                    src="/img/profile/tido.jpg"
                    alt="Foto profil Aesar"
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

              </div>
            </motion.div>

            {/* ── Right: Text Content ── */}
            <div className="space-y-6 order-1 lg:order-2">
             
              

              {/* Name & Title */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-3">
                  <span className="text-white">{heroData.name}</span>
                </h1>
                <p className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  {heroData.title} {/* TODO: sesuaikan */}
                </p>
              </div>

              {/* Short Bio */}
              <p className="text-base text-zinc-300 leading-relaxed">
                {heroData.bio} {/* TODO: isi bio singkat di heroData di atas */}
              </p>
            </div>

          </div>
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
            <h2 className="text-2xl font-bold text-white">Biografi</h2>
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
            <h2 className="text-2xl font-bold text-white mb-3">Ada ide?</h2>
            <motion.a
              href="https://wa.me/6281232896909"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full text-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(239,68,68,0.5)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Contact
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
