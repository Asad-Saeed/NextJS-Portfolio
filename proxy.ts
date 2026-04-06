import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
