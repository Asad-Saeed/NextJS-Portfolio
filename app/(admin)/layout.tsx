import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let slug = "";
  let userName = "";
  let userEmail = "";
  if (user) {
    const { data: profile } = await supabase
      .from("profile")
      .select("slug, name, email")
      .eq("user_id", user.id)
      .single();
    slug = profile?.slug || "";
    userName = profile?.name || user.email || "";
    userEmail = profile?.email || user.email || "";
  }

  return (
    <AdminShell slug={slug} userName={userName} userEmail={userEmail}>
      {children}
    </AdminShell>
  );
}
