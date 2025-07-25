"use client";

import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:cursor-pointer p-2 rounded-lg hover:bg-gray-500/20 hover:dark:bg-white/20 shadow-lg border border-accent dark:border-0 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </button>
  );
}
