import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaButton } from "@/components/layout/CtaButton";
import { CTASection } from "@/components/marketing/CTASection";
import DocumentSamples from "@/components/marketing/DocumentSamples";
import BundleExplanation from "@/components/marketing/BundleExplanation";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { JsonLd } from "@/lib/seo/json-ld";
import { SITE_URL } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata = buildPageMetadata({
  title: "Visa Application & Document Consistency Checks",
  description: "Compare your application details and supporting documents. Review differences, missing information and next steps. One free bundle check; continue in the app.",
  path: "/document-checks",
});
export default function DocumentChecksPage() {
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "VisaPrepper application and document consistency checks", url: `${SITE_URL}/document-checks`, serviceType: "Visa application preparation", description: "Compare selected application details and supporting evidence on supported routes, with explanations and practical next steps. Not document certification or a visa decision.", provider: { "@id": `${SITE_URL}/#organization` }, areaServed: [ { "@type": "Country", name: "Pakistan" }, { "@type": "Country", name: "India" } ] }} />
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Document checks", path: "/document-checks" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="Before you practice" title="Check how your visa documents fit together." description="A form, a letter and a supporting record can describe the same plan differently. Compare the information in your selected bundle, understand what needs attention and decide what to check next." />
      <div className="mt-7"><CtaButton label="Check my documents" intent="free" size="lg" /></div>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">Continue to the app to sign in or create an account. One document check is free, once only. Your route and current feature access determine which checks are available.</p>
      <h2 className="mt-12 font-display text-2xl font-semibold">What a document check can help you notice</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">{[
        ["Different information", "Compare names, dates, funding statements or other relevant details across the evidence you select. A difference needs explanation; it does not automatically establish that one source is wrong."],
        ["Missing or unclear details", "Identify information the selected evidence does not establish. An incomplete upload is different from proof that your actual application is incomplete."],
        ["A practical next step", "Review the explanation, check the relevant record and confirm or correct your own information. The tool does not choose an unverified version of a fact for you."],
      ].map(([title, text]) => <article key={title} className="rounded-2xl border bg-surface p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
    </Container>
    <DocumentSamples />
    <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-2">
      <section><h2 className="font-display text-2xl font-semibold">What to prepare</h2><ol className="mt-5 list-decimal space-y-4 ps-5 leading-relaxed text-muted-foreground"><li>Choose the actual destination and visa route. Nationality, residence and country of application are separate facts; do not guess the deciding authority.</li><li>Select readable application exports and supporting records relevant to the comparison. Keep original documents unchanged and use the official checklist for your case.</li><li>Review the route-specific scope and consent in the app. Saved facts can help comparisons, but missing or conflicting facts still need confirmation.</li><li>Run the Check when processing is available. Review each finding before making a correction; follow official instructions for submitted forms.</li></ol><p className="mt-5 text-sm leading-relaxed">Start with our <Link href="/blog/us-visa-interview-documents-checklist" className="text-primary underline">U.S. interview document checklist</Link> or <Link href="/blog/ds-160-interview-consistency" className="text-primary underline">DS-160 consistency guide</Link>. These help you organize; they do not replace official requirements.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">A bundle is one check</h2><div className="mt-5"><BundleExplanation /></div><p className="leading-relaxed text-muted-foreground">Application Check accepts supported PDF, JPG and PNG files. Scans may require OCR, which can misread information; unreadable or unverified material may need a clearer upload or explicit confirmation. The app shows applicable limits and scan-language options.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Use the secure application for uploads. Review its consent, retention and deletion information before proceeding. Do not send visa documents through WhatsApp or email. Read our <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">Document review or interview practice?</h2><p className="mt-5 leading-relaxed text-muted-foreground">A document check compares the information in your selected records and relevant confirmed facts. An interview asks you to explain your own plan aloud, then gives feedback on those answers. Neither is a visa decision. See <Link href="/#interview-example" className="text-primary underline">illustrative interview feedback</Link> to understand the difference.</p><p className="mt-4 leading-relaxed text-muted-foreground">For example, a funding statement can differ across documents. Separately, a spoken answer can name a sponsor without explaining the costs and funds available. Fixing the document comparison and practicing the explanation are two different tasks.</p></section>
      <section><h2 className="font-display text-2xl font-semibold">What is included?</h2><p className="mt-5 leading-relaxed text-muted-foreground">Free access includes one document check and relevant preparation resources. It does not include a full AI video interview. The $44 USD one-time package includes six AI video interviews, ten document checks and 90 days from purchase. The free allowance is separate from the paid package.</p><p className="mt-4 leading-relaxed text-muted-foreground">The app handles authentication, route access and package selection. Purchasing is currently unavailable; no payment or account creation takes place on this website. <Link href="/pricing" className="text-primary underline">View the package details</Link>.</p></section>
    </Container>
    <Container className="pb-12 sm:pb-16"><h2 className="font-display text-2xl font-semibold">Scope and limits</h2><p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">Document checks are available for selected routes for applicants from Pakistan and India. The app checks the visa category and relevant application circumstances before admitting a Check. Some legacy single-PDF tools have different restrictions. An example on this website does not mean every document or jurisdiction can be reviewed.</p><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Checks do not authenticate documents, certify translations, decide financial eligibility, submit forms or guarantee acceptance. Continue to use the official checklist and instructions for your own visa category and place of application.</p><div className="mt-8"><FAQAccordion items={[
      { question: "Does every PDF use another check?", answer: "No. One Application Check reviews your selected document bundle together within its upload limits. The older single-document flow is separate." },
      { question: "Is a document check the same as an AI interview?", answer: "No. Document checks compare selected information. Interviews give you spoken practice and feedback on your answers. The free allowance includes one check, not a full AI video interview." },
      { question: "Can a check tell me whether my visa will be approved?", answer: "No. A finding is preparation feedback, not a visa decision or a certification that your documents satisfy all requirements." },
    ]} /></div></Container>
    <CTASection title="Start with the documents you already have." description="Continue to the application to sign in or create an account, choose your route and review the available checks." />
  </>;
}
