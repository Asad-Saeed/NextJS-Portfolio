import { createServerSupabaseClient } from "@/lib/supabase/server";
import ProfileClient from "./client";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user!.id)
    .single();
  return <ProfileClient profile={profile} />;
}
