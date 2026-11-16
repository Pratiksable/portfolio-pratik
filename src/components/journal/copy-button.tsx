"use client";

import { useEffect, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

// Copies a code block's text. The status is announced through a live region,
// so screen-reader users hear the outcome without moving focus.
export function CopyButton({ code }: { code: string }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") {
      return;
    }
    const timer = window.setTimeout(() => setState("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  const label = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code to clipboard"
        className="min-h-9 rounded-md border border-border px-3 text-sm text-text hover:border-text-muted"
      >
        {label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Code copied." : state === "failed" ? "Copy failed." : ""}
      </span>
    </>
  );
}
