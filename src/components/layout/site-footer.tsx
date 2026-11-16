import Link from "next/link";
import { site } from "@/content/site";

const explore = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/journal", label: "Journal" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];

// Underlines draw in from the left on hover. The line is a background gradient,
// so no extra markup or script is needed.
const underline =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-bottom bg-no-repeat transition-[background-size] duration-300 hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px]";

const channels = [
  site.contact.email ? { label: "Email", href: `mailto:${site.contact.email}` } : null,
  site.contact.linkedin ? { label: "LinkedIn", href: site.contact.linkedin } : null,
  site.contact.github ? { label: "GitHub", href: site.contact.github } : null,
].filter((channel): channel is { label: string; href: string } => channel !== null);

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border px-6 pb-28 pt-20 md:px-12 md:pb-14 xl:px-16">
      <div className="grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6">
          <p className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
            {site.name}
          </p>
          <p className="mt-5 max-w-md text-lg text-text-muted">{site.role}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="text-sm font-medium">Explore</p>
          <ul className="mt-5 space-y-3">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`inline-block text-text-muted hover:text-text ${underline}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {channels.length > 0 ? (
          <div className="md:col-span-3">
            <p className="text-sm font-medium">Contact</p>
            <ul className="mt-5 space-y-3">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`inline-block break-all text-text-muted hover:text-text ${underline}`}
                  >
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-20 flex flex-col gap-4 border-t border-border pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {site.name}. Built with Next.js, TypeScript, and Tailwind CSS.
        </p>
        <a href="#top" className={`inline-block hover:text-text ${underline}`}>
          Back to top
        </a>
      </div>
    </footer>
  );
}
