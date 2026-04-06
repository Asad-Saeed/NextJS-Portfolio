"use server";

import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendMessage(data: {
  user_id: string;
  sender_name: string;
  sender_email: string;
  message: string;
}) {
  if (!data.sender_name || !data.sender_email || !data.message) {
    return { error: "All fields are required" };
  }

  // Use admin client to bypass RLS for public insert
  const supabase = getAdminSupabaseClient();
  const { error } = await supabase.from("messages").insert(data as any);

  if (error) return { error: error.message };
  return { success: true };
}

export async function getMessages() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function markAsRead(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("messages").update({ is_read: true }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}
