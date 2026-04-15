import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function RootPage() {
  // If logged in, redirect to own portfolio
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("profile")
        .select("slug")
        .eq("user_id", user.id)
        .single();

      if (profile?.slug) {
        redirect(`/${profile.slug}`);
      }
    }
  } catch {
    // Not logged in
  }

  // Not logged in — redirect to default portfolio
  const defaultSlug = process.env.NEXT_PUBLIC_DEFAULT_SLUG || "asad-saeed";
  redirect(`/${defaultSlug}`);
}
