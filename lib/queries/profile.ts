import { getPublicSupabaseClient } from "@/lib/supabase/public";

export interface BannerData {
  banner_heading: string;
  banner_subheadings: string[];
  completed_projects_count: string;
  freelance_clients_count: string;
  honors_count: string;
  upwork_url: string;
  skills_banner_heading: string;
  background_banner_heading: string;
  portfolio_banner_heading: string;
  contact_banner_heading: string;
  banner_image_url: string;
  banner_emoji_url: string;
  explore_button_text: string;
  explore_button_url: string;
}

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

export async function getBannerData(userId: string): Promise<BannerData | null> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("profile").select("*").eq("user_id", userId).single();
  return data as BannerData | null;
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
