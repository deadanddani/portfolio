import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es";
export const LANGS: Lang[] = ["en", "es"];

// A piece of UI text: a plain string when it is the same in every language
// (names, tech stack), or one entry per language.
export type Text = string | Record<Lang, string>;

const STORAGE_KEY = "lang";
const TITLES: Record<Lang, string> = {
  en: "Daniel Vadillo — Software Architect",
  es: "Daniel Vadillo — Arquitecto de software",
};

type LangContextValue = { lang: Lang; setLang: (l: Lang) => void; t: (text: Text) => string };

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: (text) => (typeof text === "string" ? text : text.en),
});

const readStoredLang = (): Lang | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "en" || v === "es" ? v : null;
  } catch {
    return null;
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Always start in English so the client matches the prerendered HTML when hydrating;
  // a saved preference is applied right after mount.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Storage unavailable (private mode): the choice just isn't remembered.
    }
  };

  const t = (text: Text) => (typeof text === "string" ? text : text[lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
