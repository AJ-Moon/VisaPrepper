import { ChevronDown } from "lucide-react";
import { JsonLd, buildFaqJsonLd, type FaqEntry } from "@/lib/seo/json-ld";

export function FAQAccordion({ items }: { items: FaqEntry[] }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      <JsonLd data={buildFaqJsonLd(items)} />
      {items.map((item) => (
        <details key={item.question} className="faq-item group px-5 py-4 sm:px-6 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start text-sm font-semibold text-foreground sm:text-base">
            {item.question}
            <ChevronDown
              className="faq-indicator h-6 w-6 shrink-0 rounded-full p-1 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
