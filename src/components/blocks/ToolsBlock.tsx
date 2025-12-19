import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  Google,
  Gmail,
  Zoom,
  WhatsApp,
  Chrome,
  Meet,
  Calendar,
  Plus,
} from "@/components/icons/Logos";

type Logo = React.ReactNode;

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative my-2 grid grid-cols-2 border-x md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      <LogoCard
        className="relative border-r border-b bg-secondary dark:bg-secondary/30"
        logo={<Google />}
      >
        <PlusIcon
          className="hidden md:block -left-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard className="border-b md:border-r" logo={<Chrome />} />

      <LogoCard
        className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
        logo={<Gmail />}
      >
        <PlusIcon
          className="hidden md:block -right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={<Calendar />}
      />

      <LogoCard
        className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={<Meet />}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 hidden"
          strokeWidth={1}
        />
      </LogoCard>

      <LogoCard
        className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
        logo={<Zoom />}
      />

      <LogoCard className="border-r" logo={<WhatsApp />} />

      <LogoCard className="bg-secondary dark:bg-secondary/30" logo={<Plus />} />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className
      )}
      {...props}
    >
      <div className="w-12 h-12">{logo}</div>
      {children}
    </div>
  );
}
