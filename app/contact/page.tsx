"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const phone = process.env.NEXT_PUBLIC_PHONE || "+977 9764274854";
  const email = process.env.NEXT_PUBLIC_EMAIL || "bhatoverseas36@gmail.com";
  const address = process.env.NEXT_PUBLIC_ADDRESS || "Kathmandu, Nepal";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "9779764274854";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const body = {
      type: "inquiry",
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message")
    };
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl container-px">
          <h1 className="heading-1 !text-white">{t("contact.title")}</h1>
          <p className="mt-3 text-lg text-blue-100">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-6xl container-px grid gap-10 lg:grid-cols-2">
          {/* Contact info + map */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-2xl">📍</div>
                <div>
                  <div className="font-semibold text-slate-900">{t("contact.address")}</div>
                  <div className="mt-1 text-slate-700">{address}</div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-2xl">📞</div>
                <div>
                  <div className="font-semibold text-slate-900">{t("contact.phone")}</div>
                  <a href={`tel:${phone}`} className="mt-1 block text-slate-700 hover:text-brand-700">{phone}</a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-2xl">💬</div>
                <div>
                  <div className="font-semibold text-slate-900">{t("contact.whatsapp")}</div>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-emerald-700 hover:underline"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-2xl">✉️</div>
                <div>
                  <div className="font-semibold text-slate-900">{t("contact.email")}</div>
                  <a href={`mailto:${email}`} className="mt-1 block text-slate-700 hover:text-brand-700">{email}</a>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-2xl">🕐</div>
                <div>
                  <div className="font-semibold text-slate-900">{t("contact.workingHours")}</div>
                  <div className="mt-1 text-slate-700">{t("contact.hoursValue")}</div>
                </div>
              </div>
            </div>

            {/* === Turkey representative — local contact in Türkiye === */}
            <div className="overflow-hidden rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 via-white to-red-50 shadow-sm">
              <div className="border-b border-red-100 bg-white/60 px-5 py-3">
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://flagcdn.com/w40/tr.png"
                    alt="Türkiye flag"
                    className="h-4 w-6 rounded-sm object-cover ring-1 ring-red-200"
                  />
                  <div className="text-xs font-bold uppercase tracking-wider text-red-700">
                    {t("turkeyRep.label")}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-xl ring-2 ring-red-200">
                    👤
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-lg font-bold text-slate-900">{t("turkeyRep.name")}</div>
                    <div className="text-sm text-slate-600">{t("turkeyRep.role")}</div>
                    <div className="mt-3 grid gap-2">
                      <a
                        href="tel:+905342307832"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-red-700"
                      >
                        <span className="text-base">📞</span>
                        {t("turkeyRep.phone")}
                      </a>
                      <a
                        href="https://wa.me/905342307832"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0012.01 0C5.39 0 0 5.39 0 12.01a11.93 11.93 0 001.61 6L0 24l6.18-1.62a11.94 11.94 0 005.83 1.49h.01c6.62 0 12-5.39 12-12.01a11.93 11.93 0 00-3.5-8.38zM17.39 14.45c-.29-.15-1.74-.86-2.01-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.45 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.34z"/></svg>
                        {t("turkeyRep.whatsappCta")}
                      </a>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500">{t("turkeyRep.note")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xl">🛡️</div>
                <p className="text-sm font-medium leading-relaxed text-brand-900">
                  {t("contact.officeNotice")}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Bhat Overseas office location"
                src="https://www.google.com/maps?q=Kathmandu,+Nepal&output=embed"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Inquiry form */}
          <div>
            <h2 className="heading-3">{t("contact.formTitle")}</h2>
            {status === "success" ? (
              <div className="mt-6 rounded-xl bg-emerald-50 p-6 text-center">
                <div className="text-4xl">✓</div>
                <p className="mt-3 font-semibold text-emerald-800">{t("common.thankYou")}</p>
                <p className="mt-1 text-sm text-emerald-700">{t("common.applicationReceived")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                  <label className="label">{t("contact.name")} *</label>
                  <input name="name" required className="input" />
                </div>
                <div>
                  <label className="label">{t("contact.email")} *</label>
                  <input name="email" type="email" required className="input" />
                </div>
                <div>
                  <label className="label">{t("contact.subject")}</label>
                  <input name="subject" className="input" />
                </div>
                <div>
                  <label className="label">{t("contact.message")} *</label>
                  <textarea name="message" rows={5} required className="input" />
                </div>
                {status === "error" && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{t("common.error")}</div>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary w-full !py-3.5 disabled:opacity-50"
                >
                  {status === "submitting" ? t("common.submitting") : t("contact.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
