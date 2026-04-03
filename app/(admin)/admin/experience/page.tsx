import { createServerSupabaseClient } from "@/lib/supabase/server";
import ExperienceClient from "./client";

export default async function ExperiencePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .eq("user_id", user!.id)
    .order("sort_order");
  return <ExperienceClient data={data ?? []} />;
}
