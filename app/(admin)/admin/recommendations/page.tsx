import { createServerSupabaseClient } from "@/lib/supabase/server";
import RecommendationsClient from "./client";

export default async function RecommendationsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", user!.id)
    .order("sort_order");
  return <RecommendationsClient data={data ?? []} />;
}
