import { useTranslations } from "next-intl";
import React from "react";

export default function TermsPage() {
  const t = useTranslations("pages.TermsPage");
  const sections = t.raw("sections") as Record<
    string,
    { title: string; paragraphs: string[] }
  >;

  return (
    <div className="min-h-screen mt-24 mb-12 bg-linear-to-br from-[--color-hu-background] to-[--color-hu-secondary] dark:from-[--color-hu-background] dark:to-[--color-hu-secondary] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 bg-white/40 dark:bg-background backdrop-blur-sm rounded-md">
          <h1 className="text-2xl sm:text-4xl font-bold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("title")}
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-[--color-hu-primary] mx-auto rounded-full"></div>
        </div>

        {Object.entries(sections).map(([key, section]) => (
          <div
            key={key}
            className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
              {section.title}
            </h2>
            {section.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90"
              >
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
