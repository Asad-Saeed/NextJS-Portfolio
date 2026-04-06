export const revalidate = 60;

import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import SkillsCards from "@/components/skills/skillsCards";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getSkills } from "@/lib/queries/skills";
import { notFound } from "next/navigation";

export default async function SkillsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = (profileData as any).user_id;
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
