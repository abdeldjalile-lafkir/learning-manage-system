"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

const defaultMessages = {
  en: enMessages,
  ar: arMessages,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = usePathname().split("/")[1] || "en";
  const messages = defaultMessages[locale as keyof typeof defaultMessages];
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  useEffect(() => {
    const isRTL = locale === "ar";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = locale;

    if (isRTL) {
      document.documentElement.classList.add("rtl");
      document.documentElement.classList.remove("ltr");
    } else {
      document.documentElement.classList.add("ltr");
      document.documentElement.classList.remove("rtl");
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
}
