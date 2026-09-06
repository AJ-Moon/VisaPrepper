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
      className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/40 hover:bg-surface-muted"
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
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
