"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCertification(data: Record<string, unknown>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };
  const { error } = await supabase.from("certifications").insert({ ...data, user_id: user.id });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateCertification(id: string, data: Record<string, unknown>) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { user_id: _u, id: _i, ...updateData } = data;

  const { error } = await supabase
    .from("certifications")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteCertification(id: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { success: true };
}
