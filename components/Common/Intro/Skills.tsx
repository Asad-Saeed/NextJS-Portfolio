import LinearBar from "./LinearBar";
import SidebarSection from "./SidebarSection";
import { SidebarSkill } from "@/types";

const ACCENTS = [
  "linear-gradient(90deg, var(--ds-develop), var(--ds-link))",
  "linear-gradient(90deg, var(--ds-preview), var(--ds-console-pink))",
  "linear-gradient(90deg, var(--ds-ship), #ff8a7a)",
];

const Skills = ({ data }: { data?: SidebarSkill[] }) => {
  if (!data?.length) return null;

  return (
    <SidebarSection index={3} label="Expertise">
      <div className="flex flex-col gap-3.5">
        {data.map((skill: SidebarSkill, index: number) => (
          <LinearBar
            key={index}
            title={skill.title}
            percent={skill.level}
            accent={ACCENTS[index % ACCENTS.length]}
            delay={index * 80}
          />
        ))}
      </div>
    </SidebarSection>
  );
};

export default Skills;
