import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

export function FeatureSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  bullets,
  media,
  reverse = false,
  tone = "background",
}: {
  icon?: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  media: React.ReactNode;
  reverse?: boolean;
  tone?: "background" | "muted";
}) {
  return (
    <section className={cn(tone === "muted" && "bg-surface-muted")}>
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div className={cn(reverse && "lg:order-2")}>
          {Icon && (
            <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sage-soft">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </span>
          )}
          <p className="text-sm font-semibold uppercase tracking-wide text-teal">{eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
          {bullets && bullets.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cn("flex justify-center", reverse && "lg:order-1")}>{media}</div>
      </Container>
    </section>
  );
}
