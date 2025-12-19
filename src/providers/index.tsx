import React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { Toaster } from "@/components/ui/sonner";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Provider;
