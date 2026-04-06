import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { Education, Experience } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const supabase = getPublicSupabaseClient();

  const [{ data: education }, { data: experience }] = await Promise.all([
    supabase.from("education").select("*").eq("user_id", userId).order("sort_order"),
    supabase.from("experience").select("*").eq("user_id", userId).order("sort_order"),
  ]);

  const typedEducation = (education ?? []) as Education[];
  const typedExperience = (experience ?? []) as Experience[];

  const response = [
    {
      eduCards: typedEducation.map((e) => ({
        id: e.id,
        title: e.title,
        marks: e.marks,
        degree: e.degree,
        detail: e.detail,
        year: e.year,
      })),
    },
    {
      expCards: typedExperience.map((e) => ({
        id: e.id,
        title: e.title,
        role: e.role,
        url: e.url,
        desc: e.description,
        year: e.year,
        location: e.location,
      })),
    },
  ];

  return NextResponse.json(response);
}
