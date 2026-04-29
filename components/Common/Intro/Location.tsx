import SidebarSection from "./SidebarSection";
import { Profile } from "@/types";

const Location = ({ profile }: { profile?: Partial<Profile> }) => {
  const details: Record<string, string | undefined> = {
    Residence: profile?.residence,
    Nationality: profile?.nationality,
    City: profile?.city,
    Age: profile?.age,
  };

  const entries = Object.entries(details).filter(([, value]) => value);

  if (entries.length === 0) return null;

  return (
    <SidebarSection index={1} label="Identity">
      <dl className="flex flex-col gap-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-baseline justify-between gap-3">
            <dt
              className="text-[11px] uppercase tracking-wider shrink-0"
              style={{ color: "var(--ds-fg-tertiary)", letterSpacing: "0.04em" }}
            >
              {key}
            </dt>
            <dd
              className="text-[12.5px] font-medium text-right truncate"
              style={{ color: "var(--ds-fg)", letterSpacing: "-0.01em" }}
            >
              {value as string}
            </dd>
          </div>
        ))}
      </dl>
    </SidebarSection>
  );
};

export default Location;
