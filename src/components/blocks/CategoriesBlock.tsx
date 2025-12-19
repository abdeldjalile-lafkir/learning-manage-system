import * as React from "react";
import { CircleCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn("py-8 md:py-12", className)} id={id}>
    {children}
  </section>
);

const Container = ({ children, className, id }: ContainerProps) => (
  <div className={cn("mx-auto max-w-5xl p-6 sm:p-8", className)} id={id}>
    {children}
  </div>
);

interface CategoryCardProps {
  title: string;
  price: string;
  description?: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}

export default function CategoriesBlock({
  categoriesData,
}: {
  categoriesData: CategoryCardProps[];
}) {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 max-w-8xl text-center">
        <div className="not-prose mt-4 grid grid-cols-1 gap-6 min-[900px]:grid-cols-3">
          {categoriesData.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CategoryCard({ category }: { category: CategoryCardProps }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border-3 p-6 backdrop-blur-sm",
        category.featured && "border-primary shadow-sm ring-1 ring-primary/10"
      )}
      aria-label={`${category.title} plan`}
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2">
          <Badge variant={category.featured ? "default" : "secondary"}>
            {category.title}
          </Badge>
        </div>
        <h4 className="mb-2 mt-4 text-xl text-primary">{category.price}</h4>
        {category.description && (
          <p className="text-sm opacity-70">{category.description}</p>
        )}
      </div>

      <div className="my-4 border-t" />

      <ul className="space-y-3 flex justify-center flex-col">
        {category.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start text-start text-sm opacity-80"
          >
            <CircleCheck className=" h-4 w-4 my-1 mx-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* <div className="mt-auto pt-6">
        <Link href={plan.href} target="_blank" rel="noreferrer noopener">
          <Button
            size="lg"
            className="w-full"
            variant={plan.featured ? "default" : "secondary"}
          >
            {plan.cta}
          </Button>
        </Link>
      </div> */}
    </div>
  );
}
