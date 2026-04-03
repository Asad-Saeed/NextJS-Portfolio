import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function getProfileBySlug(slug: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("profile").select("*").eq("slug", slug).single();
  return data;
}

export async function getProfile(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("profile").select("*").eq("user_id", userId).single();
  return data;
}

export async function getBannerData(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("profile")
    .select(
      "banner_heading, banner_subheadings, completed_projects_count, freelance_clients_count, honors_count, upwork_url"
    )
    .eq("user_id", userId)
    .single();
  return data;
}

export async function getSidebarProfile(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("profile")
    .select(
      "name, designation, profile_image_url, resume_url, email, phone, github_url, linkedin_url, upwork_url, residence, nationality, city, age"
    )
    .eq("user_id", userId)
    .single();
  return data;
}

export async function getFooterData(userId: string) {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("profile")
    .select("footer_text, copyright_year, email, upwork_url")
    .eq("user_id", userId)
    .single();
  return data;
}
