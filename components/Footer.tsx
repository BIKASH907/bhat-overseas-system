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
    <footer
      className="relative mt-20 text-blue-100"
      style={{ background: "linear-gradient(180deg, #0A3D91 0%, #06296A 100%)" }}
    >
      {/* Top accent stripe */}
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "linear-gradient(to right, #FF6B00, #FFAB5C, #FF6B00)" }}
        aria-hidden
      />
      <div className="mx-auto max-w-7xl container-px py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            {/* Logo — white card with soft glow halo for premium feel */}
            <div className="relative inline-block">
              <div
                className="absolute -inset-2 rounded-xl opacity-40 blur-lg"
                style={{ background: "linear-gradient(135deg, #FF6B00 0%, #FFAB5C 100%)" }}
                aria-hidden
              />
              <div className="relative inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-xl ring-1 ring-white/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.jpg"
                  alt="Bhat Overseas"
                  className="h-14 w-auto"
                />
              </div>
            </div>
            <p className="mt-5 text-sm font-bold italic text-orange-300">
              Building Bridges, Empowering Nations
            </p>
            <p className="mt-3 text-sm leading-relaxed">{t("footer.tagline")}</p>
            <p className="mt-3 rounded-lg border border-emerald-700/40 bg-emerald-900/30 px-3 py-2 text-xs font-medium leading-relaxed text-emerald-100">
              ✓ A trusted and ethical manpower company ensuring safe recruitment for Nepali workers.
            </p>
            <p className="mt-3 text-xs text-blue-300/80">{t("footer.disclaimer")}</p>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-white">
              {t("footer.quickLinks")}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-white">{t("nav.jobs")}</Link></li>
              <li><Link href="/countries" className="hover:text-white">{t("nav.countries")}</Link></li>
              <li><Link href="/apply" className="hover:text-white">{t("nav.apply")}</Link></li>
              <li><Link href="/about" className="hover:text-white">{t("nav.about")}</Link></li>
              <li><Link href="/contact" className="hover:text-white">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-white">
              {t("footer.contact")}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{address}</li>
              <li>
                <a href={`tel:${phone}`} className="hover:text-white">{phone}</a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-blue-200">
          © {year} Bhat Overseas Pvt Ltd. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
