"use client";

import Link from "next/link";
import { motion } from "motion/react";
import "../animations.css";

const chooserCards = [
  {
    href: "/portofolio/sertifikasi",
    label: "Sertifikasi",
    desc: "Lihat koleksi sertifikat dan pencapaian dari berbagai program pelatihan & kompetisi.",
    icon: (
      <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    accent: "from-red-500/20 via-red-600/10 to-transparent",
    glowClass: "group-hover:shadow-red-500/20",
  },
  {
    href: "/portofolio/produk",
    label: "Produk",
    desc: "Jelajahi portofolio proyek website dan aplikasi mobile yang sudah saya kerjakan.",
    icon: (
      <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    accent: "from-red-600/20 via-red-500/10 to-transparent",
    glowClass: "group-hover:shadow-red-500/20",
  },
];

export default function PortofolioChooserClient() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-sm text-zinc-300">Portofolio</span>
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Karya Saya
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-zinc-400"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            Pilih kategori yang ingin kamu jelajahi — sertifikat pencapaian atau proyek produk digital saya.
          </motion.p>
        </motion.div>

        {/* Chooser Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {chooserCards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 24,
                delay: 0.35 + i * 0.12,
              }}
            >
              <Link href={card.href} className="group block h-full">
                <motion.div
                  className={`relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-10 h-full flex flex-col gap-6 hover:border-white/20 transition-colors duration-300 hover:shadow-2xl ${card.glowClass}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* Gradient accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  {/* Icon container */}
                  <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center group-hover:border-red-400/40 transition-colors duration-300">
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div className="relative z-10 flex-1">
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                      {card.label}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="relative z-10 flex items-center gap-2 text-red-400 font-medium">
                    <span className="text-sm">Lihat selengkapnya</span>
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
