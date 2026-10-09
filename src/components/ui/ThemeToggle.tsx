"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { THEME_KEY, type Theme } from "@/lib/theme";

/**
 * The real theme is already on <html> before React hydrates (see
 * themeInitScript), so the DOM — not component state — is the source of
 * truth. Subscribing to it keeps the icon correct even if the attribute
 * is changed from outside this component.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/** Matches the attribute rendered on the server, so hydration agrees. */
const getServerSnapshot = (): Theme => "dark";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isLight = theme === "light";

  const toggle = () => {
    const next: Theme = isLight ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={`relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border border-line-strong bg-surface-2 text-text-dim transition-colors duration-300 hover:border-accent/50 hover:text-text ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ y: 14, opacity: 0, rotate: -40 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center"
      >
        {isLight ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </motion.span>
    </button>
  );
}
