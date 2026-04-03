"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  NavIcon: React.ReactNode;
  NavText: string;
  NavRoute: string;
  setIsOpen: (open: boolean) => void;
}

const NavItem = ({ NavIcon, NavText, NavRoute, setIsOpen }: NavItemProps) => {
  const pathname = usePathname();
  const activeClass =
    pathname === NavRoute
      ? "rounded-xl !text-DeepNightBlack bg-Green font-bold tracking-widest"
      : "";

  return (
    <Link
      onClick={() => setIsOpen(false)}
      href={NavRoute}
      className={`${activeClass} transition flex items-center px-2 hover:bg-EveningBlack text-SilverGray hover:text-SilverGray rounded-xl  py-1.5 font-semibold space-x-4 text-base`}
    >
      {NavIcon}
      <span>{NavText}</span>
    </Link>
  );
};

export default NavItem;
