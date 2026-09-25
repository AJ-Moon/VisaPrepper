import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  titleClassName,
  titleAs: TitleTag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  titleClassName?: string;
  titleAs?: "h2" | "h1";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal">{eyebrow}</p>
      )}
      <TitleTag className={cn("font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl", titleClassName)}>
        {title}
      </TitleTag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
