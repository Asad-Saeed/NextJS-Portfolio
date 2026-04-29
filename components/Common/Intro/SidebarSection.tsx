interface SidebarSectionProps {
  index: number;
  label: string;
  children: React.ReactNode;
  /** Optional inline action / accessory rendered to the right of the heading. */
  accessory?: React.ReactNode;
}

/** Vercel/Geist-style numbered section header used inside the sidebar. */
export default function SidebarSection({ index, label, children, accessory }: SidebarSectionProps) {
  const num = String(index).padStart(2, "0");
  return (
    <section
      className="py-5"
      style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}
      aria-label={label}
    >
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-mono-label tabular-nums" style={{ color: "var(--ds-fg-muted)" }}>
            {num}
          </span>
          <span
            className="inline-block w-3 h-px"
            style={{ backgroundColor: "var(--ds-border-light)" }}
            aria-hidden
          />
          <h3 className="text-mono-label" style={{ color: "var(--ds-fg-tertiary)" }}>
            {label}
          </h3>
        </div>
        {accessory}
      </header>
      {children}
    </section>
  );
}
