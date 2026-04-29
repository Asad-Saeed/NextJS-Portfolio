const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; fg: string; bg: string; glow: string }
> = {
  open_to_work: {
    label: "Open to Work",
    dot: "var(--ds-develop)",
    fg: "var(--ds-badge-fg)",
    bg: "var(--ds-badge-bg)",
    glow: "rgba(10, 114, 239, 0.35)",
  },
  freelance: {
    label: "Freelance",
    dot: "var(--ds-preview)",
    fg: "var(--ds-preview)",
    bg: "color-mix(in srgb, var(--ds-preview) 14%, transparent)",
    glow: "rgba(222, 29, 141, 0.35)",
  },
  not_available: {
    label: "Not Available",
    dot: "var(--ds-fg-muted)",
    fg: "var(--ds-fg-secondary)",
    bg: "var(--ds-surface-subtle)",
    glow: "transparent",
  },
};

interface AvailabilityBadgeProps {
  status?: string;
}

export default function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const config = STATUS_CONFIG[status || ""];
  if (!config || status === "not_available") return null;

  return (
    <span
      className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium leading-none"
      style={{
        backgroundColor: config.bg,
        color: config.fg,
        boxShadow: `var(--ds-shadow-border), 0 0 14px -4px ${config.glow}`,
        letterSpacing: "-0.005em",
      }}
    >
      <span aria-hidden className="relative flex w-1.5 h-1.5">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping"
          style={{ backgroundColor: config.dot }}
        />
        <span
          className="relative inline-flex rounded-full h-full w-full"
          style={{ backgroundColor: config.dot }}
        />
      </span>
      {config.label}
    </span>
  );
}
