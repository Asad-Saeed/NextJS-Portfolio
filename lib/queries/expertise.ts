import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Expertise } from "@/types";

export async function getExpertise(userId: string): Promise<Expertise[]> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("expertise")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Expertise[];
}
