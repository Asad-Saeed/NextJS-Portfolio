"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createEducation(data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("education").insert({ ...data, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateEducation(id: string, data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("education").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteEducation(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
