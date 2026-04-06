import React from "react";

interface BadgeProps {
  title: string;
  className?: string;
}

const Badge = ({ title, className }: BadgeProps) => {
  return (
    <span
      className={`py-1 px-2 md:py-1.5 md:px-3 text-xs text-Green bg-Green/10 border border-Green/20 rounded-full ${className || ""}`}
    >
      {title}
    </span>
  );
};

export default Badge;
