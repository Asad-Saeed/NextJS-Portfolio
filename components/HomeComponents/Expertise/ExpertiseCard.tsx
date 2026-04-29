import { Expertise } from "@/types";

const WORKFLOW_ACCENTS = ["var(--ds-develop)", "var(--ds-preview)", "var(--ds-ship)"];

interface ExpertiseCardProps {
  data: Expertise;
  index?: number;
}

const ExpertiseCard = ({ data, index = 0 }: ExpertiseCardProps) => {
  const accent = WORKFLOW_ACCENTS[index % WORKFLOW_ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group relative h-full p-4 sm:p-5 lg:p-6 rounded-lg transition-all duration-200 min-w-0"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <span className="text-mono-label" style={{ color: "var(--ds-fg-muted)" }}>
          {num}
        </span>
        <span
          className="block w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover:scale-150 shrink-0"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
      </div>

      <h3
        className="text-[1rem] sm:text-[1.0625rem] font-semibold leading-snug mb-2 break-words"
        style={{ color: "var(--ds-fg)", letterSpacing: "-0.02em" }}
      >
        {data.title}
      </h3>

      <p
        className="text-[13px] sm:text-sm leading-relaxed break-words"
        style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
      >
        {data.description}
      </p>
    </article>
  );
};

export default ExpertiseCard;
