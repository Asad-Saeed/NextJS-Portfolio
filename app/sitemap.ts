export const revalidate = 86400;

import type { MetadataRoute } from "next";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { getSiteUrl } from "@/lib/site-url";

const portfolioSubpaths = ["", "/skills", "/background", "/portfolio", "/contact"] as const;

type ProfileRow = { user_id: string; slug: string | null; updated_at: string | null };
type ProjectRow = { user_id: string; project_slug: string | null; updated_at: string | null };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const supabase = getPublicSupabaseClient();

  const [{ data: profiles }, { data: projects }] = await Promise.all([
    supabase.from("profile").select("user_id, slug, updated_at").not("slug", "is", null),
    supabase
      .from("portfolio_projects")
      .select("user_id, project_slug, updated_at")
      .not("project_slug", "is", null),
  ]);

  const now = new Date();
  const projectsByUser = new Map<string, ProjectRow[]>();
  for (const project of (projects ?? []) as ProjectRow[]) {
    if (!project.project_slug) continue;
    const list = projectsByUser.get(project.user_id) ?? [];
    list.push(project);
    projectsByUser.set(project.user_id, list);
  }

  const portfolioEntries: MetadataRoute.Sitemap = ((profiles ?? []) as ProfileRow[]).flatMap(
    (profile) => {
      if (!profile.slug) return [];
      const profileLastModified = profile.updated_at ? new Date(profile.updated_at) : now;

      const baseEntries = portfolioSubpaths.map((sub) => ({
        url: `${siteUrl}/${profile.slug}${sub}`,
        lastModified: profileLastModified,
        changeFrequency: "weekly" as const,
        priority: sub === "" ? 0.9 : 0.7,
      }));

      const projectEntries = (projectsByUser.get(profile.user_id) ?? []).map((project) => ({
        url: `${siteUrl}/${profile.slug}/portfolio/${project.project_slug}`,
        lastModified: project.updated_at ? new Date(project.updated_at) : profileLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

      return [...baseEntries, ...projectEntries];
    }
  );

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...portfolioEntries,
  ];
}
