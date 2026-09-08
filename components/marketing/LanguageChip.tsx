import { NATIVE_SCRIPT_BY_LOCALE } from "@/lib/fonts";
import type { Locale } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";

export function LanguageChip({
  locale,
  size = "md",
  onCharcoal = false,
}: {
  locale: Locale;
  size?: "sm" | "md";
  onCharcoal?: boolean;
}) {
  const script = NATIVE_SCRIPT_BY_LOCALE[locale.code];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border",
        onCharcoal ? "border-border-on-charcoal" : "border-border bg-surface",
        size === "md" ? "px-4 py-2" : "px-3 py-1.5"
      )}
    >
      <span
        lang={locale.code}
        dir={script?.dir}
        className={cn(
          size === "md" ? "text-sm" : "text-xs",
          "font-medium",
          onCharcoal ? "text-on-charcoal" : "text-foreground",
          script?.className
        )}
      >
        {locale.nativeLabel}
      </span>
      {locale.status === "coming-soon" ? (
        <Badge tone={onCharcoal ? "on-charcoal" : "neutral"}>Coming soon</Badge>
      ) : (
        <Badge tone="primary">Available</Badge>
      )}
    </span>
  );
}
