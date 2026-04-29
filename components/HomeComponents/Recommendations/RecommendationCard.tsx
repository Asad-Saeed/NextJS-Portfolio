import Image from "next/image";
import Link from "next/link";
import { FaQuoteLeft, FaLinkedin } from "react-icons/fa";
import { Recommendation } from "@/types";

const RecommendationCard = ({ data }: { data: Recommendation }) => {
  const imageUrl = data?.image_url || "";
  const linkedinUrl = data?.linkedin_url || "";

  return (
    <article
      className="group relative h-full p-4 sm:p-5 lg:p-6 rounded-lg flex flex-col gap-3 sm:gap-4 transition-all duration-200 min-w-0"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      <FaQuoteLeft
        size={14}
        className="opacity-50"
        style={{ color: "var(--ds-fg-muted)" }}
        aria-hidden
      />

      <p
        className="text-[13px] sm:text-[14px] leading-relaxed flex-1 break-words"
        style={{
          color: "var(--ds-fg-secondary)",
          letterSpacing: "-0.005em",
        }}
      >
        {data?.view}
      </p>

      <footer
        className="flex items-center gap-3 pt-4"
        style={{ boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)" }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={data?.name || ""}
            width={36}
            height={36}
            sizes="36px"
            className="w-9 h-9 rounded-full object-cover shrink-0"
            style={{ boxShadow: "var(--ds-shadow-border-light)" }}
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full shrink-0"
            style={{
              backgroundColor: "var(--ds-surface-subtle)",
              boxShadow: "var(--ds-shadow-border-light)",
            }}
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {linkedinUrl ? (
              <Link
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[13px] font-semibold truncate hover:underline"
                style={{ color: "var(--ds-fg)", letterSpacing: "-0.015em" }}
              >
                {data?.name}
              </Link>
            ) : (
              <span
                className="text-[13px] font-semibold truncate"
                style={{ color: "var(--ds-fg)", letterSpacing: "-0.015em" }}
              >
                {data?.name}
              </span>
            )}
            {linkedinUrl && (
              <FaLinkedin size={11} style={{ color: "var(--ds-fg-muted)" }} aria-hidden />
            )}
          </div>
          <div
            className="text-[11.5px] truncate"
            style={{ color: "var(--ds-fg-tertiary)", letterSpacing: "-0.005em" }}
          >
            {data?.designation}
          </div>
        </div>
      </footer>
    </article>
  );
};

export default RecommendationCard;
