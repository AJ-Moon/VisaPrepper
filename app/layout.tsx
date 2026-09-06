import type { Metadata } from "next";
import { figtree, fraunces } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd, buildOrganizationJsonLd, buildSoftwareApplicationJsonLd } from "@/lib/seo/json-ld";
import { SITE_URL } from "@/lib/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VisaPrepper — Practice Your Real Visa Interview, Not Generic Questions",
    template: "%s | VisaPrepper",
  },
  description:
    "VisaPrepper builds realistic AI mock visa interviews around your own application and circumstances, with adaptive follow-up questions and detailed feedback — for B1/B2, F1, H1B, H4, J1 and family visa applicants.",
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildSoftwareApplicationJsonLd()} />
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
      </body>
    </html>
  );
}
