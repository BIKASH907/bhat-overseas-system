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
          <p className="lead">{t("about.intro")}</p>

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
              <div className="text-4xl font-extrabold text-brand-700">500+</div>
              <div className="mt-1 text-sm text-slate-600">Workers placed abroad</div>
            </div>
            <div className="rounded-xl bg-brand-50 p-6">
              <div className="text-4xl font-extrabold text-brand-700">3</div>
              <div className="mt-1 text-sm text-slate-600">Destination countries</div>
            </div>
            <div className="rounded-xl bg-brand-50 p-6">
              <div className="text-4xl font-extrabold text-brand-700">98%</div>
              <div className="mt-1 text-sm text-slate-600">On-time placement rate</div>
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
