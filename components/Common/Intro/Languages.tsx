import SidebarSection from "./SidebarSection";
import { Language } from "@/types";

const ACCENT_GRADIENTS = [
  "linear-gradient(90deg, var(--ds-develop), var(--ds-link))",
  "linear-gradient(90deg, var(--ds-preview), var(--ds-console-pink))",
];

const Languages = ({ data }: { data?: Language[] }) => {
  if (!data?.length) return null;

  return (
    <SidebarSection index={2} label="Languages">
      <ul className="flex flex-col gap-3">
        {data.map((lang, i) => {
          const target = lang.proficiency;
          const accent = ACCENT_GRADIENTS[i % ACCENT_GRADIENTS.length];
          return (
            <li key={lang.name}>
              <div className="flex items-baseline justify-between mb-1.5">
                <span
                  className="text-[12.5px] font-medium"
                  style={{ color: "var(--ds-fg)", letterSpacing: "-0.01em" }}
                >
                  {lang.name}
                </span>
                <span
                  className="text-mono-label tabular-nums"
                  style={{ color: "var(--ds-fg-tertiary)" }}
                >
                  {target}%
                </span>
              </div>
              <div
                className="relative h-[3px] w-full overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--ds-surface-subtle)" }}
              >
                <div
                  className="ds-bar-fill absolute inset-y-0 left-0 rounded-full"
                  style={
                    {
                      ["--bar-target" as string]: `${target}%`,
                      background: accent,
                    } as React.CSSProperties
                  }
                />
              </div>
            </li>
          );
        })}
      </ul>
    </SidebarSection>
  );
};

export default Languages;
