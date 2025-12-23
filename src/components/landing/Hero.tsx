"use client";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { toast } from "sonner";
import { ElegantShape, shapes } from "@/components/landing/blocks/ElegantShape";
import { useLocale, useTranslations } from "next-intl";

export function Hero({
  badge,
  title1,
  title2,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const t = useTranslations("landing.hero");
  const locale = useLocale();
  const badgeText = badge ?? (t("cta.hhhhh") as string) ?? "";
  const headingMain = title1 ?? (t("title") as string) ?? "";
  const headingGradient =
    title2 ??
    (t("subtitleGradient") as string) ??
    (t("subtitle") as string) ??
    "";
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
        delay: 1 + i * 1,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative w-full flex items-center min-h-[80vh] justify-center overflow-x-hidden bg-background"
    >
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10  to-rose-500/10 blur-3xl dark:from-indigo-500/10 dark:to-rose-500/10" />

      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((s, i) => (
          <ElegantShape
            key={i}
            delay={s.delay}
            width={s.width}
            height={s.height}
            rotate={s.rotate}
            gradient={s.gradient}
            className={s.className}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 ">
        <div className="max-w-3xl mx-auto md:mt-40 text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-border/30 mb-8 md:mb-10 hover:bg-accent/30 transition"
          >
            <span
              className="text-xs md:text-lg text-muted-foreground tracking-wide"
              onClick={() => {
                toast(t("cta.hhhhh") || "");
              }}
            >
              {badgeText}
            </span>
            <Circle className="h-2 w-2 fill-rose-500/80 dark:fill-rose-400/80" />
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <p className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/80">
                {headingMain}
              </p>
              <p className="bg-clip-text  text-transparent bg-linear-to-r from-indigo-600 via-foreground/90 to-rose-500 dark:from-indigo-400 dark:to-rose-400">
                {headingGradient}
              </p>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {t("description")}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}
