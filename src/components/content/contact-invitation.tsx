import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/content/site";

// The homepage's closing invitation. It points to the full contact page, and
// shows an email link only once the owner has approved an address.
export function ContactInvitation() {
  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-12">
      <p className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.025em] md:col-span-8">
        If you are building interfaces or services that have to stay correct under real
        conditions, I would like to hear what you are working on.
      </p>
      <div className="flex flex-col items-start gap-6 md:col-span-4 md:justify-end">
        <ButtonLink href="/contact" variant="primary">
          Start a conversation
        </ButtonLink>
        {site.contact.email ? (
          <a
            href={`mailto:${site.contact.email}`}
            className="inline-flex min-h-11 items-center text-accent underline underline-offset-4 hover:text-accent-strong"
          >
            Email me directly
          </a>
        ) : null}
      </div>
    </div>
  );
}
