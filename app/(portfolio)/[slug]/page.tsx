export const revalidate = 60;

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import MyExpertise from "@/components/HomeComponents/Expertise/MyExpertise";
import Recommendations from "@/components/HomeComponents/Recommendations/Recommendations";
import ClientReviews from "@/components/HomeComponents/ClientReviews/ClientReviews";
import GitHubActivity from "@/components/HomeComponents/GitHub/GitHubActivity";
import GitHubProStats from "@/components/HomeComponents/GitHub/GitHubProStats";
import GitHubAchievements from "@/components/HomeComponents/GitHub/GitHubAchievements";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getExpertise } from "@/lib/queries/expertise";
import { getRecommendations } from "@/lib/queries/recommendations";
import { getReviews } from "@/lib/queries/reviews";
import { parseGithubUsername } from "@/lib/github";
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
    title: { absolute: `${name} — Portfolio` },
    alternates: { canonical: `/${slug}` },
  };
}

export default async function HomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;

  const [bannerData, expertise, recommendations, reviews, footerData] = await Promise.all([
    getBannerData(userId),
    getExpertise(userId),
    getRecommendations(userId),
    getReviews(userId),
    getFooterData(userId),
  ]);

  const githubUsername = profileData.show_github_section
    ? parseGithubUsername(profileData.github_url)
    : null;
  const githubHeading = profileData.github_section_heading || "GitHub Activity";

  const showExpertise = profileData.show_expertise_section !== false;
  const showRecommendations = profileData.show_recommendations_section !== false;
  const showReviews = profileData.show_reviews_section !== false;

  return (
    <div>
      <Banner data={bannerData} />
      {githubUsername && (
        <div className="flex flex-col gap-4 px-4 sm:px-6 pt-6 pb-4">
          <GitHubActivity username={githubUsername} heading={githubHeading} />
          <GitHubProStats username={githubUsername} />
          <GitHubAchievements username={githubUsername} />
        </div>
      )}
      {showExpertise && <MyExpertise data={expertise} />}
      {showRecommendations && <Recommendations data={recommendations} />}
      {showReviews && <ClientReviews data={reviews} />}
      <Footer data={footerData} />
    </div>
  );
}
