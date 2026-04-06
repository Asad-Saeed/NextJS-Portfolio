"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import {
  FiHome,
  FiUser,
  FiBookOpen,
  FiBriefcase,
  FiAward,
  FiFolder,
  FiStar,
  FiMessageCircle,
  FiThumbsUp,
  FiSidebar,
  FiLogOut,
  FiInbox,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/profile", label: "Profile & Banner", icon: FiUser },
  { href: "/admin/education", label: "Education", icon: FiBookOpen },
  { href: "/admin/experience", label: "Experience", icon: FiBriefcase },
  { href: "/admin/expertise", label: "Expertise", icon: FiAward },
  { href: "/admin/portfolio", label: "Portfolio", icon: FiFolder },
  { href: "/admin/skills", label: "Skills", icon: FiStar },
  { href: "/admin/recommendations", label: "Recommendations", icon: FiThumbsUp },
  { href: "/admin/reviews", label: "Reviews", icon: FiMessageCircle },
  { href: "/admin/sidebar", label: "Sidebar Data", icon: FiSidebar },
  { href: "/admin/messages", label: "Messages", icon: FiInbox },
];

export default function AdminShell({
  children,
  slug,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  slug?: string;
  userName?: string;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen bg-Black flex overflow-hidden">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-DeepNightBlack border-b border-DarkGray/30 flex items-center justify-between px-4 h-14">
        <Link
          href="/admin"
          className="text-Green font-bold text-base font-cascadia-normal tracking-wider"
        >
          Portfolio CMS
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-Green text-xl p-2">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-Black/70 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed h-full z-50 bg-DeepNightBlack border-r border-DarkGray/30 flex flex-col
          w-64 transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 border-b border-DarkGray/30 hidden lg:block">
          <Link
            href="/admin"
            className="text-Green font-bold text-lg font-cascadia-normal tracking-wider"
          >
            Portfolio CMS
          </Link>
          <p className="text-Snow text-xs mt-1.5 font-medium truncate">{userName || "Admin"}</p>
          <p className="text-LightGray text-[10px] truncate">{userEmail}</p>
        </div>

        {/* Mobile header with user info */}
        <div className="px-4 py-3 border-b border-DarkGray/30 lg:hidden">
          <Link
            href="/admin"
            className="text-Green font-bold text-sm font-cascadia-normal tracking-wider"
          >
            Portfolio CMS
          </Link>
          <p className="text-Snow text-xs font-medium truncate mt-1">{userName || "Admin"}</p>
          <p className="text-LightGray text-[10px] truncate">{userEmail}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                  isActive
                    ? "bg-Green/10 text-Green font-medium"
                    : "text-LightGray hover:text-Snow hover:bg-EveningBlack"
                }`}
              >
                <item.icon className="text-base shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-DarkGray/30">
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-LightGray hover:text-red-400 hover:bg-red-400/10 w-full transition-colors"
            >
              <FiLogOut className="text-base" />
              Sign Out
            </button>
          </form>
          <Link
            href={slug ? `/${slug}` : "/"}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-LightGray hover:text-Snow mt-1"
          >
            View Portfolio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-20 lg:pt-6 p-4 md:p-6 lg:p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}
