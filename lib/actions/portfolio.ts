"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProject(data: Record<string, unknown>, techs: string[]) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { data: inserted, error } = await supabase
    .from("portfolio_projects")
    .insert({ ...data, user_id: user.id })
    .select("id")
    .single();
  if (error) return { error: error.message };
  if (techs.length > 0) {
    await supabase
      .from("project_technologies")
      .insert(techs.map((t, i) => ({ project_id: inserted.id, tech_name: t, sort_order: i })));
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateProject(id: string, data: Record<string, unknown>, techs: string[]) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("portfolio_projects").update(data).eq("id", id);
  if (error) return { error: error.message };
  await supabase.from("project_technologies").delete().eq("project_id", id);
  if (techs.length > 0) {
    await supabase
      .from("project_technologies")
      .insert(techs.map((t, i) => ({ project_id: id, tech_name: t, sort_order: i })));
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
