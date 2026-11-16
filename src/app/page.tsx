import { EarthStage } from "@/components/hero-3d/earth-stage";
import { SpotlightSection } from "@/components/ui/spotlight-section";
import { SpaceBackdrop } from "@/components/ui/space-backdrop";
import { ButtonLink } from "@/components/ui/button-link";
import { Section } from "@/components/ui/section";
import { AboutPreview } from "@/components/content/about-preview";
import { ContactInvitation } from "@/components/content/contact-invitation";
import { ExperimentPreview } from "@/components/content/experiment-preview";
import { ProjectsPreview } from "@/components/content/projects-preview";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <SpotlightSection id="top" ariaLabelledBy="intro-title" className="border-b border-border">
        <SpaceBackdrop />
        <div className="spotlight-content grid w-full items-center gap-12 px-6 pb-20 pt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12 md:px-12 md:pb-28 md:pt-28 xl:px-16">
          <div>
            <h1
              id="intro-title"
              className="settle-in font-display text-[clamp(3.25rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
            >
              {site.name}
            </h1>
            <p className="settle-in-delayed mt-4 text-lg text-text-muted md:text-xl">
              {site.role}
            </p>
            <p className="settle-in-delayed mt-10 max-w-xl text-xl leading-relaxed md:text-2xl">
              {site.introduction}
            </p>
            <p className="settle-in-delayed mt-5 max-w-prose text-text-muted">
              {site.focus}
            </p>
            <div className="settle-in-delayed mt-12 flex flex-wrap gap-4">
              <ButtonLink href="/about" variant="primary">
                Read about my work
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                Browse projects
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <EarthStage />
          </div>
        </div>
      </SpotlightSection>

      <Section id="about" title="About">
        <AboutPreview />
      </Section>

      <Section id="projects" title="Selected projects">
        <ProjectsPreview />
      </Section>

      <Section id="lab" title="Engineering lab">
        <ExperimentPreview />
      </Section>

      <Section id="contact" title="Contact">
        <ContactInvitation />
      </Section>
    </main>
  );
}
