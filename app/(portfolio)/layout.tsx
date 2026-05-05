export const revalidate = 3600;

import type { Metadata } from "next";
import LayoutShell from "@/components/LayoutShell";
import { getProfileBySlug, getSidebarProfile } from "@/lib/queries/profile";
import { getLanguages, getTechStack, getSidebarSkills } from "@/lib/queries/sidebar";
import { getExperience } from "@/lib/queries/experience";
import { getEducation } from "@/lib/queries/education";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { parseCodeCardStack } from "@/lib/code-card-stack";
import { getSiteUrl } from "@/lib/site-url";
import { safeJsonLd } from "@/lib/json-ld";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);

  if (!profileData) {
    return { title: "Portfolio" };
  }

  const name = profileData.name || "Portfolio";
  const designation = profileData.designation || "A personal portfolio platform";
  const portfolioUrl = "/";
  const profileImage = profileData.profile_image_url || undefined;

  // Build a richer SEO description using admin-managed content where available.
  const expertiseLine = profileData.expertise_description || "";
  const reviewLine = profileData.recommendations_description || "";
  const fullDescription = [designation, expertiseLine, reviewLine].filter(Boolean).join(" — ");
  const seoDescription = fullDescription.length > 50 ? fullDescription : designation;

  // Keywords pulled from designation (separated by | or ,) plus banner subheadings.
  const keywords: string[] = [
    ...(profileData.designation || "")
      .split(/[|,]/)
      .map((s: string) => s.trim())
      .filter(Boolean),
    ...((profileData.banner_subheadings ?? []) as string[]),
  ];

  return {
    title: {
      default: `${name} — Portfolio`,
      template: `%s | ${name} — Portfolio`,
    },
    description: seoDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name }],
    creator: name,
    publisher: name,
    alternates: {
      canonical: portfolioUrl,
    },
    openGraph: {
      title: `${name} — Portfolio`,
      description: seoDescription,
      url: portfolioUrl,
      type: "profile",
      siteName: `${name} — Portfolio`,
      ...(profileImage && {
        images: [{ url: profileImage, alt: name, width: 800, height: 800 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Portfolio`,
      description: seoDescription,
      ...(profileImage && { images: [profileImage] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);

  if (!profileData) notFound();

  const userId = profileData.user_id;

  const [profile, languages, techStack, sidebarSkills, experience, education] = await Promise.all([
    getSidebarProfile(userId),
    getLanguages(userId),
    getTechStack(userId),
    getSidebarSkills(userId),
    getExperience(userId),
    getEducation(userId),
  ]);

  const sidebarData = { profile, languages, techStack, sidebarSkills };

  const siteUrl = getSiteUrl();

  const personUrl = siteUrl;
  const knowsAbout: string[] = [
    ...((profileData.designation || "").split(/[|,]/) as string[]).map((s) => s.trim()),
    ...((profileData.banner_subheadings ?? []) as string[]),
    ...parseCodeCardStack(profileData.code_card_stack, Infinity),
  ].filter(Boolean);

  // Latest job → schema.org "worksFor". Education entries → "alumniOf".
  const currentJob = experience[0];
  const alumniOf = education
    .map((e) => (e.title || "").trim())
    .filter(Boolean)
    .map((name) => ({ "@type": "EducationalOrganization" as const, name }));

  // Spoken languages → schema.org "knowsLanguage". Strips proficiency annotations
  // like "English (Fluent)" so the value matches what Google expects.
  const knowsLanguage = languages
    .map((l) => (l.name || "").replace(/\s*\(.*?\)\s*$/, "").trim())
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: profileData.name ? `${profileData.name} — Portfolio` : undefined,
    description: profileData.designation || undefined,
    url: personUrl,
    inLanguage: "en",
    ...(profileData.updated_at && { dateModified: profileData.updated_at }),
    mainEntity: {
      "@type": "Person",
      name: profileData.name || undefined,
      jobTitle: profileData.designation || undefined,
      description: profileData.designation || undefined,
      url: personUrl,
      ...(profileData.profile_image_url && { image: profileData.profile_image_url }),
      ...(profileData.email && { email: profileData.email }),
      ...(profileData.phone && { telephone: profileData.phone.split(/[/|]/)[0]?.trim() }),
      ...(profileData.city &&
        profileData.residence && {
          address: {
            "@type": "PostalAddress",
            addressLocality: profileData.city,
            addressRegion: profileData.residence,
            ...(profileData.nationality && { addressCountry: profileData.nationality }),
          },
        }),
      ...(profileData.nationality && { nationality: profileData.nationality }),
      sameAs: [
        profileData.github_url,
        profileData.secondary_github_url,
        profileData.linkedin_url,
        profileData.upwork_url,
        profileData.fiverr_url,
      ].filter(Boolean),
      ...(knowsAbout.length > 0 && { knowsAbout: Array.from(new Set(knowsAbout)) }),
      ...(knowsLanguage.length > 0 && { knowsLanguage }),
      ...(currentJob?.title && {
        worksFor: {
          "@type": "Organization",
          name: currentJob.title,
          ...(currentJob.url && { url: currentJob.url }),
        },
      }),
      ...(alumniOf.length > 0 && { alumniOf }),
      ...(profileData.designation && {
        hasOccupation: {
          "@type": "Occupation",
          name: profileData.designation,
          ...(knowsAbout.length > 0 && { skills: Array.from(new Set(knowsAbout)).join(", ") }),
        },
      }),
    },
  };

  // Site-level identity — separate from Person, helps Google index the
  // portfolio domain itself (sitelinks, search-box eligibility).
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profileData.name ? `${profileData.name} — Portfolio` : "Portfolio",
    url: siteUrl,
    ...(profileData.name && {
      author: { "@type": "Person", name: profileData.name, url: siteUrl },
    }),
    inLanguage: "en",
  };

  return (
    <LayoutShell sidebarData={sidebarData} phone={profileData.phone}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
      />
      {children}
    </LayoutShell>
  );
}
