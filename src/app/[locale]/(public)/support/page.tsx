import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import React from "react";

export default function SupportPage() {
  const t = useTranslations("pages.SupportPage");
  const faq = t.raw("faq") as string[];
  const contactMethods = t.raw("contact_methods") as Record<string, string>;
  const helpSites = t.raw("help_sites") as {
    title: string;
    description: string;
  }[];
  const form = t.raw("form") as {
    name_label: string;
    name_placeholder: string;
    email_label: string;
    email_placeholder: string;
    subject_label: string;
    subject_options: string[];
    message_label: string;
    message_placeholder: string;
    submit: string;
  };

  return (
    <div className="min-h-screen  mb-12 bg-linear-to-br from-[--color-hu-background] to-[--color-hu-secondary] dark:from-[--color-hu-background] dark:to-[--color-hu-secondary] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 bg-white/40 dark:bg-background backdrop-blur-sm rounded-md">
          <h1 className="text-2xl sm:text-4xl font-bold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("main_heading")}
          </h1>
          <div className="w-16 sm:w-24 h-1 bg-[--color-hu-primary] mx-auto rounded-full"></div>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("welcome_heading")}
          </h2>
          <p className="text-[--color-hu-foreground] mb-4 leading-relaxed opacity-90">
            {t("welcome_paragraph_1")}
          </p>
          <p className="text-[--color-hu-foreground] leading-relaxed opacity-90">
            {t("welcome_paragraph_2")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-6 sm:mb-8">
          <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-[--color-hu-foreground] mb-3">
              {t("faq_title")}
            </h3>
            <ul className="space-y-2 text-[--color-hu-foreground] opacity-90">
              {faq.map((item, idx) => (
                <li className="flex items-start" key={idx}>
                  <span className="text-[--color-hu-primary] font-bold text-xl mx-2">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg sm:text-xl font-semibold text-[--color-hu-foreground] mb-3">
              {t("contact_methods_title")}
            </h3>
            <ul className="space-y-3 text-[--color-hu-foreground] opacity-90">
              <li className="flex items-center">
                <span className="text-[--color-hu-primary] font-bold text-xl mx-2">
                  📧
                </span>
                <span>{contactMethods.email}</span>
              </li>
              <li className="flex items-center">
                <span className="text-[--color-hu-primary] font-bold text-xl mx-2">
                  💬
                </span>
                <span>{contactMethods.live_chat}</span>
              </li>
              <li className="flex items-center">
                <span className="text-[--color-hu-primary] font-bold text-xl mx-2">
                  📱
                </span>
                <span>{contactMethods.phone}</span>
              </li>
              <li className="flex items-center">
                <span className="text-[--color-hu-primary] font-bold text-xl mx-2">
                  💬
                </span>
                <span>{contactMethods.whatsapp}</span>
              </li>
              <li className="flex items-center">
                <span className="text-[--color-hu-primary] font-bold text-xl mx-2">
                  🌐
                </span>
                <span>{contactMethods.social}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("help_sites_title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helpSites.map((site, idx) => (
              <div
                className="p-4 border border-[--color-hu-border] rounded-lg"
                key={idx}
              >
                <h4 className="font-medium text-[--color-hu-foreground] mb-2">
                  {site.title}
                </h4>
                <p className="text-[--color-hu-foreground] text-sm opacity-80">
                  {site.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/40 dark:bg-background backdrop-blur-sm rounded-xl shadow-lg p-5 sm:p-6 transition-colors duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-[--color-hu-foreground] mb-3 sm:mb-4">
            {t("contact_form_title")}
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-[--color-hu-foreground] mb-1"
              >
                {form.name_label}
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-[--color-hu-input] text-[--color-hu-foreground] border border-[--color-hu-border] focus:outline-none focus:ring-2 focus:ring-[--color-hu-primary]"
                placeholder={form.name_placeholder}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-[--color-hu-foreground] mb-1"
              >
                {form.email_label}
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-[--color-hu-input] text-[--color-hu-foreground] border border-[--color-hu-border] focus:outline-none focus:ring-2 focus:ring-[--color-hu-primary]"
                placeholder={form.email_placeholder}
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-[--color-hu-foreground] mb-1"
              >
                {form.subject_label}
              </label>
              <select
                id="subject"
                className="w-full p-3 rounded-lg bg-[--color-hu-input] text-[--color-hu-foreground] border border-[--color-hu-border] focus:outline-none focus:ring-2 focus:ring-[--color-hu-primary]"
              >
                {form.subject_options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-[--color-hu-foreground] mb-1"
              >
                {form.message_label}
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 rounded-lg bg-[--color-hu-input] text-[--color-hu-foreground] border border-[--color-hu-border] focus:outline-none focus:ring-2 focus:ring-[--color-hu-primary]"
                placeholder={form.message_placeholder}
              ></textarea>
            </div>
            <Button
              type="submit"
              variant="outline"
              className="bg-[--color-hu-primary] hover:bg-[--color-hu-primary]/90 text-[--color-hu-primary-foreground] font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              {form.submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
