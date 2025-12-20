import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("landing.footer");
  const links = [
    { title: t("links.about"), href: "/about" },
    { title: t("links.terms"), href: "/terms" },
    { title: t("links.privacy"), href: "/privacy" },
    { title: t("links.support"), href: "/support" },
  ];
  return (
    <footer className=" bg-white/40 dark:bg-black/40 backdrop-blur-sm border-t py-6 w-full">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-between gap-x-12 gap-y-4">
          <div className=" flex  items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground block text-center text-lg"
            >
              {t("title")}
            </Link>
            <span className="text-muted-foreground block text-center text-lg">
              | {new Date().getFullYear()} - {t("copyright")}
            </span>
          </div>
          <div className="order-first flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:order-last">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
