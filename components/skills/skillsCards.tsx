import SkillCard from "./skillCard";
import SectionHeader from "@/components/Common/SectionHeader";
import { Skill } from "@/types";

interface SkillsCardsProps {
  data: Skill[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

const SkillsCards = ({ data, eyebrow, heading, description }: SkillsCardsProps) => {
  if (!data?.length) return null;

  return (
    <section
      aria-labelledby="skills-heading"
      className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto"
    >
      <SectionHeader
        id="skills-heading"
        eyebrow={eyebrow ?? ""}
        title={heading ?? ""}
        description={description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {data.map((item: Skill, idx: number) => (
          <SkillCard key={item.id} data={item} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default SkillsCards;
