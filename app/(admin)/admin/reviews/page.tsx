import { createServerSupabaseClient } from "@/lib/supabase/server";
import ReviewsClient from "./client";

export default async function ReviewsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("client_reviews")
    .select("*")
    .eq("user_id", user!.id)
    .order("sort_order");
  return <ReviewsClient data={data ?? []} />;
}
