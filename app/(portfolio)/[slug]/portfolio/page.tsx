export const revalidate = 60;

import BannerLayout from "@/components/Common/BannerLayout";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/Portfolio/PortfolioCard";
import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { getPortfolio } from "@/lib/queries/portfolio";
import { notFound } from "next/navigation";

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = (profileData as any).user_id;
  const [projects, footerData] = await Promise.all([getPortfolio(userId), getFooterData(userId)]);

  return (
    <BannerLayout>
      <div className="grid justify items-center grid-flow-row md:grid-cols-2 grid-rows-auto gap-4 px-8 my-6">
        {projects.map((item: any) => (
          <PortfolioCard key={item.id} data={item} />
        ))}
      </div>
      <Footer data={footerData} />
    </BannerLayout>
  );
}
