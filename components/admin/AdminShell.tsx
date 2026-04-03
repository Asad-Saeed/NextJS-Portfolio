"use client";

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
}: {
  children: React.ReactNode;
  slug?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="h-screen bg-Black flex overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-DeepNightBlack border-r border-DarkGray/30 flex flex-col fixed h-full">
        <div className="p-4 border-b border-DarkGray/30">
          <Link href="/admin" className="text-Green font-bold text-lg">
            Portfolio CMS
          </Link>
          <p className="text-LightGray text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                  isActive
                    ? "bg-Green/10 text-Green font-medium"
                    : "text-LightGray hover:text-Snow hover:bg-EveningBlack"
                }`}
              >
                <item.icon className="text-base" />
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
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">{children}</main>
    </div>
  );
}
