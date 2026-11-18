import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { VisaTypeSummary } from "@/lib/config/site";

export function VisaTypeCard({ visaType }: { visaType: VisaTypeSummary }) {
  return (
    <Link
      href={`/visa-types/${visaType.slug}`}
      className="editorial-card group flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-marigold-border"
    >
      <div>
        <span className="inline-flex items-center rounded-full bg-marigold-soft px-3 py-1 text-xs font-semibold text-primary">
          {visaType.code}
        </span>
        <p className="mt-3 font-display text-lg font-semibold text-foreground">
          {visaType.name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{visaType.shortLabel}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
        Practice for {visaType.code}
        <ArrowRight className="editorial-arrow h-7 w-7 rounded-full bg-marigold-soft p-1.5 text-marigold-ink transition-colors" aria-hidden="true" />
      </span>
    </Link>
  );
}
