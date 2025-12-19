"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

import type React from "react";
import { useRef, useState } from "react";

type HowItWorksBaseProps = React.HTMLAttributes<HTMLElement>;

interface HowItWorksProps extends HowItWorksBaseProps {
  stepsData: StepCardProps[];
}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative rounded-lg border bg-card p-6 text-card-foreground transition-all duration-300 ease-in-out",
      "md:hover:scale-105 md:hover:shadow-lg md:hover:border-primary/50 md:hover:bg-muted"
    )}
  >
    <div className="w-full flex items-center justify-start">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-primary">
        {icon}
      </div>
    </div>

    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="mb-6 text-muted-foreground">{description}</p>

    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start justify-start gap-3 ">
          <div className="flex h-4 w-4 my-1 shrink-0 items-center justify-center rounded-full bg-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary text-center"></div>
          </div>
          <span className="text-muted-foreground text-start">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  stepsData,
  ...props
}) => {
  return (
    <section
      id="how-it-works"
      className={cn("w-full bg-transparent py-16 sm:py-24", className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="relative mx-auto mb-8 w-full max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute left-[10.6667%] top-1/2 h-0.5 w-[76.6667%] -translate-y-1/2 bg-border"
          ></div>
          <div className="relative grid grid-cols-6">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-muted font-semibold text-foreground ring-4 ring-background"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto hidden md:grid max-w-8xl grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>

        <ShuffleCards stepsData={stepsData} />
      </div>
    </section>
  );
};

export const ShuffleCards = ({ stepsData }: { stepsData: StepCardProps[] }) => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);

  const handleShuffle = () => {
    const newOrder = [...order];
    const lastItem = newOrder.pop();
    if (lastItem !== undefined) {
      newOrder.unshift(lastItem);
    }
    setOrder(newOrder);
  };

  return (
    <div className="grid w-full h-162.5 overflow-hidden px-8 py-24 text-slate-50 md:hidden">
      <div className="relative">
        {stepsData.map((step, index) => (
          <TestimonialCard
            key={index}
            handleShuffle={handleShuffle}
            orderIndex={order[index]}
            step={step}
          />
        ))}
      </div>
    </div>
  );
};

function TestimonialCard({
  handleShuffle,
  orderIndex,
  step,
}: {
  handleShuffle: () => void;
  orderIndex: number;
  step: StepCardProps;
}) {
  const dragRef = useRef(0);
  const isFront = orderIndex === 0;
  const isVisible = orderIndex < 3;
  const rotate = isVisible ? (orderIndex - 1) * 6 : 0;
  const x = isVisible ? `${orderIndex * 10}%` : "20%";
  const scale = 1 - orderIndex * 0.05;
  const zIndex = 6 - orderIndex;

  return (
    <motion.div
      style={{
        zIndex,
      }}
      animate={{
        rotate: `${rotate}deg`,
        x,
        scale,
        opacity: isVisible ? 1 : 0,
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={(e) => {
        // @ts-expect-error - Framer motion types for drag events can be tricky
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e) => {
        // @ts-expect-error - Framer motion types for drag events can be tricky
        if (dragRef.current - e.clientX > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute  left-0 top-0 grid select-none space-y-6 rounded-2xl border-2 border-slate-700 p-2 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      <StepCard
        icon={step.icon}
        title={step.title}
        description={step.description}
        benefits={step.benefits}
      />
    </motion.div>
  );
}
