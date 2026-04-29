import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. Same purpose:
//  1. Strip the legacy `/{slug}` prefix from public portfolio URLs (single-tenant migration).
//  2. Hand off to Supabase `updateSession` for auth cookies + admin protection.
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes manage their own auth — bypass entirely.
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Resolve the configured single-tenant slug
  const portfolioSlug = process.env.PORTFOLIO_SLUG || "asad-saeed";

  // Don't strip the slug from admin/auth namespaces (or api, already handled above).
  const isProtectedNamespace = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  if (!isProtectedNamespace) {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && segments[0] === portfolioSlug) {
      const rest = segments.slice(1).join("/");
      const url = request.nextUrl.clone();
      url.pathname = rest ? `/${rest}` : "/";
      return NextResponse.redirect(url, 301);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
