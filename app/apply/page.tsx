"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";

function ApplyForm() {
  const { t } = useI18n();
  const sp = useSearchParams();
  const prefilledJob = sp?.get("job") || "";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/applications", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Submission failed");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Network error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl container-px py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
          ✓
        </div>
        <h1 className="mt-6 heading-2">{t("common.thankYou")}</h1>
        <p className="mt-3 text-lg text-slate-600">{t("common.applicationReceived")}</p>
        <a href="/" className="mt-8 inline-block btn-primary">
          ← Home
        </a>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl container-px">
          <h1 className="heading-1 !text-white">{t("apply.title")}</h1>
          <p className="mt-3 text-lg text-blue-100">{t("apply.subtitle")}</p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-2xl container-px">
          {/* IMPORTANT — document policy notice (ethical recruitment positioning) */}
          <div className="mb-6 rounded-xl border-2 border-amber-300 bg-amber-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xl">
                ⚠️
              </div>
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-amber-800">
                  {t("apply.docNotice.label")}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-amber-900">
                  {t("apply.docNotice.text")}
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {prefilledJob && (
              <div className="mb-6 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800">
                Applying for: <span className="font-semibold">{prefilledJob}</span>
                <input type="hidden" name="jobId" value={prefilledJob} />
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="label">{t("apply.fullName")} *</label>
                <input id="fullName" name="fullName" required className="input" placeholder="Ram Bahadur Thapa" />
              </div>

              <div>
                <label htmlFor="passportNumber" className="label">{t("apply.passport")} *</label>
                <input id="passportNumber" name="passportNumber" required className="input" placeholder="N1234567" />
              </div>

              <div>
                <label htmlFor="phone" className="label">{t("apply.phone")} *</label>
                <input id="phone" name="phone" required type="tel" className="input" placeholder="+977 98XXXXXXXX" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="label">{t("apply.email")}</label>
                <input id="email" name="email" type="email" className="input" placeholder="you@example.com" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="preferredCountry" className="label">{t("apply.preferredCountry")} *</label>
                <select id="preferredCountry" name="preferredCountry" required className="input">
                  <option value="">— Select —</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Romania">Romania</option>
                  <option value="Austria">Austria</option>
                  <option value="Any">Any</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="cv" className="label">{t("apply.cv")} ({t("common.optional")})</label>
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  accept="application/pdf,image/*,.doc,.docx"
                  className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
                />
                <p className="mt-1 text-xs text-slate-500">PDF, JPG or DOC. Max 5MB.</p>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600" />
                  <span className="text-slate-700">{t("apply.consent")}</span>
                </label>
              </div>
            </div>

            {status === "error" && (
              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMsg || t("common.error")}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary mt-6 w-full !py-4 disabled:opacity-50"
            >
              {status === "submitting" ? t("common.submitting") : t("common.submit")}
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">{t("apply.note")}</p>
          </form>
        </div>
      </section>
    </>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl container-px py-20 text-center text-slate-500">Loading...</div>}>
      <ApplyForm />
    </Suspense>
  );
}
