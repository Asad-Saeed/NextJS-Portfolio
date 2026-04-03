import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getSkills(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("skills")
    .select("*, skill_levels(*)")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}
