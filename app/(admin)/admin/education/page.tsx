import { createServerSupabaseClient } from "@/lib/supabase/server";
import EducationClient from "./client";

export default async function EducationPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order");
  return <EducationClient data={data ?? []} />;
}
