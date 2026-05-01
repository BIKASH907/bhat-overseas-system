"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Job, seedJobs } from "@/lib/seed-jobs";
import JobCard from "@/components/JobCard";

// Country cards on the home page — image background + benefits + CTA
// Using real flag images from flagcdn.com because Windows browsers don't render flag emojis.
const countries = [
  {
    name: "Turkey",
    flagUrl: "https://flagcdn.com/w160/tr.png",
    code: "TR",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=900&q=70",
    benefitKeys: ["country.benefit1", "country.benefit2", "country.benefit3"]
  },
  {
    name: "Romania",
    flagUrl: "https://flagcdn.com/w160/ro.png",
    code: "RO",
    image: "/romania.png",
    benefitKeys: ["country.ro1", "country.ro2", "country.ro3"]
  },
  {
    name: "Austria",
    flagUrl: "https://flagcdn.com/w160/at.png",
    code: "AT",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=70",
    benefitKeys: ["country.at1", "country.at2", "country.at3"]
  }
];

// Verified partner employers — all real partners
// `sectorKey` references a translation key so sectors render in the user's language.
type PartnerCard = {
  name: string;
  countryFlag: string;
  countryName: string;
  sectorKey: string;
  icon: string;
  featured?: boolean;
};

const featuredPartners: PartnerCard[] = [
  { name: "DOĞA GALVANİZ METAL", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.metalConstruction", icon: "🔩" },
  { name: "BAHA GRUP ORMAN ÜRÜNLERİ", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.forestry", icon: "🌲" },
  { name: "DLN KALIP VE İNŞAAT", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.construction", icon: "🏗️" },
  { name: "MNC PİGMENT", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.industrial", icon: "🏭" },
  { name: "OYTUN YUMURTA YARKA", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.agricultureFood", icon: "🌾" },
  { name: "NUR SEM ELEKTRİK", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.electricalTextile", icon: "⚡" },
  { name: "KÖKSAN PET VE PLASTİK", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.packaging", icon: "📦" },
  { name: "TEKKELİ GIDA", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.foodIndustry", icon: "🍞" },
  { name: "RIOS BEACH OTEL", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.hospitalitySeneta", icon: "🏖️", featured: true },
  { name: "KUTLUSAN KAFES", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.agriculture", icon: "🌱" },
  { name: "AHŞAP URUN SANAYI", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.woodProducts", icon: "🪵" },
  { name: "ALANYA ÖZKAYMAK TURIZM", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.tourism", icon: "🌊" },
  { name: "EMMİDAĞ MERMER", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.marbleMining", icon: "⛏️" },
  { name: "GRANİTSAN MADENCİLİK", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.mining", icon: "⛰️" },
  { name: "CROWNE PLAZA", countryFlag: "https://flagcdn.com/w40/tr.png", countryName: "Turkey", sectorKey: "sector.hotelMartiTermal", icon: "🏨", featured: true },
  { name: "Prime Link Human Capital", countryFlag: "https://flagcdn.com/w40/ro.png", countryName: "Romania", sectorKey: "sector.recruitmentPartner", icon: "🤝", featured: true }
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
          <div className="max-w-2xl text-white">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ring-1 ring-white/30 backdrop-blur sm:text-sm"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              {t("hero.licensedBadge")}
            </span>

            <h1
              className="mt-6 font-extrabold tracking-tight"
              style={{ fontSize: "clamp(1.875rem, 4.2vw, 3rem)", lineHeight: 1.1, textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
            >
              {t("hero.headlineNew")}
            </h1>

            <p
              className="mt-5 max-w-xl text-base sm:text-lg"
              style={{ color: "#E5EAF5", lineHeight: 1.6, textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
            >
              {t("hero.subheadNew")}
            </p>

            {/* 4 Trust points — checkmark style */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                t("hero.trust1"),
                t("hero.trust2"),
                t("hero.trust3"),
                t("hero.trust4")
              ].map((label, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: "#FF6B00", color: "white" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-white sm:text-base" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                style={{ background: "#FF6B00", boxShadow: "0 10px 30px rgba(255, 107, 0, 0.35)" }}
              >
                {t("hero.cta.apply")}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a
                href="https://wa.me/9779764274854?text=Hello%20Bhat%20Overseas%2C%20I%27m%20interested%20in%20working%20abroad."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-white/60 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-emerald-700"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012.01 0C5.39 0 0 5.39 0 12.01a11.93 11.93 0 001.61 6L0 24l6.18-1.62a11.94 11.94 0 005.83 1.49h.01c6.62 0 12-5.39 12-12.01a11.93 11.93 0 00-3.5-8.38zM17.39 14.45c-.29-.15-1.74-.86-2.01-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.45 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.34z"/></svg>
                {t("hero.cta.whatsapp")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TRUST BAR — credibility signals right after hero ====== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl container-px py-8 sm:py-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("trustbar.label")}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🛡️", title: t("trustbar.govLicense"), desc: t("trustbar.govLicenseDesc") },
              { icon: "🏢", title: t("trustbar.registered"), desc: t("trustbar.registeredDesc") },
              { icon: "🤝", title: t("trustbar.partners"), desc: t("trustbar.partnersDesc") },
              { icon: "🌍", title: t("trustbar.countries"), desc: t("trustbar.countriesDesc") }
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300 hover:shadow-md">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-2xl ring-1 ring-brand-100">
                  {b.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900">{b.title}</div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">{b.desc}</div>
                </div>
              </div>
            ))}
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
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white/95 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.flagUrl} alt={`${c.name} flag`} className="h-full w-full object-cover" />
                  </div>
                  <span className="inline-flex items-center rounded-md bg-accent-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                    {t("home.popular")}
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
                    {t("home.viewJobsArrow")}
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

      {/* ====== HOW IT WORKS — 5-step home summary ====== */}
      <section className="section bg-slate-50">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("hiw.label")}</p>
            <h2 className="mt-2 heading-2">{t("hiw.title")}</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent-500" />
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">{t("hiw.subtitle")}</p>
          </div>

          {/* Step cards */}
          <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {[
              { n: 1, icon: "📝", titleKey: "hiw.s1.title", bodyKey: "hiw.s1.body", color: "from-brand-500 to-brand-700" },
              { n: 2, icon: "🔍", titleKey: "hiw.s2.title", bodyKey: "hiw.s2.body", color: "from-cyan-500 to-blue-600" },
              { n: 3, icon: "💬", titleKey: "hiw.s3.title", bodyKey: "hiw.s3.body", color: "from-amber-500 to-orange-600" },
              { n: 4, icon: "📄", titleKey: "hiw.s4.title", bodyKey: "hiw.s4.body", color: "from-emerald-500 to-teal-600" },
              { n: 5, icon: "✈️", titleKey: "hiw.s5.title", bodyKey: "hiw.s5.body", color: "from-indigo-500 to-purple-600" }
            ].map((s) => (
              <article
                key={s.n}
                className="relative rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-2xl text-white shadow-md`}>
                  {s.icon}
                </div>
                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t("process.step")} {s.n}
                </div>
                <h3 className="mt-1 text-base font-bold text-slate-900">{t(s.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(s.bodyKey)}</p>
              </article>
            ))}
          </div>

          {/* Important notice */}
          <div className="mt-10 overflow-hidden rounded-2xl border-2 border-amber-300 bg-amber-50">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-2xl">
                ⚠️
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800">{t("hiw.notice.label")}</div>
                <p className="mt-1 text-base font-semibold text-amber-900">{t("hiw.notice.text")}</p>
              </div>
              <Link
                href="/process"
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-amber-700 px-4 py-2 text-sm font-bold text-amber-900 transition hover:bg-amber-700 hover:text-white"
              >
                {t("hiw.cta")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US + JOURNEY CTA ====== */}
      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Left: features (3 cols) */}
            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("home.whyChoose.label")}</p>
              <h2 className="mt-2 heading-2">
                {t("why.headline1")}<br />
                <span className="text-brand-700">{t("why.headline2")}</span>
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {whyFeatureKeys.map((f) => (
                  <div key={f.titleKey} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-2xl ring-1 ring-brand-100">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{t(f.titleKey)}</h3>
                      <p className="mt-1 text-sm text-slate-600">{t(f.bodyKey)}</p>
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
                  {t("home.applyNowUpper")}
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.countryFlag} alt={`${p.countryName} flag`} className="h-3 w-4 rounded-sm object-cover ring-1 ring-slate-200" />
                      <span>{p.countryName}</span>
                    </div>
                    <div className="mt-1 font-bold leading-tight text-slate-900">{p.name}</div>
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                  {t(p.sectorKey)}
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

      {/* ====== TESTIMONIALS ====== — Hidden until real worker testimonials are collected. To re-enable, change `false` to `true` below. */}
      {false && (<section className="section bg-slate-50">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("test.label")}</p>
            <h2 className="mt-2 heading-2">{t("test.title1")}<br />{t("test.title2")}</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent-500" />
          </div>
        </div>
      </section>)}

      {/* ====== STRONG FINAL CTA ====== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A3D91 0%, #06296A 60%, #0A3D91 100%)" }} />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
          aria-hidden
        />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl container-px py-16 sm:py-20 text-white text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-300">{t("finalCta.label")}</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-blue-100 sm:text-lg">
            {t("finalCta.subtitle")}
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {[t("finalCta.point1"), t("finalCta.point2"), t("finalCta.point3")].map((p, i) => (
              <div key={i} className="flex items-center gap-2 font-semibold text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs">✓</span>
                {p}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition hover:-translate-y-0.5"
              style={{ background: "#FF6B00", boxShadow: "0 12px 35px rgba(255, 107, 0, 0.45)" }}
            >
              {t("finalCta.apply")}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <a
              href="https://wa.me/9779764274854?text=Hello%20Bhat%20Overseas%2C%20I%27m%20interested%20in%20working%20abroad."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-white/60 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-emerald-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012.01 0C5.39 0 0 5.39 0 12.01a11.93 11.93 0 001.61 6L0 24l6.18-1.62a11.94 11.94 0 005.83 1.49h.01c6.62 0 12-5.39 12-12.01a11.93 11.93 0 00-3.5-8.38zM17.39 14.45c-.29-.15-1.74-.86-2.01-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.45 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.34z"/></svg>
              {t("finalCta.whatsapp")}
            </a>
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
      </section>
    </>
  );
}
