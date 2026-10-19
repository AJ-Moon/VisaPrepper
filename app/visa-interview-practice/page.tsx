import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/layout/CtaButton";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { JsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/config/site";
import { PRACTICE_LANGUAGE_ALTERNATES, PRACTICE_MARKETS } from "@/lib/content/practice-markets";

const pageMetadata = buildPageMetadata({
  title: "AI Video Visa Interview Practice Online",
  description: "Practice a full AI visa video interview based on your own form. Get document checks, follow-up questions and answer feedback in English, Urdu or Hindi.",
  path: "/visa-interview-practice",
});
export const metadata = {
  ...pageMetadata,
  alternates: { ...pageMetadata.alternates, languages: PRACTICE_LANGUAGE_ALTERNATES },
};

const topics = [
  ["Nervous or going blank?", "Practice answering on camera, review where you struggled and prepare a clearer explanation for your next attempt.", "/blog/visa-interview-nervous-forget-answer"],
  ["Answers do not match your form?", "Check missing or conflicting details before practicing. For U.S. routes, compare your answers with your own DS-160 information.", "/blog/ds-160-interview-consistency"],
  ["Unsure how to explain your funding?", "Work on explaining your real sponsor, study costs or travel budget in simple words. Keep every amount consistent with your documents.", "/blog/f1-visa-interview-who-will-pay"],
];

export default function VisaInterviewPracticePage() {
  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/visa-interview-practice#service`,
      name: `${SITE_NAME} AI video visa interview practice`,
      serviceType: "Online visa interview preparation",
      url: `${SITE_URL}/visa-interview-practice`,
      description: "Application-based AI video interviews, document consistency checks and personalised practice feedback in English, Urdu and Hindi.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Country", name: "Pakistan" }],
    }} />
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Visa interview practice", path: "/visa-interview-practice" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="VisaPrepper" title="AI video visa interview practice, built around your application." description="A real interview is about your plans. Practice explaining them on camera, answer follow-up questions and leave knowing what to work on." />
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">If you are looking for an online visa mock interview, VisaPrepper offers a complete video conversation using your camera and microphone. Your own form and personal details guide the questions. You get feedback on your answers, confidence and consistency after each paid interview.</p>
      <div className="mt-7 flex flex-wrap gap-4"><CtaButton intent="free" label="Check My Documents Free" size="lg" /><Link href="/pricing" className="self-center font-semibold text-primary underline underline-offset-4">See the interview package</Link></div>
      <p className="mt-4 text-sm text-muted-foreground">One free document check. Complete AI video interviews are included in the paid package.</p>
    </Container>

    <section className="bg-surface-muted"><Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="Work on the difficult parts" title="Find the problem before interview day." />
      <div className="mt-8 grid gap-5 md:grid-cols-3">{topics.map(([title, text, href]) => <article key={title} className="rounded-2xl border bg-surface p-6"><Check className="h-5 w-5 text-primary" aria-hidden="true" /><h2 className="mt-4 text-xl font-semibold">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p><Link href={href} className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">Read the preparation guide</Link></article>)}</div>
    </Container></section>

    <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-2">
      <div><h2 className="font-display text-3xl font-semibold">More than a list of visa interview questions</h2><p className="mt-5 leading-relaxed text-muted-foreground">A question list helps you understand the topics. AI video practice lets you try your actual answers out loud, respond to follow-ups and notice details that are unclear. Start with your document checklist and verification check, then use your interview report to prepare for the next attempt.</p><p className="mt-4 leading-relaxed text-muted-foreground">The one-time $44 package includes six complete AI video interviews, ten document verification checks and 90 days to use them. Free access includes one document check, a personalised checklist, guides and a sample report. A document check can flag missing or inconsistent details; it does not certify a document or submit a visa application.</p><Link href="/how-it-works" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">See how a practice interview works</Link></div>
      <div><h2 className="font-display text-3xl font-semibold">Choose the preparation that fits your case</h2><p className="mt-5 leading-relaxed text-muted-foreground">Practice for student, visitor, work or family routes to the United States, United Kingdom, France, Italy, Germany and Schengen destinations. Interview requirements depend on your own route and appointment. Follow the visa authority&apos;s instructions for the real process.</p><p className="mt-4 leading-relaxed text-muted-foreground">English, Urdu and Hindi practice is available. Current app support covers applicants in India and Pakistan; Bengali and Bangladesh support are coming soon. International readers can use the free English guides and compare preparation methods before choosing a service.</p><Link href="/visa-types" className="mt-5 inline-block font-semibold text-primary underline underline-offset-4">Explore supported visa routes</Link></div>
    </Container>

    <section className="bg-sage-soft"><Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="India and Pakistan" title="Prepare around your own circumstances." />
      <div className="mt-7 grid gap-5 md:grid-cols-2">{PRACTICE_MARKETS.map(market => <Link key={market.slug} href={`/visa-interview-practice/${market.slug}`} className="rounded-2xl border bg-surface p-6 hover:border-primary"><h2 className="text-2xl font-semibold">Visa interview practice in {market.name}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{market.description}</p><span className="mt-5 block font-semibold text-primary">Explore preparation for {market.name} →</span></Link>)}</div>
    </Container></section>

    <Container className="py-12 sm:py-16"><h2 className="font-display text-3xl font-semibold">Choosing a visa interview app</h2><p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">Compare whether a tool uses text, voice or full video, whether it knows your application details, what the feedback covers, and what the free offer includes. Our <Link href="/blog/best-ai-visa-interview-tools" className="text-primary underline">AI visa interview tools comparison</Link> explains VisaPrepper, VisaMind, InterviewIvy and other options using their public product information.</p><div className="mt-8 max-w-3xl"><FAQAccordion items={[
      { question: "Is this a free AI visa mock interview?", answer: "The first document check is free. Complete AI video interviews are part of the $44 package, which includes six interviews total. You can read guides and view a sample report before buying." },
      { question: "Can I practice an F1 or B1/B2 interview?", answer: "Yes. U.S. student and visitor visa practice uses the application details you provide. Other supported routes include work, dependent, exchange and family interviews. Follow your own official appointment instructions." },
      { question: "Does VisaPrepper guarantee approval?", answer: "No. Practice helps you explain your own facts more clearly. Your practice score is feedback, and the visa authority makes the visa decision." },
    ]} /></div></Container>
    <CTASection title="Your first step can be small." description="Check your documents once for free. Choose video practice when you are ready to work on your own answers." />
  </>;
}
