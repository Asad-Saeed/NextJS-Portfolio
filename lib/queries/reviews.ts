import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getReviews(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("client_reviews")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}
