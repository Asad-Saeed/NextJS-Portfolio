import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Experience } from "@/types";

export async function getExperience(userId: string): Promise<Experience[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Experience[];
}
