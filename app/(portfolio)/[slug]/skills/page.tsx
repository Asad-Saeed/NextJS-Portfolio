export const revalidate = 3600;

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import SkillsCards from "@/components/skills/skillsCards";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getSkills } from "@/lib/queries/skills";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  return {
    title: "Skills",
    description: `Technical skills and expertise of ${name}.`,
    alternates: { canonical: `/${slug}/skills` },
  };
}

export default async function SkillsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const [bannerData, skills, footerData] = await Promise.all([
    getBannerData(userId),
    getSkills(userId),
    getFooterData(userId),
  ]);

  return (
    <div>
      <Banner data={bannerData} heading={bannerData?.skills_banner_heading} />
      <SkillsCards data={skills} />
      <Footer data={footerData} />
    </div>
  );
}
