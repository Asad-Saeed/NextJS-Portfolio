import type { ReactNode } from "react";

interface Props {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function Tooltip({ content, children, side = "top", className = "" }: Props) {
  if (!content) return <>{children}</>;
  return (
    <span
      className={`ds-tooltip${className ? ` ${className}` : ""}`}
      data-tip={content}
      data-side={side}
    >
      {children}
    </span>
  );
}
