"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Intro from "@/components/Common/Intro";
import Nav from "@/components/Common/Nav/Nav";
import { FaBars } from "react-icons/fa";
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
    <div className="h-screen lg:p-[0.8rem] flex flex-col font-circular">
      {/* Skip-to-content link — visible only when keyboard-focused. One per layout
          because mobile and desktop render separate <main> elements. */}
      <a href="#main-content-mobile" className="skip-link lg:hidden">
        Skip to main content
      </a>
      <a href="#main-content" className="skip-link hidden lg:block">
        Skip to main content
      </a>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Mobile content area */}
        <main
          id="main-content-mobile"
          tabIndex={-1}
          className="flex-1 overflow-auto no-scrollbar focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#00e5ff]"
        >
          {showProfile ? (
            <div className="h-full bg-DeepNightBlack">
              <Intro isOpen={false} setIsOpen={() => {}} sidebarData={sidebarData} slug={slug} />
            </div>
          ) : (
            <div className="bg-DeepNightBlack h-full overflow-auto no-scrollbar">{children}</div>
          )}
        </main>

        {/* Mobile bottom nav bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-DeepNightBlack h-16 flex items-end justify-around px-2 pb-3">
          {/* Top border line (behind notch) */}
          <span className="absolute top-0 left-0 right-0 h-[2px] bg-Green/40 z-0" />
          {/* Profile tab */}
          <button
            onClick={() => setShowProfile(true)}
            aria-label="Show profile"
            className="relative flex flex-col items-center"
          >
            {showProfile && (
              <span className="absolute -top-[34px] w-[68px] h-[32px] bg-DeepNightBlack rounded-t-full border-t-2 border-x-2 border-Green/40 left-1/2 -translate-x-1/2 z-1" />
            )}
            <div
              className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                showProfile
                  ? "w-12 h-12 bg-linear-to-br from-Green/30 to-Green/10 text-Green border-2 border-Green/40 -translate-y-5 shadow-[0_0_24px_rgba(var(--color-Green),0.3)]"
                  : "w-9 h-9 text-LightGray"
              }`}
            >
              <FiUser className={showProfile ? "text-lg" : "text-base"} />
            </div>
          </button>

          {/* Page nav tabs */}
          {bottomNavItems.map((item) => {
            const isActive = !showProfile && isActiveRoute(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowProfile(false)}
                aria-label={item.label}
                className="relative flex flex-col items-center"
              >
                {isActive && (
                  <span className="absolute -top-[34px] w-[68px] h-[32px] bg-DeepNightBlack rounded-t-full border-t-2 border-x-2 border-Green/40 left-1/2 -translate-x-1/2 z-1" />
                )}
                <div
                  className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-12 h-12 bg-linear-to-br from-Green/30 to-Green/10 text-Green border-2 border-Green/40 -translate-y-5 shadow-[0_0_24px_rgba(var(--color-Green),0.3)]"
                      : "w-9 h-9 text-LightGray"
                  }`}
                >
                  <item.icon className={isActive ? "text-lg" : "text-base"} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom bar spacer */}
        <div className="lg:h-14 mb-16 lg:mb-0 shrink-0" />
      </div>

      {/* ===== DESKTOP LAYOUT (unchanged) ===== */}
      <div className="hidden lg:flex relative h-full justify-between gap-x-3">
        {/* Left sidebar */}
        <div className="w-64 h-full overflow-hidden bg-DeepNightBlack shadow-2xl lg:flex flex-col lg:relative lg:rounded-xl">
          <Intro isOpen={intro} setIsOpen={setIntro} sidebarData={sidebarData} slug={slug} />
        </div>

        {/* Main content */}
        <main
          id="main-content"
          tabIndex={-1}
          className="w-full lg:w-9/12 shadow-2xl bg-DeepNightBlack relative overflow-auto overflow-x-hidden no-scrollbar focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#00e5ff]"
        >
          {children}
        </main>

        {/* Right nav icons */}
        <div className="lg:w-16 bg-DeepNightBlack shadow-2xl rounded-xl flex flex-col items-center justify-center gap-y-3 py-4 overflow-visible z-[60]">
          {bottomNavItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="relative flex items-center justify-center group"
              >
                <div
                  className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-11 h-11 bg-linear-to-br from-Green/30 to-Green/10 text-Green border-2 border-Green/40 shadow-[0_0_20px_rgba(var(--color-Green),0.3)]"
                      : "w-10 h-10 text-LightGray hover:text-Green hover:bg-Green/5"
                  }`}
                >
                  <item.icon className={isActive ? "text-lg" : "text-base"} />
                </div>
                <span className="absolute right-full mr-3 px-3 py-1.5 text-xs text-Snow bg-EveningBlack border border-DarkGray/50 rounded-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-[100] shadow-lg">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
