"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createReview(data: Record<string, unknown>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("client_reviews").insert({ ...data, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateReview(id: string, data: Record<string, unknown>) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("client_reviews").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteReview(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("client_reviews").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
