import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { PortfolioProject, ProjectTechnology } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const supabase = getPublicSupabaseClient();
  if (!supabase) return NextResponse.json([], { status: 200 });
  const { data } = await supabase
    .from("portfolio_projects")
    .select("*, project_technologies(*)")
    .eq("user_id", userId)
    .order("sort_order");

  const typed = (data ?? []) as PortfolioProject[];
  const response = typed.map((p) => ({
    id: p.id,
    projectName: p.project_name,
    url: p.url,
    image: p.image_url,
    projectDetail: p.project_detail,
    technologiesUsed: (p.project_technologies ?? []).map((t: ProjectTechnology) => ({
      tech: t.tech_name,
    })),
  }));

  return NextResponse.json(response);
}
