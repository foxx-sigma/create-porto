"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CertificateItem } from "../../data/sertifikasi";
import "../../animations.css";

interface SertifikasiClientProps {
  certificates: CertificateItem[];
}

export default function SertifikasiClient({ certificates }: SertifikasiClientProps) {
  const [selected, setSelected] = useState<CertificateItem | null>(null);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-zinc-300">Pencapaian Saya</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Sertifikasi
            </span>
          </h1>

          <p className="text-lg text-zinc-400">
            Kumpulan sertifikat dan pencapaian yang telah saya raih dari berbagai program pelatihan dan kompetisi.
          </p>
        </motion.div>

        {/* Certificate Grid / Empty State */}
        {certificates.length === 0 ? (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Belum ada sertifikat ditambahkan</h3>
            <p className="text-zinc-500">Sertifikat akan tampil di sini setelah ditambahkan.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 260, damping: 24, delay: i * 0.06 }}
              >
                <motion.button
                  onClick={() => setSelected(cert)}
                  className="w-full text-left group"
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors duration-300 hover:shadow-2xl hover:shadow-red-500/10">

                    {/* Certificate Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Zoom hint overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          <span className="text-sm font-medium">Lihat Sertifikat</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-red-400 transition-colors line-clamp-2">
                        {cert.name}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-400 text-sm line-clamp-1">{cert.issuer}</span>
                        <span className="text-zinc-500 text-xs shrink-0">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                aria-label="Tutup"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Certificate Info */}
              <motion.div
                className="mt-4 px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-white mb-1">{selected.name}</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-zinc-400">{selected.issuer}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-500">{selected.date}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
