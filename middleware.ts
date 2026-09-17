import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.set("x-request-id", request.headers.get("x-request-id") ?? crypto.randomUUID());
    const response = NextResponse.next({ request: { headers } });
    response.headers.set("x-request-id", headers.get("x-request-id") ?? "");
    response.headers.set("server-timing", "middleware;dur=0");
    return response;
}

export const config = {
    matcher: ["/api/:path*"],
};