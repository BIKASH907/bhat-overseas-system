import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const SECRET = process.env.JWT_SECRET || "dev-fallback-secret-change-me";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@bhatoverseas.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export function checkAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function signAdminToken(email: string): string {
  return jwt.sign({ email, role: "admin" }, SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): { email: string } | null {
  try {
    const decoded = jwt.verify(token, SECRET) as any;
    if (decoded?.role === "admin") return { email: decoded.email };
    return null;
  } catch {
    return null;
  }
}

export function getAdminFromRequest(req: NextRequest): { email: string } | null {
  const cookie = req.cookies.get("admin_token")?.value;
  if (!cookie) return null;
  return verifyAdminToken(cookie);
}
