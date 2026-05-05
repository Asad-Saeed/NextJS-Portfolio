export const revalidate = 3600;

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import SkillsCards from "@/components/skills/skillsCards";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getSkills } from "@/lib/queries/skills";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { getSiteUrl } from "@/lib/site-url";
import { safeJsonLd } from "@/lib/json-ld";
import { parseCodeCardStack } from "@/lib/code-card-stack";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  const description =
    profileData.skills_description ||
    profileData.skills_banner_heading ||
    `Technical skills and expertise of ${name}.`;
  const heading = profileData.skills_heading || "Skills";
  const url = "/skills";
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

export default async function SkillsPage() {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const bannerData = profileData;
  const footerData = profileData;
  const skills = await getSkills(userId);

  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: profileData.name || "Portfolio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Skills", item: `${siteUrl}/skills` },
    ],
  };

  const skillsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: profileData.skills_heading || "Skills",
    itemListElement: skills.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.tech_name,
      ...(s.url && { url: s.url }),
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(skillsItemListJsonLd) }}
      />
      <Banner
        data={bannerData}
        heading={bannerData?.skills_banner_heading}
        name={profileData.name}
        designation={profileData.designation}
        stack={parseCodeCardStack(profileData.code_card_stack)}
        availabilityStatus={profileData.availability_status}
      />
      <SkillsCards
        data={skills}
        eyebrow={profileData.skills_eyebrow}
        heading={profileData.skills_heading}
        description={profileData.skills_description}
      />
      <Footer data={footerData} />
    </div>
  );
}
