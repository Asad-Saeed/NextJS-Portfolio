import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { PortfolioProject } from "@/types";

export async function getPortfolio(userId: string): Promise<PortfolioProject[]> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*, project_technologies(*)")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as PortfolioProject[];
}

export async function getProjectBySlug(
  userId: string,
  projectSlug: string
): Promise<PortfolioProject | null> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*, project_technologies(*)")
    .eq("user_id", userId)
    .eq("project_slug", projectSlug)
    .maybeSingle();
  return data as PortfolioProject | null;
}
