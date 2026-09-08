import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { getAllVisaTypeSlugs, getVisaTypeBySlug } from "@/lib/content/visa-types";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllVisaTypeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const visaType = getVisaTypeBySlug((await params).slug);
  if (!visaType) return {};
  return buildPageMetadata({
    title: `${visaType.code} Visa Interview Practice in Pakistan`,
    description: `Prepare for your U.S. ${visaType.code} visa interview in English or Urdu. Practice answers about your own application and get personal feedback. Packages from $15.`,
    path: `/visa-types/${visaType.slug}`,
  });
}

export default async function VisaTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const visaType = getVisaTypeBySlug((await params).slug);
  if (!visaType) notFound();
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Visa types", path: "/visa-types" }, { name: visaType.code, path: `/visa-types/${visaType.slug}` }]} /></Container>
    <Container className="py-12 sm:py-16">
      <p className="text-sm font-semibold text-primary">Available for Pakistan · English & Urdu</p>
      <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{visaType.h1}</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{visaType.intro}</p>
      <Link href="/#pricing" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">See interview packages from $15 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
    </Container>
    <section className="bg-surface-muted"><Container className="py-12">
      <h2 className="font-display text-2xl font-semibold">Who this is for</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">{visaType.whoItsFor.map((item) => <li key={item} className="flex items-start gap-3 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul>
    </Container></section>
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="Your preparation" title="Get comfortable talking about these topics." description="Your questions will depend on the application details you share. These are practice topics, not a prediction of what your officer will ask." />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">{visaType.topics.map((topic) => <div key={topic.title} className="rounded-2xl border border-border bg-surface p-5"><h3 className="font-semibold">{topic.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.description}</p></div>)}</div>
      <h2 className="mt-12 font-display text-2xl font-semibold">Have these details ready</h2>
      <ul className="mt-5 grid list-disc gap-x-10 gap-y-3 ps-5 text-sm text-muted-foreground sm:grid-cols-2">{visaType.informationUsed.map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="mt-12"><FAQAccordion items={visaType.faqs} /></div>
    </Container>
    <CTASection title={`Feel more prepared for your ${visaType.code} interview.`} description="Start with one free document check. Paid interviews include personal feedback and tips based on your answers." />
  </>;
}
