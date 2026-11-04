import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "How VisaPrepper Interview Practice Works",
  description: "Start with one free document check. Practice an application-based AI video interview, review specific answer feedback and prepare for follow-ups.",
  path: "/how-it-works",
});
const steps = [
  { title: "Start with a free document check", text: "Choose your visa destination and share your application details. Follow your personalised checklist and check for missing or conflicting information. Start document review and complete optional profile details later; required route facts still apply. You can take this step before buying an interview package." },
  { title: "Face the AI interviewer on video", text: "Use your camera and microphone for a complete interview that mimics the real visa interview. The AI asks questions and follow-ups about your own plans, funding, background and form." },
  { title: "Learn from the first attempt", text: "Review which answers need more detail and where information is inconsistent. Get personalised tips and use your remaining interviews to work on those areas. Your first practice is a starting point; you have six interviews total in the paid package." },
];
export default function HowItWorksPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="Getting started" title="One small step. A clearer way to prepare." description="Start with a free document check. When you choose video practice, bring your real details and answer as best you can. You can learn from the difficult questions." />
      <ol className="mt-10 grid gap-5 md:grid-cols-3">{steps.map((step, index) => <li key={step.title} className="rounded-2xl border border-border bg-surface p-6"><span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft font-semibold text-primary">{index + 1}</span><h2 className="mt-5 text-xl font-semibold">{step.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
      <p className="mt-8 max-w-3xl leading-relaxed text-muted-foreground">A <Link href="/document-checks" className="text-primary underline">document check</Link> compares selected records and confirmed facts. An <Link href="/#interview-example" className="text-primary underline">interview feedback example</Link> shows what a spoken answer still needs to explain. Both demonstrations are preparation examples, not visa decisions.</p>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">U.S. practice supports English, Urdu and Hindi. Supported UK, France, Italy, Germany and Schengen interviews are in English, with international preparation questions in English and Urdu. <Link href="/languages" className="text-primary underline">Check the language options</Link> and <Link href="/visa-types" className="text-primary underline">visa categories</Link> before choosing your practice.</p>
      <div className="mx-auto mt-12 max-w-2xl"><FAQAccordion items={[
        { question: "How many interviews can I take?", answer: "The $44 package includes six complete AI video interviews total. You also get ten document checks and 90 days from purchase to use the package." },
        { question: "What equipment do I need?", answer: "Use a device with a microphone and camera, an internet connection, and a quiet place where you can speak clearly." },
        { question: "What if I do not know an answer?", answer: "Answer honestly as best you can. A difficult question shows you what to check before the real interview. Read your feedback, work on the missing details and try again using your remaining interviews. You do not need to learn a script." },
      ]} /></div>
    </Container>
    <CTASection title="Your first step is free." description="Check your documents once and read preparation tips before choosing an interview package." />
  </>;
}
