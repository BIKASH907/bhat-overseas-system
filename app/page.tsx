"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Job, seedJobs } from "@/lib/seed-jobs";
import JobCard from "@/components/JobCard";

const countries = [
  { name: "Turkey", flag: "🇹🇷", code: "TR", desc: "Factory, Hotel, Construction" },
  { name: "Romania", flag: "🇷🇴", code: "RO", desc: "Construction, Agriculture" },
  { name: "Austria", flag: "🇦🇹", code: "AT", desc: "Factory, Hospitality, Agriculture" }
];

export default function HomePage() {
  const { t } = useI18n();
  const [jobs, setJobs] = useState<Job[]>(seedJobs);

  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.jobs?.length) setJobs(data.jobs);
      })
      .catch(() => {});
  }, []);

  const featured = jobs.filter((j) => j.featured).slice(0, 3);
  const showJobs = featured.length ? featured : jobs.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
        <div className="relative mx-auto max-w-7xl container-px py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20">
              🇳🇵 Government-licensed Nepali recruitment agency
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 text-lg text-blue-100 sm:text-xl">{t("hero.subtitle")}</p>
            <p className="mt-2 text-sm text-blue-200">{t("hero.tagline")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/apply" className="btn-accent">
                {t("common.applyNow")} →
              </Link>
              <Link href="/jobs" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                {t("common.viewJobs")}
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-center sm:gap-8">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-xs text-blue-200">Workers placed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">3</div>
                <div className="text-xs text-blue-200">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold">48h</div>
                <div className="text-xs text-blue-200">Avg. response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="heading-2">{t("home.featured.title")}</h2>
              <p className="mt-2 text-slate-600">{t("home.featured.subtitle")}</p>
            </div>
            <Link href="/jobs" className="hidden sm:inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
              {t("home.featured.viewAll")} →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </div>
      </section>

      {/* COUNTRIES */}
      <section className="section bg-slate-50">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center">
            <h2 className="heading-2">{t("home.countries.title")}</h2>
            <p className="mt-2 text-slate-600">{t("home.countries.subtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {countries.map((c) => (
              <Link key={c.code} href="/countries" className="card group text-center">
                <div className="text-6xl">{c.flag}</div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{c.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-brand-700 group-hover:text-brand-800">
                  {t("common.learnMore")} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center">
            <h2 className="heading-2">{t("home.why.title")}</h2>
            <p className="mt-2 text-slate-600">{t("home.why.subtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🏛️", k: "licensed" },
              { icon: "📋", k: "transparent" },
              { icon: "🤝", k: "support" },
              { icon: "⚡", k: "fast" }
            ].map((f) => (
              <div key={f.k} className="card">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {t(`home.why.${f.k}.title`)}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{t(`home.why.${f.k}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-slate-50">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center">
            <h2 className="heading-2">{t("home.testimonials.title")}</h2>
            <p className="mt-2 text-slate-600">{t("home.testimonials.subtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Ramesh K.",
                role: "Factory Worker, Istanbul",
                quote: "Bhat Overseas handled my paperwork in 6 weeks. Now I send money home every month."
              },
              {
                name: "Sita M.",
                role: "Hotel Staff, Antalya",
                quote: "Clear contract, no hidden fees. They prepared me well for the interview."
              },
              {
                name: "Bishnu T.",
                role: "Construction, Bucharest",
                quote: "Good salary, fair employer. I extended my contract for another year."
              }
            ].map((tst) => (
              <div key={tst.name} className="card">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                    {tst.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{tst.name}</div>
                    <div className="text-xs text-slate-500">{tst.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-700">&ldquo;{tst.quote}&rdquo;</p>
                <div className="mt-3 text-amber-500">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          <div className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 px-8 py-12 text-center text-white shadow-xl sm:px-16 sm:py-16">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("home.cta.title")}</h2>
            <p className="mt-3 text-lg text-blue-100">{t("home.cta.subtitle")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-accent">
                {t("common.applyNow")} →
              </Link>
              <Link href="/jobs" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                {t("common.viewJobs")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
