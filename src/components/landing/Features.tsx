import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  Clock,
  Award,
  Notebook,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import LandingTitles from "@/components/shared/LandingTitles";
import SpotlightCard from "@/components/landing/blocks/SpotlightCard";
import { Features as MF } from "@/components/ui/scroll-card";

export function Features() {
  const t = useTranslations("landing.features");

  const features = [
    {
      key: "interactive-lessons",
      icon: BookOpen,
    },
    {
      key: "progress-tracking",
      icon: GraduationCap,
    },
    {
      key: "instant-support",
      icon: MessageSquare,
    },
    {
      key: "diverse-content",
      icon: Notebook,
    },
    {
      key: "certified-certificates",
      icon: Award,
    },
    {
      key: "learn-anytime",
      icon: Clock,
    },
  ];

  return (
    <section id="features" className="container space-y-12 py-20 md:py-32">
      <LandingTitles title={t("title")} subtitle={t("subtitle")} />
      <div className="hidden md:grid mx-4 md:mx-auto justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
        {features.map((feature) => {
          const { key, icon: Icon } = feature;
          const title = t(`items.${key}.title`);
          const description = t(`items.${key}.description`);

          return (
            <SpotlightCard
              key={key}
              className="p-2! rounded-xl! bg-transparent!"
            >
              <Card key={key} className="rounded-md shadow-none h-full">
                <CardHeader>
                  <div className="relative flex mb-4 aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                    <Icon className="m-auto size-6" strokeWidth={1} />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </SpotlightCard>
          );
        })}
      </div>
      <div className="block md:hidden w-full">
        <MF />
      </div>
    </section>
  );
}
