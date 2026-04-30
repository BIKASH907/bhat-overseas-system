/**
 * One-off script to seed MongoDB with the dummy jobs from lib/seed-jobs.ts
 *
 * Run:  npm run seed
 * Requires MONGODB_URI to be set in .env.local
 */
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { dbConnect, isDbConfigured } from "../lib/mongodb";
import { JobModel } from "../lib/models";
import { seedJobs } from "../lib/seed-jobs";

async function main() {
  if (!isDbConfigured()) {
    console.error("MONGODB_URI is not set. Add it to .env.local");
    process.exit(1);
  }
  await dbConnect();
  console.log("Connected to MongoDB");

  for (const job of seedJobs) {
    const existing = await JobModel.findOne({ id: job.id });
    if (existing) {
      console.log(`✓ already exists: ${job.id}`);
      continue;
    }
    await JobModel.create(job);
    console.log(`+ inserted: ${job.id} — ${job.title}`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
