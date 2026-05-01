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

          {/* ====== OUR TEAM — Bikash (Founder & CEO) + Ebubekir (Türkiye Representative) ====== */}
          <div className="mt-16">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">{t("team.label")}</p>
              <h2 className="mt-2 heading-3">{t("team.title")}</h2>
              <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-accent-500" />
              <p className="mx-auto mt-4 max-w-xl text-slate-600">{t("team.subtitle")}</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
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

              {/* === Ebubekir Güneş — Türkiye Representative === */}
              <article className="overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 via-white to-red-50 p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md sm:p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-20 blur-xl" aria-hidden />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Ebubekir.png"
                      alt="Ebubekir Güneş — Türkiye Representative of Bhat Overseas"
                      className="relative h-36 w-36 rounded-full object-cover shadow-xl ring-4 ring-white sm:h-44 sm:w-44"
                    />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-slate-900 sm:text-2xl">
                    Ebubekir Güneş
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-700 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {t("team.ebubekir.role")}
                  </span>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://flagcdn.com/w80/tr.png" alt="Türkiye flag" className="h-4 w-6 rounded-sm object-cover ring-1 ring-slate-200" />
                    {t("team.ebubekir.location")}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {t("team.ebubekir.bio")}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <a
                      href="tel:+905342307832"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-700"
                    >
                      📞 0534 230 78 32
                    </a>
                    <a
                      href="https://wa.me/905342307832"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012.01 0C5.39 0 0 5.39 0 12.01a11.93 11.93 0 001.61 6L0 24l6.18-1.62a11.94 11.94 0 005.83 1.49h.01c6.62 0 12-5.39 12-12.01a11.93 11.93 0 00-3.5-8.38zM17.39 14.45c-.29-.15-1.74-.86-2.01-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.45 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.34z"/></svg>
                      WhatsApp
                    </a>
                  </div>
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
