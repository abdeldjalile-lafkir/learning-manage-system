import { AccordionComponent } from "@/components/landing/blocks/AccordionBlock";
import LandingTitles from "@/components/shared/LandingTitles";
import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations("landing.faq");
  const faqs = Array.from({ length: 5 }).map((_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }));
  return (
    <>
      <LandingTitles title={t("title")} subtitle={t("subtitle")} />
      <AccordionComponent faqs={faqs} />
    </>
  );
}
