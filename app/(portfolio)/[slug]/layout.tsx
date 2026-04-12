export const revalidate = 60;

import type { Metadata } from "next";
import LayoutShell from "@/components/LayoutShell";
import { getProfileBySlug, getSidebarProfile } from "@/lib/queries/profile";
import { getLanguages, getTechStack, getSidebarSkills } from "@/lib/queries/sidebar";
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

  return {
    title: {
      default: `${name} — Portfolio`,
      template: `%s | ${name} — Portfolio`,
    },
    description: designation,
    alternates: {
      canonical: portfolioUrl,
    },
    openGraph: {
      title: `${name} — Portfolio`,
      description: designation,
      url: portfolioUrl,
      type: "profile",
      siteName: `${name} — Portfolio`,
      ...(profileImage && {
        images: [
          {
            url: profileImage,
            alt: name,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Portfolio`,
      description: designation,
      ...(profileImage && { images: [profileImage] }),
    },
    robots: {
      index: true,
      follow: true,
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profileData.name || undefined,
      jobTitle: profileData.designation || undefined,
      url: `${siteUrl}/${slug}`,
      ...(profileData.profile_image_url && { image: profileData.profile_image_url }),
      ...(profileData.email && { email: profileData.email }),
      ...(profileData.city &&
        profileData.residence && {
          address: {
            "@type": "PostalAddress",
            addressLocality: profileData.city,
            addressRegion: profileData.residence,
          },
        }),
      sameAs: [profileData.github_url, profileData.linkedin_url, profileData.upwork_url].filter(
        Boolean
      ),
      ...(profileData.designation && {
        knowsAbout: profileData.designation.split("|").map((s: string) => s.trim()),
      }),
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
