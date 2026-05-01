"use client";

import Link from "next/link";
import { Job } from "@/lib/seed-jobs";
import { useI18n } from "@/lib/i18n";

// Real flag images from flagcdn.com — Windows browsers don't render flag emojis.
const flagUrl: Record<string, string> = {
  Turkey: "https://flagcdn.com/w80/tr.png",
  Romania: "https://flagcdn.com/w80/ro.png",
  Austria: "https://flagcdn.com/w80/at.png"
};

export default function JobCard({ job }: { job: Job }) {
  const { t } = useI18n();
  return (
    <article className="card flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {flagUrl[job.country] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={flagUrl[job.country]} alt={`${job.country} flag`} className="h-3 w-4 rounded-sm object-cover ring-1 ring-slate-200" />
          ) : (
            <span>🏳️</span>
          )}
          {job.country}
        </span>
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            job.jobType === "Seasonal"
              ? "bg-amber-100 text-amber-800"
              : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {job.jobType === "Seasonal" ? t("common.seasonal") : t("common.fulltime")}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{job.sector}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-xs text-slate-500">{t("common.salary")}</div>
          <div className="font-semibold text-slate-900">€{job.salaryEUR}/mo</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">{t("common.duration")}</div>
          <div className="font-semibold text-slate-900">{job.duration}</div>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          href={`/jobs/${job.id}`}
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          {t("common.viewDetails")}
        </Link>
        <Link
          href={`/apply?job=${encodeURIComponent(job.id)}`}
          className="flex-1 rounded-lg bg-brand-700 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-800"
        >
          {t("common.applyNow")}
        </Link>
      </div>
    </article>
  );
}
