"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  html: string;
}

export default function ArticleContent({ html }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const imgs = container.querySelectorAll<HTMLImageElement>("img");
    const handlers: Array<() => void> = [];
    imgs.forEach((img) => {
      img.style.cursor = "zoom-in";
      const handler = () => setLightbox({ src: img.src, alt: img.alt || "" });
      img.addEventListener("click", handler);
      handlers.push(() => img.removeEventListener("click", handler));
    });
    return () => handlers.forEach((h) => h());
  }, [html]);

  useEffect(() => {
    if (!lightbox) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close]);

  return (
    <>
      <div ref={containerRef} className="ds-article" dangerouslySetInnerHTML={{ __html: html }} />

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={close}
        >
          {/* Close button */}
          <button
            ref={closeBtnRef}
            aria-label="Close preview"
            onClick={close}
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full transition-colors"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}
          >
            <FiX size={18} aria-hidden />
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
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
