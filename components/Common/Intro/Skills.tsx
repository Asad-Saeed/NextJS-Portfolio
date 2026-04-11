import LinearBar from "./LinearBar";
import { SidebarSkill } from "@/types";

const Skills = ({ data }: { data?: SidebarSkill[] }) => {
  if (!data?.length) return null;

  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      <div className="flex flex-col gap-y-4">
        <span className="text-Snow text-xs font-bold bg-linear-to-bl">
          Experties and Competencies
        </span>
        <div className="flex flex-col space-y-4">
          {data.map((skill: SidebarSkill, index: number) => (
            <LinearBar key={index} title={skill.title} percent={skill.level} bgColor="bg-Green" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
