"use client";

import { useEffect } from "react";
import { scrollToSection, consumePendingScroll } from "@/lib/scroll";

/**
 * Mounted on the home page. Picks up:
 *   1. A pending scroll target stashed in sessionStorage by HashLink
 *      (cross-page navigation handoff)
 *   2. The current URL hash (e.g. user pasted /asad-saeed#certifications)
 *   3. Future hashchange events
 * Each path delegates to scrollToSection which uses react-scroll
 * inside the LayoutShell's active scroll container.
 */
export default function HashScroller() {
  useEffect(() => {
    const pending = consumePendingScroll();
    if (pending) {
      scrollToSection(pending);
    } else if (window.location.hash.length > 1) {
      scrollToSection(window.location.hash.slice(1));
    }

    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash.length > 1) scrollToSection(hash.slice(1));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
