import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EarthStage } from "@/components/hero-3d/earth-stage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Hero prototype",
  robots: { index: false, follow: false },
};

// A development-only route for evaluating the homepage's 3D scene. It is not
// linked from navigation and does not exist in production builds.
export default function HeroPrototype() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main id="main" tabIndex={-1} className="flex min-h-dvh flex-col justify-center px-4 py-16 md:px-10">
      <div className="grid w-full items-center gap-12 md:grid-cols-2">
        <div>
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            {site.name}
          </h1>
          <p className="mt-4 text-lg text-text-muted">{site.role}</p>
          <p className="mt-8 max-w-prose text-xl leading-relaxed">{site.introduction}</p>
          <p className="mt-6 text-sm text-text-muted">
            Prototype route. Development only. The Earth uses day and night images from
            public/textures/earth; their source is recorded in CREDITS.md and not yet verified.
          </p>
        </div>
        <EarthStage />
      </div>
    </main>
  );
}
