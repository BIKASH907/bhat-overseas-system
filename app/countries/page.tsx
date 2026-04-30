"use client";

import Link from "next/link";
import { countryInfo } from "@/lib/seed-jobs";
import { useI18n } from "@/lib/i18n";

const order: Array<keyof typeof countryInfo> = ["Turkey", "Romania", "Austria"];

const meta: Record<string, { flag: string; image: string; gradient: string; tagline: string }> = {
  Turkey: {
    flag: "🇹🇷",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-red-600 via-red-700 to-red-900",
    tagline: "Factory · Hospitality · Construction"
  },
  Romania: {
    flag: "🇷🇴",
    image: "/romania.png",
    gradient: "from-blue-700 via-amber-500 to-red-700",
    tagline: "Construction · Agriculture · Manufacturing"
  },
  Austria: {
    flag: "🇦🇹",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=70",
    gradient: "from-red-700 via-white to-red-700",
    tagline: "Hospitality · Agriculture · Factory"
  }
};

// Bhat Overseas's verified partner companies, by country
type Partner = { name: string; website?: string };

const partnersByCountry: Partial<Record<keyof typeof countryInfo, Partner[]>> = {
  Turkey: [
    { name: "DOĞA GALVANİZ METAL MAKİNE İNŞAAT NAKLİYE SANAYİ VE TİCARET LİMİTED ŞİRKETİ" },
    { name: "BAHA GRUP ORMAN ÜRÜNLERİ SANAYİ VE TİCARET LİMİTED ŞİRKETİ" },
    { name: "DLN KALIP VE İNŞAAT SANAYI TİCARET LİMİTED ŞİRKETİ" },
    { name: "MNC PİGMENT AV SANAYI TİCARET ANONİM ŞİRKETİ" },
    { name: "OYTUN YUMURTA YARKA HAYVANCILIK YEM GIDA İNŞAAT NAKLİYAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ" },
    { name: "NUR SEM ELEKTRİK İMALAT NAKLİYE İNŞAAT TEKSTİL SANAYİ TİCARET LİMİTED ŞİRKET" },
    { name: "KÖKSAN PET VE PLASTİK AMBALAJ SAN. VE TİC. A.Ş." },
    { name: "TEKKELİ GIDA SANAYİ TİCARET ANONİM ŞİRKETİ" },
    { name: "SENETA TURIZM İNŞAAT EMLAK TAŞIMACILIK TİCARET LTD. ŞTİ. / RIOS BEACH OTEL" },
    { name: "KUTLUSAN KAFES EKİPMAN VE HAYVANCILIK SAN. VE TİC. A.Ş." },
    { name: "AHŞAP URUN SANAYI ANONİM ŞİRKETİ" },
    { name: "ALANYA ÖZKAYMAK TURIZM İŞLETMECİLİĞİ ANONİM ŞİRKETİ" },
    { name: "EMMİDAĞ MERMER VE MADENCİLİK SANAYİ TİCARET LİMİTED ŞİRKETİ" },
    { name: "GRANİTSAN MADENCİLİK İNŞAAT SANAYİ VE TİCARET ANONİM ŞİRKETİ" },
    { name: "MARTI TERMAL TURIZM İNŞAAT SANAYİ VE TİCARET ANONİM ŞİRKETİ / CROWNE PLAZA" }
  ],
  Romania: [
    { name: "Prime Link Human Capital", website: "https://primelinkhumancapital.com" }
  ]
};

export default function CountriesPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 text-white sm:py-20"
        style={{ background: "linear-gradient(135deg, #0A3D91 0%, #06296A 100%)" }}
      >
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
        <div className="relative mx-auto max-w-7xl container-px">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ring-white/20">
            🌍 Destination Countries
          </span>
          <h1 className="mt-5 heading-1 !text-white">{t("countries.title")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">{t("countries.subtitle")}</p>

          {/* Quick country chips */}
          <div className="mt-7 flex flex-wrap gap-3">
            {order.map((c) => (
              <a
                key={c}
                href={`#${c.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/30 backdrop-blur transition hover:bg-white hover:text-brand-800"
              >
                <span>{meta[c].flag}</span> {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Country cards */}
      <section className="section">
        <div className="mx-auto max-w-6xl container-px space-y-16">
          {order.map((c) => {
            const info = countryInfo[c];
            const m = meta[c];
            const partners = partnersByCountry[c] || [];

            return (
              <article
                key={c}
                id={c.toLowerCase()}
                className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200"
              >
                {/* Header: city image + flag overlay */}
                <div className="relative h-56 sm:h-72">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt={c}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${m.gradient} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />

                  {/* Country header content */}
                  <div className="relative flex h-full items-end p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-white">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 text-4xl shadow-xl">
                        {m.flag}
                      </div>
                      <div>
                        <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">{c}</h2>
                        <p className="text-sm font-medium text-blue-100 sm:text-base">{m.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                  <p className="text-base leading-relaxed text-slate-700">{info.description}</p>

                  {/* 4-cell stat grid */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCell icon="📋" label={t("countries.visaType")} value={info.visaType} />
                    <StatCell icon="💰" label={t("countries.salaryRange")} value={info.salaryRange} accent />
                    <StatCell icon="⏱️" label={t("countries.processingTime")} value={info.processingTime} />
                    <StatCell icon="🏭" label={t("countries.sectors")} value={info.sectors.join(", ")} />
                  </div>

                  {/* Requirements */}
                  <div className="mt-8 rounded-2xl bg-slate-50 p-5 sm:p-6">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✓</span>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        {t("common.requirements")}
                      </h3>
                    </div>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {info.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-700">✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Partner companies */}
                  {partners.length > 0 && (
                    <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-brand-200" style={{ background: "linear-gradient(135deg, #F5F8FF 0%, #FFFFFF 100%)" }}>
                      <div className="border-b border-brand-100 bg-white/60 px-6 py-4">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-brand-700">
                              🤝 Verified Partner Employers
                            </div>
                            <h3 className="mt-1 text-lg font-bold text-slate-900">
                              Our Partners in {c}
                            </h3>
                          </div>
                          <span className="rounded-full bg-brand-700 px-3 py-1 text-xs font-bold text-white">
                            {partners.length} {partners.length === 1 ? "Partner" : "Partners"}
                          </span>
                        </div>
                      </div>
                      <ol className="grid gap-2 p-4 text-sm sm:grid-cols-1 sm:p-6">
                        {partners.map((p, i) => (
                          <li key={i} className="flex items-start gap-3 rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
                            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: "#0A3D91" }}>
                              {i + 1}
                            </span>
                            <span className="leading-snug text-slate-800 flex-1">
                              <span className="font-semibold">{p.name}</span>
                              {p.website && (
                                <>
                                  {" "}
                                  <span className="text-slate-400">·</span>{" "}
                                  <a
                                    href={p.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-brand-700 hover:underline"
                                  >
                                    {p.website.replace(/^https?:\/\//, "")} ↗
                                  </a>
                                </>
                              )}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/jobs?country=${c}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5"
                      style={{ background: "#0A3D91" }}
                    >
                      {t("common.viewJobs")} →
                    </Link>
                    <Link
                      href={`/apply?country=${c}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:text-white"
                      style={{ borderColor: "#FF6B00", color: "#FF6B00" }}
                    >
                      {t("common.applyNow")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function StatCell({ icon, label, value, accent }: { icon: string; label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
      </div>
      <div className={`mt-2 text-sm font-bold leading-snug ${accent ? "text-brand-700" : "text-slate-900"}`}>
        {value}
      </div>
    </div>
  );
}
