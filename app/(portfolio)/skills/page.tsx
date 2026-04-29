export const revalidate = 3600;

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import SkillsCards from "@/components/skills/skillsCards";
import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { getSkills } from "@/lib/queries/skills";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
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
  const [skills, footerData] = await Promise.all([getSkills(userId), getFooterData(userId)]);

  return (
    <div>
      <Banner
        data={bannerData}
        heading={bannerData?.skills_banner_heading}
        name={profileData.name}
        designation={profileData.designation}
        stack={(profileData.code_card_stack ?? "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
          .slice(0, 3)}
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
