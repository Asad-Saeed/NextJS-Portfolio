export const revalidate = 3600;

import type { Metadata } from "next";
import LayoutShell from "@/components/LayoutShell";
import { getProfileBySlug, getSidebarProfile } from "@/lib/queries/profile";
import { getLanguages, getTechStack, getSidebarSkills } from "@/lib/queries/sidebar";
import { getSiteUrl } from "@/lib/site-url";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);

  if (!profileData) {
    return { title: "Portfolio" };
  }

  const name = profileData.name || "Portfolio";
  const designation = profileData.designation || "A personal portfolio platform";
  const portfolioUrl = `/${slug}`;
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

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);

  if (!profileData) notFound();

  const userId = profileData.user_id;

  const [profile, languages, techStack, sidebarSkills] = await Promise.all([
    getSidebarProfile(userId),
    getLanguages(userId),
    getTechStack(userId),
    getSidebarSkills(userId),
  ]);

  const sidebarData = { profile, languages, techStack, sidebarSkills };

  const siteUrl = getSiteUrl();

  const personUrl = `${siteUrl}/${slug}`;
  const knowsAbout: string[] = [
    ...((profileData.designation || "").split(/[|,]/) as string[]).map((s) => s.trim()),
    ...((profileData.banner_subheadings ?? []) as string[]),
    ...((profileData.code_card_stack || "").split(",") as string[]).map((s) => s.trim()),
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: profileData.name ? `${profileData.name} — Portfolio` : undefined,
    description: profileData.designation || undefined,
    url: personUrl,
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
    },
  };

  return (
    <LayoutShell sidebarData={sidebarData} slug={slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </LayoutShell>
  );
}
