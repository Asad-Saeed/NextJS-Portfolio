import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Language, TechStack, SidebarSkill } from "@/types";

export async function getLanguages(userId: string): Promise<Language[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("languages")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as Language[];
}

export async function getTechStack(userId: string): Promise<TechStack[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("tech_stack")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as TechStack[];
}

export async function getSidebarSkills(userId: string): Promise<SidebarSkill[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("sidebar_skills")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as SidebarSkill[];
}
