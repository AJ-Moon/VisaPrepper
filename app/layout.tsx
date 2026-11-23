import type { Metadata } from "next";
import { figtree, fraunces } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import WhatsAppHelp from "@/components/layout/WhatsAppHelp";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { JsonLd, buildOrganizationJsonLd } from "@/lib/seo/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI Video Visa Interview Practice`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "AI-powered U.S. visa interview practice and document checking for applicants worldwide on supported routes. UK and European options have country-specific eligibility.",
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
  // Each page declares its own canonical via buildPageMetadata. No root
  // canonical, so error pages do not inherit the homepage canonical.
  robots: {
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={buildOrganizationJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppHelp />
        <MetaPixel />
      </body>
    </html>
  );
}
