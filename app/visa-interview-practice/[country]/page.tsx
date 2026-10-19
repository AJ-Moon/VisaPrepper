import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Video } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaButton } from "@/components/layout/CtaButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { COMPLETE_OFFER } from "@/lib/config/offer";
import { SITE_NAME, SITE_URL } from "@/lib/config/site";
import { NATIVE_SCRIPT_BY_LOCALE } from "@/lib/fonts";
import {
  PRACTICE_MARKETS,
  PRACTICE_LANGUAGE_ALTERNATES,
  getPracticeMarket,
} from "@/lib/content/practice-markets";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ country: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRACTICE_MARKETS.map((market) => ({ country: market.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = getPracticeMarket((await params).country);
  if (!market) notFound();

  return {
    ...buildPageMetadata({
      title: market.title,
      description: market.description,
      path: market.href,
    }),
    alternates: {
      canonical: `${SITE_URL}${market.href}`,
      languages: PRACTICE_LANGUAGE_ALTERNATES,
    },
  };
}

export default async function CountryPracticePage({ params }: Props) {
  const market = getPracticeMarket((await params).country);
  if (!market) notFound();

  return <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}${market.href}#service`,
      name: `${SITE_NAME} AI video visa interview practice in ${market.name}`,
      serviceType: "AI video visa interview preparation",
      description: market.description,
      url: `${SITE_URL}${market.href}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: market.name },
    }} />
    <Container className="pt-8">
      <Breadcrumbs entries={[
        { name: "Home", path: "/" },
        { name: "Visa interview practice", path: "/visa-interview-practice" },
        { name: market.name, path: market.href },
      ]} />
    </Container>

    <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold text-primary">{SITE_NAME} · {market.languages} available</p>
        <h1 className="mt-4 max-w-3xl font-sans text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{market.h1}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{market.intro}</p>
        <p lang={market.nativeLang} dir={market.nativeLang === "ur" ? "rtl" : "ltr"} className={`mt-5 max-w-xl text-lg leading-loose text-primary ${NATIVE_SCRIPT_BY_LOCALE[market.nativeLang].className}`}>{market.nativeIntro}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <CtaButton intent="free" label="Check My Documents Free" size="lg" />
          <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">See how it works <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
      <aside className="rounded-3xl border border-border bg-surface-muted p-6 sm:p-8">
        <Video className="h-8 w-8 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold">Bring your own details.</h2>
        <ul className="mt-5 space-y-4">{market.checklist.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Use a camera, microphone and a quiet place. Get follow-up questions and personal feedback.</p>
      </aside>
    </Container>

    <section className="bg-surface-muted">
      <Container className="py-12 sm:py-16">
        <SectionHeading eyebrow={`Your preparation in ${market.name}`} title={market.examplesHeading} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">{market.examples.map((example) => <article key={example.title} className="rounded-2xl border border-border bg-surface p-6"><h3 className="text-lg font-semibold">{example.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{example.description}</p></article>)}</div>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <SectionHeading title="Start free. Choose video practice when you are ready." />
      <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>Free access includes one document verification check, a personalised checklist, guides and a sample report. Live AI video interviews are paid.</p>
        <p>One ${COMPLETE_OFFER.price} USD payment includes {COMPLETE_OFFER.interviews} complete AI video interviews and {COMPLETE_OFFER.checks} document checks, valid for {COMPLETE_OFFER.validityDays} days. Get answer, confidence and consistency feedback plus tips after each attempt. <Link href="/pricing" className="font-semibold text-primary underline underline-offset-4">See the full package.</Link></p>
        <p>Prepare for supported U.S., UK, France, Italy, Germany and Schengen routes. The web app is live; Google Play and Apple App Store apps are coming soon.</p>
        <p className="text-sm">Document checks flag missing or conflicting details; they do not certify documents. Practice cannot guarantee visa approval. Follow your visa authority&apos;s current instructions.</p>
      </div>

      <h2 className="mt-12 text-2xl font-semibold">Useful guides for your next step</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">{market.guideLinks.map((guide) => <li key={guide.href}><Link href={guide.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">{guide.label}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></li>)}</ul>

      <h2 className="mb-5 mt-12 text-2xl font-semibold">Before you start</h2>
      <FAQAccordion items={market.faqs} />
      <Link href="/visa-interview-practice" className="mt-6 inline-block text-sm font-semibold text-primary underline underline-offset-4">Explore all visa interview practice options</Link>
    </Container>
    <CTASection title="Let the first mistake happen in practice." description="Check your documents, face the AI interviewer and find one clear thing to improve before your next attempt." />
  </>;
}
