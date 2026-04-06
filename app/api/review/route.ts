import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase/public";

export async function GET() {
  const supabase = getPublicSupabaseClient();
  const { data } = await supabase.from("client_reviews").select("*").order("sort_order");

  const response = (data ?? []).map((r: any) => ({
    id: r.id,
    clientName: r.client_name,
    clientLocation: r.client_location,
    clientSource: r.client_source,
    clientReview: r.client_review,
  }));

  return NextResponse.json(response);
}
