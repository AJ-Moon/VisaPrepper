# Sitewide marigold refinement — 18 November 2026

Local production preview: http://127.0.0.1:3016/ . No commit, push or deployment.

## Scope and design decisions

All 44 canonical marketing URLs were inventoried and their server-rendered pages compared before/after. The additional `/start` noindex bridge was covered by the route checker. There are no additional standalone FAQ or embassy routes: FAQs use the shared accordion; country and embassy education uses the country template and articles. API endpoints and media routes are not visual marketing pages.

This is source/HTML review, not a claim that every page was visually inspected. Browser access returned “Local browser access is unavailable for this chat.” No current desktop, tablet or mobile screenshots could be captured. Historical screenshots have not been relabelled or reused as current evidence.

The existing application-matched palette remains centralized: #F5B841 marigold, #FDF0D2 soft marigold, #7A4F00 accent ink and #DFC58F decorative border. Forest green, cream and sage remain dominant.

- Homepage: hero source, illustration, navigation, button implementation and hero-specific CSS left unchanged. Exact built hero HTML comparison passes. Below the hero, shared section-eyebrow rules add a small warm marker; selected report tabs gain a gold edge. Existing media, testimonial and destination treatments remain balanced and unchanged.
- Product/document/interview pages: primary free-document entry buttons use the existing accent variant. Secondary links remain green. Document-workflow numbers receive dark accent ink; required content and order are unchanged.
- Six visa category pages: warm category chips in the shared index cards; a thin gold edge identifies the existing practical preparation callout. Topic grids stay quiet.
- Pakistan/India pages: small eyebrow marker, soft icon tile and accent primary action. Native-language content, route facts and eligibility remain unchanged.
- Blog listing and all 20 articles, including comparison/educational/country guides: small header rule, soft table headers, quiet underlined article links, active table-of-contents background/edge and aria-current="location". Card arrows use pale accent circles with a restrained hover change. Body text and heading typography stay unchanged. Table overflow remains confined to its existing focusable comparison region.
- FAQs: native open state gains a pale surface, gold edge and dark-ink chevron circle. The disclosure arrow and native expanded state remain, so color is not the only indicator.
- Partner program: clear accent step numbers and existing application CTA. Form logic and form controls untouched.
- Contact: pale accent email icon; green WhatsApp support preserved.
- About/Languages: shared heading marker; language cards and availability panel remain quiet. No new colored country/status treatment.
- Pricing and How It Works: previous accent hierarchy retained; no extra gold competing with the existing package CTA or process markers.
- Footer across all routes: small section rules and accessible warm link hover. Header remains unchanged.
- Privacy/Terms/Refund and the partner form: content and operational controls left quiet; shared footer only. No legal or data-handling edits.

## Verification

- ESLint passed; TypeScript passed; all 34 existing automated tests passed.
- Production build `npm run build -- --webpack` passed (52 generated outputs). The default Turbopack build was blocked by this environment's worker-port binding restriction (EPERM), including one permission retry. No build configuration or dependency changed.
- GET-only production-preview checks passed: 44 canonical URLs, 45 internal targets, metadata/schema/sitemap/robots, app handoffs, samples, WhatsApp, testimonials, video markup and form fields. No email, checkout or application action was submitted.
- All 44 pages retain exact normalized copy, title/meta/canonical/alternate tags, structured-data objects and anchor destinations. Sitemap XML unchanged. Hero HTML unchanged.
- 18 homepage CSS/JS assets return successfully; the served CSS includes the added visual classes.
- New text/icon combinations: forest on marigold 7.00:1; ink on pale marigold 6.30:1; forest on pale marigold 8.80:1; gold footer hover on charcoal 7.22:1; workflow numbers on cream 6.68:1. Decorative rules do not convey meaning alone.
- Existing focus outlines and reduced-motion overrides retained. No new animation library, observer, hidden-content behavior or fixed-width layout introduced. These are source checks; runtime keyboard, animation, overflow and viewport behavior remain unverified.
- `git diff --check` passed. 140 other snapshotted starting files remain byte-identical; TypeScript's generated incremental cache changed as expected. Existing dirty work was preserved; no application/backend/payment/email/content-source changes made in this pass.

## Manual visual review still needed

Open the running preview at 1440px, tablet, 390px and 320px. Review homepage below the untouched hero, Document Checks, an F1 page, the comparison article and partner program. Check eyebrow wrapping, active TOC, open FAQs, sample-report tabs/dialog keyboard behavior, focus visibility and reduced-motion mode. No rendered responsive pass or current screenshots are claimed.

Suggested review links:

- http://127.0.0.1:3016/
- http://127.0.0.1:3016/document-checks
- http://127.0.0.1:3016/visa-types/f1
- http://127.0.0.1:3016/blog/best-ai-visa-interview-tools
- http://127.0.0.1:3016/partners

## Exact visual source files changed in this pass

- `app/globals.css`
- `app/visa-interview-practice/page.tsx`
- `app/visa-interview-practice/[country]/page.tsx`
- `app/contact/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/document-checks/page.tsx`
- `app/partners/page.tsx`
- `app/visa-types/[slug]/page.tsx`
- `components/ui/SectionHeading.tsx`
- `components/faq/FAQAccordion.tsx`
- `components/layout/SiteFooter.tsx`
- `components/blog/BlogPostHeader.tsx`
- `components/blog/RelatedPosts.tsx`
- `components/blog/BlogCard.tsx`
- `components/blog/mdx-components.tsx`
- `components/blog/TableOfContents.tsx`
- `components/marketing/InterviewSamples.tsx`
- `components/marketing/DocumentSamples.tsx`
- `components/marketing/VisaTypeCard.tsx`

## Complete canonical route inventory

- `/pricing`
- `/partners`
- `/partners/apply`
- `/`
- `/how-it-works`
- `/features`
- `/document-checks`
- `/visa-interview-practice`
- `/visa-interview-practice/india`
- `/visa-interview-practice/pakistan`
- `/visa-types`
- `/languages`
- `/blog`
- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/refund-policy`
- `/visa-types/b1-b2`
- `/visa-types/f1`
- `/visa-types/h1b`
- `/visa-types/h4`
- `/visa-types/j1`
- `/visa-types/family-immigrant`
- `/blog/us-visa-interview-preparation-any-country`
- `/blog/f1-visa-mock-interview-online-7-day-plan`
- `/blog/b1-b2-visa-mock-interview-scenarios`
- `/blog/free-ai-visa-mock-interview-online`
- `/blog/best-ai-visa-interview-tools`
- `/blog/visa-interview-nervous-forget-answer`
- `/blog/visa-interview-follow-up-questions`
- `/blog/f1-visa-interview-who-will-pay`
- `/blog/mock-visa-interview-online`
- `/blog/us-visa-interview-questions-bangladesh`
- `/blog/us-visa-interview-questions-india`
- `/blog/us-visa-interview-questions-pakistan`
- `/blog/j1-visa-interview-questions`
- `/blog/h4-visa-interview-questions`
- `/blog/h1b-visa-interview-questions`
- `/blog/214b-visa-refusal-guide`
- `/blog/us-visa-interview-documents-checklist`
- `/blog/ds-160-interview-consistency`
- `/blog/b1-b2-visa-interview-questions`
- `/blog/f1-visa-interview-questions-and-answers`
