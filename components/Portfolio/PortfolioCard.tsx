import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import Badge from "../Common/Badge";
import ExpandableText from "../Common/ExpandableText";
import Tooltip from "@/components/Common/Tooltip";
import { PortfolioProject, ProjectTechnology } from "@/types";

const ACCENTS = ["#3291ff", "#ff4d8d", "#ff5b4f"];

interface PortfolioCardProps {
  data: PortfolioProject;
  index?: number;
}

const PortfolioCard = ({ data, index = 0 }: PortfolioCardProps) => {
  const imageUrl = data?.image_url || "";
  const projectName = data?.project_name || "Project";
  const projectDetail = data?.project_detail;
  const techs = data?.project_technologies || [];
  const hasCaseStudy = !!(data.challenge || data.solution || data.impact);
  const accent = ACCENTS[index % ACCENTS.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group relative rounded-xl overflow-hidden flex flex-col transition-all duration-200 min-w-0"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      {/* Image header — short banner strip like skill cards */}
      {imageUrl && (
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 4",
            backgroundColor: "var(--ds-surface-subtle)",
            boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)",
          }}
        >
          <Image
            src={imageUrl}
            alt={projectName}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-[0.3] group-hover:opacity-50 transition-opacity duration-300"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 30%, var(--ds-surface) 100%)",
            }}
          />

          {/* Top-row badge */}
          <div className="absolute top-2.5 left-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-mono-label"
              style={{
                backgroundColor: "color-mix(in srgb, var(--ds-bg) 80%, transparent)",
                color: "var(--ds-fg-secondary)",
                boxShadow: "var(--ds-shadow-border)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
                aria-hidden
              />
              PROJECT · {num}
            </span>
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1 gap-3">
        {/* Title row */}
        <header className="flex items-start justify-between gap-3">
          <h3
            className="text-[16px] sm:text-[17px] font-semibold leading-snug break-words flex-1 min-w-0"
            style={{ color: "var(--ds-fg)", letterSpacing: "-0.02em" }}
          >
            {projectName}
          </h3>
          {data?.url && (
            <Tooltip content="Open link">
              <a
                href={data.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit ${projectName}`}
                className="shrink-0 flex h-7 w-7 items-center justify-center rounded-md transition-colors"
                style={{
                  color: "var(--ds-fg-secondary)",
                  boxShadow: "var(--ds-shadow-border-light)",
                }}
              >
                <FiExternalLink size={13} />
              </a>
            </Tooltip>
          )}
        </header>

        {/* Description with Read more */}
        {projectDetail && (
          <ExpandableText
            text={projectDetail}
            clampLines={2}
            threshold={110}
            className="text-[13px] leading-relaxed break-words"
            style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
          />
        )}

        {/* Tech chips */}
        {techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {techs.map((t: ProjectTechnology, i: number) => (
              <Badge key={i} title={t.tech_name} />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        {hasCaseStudy && data.project_slug && (
          <div
            className="mt-auto pt-3 flex items-center justify-between"
            style={{ boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)" }}
          >
            <span className="text-mono-label" style={{ color: "var(--ds-fg-muted)" }}>
              Case study
            </span>
            <Link
              href={`/portfolio/${data.project_slug}`}
              aria-label={`Read more about ${projectName}`}
              className="inline-flex items-center gap-1 text-[13px] font-medium transition-colors hover:underline"
              style={{ color: "var(--ds-link)", letterSpacing: "-0.01em" }}
            >
              Read more
              <FiArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default PortfolioCard;
