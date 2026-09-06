import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/content/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Visa Interview Prep Blog — Guides for F1, B1/B2, H1B, H4, J1 & Family Visas",
  description:
    "Practical, up-to-date guides on U.S. visa interview preparation — DS-160 consistency, document checklists, 214(b) refusals, and country-specific guidance for Pakistan, India, and Bangladesh.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      </Container>

      <Container className="py-10 sm:py-14">
        <SectionHeading
          titleAs="h1"
          eyebrow="Blog"
          title="Visa interview preparation guides"
          description="Practical guides on U.S. visa interviews — grounded in official sources where rules and procedures are discussed, and written to help you understand your own case, not memorize a script."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </>
  );
}
