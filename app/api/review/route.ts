import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";
import { ClientReview } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const supabase = getPublicSupabaseClient();
  if (!supabase) return NextResponse.json([], { status: 200 });
  const { data } = await supabase
    .from("client_reviews")
    .select("*")
    .eq("user_id", userId)
    .order("sort_order");

  const typed = (data ?? []) as ClientReview[];
  const response = typed.map((r) => ({
    id: r.id,
    clientName: r.client_name,
    clientLocation: r.client_location,
    clientSource: r.client_source,
    clientReview: r.client_review,
  }));

  return NextResponse.json(response);
}
