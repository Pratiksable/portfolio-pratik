import type { ReactNode } from "react";

// A note or caution inside an article. The label is text, so the kind is
// never conveyed by color alone. The surface is a tinted inset, not a
// coloured side border.
export function Callout({
  tone = "note",
  children,
}: {
  tone?: "note" | "caution";
  children: ReactNode;
}) {
  return (
    <aside className="my-8 rounded-md bg-surface-inset p-5">
      <p className="text-sm font-medium">{tone === "caution" ? "Caution" : "Note"}</p>
      <div className="mt-2 text-text-muted">{children}</div>
    </aside>
  );
}
