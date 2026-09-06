import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LanguageChip } from "@/components/marketing/LanguageChip";
import { CTASection } from "@/components/marketing/CTASection";
import { LOCALES } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "VisaPrepper Languages — English Today, Urdu, Hindi & Bengali Coming Soon",
  description:
    "VisaPrepper is available in English today, with Urdu, Hindi, and Bengali support in progress — built for applicants across Pakistan, India, and Bangladesh.",
  path: "/languages",
});

const LANGUAGE_NOTES: Record<string, string> = {
  en: "VisaPrepper's mock interviews, feedback, and full website are available in English today.",
  ur: "Urdu-language mock interviews and interface support are in progress. We'll clearly mark this page as live once it's actually available — not before.",
  hi: "Hindi-language mock interviews and interface support are in progress. We'll clearly mark this page as live once it's actually available — not before.",
  bn: "Bengali-language mock interviews and interface support are in progress. We'll clearly mark this page as live once it's actually available — not before.",
};

export default function LanguagesPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Languages", path: "/languages" }]} />
      </Container>

      <Container className="py-10 sm:py-14">
        <SectionHeading
          titleAs="h1"
          align="center"
          eyebrow="Languages"
          title="Built for multilingual preparation across South Asia"
          description="VisaPrepper is designed with applicants from Pakistan, India, and Bangladesh in mind. Here's exactly what's available today, and what's still in progress — we don't label anything as live until it actually is."
        />
      </Container>

      <Container className="pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-2xl gap-4">
          {LOCALES.map((locale) => (
            <div
              key={locale.code}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <LanguageChip locale={locale} />
              </div>
              <p className="text-sm text-muted-foreground sm:max-w-sm sm:text-end">
                {LANGUAGE_NOTES[locale.code]}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <CTASection
        title="Start practicing in English today"
        description="Build your mock interview now — additional languages will be available here as soon as they're genuinely ready."
      />
    </>
  );
}
