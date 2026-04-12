import { NextRequest, NextResponse } from "next/server";
import { getGithubContributions } from "@/lib/github";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const year = searchParams.get("year");

  if (!username) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  if (!/^[A-Za-z0-9][A-Za-z0-9-]{0,38}$/.test(username)) {
    return NextResponse.json({ error: "invalid username" }, { status: 400 });
  }

  if (!year || !/^\d{4}$/.test(year)) {
    return NextResponse.json({ error: "year must be a 4-digit year" }, { status: 400 });
  }

  const data = await getGithubContributions(username, year);
  if (!data) {
    return NextResponse.json({ error: "failed to fetch contributions" }, { status: 502 });
  }

  return NextResponse.json(data);
}
