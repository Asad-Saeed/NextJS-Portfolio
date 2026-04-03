import { createServerSupabaseClient } from "@/lib/supabase/server";
import SkillsClient from "./client";

export default async function SkillsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("skills")
    .select("*, skill_levels(*)")
    .eq("user_id", user!.id)
    .order("sort_order");
  return <SkillsClient data={data ?? []} />;
}
