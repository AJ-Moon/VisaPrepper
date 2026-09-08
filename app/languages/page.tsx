import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LanguageWelcome } from "@/components/marketing/LanguageWelcome";
import { CTASection } from "@/components/marketing/CTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Visa Interview Practice in English & Urdu",
  description: "Prepare for your U.S. visa interview in English or Urdu from Pakistan. Hindi, Bengali, and support for applicants in India and Bangladesh are coming soon.",
  path: "/languages",
});

export default function LanguagesPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Languages", path: "/languages" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="Your language" title="Feel comfortable finding your words." description="Practice your U.S. visa interview in English or Urdu. We currently support applicants in Pakistan, with India and Bangladesh coming soon." />
      <div className="mt-10"><LanguageWelcome /></div>
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">These are interview practice languages. This website is mainly in English, with short introductions in Urdu, Hindi, and Bengali. For your official interview, follow the language instructions given with your appointment.</p>
    </Container>
    <CTASection title="Take the first step in your preparation." description="Start with one free document check and easy preparation tips." />
  </>;
}
