import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, FileText } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { AdaptiveFollowUpFlow } from "@/components/marketing/AdaptiveFollowUpFlow";
import { FeedbackExampleCard } from "@/components/marketing/FeedbackExampleCard";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { getAllVisaTypeSlugs, getVisaTypeBySlug } from "@/lib/content/visa-types";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllVisaTypeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const visaType = getVisaTypeBySlug(slug);
  if (!visaType) return {};

  return buildPageMetadata({
    title: visaType.metaTitle,
    description: visaType.metaDescription,
    path: `/visa-types/${visaType.slug}`,
  });
}

export default async function VisaTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const visaType = getVisaTypeBySlug(slug);
  if (!visaType) notFound();

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          entries={[
            { name: "Home", path: "/" },
            { name: "Visa Types", path: "/visa-types" },
            { name: visaType.code, path: `/visa-types/${visaType.slug}` },
          ]}
        />
      </Container>

      <section>
        <Container className="py-10 sm:py-14">
          <span className="inline-flex items-center rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-primary">
            {visaType.code} &middot; {visaType.name}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {visaType.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {visaType.intro}
          </p>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Who this is for</h2>
            <ul className="mt-4 space-y-3">
              {visaType.whoItsFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              What information VisaPrepper uses
            </h2>
            <ul className="mt-4 space-y-3">
              {visaType.informationUsed.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-14 sm:py-16">
          <SectionHeading
            eyebrow="What the interview may cover"
            title={`Topics your ${visaType.code} mock interview may explore`}
            description={`VisaPrepper doesn't know the exact questions your officer will ask — no one can. Instead, it builds realistic, adaptive questions around the topics that typically matter for ${visaType.code} applicants like you.`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {visaType.topics.map((topic) => (
              <div key={topic.title} className="rounded-2xl border border-border bg-surface p-5">
                <p className="font-semibold text-foreground">{topic.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">
              How adaptive mock interviews work
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              A conversation built around your answers
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              VisaPrepper asks a question, listens to your answer, and follows up when
              something is unclear or incomplete — the same way a real interview
              unfolds. When your answer is clear, it moves on to the next relevant
              topic.
            </p>
          </div>
          <div className="flex justify-center">
            <AdaptiveFollowUpFlow />
          </div>
        </Container>
      </section>

      <section>
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center lg:order-2">
            <FeedbackExampleCard />
          </div>
          <div className="lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal">How feedback helps</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
              See exactly what to improve, not just a score
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              After your mock interview, VisaPrepper shows you what you answered
              well, what was incomplete, and any inconsistencies worth
              addressing — plus feedback on your pace, pauses, and delivery.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-14 sm:py-16">
          <SectionHeading eyebrow="FAQ" title={`${visaType.code} interview FAQs`} />
          <div className="mx-auto mt-10 max-w-2xl">
            <FAQAccordion items={visaType.faqs} />
          </div>
        </Container>
      </section>

      <CTASection
        title={`Ready to practice your ${visaType.code} interview?`}
        description="Build a mock interview around your own application and find out what to improve before interview day."
      />
    </>
  );
}
