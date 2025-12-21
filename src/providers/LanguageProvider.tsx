import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { LanguageSupport } from "@/providers/LanguageSupport";
import { getLocale, getMessages, setRequestLocale } from "next-intl/server";

export async function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageSupport locale={locale}>{children}</LanguageSupport>
    </NextIntlClientProvider>
  );
}
