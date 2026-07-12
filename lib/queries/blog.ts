import { cache } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { BlogPost } from "@/types";

const LIST_SELECT =
  "id, user_id, title, slug, excerpt, cover_image_url, status, reading_time, published_at, seo_title, seo_description, created_at, updated_at, post_tags(*)";

export const getPublishedPosts = cache(
  async ({ page = 1, pageSize = 9 }: { page?: number; pageSize?: number } = {}): Promise<
    BlogPost[]
  > => {
    const supabase = getPublicSupabaseClient();
    if (!supabase) return [];
    const from = (page - 1) * pageSize;
    const { data } = await supabase
      .from("posts")
      .select(LIST_SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, from + pageSize - 1);
    return (data ?? []) as BlogPost[];
  }
);

export const getLatestPosts = cache(async (limit = 4): Promise<BlogPost[]> => {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("posts")
    .select(LIST_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as BlogPost[];
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("posts")
    .select("*, post_tags(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return (data ?? null) as BlogPost | null;
});

export async function getRelatedPosts(
  postId: string,
  tags: string[],
  limit = 3
): Promise<BlogPost[]> {
  if (!tags.length) return [];
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  // Get post IDs that share at least one tag with the current post
  const { data: tagRows } = await supabase
    .from("post_tags")
    .select("post_id")
    .in("tag", tags)
    .neq("post_id", postId);
  const relatedIds = [...new Set((tagRows ?? []).map((r: { post_id: string }) => r.post_id))].slice(
    0,
    limit * 3
  );
  if (!relatedIds.length) return [];
  const { data } = await supabase
    .from("posts")
    .select(LIST_SELECT)
    .in("id", relatedIds)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as BlogPost[];
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase.from("posts").select("slug").eq("status", "published");
  return ((data ?? []) as { slug: string }[]).map((p) => p.slug).filter(Boolean);
}

export async function getPublishedPostCount(): Promise<number> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return 0;
  const { count } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("status", "published");
  return count ?? 0;
}
