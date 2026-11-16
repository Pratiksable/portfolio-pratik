import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
};

// A link styled as a button. Variants are named, never boolean flags.
export function ButtonLink({ href, variant, children }: ButtonLinkProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-md px-5 font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-text-inverse hover:bg-accent-strong"
      : "border border-text-muted text-text hover:border-text";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}
