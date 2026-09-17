import type { NextRequest } from "next/server";

export function onRequestError(
    error: unknown,
    request: NextRequest,
    context: { routePath?: string; routeType?: string },
) {
    console.error(JSON.stringify({
        event: "request_error",
        requestId: request.headers.get("x-request-id"),
        method: request.method,
        path: request.nextUrl.pathname,
        route: context.routePath,
        routeType: context.routeType,
        error: error instanceof Error ? error.message : "unknown",
    }));
}