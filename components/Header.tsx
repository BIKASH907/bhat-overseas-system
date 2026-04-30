"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LANGS, Lang } from "@/lib/translations";
import TopBar from "@/components/TopBar";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/jobs", label: t("nav.jobs") },
    { href: "/countries", label: t("nav.countries") },
    { href: "/process", label: "Process" },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
      <TopBar />
      <div className="mx-auto flex max-w-7xl items-center justify-between container-px py-4">
        <Link
          href="/"
          className="group flex items-center transition"
          aria-label="Bhat Overseas — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="Bhat Overseas — Building Bridges, Empowering Nations"
            className="h-16 w-auto transition duration-300 group-hover:scale-105 sm:h-20"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-700 transition hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Lang)}
                className={`rounded px-2.5 py-1 text-xs font-semibold transition ${
                  lang === l.code
                    ? "bg-brand-700 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-label={`Switch to ${l.label}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Link href="/apply" className="hidden sm:inline-flex btn-accent !py-2.5 !px-4 text-sm">
            {t("nav.apply")}
          </Link>
          <button
            className="lg:hidden rounded-lg border border-slate-200 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col container-px py-4 max-w-7xl mx-auto">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-slate-700"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="btn-accent mt-3 !py-2.5"
            >
              {t("nav.apply")}
            </Link>
            <div className="mt-4 flex items-center gap-2">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code as Lang)}
                  className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                    lang === l.code
                      ? "bg-brand-700 text-white"
                      : "border border-slate-200 text-slate-600"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
