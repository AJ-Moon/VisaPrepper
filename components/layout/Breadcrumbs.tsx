import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, buildBreadcrumbJsonLd, type BreadcrumbEntry } from "@/lib/seo/json-ld";

export function Breadcrumbs({ entries }: { entries: BreadcrumbEntry[] }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(entries)} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {entries.map((entry, index) => {
            const isLast = index === entries.length - 1;
            return (
              <li key={entry.path} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {entry.name}
                  </span>
                ) : (
                  <Link href={entry.path} className="transition-colors hover:text-foreground">
                    {entry.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
