import ExpandableText from "@/components/Common/ExpandableText";
import { Education } from "@/types";

const ACCENTS = ["var(--ds-develop)", "var(--ds-preview)", "var(--ds-ship)"];

interface EduCardProps {
  data: Education;
  index?: number;
}

const Edu_Card = ({ data, index = 0 }: EduCardProps) => {
  const accent = ACCENTS[index % ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group relative p-4 sm:p-5 lg:p-6 rounded-lg transition-all duration-200 min-w-0 flex flex-col"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      <header className="flex items-center justify-between mb-3">
        <span className="text-mono-label" style={{ color: "var(--ds-fg-muted)" }}>
          EDU · {num}
        </span>
        <span
          className="inline-block w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover:scale-150 shrink-0"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
      </header>

      <h3
        className="text-[15px] sm:text-[16px] font-semibold leading-snug break-words"
        style={{ color: "var(--ds-fg)", letterSpacing: "-0.02em" }}
      >
        {data.title}
      </h3>

      {data.degree && (
        <p
          className="text-[12.5px] mt-1 break-words"
          style={{ color: "var(--ds-fg-tertiary)", letterSpacing: "-0.005em" }}
        >
          {data.degree}
        </p>
      )}

      {data.detail && (
        <div className="mt-3">
          <ExpandableText
            text={data.detail}
            clampLines={2}
            threshold={90}
            className="text-[13px] leading-relaxed break-words"
            style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
          />
        </div>
      )}

      {(data.year || data.marks) && (
        <div
          className="flex items-center justify-between mt-4 pt-3 text-mono-label tabular-nums"
          style={{
            color: "var(--ds-fg-tertiary)",
            boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)",
          }}
        >
          {data.year && <span>{data.year}</span>}
          {data.marks && (
            <span style={{ color: "var(--ds-fg)" }} className="font-semibold">
              {data.marks}
            </span>
          )}
        </div>
      )}
    </article>
  );
};

export default Edu_Card;
