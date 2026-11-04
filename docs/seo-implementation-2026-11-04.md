# VisaPrepper marketing SEO implementation

4 November 2026. Local production preview at http://127.0.0.1:3016/.

The November 3 Search Console export drove the existing-page batch. The Ahrefs findings and availability handoff informed product claims and technical edits. Existing URLs and publication dates were retained.

| Priority page | Change |
| --- | --- |
| /blog/us-visa-interview-questions-pakistan | Country-intent snippet, funding exercise and category links |
| /blog/us-visa-interview-documents-checklist | Official checklist versus optional consistency review, bundle and sample links |
| /blog/best-ai-visa-interview-tools | Dated source-based comparison, publisher disclosure and verified format distinctions |
| /blog/visa-interview-nervous-forget-answer | Practical follow-up exercise using illustrative feedback |
| /how-it-works | Clearer steps, route and language scope, document and interview example links |
| /blog/free-ai-visa-mock-interview-online | Self-guided F1 exercise and precise free and paid distinctions |
| /blog/b1-b2-visa-interview-questions | Separate business and family-visit scenarios, cost allocation and service links |
| /blog/214b-visa-refusal-guide | Corrected legal framing using Department of State guidance, notice review exercise and category links |

The interview landing page covers simulator intent. India and Pakistan pages retain local preparation examples. Six existing U.S. category pages use individual metadata and contextual guide links. The language page distinguishes U.S. interviews in English, Urdu and Hindi, English international interviews and English or Urdu international preparation questions. Measured-confidence claims were removed. Fictional examples remain labelled and testimonials are intact.

The new /document-checks page explains selected evidence, bundle limits, differences versus missing information, one free check and the paid package. It reuses the existing interactive document examples. The UK Student page is deferred pending confirmation of deployed English practice and review of UKVI versus university preparation scope. GB_STUDENT has local provider-free flow evidence. A future page should focus on course choice, funding and study plans with UK-specific metadata and official [Student visa guidance](https://www.gov.uk/student-visa).

The sitemap lists 41 canonical pages. Article search titles are separate from editorial H1s. Sitemap lastmod reflects substantive revisions or is omitted when unknown. Legacy /start stays noindex, the paid schema offer is marked unavailable, and standalone pricing headings follow their H1. The existing canonical and robots strategies remain in place.

Primary conversion buttons and legacy /start links use https://app.visaprepper.com. The live browser check reached /login and showed a Create account link. Sign-in, registration and signed-in routing were not exercised. The local checkout guard returned 503. The one-time $44 USD package still shows six interviews, ten checks and 90 days from purchase. The free allowance is one separate check and preparation resources.

- All 19 automated tests, ESLint, TypeScript, git diff --check and the Next.js webpack build passed. Next.js generated 49 static outputs and reported the existing parent lockfile warning.
- Production GET crawl passed for 41 indexable pages and 42 internal link targets, including metadata, canonicals, JSON-LD parsing, links and anchors, sitemap, robots, CTA destinations and checkout refusal. Sample, WhatsApp, video markup and testimonial checks passed. Rich-result eligibility was not tested.
- Work settings blocked subsequent browser inspection. Final desktop and mobile layouts, video playback, keyboard interaction and rendered email remain unchecked. The Ahrefs audit found 40 references to the shared Cloudflare email-protection path in unrendered HTML and a decoder script returning 200. No Cloudflare change was made. The canonical-host redirect chain remains a hosting follow-up.
- Public assets and protected marketing components match their hashes. No application files were edited by this SEO work. Six document-workspace files differ from the earlier app snapshot outside this task and were left as found.
- Ready for local review. Before release, verify authenticated app behavior, deployed route capabilities and rendered desktop and mobile behavior. No deployment, commit, push or activation occurred.

## Exact marketing files changed

- app/about/page.tsx
- app/blog/[slug]/page.tsx
- app/document-checks/page.tsx
- app/features/page.tsx
- app/how-it-works/page.tsx
- app/languages/page.tsx
- app/layout.tsx
- app/page.tsx
- app/pricing/page.tsx
- app/sitemap.ts
- app/start/page.tsx
- app/visa-interview-practice/[country]/page.tsx
- app/visa-interview-practice/page.tsx
- app/visa-types/[slug]/page.tsx
- app/visa-types/page.tsx
- components/blog/mdx-components.tsx
- components/layout/CtaButton.tsx
- components/marketing/CTASection.tsx
- components/marketing/FeedbackExampleCard.tsx
- components/marketing/Pricing.tsx
- content/blog/214b-visa-refusal-guide.mdx
- content/blog/b1-b2-visa-interview-questions.mdx
- content/blog/best-ai-visa-interview-tools.mdx
- content/blog/f1-visa-interview-questions-and-answers.mdx
- content/blog/f1-visa-interview-who-will-pay.mdx
- content/blog/free-ai-visa-mock-interview-online.mdx
- content/blog/h1b-visa-interview-questions.mdx
- content/blog/h4-visa-interview-questions.mdx
- content/blog/j1-visa-interview-questions.mdx
- content/blog/mock-visa-interview-online.mdx
- content/blog/us-visa-interview-documents-checklist.mdx
- content/blog/us-visa-interview-questions-bangladesh.mdx
- content/blog/us-visa-interview-questions-india.mdx
- content/blog/us-visa-interview-questions-pakistan.mdx
- content/blog/visa-interview-nervous-forget-answer.mdx
- content/visa-types/b1-b2.ts
- content/visa-types/f1.ts
- content/visa-types/family-immigrant.ts
- content/visa-types/h1b.ts
- content/visa-types/h4.ts
- content/visa-types/j1.ts
- content/visa-types/types.ts
- docs/seo-implementation-2026-11-04.md
- lib/config/product-scope.ts
- lib/config/site.ts
- lib/content/faq.ts
- lib/content/posts.ts
- lib/content/practice-markets.ts
- lib/seo/content-dates.ts
- lib/seo/json-ld.tsx
- scripts/verify-site.mjs
- tests/seo-implementation.test.ts
- tests/seo.test.ts
