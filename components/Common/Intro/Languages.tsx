"use client";

import { useEffect, useRef, useState } from "react";
import SidebarSection from "./SidebarSection";
import { Language } from "@/types";

const ACCENT_GRADIENTS = [
  "linear-gradient(90deg, var(--ds-develop), var(--ds-link))",
  "linear-gradient(90deg, var(--ds-preview), var(--ds-console-pink))",
];

const Languages = ({ data }: { data?: Language[] }) => {
  const [counts, setCounts] = useState<number[]>(() => (data ?? []).map(() => 0));
  const ref = useRef<HTMLUListElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!data?.length) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCounts(data.map((d) => d.proficiency));
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let startTs = 0;
    const duration = 1200;

    const animate = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCounts(data.map((d) => Math.round(eased * d.proficiency)));
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
  }, [data]);

  if (!data?.length) return null;

  return (
    <SidebarSection index={2} label="Languages">
      <ul ref={ref} className="flex flex-col gap-3">
        {data.map((lang, i) => {
          const target = lang.proficiency;
          const pct = Math.min(counts[i] ?? 0, target);
          const accent = ACCENT_GRADIENTS[i % ACCENT_GRADIENTS.length];
          return (
            <li key={lang.name}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span
                  className="text-[12.5px] font-medium"
                  style={{ color: "var(--ds-fg)", letterSpacing: "-0.01em" }}
                >
                  {lang.name}
                </span>
                <span
                  className="text-mono-label tabular-nums"
                  style={{ color: "var(--ds-fg-tertiary)" }}
                  aria-label={`${target} percent proficiency`}
                >
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
                    background: accent,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </SidebarSection>
  );
};

export default Languages;
