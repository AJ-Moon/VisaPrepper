# VisaPrepper brand plan (search and metadata)

- **Date:** 2026-11-21
- **Status:** authoritative. When this file disagrees with an earlier deliverable on how the brand is named in metadata or structured data, this file wins.
- **Supersedes:** the BR row of `keyword-clusters.md`, which suggested switching the preferred name to "Visa Prepper". That suggestion was not adopted (metadata-plan row C11).
- **Scope:** SEO metadata, structured data and off-site profiles only. Visible page copy, design, fonts and dates do not change (owner rules).
- **Evidence used:**
  - Google Search Console. The lead read it read-only on 2026-11-21 through the owner's signed-in Chrome profile, at the owner's request (`evidence/gsc/README.md`).
  - Brand SERP checks from 2026-11-21 (`evidence/serp-observations.csv`, `evidence/serp-new-post-heads-2026-11-21.csv`).
  - `evidence/schema-brand.md`, `evidence/technical-findings.md` and `metadata-plan.csv`.

---

## 1. The rule set

| Rule | Value |
|---|---|
| Preferred name | **VisaPrepper**: one word, capital V and capital P. |
| Alternate names, in this order | 1. **Visa Prepper** 2. **visaprepper.com** (lowercase domain, kept last as Google's documented fallback). |
| Why the order matters | Google reads `alternateName` in order of preference. Keep "Visa Prepper" first because Google already auto-corrects "visaprepper" to "visa prepper" in India and has rewritten a homepage title link to "Visa Prepper". Keep the domain last because it is the fallback. Do not reorder, add or remove entries without updating this file. |
| Never use in metadata, markup or profiles | "VisaPrep", "Visa Prep", "Visaprepper" (lowercase p), "Visa-Prepper". "VisaPrep" in particular collides with look-alikes that showed on the brand SERP: the third-party Google Play app "VisaPrepAI: US Visa Prep" and visaprep.app. |
| Uppercase | Allowed only where the design already uses it (the logo tagline). Do not use it in metadata. |
| Byline | The visible byline "**Visa Prepper Editorial Team**" stays unchanged, because it is visible content. In Article markup it is an Organization linked to the brand entity (section 2). |
| Mixed spellings in visible copy | Body copy, FAQs, two homepage h2s and alt text use "Visa Prepper". These are visible content, so they stay as written under the owner rules. The homepage and /about already carry the bridge sentence "VisaPrepper, also written Visa Prepper", which ties the two forms to one entity. |
| Do not flip the preferred name | Every switch restarts Google's site-name reprocessing. The preferred name was last set in October 2026. The domain, logo, header wordmark, OG image, `og:site_name`, title suffix and all brand entities read "VisaPrepper". |

---

## 2. Where each form appears (state after today's metadata changes)

"Changed today" means applied on branch `seo/metadata-2026-11-21` on 2026-11-21. That branch is not deployed yet, so live pages keep the old values until deploy.

| Surface | Value | Status | Plan row |
|---|---|---|---|
| Homepage `<title>` (absolute, no suffix) | `VisaPrepper (Visa Prepper): AI U.S. Visa Interview Practice` | **Changed today.** It now carries both spellings, preferred name first. It was `VisaPrepper \| U.S. Visa Interview Practice & Document Checks`. | M001 |
| Homepage meta description | Starts with `VisaPrepper:` (AI video mock interviews built on your U.S. visa application, plus document checks; one free check for eligible users; $44 for 6 interviews) | **Changed today** | M002 |
| Title suffix on every other page | `%s \| VisaPrepper` (template in `app/layout.tsx`) | Unchanged | - |
| `og:site_name` | `VisaPrepper` on every page | Unchanged | - |
| `WebSite` JSON-LD (homepage only) | `name: "VisaPrepper"`, `alternateName: ["Visa Prepper", "visaprepper.com"]`, `url: "https://visaprepper.com/"`, `@id: /#website` | Unchanged (already correct) | C11 (keep) |
| `Organization` JSON-LD (every page) | Same `name` and `alternateName`. `url` is now `https://visaprepper.com/` (trailing slash added). The logo is `/images/brand/visaprepper.jpg`. `sameAs` lists Instagram, TikTok and Facebook. | **url changed today**; everything else unchanged | C07 |
| `SoftwareApplication` JSON-LD (homepage) | Same `name` and `alternateName`. `url` is now `https://visaprepper.com/`. | **url changed today** | C07 |
| `Article` JSON-LD author (all blog posts, including the 7 new ones) | `{"@type":"Organization","@id":"https://visaprepper.com/#editorial-team","name":"Visa Prepper Editorial Team","url":"https://visaprepper.com/about","parentOrganization":{"@id":"https://visaprepper.com/#organization"}}`. The name is identical to the visible byline. The type comes from an explicit set, so a front-matter edit can no longer silently re-type the author as a Person. | **Changed today** | C05 |
| `Article` JSON-LD publisher, `@id`, `url`, `isPartOf`, `image` | The publisher is `/#organization` ("VisaPrepper"). `isPartOf` is `/#website`. `image` is `/opengraph-image`. The logo has width and height. | **Changed today** | C06 |
| `article:author` (Open Graph, blog posts) | `https://visaprepper.com/about` (it was plain text) | **Changed today** | C10 |
| `/document-checks` Service JSON-LD | `@id: https://visaprepper.com/document-checks#service`. The Service name is unchanged ("VisaPrepper application and document consistency checks"). | **Changed today** | C08 |
| Meta descriptions for /contact, /partners, /privacy, /refund-policy, /terms | Now say "VisaPrepper" where they said "Visa Prepper" | **Changed today** (metadata only; none of these strings is visible) | M008, M018, M024, M026, M028 |
| /how-it-works title | `How AI Visa Interview Practice Works \| VisaPrepper`. The brand is no longer repeated inside the title. | **Changed today** | M013 |
| /contact title | `Contact Visa Prepper \| VisaPrepper` | **Held.** /contact ranked #1 for "visaprepper" in gl=pk and gl=ng on 2026-11-21. | M007 |
| /partners title | `Visa Prepper Partner Program \| VisaPrepper` | **Held.** /partners ranked #1 for "visaprepper" (auto-corrected to "visa prepper") in gl=in. | M017 |
| /partners/apply title | `Apply to the Visa Prepper Partner Program \| VisaPrepper` | **Held** for the same brand-SERP reason as /partners | M019 |
| /features title | `Visa Interview Practice & Document Checks \| VisaPrepper` | **Held** (phase 2). /features ranks for the brand query: #2 in gl=pk and gl=ng, and on page 1 in gl=us. | M011 |
| /blog/us-visa-interview-documents-checklist seoTitle | `US Visa Interview Documents Checklist` | Kept. The page appears for the brand query. | M076 |
| `Organization.contactPoint` | Not added | **Held** until the owner confirms the phone number. `lib/config/site.ts` marks the WhatsApp number as owner-supplied and unverified. | C09 |
| Sitemap `lastmod` and all visible dates | Unchanged | **Held.** The owner forbids date changes. | C12 |
| Header wordmark, footer copyright, logo image, OG image | "VisaPrepper" | Visible design; unchanged | - |
| Visible byline on posts | "By Visa Prepper Editorial Team" | Visible content; unchanged | - |

### When the held titles can change

The held items are M007, M017, M019 and M011. The owner may approve changing them only after **both** of these are true:

1. The homepage is in the top 3 web results for "visaprepper" in a clean session in gl=us, gl=in and gl=pk on **two consecutive weekly checks** (method in section 4).
2. Search Console URL Inspection still shows https://visaprepper.com/ indexed, with the Google-selected canonical equal to the declared one.

Change one title at a time and watch the brand SERP for 2 weeks before the next one. The intended end state is "Contact Us | VisaPrepper", "Partner Program | VisaPrepper", "Apply to the Partner Program | VisaPrepper" and "What You Get: AI Interviews & Document Checks | VisaPrepper".

---

## 3. Off-site actions for the owner

Each action is on a third-party account or in a separate project, so each needs the owner. None is a promise of a ranking effect.

| # | Action | Detail | Done when |
|---|---|---|---|
| O1 | **Instagram display name** | The profile https://www.instagram.com/visaprepper/ shows the display name "Visa Prepper" (public page title, 2026-11-21). Consider changing the display name to "VisaPrepper" and keeping the handle @visaprepper. Make sure the bio link points to `https://visaprepper.com/`. Instagram limits how often a display name can change, so make the change once. | The profile title reads "VisaPrepper (@visaprepper)". |
| O2 | **Verify the TikTok and Facebook profiles in `sameAs`** | `sameAs` lists `https://www.tiktok.com/@visaprepper` and `https://www.facebook.com/visaprepper/`. On 2026-11-21 an anonymous fetch could not confirm that either exists (TikTok returned a challenge page; Facebook returned 400 or a login wall). Sign in and confirm that each one is a public profile owned by the brand, with the display name "VisaPrepper" and a link to `https://visaprepper.com/`. | Both are confirmed live and public, or a non-existent one is reported for removal. Removal note: `sameAs` is built from `SOCIAL_LINKS` in `lib/config/offering.ts`, which also renders the footer and /contact social links. Removing an entry is therefore a **visible** change and needs explicit owner approval. |
| O3 | **Consider a LinkedIn company page and a YouTube channel** | Use the name "VisaPrepper", website `https://visaprepper.com/`, the same logo and a one-line description that matches the site (AI video practice for U.S. visa interviews, plus document checks). Add a profile to `sameAs` **only once it is live and public**. Implementation note: adding it to `SOCIAL_LINKS` would also add a visible footer link. To keep the change metadata-only, add a separate `SAME_AS` list used only by `buildOrganizationJsonLd`; that is a small code change for a later PR. | The profile is live, then added to `sameAs` in a later metadata PR. |
| O4 | **Fix the app.visaprepper.com shell metadata** (separate app project) | On 2026-11-21 the shell had `<title>VisaPrepper</title>` but `og:title "VisaPrep"`, and a description saying "VisaPrep helps applicants from Pakistan, India, and Bangladesh…". Change `og:title` to "VisaPrepper", add `og:site_name "VisaPrepper"`, and make the description describe worldwide U.S. visa interview practice. The app currently blocks Bangladesh, so do not name it. Google picks a site name per subdomain, so this shell decides how app.visaprepper.com results are labelled. app.visaprepper.com/ and /signup are both indexed today; the root had 1 click and 31 impressions in Sep 5 to Nov 19. Pair this with the robots/noindex work in `search-console-checklist.md`, item H4. | `curl -s https://app.visaprepper.com/ \| grep -i "og:title"` shows VisaPrepper. |
| O5 | **Consistent name on new listings** | Use exactly "VisaPrepper" with the alternate "Visa Prepper" and the URL `https://visaprepper.com/` on any directory, partner page, press mention or app-store listing the owner creates. When the Android and iPhone apps launch, use the store name "VisaPrepper". | Ongoing |
| O6 | **Watch the look-alikes** | Third-party look-alikes appeared on the brand SERP on 2026-11-21: the Google Play app "VisaPrepAI: US Visa Prep", visaprep.app, visapro.com and vispera.co. No action against them is proposed. Note them in each brand SERP check. | Ongoing |

---

## 4. How to check Google's displayed site name and the brand SERP

### 4.1 Method (read-only, no approval needed)

1. **Use a clean session.** Use a Chrome Guest window, or an Incognito window with no Google sign-in. Signed-in results are personalised. On 2026-11-21 the owner's signed-in Chrome showed the homepage at #1 for "visaprepper", while a clean browser the same day (gl=us) did not show it on page 1 at all.
2. **Run these searches, desktop and mobile view.** `gl` only approximates the country, so record your physical location or VPN country next to each result.
   - `https://www.google.com/search?q=visaprepper&hl=en&gl=us`
   - `https://www.google.com/search?q=visaprepper&hl=en&gl=in`
   - `https://www.google.com/search?q=visaprepper&hl=en&gl=pk`
   - `https://www.google.com/search?q=visa+prepper&hl=en&gl=us`
   - `https://www.google.com/search?q=visa+prepper&hl=en&gl=in`
   - `https://www.google.com/search?q=visa+prepper&hl=en&gl=pk`
   - Optional extra markets: `gl=ng` and `gl=ph`.
3. **Record these items for each search:**
   - The homepage's position among **web results only**. Ignore Images, Videos, AI Overview and People Also Ask blocks when counting.
   - Which visaprepper.com URLs appear, and in which order.
   - The **site name label**: the small name shown next to the favicon above each visaprepper.com title link.
   - The title link text Google shows, which may differ from the `<title>`.
   - Whether Google auto-corrects the query ("These are results for visa prepper").
   - Whether an AI Overview mentions VisaPrepper.
   - The look-alikes present.
4. **Save a full-page screenshot** for each search in `docs/seo/brand-serp/YYYY-MM-DD/` and add a row to the weekly log (`scorecard-weekly-log-template.csv`).
5. **Check Search Console for the same picture.** Open Performance > Search results, then:
   - Add a Query filter, Custom (regex), Matches regex: `(?i)visa\s?prep|prepper|visaper|visaprep`.
   - Add a Page filter, Exact URL: `https://visaprepper.com/`.
   - Record clicks, impressions and average position, and then remove the Page filter to see which pages take the brand impressions.
   - The built-in "Branded queries" filter is not offered for this property (as of 2026-11-21), so the regex is the brand definition used throughout these documents.
6. **Cadence:** weekly for the first 4 weeks after deploy, then every 2 weeks until day 90.

### 4.2 Baseline (2026-11-21)

| Search | Session | Homepage in page-1 web results? | Notes |
|---|---|---|---|
| visaprepper, gl=us | Clean built-in browser | **No.** Absent from page-1 web results; shown only in the Images strip. | /terms first, then /features, /partners, /pricing and Instagram, plus look-alikes |
| visaprepper, gl=us | Owner's signed-in Chrome (personalised) | Yes, #1 | / #1, /features #2, /about #3, Instagram #4, visaprep.app #5, /how-it-works #7. **Personalised, not a neutral rank.** |
| visaprepper, gl=in | Clean | No | Auto-corrected to "visa prepper"; /partners #1 |
| visaprepper, gl=pk | Clean | No (Images strip only) | /contact #1; 6 visaprepper.com URLs in the top 8 |
| visaprepper, gl=ng | Clean | No (Images strip only) | /contact #1 |
| visa prepper, gl=in | Clean | No | Same results as the auto-corrected query; /partners #1 |
| "visa prepper" (quoted) | Clean | Yes, last on page 1 | Google rewrote the title link to "Visa Prepper"; an AI Overview describes the product |
| Displayed site name | - | **Not recorded (unknown)** | Record it in the first post-deploy check |

Search Console, Sep 5 to Nov 19, 2026:

- The brand regex returned **0 clicks, 16 impressions, average position 4.9**. The 16 impressions were "visa prep" 13 (position 3.5), "prepper interview" 2 (position 14.5) and "visaper" 1 (position 3.0).
- No query containing "visaprepper" or "visa prepper" appears among the 109 reported queries. Low-volume queries are anonymised, so brand searches may be present but hidden.
- The homepage itself had 7 clicks, 107 impressions and average position 3.9.
- URL Inspection on 2026-11-21 shows https://visaprepper.com/ indexed, crawled Nov 21, with the Google-selected canonical equal to the declared canonical. The missing homepage on the brand SERP is therefore a ranking problem, not an indexing problem.

### 4.3 Goals (measurable goals, not promises)

Day 0 is the production deploy of branch `seo/metadata-2026-11-21` together with hosting fixes H1 and H2 from the checklist.

| ID | Goal | By | How measured |
|---|---|---|---|
| B1 | Homepage in the **top 3** web results for "visaprepper" in a clean session in **gl=us, gl=in and gl=pk** | Day 90 | Section 4.1 method; meet it on 2 consecutive checks |
| B2 | Homepage in the **top 3** for "visa prepper" in a clean session in gl=us, gl=in and gl=pk | Day 90 | Same |
| B3 | Interim: homepage on **page 1** (top 10) for "visaprepper" in at least 2 of the 3 markets | Day 30 | Same |
| B4 | Google's displayed site name for visaprepper.com results is **"VisaPrepper" or "Visa Prepper"**, not "visaprepper.com" and not an unrelated name | Day 90 | Site name label in the clean-session screenshots, mobile and desktop |
| B5 | Brand regex rows in Search Console: average position **3 or better**, with https://visaprepper.com/ as the page taking most brand clicks | Day 90 | Section 4.1 step 5 |
| B6 | Watch item, not a goal: whether gl=in stops auto-correcting "visaprepper" | - | Record the auto-correct line each check |

What happens if a goal is missed:

- **Homepage still absent at day 60:**
  - Re-run URL Inspection on `/` to check the Google-selected canonical and the last crawl.
  - Confirm that H1, H2 and H3 are live (`curl -sI`).
  - Check Settings > Crawl stats for the www host's responses.
  - Then review with the owner. **Do not** change the preferred name or reorder `alternateName` as a reaction; Google's documented next step (alternates including the domain) is already in place.
- **Site name shows something else at day 90:** confirm that the `WebSite` markup is unchanged on the live homepage (Schema Markup Validator), that www and the vercel.app host redirect, and that `og:site_name` is still "VisaPrepper". Then wait; Google says site-name changes can take weeks.
