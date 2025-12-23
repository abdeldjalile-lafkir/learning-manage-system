import { Stats } from "@/components/landing/blocks/StatsSectionWithText";
import { useTranslations } from "next-intl";

export function States() {
  const t = useTranslations("landing.stats");
  const platformStats = [
    {
      labelKey: t("items.students"),
      value: "120k",
      diff: "+12%",
    },
    {
      labelKey: t("items.teachers"),
      value: "3.2k",
      diff: "-1%",
    },
    {
      labelKey: t("items.courses"),
      value: "1.5k",
      diff: "+8%",
    },
    {
      labelKey: t("items.satisfaction"),
      value: "98%",
      diff: "+1%",
    },
    {
      labelKey: t("items.content"),
      value: "15k",
      diff: "+6%",
    },
    {
      labelKey: t("items.support"),
      value: "24/7",
      diff: "",
    },
  ];

  return (
    <Stats
      badge={t("badge")}
      title={t("title")}
      subtitle={t("subtitle")}
      stats={platformStats}
    />
  );
}
