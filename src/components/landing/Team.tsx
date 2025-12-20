import React from "react";
import TeamSection from "@/components/blocks/TeamBlock";
import LandingTitles from "../shared/LandingTitles";
import { useTranslations } from "next-intl";

export function Team() {
  const t = useTranslations("landing.team");
  return (
    <div>
      <LandingTitles title={t("title")} subtitle={t("subtitle")} />
      <TeamSection text={t("title")} />
    </div>
  );
}
