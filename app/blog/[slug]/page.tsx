import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { mdxComponents } from "@/components/blog/mdx-components";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { JsonLd, buildArticleJsonLd } from "@/lib/seo/json-ld";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/content/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const metadata = buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate ?? post.publishDate,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.tags);
  const comingSoon = post.market === "india" || post.market === "bangladesh";

  return (
    <>
      <JsonLd
        data={buildArticleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          publishDate: post.publishDate,
          updatedDate: post.updatedDate,
          author: post.author,
        })}
      />

      <Container className="pt-8">
        <Breadcrumbs
          entries={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
      </Container>

      <Container className="py-8 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <article>
            <BlogPostHeader post={post} />
            {comingSoon && <p className="mt-6 rounded-xl border border-border bg-sage-soft p-4 text-sm leading-relaxed">This free guide is available to everyone. Visa Prepper interview practice for India and Bangladesh is coming soon. We currently support Pakistan in English and Urdu.</p>}

            <div className="prose-vp mt-8">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            {post.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Frequently asked questions
                </h2>
                <div className="mt-5">
                  <FAQAccordion items={post.faq} />
                </div>
              </div>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={post.toc} />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <RelatedPosts posts={related} />
          </div>
        )}
      </Container>

      {!comingSoon && <CTASection
        title="Ready to practice your own answers?"
        description="For applicants in Pakistan, in English or Urdu. Start with a free document check, or choose an interview package. India and Bangladesh support are coming soon."
      />}
    </>
  );
}
