# Visa Prepper: technical and sitemap audit (2026-11-21)

**Target:** https://visaprepper.com/ (production branch `codex/marketing-readiness-2026-11-19` @ `99dac01`, deployed 2026-11-21)
**Tool:** Claude SEO plugin v2.6.2 (github.com/AgriciDaniel/claude-seo @ `468ed5b`). The runtime `doctor` check reported "Runtime: ready, Python 3.12, Chromium: ready".
**Skill and agent docs followed:** `skills/seo-audit/SKILL.md`, `agents/seo-technical.md`, `agents/seo-sitemap.md`, `agents/seo-performance.md`, `agents/seo-visual.md`
**Data limits:** Google Search Console, CrUX and GA4 were not available. The keyless PageSpeed Insights API returned HTTP 429 on all 8 attempts. No ranking, search volume or field Core Web Vitals values are stated here. Anything I could not observe is marked "unknown".
**Browser sandbox:** every Playwright render and screenshot reported `"sandbox": true`, and my own lab scripts launched Chromium with `chromium_sandbox=True`. The browser sandbox was never disabled.
**Prompt-injection check:** no fetched page, SERP, sitemap or third-party file contained text that addressed the agent.

## Crawl scope

| Item | Value |
|---|---|
| Crawl window (UTC) | Site crawl 11:11:46 to 11:12:37. Variant and host checks 11:16:10 to 11:17:15. External links 11:18:23 to 11:19:11. PSI attempts 11:11 to 11:30 |
| Seed and method | BFS from `https://visaprepper.com/` following every internal `<a href>`, robots.txt respected, at most 500 pages, 1 request per second, no automatic redirects (each chain recorded hop by hop), UA `Mozilla/5.0 (compatible; tech-seo-audit/1.0)` |
| Pages found by the crawl | 44, all HTTP 200 |
| Live sitemap URLs | 44 (`sitemap.xml`, a single urlset of 7,069 bytes) |
| Repo routes | 45: 18 static `app/**/page.tsx` routes, 6 visa-type slugs, 20 blog slugs and 2 practice countries. `/start` is the only route outside the sitemap |
| Union inventory | 45 URLs, in `out/url-inventory.csv` |
| URL variants and other hosts probed | 40, in `out/crawl/variants.json` |
| Unique external links checked | 27, in `out/crawl/external_links_status.json` |
| Claude SEO scripts used | `sitemap_discovery.py --expand`, `render_page.py` (homepage mobile and the app root), `capture_screenshot.py` (mobile), `page_checks.py` (/, /terms, /features), `preload_check.py`, `pagespeed_check.py` (rate-limited), `domain_history.py` |

**Coverage:** the crawl reached exactly the 44 sitemap URLs. No crawled URL is missing from the sitemap, and no sitemap URL was missed by the crawl. The only orphan is `/start`: it has zero inbound internal links, it is not in the sitemap, and it serves `noindex, follow`. That is intended (`app/start/page.tsx:6`).

## Scores (Claude SEO categories)

| Category | Score | Basis |
|---|---|---|
| Technical SEO | **78/100** | On-site basics are clean. The points lost are mostly hosting issues: the www 307, an indexable vercel.app duplicate, and an app subdomain with no robots.txt or noindex. |
| Sitemap | **95/100** | Valid, complete and matches the crawl. lastmod was not refreshed for the 2026-11-21 edits, and changefreq/priority are present but ignored by Google. |
| Performance (CWV) | **Not scored from PSI** | PSI returned 429 and field data is unknown. My local throttled lab approximation shows CLS 0 and low TBT. LCP was 1.6 to 2.6 s on 5 of 7 pages and 2.8 to 3.1 s on /terms and /pricing. |

## Findings, most severe first

There are no Critical findings: nothing blocks indexing.

### TECH-01 · High · owner-action: the homepage is missing from page-1 web results for "visaprepper" (investigation)

Observed symptom (lead's SERP check, 2026-11-21): page 1 showed /terms first, then /features, /partners and /pricing. The homepage appeared only in the Images strip, which means it is probably indexed but not ranking for the navigational query.

Server-side comparison (this crawl):

| Signal | `/` | `/terms` | `/features` |
|---|---|---|---|
| `<title>` | `VisaPrepper \| U.S. Visa Interview Practice & Document Checks` (60 chars, brand first) | `Terms of Service \| VisaPrepper` | `Visa Interview Practice & Document Checks \| VisaPrepper` |
| H1 | `Your U.S. visa interview starts with better preparation.` (no brand) | `Terms of Service` | `Everything you need to prepare for the real interview.` |
| Canonical | `https://visaprepper.com` (self) | self | self |
| Server-rendered words (page_checks) | 5,671 | 825 | 323 |
| Brand mentions in `<main>` ("VisaPrepper" + "Visa Prepper") | 9 in 5,638 words (0.16%) | 11 in 789 words (1.4%) | 0 in 289 words |
| Decoded HTML / gzip transfer | 338,417 B / 36,617 B | 61,294 B / 12,391 B | 64,776 B / 11,662 B |
| Inline RSC payload | 130,252 B | 30,080 B | 31,911 B |
| DOM nodes (raw / after load) | 1,166 / 1,560 | 218 / 251 | 220 / 263 |
| JSON-LD | Organization, SoftwareApplication+Offer, WebSite, FAQPage (12 Q) | Organization, BreadcrumbList | Organization, BreadcrumbList |
| Pages linking in | 44 (logo `aria-label="VisaPrepper home"` + 40 "Home" breadcrumbs) | 44 (footer "Terms") | 44 (header "How It Helps" twice + footer "What you get") |
| Rendering | SSR. Raw and rendered differ by 1 word (5,755 vs 5,754) | SSR | SSR |
| Googlebot UA | Same title and canonical as a normal browser (HTTP 200) | Same | Same |

Hypotheses. GSC is unavailable, so none of these is confirmed.

1. **Canonical-host split.** `https://www.visaprepper.com/` returns a *temporary* 307 to the apex (TECH-02), and has done since at least 2026-10-19 (`docs/seo-indexing-2026-10-19.md:45-48`). `https://visa-prepperation.vercel.app/` serves the byte-identical 338,417-byte homepage with no X-Robots-Tag, relying only on a cross-domain canonical (TECH-03). Google treats a 307 and a cross-domain canonical as weak signals. Google may therefore have chosen a different homepage canonical, or still be consolidating.
2. **New domain and an ambiguous brand string.** WHOIS shows the domain was created on 2026-09-06, so it was 76 days old on audit day (`domain_history.py`). The same SERP shows visapro.com, vispera.co and a "VisaPrepAI" Play app. Google may not yet read "visaprepper" as a navigational entity query. It may instead rank pages by term match, which favours /terms (1.4% brand density) over the long homepage (0.16%).
3. **Topic dilution on the homepage.** The homepage has 5,600+ words across 20 H2 sections covering pricing, FAQ, languages, partners, testimonials and samples. The brand appears in the title and the eyebrow but not in the H1.
4. **Re-processing after repeated edits.** The homepage changed on 2026-11-04 and twice on 2026-11-18 (commits `e4d334b`, `171c677`, `5fb00cd`), with a production deploy on 2026-11-21.
5. **Conflicting brand signals on the same domain.** The app subdomain serves `<title>VisaPrepper</title>` but describes itself as "VisaPrep… applicants from Pakistan, India, and Bangladesh" on every URL (TECH-04).

Recommendation:
- (owner-action) In GSC URL Inspection, record the "Google-selected canonical", last crawl and indexing state for `https://visaprepper.com/`, `https://www.visaprepper.com/` and `https://visa-prepperation.vercel.app/`.
- (hosting-config) Fix TECH-02 and TECH-03 first, then "Request indexing" for `/`.
- (metadata-code) The homepage title is already brand-first; leave it until GSC shows which canonical Google chose.
- The H1 and copy are visible content and outside the owner's allowed scope (content-change-not-allowed).

### TECH-02 · High · hosting-config: www to apex uses a temporary 307, and http://www takes two hops

```
https://www.visaprepper.com/        -> 307 https://visaprepper.com/ -> 200
https://www.visaprepper.com/pricing -> 307 https://visaprepper.com/pricing -> 200
http://www.visaprepper.com/         -> 308 https://www.visaprepper.com/ -> 307 https://visaprepper.com/ -> 200
```

The same issue was already flagged as a hosting follow-up in `docs/seo-indexing-2026-10-19.md:45-48` and `docs/seo-implementation-2026-11-04.md:28`. It is still live on 2026-11-21.

Fix: in Vercel → Project → Domains, set `www.visaprepper.com` to redirect to `visaprepper.com` with **308 Permanent**, preserving path and query. Afterwards, recheck with `curl -sI https://www.visaprepper.com/`. This is not an app-code fix, because Vercel applies the domain redirect before Next.js runs.

### TECH-03 · Medium · hosting-config: the production vercel.app host is an indexable duplicate

| Host | Status | X-Robots-Tag | Canonical | robots.txt |
|---|---|---|---|---|
| `https://visa-prepperation.vercel.app/` | 200 (same 338,417 B HTML) | *(none)* | `https://visaprepper.com` | `Allow: /`, Sitemap → visaprepper.com |
| `https://visa-prepperation.vercel.app/pricing` | 200 | *(none)* | `https://visaprepper.com/pricing` | same |
| `https://visa-prepperation-<team-alias>.vercel.app/` | 200 | `noindex` | `https://visaprepper.com` | (also `noindex`) |

The cross-domain canonical is the only protection for the production alias, and a canonical is a hint. The git-branch alias was not probed because its hostname was not supplied, so its state is unknown.

Fix: in Vercel Domains, redirect `visa-prepperation.vercel.app` to `visaprepper.com` with 308. If that is not possible, add a host-conditional `X-Robots-Tag: noindex` header in project hosting config (`vercel.json` `headers` with `has: [{type: "host", ...}]`).

### TECH-04 · Medium · owner-action: the app subdomain (private applicant area) is indexable, returns soft-404s, has no robots.txt, and uses a different brand name

Every path returns the same 910-byte SPA shell with HTTP 200. None of them sends meta robots, X-Robots-Tag or a canonical:

```
https://app.visaprepper.com/            200 text/html 910 B  xrt=''  canonical=[]
https://app.visaprepper.com/login       200 (same shell)
https://app.visaprepper.com/signup      200 (same shell)
https://app.visaprepper.com/dashboard   200 (same shell)
https://app.visaprepper.com/robots.txt  200 text/html (the shell, not robots rules)
https://app.visaprepper.com/sitemap.xml 200 text/html (the shell)
https://app.visaprepper.com/zz-nonexistent-<ts> 200 text/html
```

The shell's `<head>` (fetched 2026-11-21 11:17 UTC) contains `<title>VisaPrepper</title>` alongside `og:title "VisaPrep"` and the meta description "VisaPrep helps applicants from Pakistan, India, and Bangladesh prepare for U.S. visa interviews…". After rendering (`render_page.py --mode always`, sandbox true), the title becomes "Sign in | VisaPrepper" and the H1 "Welcome back". There is still no robots meta and no canonical.

Every marketing page links to `https://app.visaprepper.com` through its CTAs (135 "Start Free" links and 90 "Log In" links across the crawl), so Google will discover this subdomain. Whether any app URL is indexed is unknown, because no site: query was run.

Fix (in the separate app project, not this repo):
- Serve real `text/plain` robots.txt.
- Return 404 for unknown routes.
- Send `X-Robots-Tag: noindex` for authenticated and app routes (at least everything except, optionally, `/login`).
- Align the shell metadata to "VisaPrepper" and the worldwide audience.

### TECH-05 · Medium · content-change-not-allowed: blog "Published" dates are earlier than the domain's registration

WHOIS (via `domain_history.py`, registrar NameCheap) gives a creation date of **2026-09-06**, and the repo's first commit (`3e36b55`) is also 2026-09-06. Yet 12 posts display and declare publish dates in Jan–Feb 2026. Each one appears in `publishDate` frontmatter (line 5 or 6), in visible "Published …" text (`components/blog/BlogPostHeader.tsx:20`), in `Article.datePublished` and in the `article:published_time` meta. The affected posts are: 214b (2026-01-20), b1-b2-visa-interview-questions (01-14), ds-160 (01-16), f1-questions-and-answers (01-12), h1b (01-22), h4 (01-24), j1 (01-26), mock-visa-interview-online (02-03), documents-checklist (01-18), bangladesh (02-01), india (01-30) and pakistan (01-28). Each file was first added on 2026-09-06.

Possible causes:
- Unverifiable or backdated dates weaken trust signals (Google asks for accurate byline dates).
- The content may have been published elsewhere earlier. That is unknown, and the owner should confirm it.

Fix: the owner decides. Correcting the dates changes visible content, which is outside the allowed scope. Do not change only the JSON-LD dates, because they must match the visible dates.

### TECH-06 · Medium · owner-action: about 535 KB of web fonts preloaded on every page, including about 394 KB of non-Latin fonts

Each crawled page carries 5 `<link rel=preload as=font>` tags. The same 554 KB of link-initiated transfer appeared in the lab run of every page.

| Font | Bytes |
|---|---|
| Noto Sans Arabic | 166,152 |
| Fraunces | 120,800 |
| Noto Sans Devanagari | 120,232 |
| Noto Sans Bengali | 107,884 |
| Figtree | 20,184 |

Source: `lib/fonts.ts:24-42` @99dac01 defines `notoUrdu`, `notoHindi` and `notoBengali` with the default `preload: true`. The comment at `lib/fonts.ts:22-23` says they are "not loaded globally", but they are preloaded globally.

On slow mobile networks these preloads compete with CSS and JS. The local lab showed FCP = LCP (text) of 1.9–3.1 s under 1.6 Mbps / 150 ms RTT / 4x CPU throttling.

Fix: `preload: false` on the three Noto fonts. The font rendering does not change. This is a code change outside the metadata-only scope, so it needs owner approval.

### TECH-07 · Info · owner-action: PageSpeed Insights and CrUX unavailable (rate-limited)

`pagespeed_check.py --strategy mobile` returned "PSI rate limit exceeded. No API key was used…" for:
- `/`: 11:11:44, 11:19:30, 11:22:02 and 11:30 UTC
- `/visa-interview-practice`: 11:22:19
- `/blog/f1-visa-interview-questions-and-answers`: 11:22:35
- `/visa-types/f1`: 11:22:50
- `/pricing`: 11:23:06

As a result, the Lighthouse score, field LCP/INP/CLS and whether CrUX has data are all **unknown**.

Fallback: local lab approximation (`out/crawl/psi/lab_vitals_mobile.json`). This is **not** Lighthouse. Settings: Playwright Chromium, 412×823 at DPR 2.625, 4x CPU, 150 ms RTT, 1.6 Mbps down, cache disabled, one run per URL, from a network served by Vercel's bom1 edge.

| URL | TTFB | FCP | LCP (element) | CLS | TBT approx |
|---|---|---|---|---|---|
| / | 396 ms | 1,912 ms | 1,912 ms (hero `<p>`) | 0 | 57 ms |
| /visa-interview-practice | 425 | 1,904 | 1,904 (`<p>`) | 0 | 32 |
| /blog/f1-visa-interview-questions-and-answers | 1,140 | 2,552 | 2,552 (`<p>`) | 0 | 34 |
| /visa-types/f1 | 358 | 1,568 | 1,568 (`<p>`) | 0 | 27 |
| /pricing | 359 | 3,128 | 3,128 (H1) | 0 | 37 |
| /terms | 460 | 2,808 | 2,808 (`<p>`) | 0 | 32 |
| /features | 385 | 2,060 | 2,060 (H1) | 0 | 32 |

INP cannot be measured in the lab. Fix: rerun with a Google API key, or read the GSC Core Web Vitals report.

### TECH-08 · Low · metadata-code: 12 titles exceed about 60 characters (truncation risk)

The template ` | VisaPrepper` (14 chars, `app/layout.tsx:14`) is appended to every title.

| URL | Length | Source (metadata-only) |
|---|---|---|
| /blog/mock-visa-interview-online | 77 | no `seoTitle`, so it falls back to the visible `title` (`content/blog/mock-visa-interview-online.mdx:2`). Add `seoTitle`. |
| /blog/us-visa-interview-questions-bangladesh | 72 | `…-bangladesh.mdx:2`. Add `seoTitle`. |
| /blog/ds-160-interview-consistency | 70 | `ds-160-interview-consistency.mdx:2`. Add `seoTitle`. |
| /blog | 69 | `app/blog/page.tsx:11` (metadata only; the visible H1 at :35 is different) |
| /blog/214b-visa-refusal-guide | 68 | `seoTitle` at `:3` |
| /blog/f1-visa-interview-who-will-pay | 66 | `:2`. Add `seoTitle`. |
| /blog/visa-interview-follow-up-questions | 65 | `:2`. Add `seoTitle`. |
| /blog/f1-visa-mock-interview-online-7-day-plan, /blog/us-visa-interview-preparation-any-country, /blog/visa-interview-nervous-forget-answer | 64 each | `seoTitle` at `:3` |
| /blog/free-ai-visa-mock-interview-online | 63 | `seoTitle` at `:3` |
| /blog/best-ai-visa-interview-tools | 61 | `seoTitle` at `:3` |

`seoTitle` feeds only `<title>` and OG (`app/blog/[slug]/page.tsx:32` @99dac01), so changing it is safe. There are no duplicate titles across the 45 URLs.

### TECH-09 · Low · metadata-code: 4 meta descriptions exceed 160 characters

| URL | Length | Notes |
|---|---|---|
| /document-checks | 171 | `app/document-checks/page.tsx:15`, metadata only (the visible description at :23 is different text) |
| /blog/us-visa-interview-preparation-any-country | 167 | Blog `description` is rendered visibly (`components/blog/BlogPostHeader.tsx:13`), and production `app/blog/[slug]/page.tsx:33` uses `post.description` |
| /blog/h4-visa-interview-questions | 165 | same |
| /blog/f1-visa-interview-who-will-pay | 161 | same |

The three blog posts need a new SEO-only frontmatter field. That field must also be added to the zod schema in `lib/content/posts.ts`, because `z.object` drops unknown keys.

Note: the working tree of the clone now has uncommitted edits to `app/blog/[slug]/page.tsx` and `lib/content/posts.ts`, made by another workflow step, not by this audit. Line numbers above refer to `99dac01`.

The 3 shortest descriptions are /terms (91), /start (102, noindex) and /contact (108). They are acceptable.

### TECH-10 · Low · sitemap-robots-code: lastmod not refreshed after the 2026-11-21 release; changefreq/priority present

`sitemap_discovery.py --expand` results: valid urlset, 44 URLs, 40 with lastmod, 0 invalid, `lastmod_identical_share` 0.85 (most common value 2026-11-17).

The 2026-11-17 cluster matches a genuine site-wide release (commit `171c677`, 2026-11-18 00:18 +0500), so it is accurate. However, commit `99dac01` (2026-11-21) changed check-scope wording on `/document-checks`, including the FAQ "On bundle-supported routes… U.S. Checks require one route-specific application PDF per Check". That page's lastmod is still `2026-11-17` (`lib/seo/content-dates.ts:8`). The other edits in that commit were one-line access-instruction tweaks.

Fix: set `/document-checks` to `2026-11-21`, but only if the owner considers the change substantive. The 4 URLs without lastmod (/partners, /partners/apply, /contact, /refund-policy) are omitted by design (`lib/seo/content-dates.ts:1-2`). `changefreq` and `priority` (`app/sitemap.ts:11-42`) are ignored by Google (Info).

### TECH-11 · Low · metadata-code: the root layout sets canonical "/", which 404s inherit

```
https://visaprepper.com/this-page-does-not-exist -> 404, <meta robots noindex>, canonical https://visaprepper.com
(same for /PRICING, /Blog, /visa-types/F1, /index.html, /favicon.ico, /llms.txt, /visa-interview-practice/bangladesh)
```

Source: `app/layout.tsx:22-24` (`alternates: { canonical: "/" }`). Every live page overrides this through `buildPageMetadata` (`lib/seo/metadata.ts:19-21`). Any future page that forgets to set its own canonical would silently canonicalize to the homepage. Impact today is low because 404s are noindex.

Fix: remove the root-level canonical, since all pages already set their own.

### TECH-12 · Low · hosting-config: `/index` serves a 200 duplicate of the homepage

`https://visaprepper.com/index` → 200, 338,417 B, canonical `https://visaprepper.com`. It is not linked internally.

Fix: a 308 redirect from `/index` to `/` in hosting config.

### TECH-13 · Low · hosting-config: security headers are minimal

Every HTML response from visaprepper.com sends only `strict-transport-security: max-age=63072000`, without includeSubDomains or preload. These headers are absent:
- content-security-policy
- x-content-type-options
- x-frame-options (or frame-ancestors)
- referrer-policy
- permissions-policy

HTML also carries `access-control-allow-origin: *`. `next.config.ts:3` is empty and there is no `vercel.json`.

Fix: add the headers in Vercel or `vercel.json` hosting config. They are not a ranking factor.

### TECH-14 · Low · metadata-code: no `max-image-preview:large`

No page sends a robots meta. That keeps the default index/follow, but Google may then show only small image previews in Discover and Search.

Fix: add `robots: { "max-image-preview": "large" }` to the root metadata (`app/layout.tsx:10-25`). Keep `/start` noindex.

### TECH-15 · Low · schema-code: structured-data gaps visible from the crawl

JSON-LD parsed on all 45 URLs with 0 errors. The gaps are:
- `Article` has no `image` (`lib/seo/json-ld.tsx:112-140`).
- The homepage `<video>` (`/video/visaprepper-ai-video-interview.mp4`, 2,800,907 B, poster 73,254 B, `preload="none"`) has no `VideoObject`.
- `/pricing` carries only Organization, with no Offer or Product (`app/pricing/page.tsx:4`).
- All 45 pages share one OG image (`/opengraph-image`).

FAQPage rich results are limited to government and health sites, so the FAQ markup is harmless but will not produce rich results. Details belong to the schema audit.

### TECH-16 · Low · content-change-not-allowed: three visa-type pages are thinly linked

Maximum click depth from `/` is 2 (21 URLs at depth 1, 22 at depth 2). However:
- `/visa-types/h1b`, `/h4` and `/j1` each have only **2** linking pages (`/visa-types` and the matching blog guide).
- `/visa-types/family-immigrant` has 4.
- `/partners/apply` has 2 (`/`, `/partners`).
- Three blog posts have 3 each (214b, best-ai-visa-interview-tools, mock-visa-interview-online).

Neither the homepage nor `/visa-interview-practice` links to any `/visa-types/*` page.

Fix within the owner's rules: make new blog posts link to these pages.

### TECH-17 · Low · content-change-not-allowed: fixed UI covers 17% of the mobile viewport

At 375×812, the sticky header (73 px) plus the fixed "WhatsApp help" rail (63 px) cover 136 px. The screenshot `out/screenshots/home_mobile.png` shows the rail overlapping the secondary hero CTA "Explore interview practice" on first paint. This is not an intrusive interstitial in Google's sense.

Other mobile results:
- No horizontal overflow (scrollWidth 375 = clientWidth 375).
- Body font 16 px.
- H1 at y = 185–346 px, and the primary CTA "Check my documents free" is visible.

This would be a design change, so it is a note only.

### TECH-18 · Low · content-change-not-allowed: homepage weight

The homepage HTML is 338,417 B decoded (36,617 B gzip), of which 130,252 B is the inline RSC payload. DOM is 1,166 nodes raw and 1,560 after load, above Lighthouse's roughly 1,400-node failure level. Text is 5,671 words.

| Template | Median decoded HTML |
|---|---|
| Static pages | 64,331 B (max 100,626) |
| Blog posts | 106,094 B |
| Visa-type pages | 79,773 B |
| Practice-country pages | 82,571 B |

There is no crawl-limit risk (Google's limit is 15 MB). This is diagnostic and feeds TECH-01 hypothesis 3.

### TECH-19 · Info · none: favicon

`/favicon.ico` returns 404. The declared icon `/icon.jpg` (via `app/layout.tsx:18-21`) is a 1254×1254 JPEG of 93,949 B, which is square and acceptable. `/favicon.ico` is optional.

### TECH-20 · Info · none: external links

27 unique external links were checked once each (HEAD, then a browser-UA GET as fallback):
- 0 confirmed broken.
- 11 returned **403 to automated clients** (travel.state.gov ×10 and ceac.state.gov/GenNIV). This looks like bot protection and is unverified, not broken; spot-check them in a normal browser.
- 200: app.visaprepper.com, three usembassy.gov visa pages, www.usembassy.gov, Instagram, TikTok, permito.ai ×2, visaisle.com, visaz.app ×2, visainterview.ai and visamind.com ×2.
- Redirects: wa.me → api.whatsapp.com and facebook.com → web.facebook.com, both normal.

### TECH-21 · Info · content-change-not-allowed: homepage wording drifted from the 11-21 release

`app/page.tsx:58` still says International applicants can select “Other” in the app. Commit `99dac01` changed other pages and posts to “Another country”. Flag to the owner; no change was made here.

### TECH-22 · Info · none: `/llms.txt` returns 404 (handed to the GEO audit).

## What works

- **robots.txt:** `text/plain` 200. Contents: `User-Agent: * / Allow: / / Disallow: /api/ / Disallow: /admin/ / Sitemap: https://visaprepper.com/sitemap.xml`. No AI crawler is blocked.
- **Sitemap:** single valid urlset (44 URLs, 7,069 B, 0 duplicates, 0 cross-host, 0 invalid locs). All 44 URLs return 200, are self-canonical and are indexable, with no redirects and no noindex. It matches the crawl 1:1.
- **Status codes:** all 44 crawled pages return 200. API probes: `/api/checkout-entry` returns 503 JSON and `/api/partners` returns 405, both disallowed in robots and not linked. `/admin/` gives 308 then 404. `/start` is 200 with `noindex, follow` and is excluded from the sitemap.
- **Redirect hygiene:**
  - http→https is a 308.
  - Trailing-slash URLs (`/pricing/`, `/blog/`, `/visa-types/f1/`, `/sitemap.xml/`) 308 to the slashless form.
  - Uppercase URLs return a real 404 with noindex.
  - Query strings (`/pricing?utm_source=test`, `/?ref=test`) keep a self-canonical.
  - Unknown blog, visa-type and country slugs return a real 404 (`dynamicParams = false` on countries).
- **On-page:** 1 title, 1 meta description, 1 canonical and 1 H1 on all 45 URLs. No duplicate titles, descriptions or H1s. `lang="en"`, viewport, OG and Twitter cards present, and `og:url` equals the canonical everywhere.
- **Rendering:** server-side. `render_page.py` reported js_gap of 5,755 raw vs 5,754 rendered words, with identical links and schema types. Googlebot UAs receive the same title and canonical.
- **hreflang:** valid reciprocal cluster (en, en-IN, en-PK, x-default) on `/visa-interview-practice`, `/india` and `/pakistan`. Each page self-references and all targets return 200. Native-script snippets carry `lang="hi"`, or `lang="ur"` with `dir="rtl"`.
- **Internal linking depth:** maximum click depth 2. Every sitemap URL has 2 or more linking pages.
- **Hosts:** the team vercel.app alias sends `X-Robots-Tag: noindex`.
- **Mobile and lab results:** no horizontal scroll and CLS 0. LCP elements are text, not images. The video uses `preload="none"` with a poster. Only 2 distinct `<img>` sources exist (logo and Play badge), all with alt attributes and dimensions. `page_checks.py` reported 0 findings on /terms and /features, and 1 false positive on / (a "first image lazy" warning on the Google Play badge far below the fold, while the LCP is text).

## Raw data

All raw data is under `<scratch>/out/`:

- `url-inventory.csv` (45 rows, the requested columns)
- `crawl/pages.json` (per-URL headers, chain, parsed head, anchors, images, JSON-LD) and `crawl/html/` (raw HTML)
- `crawl/inventory_analysis.json` (duplicates, orphans, inbound breakdown by header, footer and main) and `crawl/click_depth.json`
- `crawl/sitemap_discovery.json`, `crawl/sitemap.xml`, `crawl/robots.txt` and their `.headers` files
- `crawl/variants.json` (40 URL variants and hosts) and `crawl/app/` (app shell raw HTML, rendered HTML, render JSON)
- `crawl/external_links_status.json` and `crawl/external_links_sources.json`
- `crawl/psi/` (PSI 429 responses, `psi_attempts.log`, `lab_vitals_mobile.json`, `preload_home.json`)
- `crawl/render/` (homepage mobile render JSON, rendered HTML, JSON-LD) and `crawl/page_checks/`
- `crawl/mobile_layout.json` and `crawl/domain_history.json`
- `screenshots/home_mobile.png`, `screenshots/home_mobile_full.png`, `screenshots/blog-f1-questions_mobile.png`
- `crawl/technical_findings.json` (structured findings)

Scripts: `scratchpad/scripts/{tech_crawl,build_inventory,variant_checks,ext_check,lab_vitals,mobile_layout}.py`.
