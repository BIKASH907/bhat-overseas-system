import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bhatoverseas.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bhat Overseas — Jobs in Turkey, Romania & Austria for Nepali Workers",
    template: "%s | Bhat Overseas"
  },
  description:
    "Government-licensed Nepali recruitment agency. Trusted placement of Nepali workers in Turkey, Romania, and Austria — seasonal and full-time work visas.",
  keywords: [
    "Nepali workers abroad",
    "Jobs in Turkey for Nepali",
    "Romania work visa Nepal",
    "Austria seasonal jobs",
    "Overseas recruitment Nepal",
    "Bhat Overseas",
    "Nepali manpower agency"
  ],
  openGraph: {
    title: "Bhat Overseas — Work Abroad Opportunities for Nepali Workers",
    description:
      "Trusted recruitment for Turkey, Romania & Austria. Apply in under 2 minutes.",
    url: siteUrl,
    siteName: "Bhat Overseas",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <I18nProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  );
}
