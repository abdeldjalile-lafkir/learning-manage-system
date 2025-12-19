import React from "react";
import { AnimatedLangToggle } from "@/components/ui/animated-lang-toggle";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const changeLanguage = (lang: string) => {
    const url = new URL(window.location.href);
    url.pathname = `/${lang}${url.pathname.substring(3)}`;
    window.location.href = url.toString();
  };
  return (
    <AnimatedLangToggle language={locale} changeLanguage={changeLanguage} />
  );
};

export default LanguageSwitcher;
