import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getAllPosts } from "../lib/content/posts";
import sitemap from "../app/sitemap";
import { buildArticleJsonLd, buildSoftwareApplicationJsonLd } from "../lib/seo/json-ld";

const newSlugs = ["f1-visa-mock-interview-online-7-day-plan", "us-visa-interview-preparation-any-country", "b1-b2-visa-mock-interview-scenarios"];

test("new guides have distinct intent, original publication dates, valid schema and sitemap entries", () => {
  const posts = getAllPosts();
  assert.equal(posts.length, 20);
  assert.equal(new Set(posts.map(p => p.slug)).size, posts.length);
  assert.equal(new Set(posts.map(p => p.primaryKeyword)).size, posts.length);
  for (const slug of newSlugs) {
    const post = posts.find(p => p.slug === slug)!;
    assert.ok(post, slug);
    assert.equal(post.publishDate, "2026-11-17");
    assert.ok(!post.updatedDate);
    assert.ok(post.content.split(/\s+/).length > 700, slug);
    assert.ok(post.content.includes("https://travel.state.gov/"), slug);
    assert.ok(post.content.includes("/pricing"), slug);
    assert.equal(sitemap().filter(p => p.url.endsWith(`/blog/${slug}`)).length, 1);
    const schema = buildArticleJsonLd(post);
    assert.equal(schema.datePublished, "2026-11-17");
    assert.equal(schema.dateModified, schema.datePublished);
  }
  assert.equal(posts.find(p => p.slug === "best-ai-visa-interview-tools")?.publishDate, "2026-09-25");
  assert.equal(posts.filter(p => p.slug.includes("best-ai-visa-interview-tools")).length, 1);
});

test("worldwide U.S. application access remains distinct from non-U.S. route eligibility", () => {
  const home = fs.readFileSync("app/page.tsx", "utf8");
  assert.match(home, /Your U.S. visa interview/);
  assert.match(home, /U.S. visa preparation for applicants worldwide/);
  assert.match(home, /International applicants can select “Other”/);
  assert.match(home, /UK and European routes have country-specific eligibility/);
  const global = getAllPosts().find(p => p.slug === newSlugs[1])!;
  assert.match(global.content, /DS-260/);
  assert.match(global.content, /nationality or residence/);
  assert.match(global.content, /supports U.S. visa applicants worldwide/);
  assert.match(global.content, /Another country/);
  assert.match(global.content, /actual nationality/);
  assert.match(global.content, /UK and European routes retain their applicant-country eligibility rules/);
  const offers = buildSoftwareApplicationJsonLd().offers;
  assert.equal(offers.find(p => p.price === 44)?.availability, "https://schema.org/InStock");
  assert.ok(offers.every(p => p.eligibleRegion.name === "Worldwide"));
  for (const post of getAllPosts()) {
    const copy = `${post.content} ${post.faq.map(f => f.answer).join(" ")}`;
    assert.doesNotMatch(copy, /app(?:lication)? (?:access )?currently supports (?:applicants from )?Pakistan and India|Bangladesh support (?:is|are) coming soon|not yet enabled|additional applicant countries are planned/i, post.slug);
  }
  const blog = fs.readFileSync("app/blog/[slug]/page.tsx", "utf8");
  assert.doesNotMatch(blog, /!comingSoon/);
  const countries = fs.readFileSync("lib/config/offering.ts", "utf8");
  assert.match(countries, /name: "Bangladesh"[^\n]*Supported U.S. routes/);
});

test("comparison uses current provider claims without exclusive-document or best-product assertions", () => {
  const post = getAllPosts().find(p => p.slug === "best-ai-visa-interview-tools")!;
  for (const name of ["Permito", "VisaInterview.ai", "VisaMind", "VisaIsle", "Visaz"]) assert.ok(post.content.includes(name));
  assert.match(post.content, /Publisher disclosure/);
  assert.match(post.content, /not exclusive to VisaPrepper/);
  assert.doesNotMatch(post.content, /VisaMind.*five written questions/);
});
