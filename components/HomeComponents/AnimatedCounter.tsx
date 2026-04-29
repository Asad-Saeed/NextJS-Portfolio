"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target value as displayed (string allows "27+", "5+", etc). */
  value?: string | number | null;
  /** Animation duration in ms. */
  duration?: number;
  /** Delay before animation starts (ms). Used to stagger across stat cells. */
  delay?: number;
}

/**
 * Animates a number from 0 to its target with an ease-out curve.
 * Preserves any non-numeric suffix (like "+", "k").
 * Honors prefers-reduced-motion by snapping to the final value.
 */
export default function AnimatedCounter({
  value,
  duration = 1400,
  delay = 0,
}: AnimatedCounterProps) {
  const raw = value == null ? "—" : String(value);
  const match = raw.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState<string>(targetNum == null ? raw : "0" + suffix);
  const elRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (targetNum == null) {
      setDisplay(raw);
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(`${targetNum}${suffix}`);
      return;
    }

    const el = elRef.current;
    if (!el) return;

    let raf = 0;
    let startTs = 0;

    const animate = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(animate);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const n = Math.round(eased * targetNum);
      setDisplay(`${n}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            raf = requestAnimationFrame(animate);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [targetNum, suffix, raw, duration, delay]);

  return (
    <span ref={elRef} className="tabular-nums">
      {display}
    </span>
  );
}
