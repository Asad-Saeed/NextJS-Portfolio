import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getExpertise(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("expertise")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}
