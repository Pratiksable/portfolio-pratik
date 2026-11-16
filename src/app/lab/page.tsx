import type { Metadata } from "next";
import Link from "next/link";
import { labExperiments } from "@/content/lab";

export const metadata: Metadata = {
  title: "Engineering lab",
  description: "Engineering concepts shown running: rate limiting, concurrency, and streaming.",
};

export default function LabIndex() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <header className="w-full px-6 pb-10 pt-20 md:px-12 md:pt-28 xl:px-16">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] font-semibold leading-none tracking-[-0.03em]">
          Engineering lab
        </h1>
        <p className="mt-6 max-w-prose text-lg text-text-muted">
          Engineering concepts, shown running. A demonstration runs in your browser and shows how
          an algorithm behaves. It is not a production system. Planned entries are not built yet.
        </p>
      </header>

      <div className="w-full px-6 pb-24 md:px-12 xl:px-16">
        <ul className="divide-y divide-border border-y border-border">
          {labExperiments.map((experiment) => {
            const isDemo = experiment.status === "demonstration";
            return (
              <li key={experiment.slug} className="grid gap-4 py-10 md:grid-cols-12 md:gap-10">
                <p className="text-sm text-text-muted md:col-span-2">
                  {isDemo ? "Demonstration" : "Planned"}
                </p>
                <div className="md:col-span-10">
                  {isDemo ? (
                    <Link href={`/lab/${experiment.slug}`} className="group block">
                      <h2 className="font-display text-3xl font-semibold tracking-tight group-hover:underline md:text-4xl">
                        {experiment.title}
                      </h2>
                      <p className="mt-3 max-w-prose text-lg text-text-muted">{experiment.question}</p>
                      <p className="mt-2 max-w-prose text-text-muted">{experiment.summary}</p>
                    </Link>
                  ) : (
                    <div>
                      <h2 className="font-display text-3xl font-semibold tracking-tight text-text-muted md:text-4xl">
                        {experiment.title}
                      </h2>
                      <p className="mt-3 max-w-prose text-lg text-text-muted">{experiment.question}</p>
                      <p className="mt-2 max-w-prose text-text-muted">{experiment.summary}</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
