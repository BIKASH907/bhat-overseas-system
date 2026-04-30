import { NextRequest, NextResponse } from "next/server";
import { checkAdminCredentials, signAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

// POST /api/admin/auth — login
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email/password" }, { status: 400 });
    }
    if (!checkAdminCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = signAdminToken(email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Login failed" }, { status: 500 });
  }
}

// DELETE /api/admin/auth — logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", "", { path: "/", maxAge: 0 });
  return res;
}
