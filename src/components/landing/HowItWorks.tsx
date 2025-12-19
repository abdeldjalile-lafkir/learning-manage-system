import { HowItWorks } from "@/components/blocks/HowItWorkBlock";
import {
  UserPlus,
  BookOpen,
  CreditCard,
  Video,
  FileText,
  Award,
} from "lucide-react";
import LandingTitles from "@/components/shared/LandingTitles";
import { useTranslations } from "next-intl";

export function HowItWork() {
  const t = useTranslations("landing.howItWorks");
  const stepsData = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: t("steps.0.title"),
      description: t("steps.0.description"),
      benefits: [
        t("steps.0.benefits.0"),
        t("steps.0.benefits.1"),
        t("steps.0.benefits.2"),
      ],
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t("steps.1.title"),
      description: t("steps.1.description"),
      benefits: [
        t("steps.1.benefits.0"),
        t("steps.1.benefits.1"),
        t("steps.1.benefits.2"),
      ],
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: t("steps.2.title"),
      description: t("steps.2.description"),
      benefits: [
        t("steps.2.benefits.0"),
        t("steps.2.benefits.1"),
        t("steps.2.benefits.2"),
      ],
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: t("steps.3.title"),
      description: t("steps.3.description"),
      benefits: [
        t("steps.3.benefits.0"),
        t("steps.3.benefits.1"),
        t("steps.3.benefits.2"),
      ],
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t("steps.4.title"),
      description: t("steps.4.description"),
      benefits: [
        t("steps.4.benefits.0"),
        t("steps.4.benefits.1"),
        t("steps.4.benefits.2"),
      ],
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t("steps.5.title"),
      description: t("steps.5.description"),
      benefits: [
        t("steps.5.benefits.0"),
        t("steps.5.benefits.1"),
        t("steps.5.benefits.2"),
      ],
    },
  ];
  return (
    <div className="bg-transparent text-foreground">
      <LandingTitles title={t("title")} subtitle={t("subtitle")} />
      <HowItWorks stepsData={stepsData} />
    </div>
  );
}
