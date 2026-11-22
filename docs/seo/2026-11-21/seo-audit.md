# VisaPrepper SEO audit (2026-11-21)

Prioritized audit of https://visaprepper.com in the Claude SEO report structure. Every finding in the prioritized table was confirmed by two verifiers (live reproduction, and source or root cause). Items that were not confirmed are listed under [Not reproduced](#not-reproduced-or-not-in-the-verified-set). This report itself changed no repo source file; the separate metadata implementation is tracked in [Implementation status](#implementation-status-as-of-2026-11-21-metadata-plancsv-ids).

Owner constraints applied: no changes to visible page content and no design changes. Allowed now: SEO metadata (titles, meta descriptions, OG/Twitter, canonical, robots directives, sitemap, JSON-LD) and new blog posts in the existing MDX format.

**Status update, 2026-11-21 (later the same day).** This report was first written from the live audit of production (99dac01, with 1656169 live). It now also records:

1. The Search Console readout that the lead took read-only on 2026-11-21 in the owner's signed-in Chrome, at the owner's request: [Search Console readout](#search-console-readout-2026-11-21). Files: `evidence/gsc/`.
2. The status of every metadata-plan.csv row, using the current ids: [Implementation status](#implementation-status-as-of-2026-11-21-metadata-plancsv-ids).
3. A status for every finding (TECH-01 to TECH-22, SB-01 to SB-14) and every schema-brand.md item (E1-E12): [Finding status register](#finding-status-register-2026-11-21).
4. App and content contradictions the owner should know about: [Product truth alerts for the owner](#product-truth-alerts-for-the-owner).

The implemented changes sit in the clone's working tree (branch seo/metadata-2026-11-21), uncommitted and not deployed. The live findings and the scores below therefore still describe production. Owner rules for today: SEO metadata and structured data plus new blog posts only; no visible content or design changes; no date changes; fonts stay as they are.

## Executive summary

**SEO Health Score: 73/100** (73.02 before rounding), computed with the Claude SEO weights.

| Category | Weight | Score | Weighted points | Why this score |
|---|---|---|---|---|
| Technical SEO | 22% | 78 | 17.16 | On-site crawl and index basics are clean. Points are lost to hosting-side canonical signals (www 307, an indexable vercel.app duplicate), an app subdomain that answers 200 on every path with no robots rules, the brand-SERP anomaly (homepage indexed but absent from clean page-1 results for 'visaprepper'), and small items (root canonical on 404s, /index duplicate, stale lastmod, minimal security headers, no max-image-preview). |
| Content Quality | 23% | 62 | 14.26 | Substantial server-rendered guides (about 1,100-2,200 words per blog page including navigation) and complete contact and legal pages. For visa and immigration advice, trust signals are weak: an organization-only byline with no named expert or reviewer, 12 posts with publish dates earlier than the domain (TECH-05), a 76-day-old domain, 14 of 20 posts flagged for a policy-currency refresh (blog-inventory.csv), and single-source copy-versus-app contradictions (see Not reproduced). |
| On-Page SEO | 20% | 80 | 16.00 | Exactly one title, meta description, canonical and H1 on every URL, with no duplicates. Deductions for 12 long titles, 4 long descriptions, mixed brand spelling in metadata, a brand-repeating title and thinly linked h1b/h4/j1 visa-type pages. |
| Schema / Structured Data | 10% | 82 | 8.20 | Technically clean and policy-safe: 0 errors on 44/44 pages, a linked @id graph, and markup that matches visible content. Deductions for the unlinked Article author, Article without image/@id/url/isPartOf, fragile author typing, no contactPoint and small URL/logo inconsistencies. |
| Performance (CWV) | 10% | 70 | 7.00 | Provisional and lab-only: the keyless PSI API returned HTTP 429 on all 8 attempts and CrUX field data is unknown. A local throttled lab approximation (not Lighthouse) showed CLS 0, TBT about 27-57 ms and text LCP 1.6-3.1 s (/pricing 3.1 s, /terms 2.8 s). Deductions for 535 KB of font preloads on every page and a 338 KB, 1,560-node homepage. |
| AI Search Readiness | 10% | 65 | 6.50 | No dedicated seo-geo or seo-agentic pass ran in this workflow, so this is scored from crawl and schema evidence. Positives: open robots.txt, question-led content in the initial HTML, a consistent Organization/WebSite entity, and an AI Overview that described the product for '"visa prepper"' (lead, 2026-11-21). Negatives: a weak brand entity (look-alike results, homepage not ranking for the bare brand), unverifiable TikTok and Facebook sameAs, off-brand app shell metadata ('VisaPrep'), no named experts or third-party citations, and /llms.txt 404 (not a Google signal). |
| Images | 5% | 78 | 3.90 | Very few images: only 2 distinct `<img>` sources (logo and Google Play badge), both with alt text and dimensions, and the LCP is text. Deductions for one generic OG image shared by all URLs, no article images (SB-04) and a 93,949 B 1254x1254 JPEG used as favicon and apple-touch icon. |
| **Total** | 100% | | **73.02** | |

- **Business type:** SaaS / online service. AI video visa mock interviews and document checks for U.S. visa applicants worldwide, sold as a web app. No local-business or e-commerce signals.
- **Findings (unique):** Critical 0, High 0, Medium 6, Low 15, Info 4. SB-02 duplicates TECH-02 plus TECH-03 and is merged into them. Nothing blocks indexing: every sitemap URL returns 200, is server-rendered, self-canonical and indexable. The status of each id on 2026-11-21 is in the [Finding status register](#finding-status-register-2026-11-21).
- **Main theme:** the site itself is technically sound. The open problems are hosting-side canonical signals, the app subdomain, and a brand query where the homepage does not rank in non-personalised results (Search Console shows it indexed with the declared canonical). Most fixes are owner settings in Vercel, Search Console and the app project, plus a batch of small metadata and schema edits that are allowed now.
- **Performance score is provisional:** PageSpeed Insights was rate-limited and CrUX field data is unknown.

### Top 5 issues

1. **TECH-01 (Medium)**: Homepage absent from page-1 web results for 'visaprepper' in a clean browser (/terms ranks first); #1 only in the owner's personalised Chrome. Search Console shows the homepage indexed with Google's canonical equal to the declared one, so this is a brand-ranking issue, not an indexing one.
2. **TECH-02 (Medium)**: www.visaprepper.com redirects to the apex with a temporary 307 (http://www takes 2 hops).
3. **TECH-03 (Medium)**: visa-prepperation.vercel.app serves an indexable, byte-identical duplicate of the site.
4. **TECH-04 (Medium)**: app.visaprepper.com answers 200 on every path, has an HTML robots.txt, no noindex and 'VisaPrep' metadata. Search Console lists app.visaprepper.com/ and /signup as indexed.
5. **TECH-05 (Medium)**: 12 blog posts show Jan-Feb 2026 publish dates, before the domain existed (2026-09-06). Not changed: owner rule, no date changes.

TECH-06 (Medium, about 535 KB of font preloads on every page) is the sixth Medium item; it is not actioned because the owner said to leave fonts as they are.

### Top 5 quick wins

Status as of 2026-11-21.

1. Owner, Vercel Domains (minutes): H01 www.visaprepper.com -> 308 Permanent to the apex and H02 visa-prepperation.vercel.app -> 308 or noindex (TECH-02, TECH-03). Open.
2. Build, test and deploy the batch now in the clone's working tree after rebasing on release/marketing-2026-11-21 (1656169): 56 phase-1 M rows, C01-C08, C10, C17, C18 and the 7 new posts (TECH-08, TECH-09, TECH-11, TECH-14, SB-01, SB-03 descriptions, SB-04, SB-05, SB-06, SB-07, SB-13).
3. After the deploy, owner in Search Console: Request indexing for /document-checks ('URL is unknown to Google') and record the deploy date so the M001 homepage title change can be read in Performance.
4. App project H04: robots.txt, 404s, noindex and 'VisaPrepper' shell metadata; app.visaprepper.com/ and /signup are already indexed (TECH-04).
5. Owner confirmations: the phone number for C09 contactPoint (SB-14), and when to release the held M011 /features title (after the homepage ranks for 'visaprepper').

## Tool, scope and date

| Item | Value |
|---|---|
| Audit date | 2026-11-21 (all external checks dated in UTC below) |
| Tool | Claude SEO plugin v2.6.2 (github.com/AgriciDaniel/claude-seo @ 468ed5b). Runtime doctor: ready (Python 3.12, Chromium ready). |
| Claude SEO docs followed | skills/seo-audit/SKILL.md (structure, weights, envelope); agents seo-technical, seo-sitemap, seo-performance, seo-visual; schema checks against Google Search Central docs fetched 2026-11-21 |
| Claude SEO scripts used | sitemap_discovery.py --expand, render_page.py, capture_screenshot.py, page_checks.py, preload_check.py, pagespeed_check.py (HTTP 429), domain_history.py, parse_html.py, hooks/validate-schema.py |
| Crawl scope | BFS from https://visaprepper.com/, robots.txt respected, max 500 pages, 1 request/s, redirects recorded hop by hop. 44 pages found, all 200, equal to the 44-URL sitemap. Inventory of 45 URLs including the noindex /start. 40 URL variants and hosts probed, 27 external links checked. app.visaprepper.com: public shell only. |
| Check windows (UTC) | Product facts 10:55-11:02; crawl 11:11:46-11:12:37; schema and brand 11:12-11:20; variants and hosts 11:16-11:17; external links 11:18-11:19; PSI attempts 11:11-11:30; live verification 11:36-11:48; report spot-check 14:29-14:38; Search Console readout 2026-11-21 (time of day not recorded) |
| Production audited | Branch codex/marketing-readiness-2026-11-19 @ 99dac01 (deployed 2026-11-21). GitHub also has release/marketing-2026-11-21 @ 1656169: 99dac01 plus one commit that sends free-intent CTAs to app.visaprepper.com/signup (no SEO metadata changes). The live homepage linked /signup 6 times at 14:29 UTC, so 1656169 appears to be live; the Vercel deployment commit was not checked. |
| Data limits | Google Search Console: read-only readout taken by the lead on 2026-11-21 in the owner's signed-in Chrome at the owner's explicit request (property sc-domain:visaprepper.com; data 2026-09-05 to 2026-11-19); see [Search Console readout](#search-console-readout-2026-11-21) and `evidence/gsc/`. No 'Request indexing' or live test was run. PSI keyless API returned 429; CrUX unknown (Search Console Core Web Vitals: no data). No paid keyword, rank or backlink APIs. Brand SERP: the lead's clean built-in browser and the owner's signed-in Chrome, both 2026-11-21 (IP country unknown). Unknown values are written as unknown. |
| This step's re-checks | 2026-11-21 14:29-14:38 UTC: live homepage (title, canonical, /signup links, analytics tags, Organization JSON-LD), www redirect, vercel.app alias headers, sitemap (identical to 11:39 UTC), git ls-remote of GitHub branches, git status of the scratch clone |
| Status update | 2026-11-21: implementation status from git status and git diff of the clone (branch seo/metadata-2026-11-21): 46 tracked files modified; the 7 new posts and tests/seo-metadata-2026-11-21.test.ts untracked; nothing committed or deployed. Search Console files copied unchanged into `evidence/gsc/`. |
| Safety | The audit agents did not sign in, create accounts, submit forms or enter data anywhere. All Playwright renders reported sandbox: true. The Search Console readout and the personalised brand SERP used the owner's already signed-in Chrome profile, read-only, at the owner's request; no setting was changed and no indexing request was sent. No fetched page, SERP, sitemap or third-party file contained text addressed to the agent. |
| Severity basis | Priority uses the verifier-corrected severity; the original severity is in audit-data.json (reported_severity). Info items sit in the Low tier. |

## Search Console readout (2026-11-21)

Source: a read-only readout by the lead on 2026-11-21 through the owner's signed-in Chrome profile, at the owner's explicit request. It is treated as genuine, authorised evidence. Search type Web; the 'Last 16 months' range returns data for 2026-09-05 to 2026-11-19. No 'Request indexing', live test or setting change was made. Files (copied unchanged from the workflow's raw output): `evidence/gsc/README.md`, `evidence/gsc/pages-2026-11-21.csv`, `evidence/gsc/countries-2026-11-21.csv`, `evidence/gsc/indexed-2026-11-21.txt`, `evidence/gsc/not-indexed-2026-11-21.txt`.

| Report | Reading |
|---|---|
| Property | sc-domain:visaprepper.com (Domain property, accessible to the owner account, so verified). Covers visaprepper.com, www, http and app.visaprepper.com; does not cover visa-prepperation.vercel.app. |
| Sitemaps | https://visaprepper.com/sitemap.xml: submitted Nov 20, 2026; last read Nov 20, 2026; status Success; 44 discovered pages; 0 videos |
| Page indexing | 37 indexed: 35 visaprepper.com URLs plus https://app.visaprepper.com/ and https://app.visaprepper.com/signup. 10 not indexed (list below) |
| Performance totals | 22 clicks, 1.45K impressions, CTR 1.5%, average position 25.9 (2026-09-05 to 2026-11-19) |
| Queries | 109 queries reported; their clicks sum to 1, so the other clicks come from anonymized queries. No reported query contains 'visaprepper' or 'visa prepper'. |
| Branded queries | No built-in branded-query filter is offered for this property. Custom regex `visa\s?prep\|prepper\|visaper\|visaprep`: 0 clicks, 16 impressions, average position 4.9 (visa prep 13 impressions at 3.5; prepper interview 2 at 14.5; visaper 1 at 3.0). Search Console warns that filtered totals may be partial. |
| Devices | Mobile 12 clicks / 476 impressions / 2.5% / position 8.5; Desktop 10 / 967 / 1.0% / 34.7; Tablet 0 / 8 / 0% / 6.2 |
| Countries | Pakistan 10 clicks (208 impressions, position 8.0); India 4 (228, 32.7); United States 2 (403, 36.0); United Kingdom 1 (111, 42.0); South Africa, Egypt, Jamaica, Qatar and Luxembourg 1 click each (22 in total). Bangladesh 0 clicks, 47 impressions (18.8); Philippines 0 clicks, 29 impressions (14.0). Full list: `evidence/gsc/countries-2026-11-21.csv`. |
| Enhancements | Breadcrumbs 16 valid, 0 invalid. Videos: 1 page with video, 0 videos indexed. HTTPS: 20 HTTPS URLs, 0 non-HTTPS. Core Web Vitals: no data (mobile and desktop). |

All 10 pages with clicks; together they account for the 22 clicks (`evidence/gsc/pages-2026-11-21.csv` lists all 38 pages with impressions):

| Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| / | 7 | 107 | 6.5% | 3.9 |
| /blog/us-visa-interview-questions-pakistan | 4 | 110 | 3.6% | 6.7 |
| /visa-interview-practice | 3 | 43 | 7% | 16.4 |
| /blog/free-ai-visa-mock-interview-online | 2 | 154 | 1.3% | 28.6 |
| /blog/b1-b2-visa-interview-questions | 1 | 318 | 0.3% | 54.6 |
| /blog/best-ai-visa-interview-tools | 1 | 103 | 1% | 12.7 |
| /blog/visa-interview-nervous-forget-answer | 1 | 81 | 1.2% | 7.9 |
| /languages | 1 | 39 | 2.6% | 8.2 |
| https://app.visaprepper.com/ | 1 | 31 | 3.2% | 7.2 |
| /visa-types/h4 | 1 | 20 | 5% | 6.5 |

The pages that appear in the clean brand SERP also have small impression counts at top-seven average positions and 0 clicks: /terms 16 impressions at 3.4, /pricing 16 at 5.9, /partners 12 at 5.8, /features 22 at 6.3, /contact 24 at 6.4. Their queries are not reported (anonymized), so this is consistent with navigational or brand searches but does not prove it.

Not indexed, 10 URLs (`evidence/gsc/not-indexed-2026-11-21.txt`):

| Reason | URL | Note |
|---|---|---|
| Discovered - currently not indexed | /blog/ds-160-interview-consistency |  |
| Discovered - currently not indexed | /blog/j1-visa-interview-questions |  |
| Discovered - currently not indexed | /document-checks | URL Inspection: 'URL is unknown to Google' |
| Discovered - currently not indexed | /partners/apply |  |
| Discovered - currently not indexed | /visa-interview-practice/pakistan |  |
| Discovered - currently not indexed | /visa-types/b1-b2 | URL Inspection: indexed (the report lags) |
| Crawled - currently not indexed | /opengraph-image | last crawl Nov 16, 2026; the OG image route, not a page |
| Page with redirect | http://visaprepper.com/ | Nov 15, 2026 |
| Page with redirect | http://www.visaprepper.com/ | Nov 11, 2026 |
| Page with redirect | https://www.visaprepper.com/ | Nov 11, 2026 |

Three sitemap URLs are in neither list: /blog/us-visa-interview-preparation-any-country, /blog/f1-visa-mock-interview-online-7-day-plan (URL Inspection: indexed) and /blog/b1-b2-visa-mock-interview-scenarios. The Page indexing report trails URL Inspection by days, so URL Inspection is treated as current. The 37 indexed URLs are listed in `evidence/gsc/indexed-2026-11-21.txt`.

URL Inspection (read-only, 2026-11-21):

| URL | Result |
|---|---|
| https://visaprepper.com/ | On Google; page is indexed. Last crawl Nov 21, 2026 09:55 (Googlebot smartphone). Crawl and indexing allowed. User-declared canonical https://visaprepper.com/; Google-selected canonical = inspected URL. Discovery: Sitemaps 'Temporary processing error'; referring page http://visaprepper.com/. An earlier 'Indexing requested' state is shown (requested by the owner before this audit). |
| https://visaprepper.com/document-checks | Not on Google: 'URL is unknown to Google'. No referring sitemap or page detected; last crawl N/A. (Page indexing report: Discovered - currently not indexed.) |
| https://visaprepper.com/visa-types/b1-b2 | On Google; indexed; Breadcrumbs 1 valid. (The lagging Page indexing report still lists it as Discovered - currently not indexed.) |
| https://visaprepper.com/blog/f1-visa-mock-interview-online-7-day-plan | On Google; indexed. Last crawl Nov 19, 2026 01:04; referring page /blog/f1-visa-interview-who-will-pay; Discovery: Sitemaps 'Temporary processing error' (the Sitemaps report itself says Success). |

### Brand SERP, 2026-11-21 (both readings)

| Check | Result for 'visaprepper' |
|---|---|
| Clean built-in browser, google.com, gl=us, hl=en, 2026-11-21 (lead) | Homepage absent from page-1 web results: /terms first, then /features, /partners, Instagram @visaprepper, visapro.com, /pricing, vispera.co and the Google Play app 'VisaPrepAI: US Visa Prep'; homepage only in the Images strip. |
| Owner's signed-in Chrome, same day (lead) | Homepage #1. Personalised: reflects the owner's own browsing history and is not representative of new searchers. |
| Built-in browser, gl=in / gl=pk / gl=ng, 2026-11-21 (`evidence/serp-observations.csv`) | gl=in auto-corrected to 'visa prepper' with /partners first; gl=pk and gl=ng had /contact first; homepage only in the Images strip. |

The clean reading is the one that represents new searchers; the owner's #1 reflects personalisation. Search Console cannot settle it, because brand-query volume is tiny and mostly anonymized. The homepage's average position of 3.9 is taken over all of its queries, most of them anonymized, so it does not contradict the clean-browser miss for the single query 'visaprepper'.

### What the readout changes in this audit

- TECH-01: the homepage is indexed and Google kept the declared canonical; the finding is reframed as a brand-ranking issue (see TECH-01).
- TECH-02: the http and www homepage variants are 'Page with redirect', so Google is consolidating them to the apex; the 307 did not split the homepage canonical, but a permanent 308 is still the right setting.
- TECH-03: the Domain property cannot show visa-prepperation.vercel.app, so whether it is indexed stays unknown.
- TECH-04: app.visaprepper.com/ and /signup are indexed, so the 'VisaPrep' shell metadata can appear in Google (app root 1 click, 31 impressions, position 7.2).
- TECH-07: Core Web Vitals has no field data, consistent with CrUX unknown.
- TECH-15: 1 page with video, 0 videos indexed; VideoObject stays optional.
- /document-checks is unknown to Google although the sitemap is read with Success: after the deploy, Request indexing for it (owner). URL-level 'Temporary processing error' coexists with a Success sitemap: monitor; resubmitting an unchanged sitemap does not speed crawling.
- No analytics are installed, so Search Console is the only search data and organic sign-ups cannot be measured (product truth alert 6).

## Category results

### Technical SEO: 78/100 (weight 22%)

On-site crawl and index basics are clean. Points are lost to hosting-side canonical signals (www 307, an indexable vercel.app duplicate), an app subdomain that answers 200 on every path with no robots rules, the brand-SERP anomaly (homepage indexed but absent from clean page-1 results for 'visaprepper'), and small items (root canonical on 404s, /index duplicate, stale lastmod, minimal security headers, no max-image-preview).

What works:

- robots.txt is text/plain 200, allows / and blocks only /api/ and /admin/; no AI or search crawler is blocked
- One valid sitemap (44 URLs, 0 invalid, 0 cross-host) that matches the crawl 1:1; every URL is 200, self-canonical and indexable
- Server-rendered: raw and rendered text differ by 1 word; a Googlebot UA gets the same title and canonical
- http to https is 308; trailing-slash URLs 308 to slashless; uppercase and unknown slugs return real 404s with noindex
- Valid reciprocal hreflang cluster (en, en-IN, en-PK, x-default) on the three practice pages
- Max click depth 2; the only orphan is /start, which is noindex and excluded from the sitemap by design
- The team-scoped vercel.app alias already sends X-Robots-Tag: noindex

Findings: TECH-01 (Medium), TECH-02 (Medium), TECH-03 (Medium), TECH-04 (Medium), SB-02 (Medium), TECH-10 (Low), TECH-11 (Low), TECH-12 (Low), TECH-13 (Low), TECH-14 (Low), TECH-17 (Info).

### Content Quality: 62/100 (weight 23%)

Substantial server-rendered guides (about 1,100-2,200 words per blog page including navigation) and complete contact and legal pages. For visa and immigration advice, trust signals are weak: an organization-only byline with no named expert or reviewer, 12 posts with publish dates earlier than the domain (TECH-05), a 76-day-old domain, 14 of 20 posts flagged for a policy-currency refresh (blog-inventory.csv), and single-source copy-versus-app contradictions (see Not reproduced).

What works:

- Contact details on every page (email, phone, WhatsApp) plus privacy, terms and refund pages
- No fabricated ratings or reviews anywhere
- Article headline, byline and dates match visible content on 20/20 posts
- No duplicate titles, descriptions or H1s across the 45 inventoried URLs

Findings: TECH-05 (Medium).

### On-Page SEO: 80/100 (weight 20%)

Exactly one title, meta description, canonical and H1 on every URL, with no duplicates. Deductions for 12 long titles, 4 long descriptions, mixed brand spelling in metadata, a brand-repeating title and thinly linked h1b/h4/j1 visa-type pages.

What works:

- 1 title, 1 meta description, 1 canonical and 1 H1 on all 45 URLs; no duplicates
- lang='en', viewport, Open Graph and Twitter cards present; og:url equals the canonical everywhere
- Brand-first homepage title; ' | VisaPrepper' suffix and og:site_name 'VisaPrepper' on 44/44 pages

Findings: TECH-08 (Low), TECH-09 (Low), TECH-16 (Low), SB-03 (Low), SB-06 (Low), SB-13 (Info).

### Schema / Structured Data: 82/100 (weight 10%)

Technically clean and policy-safe: 0 errors on 44/44 pages, a linked @id graph, and markup that matches visible content. Deductions for the unlinked Article author, Article without image/@id/url/isPartOf, fragile author typing, no contactPoint and small URL/logo inconsistencies.

What works:

- claude-seo validate-schema hook: 44/44 pass, 0 errors, 0 warnings; no Microdata or RDFa conflicts
- Organization, WebSite and SoftwareApplication share name 'VisaPrepper' and alternateName ['Visa Prepper', 'visaprepper.com'], linked by @id
- WebSite only on the homepage; no retired SearchAction; no deprecated types
- Breadcrumb and FAQ markup is emitted by the same components that render the visible UI
- FAQPage is valid but not counted as an opportunity: per the schema audit, Google stopped showing FAQ rich results for all sites from 2026-05-07

Findings: TECH-15 (Low), SB-01 (Low), SB-04 (Low), SB-05 (Low), SB-14 (Low), SB-07 (Info).

### Performance (CWV): 70/100 (weight 10%)

Provisional and lab-only: the keyless PSI API returned HTTP 429 on all 8 attempts and CrUX field data is unknown. A local throttled lab approximation (not Lighthouse) showed CLS 0, TBT about 27-57 ms and text LCP 1.6-3.1 s (/pricing 3.1 s, /terms 2.8 s). Deductions for 535 KB of font preloads on every page and a 338 KB, 1,560-node homepage.

What works:

- CLS 0 on all 7 lab-tested pages; LCP elements are text, not images
- The homepage video uses preload=none with a poster
- HTML served from the Vercel edge (lab TTFB about 360-460 ms on most pages)

Findings: TECH-06 (Medium), TECH-18 (Info).

### AI Search Readiness: 65/100 (weight 10%)

No dedicated seo-geo or seo-agentic pass ran in this workflow, so this is scored from crawl and schema evidence. Positives: open robots.txt, question-led content in the initial HTML, a consistent Organization/WebSite entity, and an AI Overview that described the product for '"visa prepper"' (lead, 2026-11-21). Negatives: a weak brand entity (look-alike results, homepage not ranking for the bare brand), unverifiable TikTok and Facebook sameAs, off-brand app shell metadata ('VisaPrep'), no named experts or third-party citations, and /llms.txt 404 (not a Google signal).

What works:

- No AI crawler is blocked in robots.txt
- All key content is in the initial HTML (no client-side rendering dependency)
- Organization sameAs includes Instagram (public profile 'Visa Prepper (@visaprepper)')

Findings: none in the verified set.

### Images: 78/100 (weight 5%)

Very few images: only 2 distinct `<img>` sources (logo and Google Play badge), both with alt text and dimensions, and the LCP is text. Deductions for one generic OG image shared by all URLs, no article images (SB-04) and a 93,949 B 1254x1254 JPEG used as favicon and apple-touch icon.

What works:

- All `<img>` elements have alt attributes and width/height
- OG image is a valid 1200x630 PNG; the logo meets Google's 112 px minimum
- Square favicon linked from every page (/favicon.ico 404 is harmless)

Findings: none in the verified set.

## Prioritized findings

Order: Critical > High > Medium > Low. Info items are shown in the Low tier. `implement_now` is true only for confirmed findings whose fix is metadata, schema, sitemap or robots code. Full evidence, recommendation and source location for each row are in [Finding details](#finding-details). The last column gives the status on 2026-11-21 with the current metadata-plan.csv ids. Implemented = applied in the clone's working tree (branch seo/metadata-2026-11-21) on 2026-11-21; uncommitted and not deployed.

### Critical

None. Nothing blocks indexing or risks a penalty.

### High

None. No finding kept High after verification (TECH-01 and TECH-02 were lowered to Medium).

### Medium

| ID | Finding | Evidence | Affected URLs | Fix type | implement_now | Status 2026-11-21 |
|---|---|---|---|---|---|---|
| TECH-01 | Homepage absent from page-1 non-personalised web results for 'visaprepper' (indexed, Google canonical = declared; brand-ranking issue) | Clean built-in browser 2026-11-21 (gl=us): /terms first, homepage only in Images; owner's signed-in Chrome the same day: homepage #1 (personalised). Search Console: homepage indexed, Google canonical = declared, crawled Nov 21; 7 clicks and 107 impressions at average position 3.9. On-page signals healthy (11:36-11:41 UTC). | /, /terms, /features, https://www.visaprepper.com/, https://visa-prepperation.vercel.app/ | owner-action | false | open: owner actions H01, H02, H04; M001/M002 implemented |
| TECH-02 | www to apex uses a temporary 307; http://www takes two hops (308 then 307) | curl 2026-11-21 11:36 and 14:29 UTC: www -> 307 apex; http://www -> 308 -> 307 (2 hops). | https://www.visaprepper.com/, http://www.visaprepper.com/, https://www.visaprepper.com/pricing | hosting-config | false | owner/hosting action: H01 |
| TECH-03 | Production vercel.app alias serves an indexable full duplicate (no X-Robots-Tag; canonical hint only) | 2026-11-21 11:36 and 14:29 UTC: alias returns 200, byte-identical HTML, no X-Robots-Tag; canonical points to apex. | https://visa-prepperation.vercel.app/, https://visa-prepperation.vercel.app/pricing | hosting-config | false | owner/hosting action: H02 |
| TECH-04 | app.visaprepper.com: every path is a 200 SPA shell with no noindex or canonical; robots.txt and sitemap.xml return HTML; shell metadata says 'VisaPrep' for Pakistan/India/Bangladesh | 2026-11-21 11:37 UTC: 7 app paths incl. /robots.txt return the same 200 HTML shell; no noindex/canonical; og:title 'VisaPrep'. | https://app.visaprepper.com/, https://app.visaprepper.com/login, https://app.visaprepper.com/signup, https://app.visaprepper.com/dashboard, https://app.visaprepper.com/robots.txt | owner-action | false | owner/hosting action (app project): H04 |
| TECH-05 | 12 blog posts show publish dates (Jan-Feb 2026) earlier than the domain's registration (2026-09-06) | WHOIS created 2026-09-06; git first add 2026-09-06; live posts show 'Published' Jan-Feb 2026 (11:38 UTC). | 12 /blog posts (full list in audit-data.json) | content-change-not-allowed | false | not done (owner rule: no date changes) |
| TECH-06 | About 535 KB of font preloads on every page, including about 394 KB of Noto Arabic/Devanagari/Bengali | 2026-11-21 11:39 UTC: 5 font preloads (535,252 B) on all 44 pages. | /, /pricing, /terms, /blog/f1-visa-interview-questions-and-answers | owner-action | false | not done (owner rule: fonts stay as they are) |
| SB-02 | Duplicate homepage host and temporary www redirect weaken homepage and site-name signals (merged into TECH-02 and TECH-03) | Duplicate of TECH-02 plus TECH-03. | https://visa-prepperation.vercel.app/, https://www.visaprepper.com/, / | hosting-config | false | merged; owner/hosting action: H01, H02 |

### Low

| ID | Finding | Evidence | Affected URLs | Fix type | implement_now | Status 2026-11-21 |
|---|---|---|---|---|---|---|
| TECH-08 | 12 titles exceed about 60 characters (truncation risk) | Live 2026-11-21: 12 titles 61-77 chars; 5 posts have no seoTitle. | /blog/mock-visa-interview-online, /blog/us-visa-interview-questions-bangladesh, /blog/ds-160-interview-consistency and 9 more (full list in audit-data.json) | metadata-code | true | implemented: M005, M050, M056, M058, M062, M064, M066, M074, M078, M080, M086, M088 |
| TECH-09 | 4 meta descriptions exceed 160 characters | Live 2026-11-21: 4 descriptions of 161-171 chars. | /document-checks, /blog/us-visa-interview-preparation-any-country, /blog/h4-visa-interview-questions, /blog/f1-visa-interview-who-will-pay | metadata-code | true | implemented: M010, M063, M071, M079 (with C01, C02) |
| TECH-10 | Sitemap lastmod not refreshed after the 2026-11-21 release; changefreq/priority present | Live sitemap 2026-11-21: /document-checks lastmod 2026-11-17, but its FAQ changed in 99dac01 (2026-11-21). | /document-checks, /sitemap.xml | sitemap-robots-code | false (owner rule 2026-11-21: no date changes) | not done (owner rule: C12 is a date change); C13 keep |
| TECH-11 | Root layout canonical '/' is inherited by 404 responses | 2026-11-21 11:41 UTC: 8 different 404 URLs emit canonical https://visaprepper.com. | /this-page-does-not-exist, /PRICING, /favicon.ico | metadata-code | true | implemented: C03 |
| TECH-12 | /index returns a 200 duplicate of the homepage | 2026-11-21 11:41 UTC: /index -> 200, same bytes as /, canonical to /. | /index | hosting-config | false | owner/hosting action: H03 |
| TECH-13 | Security headers minimal: HSTS only | 2026-11-21 11:36 UTC: only HSTS present; CSP, XCTO, XFO, Referrer-Policy, Permissions-Policy absent. | / | hosting-config | false | owner/hosting action (no plan row) |
| TECH-14 | No robots max-image-preview:large on any page | 2026-11-21: 0 of 44 sitemap pages send robots directives. | / | metadata-code | true | implemented: C04 |
| TECH-15 | Structured-data gaps: Article without image, homepage video without VideoObject, /pricing without Offer | Live 2026-11-21: Article has no image; homepage video has no VideoObject; /pricing has Organization only. | /, /pricing, /blog/f1-visa-interview-questions-and-answers | schema-code | true (Article.image via SB-04; VideoObject optional; /pricing Offer skipped) | partly implemented: Article.image via C06; VideoObject not started; Offer skipped |
| TECH-16 | Visa-type pages h1b, h4 and j1 have only 2 linking pages each | 2026-11-21 inlink graph: h1b, h4, j1 each linked from 2 pages; homepage links no visa-type page. | /visa-types/h1b, /visa-types/h4, /visa-types/j1 | content-change-not-allowed | false | interim fix written: new post us-visa-interview-questions (M090, M091) links h1b, h4, j1 |
| SB-01 | Article author is an unlinked second entity with the spaced brand spelling | Live 2026-11-21: 20/20 Article authors have no @id/url and no link to /#organization. | all 20 /blog posts | schema-code | true | implemented: C05 |
| SB-03 | Mixed brand spellings in metadata-only titles and descriptions | Live 2026-11-21: 3 titles and 5 descriptions say 'Visa Prepper'; none rendered visibly. | /contact, /partners, /partners/apply and 3 more (full list in audit-data.json) | metadata-code | true (5 descriptions now; 3 title edits deferred) | partly implemented: M008, M018, M024, M026, M028; titles M007, M017, M019 kept (deferred) |
| SB-04 | Article markup has no image, @id, url or isPartOf | Live 2026-11-21: 20/20 Article blocks have no image, @id, url or isPartOf. | all 20 /blog posts | schema-code | true (Option A now; Option B needs sign-off) | implemented: C06 (option A); option B backlog |
| SB-05 | Author @type chosen by exact string match | Source @99dac01: author type decided by exact string comparison. | all 20 /blog posts | schema-code | true | implemented: C05 |
| SB-06 | How-it-works title repeats the brand | Live 2026-11-21: brand appears twice in the /how-it-works title. | /how-it-works | metadata-code | true | implemented: M013 |
| SB-14 | Organization has no contactPoint although phone and email are visible sitewide | Live 2026-11-21 14:29 UTC: footer tel and mailto present; Organization JSON-LD has email only. | / | schema-code | false (blocked on owner confirmation) | held: C09 (owner to confirm phone) |
| TECH-17 | (Info) Mobile: fixed header plus WhatsApp rail cover 136 px (16.7%) of a 375x812 viewport and overlap the secondary hero CTA | 2026-11-21 Playwright 375x812: 136 px fixed UI; WhatsApp pill covers the secondary hero CTA. | /, /blog/f1-visa-interview-questions-and-answers | content-change-not-allowed | false | backlog: design (outside scope) |
| TECH-18 | (Info) Homepage weight: 338 KB HTML, 1,560 DOM nodes, about 5,670 words | 2026-11-21: homepage HTML 338,480 B decoded, 1,560 tags; no crawl-limit risk. | / | content-change-not-allowed | false | backlog: content/design (outside scope) |
| SB-07 | (Info) Minor @id and URL representation inconsistencies | Live 2026-11-21: root URL written with and without slash; Service @id missing on /document-checks. | /, /document-checks | schema-code | true (optional) | implemented: C07, C08 |
| SB-13 | (Info) article:author emits plain text instead of a profile URL | Live 2026-11-21: article:author is plain text on 20 posts. | all 20 /blog posts | metadata-code | true (optional) | implemented: C10 |

## Implementation status as of 2026-11-21 (metadata-plan.csv ids)

Status comes from git status and git diff of the clone (branch seo/metadata-2026-11-21) on 2026-11-21. Implemented = applied in the clone's working tree (branch seo/metadata-2026-11-21) on 2026-11-21; uncommitted and not deployed. Nothing in this table was built, tested or deployed by this step. All ids are the current ids in metadata-plan.csv (143 rows: M001-M121, C01-C18, H01-H04), and every row appears in exactly one group below. Earlier drafts of this report cited older plan ids; those references are replaced throughout.

Before shipping: rebase on release/marketing-2026-11-21 (1656169), run the build and the test suite (including tests/seo-metadata-2026-11-21.test.ts and `npm run test:site`), and check that the 404 page still emits noindex and no canonical, that /start keeps 'noindex, follow', and that every route emits its own canonical.

| Status | metadata-plan.csv ids | Audit ids | Note |
|---|---|---|---|
| implemented | C01, C02 | TECH-09 | seoDescription frontmatter field (lib/content/posts.ts); generateMetadata uses seoDescription ?? description (app/blog/[slug]/page.tsx). Visible descriptions unchanged. |
| implemented | C03 | TECH-11 | Root canonical removed from app/layout.tsx; every route sets its own canonical. |
| implemented | C04 | TECH-14 | Root robots: max-image-preview:large, max-snippet:-1, max-video-preview:-1 only (preview-only form; no index/follow, no googleBot block). |
| implemented | C05 | SB-01, SB-05, E1, E2 | Article author linked (#editorial-team, url /about, parentOrganization #organization); type from an ORGANIZATION_AUTHORS set; name stays equal to the visible byline. |
| implemented | C06 | SB-04, TECH-15, E3 | Article @id, url, isPartOf #website, image /opengraph-image (option A), publisher.logo 1254x1254. |
| implemented | C07 | SB-07, E10 | Organization.url and SoftwareApplication.url with trailing slash. Organization.logo stays a URL string (tests/seo.test.ts:27 asserts it). |
| implemented | C08 | SB-07, E11 | /document-checks Service @id. |
| implemented | C10 | SB-13, E9 | openGraph.authors = https://visaprepper.com/about (phase-2 row, applied). |
| implemented | C17 | - | scripts/verify-site.mjs homepage title assertion updated for M001. |
| implemented (with the new posts) | C18 | - | Test counts updated for the 7 new posts: 20 -> 27 posts, 44 -> 51 sitemap entries (tests/global-positioning.test.ts, tests/seo-implementation.test.ts, scripts/verify-site.mjs). Observed in git diff. |
| implemented | 56 phase-1 M rows: M001, M002, M005, M008, M009, M010, M013, M015, M018, M024, M026, M028, M031, M032, M034, M037, M038, M039, M040, M041, M042, M044, M046, M048, M049, M050, M051, M052, M053, M054, M055, M056, M058, M059, M060, M061, M062, M063, M064, M066, M067, M069, M071, M072, M073, M074, M077, M078, M079, M080, M081, M082, M083, M085, M086, M088 | TECH-01 (M001, M002), TECH-08, TECH-09, SB-03, SB-06, E4, E5, E7, E8 | All 56 rows with status=change and phase=1: titles, meta descriptions and SEO-only seoTitle/seoDescription values. Homepage title is now 'VisaPrepper (Visa Prepper): AI U.S. Visa Interview Practice'. No visible text changed. |
| written (new posts) | M090, M091, M092, M093, M094, M095, M096, M097, M098, M099, M100, M101, M104, M105 | TECH-16 (interim) | 7 new posts with publishDate 2026-11-21: us-visa-interview-questions, b1-b2-visa-interview-questions-for-parents, us-visa-interview-questions-philippines, us-visa-interview-day-what-to-expect, f1-visa-second-attempt-after-214b, us-visa-interview-in-hindi-urdu, spouse-visa-interview-questions-ir1-cr1 (untracked files in the clone). |
| held | M011 | - | /features title (phase 2). Held because /features ranks on page 1 for the brand query; revisit once the homepage ranks for 'visaprepper' in a clean browser. |
| held | C09 | SB-14, E12 | Organization.contactPoint; needs the owner to confirm the phone number +1-732-518-8581. |
| not done (owner rule) | C12 | TECH-10 | PAGE_UPDATED['/document-checks'] lastmod bump. The owner forbids date changes. |
| not done (owner rule) | (no plan row) | TECH-05 | Visible publish dates of 12 posts stay as they are (no date changes). |
| not done (owner rule) | (no plan row) | TECH-06 | Font preloads: the owner said leave fonts as they are. |
| owner/hosting action | H01 | TECH-02, SB-02 | www.visaprepper.com -> 308 Permanent to the apex (Vercel Domains). |
| owner/hosting action | H02 | TECH-03, SB-02 | visa-prepperation.vercel.app -> 308 to the apex, or X-Robots-Tag: noindex. |
| owner/hosting action | H03 | TECH-12 | /index -> 308 to /. |
| owner/hosting action | H04 | TECH-04 | App project: text/plain robots.txt, 404 for unknown routes, X-Robots-Tag: noindex on app routes, 'VisaPrepper' shell metadata. |
| owner/hosting action | (no plan row) | TECH-13 | Security headers in Vercel or vercel.json (no plan row). |
| keep (no change by design) | 32 M rows: M003, M004, M006, M007, M012, M014, M016, M017, M019, M020, M021, M022, M023, M025, M027, M029, M030, M033, M035, M036, M043, M045, M047, M057, M065, M068, M070, M075, M076, M084, M087, M089 | SB-03 (M007, M017, M019 titles deferred), E4, E5, E6 | Rows whose current value is kept. M007, M017 and M019 keep the /contact, /partners and /partners/apply titles while those pages hold brand positions. |
| keep (no change by design) | C11, C13, C14, C15, C16 | - | C11 brand name 'VisaPrepper' and alternateName ['Visa Prepper', 'visaprepper.com'] unchanged; C13 sitemap routes, changefreq, priority; C14 robots.txt; C15 /start noindex,follow; C16 no new noindex on legal, contact or partner pages. |
| planned, not written today | M102, M103, M106, M107, M108, M109, M110, M111, M112, M113, M114, M115, M116, M117, M118, M119, M120, M121 | - | 9 further new-post briefs (immigrant visa, Pakistan visit visa, Nepal F1, interview waiver/dropbox, 221(g), visa bond, Ghana, Kenya, UAE residents). |

## Finding status register (2026-11-21)

Every verified finding, every unverified TECH item, every SB id and every schema-brand.md item, with its metadata-plan.csv ids and status. Implemented = applied in the clone's working tree (branch seo/metadata-2026-11-21) on 2026-11-21; uncommitted and not deployed.

Status values: implemented; partly implemented; interim fix written; held; not done (owner rule); owner/hosting action; backlog (outside scope); info; does not exist (numbering gap).

### Technical findings (TECH-01 to TECH-22)

Source: `evidence/technical-findings.md` (copy of the workflow's technical findings) and the verifier outputs (verify-live/, verify_src/ in the workflow scratch output). 'Verified' = confirmed by both verifiers; TECH-07, TECH-19, TECH-20, TECH-21 and TECH-22 were not in the verified set.

| ID | Finding | Severity | Verified | metadata-plan.csv ids | Status 2026-11-21 | Note |
|---|---|---|---|---|---|---|
| TECH-01 | Homepage absent from clean page-1 results for 'visaprepper'; indexed with the declared canonical | Medium | yes | M001, M002 (implemented); H01, H02, H04 (owner) | open: owner/hosting actions and monitoring | Search Console: homepage indexed, Google canonical = declared, 107 impressions at position 3.9. Clean browser: absent; owner's Chrome: #1 (personalised). Hypotheses revised in the finding details. |
| TECH-02 | www to apex is a temporary 307 | Medium | yes | H01 | owner/hosting action | Search Console lists the http and www homepage variants as 'Page with redirect'. |
| TECH-03 | visa-prepperation.vercel.app is an indexable duplicate | Medium | yes | H02 | owner/hosting action | Outside the Domain property, so its index state is unknown. |
| TECH-04 | app.visaprepper.com: 200 on every path, HTML robots.txt, no noindex, 'VisaPrep' metadata | Medium | yes | H04 | owner/hosting action (app project) | Search Console: app root and /signup are indexed. See product truth alert 2. |
| TECH-05 | 12 posts show publish dates before the domain existed | Medium | yes | none (no plan row) | not done (owner rule) | Owner rule 2026-11-21: do not change any dates. Trust risk noted; no action. |
| TECH-06 | About 535 KB of font preloads on every page | Medium | yes | none (no plan row) | not done (owner rule) | Owner rule 2026-11-21: leave fonts as they are. |
| TECH-07 | PSI rate-limited; CrUX unknown | Info | no | none | info: monitor | Search Console Core Web Vitals: no data (mobile and desktop). Rerun PSI with an API key. |
| TECH-08 | 12 titles over about 60 characters | Low | yes | M005, M050, M056, M058, M062, M064, M066, M074, M078, M080, M086, M088 | implemented | Proposed rendered titles are 55-60 characters. |
| TECH-09 | 4 meta descriptions over 160 characters | Low | yes | M010, M063, M071, M079; C01, C02 | implemented | New descriptions are 152-155 characters; the seoDescription field leaves the visible descriptions unchanged. |
| TECH-10 | Sitemap lastmod not refreshed; changefreq/priority present | Low | yes | C12 (lastmod), C13 (keep) | not done (owner rule) | C12 is a date change, which the owner forbids. C13 keeps changefreq and priority (ignored by Google, harmless). |
| TECH-11 | Root canonical inherited by 404s | Low | yes | C03 | implemented | - |
| TECH-12 | /index is a 200 duplicate of / | Low | yes | H03 | owner/hosting action | - |
| TECH-13 | Security headers: HSTS only | Low | yes | none (no plan row) | owner/hosting action | Vercel or vercel.json headers; not a ranking factor. |
| TECH-14 | No max-image-preview:large | Low | yes | C04 | implemented | Preview-only robots form. |
| TECH-15 | Article without image; homepage video without VideoObject; /pricing without Offer | Low | yes | C06 (Article.image) | partly implemented | Article.image done (option A). VideoObject not started (optional, no plan row; Search Console: 0 videos indexed). /pricing Offer skipped by design. |
| TECH-16 | /visa-types/h1b, /h4, /j1 have 2 linking pages each | Low | yes | M090, M091 (new post us-visa-interview-questions) | interim fix written (new post) | The new post links all three pages. Links from existing bodies or templates stay in the content backlog. |
| TECH-17 | Mobile: fixed header and WhatsApp rail cover 136 px | Info | yes | none | backlog: design (outside scope) | - |
| TECH-18 | Homepage weight: 338 KB HTML, 1,560 DOM nodes | Info | yes | none | backlog: content/design (outside scope) | - |
| TECH-19 | /favicon.ico returns 404 | Info | no | none | info: no action | The /icon.jpg link tag is present. |
| TECH-20 | External links: 0 broken; 11 return 403 to automated clients | Info | no | none | info: spot-check | Check the travel.state.gov and ceac.state.gov links in a normal browser. |
| TECH-21 | Homepage hero says 'Other'; other pages say 'Another country' | Info | no | none | product truth alert (visible copy, outside scope) | Product truth alert 4. |
| TECH-22 | /llms.txt returns 404 | Info | no | none | info: no action | Not a Google signal. |

### Schema and brand findings (SB ids)

| ID | Finding | Severity | Verified | metadata-plan.csv ids | Status 2026-11-21 | Note |
|---|---|---|---|---|---|---|
| SB-01 | Article author unlinked, with the spaced spelling | Low | yes | C05 (E1) | implemented | Author name kept equal to the visible byline. |
| SB-02 | Duplicate homepage host and temporary www redirect | Medium (merged) | yes | H01, H02 | merged into TECH-02 and TECH-03; owner/hosting action | - |
| SB-03 | Mixed brand spellings in metadata-only titles and descriptions | Low | yes | M008, M018, M024, M026, M028 (implemented); M007, M017, M019 (keep, deferred) | partly implemented | The 5 descriptions are done. The 3 titles are kept by design while /contact and /partners hold brand positions. |
| SB-04 | Article markup without image, @id, url, isPartOf | Low | yes | C06 (E3) | implemented (option A) | Option B (per-post OG image template) needs owner sign-off: design backlog. |
| SB-05 | Author @type chosen by exact string match | Low | yes | C05 (E2) | implemented | - |
| SB-06 | /how-it-works title repeats the brand | Low | yes | M013 (E7) | implemented | Now 'How AI Visa Interview Practice Works \| VisaPrepper'. |
| SB-07 | Minor @id and URL inconsistencies | Info | yes | C07 (E10), C08 (E11); C06 (publisher logo size) | implemented | Organization.logo stays a URL string because tests/seo.test.ts:27 asserts it. |
| SB-08 | (no such finding) | - | - | - | does not exist (numbering gap) | See the note below the table. |
| SB-09 | (no such finding) | - | - | - | does not exist (numbering gap) | See the note below the table. |
| SB-10 | (no such finding) | - | - | - | does not exist (numbering gap) | See the note below the table. |
| SB-11 | (no such finding) | - | - | - | does not exist (numbering gap) | See the note below the table. |
| SB-12 | (no such finding) | - | - | - | does not exist (numbering gap) | See the note below the table. |
| SB-13 | article:author is plain text | Info | yes | C10 (E9) | implemented | - |
| SB-14 | Organization has no contactPoint | Low | yes | C09 (E12) | held | Needs owner confirmation of the phone number. |

**SB numbering gap.** SB-08, SB-09, SB-10, SB-11 and SB-12 do not exist in any source available to this step. schema-brand.md numbers its items E1-E12 and uses no SB ids; verify-live/ and verify_src/ hold raw captures (headers, HTML, renders) with no finding ids; a search of the whole workflow output for 'SB-' finds only SB-01 to SB-07, SB-13 and SB-14 (all inside report-render/, a rendering of this report) plus the unrelated returning-resident visa class 'SB-1' in two saved official pages. The verified SB ids reached this report only through the verification payload, which was cut off inside SB-14. They are therefore treated as a numbering gap: no finding carries these ids and nothing is listed under them. No SB id above SB-14 exists. All twelve schema-brand.md items (E1-E12) and its other recommendations are mapped in the register, so no schema or brand recommendation is unaccounted for.

### schema-brand.md items E1-E12

| Item | Recommendation | metadata-plan.csv ids | Audit id | Status 2026-11-21 | Note |
|---|---|---|---|---|---|
| E1 | Article author: add @id, url, parentOrganization | C05 | SB-01 | implemented | - |
| E2 | Author type from an explicit set, not a string match | C05 | SB-05 | implemented | - |
| E3 | Article @id, url, isPartOf, image | C06 | SB-04, TECH-15 | implemented (option A) | Option B (per-post OG card) is design backlog. |
| E4 | /contact: title 'Contact Us'; description spelling | M008 (description, implemented); M007 (title, keep) | SB-03 | partly implemented | Title deferred (schema-brand.md caution: /contact ranks first for the brand in gl=pk and gl=ng). |
| E5 | /partners: title 'Partner Program'; description spelling | M018 (description, implemented); M017 (title, keep) | SB-03 | partly implemented | Title deferred (/partners ranks first for the brand in gl=in). |
| E6 | /partners/apply: title 'Apply to the Partner Program' | M019 (title, keep) | SB-03 | deferred (keep by design) | M020 keeps the description (no spelling issue). |
| E7 | /how-it-works title without the brand | M013 | SB-06 | implemented | - |
| E8 | 'VisaPrepper' in the /privacy, /refund-policy, /terms descriptions | M024, M026, M028 | SB-03 | implemented | - |
| E9 | article:author as a profile URL | C10 | SB-13 | implemented | - |
| E10 | Organization and SoftwareApplication url with trailing slash; optional logo ImageObject | C07 | SB-07 | implemented (url part) | Optional logo ImageObject not applied: tests/seo.test.ts:27 locks the URL string. |
| E11 | /document-checks Service @id | C08 | SB-07 | implemented | - |
| E12 | Organization contactPoint | C09 | SB-14 | held | Owner to confirm the phone number. |

Other schema-brand.md recommendations:

| Section | Item | Plan or audit id | Status 2026-11-21 |
|---|---|---|---|
| 3.1 | Keep 'VisaPrepper' as the site name with alternateName ['Visa Prepper', 'visaprepper.com'] | C11 (keep) | keep (no change) |
| 3.3 | Duplicate homepage host visa-prepperation.vercel.app | H02 (TECH-03) | owner/hosting action |
| 3.3 | www redirect is a temporary 307 | H01 (TECH-02) | owner/hosting action |
| 3.3 | /favicon.ico 404 | TECH-19 | info: no action |
| 3.4 | Visible brand spellings (homepage h2s, FAQ question, blog byline, img alt, aria-label) | none | backlog: content (outside scope) |
| 3.4 | Instagram display name, TikTok and Facebook sameAs confirmation, new brand profiles | none | owner action (off-site) |
| 4 | FAQ rich results no longer shown for any site (since 2026-05-07) | none | no action (FAQPage markup is valid; not an opportunity) |

## Owner actions (hosting settings, Search Console, release, analytics)

Owner-rule items (TECH-05 dates, TECH-06 fonts, TECH-10/C12 lastmod) are not owner actions; they stay as they are and are listed in the backlog.

| Area | metadata-plan.csv ids | Action | Findings | How to verify |
|---|---|---|---|---|
| Hosting (Vercel Domains) | H01 | Redirect www.visaprepper.com to visaprepper.com with 308 Permanent, keeping path and query. | TECH-02, SB-02 | curl -sI https://www.visaprepper.com/ returns 308 with location https://visaprepper.com/ |
| Hosting (Vercel Domains) | H02 | Redirect visa-prepperation.vercel.app to visaprepper.com (308), or send X-Robots-Tag: noindex on that host. Check the git-branch alias too. | TECH-03, SB-02 | curl -sI https://visa-prepperation.vercel.app/ returns 308, or 200 with x-robots-tag: noindex |
| Hosting (Vercel redirects or vercel.json) | H03 | Redirect /index to / (308). | TECH-12 | curl -sI https://visaprepper.com/index returns 308 |
| Hosting (Vercel or vercel.json) | (no plan row) | Add X-Content-Type-Options, Referrer-Policy, frame-ancestors/X-Frame-Options, Permissions-Policy; any CSP must allow inline JSON-LD and Next.js RSC scripts. | TECH-13 | Response headers on /; pages still render and JSON-LD still parses |
| App project (separate repo/hosting) | H04 | Serve a text/plain robots.txt, return 404 for unknown routes, send X-Robots-Tag: noindex on app routes, and set the shell title/description/og to 'VisaPrepper' with the worldwide U.S.-visa audience. app.visaprepper.com/ and /signup are indexed today, so decide first whether /signup should stay indexable. | TECH-04, product truth alert 2 | curl app.visaprepper.com/robots.txt shows text/plain rules; /zz-random returns 404; Search Console Page indexing shows the app URLs dropping out (or /signup kept by choice) |
| Release | C01-C08, C10, C17, C18, 56 phase-1 M rows, M090-M101, M104-M105 | Rebase on release/marketing-2026-11-21 (1656169), build, run the tests (including tests/seo-metadata-2026-11-21.test.ts and npm run test:site) and deploy the implemented batch; note the deploy date. | TECH-08, TECH-09, TECH-11, TECH-14, TECH-15, TECH-16, SB-01, SB-03, SB-04, SB-05, SB-06, SB-07, SB-13 | Tests pass; live titles, descriptions and JSON-LD match metadata-plan.csv; 404 still noindex with no canonical; /start still 'noindex, follow' |
| Search Console (done 2026-11-21, read-only) | (no plan row) | URL Inspection of /, /document-checks, /visa-types/b1-b2 and /blog/f1-visa-mock-interview-online-7-day-plan; Page indexing, Sitemaps and Performance read. See search_console. | TECH-01, TECH-02, TECH-04 | evidence/gsc/ files dated 2026-11-21 |
| Search Console (next) | (no plan row) | After the deploy: Request indexing for /document-checks ('URL is unknown to Google'). Do not re-request / (indexed, canonical as declared, request already on record). visa-prepperation.vercel.app is outside the Domain property: check it with a site: query in a clean browser. | TECH-01, TECH-03 | URL Inspection of /document-checks shows 'URL is on Google' |
| Search Console (weekly) | (no plan row) | Track the homepage row (baseline 7 clicks, 107 impressions, position 3.9), the brand regex (baseline 0 clicks, 16 impressions, position 4.9), app.visaprepper.com URLs in Page indexing and the 6 'Discovered - currently not indexed' URLs; run a clean-browser 'visaprepper' check (gl=us, in, pk, ng) 2-4 weeks after the deploy. | TECH-01, TECH-04 | Dated readings kept with these docs |
| Analytics and attribution | (no plan row) | No analytics on the site or app, so organic sign-ups cannot be measured (product truth alert 6). Choose a tool and conversion events and update the privacy page; this is a code and content change outside today's scope. | product truth alert 6 | Organic sign-ups become attributable; Search Console remains the only search data until then |
| Confirmations | C09, M011 | Confirm the phone number for contactPoint (C09, SB-14); confirm the TikTok and Facebook sameAs profiles exist; check who owns the Google Play app 'VisaPrepAI: US Visa Prep'; decide product truth alerts 1-5. M011 waits until the homepage ranks for 'visaprepper'. | SB-14 | Owner answers recorded in docs |
| Release base | (no plan row) | The live site matches GitHub branch release/marketing-2026-11-21 (1656169), one commit ahead of 99dac01. Base any metadata PR on it. | - | git log shows 1656169 in the PR base |

## Product truth alerts for the owner

These are contradictions between what the site says, what the app does and what can be measured. All six are **content or app changes outside today's scope** (owner rule: SEO metadata, structured data and new blog posts only). They are listed so the owner can decide; nothing here was changed. Sources: `evidence/product-facts.md` (checks 2026-11-21 10:55-11:02 UTC; app bundle evidence is client-side configuration only, nobody signed in) and the Search Console readout.

1. **Bangladesh is blocked in the app but promoted on the site.**
   - Evidence: App bundle /assets/index-DUMkqlXH.js (Last-Modified 2026-11-19): coming_soon_countries ['BD'] and the gate text 'VisaPrepper is not yet available to applicants from Bangladesh. Bangladesh is coming soon.', applied before the open-to-all-nationalities check. Site: /, /languages, /blog and /blog/us-visa-interview-questions-bangladesh tell Bangladeshi applicants to choose 'Another country' (components/marketing/LanguageWelcome.tsx:19, lib/config/offering.ts:15, the Bangladesh post lines 18 and 83). Server-side behaviour unknown (nobody signed in). Source: product-facts.md sections 1.1, 2.4, 5.1.
   - Why it matters: Visitors from Bangladesh (Search Console: 47 impressions, 0 clicks) are sent to an app that blocks them, a trust problem for visa advice. Today's new post us-visa-interview-questions says the app is not yet available to Bangladeshi nationals, so it now differs from the older Bangladesh post. The homepage Offer eligibleRegion 'Worldwide' matches the visible copy, so change it only together with the copy.
   - Owner decision: Open Bangladesh in the app, or change the site copy.
   - Scope: content/app change outside today's scope.

2. **The app shell says 'VisaPrep' and Pakistan/India/Bangladesh only.**
   - Evidence: Every app.visaprepper.com path returns the same 910-byte shell: og:title 'VisaPrep'; meta description 'VisaPrep helps applicants from Pakistan, India, and Bangladesh prepare for U.S. visa interviews...'; no robots meta. Search Console 2026-11-21: app.visaprepper.com/ and /signup are indexed (app root 1 click, 31 impressions, position 7.2). Source: product-facts.md sections 1.5, 4, 5.2; TECH-04.
   - Why it matters: Off-brand name and a narrower audience than the site's worldwide U.S. positioning, in URLs Google has indexed; it also weakens the brand entity (TECH-01 hypothesis 5).
   - Owner decision: App project change H04 (robots, noindex, 404s, 'VisaPrepper' shell metadata).
   - Scope: content/app change outside today's scope.

3. **UK and European routes are for Pakistani and Indian nationals only.**
   - Evidence: App bundle (bundle@192902): 'This route is currently available to Pakistani and Indian applicants'; applicant_countries ['PK','IN'] for international routes. The site says only 'country-specific eligibility', and the homepage DestinationExplorer CTAs 'Explore UK / France / Italy / Germany routes in the app' are shown to everyone. Source: product-facts.md sections 1.3, 2.4.
   - Why it matters: Consistent but vague: visitors from other countries may expect UK or EU practice they cannot use.
   - Owner decision: State the PK/IN limit in the copy, or open the routes.
   - Scope: content/app change outside today's scope.

4. **The homepage says 'Other'; the rest of the site and the app say 'Another country'.**
   - Evidence: app/page.tsx:58: international applicants 'can select Other'. Commit 99dac01 changed other pages and posts to 'Another country', which is also the app's onboarding card. Source: TECH-21; product-facts.md section 5.4.
   - Why it matters: Applicants may look for an option that the U.S.-for-all path does not use.
   - Owner decision: Align the homepage hero wording (visible copy).
   - Scope: content/app change outside today's scope.

5. **The checkout package id differs between site and app.**
   - Evidence: Site offer id complete-44-v1 (lib/config/offer.ts:3, lib/config/live-offering.ts:9); app package id launch (bundle@938309; app link /billing?package=launch). GET /api/checkout-entry returns 503; getCheckoutReady() fetches app.visaprepper.com/api/public/offering, which returns the HTML shell, so the gate cannot pass. The route is not linked, so users are unaffected. Source: product-facts.md sections 1.7, 5.3.
   - Why it matters: The copy 'Live Stripe checkout is available in the app' (app/document-checks/page.tsx:38, app/terms/page.tsx:55) and the Offer availability InStock cannot be confirmed.
   - Owner decision: Align the package id and gate, confirm the checkout state, then keep or adjust the copy and Offer.
   - Scope: content/app change outside today's scope.

6. **No analytics on the site or the app.**
   - Evidence: No analytics in the repo, live HTML, JS chunks or app bundle; /_vercel/insights/script.js returns 404; all app CTAs share one URL with no UTM, most with rel noreferrer. This report's spot-check of the live homepage (2026-11-21 14:29 UTC) found 0 analytics tags. Source: product-facts.md section 1.4 and the measurability summary.
   - Why it matters: Organic sign-ups cannot be measured or attributed. Search Console (22 clicks from 2026-09-05 to 2026-11-19) is the only search data.
   - Owner decision: Choose a tool and conversion events, and update the privacy page.
   - Scope: content/app change outside today's scope.

## Not allowed now (content, design, dates, fonts): backlog

| Ref | Item |
|---|---|
| TECH-05 | Visible 'Published' dates of 12 posts predate the domain (2026-09-06). Owner rule 2026-11-21: no date changes, so they stay; noted as a trust risk only. |
| TECH-16 | Add links to /visa-types/h1b, /h4 and /j1 from existing bodies, the homepage or /visa-interview-practice (new posts are allowed now and are the interim fix). |
| TECH-17 | Mobile: the fixed WhatsApp rail covers the secondary hero CTA on 375x812 (design change). |
| TECH-18 | Homepage weight (338 KB HTML, 1,560 nodes); reducing it needs content or design changes. |
| TECH-01 | Homepage H1 has no brand; adding it is a visible content change. |
| schema-brand | Visible brand spelling: homepage h2s 'Visa Prepper mobile apps are coming soon.' and '...join Visa Prepper.', the FAQ 'Will Visa Prepper help me get my visa?', img alt and aria-label, and the blog byline 'Visa Prepper Editorial Team'. If the byline changes, update the JSON-LD author name afterwards. |
| TECH-21 | Homepage hero says select 'Other' (app/page.tsx:58) while other pages say 'Another country': product truth alert 4. |
| product truth alert 1 | Bangladesh is promoted on the site but blocked in the app (bundle built 2026-11-19). Owner to confirm server behaviour, then change the app or the copy. |
| product truth alert 5 | 'Live Stripe checkout is available in the app' cannot be confirmed; site and app package ids differ (complete-44-v1 vs launch); /api/checkout-entry returns 503. |
| blog refresh | 14 of 20 posts are flagged 'refresh' in blog-inventory.csv (policy currency). Bodies stay unchanged now; notes live in that file. |
| SB-04 Option B | Per-post OG image template (new image design; needs sign-off). |
| TECH-06 | Fonts stay as they are (owner rule, 2026-11-21); no preload or subsetting change planned. |
| TECH-10 (C12) | Sitemap lastmod bump for /document-checks not applied (owner rule: no date changes). |
| product truth alerts 2, 3, 6 | App shell 'VisaPrep' metadata (H04), UK/EU routes limited to Pakistani and Indian nationals, and no analytics: app or code changes outside today's scope. |

## Not reproduced or not in the verified set

| Ref | Claim | Status | Note |
|---|---|---|---|
| TECH-01 | Homepage absent from page-1 web results for 'visaprepper' (gl=us) | Reproduced in a clean browser; not in a personalised one | The verifier's built-in-browser SERP (11:45-11:48 UTC) was degraded (control query site:nextjs.org returned no results). Later on 2026-11-21 the lead's clean built-in browser (gl=us) again showed the homepage absent from page-1 web results, while the owner's signed-in Chrome showed it #1 (personalised). Search Console shows the homepage indexed with the declared canonical. |
| SB-03 | /contact and /partners rank first for 'visaprepper' in gl=pk, gl=ng and gl=in | Not verified | From another agent's SERP observations. |
| schema-brand 2.6 | Google auto-corrects 'visaprepper' to 'visa prepper' for gl=in | Single observation | Not re-checked. |
| TECH-04 | 135 'Start Free' and 90 'Log In' anchors across the crawl | Method differs | The verifier counted hrefs instead (177 to /signup, 104 to the app root, 11:37 UTC). Free-intent CTAs point to /signup since a deploy between 10:55 UTC (product-facts: all CTAs to the bare app URL) and 11:37 UTC. |
| TECH-06 | 554,199 B link-initiated transfer in lab runs | Not re-measured | The 535,252 B preload total was re-measured. |
| TECH-15 | Homepage video poster is 73,254 B | Not re-measured |  |
| TECH-18 | 36,617 B gzip | Corrected | Brotli is 36,427 B; gzip is 48,929 B. |
| TECH-03 | State of the git-branch vercel.app alias | Not checked | Hostname not supplied. |
| SB-01 | Google 'strongly recommends' author url | Corrected | The doc says 'we recommend' and 'you could link'. |
| TECH-07 | PSI and CrUX unavailable (rate-limited) | Not in verified set | Info. PSI returned 429 on 8 attempts, 11:11-11:30 UTC. Search Console Core Web Vitals: no data (2026-11-21). |
| TECH-19 | /favicon.ico returns 404 | Not in verified set | Info. The icon link tag exists (/icon.jpg). |
| TECH-20 | External links: 0 broken; 11 travel.state.gov/ceac links return 403 to automated clients | Not in verified set | Spot-check in a normal browser. |
| TECH-21 | Homepage hero says select 'Other'; other pages say 'Another country' | Not in verified set | Visible copy: product truth alert 4. |
| TECH-22 | /llms.txt returns 404 | Not in verified set | Info; not a Google signal. |
| schema-brand | Google stopped FAQ rich results for all sites from 2026-05-07 (changelog 2026-05-08) | Not in verified set | Single-source; used only to avoid recommending FAQ rich results. |
| schema-brand | TikTok and Facebook sameAs profiles could not be confirmed by anonymous HTTP | Not in verified set | Owner to confirm the profiles exist. |
| product-facts | Bangladesh: site says use 'Another country'; app bundle (built 2026-11-19) blocks BD as coming soon | Single-source | Product truth alert 1; owner to confirm server behaviour. |
| product-facts | No analytics on the site or app; CTAs carry no UTM or intent | Single-source plus spot-check | Product truth alert 6. Live homepage 2026-11-21 14:29 UTC: 0 analytics tags found. |
| product-facts | Offer $44 InStock with eligibleRegion Worldwide while checkout readiness is unknown (/api/checkout-entry 503) | Single-source | Product truth alert 5. Offer values match visible copy; checkout state unknown. |
| SB-08 to SB-12 | Verified findings with ids SB-08, SB-09, SB-10, SB-11, SB-12 | Do not exist (numbering gap) | SB-08, SB-09, SB-10, SB-11 and SB-12 do not exist in any source available to this step. schema-brand.md numbers its items E1-E12 and uses no SB ids; verify-live/ and verify_src/ hold raw captures (headers, HTML, renders) with no finding ids; a search of the whole workflow output for 'SB-' finds only SB-01 to SB-07, SB-13 and SB-14 (all inside report-render/, a rendering of this report) plus the unrelated returning-resident visa class 'SB-1' in two saved official pages. The verified SB ids reached this report only through the verification payload, which was cut off inside SB-14. They are therefore treated as a numbering gap: no finding carries these ids and nothing is listed under them. No SB id above SB-14 exists. All twelve schema-brand.md items (E1-E12) and its other recommendations are mapped in the register, so no schema or brand recommendation is unaccounted for. |
| Search Console | Search Console readout dated 2026-11-21 | Used (provenance established) | The lead read Search Console read-only on 2026-11-21 through the owner's signed-in Chrome profile at the owner's explicit request. Treated as genuine, authorised evidence: see search_console and evidence/gsc/. This replaces the earlier 'not used' note. |

## Coordination with the other 2026-11-21 docs

All plan references use the current ids in metadata-plan.csv.

| Doc | metadata-plan.csv ids | Note |
|---|---|---|
| keyword-clusters.md, 'Do first' line for / | C11 | Proposes name 'Visa Prepper' with alternateName 'VisaPrepper'. Plan row C11 (keep) keeps name 'VisaPrepper' with alternateName ['Visa Prepper', 'visaprepper.com'], as schema-brand.md 3.1 recommends. Follow C11; the October 2026 decision stands. |
| metadata-plan.csv M007, M017, M019 (keep, deferred) | M007, M017, M019, M008, M018, M024, M026, M028 | The /contact, /partners and /partners/apply titles stay, which matches SB-03 and the schema-brand.md E4-E6 caution. Revisit when the homepage ranks for 'visaprepper' in a clean browser. The description rows M008, M018, M024, M026 and M028 are implemented. |
| metadata-plan.csv M011 (held) | M011 | The /features title is held for the same reason: /features ranks on page 1 for the brand query. |
| metadata-plan.csv M001, M002 (implemented, not deployed) | M001, M002, C17 | New homepage title 'VisaPrepper (Visa Prepper): AI U.S. Visa Interview Practice' and a new description. Brand-first, so compatible with TECH-01. Record the deploy date; the Search Console baseline for / is 7 clicks, 107 impressions, position 3.9 (2026-09-05 to 2026-11-19). C17 updates the test assertion. |
| metadata-plan.csv C04 (implemented) | C04 | The working tree now uses the preview-only robots form proposed in the plan (no index/follow, no googleBot block), replacing the variant described in earlier drafts of this report. |
| New posts and metadata-plan.csv C01, C02, C18 | C01, C02, C18, M090, M091, M092, M093, M094, M095, M096, M097, M098, M099, M100, M101, M104, M105 | The 7 new posts set seoDescription; it reaches the meta description only through C01 and C02 (both implemented). Ship them together. C18 test counts are updated (27 posts, 51 sitemap entries). The posts carry publishDate 2026-11-21, clear of the TECH-05 date problem. |
| metadata-plan.csv C12 (not done) | C12 | Owner rule: no date changes. /document-checks lastmod stays 2026-11-17 although its FAQ changed on 2026-11-21. |
| metadata-plan.csv C16 (keep) | C16 | No new noindex on /terms, /privacy, /refund-policy, /contact, /partners or /partners/apply. Earlier drafts of this report cited an older plan proposal to noindex /partners/apply; the current plan keeps it indexable. Search Console lists /partners/apply as 'Discovered - currently not indexed'. |
| metadata-plan.csv C09 (held) | C09 | Held for owner confirmation of the phone number (SB-14). |
| metadata-plan.csv H01-H04 | H01, H02, H03, H04 | Hosting and app-project rows; see owner_actions. |

## Finding details

### TECH-01: Homepage absent from page-1 non-personalised web results for 'visaprepper' (indexed, Google canonical = declared; brand-ranking issue)

- **Priority:** Medium tier; severity Medium (reported High, lowered by the verifiers)
- **Category:** Technical SEO
- **Fix type:** owner-action; implement_now: false
- **Evidence, brand SERP (2026-11-21):** in a clean built-in browser (google.com, hl=en, gl=us, pws=0, IP country unknown) page 1 for 'visaprepper' listed /terms first, then /features, /partners, Instagram @visaprepper, visapro.com, /pricing, vispera.co and a Google Play app 'VisaPrepAI: US Visa Prep'; the homepage appeared only in the Images strip. The same day, in the owner's signed-in Chrome, the homepage ranked #1 (personalised). Built-in-browser checks for gl=in (auto-corrected to 'visa prepper', /partners first), gl=pk and gl=ng (/contact first) also showed the homepage only in the Images strip. For the quoted query "visa prepper" the homepage ranked last on page 1 with a Google-rewritten title link 'Visa Prepper'.
- **Evidence, Search Console (2026-11-21; `evidence/gsc/README.md`, `evidence/gsc/pages-2026-11-21.csv`):** URL Inspection of https://visaprepper.com/ shows it indexed, last crawled Nov 21, 2026 09:55 by Googlebot smartphone, with the Google-selected canonical equal to the declared https://visaprepper.com/ and an earlier indexing request on record. From 2026-09-05 to 2026-11-19 the homepage had 7 clicks, 107 impressions, CTR 6.5% and average position 3.9, the most clicks of any URL. Its queries are mostly anonymized: the 109 reported queries account for 1 click and none contains 'visaprepper' or 'visa prepper'. The brand regex `visa\s?prep|prepper|visaper|visaprep` returns 0 clicks and 16 impressions (position 4.9). The http and www homepage variants are 'Page with redirect'.
- **Evidence, on-page (2026-11-21 11:36-11:41 UTC):** HTTP 200, server-rendered (raw 5,755 vs rendered 5,754 words), self canonical https://visaprepper.com, brand-first 60-char title 'VisaPrepper | U.S. Visa Interview Practice & Document Checks' (live at audit time; M001 replaces it in the working tree), no meta robots or X-Robots-Tag, byte-identical body for a Googlebot UA, WebSite and Organization JSON-LD name 'VisaPrepper' with alternateName ['Visa Prepper', 'visaprepper.com'].
- **Context:** the H1 'Your U.S. visa interview starts with better preparation.' has no brand; the homepage has about 5,640 main-content words with 9 brand mentions (0.16%) versus /terms 789 words with 11 (1.4%). WHOIS: domain created 2026-09-06 (76 days old). The homepage was edited twice on 2026-11-04 and twice on 2026-11-18.
- **What Search Console settles and what it does not:** it settles indexing and canonicalisation: the homepage is indexed and Google uses the declared canonical, so this is not an indexing problem. It does not settle the rank for 'visaprepper': the homepage's 107 impressions at average position 3.9 come from mostly anonymized queries, and an average over all of the homepage's queries is compatible with it missing page 1 for the single bare-brand query. The two brand SERP readings differ because the owner's signed-in Chrome is personalised; the clean-browser miss is the reading that matters for new searchers. Both are recorded.
- **Hypotheses, revised with Search Console:**
  1. *Canonical-host split (TECH-02, TECH-03): largely ruled out for the homepage.* Google indexed the apex homepage and kept the declared canonical, and the www and http variants are reported as redirects. The 307 and the vercel.app duplicate remain hygiene items. The vercel.app host is outside the Domain property, so its index state is unknown.
  2. *New domain and an ambiguous one-word brand token: the most likely remaining cause.* The domain is 76 days old; Google auto-corrects 'visaprepper' to 'visa prepper' in gl=in and shows look-alikes (visapro.com, vispera.co, VisaPrepAI); brand-like queries are tiny (16 impressions in 11 weeks). Non-personalised results rank pages by term match (/terms brand density 1.4% vs homepage 0.16%), while the owner's personalised results put the homepage first.
  3. *Topic dilution and an H1 without the brand: still possible.* Fixing the H1 or copy is a visible content change (not allowed now). M001 puts both spellings in the homepage title (working tree, not deployed).
  4. *Re-processing after repeated edits: weaker.* The homepage was recrawled on Nov 21, 2026 and is indexed.
  5. *Conflicting brand signals from the app subdomain: stronger than before.* app.visaprepper.com/ and /signup are indexed with the shell metadata 'VisaPrep ... Pakistan, India, and Bangladesh' (TECH-04, H04, product truth alert 2).
- **Measurement limit:** brand-query volume is tiny and mostly anonymized, so Search Console cannot show the homepage's position for 'visaprepper' itself. The pages that rank in the clean brand SERP (/terms, /features, /partners, /contact, /pricing) also show small impression counts at average positions 3.4-6.4 with anonymized queries, which fits brand or navigational searches but does not prove it. Dated clean-browser checks remain the measure; record a personalised reading next to each one.
- **Recommendation:** Do not request indexing for / again (it is indexed with the declared canonical and a request is already on record). Owner: ship H01 and H02 (TECH-02, TECH-03) and H04 (TECH-04); deploy the metadata batch including M001 and M002 and record the deploy date. 2-4 weeks after the deploy, repeat the clean-browser 'visaprepper' check (gl=us, in, pk, ng) next to a personalised reading, and compare the homepage's Search Console row with the baseline (7 clicks, 107 impressions, position 3.9). Keep the brand-first title; keep the /contact, /partners and /partners/apply titles (M007, M017, M019) and the held /features title (M011) until the homepage ranks. Changing the H1 or copy is a visible content change and not allowed now.
- **Source location:** No code root cause. Context only: app/page.tsx:21-22 (metadata), app/page.tsx:51 (visible eyebrow with brand), app/page.tsx:52-55 (H1), lib/seo/json-ld.tsx:31-42 (WebSite) @99dac01
- **Affected URLs:** https://visaprepper.com/, https://visaprepper.com/terms, https://visaprepper.com/features, https://www.visaprepper.com/, https://visa-prepperation.vercel.app/
- **Status 2026-11-21:** Open. Investigation updated with Search Console (homepage indexed, Google canonical = declared). Owner/hosting actions H01, H02 and H04 pending. M001 and M002 implemented in the working tree, not deployed. Monitor the clean-browser brand SERP after the deploy.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier; brand SERP re-observed by the lead in a clean built-in browser on 2026-11-21; Search Console readout 2026-11-21

### TECH-02: www to apex uses a temporary 307; http://www takes two hops (308 then 307)

- **Priority:** Medium tier; severity Medium (reported High, lowered by the verifiers)
- **Category:** Technical SEO
- **Fix type:** hosting-config; implement_now: false
- **Evidence:** curl -sI 2026-11-21 11:36 UTC: https://www.visaprepper.com/ -> 307 https://visaprepper.com/ -> 200; /pricing and ?x=1 also 307 with path and query kept; http://www.visaprepper.com/ -> 308 https://www.visaprepper.com/ -> 307 apex (2 hops); http://visaprepper.com/ -> 308 apex (1 hop). Re-checked 14:29 UTC: www still 307. Flagged before in docs/seo-indexing-2026-10-19.md and docs/seo-implementation-2026-11-04.md ('remains a hosting follow-up'). Canonicals, sitemap, og:url and JSON-LD all name the apex and the repo never references www, so the ranking effect is likely small, but a temporary redirect is a weak canonical-host signal. SB-02 is merged here. Search Console 2026-11-21: http://visaprepper.com/, http://www.visaprepper.com/ and https://www.visaprepper.com/ are 'Page with redirect' (not indexed) and the apex homepage is indexed with its declared canonical, so the 307 has not split the homepage canonical.
- **Recommendation:** Vercel > Project > Settings > Domains: set www.visaprepper.com to redirect to visaprepper.com with 308 Permanent, preserving path and query. Vercel applies this before Next.js runs, so app code cannot fix it. Verify with curl -sI https://www.visaprepper.com/ (expect 308).
- **Source location:** Vercel domain settings (not in repo; next.config.ts is an empty config and there is no vercel.json)
- **Affected URLs:** https://www.visaprepper.com/, http://www.visaprepper.com/, https://www.visaprepper.com/pricing
- **Status 2026-11-21:** Owner/hosting action H01 (Vercel Domains); not a repo change. Open.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-03: Production vercel.app alias serves an indexable full duplicate (no X-Robots-Tag; canonical hint only)

- **Priority:** Medium tier; severity Medium
- **Category:** Technical SEO
- **Fix type:** hosting-config; implement_now: false
- **Evidence:** 2026-11-21 11:36 UTC: https://visa-prepperation.vercel.app/ -> 200, body byte-identical to the apex (same etag), no X-Robots-Tag, no meta robots, canonical https://visaprepper.com; /pricing identical with canonical https://visaprepper.com/pricing; robots.txt identical ('Allow: /', apex sitemap). Re-checked 14:29 UTC: still 200 with no X-Robots-Tag. The team-scoped alias (visa-prepperation-`<team>`.vercel.app) already sends X-Robots-Tag: noindex. The git-branch alias was not checked because its hostname was not supplied. Whether Google indexed the alias is unknown: the visaprepper.com Domain property in Search Console cannot show it. SB-02 is merged here.
- **Recommendation:** Vercel Domains: redirect visa-prepperation.vercel.app to visaprepper.com (308). Fallback: a host-conditional X-Robots-Tag: noindex (vercel.json headers, or next.config.ts headers() with has:[{type:'host', value:'visa-prepperation.vercel.app'}]; that is config code the owner must approve). Also confirm the git-branch alias sends noindex.
- **Source location:** Vercel domain settings; app/robots.ts:6-14 emits the same allow-all robots.txt on every host; next.config.ts:3 has no host-conditional headers or redirects
- **Affected URLs:** https://visa-prepperation.vercel.app/, https://visa-prepperation.vercel.app/pricing
- **Status 2026-11-21:** Owner/hosting action H02 (Vercel Domains); not a repo change. Open.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-04: app.visaprepper.com: every path is a 200 SPA shell with no noindex or canonical; robots.txt and sitemap.xml return HTML; shell metadata says 'VisaPrep' for Pakistan/India/Bangladesh

- **Priority:** Medium tier; severity Medium
- **Category:** Technical SEO
- **Fix type:** owner-action; implement_now: false
- **Evidence:** 2026-11-21 11:37 UTC curl: /, /login, /signup, /dashboard, /robots.txt, /sitemap.xml and a random path all return 200 text/html, 910 B, one md5; no X-Robots-Tag, no meta robots, no canonical. Head: `<title>`VisaPrepper`</title>`, og:title 'VisaPrep', meta description 'VisaPrep helps applicants from Pakistan, India, and Bangladesh...'. Rendered with render_page.py --mode always (sandbox true): title 'Sign in | VisaPrepper', H1 'Welcome back', still no robots meta. An HTML robots.txt parses as no rules (everything crawlable) and 200-for-everything invites soft-404s. The marketing pages link app.visaprepper.com/signup about 177 times and the app root about 104 times across the 44 sitemap pages (href count, 11:37 UTC); the homepage alone had 6 /signup and 8 root links at 14:29 UTC. Search Console 2026-11-21: https://app.visaprepper.com/ and https://app.visaprepper.com/signup are indexed (Page indexing); the app root had 1 click and 31 impressions at position 7.2 (2026-09-05 to 2026-11-19). Small related item: the comment at lib/config/site.ts:87 says the app host returns 404 for /signup, which is stale.
- **Recommendation:** In the separate app project: serve a real text/plain robots.txt, return 404 for unknown routes, send X-Robots-Tag: noindex on authenticated and app routes (owner decides whether /login and /signup stay indexable), and change the shell title, description and og tags to 'VisaPrepper' with the worldwide U.S.-visa audience. Because the app root and /signup are indexed, decide first whether /signup should stay indexable.
- **Source location:** Separate app project (not this repo); this repo only links to it via lib/config/site.ts EXTERNAL_APP_URL / EXTERNAL_LOGIN_URL (and EXTERNAL_SIGNUP_URL on release/marketing-2026-11-21)
- **Affected URLs:** https://app.visaprepper.com/, https://app.visaprepper.com/login, https://app.visaprepper.com/signup, https://app.visaprepper.com/dashboard, https://app.visaprepper.com/robots.txt
- **Status 2026-11-21:** Owner/hosting action H04 in the separate app project. Open. Search Console shows app.visaprepper.com/ and /signup indexed.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-05: 12 blog posts show publish dates (Jan-Feb 2026) earlier than the domain's registration (2026-09-06)

- **Priority:** Medium tier; severity Medium
- **Category:** Content Quality
- **Fix type:** content-change-not-allowed; implement_now: false
- **Evidence:** WHOIS (domain_history.py): created 2026-09-06T09:31:42Z, NameCheap. The repo's first commit 3e36b55 and the first add of all 12 files are also 2026-09-06. Live 2026-11-21 11:38 UTC: each post shows a visible 'Published `<date>`' with matching Article.datePublished and article:published_time: 214b 01-20, b1-b2-questions 01-14, ds-160 01-16, f1-questions 01-12, h1b 01-22, h4 01-24, j1 01-26, mock-visa-interview-online 02-03, documents-checklist 01-18, bangladesh 02-01, india 01-30, pakistan 01-28. This is an accuracy and trust concern for visa-advice content, and date snippets make the posts look about 8 months older than they are.
- **Recommendation:** Owner to confirm where and when these posts were first published. If they first went live on visaprepper.com in September 2026, correct publishDate (a visible field; needs owner approval) and update tests/seo-implementation.test.ts:55-56. Never change the JSON-LD dates alone; they must match the visible dates.
- **Source location:** content/blog/\*.mdx publishDate (line 5 or 6); components/blog/BlogPostHeader.tsx:20; components/blog/BlogCard.tsx:17; lib/seo/json-ld.tsx:126; app/blog/[slug]/page.tsx:41 @99dac01
- **Affected URLs:** https://visaprepper.com/blog/214b-visa-refusal-guide, https://visaprepper.com/blog/b1-b2-visa-interview-questions, https://visaprepper.com/blog/ds-160-interview-consistency, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers, https://visaprepper.com/blog/h1b-visa-interview-questions, https://visaprepper.com/blog/h4-visa-interview-questions, https://visaprepper.com/blog/j1-visa-interview-questions, https://visaprepper.com/blog/mock-visa-interview-online, https://visaprepper.com/blog/us-visa-interview-documents-checklist, https://visaprepper.com/blog/us-visa-interview-questions-bangladesh, https://visaprepper.com/blog/us-visa-interview-questions-india, https://visaprepper.com/blog/us-visa-interview-questions-pakistan
- **Status 2026-11-21:** Not done by owner rule: the owner forbids date changes (2026-11-21). The dates stay; noted as a trust risk only.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-06: About 535 KB of font preloads on every page, including about 394 KB of Noto Arabic/Devanagari/Bengali

- **Priority:** Medium tier; severity Medium
- **Category:** Performance (CWV)
- **Fix type:** owner-action; implement_now: false
- **Evidence:** 2026-11-21 11:39 UTC: all 44 sitemap pages carry 5 `<link rel=preload as=font>`: Noto Sans Arabic 166,152 B, Fraunces 120,800 B, Noto Sans Devanagari 120,232 B, Noto Sans Bengali 107,884 B, Figtree 20,184 B (535,252 B total; 394,268 B Noto). The Noto fonts are used on every page by the footer language chips (SiteFooter -> LanguageChip -> NATIVE_SCRIPT_BY_LOCALE), so the comment 'not loaded globally' at lib/fonts.ts:22-23 is wrong. Field Core Web Vitals impact is unknown (no CrUX or PSI data).
- **Recommendation:** preload:false on notoUrdu, notoHindi and notoBengali lowers their priority so they stop competing with CSS, JS and the LCP text; they still download for the footer chips, so bytes are not saved. Real savings need subsetting to the few glyphs used. Both are code changes outside the metadata-only scope and need owner approval.
- **Source location:** lib/fonts.ts:22-49; components/layout/SiteFooter.tsx:5,31 @99dac01
- **Affected URLs:** https://visaprepper.com/, https://visaprepper.com/pricing, https://visaprepper.com/terms, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers
- **Status 2026-11-21:** Not done by owner rule: the owner said leave fonts as they are (2026-11-21).
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-02: Duplicate homepage host and temporary www redirect weaken homepage and site-name signals (merged into TECH-02 and TECH-03)

- **Priority:** Medium tier; severity Medium
- **Category:** Technical SEO
- **Fix type:** hosting-config; implement_now: false
- **Evidence:** Same live checks as TECH-02 and TECH-03 (2026-11-21 11:36 UTC). Google's site-names doc (last updated 2025-12-10, fetched 2026-11-21 11:43 UTC) asks for the same markup on duplicate home pages and for redirects that work as intended. The duplicate already carries identical WebSite markup, which limits the site-name risk.
- **Recommendation:** Tracked under TECH-02 and TECH-03 (H01, H02). The Search Console URL Inspection on / that this item called for was read on 2026-11-21: the homepage is indexed with Google's canonical equal to the declared one, and the http and www variants are 'Page with redirect' (TECH-01). The vercel.app host is outside the Domain property, so check it with a site: query in a clean browser.
- **Source location:** Vercel project Domains settings
- **Affected URLs:** https://visa-prepperation.vercel.app/, https://www.visaprepper.com/, https://visaprepper.com/
- **Status 2026-11-21:** Merged into TECH-02 and TECH-03; owner/hosting actions H01 and H02.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-08: 12 titles exceed about 60 characters (truncation risk)

- **Priority:** Low tier; severity Low
- **Category:** On-Page SEO
- **Fix type:** metadata-code; implement_now: true
- **Evidence:** Live `<title>` lengths 2026-11-21 11:38-11:40 UTC (entities decoded): mock-visa-interview-online 77, bangladesh 72, ds-160 70, /blog 69, 214b 68, f1-who-will-pay 66, follow-up-questions 65, 7-day-plan 64, any-country 64, nervous-forget-answer 64, free-ai-mock 63, best-ai-tools 61. The template ' | VisaPrepper' adds 14 chars. ds-160, f1-visa-interview-who-will-pay, mock-visa-interview-online, us-visa-interview-questions-bangladesh and visa-interview-follow-up-questions have no seoTitle and fall back to the visible title. Truncation is pixel-based and Google often rewrites titles.
- **Recommendation:** Add or shorten frontmatter seoTitle (it feeds only `<title>`, og/twitter title and og:image:alt) to 46 chars or fewer so the full title stays at 60 or fewer. Shorten the /blog metadata title in app/blog/page.tsx:11 (the visible H1 at :35 is separate). tests/seo-implementation.test.ts:51 requires seoTitle under 65 chars for 7 slugs, which shorter titles satisfy. Proposed strings are in metadata-plan.csv.
- **Source location:** content/blog/`<slug>`.mdx:2-3; app/blog/page.tsx:11; app/layout.tsx:14; app/blog/[slug]/page.tsx:32 @99dac01
- **Affected URLs:** https://visaprepper.com/blog/mock-visa-interview-online, https://visaprepper.com/blog/us-visa-interview-questions-bangladesh, https://visaprepper.com/blog/ds-160-interview-consistency, https://visaprepper.com/blog, https://visaprepper.com/blog/214b-visa-refusal-guide, https://visaprepper.com/blog/f1-visa-interview-who-will-pay, https://visaprepper.com/blog/visa-interview-follow-up-questions, https://visaprepper.com/blog/f1-visa-mock-interview-online-7-day-plan, https://visaprepper.com/blog/us-visa-interview-preparation-any-country, https://visaprepper.com/blog/visa-interview-nervous-forget-answer, https://visaprepper.com/blog/free-ai-visa-mock-interview-online, https://visaprepper.com/blog/best-ai-visa-interview-tools
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): M005, M050, M056, M058, M062, M064, M066, M074, M078, M080, M086, M088 (rendered titles 55-60 characters).
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-09: 4 meta descriptions exceed 160 characters

- **Priority:** Low tier; severity Low
- **Category:** On-Page SEO
- **Fix type:** metadata-code; implement_now: true
- **Evidence:** Live 2026-11-21: /document-checks 171, /blog/us-visa-interview-preparation-any-country 167, /blog/h4-visa-interview-questions 165, /blog/f1-visa-interview-who-will-pay 161 (ds-160 and bangladesh are exactly 160). The /document-checks string is metadata-only (the visible description at :23 is different text). Blog frontmatter description is rendered visibly (BlogPostHeader.tsx:13, BlogCard.tsx:22), and the production zod schema strips unknown keys, so posts need a new SEO-only field.
- **Recommendation:** Trim the /document-checks metadata description (app/document-checks/page.tsx:15). For posts, add an SEO-only seoDescription frontmatter field (zod schema plus generateMetadata) and set values for the 3 posts.
- **Source location:** app/document-checks/page.tsx:15; app/blog/[slug]/page.tsx:33; lib/content/posts.ts:9-26 @99dac01
- **Affected URLs:** https://visaprepper.com/document-checks, https://visaprepper.com/blog/us-visa-interview-preparation-any-country, https://visaprepper.com/blog/h4-visa-interview-questions, https://visaprepper.com/blog/f1-visa-interview-who-will-pay
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): C01 and C02 (seoDescription field) plus M010, M063, M071 and M079.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-10: Sitemap lastmod not refreshed after the 2026-11-21 release; changefreq/priority present

- **Priority:** Low tier; severity Low
- **Category:** Technical SEO
- **Fix type:** sitemap-robots-code; implement_now: false (owner rule 2026-11-21: no date changes; C12 not applied)
- **Evidence:** sitemap_discovery.py --expand and curl 2026-11-21 11:39 UTC (re-fetched 14:29 UTC, identical): valid urlset, 44 URLs, 7,069 B, lastmod on 40 (34 at 2026-11-17, 6 at 2026-11-04), none on /partners, /partners/apply, /contact, /refund-policy (by design). /document-checks still says 2026-11-17 although the live page carries the 99dac01 (2026-11-21) FAQ text 'U.S. Checks require one route-specific application PDF per Check'. 99dac01 also made small wording edits ('Other' to 'Another country') on /about, /languages, /visa-types, /visa-interview-practice, /blog, the visa-type template, the footer and about 12 posts without date bumps. changefreq and priority are present and ignored by Google.
- **Recommendation:** Set PAGE_UPDATED['/document-checks'] = '2026-11-21' in lib/seo/content-dates.ts (sitemap-only). For the other 99dac01 pages the owner decides whether the wording edits are substantive. Blog lastmod follows the visible updatedDate, so bumping it is a visible change (not allowed) unless a new non-rendered field is added and tests/seo-implementation.test.ts:31 is updated. Removing changefreq/priority is optional.
- **Source location:** lib/seo/content-dates.ts:8; app/sitemap.ts:11-48 @99dac01
- **Affected URLs:** https://visaprepper.com/document-checks, https://visaprepper.com/sitemap.xml
- **Status 2026-11-21:** Not done by owner rule: C12 (the /document-checks lastmod bump) is a date change, which the owner forbids. C13 keeps changefreq and priority.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-11: Root layout canonical '/' is inherited by 404 responses

- **Priority:** Low tier; severity Low
- **Category:** Technical SEO
- **Fix type:** metadata-code; implement_now: true
- **Evidence:** 2026-11-21 11:41 UTC: /this-page-does-not-exist, /PRICING, /Blog, /visa-types/F1, /index.html, /favicon.ico, /llms.txt and /visa-interview-practice/bangladesh return 404 with meta robots noindex and canonical https://visaprepper.com. No harm today (noindex 404s are dropped). The risk is a future page without buildPageMetadata silently canonicalizing to the homepage.
- **Recommendation:** Remove alternates.canonical from the root metadata in app/layout.tsx. Every current route sets its own canonical through buildPageMetadata. After the build, confirm every route still emits its own canonical.
- **Source location:** app/layout.tsx:22-24 @99dac01
- **Affected URLs:** https://visaprepper.com/this-page-does-not-exist, https://visaprepper.com/PRICING, https://visaprepper.com/favicon.ico
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): C03.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-12: /index returns a 200 duplicate of the homepage

- **Priority:** Low tier; severity Low
- **Category:** Technical SEO
- **Fix type:** hosting-config; implement_now: false
- **Evidence:** 2026-11-21 11:41 UTC: https://visaprepper.com/index -> 200, byte-identical to /, canonical https://visaprepper.com; no internal link to it. /pricing/ and /blog/ correctly 308 to the slashless form. The canonical already consolidates it.
- **Recommendation:** Add a 308 redirect /index -> / in Vercel redirects or vercel.json, or next.config.ts redirects() (config change; owner approval).
- **Source location:** Next.js App Router resolves /index to app/page.tsx; no redirect in next.config.ts:3
- **Affected URLs:** https://visaprepper.com/index
- **Status 2026-11-21:** Owner/hosting action H03. Open.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-13: Security headers minimal: HSTS only

- **Priority:** Low tier; severity Low
- **Category:** Technical SEO
- **Fix type:** hosting-config; implement_now: false
- **Evidence:** 2026-11-21 11:36 UTC homepage headers: strict-transport-security max-age=63072000 (no includeSubDomains or preload) and access-control-allow-origin: *. No Content-Security-Policy, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy or Permissions-Policy. Not a ranking factor.
- **Recommendation:** Add the headers in Vercel or vercel.json. Any CSP must allow the inline JSON-LD and the Next.js inline RSC scripts, or pages break.
- **Source location:** next.config.ts:3 (no headers()); no vercel.json
- **Affected URLs:** https://visaprepper.com/
- **Status 2026-11-21:** Owner/hosting action (no metadata-plan row). Open.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-14: No robots max-image-preview:large on any page

- **Priority:** Low tier; severity Low
- **Category:** Technical SEO
- **Fix type:** metadata-code; implement_now: true
- **Evidence:** 2026-11-21: none of the 44 sitemap pages sends a meta robots tag or X-Robots-Tag; only /start has 'noindex, follow'. Without max-image-preview:large Google may show only small image previews.
- **Recommendation:** Add robots / googleBot { 'max-image-preview': 'large' } to the root metadata. Keep /start noindex. After the build, confirm the 404 page still emits noindex and that /start does not get a second, conflicting robots tag.
- **Source location:** app/layout.tsx:10-25 @99dac01
- **Affected URLs:** https://visaprepper.com/
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): C04, preview-only robots (max-image-preview:large, max-snippet:-1, max-video-preview:-1), with no index/follow and no googleBot block.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-15: Structured-data gaps: Article without image, homepage video without VideoObject, /pricing without Offer

- **Priority:** Low tier; severity Low
- **Category:** Schema / Structured Data
- **Fix type:** schema-code; implement_now: true (Article.image via SB-04; VideoObject optional; /pricing Offer skipped)
- **Evidence:** Live 2026-11-21: JSON-LD parses on all 44 sitemap pages with 0 errors. The 20 Article blocks have no image. The homepage `<video>` (/video/visaprepper-ai-video-interview.mp4, 2,800,907 B, preload=none, with poster) has no VideoObject. /pricing has Organization only; Offers already exist in the homepage SoftwareApplication. All pages share og:image /opengraph-image.
- **Recommendation:** Article.image: ship with SB-04. VideoObject: optional schema-only addition that describes a visible video; video rich results are unlikely because it is not the page's main content. /pricing Offer: skip (no rich-result type; Offer already on /).
- **Source location:** lib/seo/json-ld.tsx:112-143; app/pricing/page.tsx:4; components/marketing/ProductDemoVideo.tsx (no schema)
- **Affected URLs:** https://visaprepper.com/, https://visaprepper.com/pricing, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers
- **Status 2026-11-21:** Partly implemented: Article.image via C06 (working tree, not deployed). VideoObject not started (optional; no plan row). /pricing Offer skipped by design.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-16: Visa-type pages h1b, h4 and j1 have only 2 linking pages each

- **Priority:** Low tier; severity Low
- **Category:** On-Page SEO
- **Fix type:** content-change-not-allowed; implement_now: false
- **Evidence:** Inlink graph of the 44 live sitemap pages, 2026-11-21: /visa-types/h1b is linked only from /visa-types and /blog/h1b-visa-interview-questions; h4 and j1 follow the same pattern; family-immigrant has 4, f1 8, b1-b2 7. Neither / nor /visa-interview-practice links any /visa-types/\* page. Max click depth is 2 (21 URLs at depth 1, 22 at depth 2).
- **Recommendation:** Link these pages from new blog posts (allowed). Adding links to existing bodies or templates is not allowed now.
- **Source location:** app/visa-types/page.tsx:36-37; content/blog/{h1b,h4,j1}-visa-interview-questions.mdx; components/marketing/DestinationExplorer.tsx:20
- **Affected URLs:** https://visaprepper.com/visa-types/h1b, https://visaprepper.com/visa-types/h4, https://visaprepper.com/visa-types/j1
- **Status 2026-11-21:** Interim fix written: the new post us-visa-interview-questions (M090, M091; untracked, not deployed) links /visa-types/h1b, /h4 and /j1. Links from existing bodies stay in the content backlog.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-01: Article author is an unlinked second entity with the spaced brand spelling

- **Priority:** Low tier; severity Low (reported Medium, lowered by the verifiers)
- **Category:** Schema / Structured Data
- **Fix type:** schema-code; implement_now: true
- **Evidence:** Live 2026-11-21: all 20 Article blocks have author {"@type":"Organization","name":"Visa Prepper Editorial Team"} with no @id, url or link to the publisher {"@id":"https://visaprepper.com/#organization","name":"VisaPrepper"}. The visible byline reads 'By Visa Prepper Editorial Team', so the name must stay. Google's Article doc (last updated 2026-09-08, fetched 11:43 UTC) recommends author url or sameAs and says an organization author could link to the organization's home page (recommended, not required).
- **Recommendation:** In buildArticleJsonLd keep author.name equal to the visible byline and add "@id":"https://visaprepper.com/#editorial-team", "url":"https://visaprepper.com/about" and "parentOrganization":{"@id":"https://visaprepper.com/#organization"}. Do not rename the author in JSON-LD unless the visible byline changes first.
- **Source location:** lib/seo/json-ld.tsx:128-131
- **Affected URLs:** https://visaprepper.com/blog/us-visa-interview-preparation-any-country, https://visaprepper.com/blog/f1-visa-mock-interview-online-7-day-plan, https://visaprepper.com/blog/b1-b2-visa-mock-interview-scenarios, https://visaprepper.com/blog/free-ai-visa-mock-interview-online, https://visaprepper.com/blog/best-ai-visa-interview-tools, https://visaprepper.com/blog/visa-interview-nervous-forget-answer, https://visaprepper.com/blog/visa-interview-follow-up-questions, https://visaprepper.com/blog/f1-visa-interview-who-will-pay, https://visaprepper.com/blog/mock-visa-interview-online, https://visaprepper.com/blog/us-visa-interview-questions-bangladesh, https://visaprepper.com/blog/us-visa-interview-questions-india, https://visaprepper.com/blog/us-visa-interview-questions-pakistan, https://visaprepper.com/blog/j1-visa-interview-questions, https://visaprepper.com/blog/h4-visa-interview-questions, https://visaprepper.com/blog/h1b-visa-interview-questions, https://visaprepper.com/blog/214b-visa-refusal-guide, https://visaprepper.com/blog/us-visa-interview-documents-checklist, https://visaprepper.com/blog/ds-160-interview-consistency, https://visaprepper.com/blog/b1-b2-visa-interview-questions, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): C05 (schema-brand.md E1).
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-03: Mixed brand spellings in metadata-only titles and descriptions

- **Priority:** Low tier; severity Low (reported Medium, lowered by the verifiers)
- **Category:** On-Page SEO
- **Fix type:** metadata-code; implement_now: true (5 descriptions now; 3 title edits deferred)
- **Evidence:** Live 2026-11-21: titles /contact 'Contact Visa Prepper | VisaPrepper', /partners 'Visa Prepper Partner Program | VisaPrepper', /partners/apply 'Apply to the Visa Prepper Partner Program | VisaPrepper' (repeated in og:title, twitter:title and og:image:alt). Meta descriptions use 'Visa Prepper' on /contact, /partners, /privacy, /refund-policy and /terms. og:site_name and the title suffix say 'VisaPrepper' on 44/44 pages. None of these strings is rendered visibly. The spaced form is deliberate (SITE_ALTERNATE_NAMES; homepage copy 'VisaPrepper, also written Visa Prepper'), visible copy on these pages also mixes spellings, and these titles may help /partners rank for '"visa prepper"'.
- **Recommendation:** Now: replace 'Visa Prepper' with 'VisaPrepper' in the 5 descriptions (app/contact/page.tsx:13, app/partners/page.tsx:4, app/privacy/page.tsx:9, app/refund-policy/page.tsx:10, app/terms/page.tsx:10). Defer the title edits ('Contact Us', 'Partner Program', 'Apply to the Partner Program') until the homepage ranks for the brand query.
- **Source location:** app/contact/page.tsx:12-13; app/partners/page.tsx:4; app/partners/apply/page.tsx:4; app/privacy/page.tsx:9; app/refund-policy/page.tsx:10; app/terms/page.tsx:10
- **Affected URLs:** https://visaprepper.com/contact, https://visaprepper.com/partners, https://visaprepper.com/partners/apply, https://visaprepper.com/privacy, https://visaprepper.com/refund-policy, https://visaprepper.com/terms
- **Status 2026-11-21:** Partly implemented: the 5 descriptions (M008, M018, M024, M026, M028) are done in the working tree; the 3 titles are kept by design (M007, M017, M019 status keep) until the homepage ranks for the brand query.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-04: Article markup has no image, @id, url or isPartOf

- **Priority:** Low tier; severity Low
- **Category:** Schema / Structured Data
- **Fix type:** schema-code; implement_now: true (Option A now; Option B needs sign-off)
- **Evidence:** Live 2026-11-21: 20/20 Article blocks lack image, @id, url and isPartOf (only mainEntityOfPage). og:image on posts is the generic site card https://visaprepper.com/opengraph-image (1200x630). Google's Article doc recommends relevant images (not logos), at least 50K pixels, in 16x9, 4x3 and 1x1.
- **Recommendation:** Add "@id":"`<post-url>`#article", url, isPartOf {"@id":"https://visaprepper.com/#website"} and image. Option A (no new design): the existing /opengraph-image card, weakly relevant. Option B (better; owner sign-off for a new image template): a per-post OG card in the existing opengraph-image.tsx style, used for both Article.image and og:image.
- **Source location:** lib/seo/json-ld.tsx:112-143
- **Affected URLs:** https://visaprepper.com/blog/us-visa-interview-preparation-any-country, https://visaprepper.com/blog/f1-visa-mock-interview-online-7-day-plan, https://visaprepper.com/blog/b1-b2-visa-mock-interview-scenarios, https://visaprepper.com/blog/free-ai-visa-mock-interview-online, https://visaprepper.com/blog/best-ai-visa-interview-tools, https://visaprepper.com/blog/visa-interview-nervous-forget-answer, https://visaprepper.com/blog/visa-interview-follow-up-questions, https://visaprepper.com/blog/f1-visa-interview-who-will-pay, https://visaprepper.com/blog/mock-visa-interview-online, https://visaprepper.com/blog/us-visa-interview-questions-bangladesh, https://visaprepper.com/blog/us-visa-interview-questions-india, https://visaprepper.com/blog/us-visa-interview-questions-pakistan, https://visaprepper.com/blog/j1-visa-interview-questions, https://visaprepper.com/blog/h4-visa-interview-questions, https://visaprepper.com/blog/h1b-visa-interview-questions, https://visaprepper.com/blog/214b-visa-refusal-guide, https://visaprepper.com/blog/us-visa-interview-documents-checklist, https://visaprepper.com/blog/ds-160-interview-consistency, https://visaprepper.com/blog/b1-b2-visa-interview-questions, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers
- **Status 2026-11-21:** Implemented in the working tree with option A (C06, schema-brand.md E3; uncommitted, not deployed). Option B is design backlog.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-05: Author @type chosen by exact string match

- **Priority:** Low tier; severity Low
- **Category:** Schema / Structured Data
- **Fix type:** schema-code; implement_now: true
- **Evidence:** git show 99dac01:lib/seo/json-ld.tsx line 129: post.author === "Visa Prepper Editorial Team" ? "Organization" : "Person". Any frontmatter spelling change would silently mark the team as a Person. All 20 posts resolve to Organization today.
- **Recommendation:** Use an explicit set or map of organization authors, or an optional non-rendered frontmatter field (which must also be added to the zod schema in lib/content/posts.ts).
- **Source location:** lib/seo/json-ld.tsx:129
- **Affected URLs:** https://visaprepper.com/blog/us-visa-interview-preparation-any-country, https://visaprepper.com/blog/f1-visa-mock-interview-online-7-day-plan, https://visaprepper.com/blog/b1-b2-visa-mock-interview-scenarios, https://visaprepper.com/blog/free-ai-visa-mock-interview-online, https://visaprepper.com/blog/best-ai-visa-interview-tools, https://visaprepper.com/blog/visa-interview-nervous-forget-answer, https://visaprepper.com/blog/visa-interview-follow-up-questions, https://visaprepper.com/blog/f1-visa-interview-who-will-pay, https://visaprepper.com/blog/mock-visa-interview-online, https://visaprepper.com/blog/us-visa-interview-questions-bangladesh, https://visaprepper.com/blog/us-visa-interview-questions-india, https://visaprepper.com/blog/us-visa-interview-questions-pakistan, https://visaprepper.com/blog/j1-visa-interview-questions, https://visaprepper.com/blog/h4-visa-interview-questions, https://visaprepper.com/blog/h1b-visa-interview-questions, https://visaprepper.com/blog/214b-visa-refusal-guide, https://visaprepper.com/blog/us-visa-interview-documents-checklist, https://visaprepper.com/blog/ds-160-interview-consistency, https://visaprepper.com/blog/b1-b2-visa-interview-questions, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): C05 (schema-brand.md E2).
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-06: How-it-works title repeats the brand

- **Priority:** Low tier; severity Low
- **Category:** On-Page SEO
- **Fix type:** metadata-code; implement_now: true
- **Evidence:** Live 2026-11-21: `<title>` 'How VisaPrepper Interview Practice Works | VisaPrepper' (54 chars). The page part is not visible text (the H1 is 'One small step. A clearer way to prepare.').
- **Recommendation:** Use a page part without the brand, for example 'How AI Visa Interview Practice Works'; the template adds ' | VisaPrepper'. Coordinate wording with metadata-plan.csv.
- **Source location:** app/how-it-works/page.tsx:11
- **Affected URLs:** https://visaprepper.com/how-it-works
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): M013 (schema-brand.md E7).
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-14: Organization has no contactPoint although phone and email are visible sitewide

- **Priority:** Low tier; severity Low
- **Category:** Schema / Structured Data
- **Fix type:** schema-code; implement_now: false
- **Evidence:** The footer on every page shows hello@visaprepper.com and tel:+17325188581; the Organization JSON-LD has email but no telephone or contactPoint (spot-checked on the live homepage 2026-11-21 14:29 UTC). lib/config/site.ts:83 says the WhatsApp link is owner-supplied and its registration is not independently verified. The verifier fields for this item were cut off in the payload passed to the reporting step; the facts above were re-checked here.
- **Recommendation:** Only after the owner confirms the number: add contactPoint {"@type":"ContactPoint","contactType":"customer support","email":"hello@visaprepper.com","telephone":"+1-732-518-8581"} to the Organization builder.
- **Source location:** lib/seo/json-ld.tsx:15-29; lib/config/site.ts:83-86
- **Affected URLs:** https://visaprepper.com/
- **Status 2026-11-21:** Held: C09 (schema-brand.md E12) waits for the owner to confirm the phone number.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-17: Mobile: fixed header plus WhatsApp rail cover 136 px (16.7%) of a 375x812 viewport and overlap the secondary hero CTA

- **Priority:** Low tier; severity Info (reported Low, lowered by the verifiers)
- **Category:** Technical SEO
- **Fix type:** content-change-not-allowed; implement_now: false
- **Evidence:** 2026-11-21 Playwright 375x812, mobile UA (sandbox true): sticky header 0-73 px, fixed help rail 749-812 px; the secondary CTA 'Explore interview practice' at 747-801 px sits under the rail. No horizontal overflow (scrollWidth = clientWidth = 375), body font 16 px, primary CTA visible. Not an intrusive interstitial.
- **Recommendation:** Note only. Any fix is a design change (not allowed now).
- **Source location:** components/layout/WhatsAppHelp.tsx:11; components/layout/SiteHeader.tsx:13
- **Affected URLs:** https://visaprepper.com/, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers
- **Status 2026-11-21:** Backlog: design change, outside today's scope.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### TECH-18: Homepage weight: 338 KB HTML, 1,560 DOM nodes, about 5,670 words

- **Priority:** Low tier; severity Info (reported Low, lowered by the verifiers)
- **Category:** Performance (CWV)
- **Fix type:** content-change-not-allowed; implement_now: false
- **Evidence:** 2026-11-21 11:36-11:41 UTC: decoded HTML 338,480 B (brotli 36,427 B; gzip 48,929 B), inline RSC payload about 130.7 KB, 1,560 start tags in the raw HTML. Static-page median 64,331 B, blog median 106,094 B. Far below any crawl or HTML size limit.
- **Recommendation:** Diagnostic only. Reducing it needs content or design changes (not allowed now).
- **Source location:** app/page.tsx @99dac01
- **Affected URLs:** https://visaprepper.com/
- **Status 2026-11-21:** Backlog: content or design change, outside today's scope.
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-07: Minor @id and URL representation inconsistencies

- **Priority:** Low tier; severity Info (reported Low, lowered by the verifiers)
- **Category:** Schema / Structured Data
- **Fix type:** schema-code; implement_now: true (optional)
- **Evidence:** Live 2026-11-21: Organization.url and SoftwareApplication.url are 'https://visaprepper.com', WebSite.url and mainEntityOfPage 'https://visaprepper.com/' (equivalent). The /#organization logo is a URL string in Organization but an ImageObject in the Article publisher. The /document-checks Service has no @id; the other three Service blocks use `<url>`#service.
- **Recommendation:** Optional tidy-up: url `${SITE_URL}/` in buildOrganizationJsonLd and buildSoftwareApplicationJsonLd; one logo ImageObject (1254x1254) in both places; add "@id":"https://visaprepper.com/document-checks#service".
- **Source location:** lib/seo/json-ld.tsx:21,23,57,137-139; app/document-checks/page.tsx:20
- **Affected URLs:** https://visaprepper.com/, https://visaprepper.com/document-checks
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): C07 (E10, url part) and C08 (E11); publisher logo size via C06. Organization.logo stays a URL string (test lock).
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

### SB-13: article:author emits plain text instead of a profile URL

- **Priority:** Low tier; severity Info (reported Low, lowered by the verifiers)
- **Category:** On-Page SEO
- **Fix type:** metadata-code; implement_now: true (optional)
- **Evidence:** Live 2026-11-21: all 20 posts emit `<meta property="article:author" content="Visa Prepper Editorial Team">`; the Open Graph article spec expects profile URL(s). Google does not use it for ranking.
- **Recommendation:** Optional: set openGraph.authors to ['https://visaprepper.com/about'], or omit it.
- **Source location:** app/blog/[slug]/page.tsx:43
- **Affected URLs:** https://visaprepper.com/blog/us-visa-interview-preparation-any-country, https://visaprepper.com/blog/f1-visa-mock-interview-online-7-day-plan, https://visaprepper.com/blog/b1-b2-visa-mock-interview-scenarios, https://visaprepper.com/blog/free-ai-visa-mock-interview-online, https://visaprepper.com/blog/best-ai-visa-interview-tools, https://visaprepper.com/blog/visa-interview-nervous-forget-answer, https://visaprepper.com/blog/visa-interview-follow-up-questions, https://visaprepper.com/blog/f1-visa-interview-who-will-pay, https://visaprepper.com/blog/mock-visa-interview-online, https://visaprepper.com/blog/us-visa-interview-questions-bangladesh, https://visaprepper.com/blog/us-visa-interview-questions-india, https://visaprepper.com/blog/us-visa-interview-questions-pakistan, https://visaprepper.com/blog/j1-visa-interview-questions, https://visaprepper.com/blog/h4-visa-interview-questions, https://visaprepper.com/blog/h1b-visa-interview-questions, https://visaprepper.com/blog/214b-visa-refusal-guide, https://visaprepper.com/blog/us-visa-interview-documents-checklist, https://visaprepper.com/blog/ds-160-interview-consistency, https://visaprepper.com/blog/b1-b2-visa-interview-questions, https://visaprepper.com/blog/f1-visa-interview-questions-and-answers
- **Status 2026-11-21:** Implemented in the working tree (uncommitted, not deployed): C10 (schema-brand.md E9).
- **Verification:** confirmed: live-reproduction verifier and source/root-cause verifier

## Files in this folder from this audit

- `seo-audit.md`: this report.
- `evidence/gsc/`: the five Search Console files from the 2026-11-21 read-only readout (README.md, pages, countries, indexed and not-indexed lists), copied unchanged.
- `evidence/technical-findings.md`, `evidence/schema-brand.md`, `evidence/product-facts.md`, `evidence/serp-observations.csv`: copies of the workflow outputs this report cites (TECH ids, E1-E12 items, product truth alerts, brand SERP rows). Raw crawl HTML, screenshots and the verifier captures (verify-live/, verify_src/) stayed in the workflow scratch output.
- `audit-data.json`: the same findings in the Claude SEO audit envelope (summary, categories, action_plan, artifacts) plus owner actions, backlog, not-reproduced items, coordination notes, and (added 2026-11-21) search_console, brand_serp, implementation_status, finding_status_register and product_truth_alerts. It can feed `claude-seo run google_report.py --type full --data audit-data.json --domain visaprepper.com`.
- `url-inventory.csv`: the 45-URL inventory from the 2026-11-21 crawl, with four added columns: `click_depth` (from /), `sitemap_lastmod` (live sitemap, identical at 11:39 and 14:29 UTC), `page_finding_ids` (page-specific findings) and `implement_now_ids`. Site-wide findings (TECH-02, TECH-03, TECH-04, TECH-06, TECH-11, TECH-13, TECH-14, TECH-17) apply to every row and are not repeated. `word_count` counts all visible text including header and footer, so it is higher than the main-content counts quoted in TECH-01.
