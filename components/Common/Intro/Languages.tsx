"use client";

import { useEffect, useState } from "react";
import { Language } from "@/types";

const SIZE = 75;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRC = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

const Languages = ({ data }: { data?: Language[] }) => {
  const [counts, setCounts] = useState<number[]>(() => (data ?? []).map(() => 0));

  useEffect(() => {
    if (!data?.length) return;

    const timer = setInterval(() => {
      setCounts((prev) => {
        const base = data.map((_, i) => prev[i] ?? 0);
        const next = base.map((c, i) => (c < data[i].proficiency ? c + 1 : c));
        if (next.every((c, i) => c >= data[i].proficiency)) {
          clearInterval(timer);
        }
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [data]);

  if (!data?.length) return null;

  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      <div className="flex flex-col gap-y-4">
        <span className="text-Snow text-xs font-bold">Languages</span>
        <div className="flex flex-row items-center justify-center space-x-6">
          {data.map((lang, i) => {
            const pct = counts[i] || 0;
            const offset = CIRC * (1 - pct / 100);
            return (
              <div key={lang.name} className="flex flex-col items-center justify-center gap-y-2">
                <div className="relative" style={{ width: SIZE, height: SIZE }}>
                  <svg
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    role="img"
                    aria-label={`${lang.name} proficiency ${lang.proficiency}%`}
                  >
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={RADIUS}
                      fill="none"
                      stroke="#1d3461"
                      strokeWidth={STROKE}
                    />
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={RADIUS}
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth={STROKE}
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      strokeDashoffset={offset}
                      transform={`rotate(-90 ${CENTER} ${CENTER})`}
                    />
                  </svg>
                  <span
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                    style={{ color: "#00e5ff" }}
                  >
                    {pct}%
                  </span>
                </div>
                <span className="text-xs font-bold text-Snow">{lang.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Languages;
