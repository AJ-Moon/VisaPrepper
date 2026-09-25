import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Visa Prepper",
  description: "Visa Prepper offers complete AI video visa interviews, document checks, personalised tips and results in English, Urdu and Hindi.",
  path: "/about",
});
export default function AboutPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="Why we are here" title="A big step in your life deserves good preparation." description="A place to study. A new job. Time with family. Behind every visa application is something that matters." />
      <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>Visa Prepper gives you a place to practice talking about it. Answer questions about your own application, find out what is unclear, and work on it before you sit down for your interview.</p>
        <p>Visa Prepper supports applicants in Pakistan and India, with complete AI video interviews in English, Urdu and Hindi. United States, United Kingdom, France, Italy, Germany and general Schengen routes are available. Bengali and support for applicants in Bangladesh are coming soon.</p>
        <p>Our job is to help you explain your real circumstances clearly. We do not promise visa approval or ask you to memorize made-up answers. Visa Prepper is independent of every embassy and government agency.</p>
      </div>
    </Container>
    <CTASection title="Give yourself time to prepare." description="Your first document check and preparation tips are free." />
  </>;
}
