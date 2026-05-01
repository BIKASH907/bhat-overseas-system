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

// Country info — uses translation keys instead of literal strings so the
// /countries page renders in the user's selected language.
export type CountryInfo = {
  flag: string;
  visaTypeKey: string;
  salaryRangeKey: string;
  sectorKeys: string[];
  requirementKeys: string[];
  processingTimeKey: string;
  descriptionKey: string;
};

export const countryInfo: Record<Country, CountryInfo> = {
  Turkey: {
    flag: "TR",
    visaTypeKey: "country.turkey.visaType",
    salaryRangeKey: "country.turkey.salaryRange",
    sectorKeys: ["sector.factory", "sector.hospitality", "sector.construction", "sector.agriculture"],
    requirementKeys: [
      "req.passport2y",
      "req.age2145",
      "req.medicalCert",
      "req.policeClearance"
    ],
    processingTimeKey: "country.turkey.processingTime",
    descriptionKey: "country.turkey.description"
  },
  Romania: {
    flag: "RO",
    visaTypeKey: "country.romania.visaType",
    salaryRangeKey: "country.romania.salaryRange",
    sectorKeys: ["sector.construction", "sector.agriculture", "sector.hospitality", "sector.factory"],
    requirementKeys: [
      "req.passport1y",
      "req.age2050",
      "req.medicalCert",
      "req.policeClearance",
      "req.romanianContract"
    ],
    processingTimeKey: "country.romania.processingTime",
    descriptionKey: "country.romania.description"
  },
  Austria: {
    flag: "AT",
    visaTypeKey: "country.austria.visaType",
    salaryRangeKey: "country.austria.salaryRange",
    sectorKeys: ["sector.factory", "sector.hospitality", "sector.agriculture", "sector.healthcareSupport"],
    requirementKeys: [
      "req.passport2y",
      "req.age2140",
      "req.basicGermanEnglish",
      "req.medicalFitness",
      "req.policeClearance",
      "req.austrianContract"
    ],
    processingTimeKey: "country.austria.processingTime",
    descriptionKey: "country.austria.description"
  }
};
