"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Tooltip from "@/components/Common/Tooltip";

const subscribe = () => () => {};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // false during SSR + first client render, true after hydration — no Effect needed.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const next = isDark ? "light" : "dark";

  return (
    <Tooltip content={`Switch to ${next} mode`}>
      <button
        type="button"
        aria-label={`Switch to ${next} mode`}
        title={`Switch to ${next} mode`}
        onClick={() => setTheme(next)}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--ds-fg-secondary)] transition-colors hover:text-[var(--ds-fg)] ${className}`}
        style={{ boxShadow: "var(--ds-shadow-border)" }}
      >
        {mounted ? (
          isDark ? (
            <FiSun size={14} />
          ) : (
            <FiMoon size={14} />
          )
        ) : (
          <span className="h-3.5 w-3.5" aria-hidden />
        )}
      </button>
    </Tooltip>
  );
}
