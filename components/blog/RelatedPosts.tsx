import { BlogCard } from "@/components/blog/BlogCard";
import type { Post } from "@/lib/content/posts";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-teal">Related reading</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
