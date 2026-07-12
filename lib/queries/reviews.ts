import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { ClientReview } from "@/types";

export async function getReviews(userId: string): Promise<ClientReview[]> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("client_reviews")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as ClientReview[];
}
