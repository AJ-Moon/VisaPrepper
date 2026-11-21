# Schema and brand audit: visaprepper.com

- **Audit date:** 2026-11-21. Live fetches ran between 11:12 and 11:20 UTC.
- **Production audited:** https://visaprepper.com (Vercel, branch `codex/marketing-readiness-2026-11-19` @ `99dac01`). The repo clone at `.../scratchpad/work/VisaPrepper` is at `99dac01`, and the source references below point to it.
- **Scope:** every URL in the live sitemap (44 URLs, `curl https://visaprepper.com/sitemap.xml`). All 44 returned HTTP 200.
- **Method:**
  - Raw HTML fetch with curl (no JS rendering). The site is Next.js SSR, and every JSON-LD block is in the initial HTML.
  - A custom stdlib `HTMLParser` extractor, run with `python3 -I`.
  - claude-seo v2.6.2 `hooks/validate-schema.py`, run on all 44 files: 44/44 exit 0, no errors and no warnings.
  - claude-seo `parse_html.py --json`, run on all 44: `schema_invalid.count = 0` on every page.
  - A visible-text cross-check of every FAQ question and answer, Article headline, author and dates.
- **Not available:**
  - Google Search Console is not connected, so indexing state, the chosen canonical, the displayed site name and brand-query impressions are **unknown**.
  - The Rich Results Test was not run, because it is an interactive Google tool.
- **Raw evidence:**
  - `out/schema-brand-raw/` holds `sitemap.xml`, `urls.txt`, `fetch.log`, `html/*.html` (44 pages), `pages.json` (parsed metadata and JSON-LD), `per-url-table.md`, `hook-validate.log`, `img/` (logo, icon and OG image), `social/`, and `google-docs/` (Google Search Central pages as fetched, plus text extracts).
  - The scripts are in `scratchpad/scripts-schema/`.
- **Security note:** no fetched page, SERP file, social page or Google doc contained text addressed to an AI agent or instructions to act. A scan for common injection phrases found 0 hits.

---

## 0. Executive summary

1. **The structured data is technically clean.**
   - No JSON parse errors, no Microdata or RDFa, `@context` is `https://schema.org` everywhere, and there are no placeholders or deprecated types.
   - Every FAQ question and answer (29 pages), every breadcrumb trail (40 pages) and every Article headline, byline and date (20 posts) matches visible page content. No markup describes hidden content.
   - **No ratings or reviews exist anywhere, so nothing is fabricated.**
2. **The brand entity graph is mostly consistent.**
   - `Organization`, `WebSite` and `SoftwareApplication` all use `name: "VisaPrepper"` with `alternateName: ["Visa Prepper", "visaprepper.com"]`. They are linked by `@id` (`/#organization`, `/#website`, `/#software`).
   - `og:site_name` is `VisaPrepper` on 44/44 pages. The `<title>` suffix `| VisaPrepper` appears on 44/44 pages; the homepage puts the brand first.
3. **The main schema inconsistency is the blog author entity.**
   - All 20 `Article` blocks have `author: {"@type":"Organization","name":"Visa Prepper Editorial Team"}`, with a space, no `@id`, no `url` and no link to the publisher.
   - The publisher is `{"@id":"https://visaprepper.com/#organization","name":"VisaPrepper"}`.
   - The author name has to stay as written because it is the visible byline. The fix is to link it, not rename it.
4. **Metadata spelling is mixed on a handful of URLs.**
   - Three page titles contain both spellings, for example `Contact Visa Prepper | VisaPrepper`.
   - Five meta descriptions use "Visa Prepper".
   - The "Visa Prepper" title strings also flow into og:title, twitter:title and og:image:alt.
   - These are metadata-only strings, verified not to be rendered visibly.
5. **Recommendation: keep "VisaPrepper" as the preferred site name**, with `alternateName` `["Visa Prepper", "visaprepper.com"]` in that order. This keeps the October 2026 decision.
   - It matches the domain, the logo image wordmark, the header wordmark, the OG image, `og:site_name`, all titles and all brand entities.
   - The spaced form stays as the first alternate. It is supported by the About and homepage copy ("VisaPrepper, also written Visa Prepper").
6. **FAQ correction to the shared context.** Google stopped showing FAQ rich results for **all** sites, not only non-government and non-health sites, from **2026-05-07**.
   - Source: the Search Central changelog entry of 2026-05-08. The FAQ docs were removed on 2026-06-15, and the old FAQ doc URL now redirects to `/search/updates`. Checked 2026-11-21.
   - The FAQPage markup is valid and harmless. It is not a rich-result opportunity. No action is needed.
7. **Hosting issues related to site names.** Google's site-name guidance mentions duplicate home pages and redirects, and two things here touch that guidance:
   - `https://visa-prepperation.vercel.app/` serves the full homepage with HTTP 200 and no `noindex`. Its canonical points to the apex.
   - `https://www.visaprepper.com/` redirects with a **307** (temporary).
   - Neither problem is in the schema, but both touch the brand and homepage signals.
   - The homepage's absence from page-1 results for "visaprepper" is **not** explained by the markup, which is valid and consistent. The cause is unknown without GSC URL Inspection.

---

## 1. Structured data inventory and validation

### 1.1 Per-URL inventory (live, 2026-11-21)

Parse errors on all 44 pages: **0**. Microdata or RDFa: **0 pages**. Every block is a standalone `<script type="application/ld+json">` with its own `@context`; none uses `@graph`.

| # | URL path | JSON-LD blocks | Top-level @types (nested) | @id nodes | `<title>` brand | FAQ Qs visible |
|---|---|---|---|---|---|---|
| 1 | `/pricing` | 1 | Organization | /#organization | VisaPrepper | - |
| 2 | `/partners` | 1 | Organization | /#organization | mixed: "Visa Prepper" + suffix | - |
| 3 | `/partners/apply` | 1 | Organization | /#organization | mixed: "Visa Prepper" + suffix | - |
| 4 | `/` | 4 | Organization; SoftwareApplication (Offer x2, Place); WebSite; FAQPage | /#organization, /#software, /#website | VisaPrepper (prefix) | 12/12 |
| 5 | `/how-it-works` | 3 | Organization; BreadcrumbList; FAQPage | /#organization | VisaPrepper x2 | 3/3 |
| 6 | `/features` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 7 | `/document-checks` | 4 | Organization; Service (Place); BreadcrumbList; FAQPage | /#organization (Service has no @id) | VisaPrepper | 3/3 |
| 8 | `/visa-interview-practice` | 4 | Organization; Service (Place); BreadcrumbList; FAQPage | /#organization, /visa-interview-practice#service | VisaPrepper | 3/3 |
| 9 | `/visa-interview-practice/india` | 4 | Organization; Service (Country); BreadcrumbList; FAQPage | /#organization, /visa-interview-practice/india#service | VisaPrepper | 2/2 |
| 10 | `/visa-interview-practice/pakistan` | 4 | Organization; Service (Country); BreadcrumbList; FAQPage | /#organization, /visa-interview-practice/pakistan#service | VisaPrepper | 2/2 |
| 11 | `/visa-types` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 12 | `/languages` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 13 | `/blog` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 14 | `/about` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 15 | `/contact` | 2 | Organization; BreadcrumbList | /#organization | mixed: "Visa Prepper" + suffix | - |
| 16 | `/privacy` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 17 | `/terms` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 18 | `/refund-policy` | 2 | Organization; BreadcrumbList | /#organization | VisaPrepper | - |
| 19 | `/visa-types/b1-b2` | 3 | Organization; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 20 | `/visa-types/f1` | 3 | Organization; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 21 | `/visa-types/h1b` | 3 | Organization; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 22 | `/visa-types/h4` | 3 | Organization; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 23 | `/visa-types/j1` | 3 | Organization; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 24 | `/visa-types/family-immigrant` | 3 | Organization; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 25 | `/blog/us-visa-interview-preparation-any-country` | 4 | Organization; Article (author Org, publisher Org @id, ImageObject logo); BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 26 | `/blog/f1-visa-mock-interview-online-7-day-plan` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 27 | `/blog/b1-b2-visa-mock-interview-scenarios` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 28 | `/blog/free-ai-visa-mock-interview-online` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 29 | `/blog/best-ai-visa-interview-tools` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 30 | `/blog/visa-interview-nervous-forget-answer` | 3 | Organization; Article; BreadcrumbList | /#organization | VisaPrepper | - |
| 31 | `/blog/visa-interview-follow-up-questions` | 3 | Organization; Article; BreadcrumbList | /#organization | VisaPrepper | - |
| 32 | `/blog/f1-visa-interview-who-will-pay` | 3 | Organization; Article; BreadcrumbList | /#organization | VisaPrepper | - |
| 33 | `/blog/mock-visa-interview-online` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 34 | `/blog/us-visa-interview-questions-bangladesh` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 35 | `/blog/us-visa-interview-questions-india` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 36 | `/blog/us-visa-interview-questions-pakistan` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 37 | `/blog/j1-visa-interview-questions` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 38 | `/blog/h4-visa-interview-questions` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 39 | `/blog/h1b-visa-interview-questions` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 4/4 |
| 40 | `/blog/214b-visa-refusal-guide` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 41 | `/blog/us-visa-interview-documents-checklist` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 42 | `/blog/ds-160-interview-consistency` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 43 | `/blog/b1-b2-visa-interview-questions` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |
| 44 | `/blog/f1-visa-interview-questions-and-answers` | 4 | Organization; Article; BreadcrumbList; FAQPage | /#organization | VisaPrepper | 3/3 |

Totals:

| Type | Pages |
|---|---|
| Organization | 44 |
| BreadcrumbList | 40 (all except `/`, `/pricing`, `/partners`, `/partners/apply`) |
| FAQPage | 29 (never more than one per page) |
| Article | 20 |
| Service | 4 |
| SoftwareApplication with 2 Offers | 1 |
| WebSite | 1 (homepage only, which is correct) |

Source emitters:

| Emitter | Location |
|---|---|
| Organization | `app/layout.tsx:31`, emitted on every page |
| WebSite and SoftwareApplication | `app/page.tsx:46` |
| Builders | `lib/seo/json-ld.tsx` |
| BreadcrumbList | `components/layout/Breadcrumbs.tsx:8`, emitted together with the visible breadcrumb nav, so the two always match |
| FAQPage | `components/faq/FAQAccordion.tsx:7`, emitted together with the visible accordion |
| Service | `app/visa-interview-practice/page.tsx:32`, `app/visa-interview-practice/[country]/page.tsx:52`, `app/document-checks/page.tsx:20` |
| Article | `app/blog/[slug]/page.tsx:62` |

### 1.2 Validation by type (checked against Google Search Central docs fetched 2026-11-21)

| Type | Google doc (last updated) | Required by Google | Status | Issues |
|---|---|---|---|---|
| **Organization** (44 pages) | Organization SD (2026-09-08): no required properties; recommends name, alternateName, url, logo (at least 112x112, crawlable), sameAs and contact properties. "Use the same name and alternateName that you're using for your site name." | none | Pass | (a) Same name and alternateName as WebSite, which is good. (b) The logo is a 1254x1254 JPEG with a "VisaPrepper" wordmark and tagline on a green square; crawlable, HTTP 200. (c) The `/#organization` logo is a plain URL in the main block but an `ImageObject` inside the Article publisher. This is equivalent and only cosmetic. (d) `url` is `https://visaprepper.com` with no trailing slash, while WebSite.url is `https://visaprepper.com/`. Equivalent root, cosmetic. (e) There is no `contactPoint` or `telephone`, although +1 732 518 8581 and the email are visible in the footer of every page. Optional, owner to confirm the number. (f) Organization markup on every page is fine; Google says it is not needed on every page, but it is harmless. |
| **WebSite** (homepage) | Site names (2025-12-10): `name` and `url` required on the **home page**. `alternateName` optional, ordered by preference, with the domain in lowercase as a fallback. | name, url | Pass | `name` "VisaPrepper", `alternateName` ["Visa Prepper", "visaprepper.com"], `url` "https://visaprepper.com/", `publisher` @id. A single WebSite node on the homepage, as Google asks. No SearchAction (the sitelinks search box was retired; correctly absent). |
| **SoftwareApplication + Offer** (homepage) | Software app (2026-09-08): required `name`, `offers.price`, **and** `aggregateRating` or `review` for the rich result. Recommended `applicationCategory`, `operatingSystem`. | name, offers.price, rating or review | Valid schema.org, **not eligible** for the software-app rich result | There is no `aggregateRating` or `review`, which is correct: the site shows no genuine user ratings, and none must be invented. The Offers are $0 Free and $44 USD "Complete Interview Preparation" with `InStock`, `eligibleRegion` "Worldwide" and url `/#pricing` (the anchor exists on `/`). Offer facts are visible on the homepage ("One free document check for eligible users. The $44 USD one-time package includes 6 interviews and 10 document checks, valid for 90 days"). `applicationCategory` "EducationalApplication" is a supported value; `operatingSystem` is "Web". Cosmetic: `url` has no trailing slash while `mainEntityOfPage` has one. |
| **Article** (20 posts) | Article (2026-09-08): no required properties. Recommended `author` (+ `author.url`, `@type`), `datePublished`, `dateModified` (ISO 8601, timezone recommended), `headline`, `image` (relevant, not a logo; 16x9, 4x3 and 1x1; at least 50K pixels). Author best practices: include every visible author; only the name in `author.name`; add `url` or `sameAs`; for an organization author, "link to the organization's home page". | none | Pass with warnings | (a) **The author entity is not linked**: `{"@type":"Organization","name":"Visa Prepper Editorial Team"}` has no `@id`, `url` or relation to `/#organization`. The spaced spelling is a separate, unconnected entity next to the publisher "VisaPrepper". (b) **There is no `image`** on 20/20 posts. (c) There is no `@id`, `url` or `isPartOf`. (d) Dates are date-only (for example "2026-11-17"). They are valid ISO 8601 but carry no timezone; do not invent a time. (e) Headline equals the visible H1 on 20/20. Author name equals the visible byline "By Visa Prepper Editorial Team, Visa interview preparation content team". datePublished and dateModified equal the visible "Published/Updated" dates, `article:published_time`/`article:modified_time` and the sitemap `lastmod` on 20/20. (f) Publisher `@id` `/#organization` with name "VisaPrepper" matches the Organization node. (g) `@type` is chosen in code by exact string match: `post.author === "Visa Prepper Editorial Team" ? "Organization" : "Person"` (`lib/seo/json-ld.tsx:129`). Any spelling change in front matter would silently re-type the author as a Person. |
| **BreadcrumbList** (40 pages) | Breadcrumb (2026-09-08): required `itemListElement`, `position`, `name`, `item` (item optional on the last element). | as listed | Pass | Positions are sequential, items are absolute https URLs, and the last item equals the page URL on all 40. Every trail is rendered visibly by the same component. No trail on `/pricing`, `/partners` or `/partners/apply`. Adding one is not recommended, because those pages have no visible breadcrumb and the markup would describe hidden content. |
| **FAQPage** (29 pages) | The FAQ doc was removed. Changelog 2026-05-08: "This feature will no longer appear in Google Search starting May 7, 2026"; 2026-06-15: documentation removed. | n/a | Valid schema.org; **no Google rich result for any site** | 100% of questions and answers are visible on page (checked by normalized string match against rendered text). One FAQPage per page. Keep it or leave it; there is no SEO benefit either way in Google, and any AI or GEO benefit is unconfirmed. Do **not** add new FAQPage expecting rich results. |
| **Service** (4 pages) | Not a Google rich-result type | n/a | Valid schema.org | `provider` @id links to `/#organization`, which is good. `/document-checks` Service has no `@id`; the other 3 have `#service`. `areaServed` uses a Place named "Worldwide for supported U.S. visa routes", which is odd as a place name but harmless. |

### 1.3 Policy checks

| Check | Result |
|---|---|
| Fabricated ratings or reviews | **None.** No `aggregateRating`, `review` or `ratingValue` in any block. |
| Markup describing content not visible | **None found.** FAQ questions and answers: 0 missing. Article headline, author and dates: 0 mismatches. Offers: price, quantity, validity and free tier all visible on `/`. Breadcrumbs are rendered with the markup. Organization email and logo are visible in the footer and header. |
| Placeholder text, deprecated types (HowTo, SpecialAnnouncement and similar), relative URLs | None. The claude-seo hook passed 44/44. |
| Duplicate or conflicting `@id` definitions | None. `/#organization` always has name "VisaPrepper"; only the logo representation differs (URL vs ImageObject). |
| Inconsistent publisher or author | **Yes, as described in Article (a).** Author "Visa Prepper Editorial Team" is unlinked; publisher is "VisaPrepper" (@id). |

---

## 2. Brand consistency catalogue (all 44 sitemap URLs)

Count method:
- Exact surface-form tally over each field. Matching is case-sensitive; a domain, handle or email is counted separately.
- Visible counts use DOM textContent order, so the header wordmark `Visa<span>Prepper</span>` reads as one word.

### 2.1 Head metadata

| Field | "VisaPrepper" | "Visa Prepper" | Other | Notes |
|---|---|---|---|---|
| `<title>` | 45 occurrences on 44 pages | 3 on 3 pages | none | Template `%s \| VisaPrepper` (`app/layout.tsx:14`); homepage is absolute `VisaPrepper \| U.S. Visa Interview Practice & Document Checks`. Mixed titles: `/contact` "Contact Visa Prepper \| VisaPrepper", `/partners` "Visa Prepper Partner Program \| VisaPrepper", `/partners/apply` "Apply to the Visa Prepper Partner Program \| VisaPrepper". Brand repeated: `/how-it-works` "How VisaPrepper Interview Practice Works \| VisaPrepper". |
| `og:site_name` | 44/44 | 0 | none | From `SITE_NAME` (`lib/seo/metadata.ts:27`). |
| `og:title` / `twitter:title` | 2 (home, how-it-works) | 3 (contact, partners, partners/apply) | none | Both equal the page title without the template suffix (`buildPageMetadata`). |
| `og:image:alt` | 2 | 3 | none | Same string as og:title. The `alt` export in `app/opengraph-image.tsx` ("VisaPrepper — Complete AI video visa interview practice") is overridden by `buildPageMetadata`. |
| `meta description` (= og:description, twitter:description) | 3 (about, best-ai-visa-interview-tools, free-ai-visa-mock-interview-online) | **5** (contact, partners, privacy, refund-policy, terms) | none | All 8 are metadata-only strings. None is rendered visibly; checked against the page text. |
| `article:author` (20 posts) | 0 | 20 ("Visa Prepper Editorial Team") | none | Plain text. The OG spec expects a profile URL. |
| `og:image` | n/a | n/a | n/a | `https://visaprepper.com/opengraph-image` on 44/44. A 1200x630 PNG showing the "VisaPrepper" wordmark. |
| `application-name`, `apple-mobile-web-app-title`, `twitter:site` | absent | absent | absent | Not needed. Optional `application-name` = "VisaPrepper". |
| Favicon | n/a | n/a | n/a | `<link rel="icon" href="/icon.jpg">` and apple-touch-icon: the same square 1254x1254 logo, which meets Google's favicon rule (square, at least 8x8). `/favicon.ico` returns 404, which is harmless because the link tag exists. |

### 2.2 JSON-LD

| Field | Value or spelling | Pages |
|---|---|---|
| Organization.name | VisaPrepper | 44 |
| Organization.alternateName | ["Visa Prepper", "visaprepper.com"] | 44 |
| WebSite.name / alternateName | VisaPrepper / ["Visa Prepper", "visaprepper.com"] | 1 (home) |
| SoftwareApplication.name / alternateName | VisaPrepper / same | 1 (home) |
| Article.publisher.name | VisaPrepper (`@id` /#organization) | 20 |
| **Article.author.name** | **Visa Prepper Editorial Team** (no @id or url) | 20 |
| Service.name | "VisaPrepper AI video visa interview practice [in India/Pakistan]", "VisaPrepper application and document consistency checks" | 4 |
| Organization.description / SoftwareApplication.description / Offer.description / Article.description | "VisaPrepper" (all) | sitewide, home, home and 2 posts |
| Question.name (FAQ) | "Visa Prepper" 22 on 15 pages; "VisaPrepper" 3 on 3 pages | mirrors visible FAQ copy |
| Answer.text (FAQ) | "Visa Prepper" 26 on 11 pages; "VisaPrepper" 4 on 4 pages | mirrors visible FAQ copy |
| logo | `https://visaprepper.com/images/brand/visaprepper.jpg` (one URL everywhere) | 44 (+20 publisher) |
| sameAs | instagram.com/visaprepper/, tiktok.com/@visaprepper, facebook.com/visaprepper/ | 44 |

FAQ `Question`/`Answer` strings must keep matching the visible FAQ text. They can only change if the visible copy changes, which is out of scope.

### 2.3 Visible brand presentation (rendered HTML)

- **Header (every page):**
  - `<a aria-label="VisaPrepper home">` contains a decorative logo crop (`<img alt="">` inside an `aria-hidden` span) and the wordmark `Visa<span class="text-primary">Prepper</span>`. The wordmark renders as one two-tone word, **"VisaPrepper"** (`components/ui/Logo.tsx`, `components/layout/SiteHeader.tsx:15`).
  - The mobile menu dialog repeats it. Below 360px the wordmark text is hidden and the aria-label carries the name.
- **Footer (every page):** "© 2026 VisaPrepper. All rights reserved. VisaPrepper is an independent preparation tool…", the handle "@visaprepper" and hello@visaprepper.com.
- **Logo image** (`/images/brand/visaprepper.jpg`): the wordmark reads **"VisaPrepper"** (one word, capital P), with the tagline "PRACTICE TODAY. TRAVEL TOMORROW."
- **OG image:** reads **"VisaPrepper"**.
- **Body copy across the 44 pages:**
  - "VisaPrepper": about 186 occurrences on 44 pages, mostly from the template.
  - "Visa Prepper": about 124 occurrences on 34 pages. These are blog bylines (20), blog body and FAQ copy, visa-type pages, privacy and terms, the homepage and an alt and aria-label.
- **Homepage specifically** (relevant to site names):
  - h2 "Visa Prepper mobile apps are coming soon." (`components/marketing/MobileApps.tsx`)
  - h2 "Help your applicants prepare. Earn when they join Visa Prepper." (`app/page.tsx:105`)
  - FAQ "Will Visa Prepper help me get my visa?" (`lib/content/faq.ts:3`)
  - img alt "Visa Prepper — Practice today. Travel tomorrow." (`MobileApps.tsx:27`)
  - section aria-label "Visa Prepper AI video interview demonstration" (`app/page.tsx:71`)
  - The bridge sentence "VisaPrepper, also written Visa Prepper, brings document checks…" (`app/page.tsx:77`). `/about` has the same pattern.

### 2.4 Social profiles (HTTP fetch, 2026-11-21 about 11:17 UTC, no login)

| Profile (sameAs) | Result | Public display name |
|---|---|---|
| https://www.instagram.com/visaprepper/ | 200. The first request with a desktop-browser UA returned a generic error shell; the second, with the default curl UA, returned profile meta. | Title "**Visa Prepper** (@visaprepper) • Instagram photos and videos"; meta: 8 followers, 5 posts; bio "Practice before the real visa interview… English • Urdu • Hindi" |
| https://www.tiktok.com/@visaprepper | **Blocked**: WAF challenge page ("Please wait…"), no title | unknown |
| https://www.facebook.com/visaprepper/ | **Blocked**: desktop UA gave HTTP 400 "Error"; default UA gave a generic "Facebook" shell; m.facebook.com redirects to login | unknown |

### 2.5 Google's current site-name guidance

Source: https://developers.google.com/search/docs/appearance/site-names, "Last updated 2025-12-10", read 2026-11-21.

- **Where the markup goes:** `WebSite` structured data must be on the **home page**, meaning the domain or subdomain root. A site name is one per domain or subdomain; subdirectories are not supported, and `www` and `m` are treated as equivalent. The markup is not needed on other pages.
- **Required properties:**
  - `name`, the preferred site name.
  - `url`, the canonical home page, for example `https://example.com/`.
- **Recommended property:** `alternateName`, one or more names in order of preference. The **lowercase domain** (`example.com`) can be listed as a final fallback, and Google "strongly considers" it. Using the domain as `name` is a last resort.
- **Choosing a name:** unique, concise, commonly recognized, not generic, and "consistently across your home page". The system also considers `og:site_name`, `<title>`, heading elements and other home-page text, but `WebSite` structured data matters most.
- **Duplicates and redirects:**
  - Use the same structured data on duplicate home pages (http/https, www/non-www).
  - Keep the site-name properties in one WebSite node.
  - Make redirects work as intended. "If your page redirects to a page that's visible to Googlebot, the site name will reflect the redirect target."
- **Testing:** the Rich Results Test does **not** support site names. Use the Schema Markup Validator and URL Inspection. Recrawl takes days to weeks.
- **Organization link:** the Organization doc asks for the same `name` and `alternateName` as the site name. That is already the case here.

### 2.6 How Google currently shows the brand (lead's observations and `out/serp-observations.csv`)

- **"visaprepper"** (hl=en, gl=us):
  - The homepage is **absent** from page-1 web results and appears only in the Images strip.
  - `/terms`, `/features`, `/partners`, Instagram, `/pricing` and look-alike sites (visapro.com, vispera.co, the Google Play app "VisaPrepAI: US Visa Prep") are listed.
- **"visaprepper"** (gl=in): **Google auto-corrected the query to "visa prepper"** ("These are results for visa prepper / Search instead for visaprepper"). `/partners` ranked first.
- **"visaprepper"** (gl=pk and gl=ng): `/contact` ranked first. Its title, "Contact Visa Prepper | VisaPrepper", contains both forms. The homepage appears only in the Images strip.
- **"\"visa prepper\""**: an AI Overview describes the product. The homepage is last on page 1, with a Google-rewritten title link "**Visa Prepper**".
- **Interpretation (hedged):**
  - Google does not yet strongly recognize the one-word token as an entity. The India spelling correction and the fuzzy look-alike matches point that way.
  - On a navigational query it rewrote the homepage title link to the spaced form. The displayed **site name**, the label above the title link, was not recorded, so it is **unknown**.
  - None of this points to a schema defect. The WebSite and Organization markup is valid and consistent. Candidate causes for the missing homepage need URL Inspection in GSC (**unknown**): the duplicate homepage host (see 3.3) and the 307 redirect.

---

## 3. Recommendation

### 3.1 Preferred brand for Google's site name

**Keep `name: "VisaPrepper"` with `alternateName: ["Visa Prepper", "visaprepper.com"]`, in this order, on WebSite and Organization.** This keeps the October 2026 decision (`docs/seo-indexing-2026-10-19.md`), and the WebSite builder needs no change.

Reasons:
1. **Domain and logo.** `visaprepper.com` is one token. The logo image, the header wordmark (rendered as one word) and the OG image all read "VisaPrepper", and these cannot change under the no-design-change constraint. Picking "Visa Prepper" as `name` would conflict with the most prominent homepage brand signals: the header on every page and the footer copyright.
2. **Existing metadata already agrees.** `og:site_name` (44/44), the title suffix (44/44), the homepage title prefix and the Organization, WebSite and SoftwareApplication names all say "VisaPrepper". Switching would mean changing all of them about five weeks after the last switch, and every switch restarts Google's reprocessing.
3. **The spaced form is covered properly.**
   - "Visa Prepper" is the first `alternateName`, which Google "strongly considers" if it is not confident in the primary name.
   - The homepage and About copy explicitly say "VisaPrepper, also written Visa Prepper", which is visible evidence that both names refer to one entity.
   - `visaprepper.com` is the lowercase domain fallback, exactly as Google documents.
4. **Counter-evidence and why it does not change the call.**
   - Instagram's display name is "Visa Prepper".
   - Blog bylines, many FAQs and two homepage h2s use the spaced form.
   - Google auto-corrects to the spaced form in India and rewrote one homepage title link to it.
   - These are reasons to **keep "Visa Prepper" as the first alternate**, not to flip the primary name. If Google ends up displaying "Visa Prepper" as the site name, that is still an acceptable, owner-approved alternate.

Watch item: after deploying the hosting fixes in 3.3, check over 2–4 weeks (GSC not connected) whether the displayed site name settles. If Google keeps showing the bare domain or an unrelated name, Google's documented next step is already in place: alternates are present, including the domain. No `name` change is advised.

### 3.2 Metadata and schema edits needed for consistency (no visible copy, no design)

Every string below was checked as **not rendered visibly** on its page. Line numbers refer to `99dac01`.

| # | File:line | Current | Proposed | Visible? | Type | Priority |
|---|---|---|---|---|---|---|
| E1 | `lib/seo/json-ld.tsx:128-131` (`buildArticleJsonLd`) | `author: {"@type": <string-match>, name: post.author}` | `author: {"@type":"Organization","@id":"https://visaprepper.com/#editorial-team","name": post.author,"url":"https://visaprepper.com/about","parentOrganization":{"@id":"https://visaprepper.com/#organization"}}` for organization authors. Keep `name` exactly equal to the visible byline "Visa Prepper Editorial Team"; Google wants the markup to list the visible author. Using the homepage as `url` is also fine per Google's org-author example. | No (JSON-LD only) | schema-code | Medium |
| E2 | `lib/seo/json-ld.tsx:129` | `post.author === "Visa Prepper Editorial Team" ? "Organization" : "Person"` | Decide the type from an explicit map or set (for example `ORGANIZATION_AUTHORS = new Set(["Visa Prepper Editorial Team"])`) or a new optional front-matter field `authorType`, which is not rendered. A front-matter spelling change can then never silently produce `Person`. | No | schema-code | Low |
| E3 | `lib/seo/json-ld.tsx:120-142` | no `@id`, `url`, `isPartOf` or `image` | Add `"@id": "<post-url>#article"`, `"url": "<post-url>"`, `"isPartOf": {"@id":"https://visaprepper.com/#website"}` and `"image": [...]`. **Image option A** (no new design): `https://visaprepper.com/opengraph-image`, the existing 1200x630 brand card; weakly relevant. **Option B** (better, needs owner sign-off because it is a new image template): a per-post OG card that reuses the existing `opengraph-image.tsx` style with the post title. Pass the same URL as `ogImage` to `buildPageMetadata`, and verify the emitted URL after `next build`. Optionally switch `@type` to `BlogPosting`; Google supports both. | No | schema-code | Low |
| E4 | `app/contact/page.tsx:12-13` | title "Contact Visa Prepper"; description "…with the Visa Prepper team…" | title "Contact Us" (renders "Contact Us \| VisaPrepper"); description "…with the VisaPrepper team…" | No (H1 is "Get in touch") | metadata-code | Medium (see caution) |
| E5 | `app/partners/page.tsx:4` | title "Visa Prepper Partner Program"; description "…apply for the Visa Prepper partner program." | title "Partner Program" (renders "Partner Program \| VisaPrepper"); description "…apply for the VisaPrepper partner program." | No (H1 differs) | metadata-code | Medium (see caution) |
| E6 | `app/partners/apply/page.tsx:4` | title "Apply to the Visa Prepper Partner Program" | title "Apply to the Partner Program" (renders "… \| VisaPrepper") | No (H1 "Become a Visa Prepper partner." stays as visible copy) | metadata-code | Low |
| E7 | `app/how-it-works/page.tsx:11` | "How VisaPrepper Interview Practice Works" (brand appears twice once the suffix is added) | "How AI Visa Interview Practice Works", or whatever the title workstream chooses without the brand | No | metadata-code | Low |
| E8 | `app/privacy/page.tsx:9`, `app/refund-policy/page.tsx:10`, `app/terms/page.tsx:10` | descriptions begin "How Visa Prepper…", "Visa Prepper refunds…", "…use of the Visa Prepper website…" | Replace "Visa Prepper" with "VisaPrepper" | No | metadata-code | Low |
| E9 | `app/blog/[slug]/page.tsx:43` | `openGraph.authors: [post.author]` gives `article:author` = text | Optional: `authors: ["https://visaprepper.com/about"]`, since the OG spec expects a profile URL; or drop it | No | metadata-code | Low (Info) |
| E10 | `lib/seo/json-ld.tsx:21,57` | Organization.url and SoftwareApplication.url = `https://visaprepper.com` | `${SITE_URL}/` to match WebSite.url and `mainEntityOfPage`. Cosmetic; the root URLs are equivalent. Optionally give the Organization `logo` as `{"@type":"ImageObject","url":…,"width":1254,"height":1254}` in both places. | No | schema-code | Low |
| E11 | `app/document-checks/page.tsx:20` | Service without `@id` | add `"@id": "https://visaprepper.com/document-checks#service"` | No | schema-code | Low |
| E12 | `lib/seo/json-ld.tsx:15-29` (optional) | no `contactPoint` | Only if the owner confirms the number, which the code comment at `lib/config/site.ts` calls owner-supplied and unverified: `"contactPoint":{"@type":"ContactPoint","contactType":"customer support","email":"hello@visaprepper.com","telephone":"+1-732-518-8581"}`. Both values are already visible in the footer. | No | schema-code | Low |

**Caution on E4 and E5.** In the SERP observations, `/contact` and `/partners` are the URLs that currently rank #1 for "visaprepper" in pk, ng and in, and their titles contain both spellings. Removing "Visa Prepper" from those titles could change their ranking for the spaced or auto-corrected query, and the effect is **unknown**. If the owner does not want to risk owned results while the homepage is absent, then:
- Ship E8 and the description halves of E4 and E5 now.
- Defer the title halves of E4, E5 and E6 until the homepage shows for the brand query.
- These edits overlap with the title and meta workstream; coordinate them there.

**No change needed:**
- `lib/config/site.ts` (`SITE_NAME`, `SITE_ALTERNATE_NAMES`)
- `buildWebsiteJsonLd`
- `og:site_name`
- the title template
- the homepage title

Proposed Article builder (illustrative only; nothing was applied, because this workflow must not edit source):

```ts
const ORG_ID = `${SITE_URL}/#organization`;
const ORGANIZATION_AUTHORS = new Set(["Visa Prepper Editorial Team"]); // = visible byline, keep verbatim

export function buildArticleJsonLd(post: { title: string; description: string; slug: string; publishDate: string; updatedDate?: string; author: string; image?: string }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article", // or "BlogPosting"
    "@id": `${url}#article`,
    url,
    inLanguage: "en",
    headline: post.title,
    description: post.description,
    image: [post.image ?? `${SITE_URL}/opengraph-image`],
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.publishDate,
    author: ORGANIZATION_AUTHORS.has(post.author)
      ? { "@type": "Organization", "@id": `${SITE_URL}/#editorial-team`, name: post.author, url: `${SITE_URL}/about`, parentOrganization: { "@id": ORG_ID } }
      : { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/brand/visaprepper.jpg`, width: 1254, height: 1254 } },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: url,
  };
}
```

After deploying, check:
- The Schema Markup Validator (validator.schema.org) on `/` and one blog post.
- The Rich Results Test on one blog post (Article and Breadcrumb).
- GSC URL Inspection on `/`, followed by "Request indexing". GSC is not connected in this session, so the owner has to do this.

### 3.3 Hosting and config items that affect the brand and homepage signals (not schema)

| Item | Evidence (2026-11-21) | Recommendation |
|---|---|---|
| Duplicate homepage host | `https://visa-prepperation.vercel.app/` returns 200 with no `X-Robots-Tag`. It serves the same HTML: canonical points to `https://visaprepper.com`, same WebSite JSON-LD, and robots.txt allows all. `visa-prepperation-<team-alias>.vercel.app` already sends `x-robots-tag: noindex`. | In Vercel project domains, set `visa-prepperation.vercel.app` to **redirect (308) to `visaprepper.com`**, or at least serve `X-Robots-Tag: noindex`. Owner should also check `site:visa-prepperation.vercel.app` in Google (not run here). |
| www redirect is temporary | `https://www.visaprepper.com/` returns **307** to `https://visaprepper.com/` (http to https is already 308). | Make the www to apex redirect permanent (308) in Vercel domain settings. |
| `/favicon.ico` | 404. `<link rel="icon" href="/icon.jpg">` is present: square 1254x1254, crawlable. | Optional. Google uses the link tag; no action needed. |

### 3.4 Items that need visible-copy or off-site changes (owner decision; out of scope here)

- **Homepage headings and FAQ:** the h2s "Visa Prepper mobile apps are coming soon." and "…Earn when they join Visa Prepper." and the FAQ "Will Visa Prepper help me get my visa?" feed Google's site-name system, which considers headings and other home-page text. Aligning them to "VisaPrepper" would strengthen consistency. This needs a visible content change, so it is **not allowed** under the current constraints. The `alternateName` already covers the variant.
- **Blog byline** (front matter `author` in 20 MDX files, rendered by `BlogPostHeader`): "Visa Prepper Editorial Team". If the owner later allows it, "VisaPrepper Editorial Team" would remove the last spaced spelling from the entity graph. The JSON-LD must follow the visible byline, so do it in that order.
- **Accessibility strings:** img alt "Visa Prepper — Practice today. Travel tomorrow." and aria-label "Visa Prepper AI video interview demonstration". These are not visual, but they are page content in a component, so the owner decides.
- **Social and off-site:**
  - Consider renaming the Instagram display name to "VisaPrepper", which keeps the @visaprepper handle.
  - Confirm that the TikTok and Facebook `sameAs` URLs resolve to brand-owned public profiles; they could not be verified by anonymous HTTP. Remove any that do not exist.
  - Brand entity recognition is weak (the India auto-correction and the look-alike results, including a third-party Google Play app "VisaPrepAI"). Consistent "VisaPrepper" listings on reputable profiles would help: for example a LinkedIn company page, YouTube or Product Hunt. Add each to `sameAs` only after it is live.

---

## 4. Correction to the shared context (FAQ)

- **Shared context said:** "Google restricts FAQ rich results to authoritative government/health sites since 2023".
- **Current status (verified 2026-11-21 on https://developers.google.com/search/updates):**
  - **2026-05-08:** "Deprecating the FAQ rich result feature … This feature will no longer appear in Google Search starting May 7, 2026."
  - **2026-06-15:** "Removing documentation for the FAQ rich result feature … no longer shown in Google Search results."
  - `https://developers.google.com/search/docs/appearance/structured-data/faqpage` now redirects to the updates page.
- **Consequence:** the 29 FAQPage blocks are valid schema.org, but no site gets a Google rich result from them. Report them as Info and do not cite them as a rich-result opportunity.

---

## 5. What works (keep)

- One server-rendered JSON-LD block per entity. There are no client-side injection dependencies, and Google sees the markup in the raw HTML.
- Breadcrumb and FAQ markup is generated by the same components that render the visible UI, so markup and content cannot drift apart.
- A linked entity graph: `/#organization` is the publisher of `/#website`, `/#software` and Article, and the provider of each Service.
- Site-name markup follows Google's guidance:
  - WebSite is on the homepage only.
  - `name` matches `og:site_name` and the homepage title.
  - `alternateName` is ordered by preference, with the lowercase domain last.
  - Organization uses the same name and alternates.
- Article dates are consistent across JSON-LD, OG article tags, the visible byline and the sitemap `lastmod`. Headline equals the H1.
- No fabricated ratings or reviews, and no deprecated types (no HowTo, no SearchAction).
- The logo meets Google's logo guidance: at least 112px, crawlable and in a supported format. The favicon is a square image linked from the homepage.
