export const revalidate = 60;

import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import MyExpertise from "@/components/HomeComponents/Expertise/MyExpertise";
import Recommendations from "@/components/HomeComponents/Recommendations/Recommendations";
import ClientReviews from "@/components/HomeComponents/ClientReviews/ClientReviews";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getExpertise } from "@/lib/queries/expertise";
import { getRecommendations } from "@/lib/queries/recommendations";
import { getReviews } from "@/lib/queries/reviews";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = (profileData as any).user_id;

  const [bannerData, expertise, recommendations, reviews, footerData] = await Promise.all([
    getBannerData(userId),
    getExpertise(userId),
    getRecommendations(userId),
    getReviews(userId),
    getFooterData(userId),
  ]);

  return (
    <div className="Home-Page -z-10">
      <Banner data={bannerData} />
      <MyExpertise data={expertise} />
      <Recommendations data={recommendations} />
      <ClientReviews data={reviews} />
      <Footer data={footerData} />
    </div>
  );
}
