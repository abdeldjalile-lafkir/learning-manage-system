"use client";

import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

export function Header() {
  const t = useTranslations("navigation");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 0);
      }, 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "px-4 sticky top-0 z-50 flex items-center justify-center w-full  bg-background md:backdrop-blur md:supports-backdrop-filter:bg-background/60 transition-all duration-1000",
        isScrolled &&
          "md:w-[60%] md:border md:top-2 md:px-8 md:shadow-md md:rounded-md backdrop-blur supports-backdrop-filter:bg-background/60 border-b"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">LMS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("home")}
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("features")}
            </Link>
            <Link
              href="#categories"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("categories")}
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth">{t("login")}</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/teacher/">{t("register")}</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <DialogTitle></DialogTitle>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="#features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {t("features")}
                </Link>
                <Link
                  href="#categories"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {t("categories")}
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {t("contact")}
                </Link>
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Button variant="outline" asChild>
                    <Link href="/auth">{t("login")}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth">{t("register")}</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
