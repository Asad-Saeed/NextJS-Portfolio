interface ProgressBarProps {
  title: string;
  percent: string;
  /** Optional accent color for the fill; defaults to neutral foreground. */
  accent?: string;
  /** @deprecated kept for backward compatibility with old call sites */
  bgColor?: string;
}

const ProgressBar = ({ title, percent, accent }: ProgressBarProps) => {
  const fill = accent || "var(--ds-fg)";

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span
          className="text-[12.5px] font-medium"
          style={{ color: "var(--ds-fg)", letterSpacing: "-0.01em" }}
        >
          {title}
        </span>
        <span className="text-mono-label tabular-nums" style={{ color: "var(--ds-fg-tertiary)" }}>
          {percent}
        </span>
      </div>
      <div
        className="relative h-[3px] w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--ds-surface-subtle)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
          style={{ width: percent, backgroundColor: fill }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
