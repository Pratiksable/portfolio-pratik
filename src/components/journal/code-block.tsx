import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";

// Wraps a highlighted code block with a copy control. The control sits in a
// header row above the block, so it never covers code.
export function CodeBlock({
  code,
  language,
  children,
}: {
  code: string;
  language: string | null;
  children: ReactNode;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-md border border-border bg-[#262626]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2 text-sm text-text-muted">
        <span>{language ?? "Code"}</span>
        <CopyButton code={code} />
      </figcaption>
      <div className="overflow-x-auto">{children}</div>
    </figure>
  );
}
