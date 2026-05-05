import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { ClientReview } from "@/types";

const ReviewCard = ({ data }: { data: ClientReview }) => {
  const name = data?.client_name;
  const location = data?.client_location;
  const source = data?.client_source;
  const review = data?.client_review;

  return (
    <article
      className="flex flex-col justify-between w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] shrink-0 p-4 sm:p-5 lg:p-6 rounded-lg min-w-0"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div
            className="text-[14px] font-semibold truncate"
            style={{ color: "var(--ds-fg)", letterSpacing: "-0.015em" }}
          >
            {name}
          </div>
          {location && (
            <div
              className="flex items-center gap-1 mt-0.5 text-[12px]"
              style={{ color: "var(--ds-fg-tertiary)", letterSpacing: "-0.005em" }}
            >
              <FiMapPin size={11} />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>
        {source && (
          <span className="shrink-0 text-mono-label" style={{ color: "var(--ds-fg-muted)" }}>
            {source}
          </span>
        )}
      </header>

      <p
        className="text-[13.5px] leading-relaxed flex-1"
        style={{
          color: "var(--ds-fg-secondary)",
          letterSpacing: "-0.005em",
        }}
      >
        {review}
      </p>

      <div
        role="img"
        aria-label="5 out of 5 stars"
        className="inline-flex items-center gap-1 self-start mt-4 px-2 py-1 rounded-full"
        style={{
          backgroundColor: "var(--ds-surface-subtle)",
          boxShadow: "var(--ds-shadow-border-light)",
          color: "var(--ds-fg)",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <FaStar key={i} size={9} aria-hidden />
        ))}
      </div>
    </article>
  );
};

export default ReviewCard;
