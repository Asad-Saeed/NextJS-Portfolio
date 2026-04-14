import { NextRequest, NextResponse } from "next/server";
import { getMergedGithubContributions } from "@/lib/github";

const USERNAME_RE = /^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const usernameParam = searchParams.get("username");
  const year = searchParams.get("year");

  if (!usernameParam) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  const usernames = usernameParam
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
  if (usernames.length === 0 || usernames.some((u) => !USERNAME_RE.test(u))) {
    return NextResponse.json({ error: "invalid username" }, { status: 400 });
  }

  if (!year || !/^(last|\d{4})$/.test(year)) {
    return NextResponse.json({ error: "year must be 'last' or a 4-digit year" }, { status: 400 });
  }

  const data = await getMergedGithubContributions(usernames, year);
  if (!data) {
    return NextResponse.json({ error: "failed to fetch contributions" }, { status: 502 });
  }

  return NextResponse.json(data);
}
