"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { computeReadingTime, generateSlug, sanitizeContent } from "@/lib/markdown";

// ── helpers ─────────────────────────────────────────────────────────────────

async function getAuthedClient() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

function revalidateAll() {
  revalidatePath("/", "layout");
  revalidatePath("/blog");
}

// Build a unique slug — appends -2, -3 … if the base slug is taken
async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>,
  base: string,
  excludeId?: string
): Promise<string> {
  let candidate = base || "post";
  let i = 1;
  while (true) {
    const query = supabase.from("posts").select("id").eq("slug", candidate).limit(1);
    if (excludeId) query.neq("id", excludeId);
    const { data } = await query;
    if (!data || data.length === 0) return candidate;
    i++;
    candidate = `${base}-${i}`;
  }
}

// ── CRUD ────────────────────────────────────────────────────────────────────

export async function createPost(
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image_url: string;
    seo_title: string;
    seo_description: string;
  },
  tags: string[]
) {
  const { supabase, user } = await getAuthedClient();
  if (!user) return { error: "Not authenticated" };

  const baseSlug = data.slug || generateSlug(data.title);
  const slug = await uniqueSlug(supabase, baseSlug);
  const safeContent = sanitizeContent(data.content);
  const reading_time = computeReadingTime(safeContent);

  const { data: inserted, error } = await supabase
    .from("posts")
    .insert({
      ...data,
      content: safeContent,
      slug,
      reading_time,
      status: "draft",
      user_id: user.id,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  if (tags.length > 0) {
    await supabase
      .from("post_tags")
      .insert(tags.map((tag, i) => ({ post_id: inserted.id, tag, sort_order: i })));
  }

  revalidateAll();
  return { success: true, id: inserted.id, slug };
}

export async function updatePost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    cover_image_url?: string;
    seo_title?: string;
    seo_description?: string;
  },
  tags: string[]
) {
  const { supabase, user } = await getAuthedClient();
  if (!user) return { error: "Not authenticated" };

  const updates: Record<string, unknown> = { ...data };

  if (data.slug) {
    updates.slug = await uniqueSlug(supabase, data.slug, id);
  }
  if (data.content !== undefined) {
    const safeContent = sanitizeContent(data.content);
    updates.content = safeContent;
    updates.reading_time = computeReadingTime(safeContent);
  }

  const { error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  // Replace tags (delete + insert)
  await supabase.from("post_tags").delete().eq("post_id", id);
  if (tags.length > 0) {
    await supabase
      .from("post_tags")
      .insert(tags.map((tag, i) => ({ post_id: id, tag, sort_order: i })));
  }

  revalidateAll();
  return { success: true };
}

export async function publishPost(id: string) {
  const { supabase, user } = await getAuthedClient();
  if (!user) return { error: "Not authenticated" };

  // Preserve original published_at on re-publish
  const { data: current } = await supabase
    .from("posts")
    .select("published_at")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  const { error } = await supabase
    .from("posts")
    .update({
      status: "published",
      published_at: current?.published_at ?? new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}

export async function unpublishPost(id: string) {
  const { supabase, user } = await getAuthedClient();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("posts")
    .update({ status: "draft" })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}

export async function deletePost(id: string) {
  const { supabase, user } = await getAuthedClient();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("posts").delete().eq("id", id).eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidateAll();
  return { success: true };
}
