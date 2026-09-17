import "server-only";

import { createHmac, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { sanitizeText } from "@/utils/sanitizeText";

const requestCounts = new Map<string, { count: number; expiresAt: number }>();
const scrypt = promisify(scryptCallback);

export function requestId(request: Request) {
    return request.headers.get("x-request-id") ?? randomUUID();
}

export function createAccessToken(email: string) {
    const encodedEmail = Buffer.from(email.trim().toLowerCase()).toString("base64url");
    const secret = process.env.AUTH_SECRET;
    if (!secret) throw new Error("AUTH_SECRET must be configured before issuing access tokens.");
    const signature = createHmac("sha256", secret).update(encodedEmail).digest("base64url");
    return `${encodedEmail}.${signature}`;
}

export async function verifyPassword(password: string, storedHash: string) {
    const [salt, encodedHash] = storedHash.split(":");
    if (!salt || !encodedHash) return false;
    const derived = await scrypt(password, salt, 64) as Buffer;
    const expected = Buffer.from(encodedHash, "base64url");
    return expected.length === derived.length && timingSafeEqual(derived, expected);
}

export function apiError(message: string, status: number, id: string) {
    return NextResponse.json({ error: message, requestId: id }, { status, headers: { "x-request-id": id } });
}

export function apiResponse(data: unknown, status: number, id: string) {
    return NextResponse.json(data, { status, headers: { "x-request-id": id } });
}

export function allowRequest(request: Request, limit = 30, windowMs = 60_000) {
    const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    const now = Date.now();
    const current = requestCounts.get(key);
    if (!current || current.expiresAt <= now) {
        requestCounts.set(key, { count: 1, expiresAt: now + windowMs });
        return true;
    }
    if (current.count >= limit) return false;
    current.count += 1;
    return true;
}

export async function requireUser(request: Request) {
    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) return null;
    const token = authorization.slice("Bearer ".length).trim();
    const [encodedEmail, signature] = token.split(".");
    const secret = process.env.AUTH_SECRET;
    if (!secret || !encodedEmail || !signature) return null;
    const expected = createHmac("sha256", secret).update(encodedEmail).digest("base64url");
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
    const email = Buffer.from(encodedEmail, "base64url").toString("utf8").toLowerCase();
    if (!email || !email.includes("@")) return null;
    await connectToDatabase();
    return User.findOne({ email }).select("_id email role").lean();
}

export { sanitizeText };