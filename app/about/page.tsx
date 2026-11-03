"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl container-px">
          <h1 className="heading-1 !text-white">{t("about.title")}</h1>
          <p className="mt-3 text-lg text-blue-100">{t("about.subtitle")}</p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-4xl container-px">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 ring-1 ring-brand-100">
            {t("about.estBadge")}
          </span>
          <p className="lead mt-5">{t("about.intro1")}</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{t("about.intro2")}</p>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-brand-800">{t("about.missionStatement")}</p>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{t("about.processNote")}</p>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{t("about.network")}</p>
          <p className="mt-4 rounded-xl border-l-4 border-accent-500 bg-amber-50 p-5 text-base font-semibold italic leading-relaxed text-slate-800">
            {t("about.commitment")}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="card">
              <div className="text-3xl">🎯</div>
              <h2 className="mt-3 heading-3">{t("about.mission.title")}</h2>
              <p className="mt-3 text-slate-700">{t("about.mission.body")}</p>
            </div>
            <div className="card">
              <div className="text-3xl">🌟</div>
              <h2 className="mt-3 heading-3">{t("about.vision.title")}</h2>
              <p className="mt-3 text-slate-700">{t("about.vision.body")}</p>
            </div>
          </div>

          {/* ====== OUR TEAM — Bikash (Founder & CEO) ====== */}
          <div className="mt-16">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("team.label")}</p>
              <h2 className="mt-2 heading-3">{t("team.title")}</h2>
              <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent-500" />
              <p className="mx-auto mt-4 max-w-xl text-slate-600">{t("team.subtitle")}</p>
            </div>

            <div className="mx-auto mt-10 max-w-md">
              {/* === Bikash Bhat — Founder & CEO === */}
              <article className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 via-white to-amber-50 p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-700 to-accent-500 opacity-20 blur-xl" aria-hidden />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/bikash.jpg"
                      alt="Bikash Bhat — Founder & CEO of Bhat Overseas"
                      className="relative h-36 w-36 rounded-full object-cover shadow-xl ring-4 ring-white sm:h-44 sm:w-44"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-900 sm:text-2xl">
                    Bikash Bhat
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {t("team.bikash.role")}
                  </span>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://flagcdn.com/h60/np.png" alt="Nepal flag" className="h-5 w-auto object-contain" />
                    {t("team.bikash.location")}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {t("team.bikash.bio")}
                  </p>
                </div>
              </article>
            </div>

            <blockquote className="mt-8 border-l-4 border-accent-500 bg-amber-50 p-5 text-base italic leading-relaxed text-slate-800">
              &ldquo;{t("about.founderQuote")}&rdquo;
              <footer className="mt-2 not-italic text-sm font-semibold text-slate-600">— Bikash Bhat, {t("team.bikash.role")}</footer>
            </blockquote>
          </div>

          <div className="mt-12">
            <h2 className="heading-3">{t("about.values.title")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: "🔎", k: "transparency" },
                { icon: "🤝", k: "integrity" },
                { icon: "💙", k: "care" },
                { icon: "✨", k: "quality" }
              ].map((v) => (
                <div key={v.k} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-2xl">{v.icon}</div>
                  <p className="text-slate-700">{t(`about.values.${v.k}`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3 text-center">
            <div className="rounded-xl bg-brand-50 p-6">
              <div className="text-4xl font-extrabold text-brand-700">1,000+</div>
              <div className="mt-1 text-sm text-slate-600">{t("about.stat.workers")}</div>
            </div>
            <div className="rounded-xl bg-brand-50 p-6">
              <div className="text-4xl font-extrabold text-brand-700">3</div>
              <div className="mt-1 text-sm text-slate-600">{t("about.stat.countries")}</div>
            </div>
            <div className="rounded-xl bg-brand-50 p-6">
              <div className="text-4xl font-extrabold text-brand-700">16+</div>
              <div className="mt-1 text-sm text-slate-600">{t("about.stat.partners")}</div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/jobs" className="btn-primary">{t("common.viewJobs")}</Link>
            <Link href="/contact" className="btn-outline">{t("nav.contact")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
