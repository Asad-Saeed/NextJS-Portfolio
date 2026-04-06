"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createSkill(
  data: Record<string, unknown>,
  levels: { title: string; level: string }[]
) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { data: inserted, error } = await supabase
    .from("skills")
    .insert({ ...data, user_id: user.id })
    .select("id")
    .single();
  if (error) return { error: error.message };
  if (levels.length > 0) {
    await supabase.from("skill_levels").insert(
      levels.map((l, i) => ({
        skill_id: inserted.id,
        title: l.title,
        level: l.level,
        sort_order: i,
      }))
    );
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateSkill(
  id: string,
  data: Record<string, unknown>,
  levels: { title: string; level: string }[]
) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("skills").update(data).eq("id", id);
  if (error) return { error: error.message };
  await supabase.from("skill_levels").delete().eq("skill_id", id);
  if (levels.length > 0) {
    await supabase
      .from("skill_levels")
      .insert(
        levels.map((l, i) => ({ skill_id: id, title: l.title, level: l.level, sort_order: i }))
      );
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteSkill(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
