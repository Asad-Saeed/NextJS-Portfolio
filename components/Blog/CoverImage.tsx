"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiMaximize2, FiX } from "react-icons/fi";

interface Props {
  src: string;
  alt: string;
}

export default function CoverImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className="relative w-full overflow-hidden mt-5 sm:mt-6 group"
        style={{ aspectRatio: "21 / 7", backgroundColor: "var(--ds-surface-subtle)" }}
      >
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />

        {/* Bottom fade gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 50%, var(--ds-bg) 100%)",
          }}
        />

        {/* Expand button — top-right, appears on hover */}
        <button
          aria-label="View full image"
          onClick={() => setOpen(true)}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            color: "#fff",
            backdropFilter: "blur(4px)",
          }}
        >
          <FiMaximize2 size={14} aria-hidden />
        </button>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full image preview"
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeBtnRef}
            aria-label="Close preview"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}
          >
            <FiX size={18} aria-hidden />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "95vw",
              maxHeight: "90vh",
              objectFit: "contain",
              cursor: "zoom-out",
              borderRadius: 8,
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      )}
    </>
  );
}
