export const revalidate = 3600;

import type { Metadata } from "next";
import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/Portfolio/PortfolioCard";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getPortfolio } from "@/lib/queries/portfolio";
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
    title: "Projects",
    description: `Selected projects and case studies by ${name}.`,
    alternates: { canonical: `/${slug}/portfolio` },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const [bannerData, projects, footerData] = await Promise.all([
    getBannerData(userId),
    getPortfolio(userId),
    getFooterData(userId),
  ]);

  return (
    <div>
      <Banner data={bannerData} heading={bannerData?.portfolio_banner_heading} />
      <div className="px-4 sm:px-6 py-4 text-lg font-semibold text-Green">My Projects</div>
      <div className="grid grid-flow-row md:grid-cols-2 gap-4 px-4 sm:px-6 mb-6">
        {projects.map((item) => (
          <PortfolioCard key={item.id} data={item} slug={slug} />
        ))}
      </div>
      <Footer data={footerData} />
    </div>
  );
}
