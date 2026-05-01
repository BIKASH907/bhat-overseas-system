"use client";

// Slim utility bar shown above the main navbar — only on larger screens.
// Pulls real contact details from env with sensible defaults.

const license = process.env.NEXT_PUBLIC_LICENSE || "186/061/062";
const email = process.env.NEXT_PUBLIC_EMAIL || "bhatoverseas36@gmail.com";
const hours = process.env.NEXT_PUBLIC_HOURS || "Sun – Fri (10:00 AM – 6:00 PM)";

const socials = [
  { name: "Facebook", href: "https://facebook.com", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" },
  { name: "Instagram", href: "https://instagram.com", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.7 5.7 0 0 0-2.07 1.35A5.7 5.7 0 0 0 .72 4.05c-.3.76-.5 1.64-.56 2.91C.1 8.24.09 8.65.09 11.91s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.7 5.7 0 0 0 1.35 2.07 5.7 5.7 0 0 0 2.07 1.35c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.7 5.7 0 0 0 2.07-1.35 5.7 5.7 0 0 0 1.35-2.07c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.7 5.7 0 0 0-1.35-2.07A5.7 5.7 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" },
  { name: "TikTok", href: "https://tiktok.com", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.001.595.044.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.12z" },
  { name: "YouTube", href: "https://youtube.com", path: "M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" }
];

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl container-px py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            <span>Govt. Lic No.: <strong className="font-semibold">{license}</strong></span>
          </span>
          <a href={`mailto:${email}`} className="flex items-center gap-2 transition hover:text-accent-500">
            <svg className="h-4 w-4 text-accent-500" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span>{email}</span>
          </a>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5 11h-6V6h2v5h4z"/></svg>
            <span>{hours}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white/10 hover:text-accent-500"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
