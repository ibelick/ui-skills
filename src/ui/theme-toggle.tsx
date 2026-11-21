import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ui-skills-theme";

const isDarkNow = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));

    sync();

    // Layout.astro owns applying the class (initial load, back/forward, other
    // tabs); mirror it here so the label stays correct.
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !isDarkNow();

    root.classList.add("theme-switching");
    root.classList.toggle("dark", nextIsDark);

    try {
      localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this page.
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-switching"));
    });
  };

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className="border-line-default bg-fill-default text-content-primary hover:bg-fill-subtle focus-visible:outline-content-primary inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border text-sm transition-colors focus-visible:outline-1 focus-visible:outline-offset-2"
    >
      <MoonIcon className="size-4 dark:hidden" aria-hidden="true" />
      <SunIcon className="hidden size-4 dark:block" aria-hidden="true" />
    </button>
  );
}
