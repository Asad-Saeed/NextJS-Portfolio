"use server";

import { getAdminSupabaseClient } from "@/lib/supabase/admin";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const bucket = formData.get("bucket") as string;

  if (!file || !bucket) return { error: "File and bucket are required" };

  const supabase = getAdminSupabaseClient();
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage.from(bucket).upload(fileName, buffer, {
    upsert: true,
    contentType: file.type,
  });

  if (error) return { error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return { url: publicUrl };
}
