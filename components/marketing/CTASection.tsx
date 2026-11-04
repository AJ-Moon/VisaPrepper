import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { LinkButton } from "@/components/ui/Button";
import { CTA_SECONDARY_LABEL } from "@/lib/config/site";

export function CTASection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="bg-primary">
      <Container className="flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
          {description}
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <CtaButton intent="free" label="Check my documents free" size="lg" className="bg-primary-foreground text-primary hover:bg-white" />
          <LinkButton
            href="/#pricing"
            variant="outline"
            size="lg"
            className="border-primary-foreground/40 text-primary-foreground hover:bg-white/10"
          >
            {CTA_SECONDARY_LABEL}
          </LinkButton>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/85">Continue to the app to sign in or create an account. One document check is free; video interviews are part of the $44 one-time package.</p>
      </Container>
    </section>
  );
}
