interface SkeletonProps {
  className?: string;
  /** Use a pill shape (rounded-full) instead of the default 4px radius. */
  pill?: boolean;
  /** Use the card surface (shadow-as-border container). */
  card?: boolean;
  /** Inline style (width / height as needed). */
  style?: React.CSSProperties;
  /** Optional aria-label override; defaults to "Loading". */
  "aria-label"?: string;
}

/**
 * Vercel/Geist-style skeleton primitive — uses a horizontal shimmer over
 * the design system's neutral surface tokens. Theme-aware via --ds-* vars.
 */
export default function Skeleton({
  className = "",
  pill,
  card,
  style,
  "aria-label": ariaLabel = "Loading",
}: SkeletonProps) {
  const base = card ? "ds-skeleton-card" : "ds-skeleton";
  const radius = pill ? "rounded-full" : "";
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      aria-busy="true"
      className={`${base} ${radius} ${className}`}
      style={style}
    />
  );
}
