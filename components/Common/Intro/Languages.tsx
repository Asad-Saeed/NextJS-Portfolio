"use client";

import { Progress } from "antd";
import { useEffect, useState, useRef, useMemo } from "react";
import { Language } from "@/types";

const Languages = ({ data }: { data?: Language[] }) => {
  const languages = useMemo(() => data ?? [], [data]);

  const [counts, setCounts] = useState<number[]>(languages.map(() => 0));
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current) return;
    if (languages.length === 0) return;
    animatedRef.current = true;

    const timer = setInterval(() => {
      setCounts((prev) => {
        const next = prev.map((c, i) => (c < languages[i].proficiency ? c + 1 : c));
        if (next.every((c, i) => c >= languages[i].proficiency)) clearInterval(timer);
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [languages]);

  if (languages.length === 0) return null;

  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      <div className="flex flex-col gap-y-4">
        <span className="text-Snow text-xs font-bold">Languages</span>
        <div className="flex flex-row items-center justify-center space-x-6">
          {languages.map((lang, i) => (
            <div key={lang.name} className="flex flex-col items-center justify-center gap-y-2">
              <Progress
                strokeColor="#00e5ff"
                railColor="#1d3461"
                format={(percent) => <span style={{ color: "#00e5ff" }}>{percent}%</span>}
                type="circle"
                percent={counts[i] || 0}
                size={75}
              />
              <span className="text-xs font-bold text-Snow">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Languages;
