import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LanguageWelcome } from "@/components/marketing/LanguageWelcome";
import { CTASection } from "@/components/marketing/CTASection";
import { buildPageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "Visa Interview Preparation Languages",
  description: "U.S. visa practice in English, Urdu or Hindi; international interviews in English. Compare interview languages, preparation questions and report explanations.",
  path: "/languages",
});
export default function LanguagesPage() {
  return <>
    <Container className="pt-8"><Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Languages", path: "/languages" }]} /></Container>
    <Container className="py-12 sm:py-16">
      <SectionHeading titleAs="h1" eyebrow="Your language" title="Understand your preparation language options." description="Interview language, preparation questions and report explanations are different features. Choose the option available for your visa route." />
      <div className="mt-10"><LanguageWelcome /></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border bg-surface p-6"><h2 className="font-display text-2xl font-semibold">U.S. visa interviews</h2><p className="mt-3 leading-relaxed text-muted-foreground">Supported U.S. interview categories offer English, Urdu and Hindi practice. U.S. preparation questions are also available in these three languages.</p><Link href="/visa-types" className="mt-4 inline-block text-primary underline">Choose a supported U.S. visa category</Link></section>
        <section className="rounded-2xl border bg-surface p-6"><h2 className="font-display text-2xl font-semibold">International interviews</h2><p className="mt-3 leading-relaxed text-muted-foreground">Supported UK, France, Italy, Germany and Schengen interview practice is in English. International preparation questions are available in English and Urdu; this does not make the interview itself an Urdu rehearsal.</p><Link href="/visa-interview-practice" className="mt-4 inline-block text-primary underline">Explore interview practice</Link></section>
      </div>
      <h2 className="mt-10 font-display text-2xl font-semibold">Explanations and website language</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">The report&apos;s Urdu explanation option is separate from the language you speak during practice. We do not promise a complete Hindi report translation or a fully translated app interface. This website is mainly in English, with short native-language introductions.</p>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Applicants from Pakistan and India can use supported routes. Bengali and Bangladesh support are coming soon. For the real visa process, follow the language instructions on your official appointment notice; practice-language availability does not determine those arrangements.</p>
    </Container>
    <CTASection title="Take the first step in your preparation." description="Start with one free document check and relevant preparation resources. Choose your route in the app." />
  </>;
}
