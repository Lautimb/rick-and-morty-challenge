import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.RICK_MORTY_API_BASE_URL;

if (!BASE) {
  throw new Error("Missing required env var: RICK_MORTY_API_BASE_URL");
}

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page") ?? "1";
  const res = await fetch(`${BASE}/character?page=${page}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch characters" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
