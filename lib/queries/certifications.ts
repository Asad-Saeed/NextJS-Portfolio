import { cache } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Certification } from "@/types";

export const getCertifications = cache(async (userId: string): Promise<Certification[]> => {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Certification[];
});
