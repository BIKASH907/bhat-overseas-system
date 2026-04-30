"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const phone = process.env.NEXT_PUBLIC_PHONE || "+977 9800000000";
const email = process.env.NEXT_PUBLIC_EMAIL || "info@bhatoverseas.com";
const address = process.env.NEXT_PUBLIC_ADDRESS || "Kathmandu, Nepal";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl container-px py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-700 text-white font-bold">
                BO
              </div>
              <div className="text-lg font-bold text-white">Bhat Overseas</div>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{t("footer.tagline")}</p>
            <p className="mt-3 text-xs text-slate-400">{t("footer.disclaimer")}</p>
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

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-400">
          © {year} Bhat Overseas Pvt Ltd. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
