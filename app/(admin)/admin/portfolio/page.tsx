import { createServerSupabaseClient } from "@/lib/supabase/server";
import PortfolioClient from "./client";

export default async function PortfolioPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*, project_technologies(*)")
    .eq("user_id", user.id)
    .order("sort_order");
  return <PortfolioClient data={data ?? []} />;
}
