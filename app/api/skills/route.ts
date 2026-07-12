import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { Skill, SkillLevel } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const supabase = getPublicSupabaseClient();
  if (!supabase) return NextResponse.json([], { status: 200 });
  const { data } = await supabase
    .from("skills")
    .select("*, skill_levels(*)")
    .eq("user_id", userId)
    .order("sort_order");

  const typed = (data ?? []) as Skill[];
  const response = typed.map((s) => ({
    id: s.id,
    techName: s.tech_name,
    url: s.url,
    image: s.image_url,
    skill: (s.skill_levels ?? []).map((l: SkillLevel) => ({ title: l.title, level: l.level })),
    description: s.description,
  }));

  return NextResponse.json(response);
}
