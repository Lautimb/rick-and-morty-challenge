import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.RICK_MORTY_API_BASE_URL;

if (!BASE) {
  throw new Error("Missing required env var: RICK_MORTY_API_BASE_URL");
}

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get("ids");

  if (!ids) {
    return NextResponse.json([], { status: 200 });
  }

  const res = await fetch(`${BASE}/episode/${ids}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch episodes" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
