import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { PortfolioProject } from "@/types";

export async function getPortfolio(userId: string): Promise<PortfolioProject[]> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*, project_technologies(*)")
    .eq("user_id", userId)
    .order("sort_order");
  return (data ?? []) as PortfolioProject[];
}
