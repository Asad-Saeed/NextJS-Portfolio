import { createServerSupabaseClient } from "@/lib/supabase/server";
import SidebarClient from "./client";

export default async function SidebarPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const uid = user!.id;
  const [{ data: languages }, { data: techStack }, { data: sidebarSkills }] = await Promise.all([
    supabase.from("languages").select("*").eq("user_id", uid).order("sort_order"),
    supabase.from("tech_stack").select("*").eq("user_id", uid).order("sort_order"),
    supabase.from("sidebar_skills").select("*").eq("user_id", uid).order("sort_order"),
  ]);
  return (
    <SidebarClient
      languages={languages ?? []}
      techStack={techStack ?? []}
      sidebarSkills={sidebarSkills ?? []}
    />
  );
}
