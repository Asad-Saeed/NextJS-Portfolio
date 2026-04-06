import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { notFound } from "next/navigation";
import ContactClient from "./client";

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const [bannerData, footerData] = await Promise.all([
    getBannerData(userId),
    getFooterData(userId),
  ]);

  return (
    <ContactClient
      profile={profileData}
      userId={userId}
      footerData={footerData}
      bannerData={bannerData}
    />
  );
}
