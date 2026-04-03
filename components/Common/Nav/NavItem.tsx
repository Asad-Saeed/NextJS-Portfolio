"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  NavIcon: React.ReactNode;
  NavText: string;
  NavRoute: string;
  setIsOpen: (open: boolean) => void;
  slug?: string;
}

const NavItem = ({ NavIcon, NavText, NavRoute, setIsOpen, slug }: NavItemProps) => {
  const pathname = usePathname();

  // Check active: exact match or for home route check if we're at the slug root
  const isHome = slug && NavRoute === `/${slug}/`;
  const isActive = isHome
    ? pathname === `/${slug}` || pathname === `/${slug}/`
    : pathname === NavRoute;

  const activeClass = isActive
    ? "rounded-xl !text-DeepNightBlack bg-Green font-bold tracking-widest"
    : "";

  // For home route, link to /{slug} (without trailing slash)
  const href = isHome ? `/${slug}` : NavRoute;

  return (
    <Link
      onClick={() => setIsOpen(false)}
      href={href}
      className={`${activeClass} transition flex items-center px-2 hover:bg-EveningBlack text-SilverGray hover:text-SilverGray rounded-xl py-1.5 font-semibold space-x-4 text-base`}
    >
      {NavIcon}
      <span>{NavText}</span>
    </Link>
  );
};

export default NavItem;
