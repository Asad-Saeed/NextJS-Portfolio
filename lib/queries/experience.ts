import { cache } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Experience } from "@/types";

export const getExperience = cache(async (userId: string): Promise<Experience[]> => {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Experience[];
});
