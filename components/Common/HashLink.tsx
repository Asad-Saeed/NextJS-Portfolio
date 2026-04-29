"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MouseEvent } from "react";
import { scrollToSection, setPendingScroll } from "@/lib/scroll";

interface HashLinkProps {
  /** Target element id (without the #). */
  targetId: string;
  /** User slug (e.g. "asad-saeed") — needed to route to the correct home page. */
  slug?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * Smart anchor link backed by react-scroll inside the LayoutShell's
 * scrollable <main>. On the home page it scrolls in place. On other
 * pages it stashes the target via sessionStorage and routes home; the
 * destination's <HashScroller /> picks it up and scrolls — no race
 * with Suspense streams.
 */
export default function HashLink({
  targetId,
  slug,
  children,
  className,
  style,
  "aria-label": ariaLabel,
}: HashLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const homePath = slug ? `/${slug}` : "/";
  const isOnHome = pathname === homePath || pathname === `${homePath}/`;
  const href = `${homePath}#${targetId}`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();

    if (isOnHome) {
      scrollToSection(targetId);
      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, "", `${homePath}#${targetId}`);
      }
      return;
    }
    setPendingScroll(targetId);
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
      style={style}
      scroll={false}
    >
      {children}
    </Link>
  );
}
