import type { Metadata } from "next";
import Link from "next/link";
import { TokenBucketDemo } from "@/components/lab/token-bucket-demo";

export const metadata: Metadata = {
  title: "Token bucket rate limiter",
  description: "A browser demonstration of the token bucket algorithm used in rate limiting.",
};

export default function TokenBucketPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <nav aria-label="Breadcrumb" className="w-full px-6 pt-16 text-sm text-text-muted md:px-12 md:pt-24 xl:px-16">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/lab" className="underline underline-offset-4 hover:text-text">
              Engineering lab
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-text">
            Token bucket rate limiter
          </li>
        </ol>
      </nav>

      <header className="w-full px-6 pb-12 pt-10 md:px-12 xl:px-16">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-none tracking-[-0.03em]">
          Token bucket rate limiter
        </h1>
        <p className="mt-6 max-w-prose text-lg text-text-muted">
          A token bucket holds up to a fixed number of tokens. Each request takes one token. Tokens
          refill at a steady rate, and the bucket never holds more than its capacity. A request with
          no token is rejected. This demonstration runs the algorithm in your browser.
        </p>
      </header>

      <section aria-labelledby="demo-title" className="w-full border-t border-border px-6 py-16 md:px-12 md:py-24 xl:px-16">
        <h2 id="demo-title" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Run it
        </h2>
        <div className="mt-10 max-w-3xl">
          <TokenBucketDemo />
        </div>
      </section>

      <section aria-labelledby="limits-title" className="w-full border-t border-border px-6 py-16 md:px-12 md:py-24 xl:px-16">
        <h2 id="limits-title" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          What it leaves out
        </h2>
        <ul className="mt-8 max-w-prose list-disc space-y-3 pl-6 text-text-muted">
          <li>It runs in one browser tab. A real limiter is shared across many clients and servers.</li>
          <li>It does not persist state or survive a restart.</li>
          <li>It keeps no per-user buckets. There is one bucket for this page.</li>
          <li>Refill is calculated when a request is sent, not continuously.</li>
        </ul>
      </section>
    </main>
  );
}
