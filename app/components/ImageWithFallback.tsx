"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
}

/**
 * ImageWithFallback
 *
 * Drop-in pengganti <Image> yang menampilkan placeholder bergaya
 * jika src kosong/null/undefined atau gambar gagal dimuat (onError).
 *
 * Wrapper (aspect-ratio, border-radius, overflow-hidden) dikontrol
 * dari luar sehingga placeholder otomatis menyesuaikan bentuk container.
 */
export default function ImageWithFallback({
  src,
  alt,
  fill = true,
  className = "",
  priority = false,
  unoptimized = true,
}: ImageWithFallbackProps) {
  // Jika src kosong/falsy, langsung tampilkan placeholder
  const [hasError, setHasError] = useState(!src);

  // Reset error state jika src berubah
  // (useEffect tidak diperlukan karena key di parent bisa handle ini)

  if (hasError) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-800/80 select-none">
        {/* Ikon gambar placeholder */}
        <div className="w-12 h-12 rounded-xl bg-zinc-700 flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-zinc-500 text-xs font-medium text-center px-4 leading-relaxed">
          Ups! Gambarnya<br />belum ada&nbsp;:(
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      unoptimized={unoptimized}
      priority={priority}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
