import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisaTypeCard } from "@/components/marketing/VisaTypeCard";
import { CTASection } from "@/components/marketing/CTASection";
import { VISA_TYPES } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "U.S. Visa Types — Practice Interviews for B1/B2, F1, H1B, H4, J1 & Family Visas",
  description:
    "Explore adaptive AI mock interview practice for every major U.S. visa type VisaPrepper supports: B1/B2, F1, H1B, H4, J1, and family-based immigrant visas.",
  path: "/visa-types",
});

export default function VisaTypesIndexPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Visa Types", path: "/visa-types" }]} />
      </Container>

      <Container className="py-10 sm:py-14">
        <SectionHeading
          titleAs="h1"
          eyebrow="Visa types"
          title="Practice for your U.S. visa interview"
          description="Each visa type has its own topics, documents, and common lines of questioning. Choose yours to see how VisaPrepper adapts to it."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VISA_TYPES.map((visaType) => (
            <VisaTypeCard key={visaType.slug} visaType={visaType} />
          ))}
        </div>
      </Container>

      <CTASection
        title="Not sure where to start? Tell us about your case."
        description="Share your visa type and circumstances, and VisaPrepper builds your first mock interview around them."
      />
    </>
  );
}
