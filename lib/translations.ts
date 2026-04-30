// Translations for Bhat Overseas — English, Turkish, German
// Keep keys flat and consistent across all three languages.

export type Lang = "en" | "tr" | "de";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "GB" },
  { code: "tr", label: "TR", flag: "TR" },
  { code: "de", label: "DE", flag: "DE" }
];

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.home": "Home",
  "nav.jobs": "Jobs",
  "nav.countries": "Countries",
  "nav.apply": "Apply Now",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.admin": "Admin",

  // Common
  "common.applyNow": "Apply Now",
  "common.viewJobs": "View Jobs",
  "common.viewDetails": "View Details",
  "common.learnMore": "Learn More",
  "common.salary": "Salary",
  "common.duration": "Duration",
  "common.requirements": "Requirements",
  "common.country": "Country",
  "common.jobType": "Job Type",
  "common.allCountries": "All Countries",
  "common.allTypes": "All Types",
  "common.seasonal": "Seasonal",
  "common.fulltime": "Full-time",
  "common.submit": "Submit Application",
  "common.submitting": "Submitting...",
  "common.thankYou": "Thank you!",
  "common.applicationReceived": "Your application has been received. We will contact you within 48 hours.",
  "common.error": "Something went wrong. Please try again.",
  "common.required": "Required",
  "common.optional": "Optional",
  "common.loading": "Loading...",
  "common.noJobs": "No jobs match your filters.",
  "common.search": "Search",
  "common.filter": "Filter",
  "common.clearFilters": "Clear filters",

  // Hero
  "hero.title": "Work Abroad Opportunities for Nepali Workers",
  "hero.subtitle": "Trusted recruitment for Turkey, Romania & Austria",
  "hero.tagline": "Government-licensed, transparent process, real jobs.",

  // Home sections
  "home.featured.title": "Featured Jobs",
  "home.featured.subtitle": "Hand-picked openings with verified employers",
  "home.featured.viewAll": "View all jobs",
  "home.countries.title": "Countries We Serve",
  "home.countries.subtitle": "Choose your destination",
  "home.why.title": "Why Choose Bhat Overseas",
  "home.why.subtitle": "Trusted by hundreds of Nepali workers",
  "home.why.licensed.title": "Government Licensed",
  "home.why.licensed.body": "Officially registered recruitment company in Nepal with valid licenses.",
  "home.why.transparent.title": "Transparent Process",
  "home.why.transparent.body": "Clear fees, real contracts, and full disclosure at every step.",
  "home.why.support.title": "End-to-End Support",
  "home.why.support.body": "From application to airport — guidance through visa, training, and travel.",
  "home.why.fast.title": "Fast Processing",
  "home.why.fast.body": "Most placements processed within 4–8 weeks of application.",
  "home.testimonials.title": "Workers' Stories",
  "home.testimonials.subtitle": "Real experiences from Nepali workers placed abroad",
  "home.cta.title": "Ready to work abroad?",
  "home.cta.subtitle": "Apply in under 2 minutes. We will contact you within 48 hours.",

  // Jobs page
  "jobs.title": "Available Jobs",
  "jobs.subtitle": "Browse open positions in Turkey, Romania, and Austria",
  "jobs.filter.country": "Country",
  "jobs.filter.type": "Job Type",
  "jobs.filter.minSalary": "Minimum Salary (EUR/month)",

  // Apply page
  "apply.title": "Apply Now",
  "apply.subtitle": "Fill the form below. It takes less than 2 minutes.",
  "apply.fullName": "Full Name",
  "apply.passport": "Passport Number",
  "apply.phone": "Phone (WhatsApp)",
  "apply.email": "Email Address",
  "apply.preferredCountry": "Preferred Country",
  "apply.cv": "Upload CV (PDF)",
  "apply.note": "We will respond on WhatsApp within 48 hours.",
  "apply.consent": "I agree to be contacted about job opportunities.",

  // Countries
  "countries.title": "Countries We Serve",
  "countries.subtitle": "Detailed information about destinations",
  "countries.visaType": "Visa Type",
  "countries.salaryRange": "Salary Range",
  "countries.sectors": "Job Sectors",
  "countries.processingTime": "Processing Time",

  // About
  "about.title": "About Bhat Overseas",
  "about.subtitle": "Connecting Nepali talent with European opportunity",
  "about.intro": "Bhat Overseas Pvt Ltd is a government-licensed recruitment company based in Nepal, specializing in placing Nepali workers in Turkey, Romania, and Austria. We focus on seasonal and full-time work visas across factory, agriculture, hospitality, and construction sectors.",
  "about.mission.title": "Our Mission",
  "about.mission.body": "To create life-changing economic opportunities for Nepali workers through transparent, ethical, and efficient overseas placement.",
  "about.vision.title": "Our Vision",
  "about.vision.body": "To be the most trusted name in Nepali overseas recruitment — the first call for workers seeking honest opportunity and the first call for European employers seeking dependable talent.",
  "about.values.title": "Our Values",
  "about.values.transparency": "Transparency in fees and process",
  "about.values.integrity": "Integrity in every contract",
  "about.values.care": "Care for workers before, during, and after placement",
  "about.values.quality": "Quality matchmaking between worker and employer",

  // Contact
  "contact.title": "Get in Touch",
  "contact.subtitle": "We respond to every inquiry within 48 hours",
  "contact.address": "Office Address",
  "contact.phone": "Phone",
  "contact.email": "Email",
  "contact.whatsapp": "WhatsApp",
  "contact.formTitle": "Send us a message",
  "contact.name": "Your Name",
  "contact.subject": "Subject",
  "contact.message": "Message",
  "contact.send": "Send Message",

  // Footer
  "footer.tagline": "Government-licensed Nepali recruitment for Turkey, Romania & Austria.",
  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "footer.disclaimer": "Bhat Overseas Pvt Ltd is a registered recruitment company in Nepal."
};

const tr: Dict = {
  // Nav
  "nav.home": "Ana Sayfa",
  "nav.jobs": "İşler",
  "nav.countries": "Ülkeler",
  "nav.apply": "Şimdi Başvur",
  "nav.about": "Hakkımızda",
  "nav.contact": "İletişim",
  "nav.admin": "Yönetici",

  // Common
  "common.applyNow": "Şimdi Başvur",
  "common.viewJobs": "İşleri Görüntüle",
  "common.viewDetails": "Detayları Gör",
  "common.learnMore": "Daha Fazla Bilgi",
  "common.salary": "Maaş",
  "common.duration": "Süre",
  "common.requirements": "Gereksinimler",
  "common.country": "Ülke",
  "common.jobType": "İş Türü",
  "common.allCountries": "Tüm Ülkeler",
  "common.allTypes": "Tüm Türler",
  "common.seasonal": "Mevsimlik",
  "common.fulltime": "Tam Zamanlı",
  "common.submit": "Başvuruyu Gönder",
  "common.submitting": "Gönderiliyor...",
  "common.thankYou": "Teşekkürler!",
  "common.applicationReceived": "Başvurunuz alındı. 48 saat içinde sizinle iletişime geçeceğiz.",
  "common.error": "Bir şeyler ters gitti. Lütfen tekrar deneyin.",
  "common.required": "Gerekli",
  "common.optional": "İsteğe bağlı",
  "common.loading": "Yükleniyor...",
  "common.noJobs": "Filtrelerinize uyan iş bulunamadı.",
  "common.search": "Ara",
  "common.filter": "Filtrele",
  "common.clearFilters": "Filtreleri temizle",

  // Hero
  "hero.title": "Nepalli İşçiler İçin Yurt Dışı Çalışma Fırsatları",
  "hero.subtitle": "Türkiye, Romanya ve Avusturya için güvenilir işe alım",
  "hero.tagline": "Devlet lisanslı, şeffaf süreç, gerçek işler.",

  // Home sections
  "home.featured.title": "Öne Çıkan İşler",
  "home.featured.subtitle": "Doğrulanmış işverenlerden seçilmiş açık pozisyonlar",
  "home.featured.viewAll": "Tüm işleri görüntüle",
  "home.countries.title": "Hizmet Verdiğimiz Ülkeler",
  "home.countries.subtitle": "Hedefinizi seçin",
  "home.why.title": "Neden Bhat Overseas",
  "home.why.subtitle": "Yüzlerce Nepalli işçi tarafından güveniliyor",
  "home.why.licensed.title": "Devlet Lisanslı",
  "home.why.licensed.body": "Geçerli lisanslara sahip, Nepal'de resmi olarak kayıtlı işe alım şirketi.",
  "home.why.transparent.title": "Şeffaf Süreç",
  "home.why.transparent.body": "Net ücretler, gerçek sözleşmeler ve her adımda tam açıklık.",
  "home.why.support.title": "Uçtan Uca Destek",
  "home.why.support.body": "Başvurudan havalimanına kadar — vize, eğitim ve seyahat boyunca rehberlik.",
  "home.why.fast.title": "Hızlı İşlem",
  "home.why.fast.body": "Yerleştirmelerin çoğu başvurudan sonra 4–8 hafta içinde tamamlanır.",
  "home.testimonials.title": "İşçi Hikayeleri",
  "home.testimonials.subtitle": "Yurt dışına yerleştirilen Nepalli işçilerden gerçek deneyimler",
  "home.cta.title": "Yurt dışında çalışmaya hazır mısınız?",
  "home.cta.subtitle": "2 dakikadan kısa sürede başvurun. 48 saat içinde sizinle iletişime geçeceğiz.",

  // Jobs page
  "jobs.title": "Mevcut İşler",
  "jobs.subtitle": "Türkiye, Romanya ve Avusturya'daki açık pozisyonlara göz atın",
  "jobs.filter.country": "Ülke",
  "jobs.filter.type": "İş Türü",
  "jobs.filter.minSalary": "Minimum Maaş (EUR/ay)",

  // Apply page
  "apply.title": "Şimdi Başvur",
  "apply.subtitle": "Aşağıdaki formu doldurun. 2 dakikadan az sürer.",
  "apply.fullName": "Tam İsim",
  "apply.passport": "Pasaport Numarası",
  "apply.phone": "Telefon (WhatsApp)",
  "apply.email": "E-posta Adresi",
  "apply.preferredCountry": "Tercih Edilen Ülke",
  "apply.cv": "CV Yükle (PDF)",
  "apply.note": "48 saat içinde WhatsApp üzerinden cevap vereceğiz.",
  "apply.consent": "İş fırsatları hakkında benimle iletişime geçilmesini kabul ediyorum.",

  // Countries
  "countries.title": "Hizmet Verdiğimiz Ülkeler",
  "countries.subtitle": "Hedefler hakkında detaylı bilgi",
  "countries.visaType": "Vize Türü",
  "countries.salaryRange": "Maaş Aralığı",
  "countries.sectors": "İş Sektörleri",
  "countries.processingTime": "İşlem Süresi",

  // About
  "about.title": "Bhat Overseas Hakkında",
  "about.subtitle": "Nepalli yetenekleri Avrupa fırsatlarıyla buluşturuyoruz",
  "about.intro": "Bhat Overseas Pvt Ltd, Nepal merkezli devlet lisanslı bir işe alım şirketidir; Nepalli işçileri Türkiye, Romanya ve Avusturya'ya yerleştirme konusunda uzmanlaşmıştır. Fabrika, tarım, otelcilik ve inşaat sektörlerinde mevsimlik ve tam zamanlı çalışma vizelerine odaklanıyoruz.",
  "about.mission.title": "Misyonumuz",
  "about.mission.body": "Şeffaf, etik ve verimli yurt dışı yerleştirme yoluyla Nepalli işçiler için hayatı değiştiren ekonomik fırsatlar yaratmak.",
  "about.vision.title": "Vizyonumuz",
  "about.vision.body": "Nepalli yurt dışı işe alımının en güvenilir adı olmak — dürüst fırsat arayan işçiler ve güvenilir yetenek arayan Avrupalı işverenler için ilk arama.",
  "about.values.title": "Değerlerimiz",
  "about.values.transparency": "Ücret ve süreçte şeffaflık",
  "about.values.integrity": "Her sözleşmede dürüstlük",
  "about.values.care": "Yerleştirme öncesi, sırası ve sonrası işçi bakımı",
  "about.values.quality": "İşçi ve işveren arasında kaliteli eşleştirme",

  // Contact
  "contact.title": "İletişime Geçin",
  "contact.subtitle": "Her sorguya 48 saat içinde yanıt veriyoruz",
  "contact.address": "Ofis Adresi",
  "contact.phone": "Telefon",
  "contact.email": "E-posta",
  "contact.whatsapp": "WhatsApp",
  "contact.formTitle": "Bize mesaj gönderin",
  "contact.name": "İsminiz",
  "contact.subject": "Konu",
  "contact.message": "Mesaj",
  "contact.send": "Mesajı Gönder",

  // Footer
  "footer.tagline": "Türkiye, Romanya ve Avusturya için devlet lisanslı Nepalli işe alım.",
  "footer.quickLinks": "Hızlı Bağlantılar",
  "footer.contact": "İletişim",
  "footer.rights": "Tüm hakları saklıdır.",
  "footer.disclaimer": "Bhat Overseas Pvt Ltd, Nepal'de kayıtlı bir işe alım şirketidir."
};

const de: Dict = {
  // Nav
  "nav.home": "Startseite",
  "nav.jobs": "Stellen",
  "nav.countries": "Länder",
  "nav.apply": "Jetzt Bewerben",
  "nav.about": "Über Uns",
  "nav.contact": "Kontakt",
  "nav.admin": "Admin",

  // Common
  "common.applyNow": "Jetzt Bewerben",
  "common.viewJobs": "Stellen Ansehen",
  "common.viewDetails": "Details Ansehen",
  "common.learnMore": "Mehr Erfahren",
  "common.salary": "Gehalt",
  "common.duration": "Dauer",
  "common.requirements": "Anforderungen",
  "common.country": "Land",
  "common.jobType": "Stellenart",
  "common.allCountries": "Alle Länder",
  "common.allTypes": "Alle Arten",
  "common.seasonal": "Saisonal",
  "common.fulltime": "Vollzeit",
  "common.submit": "Bewerbung Absenden",
  "common.submitting": "Wird gesendet...",
  "common.thankYou": "Vielen Dank!",
  "common.applicationReceived": "Ihre Bewerbung ist eingegangen. Wir melden uns innerhalb von 48 Stunden.",
  "common.error": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
  "common.required": "Pflichtfeld",
  "common.optional": "Optional",
  "common.loading": "Wird geladen...",
  "common.noJobs": "Keine Stellen passen zu Ihren Filtern.",
  "common.search": "Suchen",
  "common.filter": "Filter",
  "common.clearFilters": "Filter zurücksetzen",

  // Hero
  "hero.title": "Arbeitsmöglichkeiten im Ausland für nepalesische Arbeiter",
  "hero.subtitle": "Vertrauenswürdige Vermittlung für die Türkei, Rumänien und Österreich",
  "hero.tagline": "Staatlich lizenziert, transparenter Prozess, echte Stellen.",

  // Home sections
  "home.featured.title": "Empfohlene Stellen",
  "home.featured.subtitle": "Handverlesene Stellen bei verifizierten Arbeitgebern",
  "home.featured.viewAll": "Alle Stellen ansehen",
  "home.countries.title": "Länder, die wir bedienen",
  "home.countries.subtitle": "Wählen Sie Ihr Ziel",
  "home.why.title": "Warum Bhat Overseas",
  "home.why.subtitle": "Vertrauen von Hunderten nepalesischer Arbeiter",
  "home.why.licensed.title": "Staatlich Lizenziert",
  "home.why.licensed.body": "Offiziell in Nepal registriertes Vermittlungsunternehmen mit gültigen Lizenzen.",
  "home.why.transparent.title": "Transparenter Prozess",
  "home.why.transparent.body": "Klare Gebühren, echte Verträge und vollständige Offenlegung in jedem Schritt.",
  "home.why.support.title": "Rundum-Betreuung",
  "home.why.support.body": "Von der Bewerbung bis zum Flughafen — Begleitung durch Visum, Training und Reise.",
  "home.why.fast.title": "Schnelle Bearbeitung",
  "home.why.fast.body": "Die meisten Vermittlungen werden innerhalb von 4–8 Wochen nach Bewerbung abgewickelt.",
  "home.testimonials.title": "Geschichten der Arbeiter",
  "home.testimonials.subtitle": "Echte Erfahrungen von im Ausland vermittelten nepalesischen Arbeitern",
  "home.cta.title": "Bereit, im Ausland zu arbeiten?",
  "home.cta.subtitle": "Bewerben Sie sich in unter 2 Minuten. Wir melden uns innerhalb von 48 Stunden.",

  // Jobs page
  "jobs.title": "Verfügbare Stellen",
  "jobs.subtitle": "Offene Stellen in der Türkei, Rumänien und Österreich",
  "jobs.filter.country": "Land",
  "jobs.filter.type": "Stellenart",
  "jobs.filter.minSalary": "Mindestgehalt (EUR/Monat)",

  // Apply page
  "apply.title": "Jetzt Bewerben",
  "apply.subtitle": "Füllen Sie das Formular aus. Es dauert weniger als 2 Minuten.",
  "apply.fullName": "Vollständiger Name",
  "apply.passport": "Passnummer",
  "apply.phone": "Telefon (WhatsApp)",
  "apply.email": "E-Mail-Adresse",
  "apply.preferredCountry": "Bevorzugtes Land",
  "apply.cv": "Lebenslauf hochladen (PDF)",
  "apply.note": "Wir antworten innerhalb von 48 Stunden über WhatsApp.",
  "apply.consent": "Ich bin damit einverstanden, zu Stellenangeboten kontaktiert zu werden.",

  // Countries
  "countries.title": "Länder, die wir bedienen",
  "countries.subtitle": "Detaillierte Informationen zu den Zielen",
  "countries.visaType": "Visumart",
  "countries.salaryRange": "Gehaltsspanne",
  "countries.sectors": "Beschäftigungssektoren",
  "countries.processingTime": "Bearbeitungszeit",

  // About
  "about.title": "Über Bhat Overseas",
  "about.subtitle": "Wir verbinden nepalesisches Talent mit europäischen Möglichkeiten",
  "about.intro": "Bhat Overseas Pvt Ltd ist ein staatlich lizenziertes Vermittlungsunternehmen mit Sitz in Nepal, das sich auf die Vermittlung nepalesischer Arbeiter in die Türkei, Rumänien und Österreich spezialisiert hat. Wir konzentrieren uns auf saisonale und Vollzeit-Arbeitsvisa in den Bereichen Fabrik, Landwirtschaft, Gastgewerbe und Bauwesen.",
  "about.mission.title": "Unsere Mission",
  "about.mission.body": "Lebensverändernde wirtschaftliche Möglichkeiten für nepalesische Arbeiter durch transparente, ethische und effiziente Auslandsvermittlung schaffen.",
  "about.vision.title": "Unsere Vision",
  "about.vision.body": "Der vertrauenswürdigste Name in der nepalesischen Auslandsvermittlung sein — die erste Anlaufstelle für Arbeiter, die ehrliche Möglichkeiten suchen, und für europäische Arbeitgeber, die zuverlässiges Talent suchen.",
  "about.values.title": "Unsere Werte",
  "about.values.transparency": "Transparenz bei Gebühren und Prozess",
  "about.values.integrity": "Integrität in jedem Vertrag",
  "about.values.care": "Fürsorge für Arbeiter vor, während und nach der Vermittlung",
  "about.values.quality": "Qualitätsvolle Vermittlung zwischen Arbeiter und Arbeitgeber",

  // Contact
  "contact.title": "Kontakt aufnehmen",
  "contact.subtitle": "Wir antworten auf jede Anfrage innerhalb von 48 Stunden",
  "contact.address": "Büroadresse",
  "contact.phone": "Telefon",
  "contact.email": "E-Mail",
  "contact.whatsapp": "WhatsApp",
  "contact.formTitle": "Senden Sie uns eine Nachricht",
  "contact.name": "Ihr Name",
  "contact.subject": "Betreff",
  "contact.message": "Nachricht",
  "contact.send": "Nachricht Senden",

  // Footer
  "footer.tagline": "Staatlich lizenzierte nepalesische Vermittlung für die Türkei, Rumänien und Österreich.",
  "footer.quickLinks": "Schnelllinks",
  "footer.contact": "Kontakt",
  "footer.rights": "Alle Rechte vorbehalten.",
  "footer.disclaimer": "Bhat Overseas Pvt Ltd ist ein in Nepal registriertes Vermittlungsunternehmen."
};

export const translations: Record<Lang, Dict> = { en, tr, de };

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}
