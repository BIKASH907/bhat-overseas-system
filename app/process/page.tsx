"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const stepKeys = [
  { n: 1, titleKey: "process.step1.title", bodyKey: "process.step1.body", icon: "🔍", color: "from-brand-500 to-brand-700" },
  { n: 2, titleKey: "process.step2.title", bodyKey: "process.step2.body", icon: "💬", color: "from-cyan-500 to-blue-600" },
  { n: 3, titleKey: "process.step3.title", bodyKey: "process.step3.body", icon: "📄", color: "from-amber-500 to-orange-600", highlight: true },
  { n: 4, titleKey: "process.step4.title", bodyKey: "process.step4.body", icon: "🛂", color: "from-emerald-500 to-teal-600" },
  { n: 5, titleKey: "process.step5.title", bodyKey: "process.step5.body", icon: "✈️", color: "from-indigo-500 to-purple-600" }
];

export default function ProcessPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl container-px">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ring-white/20">
            🛡️ {t("process.label")}
          </span>
          <h1 className="mt-5 heading-1 !text-white">{t("process.title")}</h1>
          <p className="mt-4 max-w-3xl text-lg text-blue-100">
            {t("process.intro")}
          </p>
        </div>
      </section>

      <section className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-7xl container-px py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl">⚠️</div>
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-amber-800">{t("process.docPolicyLabel")}</div>
              <p className="mt-1 text-base font-semibold text-amber-900">{t("process.docPolicyText")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-4xl container-px">
          <div className="space-y-6">
            {stepKeys.map((s) => (
              <article
                key={s.n}
                className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 transition hover:shadow-md sm:p-8 ${
                  s.highlight ? "ring-2 ring-amber-300" : "ring-slate-200"
                }`}
              >
                {s.highlight && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    ★ {t("process.criticalStep")}
                  </span>
                )}
                <div className="flex gap-5">
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-2xl text-white shadow-md`}>
                      {s.icon}
                    </div>
                    <div className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t("process.step")} {s.n}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{t(s.titleKey)}</h2>
                    <p className="mt-3 leading-relaxed text-slate-700">{t(s.bodyKey)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 p-8 text-center text-white shadow-xl sm:p-12">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{t("process.cta.title")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">{t("process.cta.body")}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-accent">{t("btn.applyNow")} →</Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                {t("process.cta.contact")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
