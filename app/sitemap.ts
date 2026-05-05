export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { getSiteUrl } from "@/lib/site-url";
import { getPortfolioSlug } from "@/lib/portfolio-slug";

const portfolioSubpaths = ["/skills", "/background", "/portfolio", "/contact"] as const;

type ProfileRow = { user_id: string; slug: string | null; updated_at: string | null };
type ProjectRow = {
  user_id: string;
  project_slug: string | null;
  updated_at: string | null;
  image_url: string | null;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const slug = getPortfolioSlug();
  const supabase = getPublicSupabaseClient();

  const now = new Date();

  // Look up the active profile (for lastModified) and its projects
  const [{ data: profile }, { data: projects }] = await Promise.all([
    supabase.from("profile").select("user_id, slug, updated_at").eq("slug", slug).maybeSingle(),
    supabase
      .from("portfolio_projects")
      .select("user_id, project_slug, updated_at, image_url")
      .not("project_slug", "is", null),
  ]);

  const activeProfile = profile as ProfileRow | null;
  const profileLastModified = activeProfile?.updated_at ? new Date(activeProfile.updated_at) : now;

  const projectEntries: MetadataRoute.Sitemap = (
    activeProfile
      ? ((projects ?? []) as ProjectRow[]).filter(
          (p) => p.user_id === activeProfile.user_id && p.project_slug
        )
      : []
  ).map((project) => ({
    url: `${siteUrl}/portfolio/${project.project_slug}`,
    lastModified: project.updated_at ? new Date(project.updated_at) : profileLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    // Image-sitemap extension — surfaces project screenshots in Google Images.
    ...(project.image_url && { images: [project.image_url] }),
  }));

  const baseEntries: MetadataRoute.Sitemap = portfolioSubpaths.map((sub) => ({
    url: `${siteUrl}${sub}`,
    lastModified: profileLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: profileLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...baseEntries,
    ...projectEntries,
  ];
}
