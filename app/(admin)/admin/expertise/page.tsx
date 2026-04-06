import { createServerSupabaseClient } from "@/lib/supabase/server";
import ExpertiseClient from "./client";

export default async function ExpertisePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("expertise")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order");
  return <ExpertiseClient data={data ?? []} />;
}
