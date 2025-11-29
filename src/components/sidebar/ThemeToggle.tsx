"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        inline-flex items-center justify-center
        w-8 h-8 rounded-md
        bg-[#e2e5e7] text-slate-800
        hover:bg-slate-300
        dark:bg-slate-800 dark:text-slate-200
        dark:hover:bg-slate-700
        transition-colors
      "
    >
      {isDark ? <span className="text-sm">☀️</span> : <span className="text-sm">🌙</span>}
    </button>
  );
}
