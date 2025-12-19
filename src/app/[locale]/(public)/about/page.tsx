import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("pages.AboutPage");

  const features = t.raw("features") as string[];

  return (
    <div className="min-h-screen mt-24 mb-12 bg-linear-to-br from-[--color-hu-background] to-[--color-hu-secondary] dark:from-[--color-hu-background] dark:to-[--color-hu-secondary] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 bg-white/40 dark:bg-background backdrop-blur-sm rounded-md">
          <h1 className="text-2xl sm:text-4xl font-bold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("title")}
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-[--color-hu-primary] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("section_intro")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("description")}
          </p>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("section_intro_paragraph2")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-6 sm:mb-8">
          <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-[--color-hu-foreground] mb-3">
              {t("mission_title")}
            </h3>
            <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
              {t("mission_text")}
            </p>
          </div>

          <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-[--color-hu-foreground] mb-3">
              {t("vision_title")}
            </h3>
            <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
              {t("vision_text")}
            </p>
          </div>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("features_title")}
          </h2>
          <ul className="space-y-3 text-[--color-hu-foreground] opacity-90">
            {features.map((feature, idx) => (
              <li className="flex items-start" key={idx}>
                <span className="text-[--color-hu-primary] font-bold text-xl mx-2">
                  ✓
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("why_us_title")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("why_us_paragraph1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("why_us_paragraph2")}
          </p>
        </div>
      </div>
    </div>
  );
}
