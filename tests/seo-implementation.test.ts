import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "node:fs";
import { CtaButton } from "../components/layout/CtaButton";
import sitemap from "../app/sitemap";
import { getAllPosts } from "../lib/content/posts";
import { getAllVisaTypes } from "../lib/content/visa-types";
import { EXTERNAL_APP_URL } from "../lib/config/site";

test("free and package conversion buttons always use the public app entry", () => {
  for (const intent of ["free", "paid"] as const) {
    for (const label of ["Start Free", "Start Preparing", "Check My Documents", "Try VisaPrepper", "$44 package"]) {
      const html = renderToStaticMarkup(CtaButton({ intent, label }));
      assert.ok(html.includes(`href="${EXTERNAL_APP_URL}"`));
      assert.doesNotMatch(html, /href="[^\"]*(?:signup|billing|api\/checkout|\/start)/);
    }
  }
});

test("sitemap includes the distinct document page and only known route dates", () => {
  const entries = sitemap();
  assert.equal(entries.length, 41);
  assert.equal(new Set(entries.map(e => e.url)).size, entries.length);
  assert.ok(entries.some(e => e.url.endsWith("/document-checks")));
  assert.ok(!entries.some(e => /\/start|\/api\//.test(e.url)));
  for (const route of ["/privacy", "/terms", "/refund-policy", "/partners", "/contact"]) {
    assert.equal(entries.find(e => new URL(e.url).pathname === route)?.lastModified, undefined);
  }
  for (const post of getAllPosts()) {
    assert.equal(entries.find(e => e.url.endsWith(`/blog/${post.slug}`))?.lastModified, post.updatedDate ?? post.publishDate);
  }
});

test("all six category pages own concise metadata and contextual guide links", () => {
  const pages = getAllVisaTypes();
  assert.equal(pages.length, 6);
  for (const page of pages) {
    assert.ok(page.metaTitle.length < 60);
    assert.ok(page.metaDescription.length < 180);
    assert.ok(page.guideLinks.length > 0);
    for (const link of page.guideLinks) assert.ok(getAllPosts().some(post => link.href === `/blog/${post.slug}`));
  }
});

test("priority article updates retain established URLs and separate SEO titles from H1s", () => {
  const slugs = ["us-visa-interview-questions-pakistan", "us-visa-interview-documents-checklist", "best-ai-visa-interview-tools", "visa-interview-nervous-forget-answer", "free-ai-visa-mock-interview-online", "b1-b2-visa-interview-questions", "214b-visa-refusal-guide"];
  for (const slug of slugs) {
    const post = getAllPosts().find(p => p.slug === slug)!;
    assert.ok(post, slug);
    assert.ok(post.seoTitle && post.seoTitle.length < 65, slug);
    assert.equal(post.updatedDate, "2026-11-04");
    assert.ok(post.content.includes("/#interview-example") || post.content.includes("/#sample-report"), slug);
  }
  const oldPublishDate = getAllPosts().find(p => p.slug === "us-visa-interview-questions-pakistan")?.publishDate;
  assert.equal(oldPublishDate, "2026-01-28");
});

test("public content does not advertise measured confidence or obsolete direct signups", () => {
  for (const post of getAllPosts()) assert.doesNotMatch(post.content, /confidence (?:scores|dropped)|answer, confidence and consistency/);
  const entry = fs.readFileSync("components/layout/CtaButton.tsx", "utf8");
  assert.ok(entry.includes("EXTERNAL_APP_URL"));
  const legacy = fs.readFileSync("app/start/page.tsx", "utf8");
  assert.ok(legacy.includes("Continue to the app"));
  assert.doesNotMatch(legacy, /\/api\/checkout-entry|\/signup/);
});
