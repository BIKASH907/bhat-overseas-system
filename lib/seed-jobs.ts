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

export const seedJobs: Job[] = [
  {
    id: "tr-factory-001",
    title: "Garment Factory Worker",
    country: "Turkey",
    jobType: "Full-time",
    salaryEUR: 700,
    duration: "2 years",
    sector: "Factory",
    requirements: [
      "Age 21–40",
      "Valid passport (min 2 years)",
      "Physically fit",
      "Basic English helpful but not required"
    ],
    description:
      "Stitching, packing, and quality-checking garments in a registered factory near Istanbul. Accommodation provided. 8-hour shifts with overtime opportunity.",
    featured: true,
    postedAt: "2026-04-12"
  },
  {
    id: "tr-hotel-002",
    title: "Hotel Housekeeping Staff",
    country: "Turkey",
    jobType: "Seasonal",
    salaryEUR: 650,
    duration: "6 months",
    sector: "Hospitality",
    requirements: [
      "Age 20–45",
      "Valid passport",
      "No experience required",
      "Willingness to work in tourist resort"
    ],
    description:
      "Housekeeping and room service for a 4-star resort in Antalya. Tips and seasonal bonus on top of base salary.",
    featured: true,
    postedAt: "2026-04-15"
  },
  {
    id: "ro-construction-003",
    title: "Construction Helper",
    country: "Romania",
    jobType: "Full-time",
    salaryEUR: 850,
    duration: "2 years",
    sector: "Construction",
    requirements: [
      "Age 21–45",
      "Physically fit",
      "Valid passport",
      "Basic construction experience preferred"
    ],
    description:
      "General construction work on residential sites in Bucharest area. Accommodation and meals provided. Overtime paid at 1.5x.",
    featured: true,
    postedAt: "2026-04-18"
  },
  {
    id: "ro-agriculture-004",
    title: "Agricultural Farm Worker",
    country: "Romania",
    jobType: "Seasonal",
    salaryEUR: 750,
    duration: "8 months",
    sector: "Agriculture",
    requirements: [
      "Age 20–50",
      "Valid passport",
      "Physically fit",
      "No experience required"
    ],
    description:
      "Fruit and vegetable harvesting in Cluj region. Accommodation provided. Seasonal contract from spring through autumn.",
    postedAt: "2026-04-20"
  },
  {
    id: "at-factory-005",
    title: "Food Packaging Operator",
    country: "Austria",
    jobType: "Full-time",
    salaryEUR: 1800,
    duration: "3 years",
    sector: "Factory",
    requirements: [
      "Age 22–40",
      "Valid passport",
      "Basic English required",
      "1 year prior factory experience preferred"
    ],
    description:
      "Operating packaging line in a food processing plant in Vienna. Permanent contract option after 1 year. Health insurance and pension.",
    featured: true,
    postedAt: "2026-04-22"
  },
  {
    id: "at-hospitality-006",
    title: "Restaurant Kitchen Helper",
    country: "Austria",
    jobType: "Full-time",
    salaryEUR: 1600,
    duration: "2 years",
    sector: "Hospitality",
    requirements: [
      "Age 21–40",
      "Valid passport",
      "Basic German or English",
      "Kitchen experience preferred"
    ],
    description:
      "Dishwashing, food prep, and kitchen support in a busy Vienna restaurant. Tips on top of salary. Meal provided during shift.",
    postedAt: "2026-04-23"
  },
  {
    id: "tr-construction-007",
    title: "Steel Fabrication Worker",
    country: "Turkey",
    jobType: "Full-time",
    salaryEUR: 800,
    duration: "2 years",
    sector: "Construction",
    requirements: [
      "Age 22–45",
      "Valid passport",
      "Welding or steelwork experience preferred",
      "Physically fit"
    ],
    description:
      "Steel cutting, welding, and assembly at a fabrication plant in Izmir. Overtime paid. Accommodation provided.",
    postedAt: "2026-04-25"
  },
  {
    id: "ro-hotel-008",
    title: "Hotel Cook Assistant",
    country: "Romania",
    jobType: "Seasonal",
    salaryEUR: 800,
    duration: "6 months",
    sector: "Hospitality",
    requirements: [
      "Age 20–40",
      "Valid passport",
      "Some cooking experience",
      "Basic English"
    ],
    description:
      "Assisting head chef at a Black Sea coast hotel. Seasonal summer contract. Tips and bonus for good performance.",
    postedAt: "2026-04-27"
  },
  {
    id: "at-agriculture-009",
    title: "Greenhouse Worker",
    country: "Austria",
    jobType: "Seasonal",
    salaryEUR: 1500,
    duration: "9 months",
    sector: "Agriculture",
    requirements: [
      "Age 20–50",
      "Valid passport",
      "Physically fit",
      "No experience required"
    ],
    description:
      "Tending and harvesting tomatoes, peppers, and herbs in a large commercial greenhouse near Graz. Indoor work, climate-controlled.",
    postedAt: "2026-04-28"
  }
];

export const countryInfo = {
  Turkey: {
    flag: "TR",
    visaType: "Work Permit / Seasonal Worker Visa",
    salaryRange: "EUR 600 – 1,000 / month",
    sectors: ["Factory", "Hospitality", "Construction", "Agriculture"],
    requirements: [
      "Valid passport (minimum 2 years validity)",
      "Age 21–45",
      "Medical fitness certificate",
      "Police clearance"
    ],
    processingTime: "4–6 weeks",
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
    processingTime: "6–8 weeks",
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
    processingTime: "8–12 weeks",
    description:
      "EU member state with the highest wages of the three. Strong worker protections, mandatory health insurance, and pension contributions."
  }
};
