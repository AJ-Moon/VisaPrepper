import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About VisaPrepper — Preparation Built Around Your Own Visa Application",
  description:
    "VisaPrepper exists because generic visa interview questions don't prepare you for questions about your case. Learn what we believe about visa interview preparation.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      </Container>

      <Container className="py-10 sm:py-14">
        <SectionHeading
          titleAs="h1"
          eyebrow="About VisaPrepper"
          title="Generic questions don't prepare you for questions about your case"
          description="That single idea is why VisaPrepper exists. Question lists are everywhere. What's missing is a way to practice explaining your own application — your program, your funding, your job, your family, your history — clearly and consistently."
        />
      </Container>

      <section className="bg-surface-muted">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-foreground">
            <p>
              VisaPrepper builds realistic AI mock visa interviews around each
              applicant&rsquo;s own circumstances. Instead of memorizing a fixed set
              of questions and answers, you practice explaining your actual
              case — and get specific, evidence-based feedback on what to
              improve before interview day.
            </p>
            <p>
              We built VisaPrepper with South Asian applicants specifically in
              mind — for Pakistan, India, and Bangladesh, preparing for U.S.
              visa interviews across B1/B2, F1, H1B, H4, J1, and family-based
              categories. Visa interviews are stressful enough without
              preparation that feels irrelevant to your situation, so we&rsquo;ve
              tried to make the experience calm, clear, and genuinely useful,
              not intimidating.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <SectionHeading eyebrow="What we believe" title="Preparation should be honest" align="center" />
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> What we believe
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>Your preparation should reflect your own case, not a generic script</li>
              <li>Practice should help you explain truthful answers clearly</li>
              <li>Useful feedback explains why, not just what</li>
              <li>Communication and delivery matter alongside content</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-danger">
              <XCircle className="h-4 w-4" aria-hidden="true" /> What we won&rsquo;t do
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>Promise or predict visa approval</li>
              <li>Write scripts or tell you what to say instead of the truth</li>
              <li>Claim to detect lies, nervousness, or emotions</li>
              <li>Misrepresent unfinished features as available today</li>
            </ul>
          </div>
        </div>
      </Container>

      <CTASection
        title="See it for yourself"
        description="Build a mock interview around your own application and find out what VisaPrepper's feedback actually looks like."
      />
    </>
  );
}
