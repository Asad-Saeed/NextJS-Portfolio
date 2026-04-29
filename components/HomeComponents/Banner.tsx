import Link from "next/link";
import dynamic from "next/dynamic";
import TypewriterText from "./TypewriterText";
import CapabilitiesLink from "./CapabilitiesLink";
import HashLink from "@/components/Common/HashLink";
import AnimatedCounter from "./AnimatedCounter";
import { BannerData } from "@/lib/queries/profile";

// Code card is xl-only (hidden < 1280px) and below the LCP — defer its
// JS so mobile gets a smaller initial bundle.
const DeveloperCodeCard = dynamic(() => import("./DeveloperCodeCard"), {
  loading: () => null,
});

interface BannerProps {
  data: BannerData | null;
  heading?: string;
  name?: string;
  designation?: string;
  stack?: string[];
  availabilityStatus?: string;
}

const Banner = ({ data, heading, name, designation, stack, availabilityStatus }: BannerProps) => {
  const buttonText = data?.explore_button_text ?? "";
  const buttonUrl = data?.explore_button_url || data?.upwork_url;

  const stats = [
    {
      label: "Projects",
      value: data?.completed_projects_count,
      accent: "var(--ds-link)",
      href: "/portfolio",
    },
    {
      label: "Companies",
      value: data?.freelance_clients_count,
      accent: "var(--ds-console-pink)",
      href: "/background",
    },
    {
      label: "Honors",
      value: data?.honors_count,
      accent: "var(--ds-ship)",
      href: "/#certifications",
    },
  ];

  const displayName = name || heading || data?.banner_heading || "";

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--ds-bg)" }}
    >
      {/* Atmospheric gradient mesh — slow drift for living feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ds-fade"
        style={{
          backgroundImage: `
            radial-gradient(900px 500px at 12% 10%, rgba(10, 114, 239, 0.18), transparent 60%),
            radial-gradient(700px 400px at 88% 18%, rgba(222, 29, 141, 0.10), transparent 65%),
            radial-gradient(600px 400px at 60% 100%, rgba(255, 91, 79, 0.08), transparent 60%)
          `,
        }}
      />

      {/* Dotted grid micro-texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] ds-fade"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 50%, transparent 90%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-6 pb-8 sm:pt-8 sm:pb-10">
        {/* Eyebrow row */}
        <div className="ds-rise flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-4 min-w-0">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-mono-label"
            style={{
              backgroundColor: "var(--ds-badge-bg)",
              color: "var(--ds-badge-fg)",
              boxShadow: "var(--ds-shadow-border)",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--ds-develop)" }}
            />
            Available for work
          </span>
          <span
            className="text-mono-label hidden sm:inline-block"
            style={{ color: "var(--ds-fg-muted)" }}
          >
            ·
          </span>
          <span className="text-mono-label" style={{ color: "var(--ds-fg-tertiary)" }}>
            v1 · 2026
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-8 xl:gap-10 items-center">
          <div className="min-w-0">
            {/* Display name — shimmer sweep on first paint */}
            <h1
              className="ds-rise ds-delay-1 ds-text-shimmer font-semibold leading-[1] break-words"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                letterSpacing: "-0.05em",
              }}
            >
              {displayName}
            </h1>

            {/* Designation */}
            {designation && (
              <p
                className="ds-rise ds-delay-2 mt-3 sm:mt-4 font-medium leading-[1.2] break-words"
                style={{
                  color: "var(--ds-fg-secondary)",
                  fontSize: "clamp(1rem, 2vw, 1.625rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                {designation}
              </p>
            )}

            {/* Mono typewriter line */}
            <div
              className="ds-rise ds-delay-3 mt-4 sm:mt-5 font-mono text-[12px] sm:text-[13px] leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1"
              style={{ color: "var(--ds-fg-tertiary)" }}
            >
              <span style={{ color: "var(--ds-develop)" }}>{"→"}</span>
              <span>I am a</span>
              <span className="inline-block font-medium min-w-0" style={{ color: "var(--ds-fg)" }}>
                <TypewriterText strings={data?.banner_subheadings} />
              </span>
            </div>

            {/* CTAs */}
            <div className="ds-rise ds-delay-4 mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5">
              {buttonUrl && (
                <Link
                  className="ds-btn-primary group"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={buttonUrl}
                >
                  {buttonText}
                  <span
                    aria-hidden
                    className="-mr-0.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              )}
              <CapabilitiesLink>See capabilities</CapabilitiesLink>
            </div>
          </div>

          {/* Developer code-card — admin-managed via Profile + tech_stack */}
          <DeveloperCodeCard
            name={name}
            designation={designation}
            stack={stack}
            availabilityStatus={availabilityStatus}
          />
        </div>

        {/* Stats — animated counters with workflow accent dots */}
        <div
          className="ds-rise ds-delay-5 mt-8 sm:mt-12 lg:mt-14 grid grid-cols-3 rounded-xl overflow-hidden"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          {stats.map((stat, i) => {
            const cellClass =
              "group relative px-3 py-4 sm:px-6 sm:py-6 lg:px-7 lg:py-7 transition-colors duration-200 min-w-0 hover:[background-color:var(--ds-surface-subtle)]";
            const cellStyle: React.CSSProperties = {
              boxShadow: i > 0 ? "inset 1px 0 0 0 var(--ds-border-shadow)" : undefined,
            };
            const cellInner = (
              <>
                {/* Accent fill that rises on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ backgroundColor: stat.accent }}
                />

                <div
                  className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 min-w-0"
                  style={{ color: "var(--ds-fg-tertiary)" }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0"
                    style={{ backgroundColor: stat.accent }}
                    aria-hidden
                  />
                  <span className="text-[10px] sm:text-[12px] font-mono font-medium uppercase tracking-wider truncate">
                    {stat.label}
                  </span>
                </div>
                <div
                  className="text-[clamp(1.25rem,3.2vw,2.5rem)] font-semibold leading-none"
                  style={{ color: "var(--ds-fg)", letterSpacing: "-0.04em" }}
                >
                  <AnimatedCounter value={stat.value} delay={i * 120} />
                </div>
              </>
            );
            if (stat.label === "Honors") {
              return (
                <HashLink
                  key={stat.label}
                  targetId="certifications"
                  aria-label={`View ${stat.label}`}
                  className={cellClass}
                  style={cellStyle}
                >
                  {cellInner}
                </HashLink>
              );
            }
            return (
              <Link
                key={stat.label}
                href={stat.href}
                aria-label={`View ${stat.label}`}
                className={cellClass}
                style={cellStyle}
              >
                {cellInner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Banner;
