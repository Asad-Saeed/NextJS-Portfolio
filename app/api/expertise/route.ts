import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { Expertise } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("expertise")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");

  const typed = (data ?? []) as Expertise[];
  const response = typed.map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.description,
  }));

  return NextResponse.json(response);
}
