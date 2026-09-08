import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VisaTypeCard } from "@/components/marketing/VisaTypeCard";
import { DestinationGrid } from "@/components/marketing/DestinationGrid";
import { CTASection } from "@/components/marketing/CTASection";
import { VISA_TYPES } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Visa Interview Destinations — U.S. Now, UK & Schengen Soon",
  description:
    "U.S. visa interview preparation is available for Pakistan. UK, France, Italy, Germany, and Schengen preparation is coming soon. Explore supported U.S. visa types.",
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
          eyebrow="Destinations"
          title="Where will your next chapter take you?"
          description="Prepare for a U.S. visa interview today, from Pakistan. More destinations are on the way."
        />
        <div className="mt-8"><DestinationGrid /></div>
        <h2 className="mt-12 font-display text-2xl font-semibold">Choose your U.S. visa type</h2>
        <p className="mt-3 text-muted-foreground">Available in English and Urdu. Select a visa to see the topics you can practice.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VISA_TYPES.map((visaType) => (
            <VisaTypeCard key={visaType.slug} visaType={visaType} />
          ))}
        </div>
      </Container>

      <CTASection
        title="Start with the details in your application."
        description="Your first document check is free. Choose an interview package when you are ready to practice."
      />
    </>
  );
}
