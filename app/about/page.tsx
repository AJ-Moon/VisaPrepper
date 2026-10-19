import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About the AI Visa Interview Practice App",
  description: "Meet VisaPrepper (Visa Prepper): AI video visa interview practice, document checks and feedback for India and Pakistan in English, Urdu and Hindi.",
  path: "/about",
});
export default function AboutPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="About VisaPrepper" title="VisaPrepper: practice today, travel tomorrow." description="A place to study. A new job. Time with family. Behind every visa application is something that matters." />
      <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>VisaPrepper, also written Visa Prepper, is an AI visa interview preparation app. Practice a full video interview based on your own application, check your forms for missing or conflicting details, and receive a report with personalised tips. You can find the official website at <Link href="/" className="text-primary underline">visaprepper.com</Link> and use the web app at <a href="https://app.visaprepper.com" className="text-primary underline">app.visaprepper.com</a>.</p>
        <p>Visa Prepper supports applicants in Pakistan and India, with complete AI video interviews in English, Urdu and Hindi. United States, United Kingdom, France, Italy, Germany and general Schengen routes are available. Bengali and support for applicants in Bangladesh are coming soon.</p>
        <p>Our job is to help you explain your real circumstances clearly. We do not promise visa approval or ask you to memorize made-up answers. Visa Prepper is independent of every embassy and government agency.</p>
        <p>Start with one free document check or choose a paid package of six complete AI video interviews. See <Link href="/pricing" className="text-primary underline">current pricing</Link>, read the <Link href="/visa-interview-practice" className="text-primary underline">practice guide</Link>, or choose preparation for <Link href="/visa-interview-practice/india" className="text-primary underline">India</Link> or <Link href="/visa-interview-practice/pakistan" className="text-primary underline">Pakistan</Link>. Our social profiles use @visaprepper.</p>
      </div>
    </Container>
    <CTASection title="Give yourself time to prepare." description="Your first document check and preparation tips are free." />
  </>;
}
