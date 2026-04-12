import { cache } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import type { Profile, FooterData } from "@/types";

export type BannerData = Pick<
  Profile,
  | "banner_heading"
  | "banner_subheadings"
  | "completed_projects_count"
  | "freelance_clients_count"
  | "honors_count"
  | "upwork_url"
  | "skills_banner_heading"
  | "background_banner_heading"
  | "portfolio_banner_heading"
  | "contact_banner_heading"
  | "banner_image_url"
  | "banner_emoji_url"
  | "explore_button_text"
  | "explore_button_url"
>;

export const getProfileBySlug = cache(async (slug: string): Promise<Profile | null> => {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("profile").select("*").eq("slug", slug).single();
  return data as Profile | null;
});

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("profile").select("*").eq("user_id", userId).single();
  return data as Profile | null;
}

export async function getBannerData(userId: string): Promise<BannerData | null> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("profile").select("*").eq("user_id", userId).single();
  return data as BannerData | null;
}

export async function getSidebarProfile(userId: string): Promise<Partial<Profile> | null> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("profile")
    .select(
      "name, designation, profile_image_url, resume_url, email, phone, github_url, linkedin_url, upwork_url, residence, nationality, city, age, availability_status"
    )
    .eq("user_id", userId)
    .single();
  return data as Partial<Profile> | null;
}

export async function getFooterData(userId: string): Promise<FooterData | null> {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("profile")
    .select("footer_text, copyright_year, email, upwork_url")
    .eq("user_id", userId)
    .single();
  return data as FooterData | null;
}
