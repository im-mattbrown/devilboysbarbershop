import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const feedId = req.nextUrl.searchParams.get("feedId");
  const index = parseInt(req.nextUrl.searchParams.get("index") ?? "0", 10);

  if (!feedId) return NextResponse.json({ error: "missing feedId" }, { status: 400 });

  const res = await fetch(`https://feeds.behold.so/${feedId}`, { next: { revalidate: 300 } });

  if (!res.ok) return NextResponse.json({ error: "behold fetch failed" }, { status: 502 });

  const data = await res.json();
  const posts = Array.isArray(data) ? data : (data.posts ?? []);
  const post = posts[index] ?? null;

  if (!post) return NextResponse.json({ error: "post not found" }, { status: 404 });

  return NextResponse.json(post);
}
