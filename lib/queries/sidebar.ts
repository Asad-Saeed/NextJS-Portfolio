import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getLanguages(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("languages")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}

export async function getTechStack(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("tech_stack")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}

export async function getSidebarSkills(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("sidebar_skills")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}
