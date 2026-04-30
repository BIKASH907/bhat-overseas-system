import { NextRequest, NextResponse } from "next/server";
import { dbConnect, isDbConfigured } from "@/lib/mongodb";
import { JobModel } from "@/lib/models";
import { seedJobs } from "@/lib/seed-jobs";
import { getAdminFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET single job
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!isDbConfigured()) {
      const job = seedJobs.find((j) => j.id === params.id);
      if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ job, source: "seed" });
    }
    await dbConnect();
    const job = await JobModel.findOne({ id: params.id }).lean();
    if (!job) {
      const fallback = seedJobs.find((j) => j.id === params.id);
      if (fallback) return NextResponse.json({ job: fallback, source: "seed" });
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ job });
  } catch (e: any) {
    const fallback = seedJobs.find((j) => j.id === params.id);
    if (fallback) return NextResponse.json({ job: fallback, source: "seed" });
    return NextResponse.json({ error: e?.message || "Error" }, { status: 500 });
  }
}

// PUT — admin: update a job
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  try {
    await dbConnect();
    const body = await req.json();
    delete body._id;
    const job = await JobModel.findOneAndUpdate({ id: params.id }, body, { new: true }).lean();
    if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ job });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

// DELETE — admin
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

  try {
    await dbConnect();
    const result = await JobModel.deleteOne({ id: params.id });
    return NextResponse.json({ deleted: result.deletedCount });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
