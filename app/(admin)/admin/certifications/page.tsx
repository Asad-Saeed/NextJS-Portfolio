import { createServerSupabaseClient } from "@/lib/supabase/server";
import CertificationsClient from "./client";

export default async function CertificationsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order");
  return <CertificationsClient data={data ?? []} />;
}
