import { NextRequest, NextResponse } from "next/server";
import { dbConnect, isDbConfigured } from "@/lib/mongodb";
import { JobModel } from "@/lib/models";
import { seedJobs } from "@/lib/seed-jobs";
import { getAdminFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET — public: list all jobs
export async function GET() {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ jobs: seedJobs, source: "seed" });
    }
    await dbConnect();
    const jobs = await JobModel.find().sort({ createdAt: -1 }).lean();
    if (!jobs.length) {
      return NextResponse.json({ jobs: seedJobs, source: "seed" });
    }
    return NextResponse.json({ jobs, source: "db" });
  } catch (e: any) {
    return NextResponse.json({ jobs: seedJobs, source: "seed", warning: e?.message }, { status: 200 });
  }
}

// POST — admin: create a new job
export async function POST(req: NextRequest) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  try {
    await dbConnect();
    const body = await req.json();
    const required = ["id", "title", "country", "jobType", "salaryEUR", "duration", "sector"];
    for (const k of required) {
      if (!body[k] && body[k] !== 0) {
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
      }
    }
    const job = await JobModel.create(body);
    return NextResponse.json({ job }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to create" }, { status: 500 });
  }
}
