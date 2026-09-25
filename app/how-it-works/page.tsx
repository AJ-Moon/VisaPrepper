import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "How the AI Video Visa Interview Works",
  description: "Check your form, join a complete AI video visa interview based on your personal details, and get personalised tips, results and confidence scores.",
  path: "/how-it-works",
});
const steps = [
  { title: "Check your form and documents", text: "Choose your visa destination and share your application details. Follow your personalised document checklist, then check for missing, incorrect or conflicting information. Your first document check is free." },
  { title: "Face the AI interviewer on video", text: "Use your camera and microphone for a complete interview that mimics the real visa interview. The AI asks questions and follow-ups about your own plans, funding, background and form." },
  { title: "Know exactly what to improve", text: "See results and scores for your answers, confidence and consistency. Get personalised practice tips, then use your remaining interviews to work on those areas." },
];
export default function HowItWorksPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "How it works", path: "/how-it-works" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="Getting started" title="A complete AI video interview in three simple steps." description="You do not need perfect English or memorized answers. Bring your real details, a camera and a little time to practise." />
      <ol className="mt-10 grid gap-5 md:grid-cols-3">{steps.map((step, index) => <li key={step.title} className="rounded-2xl border border-border bg-surface p-6"><span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft font-semibold text-primary">{index + 1}</span><h2 className="mt-5 text-xl font-semibold">{step.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
      <div className="mx-auto mt-12 max-w-2xl"><FAQAccordion items={[
        { question: "How many interviews can I take?", answer: "The $44 package includes six complete AI video interviews total. You also get ten document verification checks and 90 days from purchase to use the package." },
        { question: "What equipment do I need?", answer: "Use a device with a microphone and camera, an internet connection, and a quiet place where you can speak clearly." },
        { question: "What if I do not know an answer?", answer: "Answer honestly as best you can. The feedback will help you see what to check or explain more clearly. You do not need to learn a script." },
      ]} /></div>
    </Container>
    <CTASection title="Your first step is free." description="Check your documents once and read preparation tips before choosing an interview package." />
  </>;
}
