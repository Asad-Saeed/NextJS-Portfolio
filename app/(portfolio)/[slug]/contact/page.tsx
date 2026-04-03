import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { notFound } from "next/navigation";
import ContactClient from "./client";
import Footer from "@/components/Footer";

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = (profileData as any).user_id;
  const footerData = await getFooterData(userId);

  return <ContactClient profile={profileData} userId={userId} footerData={footerData} />;
}
