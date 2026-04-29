"use client";

import { useState } from "react";

interface ExpandableTextProps {
  text: string;
  /** Lines to show when collapsed. */
  clampLines?: number;
  /** Min character count to enable the toggle. */
  threshold?: number;
  className?: string;
  /** Inline color/letter-spacing overrides for the paragraph. */
  style?: React.CSSProperties;
}

export default function ExpandableText({
  text,
  clampLines = 2,
  threshold = 100,
  className = "",
  style,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const isLong = text.length > threshold;
  const clampClass =
    clampLines === 1 ? "line-clamp-1" : clampLines === 2 ? "line-clamp-2" : "line-clamp-3";

  return (
    <div>
      <p className={`${className} ${expanded || !isLong ? "" : clampClass}`} style={style}>
        {text}
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
  );
}
