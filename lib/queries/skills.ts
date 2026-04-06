import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Skill } from "@/types";

export async function getSkills(userId: string): Promise<Skill[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("skills")
    .select("*, skill_levels(*)")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Skill[];
}
