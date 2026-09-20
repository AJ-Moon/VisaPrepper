import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { FeedbackExampleCard } from "@/components/marketing/FeedbackExampleCard";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "What You Get from Visa Interview Practice",
  description: "Find unclear answers and details that do not match. Get a report after every practice interview. Six interviews and ten document checks for $44 USD.",
  path: "/features",
});
export default function FeaturesPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "What you get", path: "/features" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="What you get" title="Know what needs work before interview day." description="Useful preparation means leaving each session with something you can improve." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">{[
        ["A clearer explanation of your plans", "Practice questions about your studies, work, trip, or family. Learn to explain your own situation without relying on someone else’s answers."],
        ["Details that agree", "Find missing or conflicting information in your documents. After a paid interview, see where your spoken answers do not match the details you shared."],
        ["A better way to say it", "See where an answer was too long or unclear, where you paused, and what you left out. Get simple suggestions to help you speak more clearly."],
        ["A focus for your next practice", "Review your strong answers and the areas that still need work. Use your remaining interviews to put those tips into practice."],
      ].map(([title, text]) => <div key={title} className="rounded-2xl border border-border bg-surface p-6"><Check className="h-5 w-5 text-primary" aria-hidden="true" /><h2 className="mt-4 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div>
    </Container>
    <section className="bg-surface-muted"><Container className="grid items-center gap-8 py-12 md:grid-cols-2"><SectionHeading eyebrow="Example feedback" title="Small details can make your answer clearer." description="Your paid interview report shows what you said and what needs more explanation. Build a truthful answer using your own details." /><div className="flex justify-center"><FeedbackExampleCard /></div></Container></section>
    <CTASection title="Six chances to work on your answers." description="One $44 package. Six interviews, ten document checks and 90 days to practise." />
  </>;
}
