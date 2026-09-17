import { User } from "@/models/user";
import { allowRequest, apiError, apiResponse, createAccessToken, requestId, verifyPassword } from "@/lib/apiSecurity";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const id = requestId(request);
    if (!allowRequest(request, 10)) return apiError("Too many sign-in attempts. Try again later.", 429, id);
    try {
        const payload = await request.json() as { email?: string; password?: string };
        const email = payload.email?.trim().toLowerCase();
        if (!email || !payload.password) return apiError("Email and password are required.", 400, id);
        await connectToDatabase();
        const user = await User.findOne({ email }).select("_id email passwordHash role").lean();
        if (!user || !(await verifyPassword(payload.password, user.passwordHash))) return apiError("Invalid email or password.", 401, id);
        return apiResponse({ token: createAccessToken(user.email), user: { id: user._id, email: user.email, role: user.role } }, 200, id);
    } catch {
        return apiError("Unable to sign in right now.", 500, id);
    }
}