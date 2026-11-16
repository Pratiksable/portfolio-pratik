// Colour theme. The page is light or dark; the visitor's choice is one of
// light, dark, or system (follow the operating system). A light or dark choice
// is applied as data-theme on <html> and kept in local storage, which is a
// per-visitor convenience. "System" stores nothing and removes the attribute.
export type Theme = "light" | "dark";
export type Preference = Theme | "system";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

// The theme actually on screen right now.
export function currentTheme(): Theme {
  const attribute = document.documentElement.dataset.theme;
  if (attribute === "light" || attribute === "dark") {
    return attribute;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The visitor's stored choice. Defaults to following the system.
export function readPreference(): Preference {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Storage can be unavailable (private windows); fall back to the system.
  }
  return "system";
}

export function setPreference(preference: Preference) {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch {
    // The choice still applies for this visit even if it cannot be saved.
  }
  if (preference === "system") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = preference;
  }
  listeners.forEach((listener) => listener());
}

// Notifies on a changed choice and on a changed operating-system setting.
export function subscribeTheme(onChange: () => void): () => void {
  listeners.add(onChange);
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    query.removeEventListener("change", onChange);
  };
}

// Runs before first paint, so a stored light or dark choice never flashes.
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;
