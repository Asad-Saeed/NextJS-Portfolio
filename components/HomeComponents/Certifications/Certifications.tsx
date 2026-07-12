import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiShield } from "react-icons/fi";
import SectionHeader from "@/components/Common/SectionHeader";
import { Certification } from "@/types";

interface CertificationsProps {
  data: Certification[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

const Certifications = ({ data, eyebrow, heading, description }: CertificationsProps) => {
  if (!data?.length) return null;

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="px-5 sm:px-8 py-4 sm:py-5 scroll-mt-8"
    >
      <SectionHeader
        id="certifications-heading"
        eyebrow={eyebrow ?? ""}
        title={heading ?? ""}
        description={description}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((cert) => (
          <article
            key={cert.id}
            className="group flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg transition-all duration-200 min-w-0"
            style={{
              backgroundColor: "var(--ds-surface)",
              boxShadow: "var(--ds-shadow-border)",
            }}
          >
            {cert.badge_image_url ? (
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--ds-surface-subtle)",
                  boxShadow: "var(--ds-shadow-border-light)",
                }}
              >
                <Image
                  src={cert.badge_image_url}
                  alt={cert.title}
                  width={56}
                  height={56}
                  sizes="56px"
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
            ) : (
              <div
                className="w-14 h-14 rounded-md shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--ds-surface-subtle)",
                  boxShadow: "var(--ds-shadow-border-light)",
                  color: "var(--ds-develop)",
                }}
              >
                <FiShield size={22} />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3
                className="text-[13px] sm:text-[14px] font-semibold leading-snug line-clamp-2 break-words"
                style={{ color: "var(--ds-fg)", letterSpacing: "-0.015em" }}
              >
                {cert.title}
              </h3>
              {cert.issuer && (
                <p
                  className="text-[12.5px] mt-1 truncate"
                  style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
                >
                  {cert.issuer}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                {cert.issue_date && (
                  <span className="text-mono-label" style={{ color: "var(--ds-fg-muted)" }}>
                    {cert.issue_date}
                  </span>
                )}
                {cert.credential_url && (
                  <>
                    {cert.issue_date && (
                      <span style={{ color: "var(--ds-fg-muted)" }} aria-hidden>
                        ·
                      </span>
                    )}
                    <Link
                      href={cert.credential_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-mono-label hover:underline"
                      style={{ color: "var(--ds-link)" }}
                    >
                      Verify <FiExternalLink size={10} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
