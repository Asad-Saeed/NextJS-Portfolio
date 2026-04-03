import React from "react";

interface BadgeProps {
  title: string;
}

const Badge = ({ title }: BadgeProps) => {
  return (
    <span className="py-2 px-3 text-xs text-Green bg-Green/10 border border-Green/20 rounded-full">
      {title}
    </span>
  );
};

export default Badge;
