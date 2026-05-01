// Seed/dummy job data — also used as a fallback when MongoDB is not configured.
// Once MongoDB is connected, jobs come from the database via /api/jobs.

export type Country = "Turkey" | "Romania" | "Austria";
export type JobType = "Seasonal" | "Full-time";

export type Job = {
  id: string;
  title: string;
  country: Country;
  jobType: JobType;
  salaryEUR: number; // monthly EUR
  duration: string;
  sector: string;
  requirements: string[];
  description: string;
  featured?: boolean;
  postedAt: string;
};

// No dummy jobs by default — real openings are added via the admin panel at /admin.
// The site shows a "Coming soon" empty state on Jobs and Home pages when this is empty.
export const seedJobs: Job[] = [];

export const countryInfo = {
  Turkey: {
    flag: "TR",
    visaType: "Work Permit Visa",
    salaryRange: "From EUR 550 / month",
    sectors: ["Factory", "Hospitality", "Construction", "Agriculture"],
    requirements: [
      "Valid passport (minimum 2 years validity)",
      "Age 21–45",
      "Medical fitness certificate",
      "Police clearance"
    ],
    processingTime: "2–3 months",
    description:
      "Turkey offers strong demand for workers in textile factories, tourism, and construction. Lower cost of living means more savings."
  },
  Romania: {
    flag: "RO",
    visaType: "Long-stay Work Visa (D/AM) / Seasonal Visa",
    salaryRange: "EUR 700 – 1,200 / month",
    sectors: ["Construction", "Agriculture", "Hospitality", "Factory"],
    requirements: [
      "Valid passport (minimum 1 year validity beyond contract)",
      "Age 20–50",
      "Medical fitness certificate",
      "Police clearance",
      "Employment contract from Romanian employer"
    ],
    processingTime: "6–8 months",
    description:
      "EU member state offering strong wages and a clear pathway to long-term residency. Construction and agriculture demand is high."
  },
  Austria: {
    flag: "AT",
    visaType: "Red-White-Red Card / Seasonal Worker Permit",
    salaryRange: "EUR 1,500 – 2,200 / month",
    sectors: ["Factory", "Hospitality", "Agriculture", "Healthcare support"],
    requirements: [
      "Valid passport (minimum 2 years validity)",
      "Age 21–40",
      "Basic German or English",
      "Medical fitness",
      "Police clearance",
      "Employment contract from Austrian employer"
    ],
    processingTime: "2–3 months",
    description:
      "EU member state with the highest wages of the three. Strong worker protections, mandatory health insurance, and pension contributions."
  }
};
