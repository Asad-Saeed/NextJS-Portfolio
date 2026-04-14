import type { Metadata } from "next";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { notFound } from "next/navigation";
import ContactClient from "./client";

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
    title: "Contact",
    description: `Get in touch with ${name}.`,
    alternates: { canonical: `/${slug}/contact` },
  };
}

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
      slug={slug}
      footerData={footerData}
      bannerData={bannerData}
    />
  );
}
