"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { revalidatePath } from "next/cache";

export async function sendMessage(data: {
  slug: string;
  sender_name: string;
  sender_email: string;
  message: string;
}) {
  if (!data.slug || !data.sender_name || !data.sender_email || !data.message) {
    return { error: "All fields are required" };
  }

  const supabase = getPublicSupabaseClient();
  if (!supabase) return { error: "Service unavailable" };

  // Resolve user_id server-side from the public slug — never trust a client-provided user_id
  const { data: profile } = (await supabase
    .from("profile")
    .select("user_id")
    .eq("slug", data.slug)
    .single()) as { data: { user_id: string } | null };

  if (!profile?.user_id) {
    return { error: "Recipient not found" };
  }

  const { error } = await supabase.from("messages").insert({
    user_id: profile.user_id,
    sender_name: data.sender_name,
    sender_email: data.sender_email,
    message: data.message,
  } as unknown as never);

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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("messages").delete().eq("id", id).eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { success: true };
}
