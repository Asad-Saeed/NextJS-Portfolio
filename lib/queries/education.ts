import { cache } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Education } from "@/types";

export const getEducation = cache(async (userId: string): Promise<Education[]> => {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Education[];
});
