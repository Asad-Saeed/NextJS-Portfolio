import Link from "next/link";
import { MdMail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import FiverrFIcon from "@/components/Common/FiverrFIcon";
import Tooltip from "@/components/Common/Tooltip";
import { FooterData } from "@/types";

interface FooterProps {
  data?: FooterData | null;
}

const Footer = ({ data }: FooterProps) => {
  const year = data?.copyright_year || `${new Date().getFullYear()}`;
  const footerText = data?.footer_text ?? "";
  const upworkUrl = data?.upwork_url || "";
  const email = data?.email || "";
  const githubUrl = data?.github_url || "";
  const linkedinUrl = data?.linkedin_url || "";
  const fiverrUrl = data?.fiverr_url || "";
  const name = data?.name || "";

  // Pulse the heart glyph if the footer text contains one.
  const heartIndex = footerText.search(
    /[❤\u{1F90D}\u{1F90E}\u{1F90F}\u{1F498}\u{1F49B}\u{1F49C}\u{1F49A}\u{1F499}\u{1F496}]/u
  );
  const renderFooterText = () => {
    if (heartIndex === -1) return <span>{footerText}</span>;
    const before = footerText.slice(0, heartIndex);
    const heart = footerText.slice(heartIndex, heartIndex + 1);
    const after = footerText.slice(heartIndex + 1);
    return (
      <span>
        {before}
        <span className="inline-block align-[-1px] mx-0.5 motion-safe:animate-pulse" aria-hidden>
          {heart}
        </span>
        {after}
      </span>
    );
  };

  const socials: { href: string; label: string; Icon: typeof FaGithub }[] = [];
  if (githubUrl) socials.push({ href: githubUrl, label: "GitHub", Icon: FaGithub });
  if (linkedinUrl) socials.push({ href: linkedinUrl, label: "LinkedIn", Icon: FaLinkedin });
  if (upworkUrl) socials.push({ href: upworkUrl, label: "Upwork", Icon: SiUpwork });
  if (fiverrUrl) socials.push({ href: fiverrUrl, label: "Fiverr", Icon: FiverrFIcon });
  if (email) socials.push({ href: `mailto:${email}`, label: "Email", Icon: MdMail });

  const Copyright = (
    <div className="flex items-center gap-2 min-w-0">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full shrink-0 motion-safe:animate-pulse"
        style={{ backgroundColor: "var(--ds-develop)" }}
        aria-hidden
      />
      <span className="text-mono-label truncate" style={{ color: "var(--ds-fg-tertiary)" }}>
        © {year}
        {name ? <span className="opacity-70"> · {name}</span> : null}
      </span>
    </div>
  );

  const MadeWith = (
    <div
      className="text-[12.5px] text-center"
      style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
    >
      {upworkUrl ? (
        <Link
          href={upworkUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 transition-colors hover:underline"
          style={{ color: "var(--ds-fg)" }}
        >
          {renderFooterText()}
        </Link>
      ) : (
        <span style={{ color: "var(--ds-fg)" }}>{renderFooterText()}</span>
      )}
    </div>
  );

  const Socials = socials.length > 0 && (
    <div className="flex items-center gap-1 shrink-0">
      {socials.map(({ href, label, Icon }) => (
        <Tooltip key={label} content={label} side="top">
          <Link
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
            aria-label={label}
            className="group flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150 hover:[color:var(--ds-fg)]"
            style={{
              color: "var(--ds-fg-secondary)",
              boxShadow: "var(--ds-shadow-border-light)",
            }}
          >
            <Icon
              size={13}
              aria-hidden
              className="transition-transform duration-150 group-hover:scale-110"
            />
          </Link>
        </Tooltip>
      ))}
    </div>
  );

  return (
    <footer className="mt-8 mb-20 lg:mb-3 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div
        aria-hidden
        className="ds-divider mb-4 sm:mb-5"
        style={{ backgroundColor: "var(--ds-border-light)" }}
      />

      <div
        className="rounded-md px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        style={{
          backgroundColor: "var(--ds-surface)",
          boxShadow: "var(--ds-shadow-border)",
        }}
      >
        {/* Mobile-only: copyright + socials side-by-side */}
        <div className="flex items-center justify-between gap-3 sm:hidden">
          {Copyright}
          {Socials}
        </div>

        {/* Mobile-only: made-with centered on its own row */}
        <div className="sm:hidden">{MadeWith}</div>

        {/* Desktop only: 3-column flex */}
        <div className="hidden sm:flex sm:flex-1">{Copyright}</div>
        <div className="hidden sm:flex sm:flex-1 sm:justify-center">{MadeWith}</div>
        <div className="hidden sm:flex sm:flex-1 sm:justify-end">{Socials}</div>
      </div>
    </footer>
  );
};

export default Footer;
