import Link from "next/link";
import { FiExternalLink, FiMapPin } from "react-icons/fi";
import ExpandableText from "@/components/Common/ExpandableText";
import { Experience } from "@/types";

const ACCENTS = ["var(--ds-develop)", "var(--ds-preview)", "var(--ds-ship)"];

interface ExpCardProps {
  data: Experience;
  index?: number;
}

const Exp_Card = ({ data, index = 0 }: ExpCardProps) => {
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
          EXP · {num}
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

      {data.role && (
        <p
          className="text-[12.5px] mt-1 break-words"
          style={{ color: "var(--ds-fg-tertiary)", letterSpacing: "-0.005em" }}
        >
          {data.role}
        </p>
      )}

      {data.url && (
        <Link
          href={data.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-mono-label mt-1.5 hover:underline w-fit"
          style={{ color: "var(--ds-link)" }}
        >
          <FiExternalLink size={10} />
          Visit website
        </Link>
      )}

      {data.description && (
        <div className="mt-3">
          <ExpandableText
            text={data.description}
            clampLines={3}
            threshold={130}
            className="text-[13px] leading-relaxed break-words"
            style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
          />
        </div>
      )}

      {(data.year || data.location) && (
        <div
          className="flex items-center justify-between gap-3 mt-4 pt-3 text-mono-label tabular-nums"
          style={{
            color: "var(--ds-fg-tertiary)",
            boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)",
          }}
        >
          {data.year && <span>{data.year}</span>}
          {data.location && (
            <span className="inline-flex items-center gap-1 truncate">
              <FiMapPin size={10} />
              {data.location}
            </span>
          )}
        </div>
      )}
    </article>
  );
};

export default Exp_Card;
