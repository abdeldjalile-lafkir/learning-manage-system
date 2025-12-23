"use client";

import * as React from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/cn";

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
CustomAccordionItem.displayName = "CustomAccordionItem";

const CustomAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-start justify-start gap-4 rounded-2xl p-4  shadow-md",
        "bg-[#ffff] dark:bg-zinc-800 dark:text-white transition-all hover:bg-gray-50/70 hover:shadow-md",
        "dark:hover:bg-zinc-700/60 focus-visible:outline-none focus-visible:ring-2",
        "dark:data-[state=open]:bg-zinc-700 data-[state=open]:shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-start gap-4">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-600/70 transition-transform group-hover:scale-105 group-data-[state=open]:rotate-180">
          <ChevronDown className="h-4 w-4 text-gray-800 dark:text-white" />
        </div>
        <div className="flex items-start justify-start">
          <span className="text-lg text-start font-medium dark:text-zinc-50 text-zinc-700 tracking-wide">
            {children}
          </span>
        </div>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

const CustomAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden dark:text-white",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-2",
      className
    )}
    {...props}
  >
    <div className="mt-4 ml-14">
      <div className="flex items-start justify-start gap-4 rounded-2xl bg-[#ffff] dark:bg-zinc-700 p-4 shadow-md transition-all">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300/70 dark:bg-zinc-600 transition-transform hover:scale-105">
          <MessageCircle className="h-5 w-5 text-gray-700 dark:text-white" />
        </div>
        <span className="flex-1 text-md leading-relaxed">{children}</span>
      </div>
    </div>
  </AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = "CustomAccordionContent";

export {
  CustomAccordion,
  CustomAccordionItem,
  CustomAccordionTrigger,
  CustomAccordionContent,
};

export function AccordionComponent({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <main className="max-w-3xl w-full mx-auto p-4 flex flex-col items-center justify-center md:p-8">
      <div className="max-w-3xl w-full mx-auto">
        <CustomAccordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <CustomAccordionItem key={index} value={`item-${index}`}>
              <CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
              <CustomAccordionContent>{faq.answer}</CustomAccordionContent>
            </CustomAccordionItem>
          ))}
        </CustomAccordion>
      </div>
    </main>
  );
}
