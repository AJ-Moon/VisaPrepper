import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { FeedbackExampleCard } from "@/components/marketing/FeedbackExampleCard";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Video Visa Interview Features",
  description: "Get a document checklist, form verification, personalised tips, complete AI video interviews, and scores for answer and confidence problems.",
  path: "/features",
});
export default function FeaturesPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "What you get", path: "/features" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="What you get" title="Everything you need to prepare for the real interview." description="From checking your forms to facing the AI interviewer on camera, every step shows you what to improve." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">{[
        ["Personalised document checklist", "See the documents you should prepare for your visa route and personal situation."],
        ["Document verification check", "Check whether your form is filled correctly and find missing, unclear or conflicting information."],
        ["Complete AI video interview", "Use your camera and microphone in a realistic interview based on your own form, documents and personal details."],
        ["Personalised practice tips", "Get simple advice based on the answers, pauses and weak areas found during your interview."],
        ["Results and scores", "See answer problems, confidence problems, missing details and inconsistencies so you know what to improve next."],
      ].map(([title, text]) => <div key={title} className="rounded-2xl border border-border bg-surface p-6"><Check className="h-5 w-5 text-primary" aria-hidden="true" /><h2 className="mt-4 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div>
    </Container>
    <section className="bg-surface-muted"><Container className="grid items-center gap-8 py-12 md:grid-cols-2"><SectionHeading eyebrow="Your results" title="Small details can make your answer clearer." description="Your report scores your answers, confidence and consistency. It shows what needs more explanation so you can improve using your own truthful details." /><div className="flex justify-center"><FeedbackExampleCard /></div></Container></section>
    <CTASection title="Six chances to work on your answers." description="One $44 package. Six interviews, ten document checks and 90 days to practice." />
  </>;
}
