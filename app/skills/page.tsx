import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SkillsBanner from "@/components/skills/banner";
import SkillsCards from "@/components/skills/skillsCards";

export const metadata: Metadata = {
  title: "Skills | Asad Saeed Portfolio",
};

export default function SkillsPage() {
  return (
    <div className="Home-Page -z-10">
      <SkillsBanner />
      <SkillsCards />
      <Footer />
    </div>
  );
}
