export const revalidate = 60;

import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/Portfolio/PortfolioCard";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getPortfolio } from "@/lib/queries/portfolio";
import { notFound } from "next/navigation";

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = (profileData as any).user_id;
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
        {projects.map((item: any) => (
          <PortfolioCard key={item.id} data={item} />
        ))}
      </div>
      <Footer data={footerData} />
    </div>
  );
}
