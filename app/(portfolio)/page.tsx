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
import HashScroller from "@/components/Common/HashScroller";
import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { getExpertise } from "@/lib/queries/expertise";
import { getRecommendations } from "@/lib/queries/recommendations";
import { getReviews } from "@/lib/queries/reviews";
import { getCertifications } from "@/lib/queries/certifications";
import { parseGithubUsername } from "@/lib/github";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  const designation = profileData.designation || "";
  const expertise = profileData.expertise_description || "";
  // Prefer the admin-edited expertise description if available, else fall back to designation.
  const description = expertise || designation;
  const profileImage = profileData.profile_image_url || undefined;
  return {
    title: { absolute: `${name} — Portfolio` },
    description: description || undefined,
    alternates: { canonical: "/" },
    openGraph: {
      title: `${name} — Portfolio`,
      description: description || designation,
      type: "profile",
      url: "/",
      ...(profileImage && {
        images: [{ url: profileImage, alt: name, width: 800, height: 800 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Portfolio`,
      description: description || designation,
      ...(profileImage && { images: [profileImage] }),
    },
  };
}

function GitHubBlockSkeleton() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <div className="ds-skeleton h-3 w-16 mb-2.5 rounded-full" />
          <div className="ds-skeleton h-7 sm:h-8 w-48" />
        </div>
        <div className="ds-skeleton h-3 w-44" />
      </div>
      <div
        className="rounded-xl p-4 sm:p-5 lg:p-6 h-48 sm:h-56"
        style={{
          backgroundColor: "var(--ds-surface)",
          boxShadow: "var(--ds-shadow-border)",
        }}
      />
    </div>
  );
}

function GitHubStatsSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4">
          <div>
            <div className="ds-skeleton h-3 w-14 mb-2.5 rounded-full" />
            <div className="ds-skeleton h-7 sm:h-8 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg flex flex-col gap-2"
              style={{
                backgroundColor: "var(--ds-surface)",
                boxShadow: "var(--ds-shadow-border)",
              }}
            >
              <div className="ds-skeleton h-3 w-16" />
              <div className="ds-skeleton h-7 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GitHubAchievementsSkeleton() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <div className="ds-skeleton h-3 w-20 mb-2.5 rounded-full" />
          <div className="ds-skeleton h-7 sm:h-8 w-44" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-3 sm:p-3.5 rounded-lg flex items-center gap-3"
            style={{
              backgroundColor: "var(--ds-surface)",
              boxShadow: "var(--ds-shadow-border)",
            }}
          >
            <div className="ds-skeleton w-8 h-8 rounded-md" />
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="ds-skeleton h-3 w-20" />
              <div className="ds-skeleton h-2.5 w-16" />
            </div>
            <div className="ds-skeleton h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <div className="ds-skeleton h-3 w-20 mb-2.5 rounded-full" />
          <div className="ds-skeleton h-7 sm:h-8 w-44 sm:w-64" />
        </div>
        <div className="hidden sm:flex flex-col gap-1.5 max-w-sm">
          <div className="ds-skeleton h-3 w-full" />
          <div className="ds-skeleton h-3 w-3/4" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-lg flex flex-col gap-3"
            style={{
              backgroundColor: "var(--ds-surface)",
              boxShadow: "var(--ds-shadow-border)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="ds-skeleton h-3 w-12" />
              <div className="ds-skeleton h-2 w-2 rounded-full" />
            </div>
            <div className="ds-skeleton h-5 w-2/3" />
            <div className="ds-skeleton h-3 w-full" />
            <div className="ds-skeleton h-3 w-3/4" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;

  // Profile already contains every banner field (select * earlier),
  // so reuse it instead of a second DB round-trip.
  const bannerData = profileData;
  // Stack for the hero code card — admin-edited comma-separated list.
  const codeCardStack = (profileData.code_card_stack ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);

  const githubUsernames = profileData.show_github_section
    ? [
        parseGithubUsername(profileData.github_url),
        parseGithubUsername(profileData.secondary_github_url),
      ].filter((u): u is string => Boolean(u))
    : [];
  const showGithub = githubUsernames.length > 0;
  const githubHeading = profileData.github_section_heading ?? "";

  const showExpertise = profileData.show_expertise_section !== false;
  const showRecommendations = profileData.show_recommendations_section !== false;
  const showReviews = profileData.show_reviews_section !== false;
  const showCertifications = profileData.show_certifications_section !== false;

  return (
    <div>
      <HashScroller />
      <Banner
        data={bannerData}
        name={profileData.name}
        designation={profileData.designation}
        stack={codeCardStack}
        availabilityStatus={profileData.availability_status}
      />

      {showGithub && (
        <section className="ds-cv-auto px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10">
          <Suspense fallback={<GitHubBlockSkeleton />}>
            <GitHubActivity usernames={githubUsernames} heading={githubHeading} />
          </Suspense>
          <Suspense fallback={<GitHubStatsSkeleton />}>
            <GitHubProStats
              usernames={githubUsernames}
              statsEyebrow={profileData.github_stats_eyebrow}
              statsHeading={profileData.github_stats_heading}
              languagesEyebrow={profileData.github_languages_eyebrow}
              languagesHeading={profileData.github_languages_heading}
              reposEyebrow={profileData.github_repos_eyebrow}
              reposHeading={profileData.github_repos_heading}
            />
          </Suspense>
          <Suspense fallback={<GitHubAchievementsSkeleton />}>
            <GitHubAchievements
              usernames={githubUsernames}
              eyebrow={profileData.github_achievements_eyebrow}
              heading={profileData.github_achievements_heading}
            />
          </Suspense>
        </section>
      )}

      {showExpertise && (
        <div className="ds-cv-auto">
          <Suspense fallback={<SectionSkeleton count={6} />}>
            <ExpertiseSection
              userId={userId}
              eyebrow={profileData.expertise_eyebrow}
              heading={profileData.expertise_heading}
              description={profileData.expertise_description}
            />
          </Suspense>
        </div>
      )}

      {showCertifications && (
        <div className="ds-cv-auto">
          <Suspense fallback={<SectionSkeleton count={3} />}>
            <CertificationsSection
              userId={userId}
              eyebrow={profileData.certifications_eyebrow}
              heading={profileData.certifications_heading}
              description={profileData.certifications_description}
            />
          </Suspense>
        </div>
      )}

      {showRecommendations && (
        <div className="ds-cv-auto">
          <Suspense fallback={<SectionSkeleton count={3} />}>
            <RecommendationsSection
              userId={userId}
              eyebrow={profileData.recommendations_eyebrow}
              heading={profileData.recommendations_heading}
              description={profileData.recommendations_description}
            />
          </Suspense>
        </div>
      )}

      {showReviews && (
        <div className="ds-cv-auto">
          <Suspense fallback={<SectionSkeleton count={3} />}>
            <ReviewsSection
              userId={userId}
              eyebrow={profileData.reviews_eyebrow}
              heading={profileData.reviews_heading}
              description={profileData.reviews_description}
            />
          </Suspense>
        </div>
      )}

      <Suspense fallback={null}>
        <FooterSection userId={userId} />
      </Suspense>
    </div>
  );
}

interface SectionMeta {
  userId: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
}

async function ExpertiseSection({ userId, eyebrow, heading, description }: SectionMeta) {
  const data = await getExpertise(userId);
  return <MyExpertise data={data} eyebrow={eyebrow} heading={heading} description={description} />;
}

async function CertificationsSection({ userId, eyebrow, heading, description }: SectionMeta) {
  const data = await getCertifications(userId);
  return (
    <Certifications data={data} eyebrow={eyebrow} heading={heading} description={description} />
  );
}

async function RecommendationsSection({ userId, eyebrow, heading, description }: SectionMeta) {
  const data = await getRecommendations(userId);
  return (
    <Recommendations data={data} eyebrow={eyebrow} heading={heading} description={description} />
  );
}

async function ReviewsSection({ userId, eyebrow, heading, description }: SectionMeta) {
  const data = await getReviews(userId);
  return (
    <ClientReviews data={data} eyebrow={eyebrow} heading={heading} description={description} />
  );
}

async function FooterSection({ userId }: { userId: string }) {
  const data = await getFooterData(userId);
  return <Footer data={data} />;
}
