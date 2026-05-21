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
  const fill = accent ?? "var(--ds-fg)";

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
          {target}%
        </span>
      </div>
      <div
        className="relative h-[3px] w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--ds-surface-subtle)" }}
      >
        <div
          className="ds-bar-fill absolute inset-y-0 left-0 rounded-full"
          style={
            {
              ["--bar-target" as string]: `${target}%`,
              animationDelay: `${delay}ms`,
              background: fill,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

export default LinearBar;
