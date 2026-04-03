import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getExperience(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}
