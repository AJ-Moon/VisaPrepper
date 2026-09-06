import { cn } from "@/lib/utils/cn";

type BadgeTone = "primary" | "neutral" | "on-charcoal" | "warning" | "teal";

const toneClasses: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  neutral: "bg-surface-muted text-muted-foreground",
  "on-charcoal": "bg-white/10 text-on-charcoal-muted",
  warning: "bg-warning-soft text-warning",
  teal: "bg-teal-soft text-teal",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
