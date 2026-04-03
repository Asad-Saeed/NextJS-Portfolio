"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createLanguage(data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("languages").insert({ ...data, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
export async function updateLanguage(id: string, data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("languages").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
export async function deleteLanguage(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("languages").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function createTechStack(data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("tech_stack").insert({ ...data, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
export async function updateTechStack(id: string, data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("tech_stack").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
export async function deleteTechStack(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("tech_stack").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function createSidebarSkill(data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("sidebar_skills").insert({ ...data, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
export async function updateSidebarSkill(id: string, data: Record<string, any>) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("sidebar_skills").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
export async function deleteSidebarSkill(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("sidebar_skills").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
