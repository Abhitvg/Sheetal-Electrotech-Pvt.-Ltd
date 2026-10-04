"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Basic implementation since we're not using full next-intl routing yet.
    // If the pathname starts with the current locale, replace it
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${pathWithoutLocale || "/"}`);
  };

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language">
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => switchLanguage("en")}
        className={`text-xs font-mono font-bold px-2 py-1 rounded-sm transition-colors ${
          locale === "en" ? "bg-accent text-white" : "text-slate-400 hover:text-ink"
        }`}
      >
        EN
      </button>
      <span className="text-slate-300">|</span>
      <button
        type="button"
        aria-pressed={locale === "hi"}
        onClick={() => switchLanguage("hi")}
        className={`text-xs font-mono font-bold px-2 py-1 rounded-sm transition-colors ${
          locale === "hi" ? "bg-accent text-white" : "text-slate-400 hover:text-ink"
        }`}
      >
        HI
      </button>
    </div>
  );
}
