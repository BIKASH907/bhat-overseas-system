"use client";

import Link from "next/link";

const steps = [
  {
    n: 1,
    title: "Application Submission",
    body: "Candidates apply online via our website or visit our Kathmandu office in person. No documents are required at this stage — just basic profile information.",
    icon: "📝",
    color: "from-brand-500 to-brand-700"
  },
  {
    n: 2,
    title: "Screening",
    body: "Our recruitment team carefully reviews each profile against the job requirements. Skills, experience, age, language ability and physical fitness are all considered.",
    icon: "🔍",
    color: "from-cyan-500 to-blue-600"
  },
  {
    n: 3,
    title: "Interview",
    body: "Shortlisted candidates are invited to an interview — either with our team in Nepal or directly with the foreign employer (in person, video call, or phone).",
    icon: "💬",
    color: "from-emerald-500 to-teal-600"
  },
  {
    n: 4,
    title: "Document Submission",
    body: "ONLY candidates selected after the interview are asked to submit documents — passport, education/skill certificates, medical reports, and police clearance. We never ask for original documents from unselected applicants.",
    icon: "📄",
    color: "from-amber-500 to-orange-600",
    highlight: true
  },
  {
    n: 5,
    title: "Medical & Verification",
    body: "Selected candidates complete a health check at an approved medical centre and we verify all submitted documents with the issuing authorities.",
    icon: "🏥",
    color: "from-rose-500 to-pink-600"
  },
  {
    n: 6,
    title: "Visa Processing",
    body: "We file the work permit and visa application with the destination country's authorities, prepare the contract, and follow up until approval.",
    icon: "🛂",
    color: "from-indigo-500 to-purple-600"
  },
  {
    n: 7,
    title: "Deployment",
    body: "Flight booking, pre-departure orientation, and on-arrival support. Our partner team in the destination country welcomes you and helps you settle into your new role.",
    icon: "✈️",
    color: "from-sky-500 to-brand-700"
  }
];

export default function ProcessPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl container-px">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ring-white/20">
            🛡️ Ethical Recruitment Process
          </span>
          <h1 className="mt-5 heading-1 !text-white">Our 7-Step Recruitment Process</h1>
          <p className="mt-4 max-w-3xl text-lg text-blue-100">
            Bhat Overseas follows a structured, transparent process used by leading
            government-licensed manpower companies in Nepal. Every candidate goes through
            the same fair pipeline — no shortcuts, no hidden surprises.
          </p>
        </div>
      </section>

      {/* Document policy callout — most important section */}
      <section className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-7xl container-px py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-2xl">
              ⚠️
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-amber-800">
                Important Document Policy
              </div>
              <p className="mt-1 text-base font-semibold text-amber-900">
                We do NOT collect documents from every applicant. Only shortlisted candidates,
                after interview &amp; screening, are asked to submit documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step list */}
      <section className="section">
        <div className="mx-auto max-w-4xl container-px">
          <div className="space-y-6">
            {steps.map((s) => (
              <article
                key={s.n}
                className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 transition hover:shadow-md sm:p-8 ${
                  s.highlight ? "ring-2 ring-amber-300" : "ring-slate-200"
                }`}
              >
                {s.highlight && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    ★ Critical Step
                  </span>
                )}
                <div className="flex gap-5">
                  {/* Step badge */}
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-2xl text-white shadow-md`}
                    >
                      {s.icon}
                    </div>
                    <div className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Step {s.n}
                    </div>
                  </div>
                  {/* Step content */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{s.title}</h2>
                    <p className="mt-3 leading-relaxed text-slate-700">{s.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA at bottom */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 p-8 text-center text-white shadow-xl sm:p-12">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to start the process?</h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Submit your application today — no documents needed yet. Our team will review
              your profile and contact you if you match an open opportunity.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/apply" className="btn-accent">
                Apply Now →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
