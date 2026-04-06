import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function GET() {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("recommendations").select("*").order("sort_order");

  const response = (data ?? []).map((r: any) => ({
    id: r.id,
    name: r.name,
    image: r.image_url,
    designation: r.designation,
    view: r.view,
    linkednURL: r.linkedin_url,
  }));

  return NextResponse.json(response);
}
