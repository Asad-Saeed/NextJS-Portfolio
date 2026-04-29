"use client";

import { useEffect, useRef, useState } from "react";

interface LinearBarProps {
  title: string;
  percent: string;
  /** Optional accent gradient color override (defaults to --ds-fg). */
  accent?: string;
  /** Stagger animation delay (ms). */
  delay?: number;
}

const LinearBar = ({ title, percent, accent, delay = 0 }: LinearBarProps) => {
  const target = parseInt(percent, 10) || 0;
  const [pct, setPct] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (target === 0) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPct(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let startTs = 0;
    const duration = 1200;

    const animate = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(animate);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * target));
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
  }, [target, delay]);

  const fill = accent ?? "var(--ds-fg)";

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span
          className="text-[12.5px] font-medium"
          style={{ color: "var(--ds-fg)", letterSpacing: "-0.01em" }}
        >
          {title}
        </span>
        <span className="text-mono-label tabular-nums" style={{ color: "var(--ds-fg-tertiary)" }}>
          {pct}%
        </span>
      </div>
      <div
        className="relative h-[3px] w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--ds-surface-subtle)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-200 ease-out"
          style={{
            width: `${pct}%`,
            background: fill,
          }}
        />
      </div>
    </div>
  );
};

export default LinearBar;
