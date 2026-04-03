"use client";

import React from "react";
import DrawerLayout from "../DrawerLayout";
import Intro from "../Intro";

interface DrawerIntroProps {
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
}

export const DrawerIntro = ({ setIsOpen, isOpen }: DrawerIntroProps) => {
  return (
    <DrawerLayout setIsOpen={setIsOpen} isOpen={isOpen}>
      <Intro />
    </DrawerLayout>
  );
};
