"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const phone = process.env.NEXT_PUBLIC_PHONE || "+977 9764274854";
const email = process.env.NEXT_PUBLIC_EMAIL || "bhatoverseas36@gmail.com";
const address = process.env.NEXT_PUBLIC_ADDRESS || "Kathmandu, Nepal";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 bg-white text-slate-700">
      {/* Top accent stripe — brand orange to keep visual identity */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "linear-gradient(to right, #FF6B00, #FFAB5C, #FF6B00)" }}
        aria-hidden
      />

      {/* Subtle top border below stripe */}
      <div className="border-t border-slate-100 pt-1" />

      <div className="mx-auto max-w-7xl container-px py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            {/* Logo — large, clean (logo has white background so no card needed) */}
            <Link href="/" className="group inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Bhat Overseas"
                className="h-14 w-auto transition duration-300 group-hover:scale-110 sm:h-16 lg:h-20"
                style={{ filter: "drop-shadow(0 6px 16px rgba(10, 61, 145, 0.18))" }}
              />
            </Link>
            <p className="mt-4 text-sm font-bold italic" style={{ color: "#FF6B00" }}>
              {t("footer.builtBridges")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("footer.tagline")}</p>
            <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium leading-relaxed text-emerald-800">
              {t("footer.trustLine")}
            </p>
            <p className="mt-3 text-xs text-slate-500">{t("footer.disclaimer")}</p>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-wider" style={{ color: "#0A3D91" }}>
              {t("footer.quickLinks")}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/jobs" className="text-slate-600 transition hover:text-brand-700">{t("nav.jobs")}</Link></li>
              <li><Link href="/countries" className="text-slate-600 transition hover:text-brand-700">{t("nav.countries")}</Link></li>
              <li><Link href="/process" className="text-slate-600 transition hover:text-brand-700">Process</Link></li>
              <li><Link href="/apply" className="text-slate-600 transition hover:text-brand-700">{t("nav.apply")}</Link></li>
              <li><Link href="/about" className="text-slate-600 transition hover:text-brand-700">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="text-slate-600 transition hover:text-brand-700">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-bold uppercase tracking-wider" style={{ color: "#0A3D91" }}>
              {t("footer.contact")}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📞</span>
                <a href={`tel:${phone}`} className="transition hover:text-brand-700">{phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">✉️</span>
                <a href={`mailto:${email}`} className="transition hover:text-brand-700">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row">
          <div>© {year} Bhat Overseas Pvt Ltd. {t("footer.rights")}</div>
          <div className="font-semibold" style={{ color: "#0A3D91" }}>
            Govt. Lic No.: 186/061/062
          </div>
        </div>
      </div>
    </footer>
  );
}
