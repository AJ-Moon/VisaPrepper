import { cn } from "@/lib/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M9 16.5L13.5 21L23 10"
        stroke="#FBF7F1"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  onCharcoal = false,
}: {
  className?: string;
  onCharcoal?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-sans text-lg font-semibold tracking-tight",
          onCharcoal ? "text-on-charcoal" : "text-foreground"
        )}
      >
        Visa<span className="text-primary">Prepper</span>
      </span>
    </span>
  );
}
