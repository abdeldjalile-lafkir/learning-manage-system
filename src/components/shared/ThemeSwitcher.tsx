import React from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return <AnimatedThemeToggle theme={theme} setTheme={setTheme} />;
};

export default ThemeSwitcher;
