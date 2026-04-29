"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MouseEvent } from "react";
import { scrollToSection, setPendingScroll } from "@/lib/scroll";

interface CapabilitiesLinkProps {
  slug?: string;
  children: React.ReactNode;
  className?: string;
}

export default function CapabilitiesLink({
  slug,
  children,
  className = "ds-btn-ghost",
}: CapabilitiesLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const homePath = slug ? `/${slug}` : "/";
  const isOnHome = pathname === homePath || pathname === `${homePath}/`;
  const href = `${homePath}#expertise`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();

    if (isOnHome) {
      scrollToSection("expertise");
      if (window.location.hash !== "#expertise") {
        window.history.replaceState(null, "", `${homePath}#expertise`);
      }
      return;
    }
    setPendingScroll("expertise");
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} scroll={false}>
      {children}
    </Link>
  );
}
