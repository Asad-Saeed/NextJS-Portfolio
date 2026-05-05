import Badge from "../Badge";
import SidebarSection from "./SidebarSection";
import { TechStack } from "@/types";

const Tools = ({ data }: { data?: TechStack[] }) => {
  const items = data?.length ? data.map((t: TechStack) => t.name) : [];

  if (items.length === 0) return null;

  return (
    <SidebarSection
      index={4}
      label="Stack"
      accessory={
        <span className="text-mono-label tabular-nums" style={{ color: "var(--ds-fg-muted)" }}>
          <span aria-hidden="true">{items.length}</span>
          <span className="sr-only">{items.length} technologies</span>
        </span>
      }
    >
      <div className="flex flex-wrap gap-1.5">
        {items.map((item: string, index: number) => (
          <Badge key={index} title={item} />
        ))}
      </div>
    </SidebarSection>
  );
};

export default Tools;
