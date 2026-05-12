// JSON-LD schema builders for Bhat Overseas
// ---------------------------------------------------------------------------
// Self-contained schema.org structured data so search engines understand the
// site identity, open jobs, FAQ content, and breadcrumb trail.

import type { Lang } from "./translations";
import type { Job } from "./seed-jobs";
import { t } from "./translations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bhatoverseas.com";

// Organization — emitted site-wide so Google's Knowledge Panel can pick up
// the company identity.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "Bhat Overseas Pvt Ltd",
    alternateName: "Bhat Overseas",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    foundingDate: "2023",
    description:
      "Government-licensed Nepali recruitment agency placing workers in Turkey, Romania, and Austria.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
      addressLocality: "Kathmandu"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+977 9764274854",
        contactType: "customer service",
        availableLanguage: ["English", "Nepali", "Turkish", "German"]
      }
    ],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Govt. Lic No.",
      value: "186/061/062"
    },
    areaServed: [
      { "@type": "Country", name: "Turkey" },
      { "@type": "Country", name: "Romania" },
      { "@type": "Country", name: "Austria" }
    ]
  };
}

// JobPosting — emitted on /jobs/[id]. Maps the Job model to schema.org's
// JobPosting type for Google Jobs eligibility.
export function jobPostingSchema(job: Job, lang: Lang) {
  const country = job.country;
  const hire = { Turkey: "TR", Romania: "RO", Austria: "AT" } as const;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.title,
    identifier: {
      "@type": "PropertyValue",
      name: "Bhat Overseas",
      value: job.id
    },
    datePosted: job.postedAt,
    employmentType: job.jobType === "Seasonal" ? "TEMPORARY" : "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Bhat Overseas Pvt Ltd",
      sameAs: siteUrl,
      logo: `${siteUrl}/logo.png`
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: hire[country as keyof typeof hire] || "TR"
      }
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: {
        "@type": "QuantitativeValue",
        value: job.salaryEUR,
        unitText: "MONTH"
      }
    },
    occupationalCategory: job.sector,
    qualifications: (job.requirements || []).join("; "),
    inLanguage: lang
  };
}

// FAQPage — for the process page, derived from translated step copy.
export function faqPageSchema(lang: Lang) {
  const items = [
    { qKey: "process.step1.title", aKey: "process.step1.body" },
    { qKey: "process.step2.title", aKey: "process.step2.body" },
    { qKey: "process.step3.title", aKey: "process.step3.body" },
    { qKey: "process.step4.title", aKey: "process.step4.body" },
    { qKey: "process.step5.title", aKey: "process.step5.body" },
    { qKey: "process.step6.title", aKey: "process.step6.body" }
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: t(lang, it.qKey),
      acceptedAnswer: { "@type": "Answer", text: t(lang, it.aKey) }
    }))
  };
}

// BreadcrumbList — caller supplies the resolved {name, url} for each level.
export function breadcrumbSchema(
  lang: Lang,
  trail: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`
    }))
  };
}
