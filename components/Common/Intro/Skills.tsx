import LinearBar from "./LinearBar";
import { SKILLS } from "../../../constants/constants";
import { SidebarSkill } from "@/types";

const Skills = ({ data }: { data?: SidebarSkill[] }) => {
  const skills = data?.length ? data : SKILLS;

  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      <div className="flex flex-col gap-y-4">
        <span className="text-Snow text-xs font-bold bg-linear-to-bl">
          Experties and Competencies
        </span>
        <div className="flex flex-col space-y-4">
          {skills.map((skill: SidebarSkill | { title: string; level: string }, index: number) => (
            <LinearBar key={index} title={skill.title} percent={skill.level} bgColor="bg-Green" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
