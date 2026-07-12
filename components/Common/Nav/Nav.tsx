"use client";

import { ImCross } from "react-icons/im";
import { FiAward } from "react-icons/fi";
import { FaHandshake, FaRegLightbulb } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { HiIdentification } from "react-icons/hi";
import NavItem from "./NavItem";
import DrawerLayout from "../DrawerLayout";
import Tooltip from "@/components/Common/Tooltip";

interface NavProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
  slug?: string;
}

const Nav = ({ setIsOpen, isOpen, slug }: NavProps) => {
  const base = slug ? `/${slug}` : "";

  return (
    <DrawerLayout setIsOpen={setIsOpen} isOpen={isOpen}>
      <div className="absolute z-50 flex flex-col justify-center lg:inset-y-0  -right-0 lg:right-0 w-64 h-screen lg:mt-3 lg:mr-3 lg:h-[96%] bg-DeepNightBlack shadow-2xl md:rounded-xl md:overflow-hidden">
        <div
          onClick={() => setIsOpen(false)}
          className="flex text-LightGray absolute top-0 w-full items-center justify-start pl-6 text-sm h-10 bg-EveningBlack cursor-pointer"
        >
          <Tooltip content="Close">
            <ImCross />
          </Tooltip>
        </div>
        <div className="flex flex-col gap-y-2 px-6 w-full transition">
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={`${base}/`}
            NavIcon={<ImHome />}
            NavText={"Home"}
            slug={slug}
          />
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={`${base}/skills`}
            NavIcon={<FaRegLightbulb />}
            NavText={"Skills"}
            slug={slug}
          />
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={`${base}/contact`}
            NavIcon={<FaHandshake />}
            NavText={"Contact"}
            slug={slug}
          />
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={`${base}/background`}
            NavIcon={<HiIdentification />}
            NavText={"Background"}
            slug={slug}
          />
          <NavItem
            setIsOpen={setIsOpen}
            NavRoute={`${base}/portfolio`}
            NavIcon={<FiAward />}
            NavText={"Portfolio"}
            slug={slug}
          />
        </div>
      </div>
    </DrawerLayout>
  );
};

export default Nav;
