export const dynamic = "force-dynamic";

import type { MetadataRoute } from "next";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

const portfolioSubpaths = ["", "/skills", "/background", "/portfolio", "/contact"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const supabase = getPublicSupabaseClient();
  const { data: profiles } = await supabase
    .from("profile")
    .select("slug, updated_at")
    .not("slug", "is", null);

  const now = new Date();

  const portfolioEntries: MetadataRoute.Sitemap = (profiles ?? []).flatMap(
    (profile: { slug: string | null; updated_at: string | null }) => {
      if (!profile.slug) return [];
      const lastModified = profile.updated_at ? new Date(profile.updated_at) : now;
      return portfolioSubpaths.map((sub) => ({
        url: `${siteUrl}/${profile.slug}${sub}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: sub === "" ? 0.9 : 0.7,
      }));
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
