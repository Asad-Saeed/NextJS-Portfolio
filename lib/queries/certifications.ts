import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Certification } from "@/types";

export async function getCertifications(userId: string): Promise<Certification[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Certification[];
}
