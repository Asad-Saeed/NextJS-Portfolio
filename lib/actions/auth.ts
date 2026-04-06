"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  // Use admin client (service role) to bypass RLS for signup
  const adminSupabase = getAdminSupabaseClient();

  // Create auth user via admin client
  const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) return { error: authError.message };
  if (!authData.user) return { error: "Failed to create user" };

  // Generate unique slug
  let slug = generateSlug(name);
  const { data: existing } = await adminSupabase
    .from("profile")
    .select("slug")
    .eq("slug", slug)
    .single();

  if (existing) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  // Create initial profile (admin client bypasses RLS)
  const profileData = {
    user_id: authData.user.id,
    name,
    slug,
    designation: "",
    email,
  };
  const { error: profileError } = await adminSupabase
    .from("profile")
    .insert(profileData as unknown as never);

  if (profileError) return { error: profileError.message };

  // Now sign in the user with the server client (sets session cookies)
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signInWithPassword({ email, password });

  redirect("/admin");
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}

export async function signOut() {
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

  await supabase.auth.signOut();
  redirect(slug ? `/${slug}` : "/");
}
