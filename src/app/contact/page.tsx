import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to get in touch, and what makes a reply useful.",
};

const channels = [
  { id: "email", label: "Email", value: site.contact.email },
  { id: "linkedin", label: "LinkedIn", value: site.contact.linkedin },
  { id: "github", label: "GitHub", value: site.contact.github },
] as const;

const helpfulDetails = [
  "The kind of role, project, or problem you are thinking about.",
  "The one constraint that makes it difficult, stated plainly.",
  "Roughly when you would like to talk, and how much time you have.",
];

// Contact channels appear only once the owner approves them in site content.
// Until then each channel says so, rather than showing a guessed address.
export default function ContactPage() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <section aria-labelledby="contact-title" className="w-full border-b border-border px-6 pb-24 pt-24 md:px-12 md:pb-32 md:pt-32 xl:px-16">
        <h1
          id="contact-title"
          className="font-display text-[clamp(3rem,10vw,8rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
        >
          Let&rsquo;s talk about the hard parts.
        </h1>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-text-muted md:text-2xl">
          If you are building interfaces or services that have to stay correct under real
          conditions, or you are hiring for that work, I would like to hear what you are working on.
        </p>
      </section>

      <section aria-labelledby="reply-title" className="w-full px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 id="reply-title" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              What makes a reply useful
            </h2>
            <p className="mt-6 max-w-prose text-lg text-text-muted">
              A short, specific message gets a faster and more useful answer than a general one.
            </p>
          </div>
          <ul className="space-y-8 md:col-span-7">
            {helpfulDetails.map((detail) => (
              <li key={detail} className="border-t border-border pt-6 text-xl leading-relaxed">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="channels-title" className="w-full border-t border-border px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <h2 id="channels-title" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Channels
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
          {channels.map((channel) => (
            <li key={channel.id} className="flex min-h-40 flex-col justify-between gap-6 bg-surface p-8">
              <p className="font-display text-2xl font-semibold tracking-tight">{channel.label}</p>
              {channel.value ? (
                <a
                  href={channel.id === "email" ? `mailto:${channel.value}` : channel.value}
                  className="break-all text-accent underline underline-offset-4 hover:text-accent-strong"
                >
                  {channel.value}
                </a>
              ) : (
                <p className="text-text-muted">Not yet provided. Add it in src/content/site.ts.</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="more-title" className="w-full border-t border-border px-6 py-24 md:px-12 md:py-32 xl:px-16">
        <h2 id="more-title" className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Before you write, you might want to see the work.
        </h2>
        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href="/projects" variant="primary">
            Browse projects
          </ButtonLink>
          <ButtonLink href="/about" variant="secondary">
            Read about me
          </ButtonLink>
          <ButtonLink href="/lab" variant="secondary">
            Open the engineering lab
          </ButtonLink>
        </div>
        <p className="mt-12 text-sm text-text-muted">
          <Link href="/" className="underline underline-offset-4 hover:text-text">
            Back to the homepage
          </Link>
        </p>
      </section>
    </main>
  );
}
