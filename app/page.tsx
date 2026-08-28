"use client";

import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import "./animations.css";
import TiltImage from "./components/TiltImage";

gsap.registerPlugin(ScrollTrigger);



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    // --------------------------------------------------------
    // Hero Entrance Timeline
    // --------------------------------------------------------
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(badgeRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.3,
    })
      .from(
        headingRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.3"
      )
      .from(
        descRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        buttonsRef.current?.children ? Array.from(buttonsRef.current.children) : [],
        {
          opacity: 0,
          y: 16,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.3"
      )
      .from(
        socialsRef.current?.children ? Array.from(socialsRef.current.children) : [],
        {
          opacity: 0,
          x: -12,
          stagger: 0.08,
          duration: 0.4,
        },
        "-=0.3"
      )
      .from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.94,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8" // mulai bersamaan dengan desc
      )

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side — Text Content */}
            <div className="space-y-8">

              {/* Heading */}
              <div ref={headingRef} className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Halo, aku
                  <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                    Aesar
                  </span>
                  <TypeAnimation
                    sequence={[
                      "Full-Stack Developer",
                      2000,
                      "Siswa SMK Telkom Malang",
                      2000,
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ display: "inline-block", marginLeft: "1px", color: "white" }}
                    className="text-white text-2xl lg:text-4xl"
                  />
                </h1>
              </div>

              {/* Description */}
              <p
                ref={descRef}
                className="text-lg text-zinc-300 leading-relaxed max-w-xl"
              >
                Siswa RPL yang lagi ngasah skill fullstack lewat project.
              </p>

              {/* CTA Buttons */}
              <div ref={buttonsRef} className="flex flex-wrap gap-4">

                {/* Secondary: Download CV — red accent solid */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <a
                    href="/cv/aesar-cv.pdf"
                    download="Aesar-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full border border-red-500 hover:border-red-400 transition-colors duration-300 flex items-center gap-2 shadow-lg shadow-red-900/30"
                  >
                    <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download CV
                  </a>
                </motion.div>
              </div>

              {/* Social Links — Pill Badges */}
              <div ref={socialsRef} className="flex flex-wrap gap-3 pt-4">


                {/* Github */}
                <motion.a
                  href="https://github.com/foxx-sigma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 hover:bg-white/10 hover:border-white/30 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-4 h-4 text-zinc-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-300">Github</span>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://www.linkedin.com/in/aesar-aulayain?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 hover:bg-white/10 hover:border-white/30 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-4 h-4 text-zinc-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-300">LinkedIn</span>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=aesar.hernando.dev@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kirim via Email"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 hover:bg-white/10 hover:border-white/30 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-4 h-4 text-zinc-300 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.921-8-5.921V6h16zM4 18V9.044l7.386 5.47a1 1 0 001.228 0L20 9.044V18H4z" />
                  </svg>
                  <span className="text-sm font-medium text-zinc-300">Email</span>
                </motion.a>

              </div>
            </div>

            {/* Right Side — Image */}
            <div ref={imageRef} className="relative lg:block">
              <div className="relative">

                {/* Decorative Blobs */}
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-red-500/30 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-red-600/30 rounded-full blur-3xl animate-blob-delayed"></div>

                {/* Image Container */}
                <div className="relative z-10 w-full max-w-md mx-auto animate-float-slow">
                  {/* TiltImage — tilt 3D interaktif, GSAP entrance via imageRef parent */}
                  <TiltImage
                    src="/img/profile/foto-profesional.png"
                    alt="Foto Aesar — Fullstack Developer"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="mt-20" />

        </div>
      </main>
    </div>
  );
}