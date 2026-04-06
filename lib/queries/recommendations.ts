import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Recommendation } from "@/types";

export async function getRecommendations(userId: string): Promise<Recommendation[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Recommendation[];
}
