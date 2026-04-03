import AdminShell from "@/components/admin/AdminShell";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let slug = "";
  if (user) {
    const { data: profile } = await supabase
      .from("profile")
      .select("slug")
      .eq("user_id", user.id)
      .single();
    slug = profile?.slug || "";
  }

  return <AdminShell slug={slug}>{children}</AdminShell>;
}
