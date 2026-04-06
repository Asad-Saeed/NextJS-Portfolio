import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getRecommendations(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}
