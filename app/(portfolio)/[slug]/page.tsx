export const revalidate = 3600;

import { Suspense } from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import MyExpertise from "@/components/HomeComponents/Expertise/MyExpertise";
import Recommendations from "@/components/HomeComponents/Recommendations/Recommendations";
import ClientReviews from "@/components/HomeComponents/ClientReviews/ClientReviews";
import Certifications from "@/components/HomeComponents/Certifications/Certifications";
import GitHubActivity from "@/components/HomeComponents/GitHub/GitHubActivity";
import GitHubProStats from "@/components/HomeComponents/GitHub/GitHubProStats";
import GitHubAchievements from "@/components/HomeComponents/GitHub/GitHubAchievements";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getExpertise } from "@/lib/queries/expertise";
import { getRecommendations } from "@/lib/queries/recommendations";
import { getReviews } from "@/lib/queries/reviews";
import { getCertifications } from "@/lib/queries/certifications";
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

function SectionSkeleton({ heightClass = "h-32" }: { heightClass?: string }) {
  return (
    <div className="px-4 sm:px-6 py-4">
      <div className={`card_stylings ${heightClass} animate-pulse`} />
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;

  // Only the banner data blocks the initial render. Everything else streams.
  const bannerData = await getBannerData(userId);

  const githubUsernames = profileData.show_github_section
    ? [
        parseGithubUsername(profileData.github_url),
        parseGithubUsername(profileData.secondary_github_url),
      ].filter((u): u is string => Boolean(u))
    : [];
  const showGithub = githubUsernames.length > 0;
  const githubHeading = profileData.github_section_heading || "GitHub Activity";

  const showExpertise = profileData.show_expertise_section !== false;
  const showRecommendations = profileData.show_recommendations_section !== false;
  const showReviews = profileData.show_reviews_section !== false;
  const showCertifications = profileData.show_certifications_section !== false;

  return (
    <div>
      <Banner data={bannerData} />

      {showGithub && (
        <div className="flex flex-col gap-4 px-4 sm:px-6 pt-6 pb-4">
          <Suspense fallback={<div className="card_stylings h-40 animate-pulse" />}>
            <GitHubActivity usernames={githubUsernames} heading={githubHeading} />
          </Suspense>
          <Suspense fallback={<div className="card_stylings h-32 animate-pulse" />}>
            <GitHubProStats usernames={githubUsernames} />
          </Suspense>
          <Suspense fallback={<div className="card_stylings h-24 animate-pulse" />}>
            <GitHubAchievements usernames={githubUsernames} />
          </Suspense>
        </div>
      )}

      {showExpertise && (
        <Suspense fallback={<SectionSkeleton heightClass="h-40" />}>
          <ExpertiseSection userId={userId} />
        </Suspense>
      )}

      {showCertifications && (
        <Suspense fallback={<SectionSkeleton heightClass="h-32" />}>
          <CertificationsSection userId={userId} />
        </Suspense>
      )}

      {showRecommendations && (
        <Suspense fallback={<SectionSkeleton heightClass="h-32" />}>
          <RecommendationsSection userId={userId} />
        </Suspense>
      )}

      {showReviews && (
        <Suspense fallback={<SectionSkeleton heightClass="h-32" />}>
          <ReviewsSection userId={userId} />
        </Suspense>
      )}

      <Suspense fallback={null}>
        <FooterSection userId={userId} />
      </Suspense>
    </div>
  );
}

async function ExpertiseSection({ userId }: { userId: string }) {
  const data = await getExpertise(userId);
  return <MyExpertise data={data} />;
}

async function CertificationsSection({ userId }: { userId: string }) {
  const data = await getCertifications(userId);
  return <Certifications data={data} />;
}

async function RecommendationsSection({ userId }: { userId: string }) {
  const data = await getRecommendations(userId);
  return <Recommendations data={data} />;
}

async function ReviewsSection({ userId }: { userId: string }) {
  const data = await getReviews(userId);
  return <ClientReviews data={data} />;
}

async function FooterSection({ userId }: { userId: string }) {
  const data = await getFooterData(userId);
  return <Footer data={data} />;
}
