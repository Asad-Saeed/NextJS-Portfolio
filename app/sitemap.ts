export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { getSiteUrl } from "@/lib/site-url";
import { getPortfolioSlug } from "@/lib/portfolio-slug";

const portfolioSubpaths = ["/skills", "/background", "/portfolio", "/contact", "/blog"] as const;

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

  // Look up the active profile (for lastModified), its projects, and published posts
  const [{ data: profile }, { data: projects }, { data: posts }] = await Promise.all([
    supabase.from("profile").select("user_id, slug, updated_at").eq("slug", slug).maybeSingle(),
    supabase
      .from("portfolio_projects")
      .select("user_id, project_slug, updated_at, image_url")
      .not("project_slug", "is", null),
    supabase
      .from("posts")
      .select("slug, updated_at, cover_image_url")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
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

  type PostRow = { slug: string; updated_at: string | null; cover_image_url: string | null };
  const blogEntries: MetadataRoute.Sitemap = ((posts ?? []) as PostRow[])
    .filter((p) => p.slug)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(post.cover_image_url && { images: [post.cover_image_url] }),
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
    ...blogEntries,
  ];
}
