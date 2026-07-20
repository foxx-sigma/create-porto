"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   Context — expose lenis instance ke child components
   --------------------------------------------------------- */
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/* ---------------------------------------------------------
   LenisProvider
   --------------------------------------------------------- */
interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Hormati prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Jangan init Lenis, biarkan browser default scroll
      return;
    }

    // Init Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Integrasi Lenis dengan GSAP ScrollTrigger
    // Ini mencegah jitter: Lenis memberi tahu ScrollTrigger posisi scroll yang sudah di-smooth
    lenis.on("scroll", ScrollTrigger.update);

    // Gunakan GSAP ticker sebagai RAF loop agar timing sinkron
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000); // gsap ticker pakai detik, lenis butuh milidetik
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0); // Matikan lag smoothing bawaan GSAP agar tidak konflik

    return () => {
      // Cleanup
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
