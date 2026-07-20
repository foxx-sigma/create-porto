"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./EraserReveal.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// Canvas helper: setup resolusi DPR agar tajam di Retina display
// Mengembalikan { ctx, w, h } dalam satuan CSS pixel
// ─────────────────────────────────────────────────────────────────────────────
function initCanvas(
  canvas: HTMLCanvasElement,
  wrapper: HTMLElement
): { ctx: CanvasRenderingContext2D; w: number; h: number } | null {
  const rect = wrapper.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;

  const dpr = window.devicePixelRatio || 1;
  canvas.width  = Math.round(rect.width  * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // setTransform(a,b,c,d,e,f): set matrix absolut — tidak akumulasi saat dipanggil ulang
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, w: rect.width, h: rect.height };
}

// ─────────────────────────────────────────────────────────────────────────────
// Cover layer: tema Sharingan sesuai branding Madara dark/red
// isTouch=true → skip hint text di canvas (overlay React yang handle)
// ─────────────────────────────────────────────────────────────────────────────
function drawCoverLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  isTouch: boolean
): void {
  ctx.clearRect(0, 0, w, h);

  // ── Background radial gradient (hitam kemerahan) ──────────────────────────
  const bg = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, w * 0.85);
  bg.addColorStop(0,    "#1d0404");
  bg.addColorStop(0.42, "#0e0202");
  bg.addColorStop(1,    "#090101");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // ── Grid texture halus ────────────────────────────────────────────────────
  const gs = Math.max(14, Math.floor(Math.min(w, h) / 14));
  ctx.strokeStyle = "rgba(160, 24, 24, 0.07)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= w; x += gs) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y <= h; y += gs) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  const cx = w / 2;
  const cy = h / 2;
  const R  = Math.min(w, h) * 0.295; // radius luar sharingan

  // ── Glow merah di pusat ───────────────────────────────────────────────────
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.9);
  glow.addColorStop(0,   "rgba(220, 38, 38, 0.28)");
  glow.addColorStop(0.5, "rgba(220, 38, 38, 0.07)");
  glow.addColorStop(1,   "rgba(220, 38, 38, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.9, 0, Math.PI * 2);
  ctx.fill();

  // ── Speed lines (gaya manga) ──────────────────────────────────────────────
  ctx.strokeStyle = "rgba(150, 18, 18, 0.10)";
  ctx.lineWidth   = 0.7;
  const N = 40;
  for (let i = 0; i < N; i++) {
    const angle = (Math.PI * 2 * i) / N;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * R * 1.08, cy + Math.sin(angle) * R * 1.08);
    ctx.lineTo(cx + Math.cos(angle) * R * 2.8,  cy + Math.sin(angle) * R * 2.8);
    ctx.stroke();
  }

  // ── Sharingan: lingkaran luar ─────────────────────────────────────────────
  ctx.save();
  ctx.shadowColor = "rgba(220, 38, 38, 0.45)";
  ctx.shadowBlur  = 9;
  ctx.strokeStyle = "rgba(220, 38, 38, 0.72)";
  ctx.lineWidth   = Math.max(1.5, w * 0.0038);
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  // ── Sharingan: lingkaran dalam ────────────────────────────────────────────
  ctx.strokeStyle = "rgba(200, 30, 30, 0.36)";
  ctx.lineWidth   = Math.max(1, w * 0.0022);
  ctx.beginPath(); ctx.arc(cx, cy, R * 0.54, 0, Math.PI * 2); ctx.stroke();

  // ── Sharingan: pupil ──────────────────────────────────────────────────────
  const pR   = R * 0.135;
  const pupG = ctx.createRadialGradient(cx, cy, 0, cx, cy, pR);
  pupG.addColorStop(0,   "rgba(255, 95, 95, 1)");
  pupG.addColorStop(0.6, "rgba(200, 20, 20, 0.95)");
  pupG.addColorStop(1,   "rgba(120, 0,  0,  0.85)");
  ctx.save();
  ctx.shadowColor = "rgba(255, 50, 50, 0.65)";
  ctx.shadowBlur  = 12;
  ctx.fillStyle   = pupG;
  ctx.beginPath(); ctx.arc(cx, cy, pR, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // ── Sharingan: 3 tomoe (titik comma di orbit tengah) ──────────────────────
  const tomoeOrbit = R * 0.352;
  const tomoeR     = R * 0.083;
  for (let i = 0; i < 3; i++) {
    const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
    const tx = cx + Math.cos(angle) * tomoeOrbit;
    const ty = cy + Math.sin(angle) * tomoeOrbit;
    const tg = ctx.createRadialGradient(
      tx - tomoeR * 0.25, ty - tomoeR * 0.25, 0,
      tx, ty, tomoeR
    );
    tg.addColorStop(0, "rgba(255, 100, 100, 1)");
    tg.addColorStop(1, "rgba(160, 10,  10,  0.9)");
    ctx.save();
    ctx.shadowColor = "rgba(255, 50, 50, 0.5)";
    ctx.shadowBlur  = 6;
    ctx.fillStyle   = tg;
    ctx.beginPath(); ctx.arc(tx, ty, tomoeR, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // ── Hint text di bawah (hanya untuk desktop) ──────────────────────────────
  if (!isTouch) {
    const fs = Math.max(10, Math.floor(w * 0.041));
    ctx.fillStyle    = "rgba(155, 155, 155, 0.48)";
    ctx.font         = `500 ${fs}px "Plus Jakarta Sans", system-ui, sans-serif`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("✦  scratch to reveal  ✦", cx, h - h * 0.052);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Brush eraser: radial gradient + destination-out → tepi halus, bukan keras
// Semua koordinat dalam satuan CSS pixel
// ─────────────────────────────────────────────────────────────────────────────
function drawBrush(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
): void {
  const g = ctx.createRadialGradient(x, y, radius * 0.02, x, y, radius);
  g.addColorStop(0,    "rgba(0,0,0,1)");
  g.addColorStop(0.42, "rgba(0,0,0,0.96)");
  g.addColorStop(0.72, "rgba(0,0,0,0.55)");
  g.addColorStop(0.9,  "rgba(0,0,0,0.12)");
  g.addColorStop(1,    "rgba(0,0,0,0)");

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-reveal (mobile): lingkaran mengembang dari pusat → ungkap foto penuh
// Mengembalikan fungsi cancel agar bisa di-cleanup saat unmount
// ─────────────────────────────────────────────────────────────────────────────
function startAutoReveal(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  onDone: () => void
): () => void {
  const cx        = w / 2;
  const cy        = h / 2;
  const maxR      = Math.hypot(cx, cy) * 1.08; // cover sudut terjauh
  const DURATION  = 900; // ms
  let startTs: number | null = null;
  let rafId = 0;

  function frame(ts: number) {
    if (!startTs) startTs = ts;
    const t      = Math.min((ts - startTs) / DURATION, 1);
    const eased  = 1 - Math.pow(1 - t, 2.8); // ease-out agresif
    drawBrush(ctx, cx, cy, maxR * eased);
    if (t < 1) {
      rafId = requestAnimationFrame(frame);
    } else {
      onDone();
    }
  }

  rafId = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(rafId);
}

// ─────────────────────────────────────────────────────────────────────────────
// EraserReveal component
// ─────────────────────────────────────────────────────────────────────────────

interface EraserRevealProps {
  /** Path foto profil (layer bawah) */
  src: string;
  /** Alt text untuk aksesibilitas — penting meski ada canvas overlay */
  alt: string;
  /**
   * Radius brush eraser dalam CSS pixel.
   * Default 70. Proporsional terhadap foto (foto ~400px → brush ~70 = 17.5%)
   */
  brushSize?: number;
}

export default function EraserReveal({
  src,
  alt,
  brushSize = 70,
}: EraserRevealProps) {
  const wrapperRef      = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const ctxRef          = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef         = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const pendingRafRef   = useRef<number>(0);
  const pendingPosRef   = useRef<{ x: number; y: number } | null>(null);
  const isOverRef       = useRef(false);
  const cancelRevealRef = useRef<(() => void) | null>(null);

  // State yang mempengaruhi render JSX
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isTouch,        setIsTouch]        = useState(false);
  const [showHint,       setShowHint]       = useState(true);

  // ── Step 1: deteksi preferensi device (sekali saat mount) ──────────────────
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch   = window.matchMedia("(pointer: coarse)").matches;
    setPrefersReduced(reduced);
    setIsTouch(touch);
  }, []);

  // ── Step 2: setup canvas setelah preferensi diketahui ──────────────────────
  useEffect(() => {
    if (prefersReduced) return; // langsung tampilkan foto tanpa canvas

    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let alive = true;

    // Setup + draw cover layer — defer sedikit agar layout selesai dulu
    const doSetup = () => {
      if (!alive) return;
      const result = initCanvas(canvas, wrapper);
      if (!result) {
        // Coba lagi setelah next frame jika ukuran belum tersedia
        requestAnimationFrame(doSetup);
        return;
      }
      const { ctx, w, h } = result;
      ctxRef.current  = ctx;
      sizeRef.current = { w, h };
      drawCoverLayer(ctx, w, h, isTouch);
    };

    const timerId = setTimeout(doSetup, 40);

    // Resize: redraw cover (reset area yang sudah dihapus)
    const onResize = () => {
      if (!alive) return;
      cancelAnimationFrame(pendingRafRef.current);
      pendingRafRef.current = 0;
      cancelRevealRef.current?.();
      cancelRevealRef.current = null;
      doSetup();
      if (alive) setShowHint(true);
    };
    window.addEventListener("resize", onResize);

    // IntersectionObserver: reset saat Hero scrolled out of view
    // Threshold 0.25 = Hero dianggap "keluar" saat kurang dari 25% terlihat
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && alive) {
          cancelRevealRef.current?.();
          cancelRevealRef.current = null;
          doSetup();
          setShowHint(true);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(wrapper);

    return () => {
      alive = false;
      clearTimeout(timerId);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      cancelAnimationFrame(pendingRafRef.current);
      pendingRafRef.current = 0;
      cancelRevealRef.current?.();
      cancelRevealRef.current = null;
    };
  }, [prefersReduced, isTouch]);

  // ── Step 3: pointer events untuk desktop scratch ────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced || isTouch) return;

    const onMove = (e: PointerEvent) => {
      // Hanya draw saat kursor di atas canvas
      if (!isOverRef.current) return;

      const rect = canvas.getBoundingClientRect();
      pendingPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // RAF throttle: paling banyak 1 draw per frame
      if (!pendingRafRef.current) {
        pendingRafRef.current = requestAnimationFrame(() => {
          pendingRafRef.current = 0;
          const pos = pendingPosRef.current;
          const ctx = ctxRef.current;
          if (pos && ctx) drawBrush(ctx, pos.x, pos.y, brushSize);
        });
      }
    };

    const onEnter = () => { isOverRef.current = true; };
    const onLeave = () => { isOverRef.current = false; };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(pendingRafRef.current);
      pendingRafRef.current = 0;
    };
  }, [prefersReduced, isTouch, brushSize]);

  // ── Mobile: tap → auto-reveal dari pusat ────────────────────────────────────
  const handleTap = useCallback(() => {
    const ctx = ctxRef.current;
    const { w, h } = sizeRef.current;
    if (!ctx || w === 0) return;

    setShowHint(false);
    cancelRevealRef.current?.(); // batalkan reveal sebelumnya jika ada
    cancelRevealRef.current = startAutoReveal(ctx, w, h, () => {
      cancelRevealRef.current = null;
    });
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>

      {/* ── Layer bawah: foto profil asli ─────────────────────────────── */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
      />

      {/* ── Layer atas: canvas penutup (sharingan cover) ───────────────── */}
      {!prefersReduced && (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          data-touch={isTouch ? "true" : "false"}
          /*
           * Aksesibilitas:
           * - aria-hidden: canvas hanya dekoratif, screen reader cukup baca <Image> alt
           * - Tidak menghalangi elemen fokus lain (z-index canvas tidak menutupi nav/button)
           */
          aria-hidden="true"
          onClick={isTouch ? handleTap : undefined}
        />
      )}

      {/* ── Mobile hint: ripple + "tap to reveal" ──────────────────────── */}
      {isTouch && showHint && !prefersReduced && (
        <div className={styles.tapHint} aria-hidden="true">
          {/* Dua ring ripple beranimasi */}
          <div className={styles.rippleRing} />
          <div className={styles.rippleRing} />
          {/* Ikon jari */}
          <div className={styles.tapIcon}>👆</div>
          {/* Teks petunjuk */}
          <p className={styles.tapText}>Tap to reveal</p>
        </div>
      )}

    </div>
  );
}
