"use client";

import { useI18n } from "@/lib/i18n";

const phone = process.env.NEXT_PUBLIC_WHATSAPP || "9779764274854";

export default function WhatsAppButton() {
  const { t } = useI18n();
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hello Bhat Overseas, I'm interested in working abroad."
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("a11y.whatsapp")}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
    >
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.52 3.48A11.93 11.93 0 0012.01 0C5.39 0 0 5.39 0 12.01a11.93 11.93 0 001.61 6L0 24l6.18-1.62a11.94 11.94 0 005.83 1.49h.01c6.62 0 12-5.39 12-12.01a11.93 11.93 0 00-3.5-8.38zM12.02 21.79h-.01a9.78 9.78 0 01-4.99-1.36l-.36-.21-3.67.96.98-3.58-.23-.37A9.78 9.78 0 012.23 12c0-5.4 4.39-9.79 9.8-9.79a9.74 9.74 0 016.93 2.87 9.74 9.74 0 012.87 6.93c0 5.4-4.39 9.78-9.81 9.78zm5.37-7.34c-.29-.15-1.74-.86-2.01-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.45 0 1.45 1.06 2.85 1.21 3.05.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.56-.34z" />
      </svg>
    </a>
  );
}
