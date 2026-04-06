import Badge from "../Badge";
import { TECH_STACK } from "../../../constants/constants";
import { TechStack } from "@/types";

const Tools = ({ data }: { data?: TechStack[] }) => {
  const items = data?.length ? data.map((t: TechStack) => t.name) : TECH_STACK;

  return (
    <div className="flex flex-col space-y-1 py-5 border-b border-SlateGray">
      <div className="flex flex-col gap-y-4">
        <span className="text-Snow text-xs font-bold">Tools</span>
        <div className="flex flex-wrap gap-2">
          {items.map((item: string, index: number) => (
            <Badge key={index} title={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
