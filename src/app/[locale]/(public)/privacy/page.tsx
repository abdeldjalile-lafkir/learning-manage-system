import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("pages.PrivacyPage");
  const usageList = t.raw("usageList") as string[];

  return (
    <div className="min-h-screen mt-24 mb-12 bg-linear-to-br from-[--color-hu-background] to-[--color-hu-secondary] dark:from-[--color-hu-background] dark:to-[--color-hu-secondary] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 bg-white/40 dark:bg-background backdrop-blur-sm rounded-md">
          <h1 className="text-2xl sm:text-4xl font-bold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("title")}
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-[--color-hu-primary] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("introTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("intro1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("intro2")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("infoTitle")}
          </h2>
          <h3 className="text-lg sm:text-xl font-medium text-[--color-hu-foreground] mb-3">
            {t("personalInfoTitle")}
          </h3>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("personalInfo")}
          </p>
          <h3 className="text-lg sm:text-xl font-medium text-[--color-hu-foreground] mb-3">
            {t("nonPersonalInfoTitle")}
          </h3>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("nonPersonalInfo")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("usageTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-3 leading-relaxed opacity-90">
            {t("usageIntro")}
          </p>
          <ul className="list-disc pr-6 text-[--color-hu-foreground] space-y-2 mb-4 opacity-90">
            {usageList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("thirdPartyTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("thirdParty1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("thirdParty2")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("securityTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("security1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("security2")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("cookiesTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("cookies1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("cookies2")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("accessTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("access1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("access2")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("retentionTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("retention1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("retention2")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("childrenTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("children1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("children2")}
          </p>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("changesTitle")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("changes1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("changes2")}
          </p>
        </div>
      </div>
    </div>
  );
}
