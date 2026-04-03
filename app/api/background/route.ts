import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function GET() {
  const supabase = getPublicSupabaseClient();

  const [{ data: education }, { data: experience }] = await Promise.all([
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("experience").select("*").order("sort_order"),
  ]);

  const response = [
    {
      eduCards: (education ?? []).map((e: any) => ({
        id: e.id,
        title: e.title,
        marks: e.marks,
        degree: e.degree,
        detail: e.detail,
        year: e.year,
      })),
    },
    {
      expCards: (experience ?? []).map((e: any) => ({
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
