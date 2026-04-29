"use client";

import { scroller } from "react-scroll";

const PENDING_KEY = "ds-pending-scroll";

/**
 * The LayoutShell renders two scrollable <main> elements (desktop and
 * mobile, each hidden via CSS at different breakpoints). Detect which is
 * actually visible at click time and route the scroll into that one.
 */
function activeScrollContainerId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const desktop = document.getElementById("main-content");
  const mobile = document.getElementById("main-content-mobile");
  const isVisible = (el: HTMLElement | null) => {
    if (!el) return false;
    const cs = window.getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden" && el.offsetParent !== null;
  };
  if (isVisible(desktop)) return "main-content";
  if (isVisible(mobile)) return "main-content-mobile";
  return undefined;
}

function getContainerEl(): HTMLElement | null {
  const id = activeScrollContainerId();
  return id ? (document.getElementById(id) as HTMLElement | null) : null;
}

/**
 * Smooth-scroll target into view via react-scroll, then re-correct for
 * layout shifts caused by Suspense streams using a MutationObserver
 * + a final settle window. This handles the "destination renders late"
 * case where sections below the target shift its absolute position.
 */
function performScroll(targetId: string) {
  const containerId = activeScrollContainerId();
  const containerEl = getContainerEl();
  const targetEl = document.getElementById(targetId);
  if (!containerId || !containerEl || !targetEl) return;

  const OFFSET = -24;

  const goSmooth = () => {
    scroller.scrollTo(targetId, {
      duration: 600,
      smooth: "easeInOutQuart",
      containerId,
      offset: OFFSET,
    });
  };

  const goInstant = () => {
    // Instant correction — math directly so we don't queue another animation
    const containerRect = containerEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const delta = targetRect.top - containerRect.top + OFFSET;
    containerEl.scrollTo({ top: containerEl.scrollTop + delta, behavior: "auto" });
  };

  // Initial smooth scroll
  goSmooth();

  // Re-correct after layout shifts — observe DOM mutations on the
  // scroll container subtree for ~3.5s and re-snap on each batch.
  let cleanup = () => {};
  let lastCorrect = 0;
  const observer = new MutationObserver(() => {
    const now = performance.now();
    if (now - lastCorrect < 80) return; // debounce
    lastCorrect = now;
    goInstant();
  });
  observer.observe(containerEl, {
    childList: true,
    subtree: true,
  });

  // Final scheduled corrections at ~1s and ~2.5s in case the observer
  // missed (or the layout shift came from image loads / fonts).
  const t1 = setTimeout(goInstant, 1000);
  const t2 = setTimeout(goInstant, 2500);
  const t3 = setTimeout(() => {
    observer.disconnect();
    cleanup = () => {};
  }, 3500);

  cleanup = () => {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    observer.disconnect();
  };

  // If the user starts manually scrolling, stop our auto-corrections
  // so we don't fight them.
  const onUserScroll = () => {
    observer.disconnect();
    cleanup();
    containerEl.removeEventListener("wheel", onUserScroll);
    containerEl.removeEventListener("touchmove", onUserScroll);
  };
  containerEl.addEventListener("wheel", onUserScroll, { passive: true, once: true });
  containerEl.addEventListener("touchmove", onUserScroll, { passive: true, once: true });
}

/**
 * Scroll to an element by id within the active LayoutShell scroll container.
 * Polls up to ~6s while the target streams in (Suspense), then performs
 * a smooth scroll with subsequent layout-shift corrections.
 */
export function scrollToSection(targetId: string) {
  if (typeof window === "undefined") return;
  let attempts = 0;
  const MAX_ATTEMPTS = 75; // 75 × 80ms ≈ 6s

  const tick = () => {
    const el = document.getElementById(targetId);
    const containerId = activeScrollContainerId();
    if (el && containerId) {
      performScroll(targetId);
      return;
    }
    if (++attempts < MAX_ATTEMPTS) {
      setTimeout(tick, 80);
    }
  };
  tick();
}

/**
 * Stash a target id so the destination home page can pick it up after
 * a Next.js client navigation (used when clicking a hash link from a
 * different page — e.g. /skills → home then scroll to #certifications).
 */
export function setPendingScroll(targetId: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(PENDING_KEY, targetId);
  } catch {
    // ignore quota / privacy errors
  }
}

/**
 * Consume the pending scroll target (if any). Called by HashScroller on
 * the home page after navigation so the target scrolls reliably.
 */
export function consumePendingScroll(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(PENDING_KEY);
    if (v) sessionStorage.removeItem(PENDING_KEY);
    return v;
  } catch {
    return null;
  }
}
