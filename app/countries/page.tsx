"use client";

import Link from "next/link";
import { countryInfo } from "@/lib/seed-jobs";
import { useI18n } from "@/lib/i18n";

const order: Array<keyof typeof countryInfo> = ["Turkey", "Romania", "Austria"];
const flag: Record<string, string> = { Turkey: "🇹🇷", Romania: "🇷🇴", Austria: "🇦🇹" };

export default function CountriesPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl container-px">
          <h1 className="heading-1 !text-white">{t("countries.title")}</h1>
          <p className="mt-3 text-lg text-blue-100">{t("countries.subtitle")}</p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-5xl container-px space-y-12">
          {order.map((c) => {
            const info = countryInfo[c];
            return (
              <article key={c} id={c.toLowerCase()} className="card !p-8">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{flag[c]}</div>
                  <div>
                    <h2 className="heading-2">{c}</h2>
                    <p className="mt-1 text-slate-600">{info.description}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{t("countries.visaType")}</div>
                    <div className="mt-1 font-semibold text-slate-900">{info.visaType}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{t("countries.salaryRange")}</div>
                    <div className="mt-1 font-semibold text-brand-700">{info.salaryRange}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{t("countries.processingTime")}</div>
                    <div className="mt-1 font-semibold text-slate-900">{info.processingTime}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{t("countries.sectors")}</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {info.sectors.map((s) => (
                        <span key={s} className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider text-slate-500">{t("common.requirements")}</div>
                  <ul className="mt-2 space-y-1.5">
                    {info.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-0.5 text-emerald-600">✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex gap-3">
                  <Link href={`/jobs?country=${c}`} className="btn-primary">
                    {t("common.viewJobs")}
                  </Link>
                  <Link href={`/apply?country=${c}`} className="btn-outline">
                    {t("common.applyNow")}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
