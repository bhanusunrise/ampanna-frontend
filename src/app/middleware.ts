import { NextResponse, NextRequest } from "next/server";

import { get } from "@vercel/edge-config";

export async function middleware(request: NextRequest) {
  if (await get("showNewDashboard")) {
    return NextResponse.rewrite(new URL("/new-dashboard", request.url));
  }
}