import React from "react";

interface BadgeProps {
  title: string;
  className?: string;
}

const Badge = ({ title, className }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium leading-[1.4] transition-colors ${className || ""}`}
      style={{
        backgroundColor: "var(--ds-surface-subtle)",
        color: "var(--ds-fg-secondary)",
        boxShadow: "var(--ds-shadow-border-light)",
        letterSpacing: "-0.005em",
      }}
    >
      {title}
    </span>
  );
};

export default Badge;
