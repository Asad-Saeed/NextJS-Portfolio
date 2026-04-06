export const revalidate = 60;

import LayoutShell from "@/components/LayoutShell";
import { getProfileBySlug, getSidebarProfile } from "@/lib/queries/profile";
import { getLanguages, getTechStack, getSidebarSkills } from "@/lib/queries/sidebar";
import { notFound } from "next/navigation";

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);

  if (!profileData) notFound();

  const userId = profileData.user_id;

  const [profile, languages, techStack, sidebarSkills] = await Promise.all([
    getSidebarProfile(userId),
    getLanguages(userId),
    getTechStack(userId),
    getSidebarSkills(userId),
  ]);

  const sidebarData = { profile, languages, techStack, sidebarSkills };

  return (
    <LayoutShell sidebarData={sidebarData} slug={slug}>
      {children}
    </LayoutShell>
  );
}
