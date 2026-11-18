import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="editorial-card group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-marigold-border"
    >
      <div>
        <p className="text-xs font-medium text-muted-foreground">
          {formatDate(post.publishDate)} &middot; {post.readingTimeMinutes} min read
        </p>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
        Read article
        <ArrowRight className="editorial-arrow h-7 w-7 rounded-full bg-marigold-soft p-1.5 text-marigold-ink transition-colors" aria-hidden="true" />
      </span>
    </Link>
  );
}
