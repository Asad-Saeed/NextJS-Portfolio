import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function GET() {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*, project_technologies(*)")
    .order("sort_order");

  const response = (data ?? []).map((p: any) => ({
    id: p.id,
    projectName: p.project_name,
    url: p.url,
    image: p.image_url,
    projectDetail: p.project_detail,
    technologiesUsed: (p.project_technologies ?? []).map((t: any) => ({ tech: t.tech_name })),
  }));

  return NextResponse.json(response);
}
