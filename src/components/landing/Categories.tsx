import { useTranslations } from "next-intl";
import LandingTitles from "@/components/shared/LandingTitles";
import CategoriesBlock from "@/components/blocks/CategoriesBlock";

export function Categories() {
  const t = useTranslations("landing.categories");
  const categoriesData = [
    {
      title: t("plans.0.title"),
      price: t("plans.0.price"),
      description: t("plans.0.description"),
      features: [
        t("plans.0.features.0"),
        t("plans.0.features.1"),
        t("plans.0.features.2"),
      ],
      cta: t("plans.0.cta"),
      href: "/signup?plan=elementary",
      featured: false,
    },
    {
      title: t("plans.1.title"),
      price: t("plans.1.price"),
      description: t("plans.1.description"),
      features: [
        t("plans.1.features.0"),
        t("plans.1.features.1"),
        t("plans.1.features.2"),
        t("plans.1.features.3"),
      ],
      cta: t("plans.1.cta"),
      href: "/signup?plan=middle",
      featured: true,
    },
    {
      title: t("plans.2.title"),
      price: t("plans.2.price"),
      description: t("plans.2.description"),
      features: [
        t("plans.2.features.0"),
        t("plans.2.features.1"),
        t("plans.2.features.2"),
        t("plans.2.features.3"),
      ],
      cta: t("plans.2.cta"),
      href: "/signup?plan=high",
      featured: false,
    },
  ];
  return (
    <div id="categories">
      <LandingTitles title={t("title")} subtitle={t("subtitle")} />
      <CategoriesBlock categoriesData={categoriesData} />
    </div>
  );
}
