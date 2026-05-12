import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bhatoverseas.com";

// Bhat Overseas sitemap. Lists the public pages served by the site so
// crawlers discover them. Language is selected client-side via the
// LanguageProvider; the same URL serves all three locales, so we emit one
// entry per page rather than per (page × locale).
const publicPaths = [
  { path: "/",          priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/jobs",      priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/countries", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/process",   priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about",     priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact",   priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/apply",     priority: 0.9, changeFrequency: "weekly" as const }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return publicPaths.map((p) => ({
    url: `${siteUrl}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority
  }));
}
