import { ContactBlock } from "@/components/landing/blocks/ContactBlock";
import { useTranslations } from "next-intl";

export function Contacts() {
  const t = useTranslations("landing.contacts");
  const contactsInfo = {
    title: t("title"),
    subtitle: t("subtitle"),
    methods: [
      {
        title: t("methods.0.title"),
        description: t("methods.0.description"),
        email: "lafkir.abdeldjalile@gmail.com",
      },
      {
        title: t("methods.1.title"),
        description: t("methods.1.description"),
        phone: "+213 676 04 17 42",
      },
      {
        title: t("methods.2.title"),
        description: t("methods.2.description"),
        address:
          "  مجمع التعليم الإلكتروني، شارع عبد الحميد بن باديس، وهران، الجزائر",
      },
    ],

    socialLinks: {
      title: t("socialLinks.title"),
      subtitle: t("socialLinks.subtitle"),
      links: [
        {
          label: t("socialLinks.links.0.label"),
          href: t("socialLinks.links.0.href"),
          icon: "FacebookIcon",
        },
        {
          icon: "InstagramIcon",
          href: t("socialLinks.links.1.href"),
          label: t("socialLinks.links.1.label"),
        },
      ],
    },
    feedback: {
      title: t("feedback.title"),
      placeholder: t("feedback.placeholder"),
      supported: t("feedback.supported"),
      submit: t("feedback.submit"),
    },
  };

  return (
    <div id="contact">
      <ContactBlock contactsInfo={contactsInfo} />{" "}
    </div>
  );
}
