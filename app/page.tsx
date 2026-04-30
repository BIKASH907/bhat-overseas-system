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
    benefits: ["Seasonal & Full-time Jobs", "High Demand for Workers", "Easy Process"]
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    code: "RO",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=70",
    benefits: ["Work Permit Visa", "Good Salary & Benefits", "Multiple Job Sectors"]
  },
  {
    name: "Austria",
    flag: "🇦🇹",
    code: "AT",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=70",
    benefits: ["Seasonal Jobs", "Attractive Salary", "Schengen Country"]
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
  { iconBg: "bg-amber-50", iconColor: "text-amber-700", icon: "🏅", title: "98%", subtitle: "Visa Success Rate" },
  { iconBg: "bg-rose-50", iconColor: "text-rose-700", icon: "🎧", title: "24/7 Support", subtitle: "From Application to Abroad" }
];

// Stats — bottom strip of the home page
const bigStats = [
  { value: "10+", label: "Years of Experience" },
  { value: "15,000+", label: "Workers Placed" },
  { value: "3+", label: "Countries" },
  { value: "500+", label: "Trusted Employers" }
];

// Why-choose-us features
const whyFeatures = [
  { icon: "🛡️", title: "Govt. Licensed", body: "Authorized Recruitment Agency" },
  { icon: "💰", title: "No Hidden Charge", body: "Transparent Process and Fees" },
  { icon: "👥", title: "End-to-End Support", body: "From Application to Departure" },
  { icon: "🎯", title: "Visa Success Rate", body: "High Visa Success Record" }
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
      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-white">
        <div className="mx-auto grid max-w-7xl container-px py-16 lg:grid-cols-2 lg:gap-12 lg:py-24">
          {/* Left: text */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
              🏆 Trusted Recruitment Partner for Nepali Workers
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
              Work Abroad.
              <br />
              Build a <span className="text-accent-500">Better Life.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
              Explore overseas job opportunities in{" "}
              <strong className="text-brand-700">Turkey, Romania &amp; Austria</strong> with an
              easy visa process and full support — start to finish.
            </p>

            {/* Feature pills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg">💰</div>
                <div>
                  <div className="text-xs font-bold leading-tight text-slate-900">High Salary</div>
                  <div className="text-[11px] text-slate-500">€550 – €1,500</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg">🛡️</div>
                <div>
                  <div className="text-xs font-bold leading-tight text-slate-900">100% Legal</div>
                  <div className="text-[11px] text-slate-500">Govt. Licensed</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg">⚡</div>
                <div>
                  <div className="text-xs font-bold leading-tight text-slate-900">Fast Process</div>
                  <div className="text-[11px] text-slate-500">2 – 3 Months</div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/apply" className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-brand-700/30 transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-xl">
                APPLY NOW
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/jobs" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-accent-500 px-7 py-3.5 font-bold text-accent-600 transition hover:bg-accent-500 hover:text-white">
                VIEW JOBS
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z" /></svg>
              </Link>
            </div>
          </div>

          {/* Right: hero image — bleeds naturally into the page, no heavy card */}
          <div className="relative mt-10 lg:mt-0 lg:-mr-8 xl:-mr-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-workers.png"
              alt="Happy Nepali workers placed by Bhat Overseas — construction, hospitality, factory, and chef roles in Turkey"
              className="relative z-10 block h-full w-full object-cover"
              loading="eager"
            />

            {/* Floating "16+ Verified Partners" badge */}
            <div className="absolute z-20 bottom-6 right-2 sm:right-8 flex items-center gap-3 rounded-2xl bg-brand-700 px-4 py-2.5 shadow-2xl ring-2 ring-white">
              <div className="flex -space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-sm ring-2 ring-white">👷</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400 text-sm ring-2 ring-white">👩</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-400 text-sm ring-2 ring-white">👨</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white ring-2 ring-white">+</div>
              </div>
              <div className="text-white">
                <div className="text-base font-extrabold leading-tight">16+ Verified</div>
                <div className="text-[10px] font-medium text-blue-200">EU Partner Employers</div>
              </div>
            </div>

            {/* Soft glow background */}
            <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-tr from-brand-200/40 via-transparent to-accent-100/30 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ====== TRUST BAR — clean white card with vertical dividers ====== */}
      <section className="relative -mt-6 z-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 sm:p-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                  <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${item.iconBg} text-2xl`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-lg font-extrabold leading-tight text-slate-900">{item.title}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== COUNTRIES WE SERVE ====== */}
      <section className="section">
        <div className="mx-auto max-w-7xl container-px">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Popular Destinations</p>
              <h2 className="mt-2 heading-2">Countries We Serve</h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />
            </div>
            <Link href="/countries" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-700 hover:text-brand-700">
              VIEW ALL COUNTRIES
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
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Brand-color fallback gradient (visible behind image, also on image-fail) */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900 -z-10" />
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
                    {c.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold">✓</span>
                        {b}
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Featured Jobs</p>
                <h2 className="mt-2 heading-2">Latest Job Opportunities</h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />
              </div>
              <Link href="/jobs" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-700 hover:text-brand-700">
                VIEW ALL JOBS
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Featured Jobs</p>
                <h2 className="mt-2 heading-2">Latest Job Opportunities</h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-accent-500" />
              </div>
            </div>
            <div className="mt-8 rounded-2xl border-2 border-dashed border-brand-200 bg-white px-8 py-12 text-center sm:px-16">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-3xl">📋</div>
              <h3 className="mt-6 heading-3">New Openings Coming Soon</h3>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                We are currently verifying fresh openings with our partner employers in Turkey, Romania, and Austria.
                Apply now and we'll match you with the right opportunity as soon as it opens.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <Link href="/apply" className="btn-accent">Apply Now →</Link>
                <Link href="/contact" className="btn-outline">Contact Us</Link>
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
                  Ready to Start Your Journey?
                </h3>
                <p className="mt-3 text-blue-100">
                  Apply now and our team will guide you at every step — from paperwork to airport.
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
              🤝 Verified Partnerships
            </span>
            <h2 className="mt-5 heading-2">Our Trusted Partner Employers</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Bhat Overseas works <strong className="text-slate-900">directly</strong> with these verified employers across our destination countries — no middlemen, no surprises.
            </p>
          </div>

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

      {/* ====== TESTIMONIALS ====== */}
      <section className="section bg-slate-50">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">What Our Clients Say</p>
            <h2 className="mt-2 heading-2">Trusted by Thousands of<br />Happy Workers</h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent-500" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Suresh Tamang",
                role: "Working in Turkey",
                quote: "Bhat Overseas helped me get a great job in Turkey. The process was smooth and easy.",
                initial: "S",
                color: "from-blue-500 to-brand-700"
              },
              {
                name: "Maya Gurung",
                role: "Working in Romania",
                quote: "Very professional team. I got my visa on time and good support after arrival.",
                initial: "M",
                color: "from-pink-500 to-purple-600"
              },
              {
                name: "Dipak Karki",
                role: "Working in Austria",
                quote: "Best consultancy in Nepal for Europe jobs. Highly recommended!",
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
                    <div className="text-xs text-slate-500">{tst.role}</div>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-700">&ldquo;{tst.quote}&rdquo;</p>
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
            {bigStats.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                  <span className="text-2xl">{["📅", "👥", "🌍", "🏢"][i]}</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold leading-none">{s.value}</div>
                  <div className="mt-1 text-sm font-medium text-blue-200">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
