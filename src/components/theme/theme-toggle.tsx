"use client";

import { useSyncExternalStore } from "react";
import { currentTheme, setPreference, subscribeTheme, type Theme } from "./theme";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

// A two-position switch: Morning (light) and Night (dark). It starts on the
// visitor's system setting, and a choice made here is remembered. The track
// keeps the warm daylight tint in Morning and the deep night tint in Night.
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "light" as Theme);
  const isNight = theme === "dark";

  return (
    <div className="flex items-center">
      <button
        type="button"
        role="switch"
        aria-checked={isNight}
        aria-label="Night mode"
        onClick={() => setPreference(isNight ? "light" : "dark")}
        className="relative inline-flex h-11 w-[4.5rem] shrink-0 items-center rounded-full border border-border p-1 shadow-inner transition-colors hover:border-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        style={{ background: "var(--toggle-track)" }}
      >
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full bg-surface-raised text-text shadow-[0_2px_10px_rgb(0_0_0/0.25)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] motion-reduce:transition-none"
          style={{ transform: isNight ? "translateX(2rem)" : "translateX(0)" }}
        >
          {isNight ? <MoonIcon /> : <SunIcon />}
        </span>
      </button>
    </div>
  );
}
