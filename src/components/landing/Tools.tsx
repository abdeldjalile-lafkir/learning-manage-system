import { LogoCloud } from "@/components/landing/blocks/ToolsBlock";
import LandingTitles from "@/components/shared/LandingTitles";
import { useTranslations } from "next-intl";

export function Tools() {
  const t = useTranslations("landing.tools");

  return (
    <div className="w-full place-content-center px-4">
      <section className="relative mx-auto grid max-w-3xl">
        <LandingTitles title={t("title")} subtitle={t("subtitle")} />
        <LogoCloud />
      </section>
    </div>
  );
}
