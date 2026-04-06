import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function GET() {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("expertise").select("*").order("sort_order");

  const response = (data ?? []).map((e: any) => ({
    id: e.id,
    title: e.title,
    desc: e.description,
  }));

  return NextResponse.json(response);
}
