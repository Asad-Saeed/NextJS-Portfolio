"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Intro from "@/components/Common/Intro";
import ThemeToggle from "@/components/Common/ThemeToggle";
import { FiUser, FiHome, FiCode, FiBriefcase, FiGrid, FiMail } from "react-icons/fi";
import { SidebarData } from "@/types";

interface LayoutShellProps {
  children: React.ReactNode;
  sidebarData?: SidebarData;
  slug?: string;
}

export default function LayoutShell({ children, sidebarData, slug }: LayoutShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const pathname = usePathname();
  const base = slug ? `/${slug}` : "";

  const bottomNavItems = [
    { href: `${base}`, icon: FiHome, label: "Home" },
    { href: `${base}/skills`, icon: FiCode, label: "Skills" },
    { href: `${base}/background`, icon: FiBriefcase, label: "Background" },
    { href: `${base}/portfolio`, icon: FiGrid, label: "Portfolio" },
    { href: `${base}/contact`, icon: FiMail, label: "Contact" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === base) return pathname === base || pathname === `${base}/`;
    return pathname === href;
  };

  return (
    <div className="h-screen lg:p-3 flex flex-col" style={{ backgroundColor: "var(--ds-bg)" }}>
      <a href="#main-content-mobile" className="skip-link lg:hidden">
        Skip to main content
      </a>
      <a href="#main-content" className="skip-link hidden lg:block">
        Skip to main content
      </a>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="lg:hidden flex flex-col h-screen">
        <main
          id="main-content-mobile"
          tabIndex={-1}
          aria-label="Main content"
          className="relative flex-1 overflow-auto no-scrollbar focus:outline-none"
          style={{ backgroundColor: "var(--ds-bg)" }}
        >
          {showProfile ? (
            <div className="relative h-full">
              <Intro isOpen={false} setIsOpen={() => {}} sidebarData={sidebarData} slug={slug} />
            </div>
          ) : (
            <div className="h-full overflow-auto no-scrollbar">{children}</div>
          )}
        </main>

        {/* Mobile bottom nav — pill bar with shadow-as-border */}
        <nav
          aria-label="Primary"
          className="fixed bottom-3 left-3 right-3 z-50 flex items-center justify-between px-2 py-2 rounded-full"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border), var(--ds-shadow-elevation)",
          }}
        >
          <button
            onClick={() => setShowProfile(true)}
            aria-label="Show profile"
            aria-pressed={showProfile}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{
              backgroundColor: showProfile ? "var(--ds-fg)" : "transparent",
              color: showProfile ? "var(--ds-bg)" : "var(--ds-fg-secondary)",
            }}
          >
            <FiUser size={15} />
          </button>

          {bottomNavItems.map((item) => {
            const isActive = !showProfile && isActiveRoute(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowProfile(false)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                style={{
                  backgroundColor: isActive ? "var(--ds-fg)" : "transparent",
                  color: isActive ? "var(--ds-bg)" : "var(--ds-fg-secondary)",
                }}
              >
                <Icon size={15} />
              </Link>
            );
          })}

          <ThemeToggle className="!h-9 !w-9 !rounded-full" />
        </nav>

        <div className="mb-20 shrink-0" />
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:flex relative h-full justify-between gap-3">
        {/* Left sidebar */}
        <aside
          className="relative w-72 h-full overflow-hidden rounded-xl flex flex-col"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          <Intro isOpen={intro} setIsOpen={setIntro} sidebarData={sidebarData} slug={slug} />
        </aside>

        {/* Main content */}
        <main
          id="main-content"
          tabIndex={-1}
          aria-label="Main content"
          className="flex-1 relative overflow-auto overflow-x-hidden no-scrollbar focus:outline-none rounded-xl"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          {children}
        </main>

        {/* Right rail nav */}
        <nav
          aria-label="Primary"
          className="w-14 rounded-xl flex flex-col items-center justify-between gap-y-2 py-3"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          <div className="flex flex-col items-center gap-y-1">
            {bottomNavItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="relative group flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive ? "var(--ds-fg)" : "transparent",
                    color: isActive ? "var(--ds-bg)" : "var(--ds-fg-secondary)",
                  }}
                >
                  <Icon size={15} />
                  <span
                    className="absolute right-full mr-3 px-2.5 py-1 rounded-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-mono-label"
                    style={{
                      backgroundColor: "var(--ds-surface)",
                      color: "var(--ds-fg)",
                      boxShadow: "var(--ds-shadow-border), var(--ds-shadow-elevation)",
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <ThemeToggle />
        </nav>
      </div>
    </div>
  );
}
