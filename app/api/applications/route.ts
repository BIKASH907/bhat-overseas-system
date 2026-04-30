import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { dbConnect, isDbConfigured } from "@/lib/mongodb";
import { ApplicationModel } from "@/lib/models";
import { getAdminFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB

async function saveUploadedCV(file: File): Promise<string | null> {
  if (!file || !file.size) return null;
  if (file.size > MAX_CV_BYTES) throw new Error("CV file is too large (max 5MB)");

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const ext = path.extname(file.name) || ".bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filepath = path.join(uploadsDir, safeName);
  const arrayBuffer = await file.arrayBuffer();
  await fs.writeFile(filepath, Buffer.from(arrayBuffer));
  return `/uploads/${safeName}`;
}

// POST — public: submit an application or inquiry
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let payload: any = {};
    let cvUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const fd = await req.formData();
      payload = {
        type: "application",
        fullName: fd.get("fullName"),
        passportNumber: fd.get("passportNumber"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        preferredCountry: fd.get("preferredCountry"),
        jobId: fd.get("jobId")
      };
      const cv = fd.get("cv");
      if (cv && cv instanceof File && cv.size > 0) {
        cvUrl = await saveUploadedCV(cv);
        payload.cvFilename = cvUrl;
      }
    } else {
      payload = await req.json();
    }

    // Basic validation
    if (payload.type === "application") {
      if (!payload.fullName || !payload.phone || !payload.preferredCountry) {
        return NextResponse.json(
          { error: "fullName, phone, preferredCountry are required" },
          { status: 400 }
        );
      }
    } else if (payload.type === "inquiry") {
      if (!payload.name || !payload.email || !payload.message) {
        return NextResponse.json(
          { error: "name, email, message are required" },
          { status: 400 }
        );
      }
    }

    if (!isDbConfigured()) {
      // Without a DB, log to console and respond ok — admin should configure MONGODB_URI
      console.log("[NO-DB] Application received:", payload);
      return NextResponse.json({ ok: true, stored: false });
    }

    await dbConnect();
    const created = await ApplicationModel.create(payload);
    return NextResponse.json({ ok: true, id: created._id, stored: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}

// GET — admin: list applications
export async function GET(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ applications: [] });

  try {
    await dbConnect();
    const applications = await ApplicationModel.find().sort({ createdAt: -1 }).limit(500).lean();
    return NextResponse.json({ applications });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
