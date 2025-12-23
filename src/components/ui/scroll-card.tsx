"use client";
import { ReactLenis } from "lenis/react";
import React, { forwardRef } from "react";
import {
  BookOpen,
  Clock,
  Award,
  Notebook,
  MessageSquare,
  GraduationCap,
} from "lucide-react";
import SpotlightCard from "@/components/landing/blocks/SpotlightCard";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { useTranslations } from "next-intl";

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

const Features = forwardRef<HTMLElement>((props, ref) => {
  const t = useTranslations("landing.features");
  return (
    <ReactLenis root>
      <main className="bg-background" ref={ref}>
        <section className="text-white bg-background/50 w-full">
          <div className="flex justify-between">
            <div className="grid gap-2">
              {features.map((feature, i) => {
                const { key, icon: Icon } = feature;
                const title = t(`items.${key}.title`);
                const description = t(`items.${key}.description`);
                return (
                  <figure
                    key={i}
                    className="sticky top-30 grid place-content-center"
                    style={{ top: 120 + i * 15 }}
                  >
                    <article className="rounded-lg w-full p-4 grid place-content-center gap-4">
                      <SpotlightCard
                        key={key}
                        className="p-2! rounded-xl! bg-transparent!"
                      >
                        <Card
                          key={key}
                          className="rounded-md shadow-none h-full"
                        >
                          <CardHeader>
                            <div className="relative flex mb-4 aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                              <Icon className="m-auto size-6" strokeWidth={1} />
                            </div>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                          </CardHeader>
                        </Card>
                      </SpotlightCard>
                    </article>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
});

Features.displayName = "Features";
export { Features };
