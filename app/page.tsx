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

// Verified partner employers across all destination countries — shown on home page for credibility.
// Featured = internationally recognized brand (gets a special highlight on the card).
type PartnerCard = {
  name: string;
  countryFlag: string;
  countryName: string;
  sector: string;
  icon: string;
  featured?: boolean;
};

const featuredPartners: PartnerCard[] = [
  // Turkey
  { name: "DOĞA GALVANİZ METAL", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Metal & Construction", icon: "🔩" },
  { name: "BAHA GRUP ORMAN ÜRÜNLERİ", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Forestry", icon: "🌲" },
  { name: "DLN KALIP VE İNŞAAT", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Construction", icon: "🏗️" },
  { name: "MNC PİGMENT", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Industrial", icon: "🏭" },
  { name: "OYTUN YUMURTA YARKA", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Agriculture & Food", icon: "🌾" },
  { name: "NUR SEM ELEKTRİK", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Electrical & Textile", icon: "⚡" },
  { name: "KÖKSAN PET VE PLASTİK", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Packaging", icon: "📦" },
  { name: "TEKKELİ GIDA", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Food Industry", icon: "🍞" },
  { name: "RIOS BEACH OTEL", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Hospitality (Seneta Group)", icon: "🏖️", featured: true },
  { name: "KUTLUSAN KAFES", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Agriculture", icon: "🌱" },
  { name: "AHŞAP URUN SANAYI", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Wood Products", icon: "🪵" },
  { name: "ALANYA ÖZKAYMAK TURIZM", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Tourism", icon: "🌊" },
  { name: "EMMİDAĞ MERMER", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Marble & Mining", icon: "⛏️" },
  { name: "GRANİTSAN MADENCİLİK", countryFlag: "🇹🇷", countryName: "Turkey", sector: "Mining", icon: "⛰️" },
  { name: "CROWNE PLAZA", countryFlag: "🇹🇷", countryName: "Turkey", sector: "5★ Hotel (Marti Termal)", icon: "🏨", featured: true },
  // Romania
  { name: "Prime Link Human Capital", countryFlag: "🇷🇴", countryName: "Romania", sector: "Recruitment Partner", icon: "🤝", featured: true }
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
            <p className="mt-4 text-base font-semibold uppercase tracking-[0.25em] text-accent-500/90">
              Building Bridges · Empowering Nations
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
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

      {/* FEATURED JOBS — only render when we actually have jobs */}
      {showJobs.length > 0 ? (
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
      ) : (
        // Empty-state CTA: shown when no real jobs are posted yet
        <section className="section">
          <div className="mx-auto max-w-7xl container-px">
            <div className="rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50 px-8 py-12 text-center sm:px-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl">
                📋
              </div>
              <h2 className="mt-6 heading-3">New Openings Coming Soon</h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                We are currently verifying fresh openings with our partner employers in Turkey, Romania, and Austria.
                Submit your application now and we'll match you with the right opportunity as soon as it opens.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <Link href="/apply" className="btn-accent">
                  {t("common.applyNow")} →
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* PARTNER EMPLOYERS — credibility-builder, all verified partners */}
      <section className="relative section overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-white">
        {/* Subtle dotted texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #1d4ed8 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        <div className="relative mx-auto max-w-7xl container-px">
          {/* Section header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
              <span>🤝</span> Verified Partnerships
            </span>
            <h2 className="mt-5 heading-2">Our Trusted Partner Employers</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Bhat Overseas works <strong className="text-slate-900">directly</strong> with these verified employers across our destination countries — no middlemen, no surprises.
            </p>
          </div>

          {/* Stat counters */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 sm:gap-8">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-brand-700 sm:text-4xl">{featuredPartners.length}+</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Verified Employers</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-brand-700 sm:text-4xl">3</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Countries</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-brand-700 sm:text-4xl">100%</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">Direct Contracts</div>
            </div>
          </div>

          {/* Partner cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredPartners.map((p, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  p.featured
                    ? "border-accent-500/40 ring-1 ring-accent-500/20"
                    : "border-slate-200 hover:border-brand-300"
                }`}
              >
                {p.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    ★ Featured
                  </span>
                )}

                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-2xl transition-colors group-hover:bg-brand-100">
                    {p.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <span>{p.countryFlag}</span>
                      <span>{p.countryName}</span>
                    </div>
                    <div className="mt-1 font-bold leading-tight text-slate-900">{p.name}</div>
                  </div>
                </div>

                <div className="mt-3 inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  {p.sector}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-700 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-700 hover:text-white"
            >
              See full partner details on Countries page →
            </Link>
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
