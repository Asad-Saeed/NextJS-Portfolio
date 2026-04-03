import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getEducation(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return data ?? [];
}
