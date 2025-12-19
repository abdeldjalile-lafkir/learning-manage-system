import { cn } from "@/lib/cn";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const AnimatedLangToggle = ({
  language,
  changeLanguage,
  className,
}: {
  language?: string;
  changeLanguage: (language: string) => void;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const call = async () => {
      setMounted(true);
    };
    call();
  }, []);

  const isAr = language === "ar";
  if (!mounted) return null;

  return (
    <Button
      onClick={() => changeLanguage(language === "ar" ? "en" : "ar")}
      className={cn("px-2.5", className)}
      variant="outline"
    >
      {isAr ? "AR" : "EN"}
    </Button>
  );
};
