import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Sanity webhook target — hit on every document publish so the statically
 * generated homepage (revalidate = 3600 in page.tsx) refreshes immediately
 * instead of waiting for the hourly window. Configured via `sanity hook
 * create`, pointed at this route with `?secret=` matching
 * SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
