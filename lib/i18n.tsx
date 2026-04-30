"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Lang, t as tt } from "./translations";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("lang") as Lang | null;
      if (stored && ["en", "tr", "de"].includes(stored)) setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
    } catch {}
  };

  return (
    <Ctx.Provider value={{ lang, setLang, t: (key: string) => tt(lang, key) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
