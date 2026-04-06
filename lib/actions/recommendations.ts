"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createRecommendation(data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("recommendations").insert({ ...data, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateRecommendation(id: string, data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("recommendations").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteRecommendation(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("recommendations").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
