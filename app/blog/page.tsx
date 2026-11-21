import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/content/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "U.S. Visa Interview Guides & Practice Plans",
  description:
    "Free U.S. visa interview guides, mock interview exercises and document checklists. Prepare for student, visitor and work interviews using your own facts.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const countries = [
    { market: "pakistan", name: "Pakistan", localName: "پاکستان", lang: "ur", description: "Family visits, student funding, and practice in English or Urdu.", status: "App access available" },
    { market: "india", name: "India", localName: "भारत", lang: "hi", description: "Education loans, H1B work details, and visiting family.", status: "App access available · Hindi for U.S. interviews" },
    { market: "bangladesh", name: "Bangladesh", localName: "বাংলাদেশ", lang: "bn", description: "Student funding, family support, and planning for your appointment.", status: "U.S. preparation available · Bengali coming soon" },
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
          title="Prepare your U.S. visa answers, one step at a time."
          description="Free guidance for readers worldwide: understand your documents, practice specific answers and prepare for follow-up questions. Choose a topic or explore a country guide."
        />
        <section className="mt-10" aria-labelledby="country-guides">
          <h2 id="country-guides" className="font-display text-2xl font-semibold">Country-specific guidance</h2>
          <p className="mt-3 text-muted-foreground">Looking for an interview practice app? Explore <Link href="/visa-interview-practice" className="text-primary underline">AI video interview practice</Link>, or see preparation for <Link href="/visa-interview-practice/india" className="text-primary underline">India</Link> and <Link href="/visa-interview-practice/pakistan" className="text-primary underline">Pakistan</Link>.</p>
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
