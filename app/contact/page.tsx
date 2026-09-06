import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT_EMAIL } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact VisaPrepper",
  description: "Get in touch with the VisaPrepper team with questions about the platform, your account, or press inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      </Container>

      <Container className="py-14 sm:py-20">
        <SectionHeading
          titleAs="h1"
          eyebrow="Contact"
          title="Get in touch"
          description="Questions about VisaPrepper, your account, or how a mock interview works? Send us a message and we'll get back to you."
        />

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-surface p-6">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage-soft">
            <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
          </span>
          <p className="mt-4 text-sm font-semibold text-foreground">Email us</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-1 block text-lg font-medium text-teal hover:text-primary-hover">
            {CONTACT_EMAIL}
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            For account or billing questions, please include the email
            address associated with your VisaPrepper account so we can help
            faster.
          </p>
        </div>
      </Container>
    </>
  );
}
