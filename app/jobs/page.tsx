"use client";

import { useEffect, useMemo, useState } from "react";
import { Job, seedJobs } from "@/lib/seed-jobs";
import JobCard from "@/components/JobCard";
import { useI18n } from "@/lib/i18n";

export default function JobsPage() {
  const { t } = useI18n();
  const [jobs, setJobs] = useState<Job[]>(seedJobs);
  const [country, setCountry] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [minSalary, setMinSalary] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.jobs?.length) setJobs(data.jobs);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (country !== "All" && j.country !== country) return false;
      if (type !== "All" && j.jobType !== type) return false;
      if (j.salaryEUR < minSalary) return false;
      return true;
    });
  }, [jobs, country, type, minSalary]);

  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl container-px">
          <h1 className="heading-1 !text-white">{t("jobs.title")}</h1>
          <p className="mt-3 text-lg text-blue-100">{t("jobs.subtitle")}</p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          {/* Filters */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="label">{t("jobs.filter.country")}</label>
                <select
                  className="input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="All">{t("common.allCountries")}</option>
                  <option value="Turkey">{t("apply.country.turkey")}</option>
                  <option value="Romania">{t("apply.country.romania")}</option>
                  <option value="Austria">{t("apply.country.austria")}</option>
                </select>
              </div>
              <div>
                <label className="label">{t("jobs.filter.type")}</label>
                <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="All">{t("common.allTypes")}</option>
                  <option value="Seasonal">{t("common.seasonal")}</option>
                  <option value="Full-time">{t("common.fulltime")}</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="label">
                  {t("jobs.filter.minSalary")}: <span className="font-semibold">€{minSalary}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={2500}
                  step={50}
                  value={minSalary}
                  onChange={(e) => setMinSalary(Number(e.target.value))}
                  className="w-full accent-brand-700"
                />
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center text-sm">
              <div className="text-slate-500">
                {filtered.length} {filtered.length === 1 ? "job" : "jobs"}
              </div>
              <button
                onClick={() => {
                  setCountry("All");
                  setType("All");
                  setMinSalary(0);
                }}
                className="text-brand-700 hover:underline"
              >
                {t("common.clearFilters")}
              </button>
            </div>
          </div>

          {/* Jobs grid */}
          <div className="mt-8">
            {loading ? (
              <div className="text-center py-20 text-slate-500">{t("common.loading")}</div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50 px-8 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl">
                  📋
                </div>
                <h2 className="mt-6 heading-3">{t("jobs.empty.title")}</h2>
                <p className="mx-auto mt-3 max-w-xl text-slate-600">
                  {t("jobs.empty.body")}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-4">
                  <a href="/apply" className="btn-accent">
                    {t("common.applyNow")} →
                  </a>
                  <a href="/contact" className="btn-outline">
                    {t("common.contactUs")}
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
