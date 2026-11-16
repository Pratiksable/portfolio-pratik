import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { MobileNav, SiteHeaderNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/content/site";
import { themeBootScript } from "@/components/theme/theme";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: "%s | " + site.name,
  },
  description: site.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-text-inverse"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-sm">
          <Suspense fallback={null}>
            <SiteHeaderNav />
          </Suspense>
        </header>
        {children}
        <Suspense fallback={null}>
          <MobileNav />
        </Suspense>
        <SiteFooter />
      </body>
    </html>
  );
}
