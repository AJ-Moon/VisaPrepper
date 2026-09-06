"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { TocItem } from "@/lib/content/posts";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "ps-3" : undefined}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block transition-colors",
                activeId === item.id ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
