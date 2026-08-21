"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

interface TiltImageProps {
  src: string;
  alt: string;
}

const SPRING_CONFIG = { stiffness: 280, damping: 28, mass: 0.6 };
const MAX_TILT = 18; // derajat max tilt

export default function TiltImage({ src, alt }: TiltImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw motion values untuk posisi kursor relatif ke elemen (-0.5 s/d 0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring — kasih inertia halus
  const springX = useSpring(rawX, SPRING_CONFIG);
  const springY = useSpring(rawY, SPRING_CONFIG);

  // Transformasi ke rotasi
  const rotateY = useTransform(springX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);

  // Glare position
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useMotionValue(0);
  const glareSpring = useSpring(glareOpacity, { stiffness: 200, damping: 30 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rawX.set(x);
    rawY.set(y);
    glareOpacity.set(0.25);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
    glareOpacity.set(0);
  }

  return (
    // Perspective wrapper
    <div
      style={{ perspective: "900px", perspectiveOrigin: "center" }}
      className="w-full"
    >
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-square rounded-3xl overflow-hidden ring-4 ring-white/10 shadow-2xl cursor-none"
      >
        {/* Foto */}
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          draggable={false}
        />

        {/* Glare overlay */}
        <motion.div
          style={{
            opacity: glareSpring,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.55) 0%, transparent 65%)`
            ),
            pointerEvents: "none",
          }}
          className="absolute inset-0 z-10 rounded-3xl"
        />
      </motion.div>
    </div>
  );
}
