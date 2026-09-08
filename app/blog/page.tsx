import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/content/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Visa Interview Guides for Pakistan, India & Bangladesh",
  description:
    "Free U.S. visa interview questions and preparation tips for Pakistan, India and Bangladesh. Find student, visitor, work visa, DS-160 and document guides.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const countries = [
    { market: "pakistan", name: "Pakistan", localName: "پاکستان", lang: "ur", description: "Family visits, student funding, and practice in English or Urdu.", status: "Interview practice available" },
    { market: "india", name: "India", localName: "भारत", lang: "hi", description: "Education loans, H1B work details, and visiting family.", status: "India support & Hindi coming soon" },
    { market: "bangladesh", name: "Bangladesh", localName: "বাংলাদেশ", lang: "bn", description: "Student funding, family support, and planning for your appointment.", status: "Bangladesh support & Bengali coming soon" },
  ];

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      </Container>

      <Container className="py-10 sm:py-14">
        <SectionHeading
          titleAs="h1"
          eyebrow="Free preparation tips"
          title="Visa interview guides for Pakistan, India and Bangladesh"
          description="Questions to practice. Documents to understand. Simple steps for your next interview. Start with your country, then choose the guide that fits your plans."
        />
        <section className="mt-10" aria-labelledby="country-guides">
          <h2 id="country-guides" className="font-display text-2xl font-semibold">Start with your country</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {countries.map((country) => {
              const post = posts.find((entry) => entry.market === country.market);
              if (!post) return null;
              return <Link key={country.market} href={`/blog/${post.slug}`} className="rounded-2xl border border-border bg-sage-soft/50 p-6 transition-colors hover:border-primary">
                <h3 className="text-xl font-semibold">{country.name} <span lang={country.lang} dir={country.lang === "ur" ? "rtl" : undefined} className="ml-1 text-base font-normal text-primary">{country.localName}</span></h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{country.description}</p>
                <p className="mt-4 text-sm font-medium text-primary">{country.status}</p>
                <span className="mt-5 block text-sm font-semibold">Read the free guide →</span>
              </Link>;
            })}
          </div>
        </section>
        <section className="mt-12" aria-labelledby="topic-guides">
          <h2 id="topic-guides" className="font-display text-2xl font-semibold">Questions, documents and preparation</h2>
          <p className="mt-3 text-muted-foreground">All guides are free to read. Official application and appointment instructions always come first.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.filter((post) => !post.market).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
          </div>
        </section>
      </Container>
    </>
  );
}
