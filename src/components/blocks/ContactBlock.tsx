"use client";
import React from "react";
import { cn } from "@/lib/cn";
import {
  Check,
  Copy,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  FacebookIcon,
  InstagramIcon,
} from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { Feedback } from "@/components/ui/feedback";
import LandingTitles from "@/components/shared/LandingTitles";

const APP_EMAIL = "lafkir.abdeldjalile@gmail.com";
const APP_PHONE = "+213676041742";
const APP_PHONE_2 = "+213657312135";
const APP_ADDRESS =
  "مجمع التعليم الإلكتروني، شارع عبد الحميد بن باديس، وهران، الجزائر";

const socialIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};
type ContactsInfo = {
  title: string;
  subtitle: string;
  methods: {
    title: string;
    description: string;
    email?: string;
    phone?: string;
    address?: string;
  }[];
  socialLinks: {
    title: string;
    subtitle: string;
    links: {
      icon: string;
      href: string;
      label: string;
    }[];
  };
  feedback: {
    title: string;
    placeholder: string;
    supported: string;
    submit: string;
  };
};

export function ContactBlock({
  contactsInfo,
}: {
  contactsInfo?: ContactsInfo;
}) {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto h-full max-w-6xl lg:border-x">
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
        >
          <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
        </div>
        <div className="flex grow flex-col justify-center px-4 md:px-6 pt-32 pb-16">
          <LandingTitles
            title={contactsInfo?.title || "تواصل معنا"}
            subtitle={contactsInfo?.subtitle || "نحن هنا لمساعدتك!"}
          />
        </div>
        <BorderSeparator />
        <div className="grid md:grid-cols-3 bg-white/40 dark:bg-black/40 backdrop-blur-sm">
          <Box
            icon={Mail}
            title={contactsInfo?.methods[0].title || "البريد الإلكتروني"}
            description={contactsInfo?.methods[0].description || ""}
          >
            <Link
              href={`mailto:${APP_EMAIL}`}
              className="font-mono text-base font-medium tracking-wide hover:underline"
            >
              {APP_EMAIL}
            </Link>
            <CopyButton className="size-6" test={APP_EMAIL} />
          </Box>
          <Box
            icon={MapPin}
            title={contactsInfo?.methods[2].title || "العنوان"}
            description={contactsInfo?.methods[2].description || ""}
          >
            <Link
              className="font-mono text-base font-medium tracking-wide hover:underline"
              href="#"
              style={{
                textAlign: "right",
                fontFamily: "'Noto Naskh Arabic', 'Amiri', serif",
              }}
            >
              {APP_ADDRESS}
            </Link>
            <CopyButton className="size-6" test={APP_ADDRESS} />
          </Box>
          <Box
            icon={Phone}
            title={contactsInfo?.methods[1].title || "الهاتف"}
            description={
              contactsInfo?.methods[1].description ||
              "متاح من الاثنين إلى الجمعة، من 9 صباحًا إلى 5 مساءً."
            }
            className="border-b-0 md:border-r-0"
          >
            <div>
              <div className="flex items-center gap-x-2">
                <Link
                  href={`tel:${APP_PHONE}`}
                  className="block font-mono text-base font-medium tracking-wide hover:underline text-end"
                >
                  {APP_PHONE}
                </Link>
                <CopyButton className="size-6" test={APP_PHONE} />
              </div>
              <div className="flex items-center gap-x-2">
                <Link
                  href={`tel:${APP_PHONE_2}`}
                  className="block font-mono text-base font-medium tracking-wide hover:underline text-end"
                >
                  {APP_PHONE_2}
                </Link>
                <CopyButton className="size-6" test={APP_PHONE_2} />
              </div>
            </div>
          </Box>
        </div>
        <BorderSeparator />
        <div className="relative flex h-full min-h-80 items-center justify-center">
          <div
            className={cn(
              "z--10 absolute inset-0 size-full",
              "bg-[radial-gradient(color-mix(in_oklab,var(--foreground)30%,transparent)_1px,transparent_1px)]",
              "bg-size-[32px_32px]",
              "mask-[radial-gradient(ellipse_at_center,var(--background)_30%,transparent)]"
            )}
          />

          <div className="relative z-1 space-y-6 flex flex-col items-center px-4 md:px-6 text-center">
            <LandingTitles
              title={""}
              subtitle={
                contactsInfo?.socialLinks?.subtitle ||
                "ابقى على اتصال وتابع آخر التحديثات والأخبار."
              }
            />
            <div className="flex flex-wrap  items-center justify-center gap-4">
              {contactsInfo?.socialLinks?.links?.map((link) => {
                const Icon = socialIconMap[link.icon];
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/40 dark:bg-black/40 backdrop-blur-xs hover:bg-accent flex items-center gap-x-2 rounded-full border px-4 py-2"
                  >
                    {Icon && <Icon className="size-4" />}
                    <span className="font-mono text-sm font-medium tracking-wide">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <Feedback
              label={contactsInfo?.feedback?.title || "أرسل لنا ملاحظاتك"}
              placeholder={contactsInfo?.feedback?.placeholder || "رسالتك..."}
              supported={contactsInfo?.feedback?.supported || "مدعوم"}
              submit={contactsInfo?.feedback?.submit || "إرسال "}
              type="inline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b" />;
}

type ContactBox = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Box({
  title,
  description,
  className,
  children,
  ...props
}: ContactBox) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border-b md:border-l md:border-b-0",
        className
      )}
    >
      <div className="bg-muted/40 flex items-center gap-x-3 border-b p-4">
        <props.icon className="text-muted-foreground size-5" strokeWidth={1} />
        <h2 className="font-heading text-lg font-medium tracking-wider">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-x-2 p-4 py-6">{children}</div>
      <div className="border-t p-4 md:min-h-20">
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

type CopyButtonProps = ButtonProps & {
  test: string;
};

function CopyButton({
  className,
  variant = "ghost",
  size = "icon",
  test,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(test);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("disabled:opacity-100", className)}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied || props.disabled}
      {...props}
    >
      <div
        className={cn(
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
      </div>
      <div
        className={cn(
          "absolute transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Copy aria-hidden="true" className="size-3.5" />
      </div>
    </Button>
  );
}
