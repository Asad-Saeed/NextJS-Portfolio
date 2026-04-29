import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import FiverrFIcon from "@/components/Common/FiverrFIcon";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/Common/SectionHeader";
import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { getSiteUrl } from "@/lib/site-url";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { notFound } from "next/navigation";
import ContactForm from "./client";

export async function generateMetadata(): Promise<Metadata> {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  const heading = profileData.contact_heading || "Contact";
  const description = profileData.contact_description || `Get in touch with ${name}.`;
  const url = "/contact";
  const profileImage = profileData.profile_image_url || undefined;
  return {
    title: heading,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${heading} | ${name}`,
      description,
      url,
      type: "profile",
      siteName: `${name} — Portfolio`,
      ...(profileImage && { images: [{ url: profileImage, alt: name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${heading} | ${name}`,
      description,
      ...(profileImage && { images: [profileImage] }),
    },
  };
}

export default async function ContactPage() {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const bannerData = profileData;
  const footerData = await getFooterData(userId);

  const siteUrl = getSiteUrl();
  const sameAs = [profileData.github_url, profileData.linkedin_url, profileData.upwork_url].filter(
    Boolean
  );
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name || undefined,
    url: `${siteUrl}/contact`,
    ...(profileData.profile_image_url && { image: profileData.profile_image_url }),
    ...(profileData.email && { email: profileData.email }),
    ...(profileData.phone && { telephone: profileData.phone }),
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "personal",
      ...(profileData.email && { email: profileData.email }),
      ...(profileData.phone && { telephone: profileData.phone }),
      availableLanguage: ["English"],
    },
  };

  const email = profileData.email || "";
  const github = profileData.github_url || "";
  const linkedin = profileData.linkedin_url || "";
  const upwork = profileData.upwork_url || "";
  const fiverr = profileData.fiverr_url || "";
  const phone = profileData.phone || "";
  const phones = phone
    .split(/[/|]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const city = profileData.city || "";
  const residence = profileData.residence || "";
  const location = [city, residence].filter(Boolean).join(", ");

  type ContactItem = {
    label: string;
    value: string;
    href?: string;
    Icon: typeof FiMail;
  };

  const contactItems: ContactItem[] = [];
  if (email)
    contactItems.push({
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      Icon: FiMail,
    });
  if (phones.length > 0)
    contactItems.push({
      label: "Phone",
      value: phones.join(" · "),
      href: `https://wa.me/${phones[0].replace(/[^0-9]/g, "")}`,
      Icon: FiPhone,
    });
  if (location)
    contactItems.push({
      label: "Based in",
      value: location,
      Icon: FiMapPin,
    });

  const socials: { label: string; href: string; Icon: typeof FaGithub }[] = [];
  if (github) socials.push({ label: "GitHub", href: github, Icon: FaGithub });
  if (linkedin) socials.push({ label: "LinkedIn", href: linkedin, Icon: FaLinkedin });
  if (upwork) socials.push({ label: "Upwork", href: upwork, Icon: SiUpwork });
  if (fiverr) socials.push({ label: "Fiverr", href: fiverr, Icon: FiverrFIcon });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div>
        <Banner
          data={bannerData}
          heading={bannerData?.contact_banner_heading}
          name={profileData.name}
          designation={profileData.designation}
          stack={(profileData.code_card_stack ?? "")
            .split(",")
            .map((s: string) => s.trim())
            .filter(Boolean)
            .slice(0, 3)}
          availabilityStatus={profileData.availability_status}
        />

        {/* Contact info + socials */}
        <section
          aria-labelledby="contact-info-heading"
          className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto"
        >
          <SectionHeader
            id="contact-info-heading"
            eyebrow={profileData.contact_eyebrow ?? ""}
            title={profileData.contact_heading ?? ""}
            description={profileData.contact_description}
          />

          {contactItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {contactItems.map((item) => {
                const Inner = (
                  <>
                    <div
                      className="flex items-center gap-2 text-mono-label mb-3"
                      style={{ color: "var(--ds-fg-tertiary)" }}
                    >
                      <item.Icon size={11} />
                      {item.label}
                    </div>
                    <div
                      className="text-[14px] font-medium break-words"
                      style={{ color: "var(--ds-fg)", letterSpacing: "-0.015em" }}
                    >
                      {item.value}
                    </div>
                  </>
                );
                const cardClass =
                  "group relative p-4 sm:p-5 rounded-lg transition-all duration-200 min-w-0";
                const cardStyle: React.CSSProperties = {
                  backgroundColor: "var(--ds-surface)",
                  boxShadow: "var(--ds-shadow-border)",
                };
                return item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className={`${cardClass} hover:[background-color:var(--ds-surface-subtle)]`}
                    style={cardStyle}
                  >
                    {Inner}
                  </Link>
                ) : (
                  <div key={item.label} className={cardClass} style={cardStyle}>
                    {Inner}
                  </div>
                );
              })}
            </div>
          )}

          {/* Social rail */}
          {socials.length > 0 && (
            <div
              className="mt-3 flex items-center justify-between gap-3 px-4 py-3 rounded-lg"
              style={{
                backgroundColor: "var(--ds-surface)",
                boxShadow: "var(--ds-shadow-border)",
              }}
            >
              <span
                className="text-mono-label hidden sm:inline-block"
                style={{ color: "var(--ds-fg-tertiary)" }}
              >
                Find me online
              </span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                {socials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="group flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:[color:var(--ds-fg)]"
                    style={{
                      color: "var(--ds-fg-secondary)",
                      boxShadow: "var(--ds-shadow-border-light)",
                    }}
                  >
                    <Icon
                      size={14}
                      aria-hidden
                      className="transition-transform duration-150 group-hover:scale-110"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Form */}
        <section
          aria-labelledby="contact-form-heading"
          className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto"
        >
          <SectionHeader
            id="contact-form-heading"
            eyebrow={profileData.contact_form_eyebrow ?? ""}
            title={profileData.contact_form_heading ?? ""}
            description={profileData.contact_form_description}
          />
          <ContactForm slug={slug} />
        </section>

        <Footer data={footerData} />
      </div>
    </>
  );
}
