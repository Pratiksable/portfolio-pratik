import { ButtonLink } from "@/components/ui/button-link";
import { TokenBucketDemo } from "@/components/lab/token-bucket-demo";
import { experiments } from "@/content/experiments";
import { publishedOnly } from "@/lib/content";

// Lab section. Published experiments list here once they have results. Until
// then the section offers a working demonstration of a rate limiter, clearly
// labelled as a demonstration of the algorithm.
export function ExperimentPreview() {
  const published = publishedOnly(experiments);

  if (published.length > 0) {
    return (
      <ul className="divide-y divide-border border-y border-border">
        {published.map((experiment) => (
          <li key={experiment.slug} className="py-6">
            <h4 className="font-display text-xl font-semibold tracking-tight">{experiment.title}</h4>
            <p className="mt-2 text-text-muted">{experiment.summary}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid gap-16 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        <p className="font-display text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.15] tracking-[-0.02em]">
          Rate limiting, shown running.
        </p>
        <p className="mt-6 max-w-prose text-text-muted">
          This is a browser implementation of a token bucket, the algorithm behind many rate
          limiters. Send requests and watch the bucket drain and refill. It demonstrates the
          algorithm only. It is not a production service, and no published experiment exists yet.
        </p>
        <div className="mt-10">
          <ButtonLink href="/lab" variant="secondary">
            Open the engineering lab
          </ButtonLink>
        </div>
      </div>
      <div className="md:col-span-7">
        <TokenBucketDemo />
      </div>
    </div>
  );
}
