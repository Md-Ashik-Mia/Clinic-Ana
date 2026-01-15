import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "api.anaespanafisioterapia.com",
  "127.0.0.1",
  "localhost",
]);

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url");
  if (!raw) {
    return new NextResponse("Missing url", { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(target.hostname)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const upstream = await fetch(target.toString(), {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    if (!upstream.ok || !upstream.body) {
      return new NextResponse("Upstream error", { status: upstream.status || 502 });
    }

    const headers = new Headers(upstream.headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(upstream.body, { status: 200, headers });
  } catch {
    return new NextResponse("Upstream timeout", { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}
