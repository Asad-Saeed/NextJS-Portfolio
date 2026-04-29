"use client";

import Image from "next/image";
import { useState } from "react";
import ProgressBar from "./progressBar";
import { Skill, SkillLevel } from "@/types";

const ACCENTS = ["var(--ds-develop)", "var(--ds-preview)", "var(--ds-ship)"];

interface SkillCardProps {
  data: Skill;
  index?: number;
}

const SkillCard = ({ data, index = 0 }: SkillCardProps) => {
  const imageUrl = data?.image_url || "";
  const techName = data?.tech_name;
  const description = data?.description || "";
  const levels = data?.skill_levels || [];
  const accent = ACCENTS[index % ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");

  const [expanded, setExpanded] = useState(false);
  // Heuristic: descriptions over ~80 chars get a Read more toggle.
  const isLong = description.length > 80;

  return (
    <article
      className="group rounded-lg overflow-hidden flex flex-col h-full transition-all duration-200"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      {imageUrl && (
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 4",
            backgroundColor: "var(--ds-surface-subtle)",
            boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)",
          }}
        >
          <Image
            src={imageUrl}
            alt={techName}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-[0.3] group-hover:opacity-50 transition-opacity duration-300"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 30%, var(--ds-surface) 100%)",
            }}
          />
          <span
            className="absolute top-2.5 left-3 text-mono-label"
            style={{ color: "var(--ds-fg-muted)" }}
          >
            {num}
          </span>
          <span
            className="absolute top-3 right-3 inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden
          />
        </div>
      )}

      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5 min-w-0">
        <header>
          <div className="text-mono-label mb-1" style={{ color: "var(--ds-fg-tertiary)" }}>
            Stack {num}
          </div>
          <h3
            className="font-semibold leading-tight"
            style={{
              color: "var(--ds-fg)",
              fontSize: "1.0625rem",
              letterSpacing: "-0.025em",
            }}
          >
            {techName}
          </h3>
        </header>

        {description && (
          <div>
            <p
              className={`text-[12.5px] leading-relaxed ${
                expanded || !isLong ? "" : "line-clamp-1"
              }`}
              style={{
                color: "var(--ds-fg-secondary)",
                letterSpacing: "-0.005em",
              }}
            >
              {description}
            </p>
            {isLong && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 text-mono-label hover:underline transition-colors"
                style={{ color: "var(--ds-link)" }}
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        )}

        {levels.length > 0 && (
          <div
            className="flex flex-col gap-2.5 pt-3 mt-auto"
            style={{ boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)" }}
          >
            {levels.map((skill: SkillLevel, idx: number) => (
              <ProgressBar
                key={idx}
                title={skill.title}
                percent={skill.level}
                accent={idx === 0 ? accent : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default SkillCard;
