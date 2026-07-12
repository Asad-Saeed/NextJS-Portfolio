import { createServerSupabaseClient } from "@/lib/supabase/server";
import BlogClient from "./client";
import type { BlogPost } from "@/types";

export default async function BlogAdminPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("posts")
    .select("*, post_tags(*)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return <BlogClient posts={(data ?? []) as BlogPost[]} />;
}
