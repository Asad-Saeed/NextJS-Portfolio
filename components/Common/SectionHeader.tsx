import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional custom node rendered in the right column instead of `description`. */
  right?: ReactNode;
  id?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  right,
  id,
}: SectionHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4">
      <div>
        <div className="text-mono-label mb-2" style={{ color: "var(--ds-fg-tertiary)" }}>
          {eyebrow}
        </div>
        <h2
          id={id}
          className="font-semibold leading-[1.1]"
          style={{
            color: "var(--ds-fg)",
            fontSize: "clamp(1.375rem,2.6vw,1.75rem)",
            letterSpacing: "-0.04em",
          }}
        >
          {title}
        </h2>
      </div>
      {right ? (
        <div className="shrink-0">{right}</div>
      ) : description ? (
        <p
          className="max-w-sm text-[13px] leading-relaxed"
          style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
