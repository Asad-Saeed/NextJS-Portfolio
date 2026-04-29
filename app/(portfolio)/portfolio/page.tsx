export const revalidate = 3600;

import type { Metadata } from "next";
import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/Portfolio/PortfolioCard";
import SectionHeader from "@/components/Common/SectionHeader";
import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { getPortfolio } from "@/lib/queries/portfolio";
import { getSiteUrl } from "@/lib/site-url";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  const heading =
    profileData.portfolio_heading || profileData.portfolio_banner_heading || "Projects";
  const description =
    profileData.portfolio_description || `Selected projects and case studies by ${name}.`;
  const url = "/portfolio";
  const profileImage = profileData.profile_image_url || undefined;
  return {
    title: heading,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${heading} | ${name}`,
      description,
      url,
      type: "website",
      siteName: `${name} — Portfolio`,
      ...(profileImage && { images: [{ url: profileImage, alt: name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${heading} | ${name}`,
      description,
      ...(profileImage && { images: [profileImage] }),
    },
  };
}

export default async function PortfolioPage() {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const bannerData = profileData;
  const [projects, footerData] = await Promise.all([getPortfolio(userId), getFooterData(userId)]);

  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${profileData.name || "Portfolio"}`,
    itemListElement: projects
      .filter((p) => p.project_slug)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/portfolio/${p.project_slug}`,
        name: p.project_name,
      })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Banner
        data={bannerData}
        heading={bannerData?.portfolio_banner_heading}
        name={profileData.name}
        designation={profileData.designation}
        stack={(profileData.code_card_stack ?? "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
          .slice(0, 3)}
        availabilityStatus={profileData.availability_status}
      />
      <section
        aria-labelledby="portfolio-heading"
        className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto"
      >
        <SectionHeader
          id="portfolio-heading"
          eyebrow={profileData.portfolio_eyebrow ?? ""}
          title={profileData.portfolio_heading ?? ""}
          description={profileData.portfolio_description}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {projects.map((item, idx) => (
            <PortfolioCard key={item.id} data={item} index={idx} />
          ))}
        </div>
      </section>
      <Footer data={footerData} />
    </div>
  );
}
