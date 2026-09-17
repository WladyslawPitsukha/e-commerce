import { apiError, apiResponse, requestId, requireUser } from "@/lib/apiSecurity";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const id = requestId(request);
    try {
        const user = await requireUser(request);
        if (!user) return apiError("Sign in required.", 401, id);
        return apiResponse({ user }, 200, id);
    } catch {
        return apiError("Unable to load your account.", 500, id);
    }
}