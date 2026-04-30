"use client";

import Link from "next/link";
import { countryInfo } from "@/lib/seed-jobs";
import { useI18n } from "@/lib/i18n";

const order: Array<keyof typeof countryInfo> = ["Turkey", "Romania", "Austria"];
const flag: Record<string, string> = { Turkey: "🇹🇷", Romania: "🇷🇴", Austria: "🇦🇹" };

// Bhat Overseas's verified Turkish partner companies (workers placed via these employers)
const turkeyPartners: string[] = [
  "DOĞA GALVANİZ METAL MAKİNE İNŞAAT NAKLİYE SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
  "BAHA GRUP ORMAN ÜRÜNLERİ SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
  "DLN KALIP VE İNŞAAT SANAYI TİCARET LİMİTED ŞİRKETİ",
  "MNC PİGMENT AV SANAYI TİCARET ANONİM ŞİRKETİ",
  "OYTUN YUMURTA YARKA HAYVANCILIK YEM GIDA İNŞAAT NAKLİYAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ",
  "NUR SEM ELEKTRİK İMALAT NAKLİYE İNŞAAT TEKSTİL SANAYİ TİCARET LİMİTED ŞİRKET",
  "KÖKSAN PET VE PLASTİK AMBALAJ SAN. VE TİC. A.Ş.",
  "TEKKELİ GIDA SANAYİ TİCARET ANONİM ŞİRKETİ",
  "SENETA TURIZM İNŞAAT EMLAK TAŞIMACILIK TİCARET LTD. ŞTİ. / RIOS BEACH OTEL",
  "KUTLUSAN KAFES EKİPMAN VE HAYVANCILIK SAN. VE TİC. A.Ş.",
  "AHŞAP URUN SANAYI ANONİM ŞİRKETİ",
  "ALANYA ÖZKAYMAK TURIZM İŞLETMECİLİĞİ ANONİM ŞİRKETİ",
  "EMMİDAĞ MERMER VE MADENCİLİK SANAYİ TİCARET LİMİTED ŞİRKETİ",
  "GRANİTSAN MADENCİLİK İNŞAAT SANAYİ VE TİCARET ANONİM ŞİRKETİ",
  "MARTI TERMAL TURIZM İNŞAAT SANAYİ VE TİCARET ANONİM ŞİRKETİ / CROWNE PLAZA"
];

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

                {/* Partner companies — currently only for Turkey */}
                {c === "Turkey" && (
                  <div className="mt-8 rounded-xl bg-brand-50 p-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🤝</span>
                      <h3 className="text-lg font-bold text-slate-900">
                        Our Partner Companies in Turkey
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Bhat Overseas works directly with the following verified Turkish employers:
                    </p>
                    <ol className="mt-4 grid gap-2 text-sm text-slate-800 sm:grid-cols-1">
                      {turkeyPartners.map((name, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-lg bg-white px-3 py-2 shadow-sm">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="leading-snug">{name}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

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
