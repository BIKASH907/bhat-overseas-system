"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Job, seedJobs } from "@/lib/seed-jobs";
import { useI18n } from "@/lib/i18n";

export default function JobDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { t } = useI18n();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    // Try API first, fall back to seed data
    fetch(`/api/jobs/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.job) {
          setJob(data.job);
        } else {
          const found = seedJobs.find((j) => j.id === id);
          setJob(found || null);
        }
      })
      .catch(() => {
        const found = seedJobs.find((j) => j.id === id);
        setJob(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl container-px py-20 text-center text-slate-500">
        {t("common.loading")}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-3xl container-px py-20 text-center">
        <h1 className="heading-2">{t("job.notFound")}</h1>
        <Link href="/jobs" className="mt-4 inline-block text-brand-700 hover:underline">
          ← Back to jobs
        </Link>
      </div>
    );
  }

  const flag: Record<string, string> = { Turkey: "🇹🇷", Romania: "🇷🇴", Austria: "🇦🇹" };

  return (
    <article className="mx-auto max-w-4xl container-px py-12">
      <Link href="/jobs" className="text-sm text-brand-700 hover:underline">
        ← Back to all jobs
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            {flag[job.country]} {job.country}
          </span>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              job.jobType === "Seasonal"
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {job.jobType === "Seasonal" ? t("common.seasonal") : t("common.fulltime")}
          </span>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {job.sector}
          </span>
        </div>
        <h1 className="mt-4 heading-1">{job.title}</h1>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <div className="text-xs uppercase tracking-wider text-slate-500">{t("common.salary")}</div>
          <div className="mt-1 text-2xl font-bold text-brand-700">€{job.salaryEUR}/mo</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wider text-slate-500">{t("common.duration")}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{job.duration}</div>
        </div>
        <div className="card">
          <div className="text-xs uppercase tracking-wider text-slate-500">{t("common.country")}</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{job.country}</div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="heading-3">{t("job.aboutThis")}</h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">{job.description}</p>
      </section>

      <section className="mt-10">
        <h2 className="heading-3">{t("common.requirements")}</h2>
        <ul className="mt-4 space-y-2">
          {job.requirements.map((r, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                ✓
              </span>
              <span className="text-slate-700">{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href={`/apply?job=${encodeURIComponent(job.id)}`} className="btn-accent">
          {t("common.applyNow")} →
        </Link>
        <Link href="/jobs" className="btn-outline">
          {t("common.viewJobs")}
        </Link>
      </div>
    </article>
  );
}
