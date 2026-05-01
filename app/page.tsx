"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Job, seedJobs } from "@/lib/seed-jobs";
import JobCard from "@/components/JobCard";

// Country cards on the home page — image background + benefits + CTA
const countries = [
  {
    name: "Turkey",
    flag: "🇹🇷",
    code: "TR",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=900&q=70",
    benefitKeys: ["country.benefit1", "country.benefit2", "country.benefit3"]
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    code: "RO",
    image: "/romania.png",
    benefitKeys: ["country.ro1", "country.ro2", "country.ro3"]
  },
  {
    name: "Austria",
    flag: "🇦🇹",
    code: "AT",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=70",
    benefitKeys: ["country.at1", "country.at2", "country.at3"]
  }
];

// Verified partner employers — all real partners
type PartnerCard = {
  name: string;
  countryFlag: string;
  countryName: string;
  sector: string;
  icon: string;
  featured?: boolean;
};

const featuredPartners: PartnerCard[] = [
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
  { name: "Prime Link Human Capital", countryFlag: "🇷🇴", countryName: "Romania", sector: "Recruitment Partner", icon: "🤝", featured: true }
];

// Trust bar — 4 items shown as a white floating card under the hero
const trustItems = [
  { iconBg: "bg-brand-50", iconColor: "text-brand-700", icon: "🛡️", title: "Govt. Licensed", subtitle: "Authorized Recruitment Agency" },
  { iconBg: "bg-emerald-50", iconColor: "text-emerald-700", icon: "👥", title: "16+ Partners", subtitle: "Verified EU Employers" },
  { iconBg: "bg-amber-50", iconColor: "text-amber-700", icon: "🔍", title: "Screened & Verified", subtitle: "Every CV is Checked" },
  { iconBg: "bg-rose-50", iconColor: "text-rose-700", icon: "🎧", title: "Full Support", subtitle: "From Application to Deployment" }
];

// Stats — bottom strip of the home page
const bigStats = [
  { value: "Since 2023", label: "Recruiting Nepali Talent" },
  { value: "1,000+", label: "Workers Placed" },
  { value: "16+", label: "Verified Employers" },
  { value: "3", label: "Countries Served" }
];

// Why-choose-us features
const whyFeatureKeys = [
  { icon: "🛡️", titleKey: "why.licensed", bodyKey: "why.licensed.body" },
  { icon: "💰", titleKey: "why.noHidden", bodyKey: "why.noHidden.body" },
  { icon: "👥", titleKey: "why.support", bodyKey: "why.support.body" },
  { icon: "🎯", titleKey: "why.success", bodyKey: "why.success.body" }
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
  const showJobs = featured.length ? featured : jobs.slice(0, 4);

  return (
    <>
      {/* ====== HERO — full-bleed worker photo background, text overlaid on left ====== */}
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[680px]">
        {/* Full background image — Turkish flag, Istanbul skyline, all 4 workers visible */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-workers.png"
            alt="Nepali workers placed by Bhat Overseas — construction, hospitality, factory, chef — in front of Istanbul skyline with Turkish flag"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center center" }}
            loading="eager"
          />
          {/* Left-side dark scrim — fades quickly so workers stay visible */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(10,61,145,0.88) 0%, rgba(10,61,145,0.65) 22%, rgba(10,61,145,0.25) 38%, transparent 55%)"
            }}
            aria-hidden
          />
          {/* Soft global tint for overall readability without darkening workers much */}
          <div className="absolute inset-0 bg-black/10" aria-hidden />
        </div>

        {/* Foreground content */}
        <div className="relative mx-auto max-w-7xl container-px py-20 lg:py-28">
          <div className="max-w-xl text-white">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ring-1 ring-white/30 backdrop-blur sm:text-sm"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              {t("hero.badge")}
            </span>

            <h1
              className="mt-6 font-extrabold tracking-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", lineHeight: 1.05, textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
            >
              {t("hero.headline1")}
              <br />
              {t("hero.headline2a")}<span style={{ color: "#FFAB5C" }}>{t("hero.headline2b")}</span>
            </h1>

            <p
              className="mt-5 max-w-lg text-base sm:text-lg"
              style={{ color: "#E5EAF5", lineHeight: 1.6, textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}
            >
              {t("hero.subtext")}
            </p>

            {/* Feature pills with glass effect */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
              {[
                { icon: "💰", label: t("feature.salary"), sub: t("feature.salary.value") },
                { icon: "🛡️", label: t("feature.legal"), sub: t("feature.legal.value") },
                { icon: "⚡", label: t("feature.fast"), sub: t("feature.fast.value") }
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-white/30 backdrop-blur"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    <span className="text-xl">{f.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight text-white">{f.label}</div>
                    <div className="mt-0.5 text-xs text-blue-100">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: "#FF6B00", boxShadow: "0 10px 30px rgba(255, 107, 0, 0.35)" }}
              >
                {t("btn.applyNow")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-white/60 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-brand-800"
              >
                {t("btn.viewJobs")}
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ETHICAL RECRUITMENT BANNER ====== */}
      <section className="section !py-10 sm:!py-12">
        <div className="mx-auto max-w-7xl container-px">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50 via-white to-emerald-50 p-6 ring-2 ring-amber-200 sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-[auto,1fr,auto]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl ring-1 ring-amber-200">
                🛡️
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  {t("ethical.label")}
                </div>
                <p className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
                  {t("ethical.text1")}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {t("ethical.text2")}
                </p>
              </div>
              <Link
                href="/process"
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-brand-700 px-5 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-700 hover:text-white"
              >
                {t("ethical.cta")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== COUNTRIES WE SERVE ====== */}
      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("countries.popular")}</p>
              <h2 className="mt-2 heading-2">{t("countries.title2")}</h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />
            </div>
            <Link href="/countries" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-700 hover:text-brand-700">
              {t("countries.viewAll").toUpperCase()}
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13l5 5-5 5v-3H7v-4h4z" /></svg>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {countries.map((c) => (
              <article
                key={c.code}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                style={{ minHeight: "380px" }}
              >
                {/* Background image OR flag-color gradient when no image */}
                {c.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={c.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900 -z-10" />
                  </>
                ) : (
                  <>
                    {/* Romanian-flag tricolor gradient fallback */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      c.code === "RO" ? "from-blue-700 via-amber-500 to-red-700" :
                      c.code === "TR" ? "from-red-700 to-red-900" :
                      "from-red-700 via-white to-red-700"
                    }`} />
                    <div className="absolute inset-0 opacity-15" style={{
                      backgroundImage: "radial-gradient(circle at 30% 30%, white 1.5px, transparent 1.5px)",
                      backgroundSize: "32px 32px"
                    }} />
                  </>
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/60 to-transparent" />

                {/* Top: flag + popular */}
                <div className="relative p-5 flex justify-between items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 text-2xl shadow-md">
                    {c.flag}
                  </div>
                  <span className="inline-flex items-center rounded-md bg-accent-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                    Popular
                  </span>
                </div>

                {/* Bottom: name + benefits + CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-extrabold uppercase tracking-tight">{c.name}</h3>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {c.benefitKeys.map((bk) => (
                      <li key={bk} className="flex items-center gap-2">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold">✓</span>
                        {t(bk)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/jobs" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-brand-700">
                    VIEW JOBS →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURED JOBS / COMING SOON ====== */}
      {showJobs.length > 0 ? (
        <section className="section bg-slate-50">
          <div className="mx-auto max-w-7xl container-px">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("comingSoon.label")}</p>
                <h2 className="mt-2 heading-2">{t("comingSoon.title")}</h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />
              </div>
              <Link href="/jobs" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-700 hover:text-brand-700">
                {t("comingSoon.viewAll").toUpperCase()}
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {showJobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
          </div>
        </section>
      ) : (
        <section className="section bg-slate-50">
          <div className="mx-auto max-w-7xl container-px">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("comingSoon.label")}</p>
                <h2 className="mt-2 heading-2">{t("comingSoon.title")}</h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />
              </div>
            </div>
            <div className="mt-8 rounded-2xl border-2 border-dashed border-brand-200 bg-white px-8 py-12 text-center sm:px-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl">📋</div>
              <h3 className="mt-6 heading-3">{t("comingSoon.empty.title")}</h3>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                {t("comingSoon.empty.body")}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <Link href="/apply" className="btn-accent">{t("btn.applyNow")} →</Link>
                <Link href="/contact" className="btn-outline">{t("btn.contactUs")}</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ====== WHY CHOOSE US + JOURNEY CTA ====== */}
      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: features (3 cols) */}
            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Why Choose Bhat Overseas?</p>
              <h2 className="mt-2 heading-2">
                We Make Your Dream<br />
                <span className="text-brand-700">Come True</span>
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {whyFeatures.map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-2xl ring-1 ring-brand-100">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{f.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: journey CTA (2 cols) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white shadow-xl lg:col-span-2">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl" />

              <div className="relative">
                <div className="text-5xl">🧳</div>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight">
                  {t("homeCta.ready")}
                </h3>
                <p className="mt-3 text-blue-100">
                  {t("homeCta.body")}
                </p>
                <Link
                  href="/apply"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-brand-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  APPLY NOW
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PARTNER EMPLOYERS ====== */}
      <section className="relative section overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #1d4ed8 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        <div className="relative mx-auto max-w-7xl container-px">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
              🤝 {t("partners.label")}
            </span>
            <h2 className="mt-5 heading-2">{t("partners.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              {t("partners.body")}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 sm:gap-8">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-brand-700 sm:text-4xl">{featuredPartners.length}+</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{t("partners.statEmp")}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-brand-700 sm:text-4xl">3</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{t("partners.statCountries")}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="text-3xl font-extrabold text-brand-700 sm:text-4xl">100%</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{t("partners.statContracts")}</div>
            </div>
          </div>

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
                    ★ {t("partners.featured")}
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
              {t("partners.cta")} →
            </Link>
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="section bg-slate-50">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("test.label")}</p>
            <h2 className="mt-2 heading-2">{t("test.title1")}<br />{t("test.title2")}</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent-500" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Suresh Tamang",
                roleKey: "test.s.role",
                quoteKey: "test.s.quote",
                initial: "S",
                color: "from-blue-500 to-brand-700"
              },
              {
                name: "Maya Gurung",
                roleKey: "test.m.role",
                quoteKey: "test.m.quote",
                initial: "M",
                color: "from-pink-500 to-purple-600"
              },
              {
                name: "Dipak Karki",
                roleKey: "test.d.role",
                quoteKey: "test.d.quote",
                initial: "D",
                color: "from-emerald-500 to-teal-600"
              }
            ].map((tst) => (
              <article key={tst.name} className="rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${tst.color} text-xl font-bold text-white shadow-md`}>
                    {tst.initial}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{tst.name}</div>
                    <div className="text-xs text-slate-500">{t(tst.roleKey)}</div>
                   </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-700">&ldquo;{t(tst.quoteKey)}&rdquo;</p>
                <div className="mt-4 text-amber-500">★★★★★</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="bg-gradient-to-r from-brand-800 via-brand-900 to-brand-800 text-white">
        <div className="mx-auto max-w-7xl container-px py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { valueKey: "stat.since", labelKey: "stat.since.label", icon: "📅" },
              { valueKey: "stat.placed", labelKey: "stat.placed.label", icon: "👥" },
              { valueKey: "stat.employers", labelKey: "stat.employers.label", icon: "🤝" },
              { valueKey: "stat.countries", labelKey: "stat.countries.label", icon: "🌍" }
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold leading-none">{t(s.valueKey)}</div>
                  <div className="mt-1 text-sm font-medium text-blue-200">{t(s.labelKey)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>    </>
  );
}
