import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileCheck2, MessageCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationGrid } from "@/components/marketing/DestinationGrid";
import { LanguageWelcome } from "@/components/marketing/LanguageWelcome";
import { Pricing } from "@/components/marketing/Pricing";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { HOMEPAGE_FAQ } from "@/lib/content/faq";
import { VISA_TYPES } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, buildSoftwareApplicationJsonLd, buildWebsiteJsonLd } from "@/lib/seo/json-ld";
import { notoUrdu } from "@/lib/fonts";

const title = "Visa Interview Preparation in Pakistan | VisaPrepper";
export const metadata: Metadata = {
  ...buildPageMetadata({ title, description: "Prepare for your U.S. visa interview in English or Urdu. Start with one free document check. Interview practice packages from $15, paid once.", path: "/" }),
  title: { absolute: title },
};

export default function Home() {
  return (
    <>
      <JsonLd data={buildSoftwareApplicationJsonLd()} />
      <JsonLd data={buildWebsiteJsonLd()} />
      <section className="bg-gradient-to-b from-sage-soft/60 to-background">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="mb-5 text-sm font-semibold text-primary">U.S. visa interview preparation · Pakistan</p>
            <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Walk into your visa interview <span className="text-primary">better prepared.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Know how to explain your plans, your money, and your story. Practice questions about your own application and find out what to improve before the big day.</p>
            <p lang="ur" dir="rtl" className={`mt-5 max-w-xl text-start text-lg leading-loose text-primary ${notoUrdu.className}`}>ویزا انٹرویو کی تیاری، اب اردو میں بھی۔</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CtaButton label="Check my documents free" size="lg" />
              <LinkButton href="#pricing" variant="secondary" size="lg">See interview packages <ArrowRight className="h-4 w-4" aria-hidden="true" /></LinkButton>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">One free document check + preparation tips. Interviews from $15.</p>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-xl shadow-primary/5 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-5"><p className="text-sm font-semibold">A little practice. A clearer answer.</p><span className="rounded-full bg-sage-soft px-3 py-1 text-xs text-primary">Example</span></div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">You may be asked</p>
            <p className="mt-3 font-display text-2xl leading-snug">“Who will pay for your studies?”</p>
            <div className="mt-6 rounded-2xl bg-surface-muted p-5"><p className="text-xs font-semibold text-muted-foreground">YOUR FIRST ANSWER</p><p className="mt-2">“My father will pay.”</p></div>
            <div className="mt-3 rounded-2xl bg-sage-soft p-5"><p className="flex items-center gap-2 text-xs font-semibold text-primary"><Sparkles className="h-4 w-4" aria-hidden="true" /> MAKE IT CLEARER</p><p className="mt-2 text-sm leading-relaxed">Explain what your father does and how he will cover your fees and living costs. Use the details that are true for you.</p></div>
            <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />Know what to work on, before it matters.</p>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface">
        <Container className="grid gap-8 py-10 md:grid-cols-3">
          {[
            { icon: FileCheck2, title: "Catch details that don’t match", text: "Check your documents for missing or conflicting information before you practice." },
            { icon: MessageCircle, title: "Put your answers into words", text: "Talk through your own plans, so interview day is not your first time saying them out loud." },
            { icon: Sparkles, title: "Leave with a clear next step", text: "After each paid interview, see what you did well and what needs more practice." },
          ].map(({ icon: Icon, title, text }) => <div key={title}><Icon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" /><h2 className="text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}
        </Container>
      </section>

      <section id="pricing" className="scroll-mt-24">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Simple prices" title="Start free. Choose the practice you need." description="One payment for your package. No monthly subscription." />
          <div className="mt-9"><Pricing /></div>
        </Container>
      </section>

      <section id="destinations" className="bg-surface-muted scroll-mt-24">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Where are you going?" title="Your next chapter starts with preparation." description="U.S. visa interviews are available now. Preparation for the UK, France, Italy, Germany, and Schengen visas is coming soon." />
          <div className="mt-8"><DestinationGrid /></div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm"><p className="font-semibold">U.S. visas:</p>{VISA_TYPES.map((visa) => <Link key={visa.slug} href={`/visa-types/${visa.slug}`} className="rounded-full border border-border bg-surface px-4 py-2 transition-colors hover:border-primary">{visa.shortLabel} <span className="text-muted-foreground">· {visa.code}</span></Link>)}</div>
        </Container>
      </section>

      <section id="languages">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="Closer to home" title="Prepare in words you feel comfortable with." description="For applicants in Pakistan, in English or Urdu. India and Bangladesh are coming soon, along with Hindi and Bengali." />
          <div className="mt-8"><LanguageWelcome /></div>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container className="py-12">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="font-display text-2xl font-semibold">A useful place to start, at no cost.</h2><p className="mt-2 text-muted-foreground">Simple guides for your application, documents, and interview.</p></div><LinkButton href="/blog" variant="secondary">Read free tips <ArrowRight className="h-4 w-4" aria-hidden="true" /></LinkButton></div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{[
            ["us-visa-interview-questions-pakistan", "U.S. interview questions for Pakistan"],
            ["us-visa-interview-documents-checklist", "Your visa document checklist"],
            ["f1-visa-interview-questions-and-answers", "Preparing for a student visa interview"],
          ].map(([slug, label]) => <Link className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 text-sm font-medium hover:border-primary" key={slug} href={`/blog/${slug}`}>{label}<ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /></Link>)}</div>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24">
        <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_1.5fr]"><SectionHeading eyebrow="Before you begin" title="A few things to know." /><FAQAccordion items={HOMEPAGE_FAQ} /></Container>
      </section>
    </>
  );
}
