"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const phone = process.env.NEXT_PUBLIC_PHONE || "+977 9800000000";
  const email = process.env.NEXT_PUBLIC_EMAIL || "info@bhatoverseas.com";
  const address = process.env.NEXT_PUBLIC_ADDRESS || "Kathmandu, Nepal";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "9779800000000";

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
