import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import sitemap from "../app/sitemap";
import { getAllPosts } from "../lib/content/posts";
import { SITE_URL } from "../lib/config/site";
import { buildArticleJsonLd, buildWebsiteJsonLd } from "../lib/seo/json-ld";

const TITLE_SUFFIX = " | VisaPrepper";
const NEW_POSTS_2026_11_21 = [
  "us-visa-interview-questions",
  "b1-b2-visa-interview-questions-for-parents",
  "us-visa-interview-questions-philippines",
  "us-visa-interview-day-what-to-expect",
  "f1-visa-second-attempt-after-214b",
  "us-visa-interview-in-hindi-urdu",
  "spouse-visa-interview-questions-ir1-cr1",
];

test("blog search titles and SEO-only descriptions fit search snippets", () => {
  for (const post of getAllPosts()) {
    if (post.seoTitle) assert.ok((post.seoTitle + TITLE_SUFFIX).length <= 65, `${post.slug} seoTitle too long`);
    if (post.seoDescription) {
      assert.ok(post.seoDescription.length >= 70 && post.seoDescription.length <= 160, `${post.slug} seoDescription length ${post.seoDescription.length}`);
      // Disclaimers such as "No outcome guarantees" are fine; promises are not.
      assert.doesNotMatch(post.seoDescription, /guaranteed? (?:approval|visa|success|results)|will get (?:your|the) visa/i, post.slug);
    }
  }
});

test("article markup links the visible byline to the brand and the website", () => {
  for (const post of getAllPosts()) {
    const schema = buildArticleJsonLd(post);
    const url = `${SITE_URL}/blog/${post.slug}`;
    assert.equal(schema["@id"], `${url}#article`);
    assert.equal(schema.url, url);
    assert.equal(schema.mainEntityOfPage, url);
    assert.deepEqual(schema.isPartOf, { "@id": `${SITE_URL}/#website` });
    assert.equal(schema.author.name, post.author, "author name must equal the visible byline");
    if (post.author === "Visa Prepper Editorial Team") {
      assert.equal(schema.author["@type"], "Organization");
      assert.deepEqual((schema.author as { parentOrganization?: unknown }).parentOrganization, { "@id": `${SITE_URL}/#organization` });
    }
    assert.equal(schema.publisher["@id"], `${SITE_URL}/#organization`);
  }
  assert.equal(buildWebsiteJsonLd().name, "VisaPrepper");
});

test("new guides are dated today, unique in intent, cite official sources and are in the sitemap", () => {
  const posts = getAllPosts();
  const urls = sitemap().map((entry) => entry.url);
  for (const slug of NEW_POSTS_2026_11_21) {
    const post = posts.find((p) => p.slug === slug);
    assert.ok(post, slug);
    assert.equal(post.publishDate, "2026-11-21", slug);
    assert.ok(!post.updatedDate, slug);
    assert.ok(post.seoTitle && post.seoDescription, `${slug} needs seoTitle and seoDescription`);
    assert.match(post.content, /https:\/\/(travel\.state\.gov|[a-z]{2}\.usembassy\.gov|www\.uscis\.gov|www\.ecfr\.gov|www\.federalregister\.gov|fam\.state\.gov|www\.ice\.gov|www\.fmjfee\.com)\//, `${slug} cites an official source`);
    assert.ok(post.faq.length >= 3, `${slug} FAQ`);
    assert.ok(urls.includes(`${SITE_URL}/blog/${slug}`), `${slug} in sitemap`);
  }
  assert.equal(new Set(posts.map((p) => p.primaryKeyword.toLowerCase())).size, posts.length, "primary keywords stay unique");
});

test("root layout no longer hands the homepage canonical to error pages", () => {
  const layout = fs.readFileSync("app/layout.tsx", "utf8");
  assert.doesNotMatch(layout, /canonical:\s*"\/"/);
  assert.match(layout, /"max-image-preview": "large"/);
});

test("published dates of existing guides are unchanged", () => {
  const pakistan = getAllPosts().find((p) => p.slug === "us-visa-interview-questions-pakistan");
  assert.equal(pakistan?.publishDate, "2026-01-28");
});
