import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function GET() {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("skills").select("*, skill_levels(*)").order("sort_order");

  const response = (data ?? []).map((s: any) => ({
    id: s.id,
    techName: s.tech_name,
    url: s.url,
    image: s.image_url,
    skill: (s.skill_levels ?? []).map((l: any) => ({ title: l.title, level: l.level })),
    description: s.description,
  }));

  return NextResponse.json(response);
}
