import type { Post } from "@/lib/content/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function BlogPostHeader({ post }: { post: Post }) {
  return (
    <header>
      <h1 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <span>
          By <span className="font-medium text-foreground">{post.author}</span>
          {post.authorRole ? `, ${post.authorRole}` : ""}
        </span>
        <span aria-hidden="true">&middot;</span>
        <span>Published {formatDate(post.publishDate)}</span>
        {post.updatedDate && (
          <>
            <span aria-hidden="true">&middot;</span>
            <span>Updated {formatDate(post.updatedDate)}</span>
          </>
        )}
        <span aria-hidden="true">&middot;</span>
        <span>{post.readingTimeMinutes} min read</span>
      </div>
    </header>
  );
}
