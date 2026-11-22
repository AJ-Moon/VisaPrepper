# Search Console owner checklist

- **Date:** 2026-11-21
- **Property:** `sc-domain:visaprepper.com`, a Domain property. It covers visaprepper.com, www.visaprepper.com and app.visaprepper.com. It does **not** cover visa-prepperation.vercel.app.
- **Who:** the owner, signed in to the Google account that owns the property.
- **Source of today's numbers:** the lead read Search Console read-only on 2026-11-21 through the owner's signed-in Chrome profile, at the owner's request (`evidence/gsc/README.md`). No "Request indexing", live test, sitemap submission or setting change was made.
- **Note on seo-audit.md:** it was written before the readout was confirmed and says the readout was "not used". The readout is genuine and authorised, and this checklist relies on it.
- **Branded queries filter:** Search Console's built-in "Branded queries" filter is **not offered for this property** (checked 2026-11-21; Add filter offers only Query, Page, Country and Device). The brand definition used everywhere is the regex `(?i)visa\s?prep|prepper|visaper|visaprep`. If a Branded/Non-branded filter appears later, record it alongside the regex, but keep the regex for continuity.

The checklist has three parts:

- **A. READ-only actions.** These need no approval; they change nothing in Google or on the site.
- **B. WRITE actions in Search Console.** Each needs explicit owner approval.
- **C. Hosting actions that pair with Search Console.** These are owner or hosting actions, and each needs approval.

---

## Baseline already recorded (2026-11-21, read-only)

| Item | Value |
|---|---|
| Performance, Web, Sep 5 to Nov 19, 2026 (all data available under "Last 16 months") | 22 clicks; 1.45K impressions (device split sums to 1,451); CTR 1.5%; average position 25.9 |
| Brand regex `visa\s?prep\|prepper\|visaper\|visaprep` | 0 clicks; 16 impressions; average position 4.9 |
| Reported queries | 109 queries. Their clicks sum to 1; the other clicks come from anonymised queries. |
| Devices | Mobile 12 clicks / 476 impressions; Desktop 10 / 967; Tablet 0 / 8 |
| Top countries by clicks | Pakistan 10/208; India 4/228; United States 2/403 |
| Page indexing | 37 indexed: 35 visaprepper.com URLs plus app.visaprepper.com/ and /signup. 10 not indexed: 3 Page with redirect (http and www variants), 6 Discovered - currently not indexed, 1 Crawled - currently not indexed (/opengraph-image). |
| Sitemap `https://visaprepper.com/sitemap.xml` | Submitted Nov 20; last read Nov 20; **Success**; 44 discovered pages |
| URL Inspection `/` | Indexed. Last crawl Nov 21, 2026 09:55 (Googlebot smartphone). Google-selected canonical equals the declared `https://visaprepper.com/`. |
| URL Inspection `/document-checks` | **"URL is unknown to Google"**; no referring sitemap or page detected. The Page indexing report, which lags, lists it as Discovered - currently not indexed. |
| URL Inspection `/visa-types/b1-b2` and `/blog/f1-visa-mock-interview-online-7-day-plan` | Both indexed. The Page indexing report lags and does not show them as indexed yet. |
| Enhancements and experience | Breadcrumbs 16 valid, 0 invalid; HTTPS 20 URLs, 0 non-HTTPS; Videos: 1 page with video, 0 videos indexed; Core Web Vitals: no data |

---

## A. READ-only actions (no approval needed)

Do R1 to R8 **before** the deploy, as a frozen baseline, and again at day 30, 60 and 90. Save every export in `docs/seo/gsc-exports/YYYY-MM-DD/`, using the file names given below.

### R1. Performance exports: all queries

1. Open Search Console and pick `visaprepper.com` in the property selector (top left).
2. Left menu: **Performance > Search results**.
3. Check that the chip **Search type: Web** is selected. If not, click it, choose **Web** and click **Apply**.
4. Click the **Date** chip, open the **Filter** tab, choose **Last 3 months** and click **Apply**.
5. Top right: **EXPORT > Download CSV**. The zip contains Queries, Pages, Countries, Devices, Search appearance, Dates and Filters CSVs. Save it as `perf-web-3m-all.zip`.
6. Repeat step 4 with **Last 16 months** and save as `perf-web-16m-all.zip`.
7. Also note the four totals at the top of the chart (Total clicks, Total impressions, Average CTR, Average position) in the weekly log.
8. **At deploy only:** set the Date chip to **Custom** for the 28 days ending on the deploy date and export it as `perf-web-pre-deploy-28d-all.zip`. This becomes the official 28-day baseline for the scorecard.

### R2. Performance exports: branded (regex match)

1. Keep the R1 view (Search type Web, Last 3 months).
2. Click **+ Add filter > Query**.
3. Change the dropdown "Queries containing" to **Custom (regex)**. Keep **Matches regex** and paste:
   `(?i)visa\s?prep|prepper|visaper|visaprep`
4. Click **Apply**.
5. Click **EXPORT > Download CSV** and save as `perf-web-3m-branded.zip`.
6. Change the Date to **Last 16 months** and save as `perf-web-16m-branded.zip`.
7. Caveats:
   - Search Console warns that totals can be partial when a filter is applied.
   - Anonymised queries are excluded from every query filter.
   - The regex also catches brand-adjacent terms ("visa prep", "prepper interview").

### R3. Performance exports: non-branded (regex does not match)

1. Same view as R2. Click the Query filter chip and change **Matches regex** to **Doesn't match regex**, keeping the same regex. Click **Apply**.
2. Export as `perf-web-3m-nonbranded.zip`, then as `perf-web-16m-nonbranded.zip` with Last 16 months.
3. Read the result with care. This filter shows only classifiable, non-anonymised rows. On 2026-11-21 the reported query rows carried about 1 of 22 clicks. The scorecard therefore also tracks "total minus branded", which includes anonymised queries.

### R4. Page indexing exports

1. Left menu: **Indexing > Pages**. Keep the top dropdown on **All known pages**.
2. Click **EXPORT > Download CSV** and save as `indexing-summary.zip`.
3. Under the chart, click **View data about indexed pages**, then **EXPORT** and save as `indexing-indexed.zip`.
4. In **Why pages aren't indexed**, click each reason row, then **EXPORT**. Save each with the reason in the file name, for example `indexing-discovered-not-indexed.zip`, `indexing-page-with-redirect.zip` and `indexing-crawled-not-indexed.zip`.
5. Switch the top dropdown to **All submitted pages** and repeat step 2, saving as `indexing-submitted-summary.zip`. This gives the "indexed of sitemap URLs" figure.
6. Look for any `app.visaprepper.com` URL and any `vercel.app` URL, and write them in the log.

### R5. Sitemaps status

1. Left menu: **Indexing > Sitemaps**.
2. In **Submitted sitemaps**, record for `https://visaprepper.com/sitemap.xml`: Submitted, Last read, Status and Discovered pages.
3. Expected values:
   - Before deploy: Success, 44.
   - After deploy: 51 once Google re-reads the sitemap (44 plus the 7 new posts).
4. Click the sitemap row, then **SEE PAGE INDEXING**, and screenshot the indexed / not-indexed split for submitted URLs.
5. Do not resubmit from this step; see W5.

### R6. URL Inspection records

1. Paste each URL below into the top search bar **"Inspect any URL in visaprepper.com"** and press Enter.
2. Record:
   - The verdict: "URL is on Google", "URL is not on Google" or "URL is unknown to Google".
   - Expand **Page indexing** and record:
     - **Discovery:** Sitemaps, Referring page.
     - **Crawl:** Last crawl, Crawled as, Crawl allowed?, Page fetch, Indexing allowed?
     - **Indexing:** User-declared canonical, **Google-selected canonical**.
   - Under **Enhancements**, record Breadcrumbs and Videos where shown.
3. Use the record template below.

| # | URL | Why |
|---|---|---|
| 1 | `https://visaprepper.com/` | Brand target. Baseline: indexed, crawled Nov 21, Google canonical equals declared. |
| 2 | `https://www.visaprepper.com/` | Should report a redirect, with the Google-selected canonical on the apex. Re-check after H1. |
| 3 | `https://visa-prepperation.vercel.app/` | **Expected result: "URL is not in property"**, because the Domain property does not include vercel.app. Record that result. As a substitute, search `site:visa-prepperation.vercel.app` in a clean browser and record the number of results. Verifying a separate property for that host would be a write action (C2 note). |
| 4 | `https://visaprepper.com/document-checks` | Baseline: unknown to Google |
| 5 | `https://visaprepper.com/visa-interview-practice` | Priority (commercial head) |
| 6 | `https://visaprepper.com/visa-types/f1` | Priority |
| 7 | `https://visaprepper.com/visa-types/b1-b2` | Priority. Baseline: indexed per URL Inspection. |
| 8 | `https://visaprepper.com/visa-interview-practice/india` | Priority |
| 9 | `https://visaprepper.com/visa-interview-practice/pakistan` | Priority. Page indexing report: Discovered - currently not indexed. |
| 10-16 | The 7 new posts (list in W3) | After deploy. Expect "unknown to Google" at first. |
| 17 | `https://visaprepper.com/index` | After H3, it should report a redirect |

URL Inspection record template (one line per URL in the weekly log):

```
date | url | verdict | last_crawl | crawled_as | indexing_allowed | user_canonical | google_canonical | referring_sitemap | referring_page | notes
```

`TEST LIVE URL` (top right of an inspection result) fetches the live page without changing Google's index, so it counts as read-only. Use it after deploy to confirm a 200 response, "Indexing allowed: Yes" and a self canonical before any W action.

### R7. Crawl stats (redirect check)

1. Left menu: **Settings > Crawl stats > OPEN REPORT**.
2. Under **Hosts**, open each host (`visaprepper.com`, `www.visaprepper.com`, `app.visaprepper.com`) and record **By response**.
3. After H1, the www host should move from "Moved temporarily (302/307)" to "Moved permanently (301/308)" over the following weeks.

### R8. Hygiene reads (record "No issues detected" or the issue)

- **Security & Manual Actions > Manual actions**
- **Security & Manual Actions > Security issues**
- **Enhancements > Breadcrumbs** (baseline: 16 valid, 0 invalid)
- **Experience > HTTPS** (baseline: 20 HTTPS URLs, 0 non-HTTPS)
- **Videos > Video pages** (baseline: 1 page with video, 0 indexed)

### R9. Brand SERP check (outside Search Console)

Follow `brand-plan.md` section 4.1: a clean session, the gl=us/in/pk variants, and the site name label.

---

## B. WRITE actions in Search Console (each needs owner approval)

These actions change what Search Console asks Google to do, so do not run them without the owner's explicit yes. Record the approval date next to each.

**Preconditions:**

- Branch `seo/metadata-2026-11-21` is deployed to production.
- Hosting fixes H1 and H2 are live, per metadata-plan row M001: ship the homepage title in the same deploy as the hosting fixes.
- For each URL, `TEST LIVE URL` (R6) shows 200, "Indexing allowed: Yes" and a self canonical.

**Quota:** Search Console caps Request indexing per property per day and does not publish the number. If it shows a quota message, stop and continue the next day in the order below.

| # | Action | URL(s) | UI path | Owner approval |
|---|---|---|---|---|
| W1 | **Request indexing** (top priority: Google does not know this URL) | `https://visaprepper.com/document-checks` | Top search bar > paste URL > Enter > **REQUEST INDEXING** | [ ] approved on ____ |
| W2 | **Request indexing** (homepage title, description and markup changed) | `https://visaprepper.com/` | Same | [ ] approved on ____ |
| W3 | **Request indexing for the 7 new posts** (publishDate 2026-11-21; live only after deploy) | `https://visaprepper.com/blog/us-visa-interview-questions`<br>`https://visaprepper.com/blog/b1-b2-visa-interview-questions-for-parents`<br>`https://visaprepper.com/blog/us-visa-interview-questions-philippines`<br>`https://visaprepper.com/blog/us-visa-interview-day-what-to-expect`<br>`https://visaprepper.com/blog/f1-visa-second-attempt-after-214b`<br>`https://visaprepper.com/blog/us-visa-interview-in-hindi-urdu`<br>`https://visaprepper.com/blog/spouse-visa-interview-questions-ir1-cr1` | Same, one URL at a time | [ ] approved on ____ |
| W4 | **Request indexing for the changed visa-type pages** (metaTitle changed on all 6; metaDescription also changed on b1-b2, f1 and family-immigrant) | `https://visaprepper.com/visa-types/f1`<br>`https://visaprepper.com/visa-types/b1-b2`<br>`https://visaprepper.com/visa-types/h1b`<br>`https://visaprepper.com/visa-types/h4`<br>`https://visaprepper.com/visa-types/j1`<br>`https://visaprepper.com/visa-types/family-immigrant` | Same | [ ] approved on ____ |
| W5 | **Resubmit the sitemap: only if R5 shows an error** ("Couldn't fetch", "Has errors" or "Sitemap could not be read") | `https://visaprepper.com/sitemap.xml` | **Indexing > Sitemaps > Add a new sitemap** > type `sitemap.xml` > **SUBMIT** | [ ] needed? ____ [ ] approved on ____ |
| W6 (optional) | Request indexing for the other priority pages that changed or are not indexed | `https://visaprepper.com/visa-interview-practice/pakistan` (Discovered - not indexed; title changed)<br>`https://visaprepper.com/visa-interview-practice/india` (title changed)<br>`https://visaprepper.com/visa-interview-practice` (description changed) | Same as W1 | [ ] approved on ____ |

Notes on W5:

- Resubmitting an **unchanged** sitemap does not speed up crawling. With a Success status, Google re-reads the sitemap on its own schedule, including after the deploy adds the 7 new URLs.
- Check R5 about a week after deploy. Discovered pages should reach 51. If it still shows 44 and the status is Success, wait and record it; do not resubmit.
- The URL-level "Temporary processing error" under Discovery > Sitemaps in URL Inspection already coexists with a Success sitemap status (2026-11-21). On its own, it is not a reason to resubmit.

Suggested order across days, if the quota stops you early:

- **Day 0:** W1, W2, then the three P1 posts (us-visa-interview-questions, b1-b2-visa-interview-questions-for-parents, us-visa-interview-questions-philippines), then /visa-types/f1 and /visa-types/b1-b2.
- **Day 1:** the remaining four posts, then /visa-types/h1b, /h4, /j1 and /family-immigrant.
- **Day 2:** W6, if approved.

Why Request indexing is used here: the owner forbids date changes, so sitemap `lastmod` is not bumped for metadata edits (plan row C12 held). Request indexing is the remaining way to ask for a recrawl of the priority URLs.

**Do not do these** without a separate, explicit owner decision. They are writes, and none is part of this plan:

- **Removals** tool. It cannot target vercel.app from this property, and removals are temporary.
- **VALIDATE FIX** on Page indexing reasons. "Page with redirect" for the http and www variants is expected, and "Discovered - currently not indexed" is handled by W1, W3 and W6.
- Settings changes: users, ownership, change of address, association.
- Submitting new sitemaps for other hosts.

---

## C. Hosting actions that pair with Search Console (owner or hosting, each needs approval)

These are not Search Console actions and not part of the metadata code change. They decide which host and URL Google treats as the homepage, which is why they sit here. Do H1 and H2 in the same release window as the deploy, then run W2.

| # | Action | Where (exact path) | Verify | Search Console follow-up | Owner approval |
|---|---|---|---|---|---|
| H1 | **www to apex redirect: change 307 to 308 Permanent** (row H01; TECH-02). Today `https://www.visaprepper.com/` returns 307, and `http://www` takes two hops (308, then 307). | Vercel dashboard > the project serving visaprepper.com > **Settings > Domains** > `www.visaprepper.com` > **Edit** > Redirect to `visaprepper.com` > status **308 Permanent Redirect** > Save | `curl -sI https://www.visaprepper.com/pricing` shows `308` and `location: https://visaprepper.com/pricing` | R6 #2: inspect `https://www.visaprepper.com/`. R7: the www host shows "Moved permanently" over the next weeks. | [ ] approved on ____ |
| H2 | **vercel.app production alias: 308 to visaprepper.com, or at minimum noindex** (row H02; TECH-03). Today `https://visa-prepperation.vercel.app/` serves the full homepage with 200 and no `X-Robots-Tag`. | Preferred: Vercel > project > **Settings > Domains** > `visa-prepperation.vercel.app` > **Edit** > Redirect to `visaprepper.com` (308). Fallback, if Vercel does not allow redirecting that domain: add a host-conditional header in `vercel.json`, as shown below this table. That is a repo config change and needs its own approval and PR. | `curl -sI https://visa-prepperation.vercel.app/` shows `308` to `https://visaprepper.com/`, or `x-robots-tag: noindex` | The host is not in the property (R6 #3), so check `site:visa-prepperation.vercel.app` in a clean browser 2-4 weeks later; the count should fall. | [ ] approved on ____ |
| H3 | **`/index` to `/` with a 308** (row H03; TECH-12). Today `/index` returns a 200 duplicate of the homepage. | `vercel.json`: `"redirects":[{"source":"/index","destination":"/","permanent":true}]`, or Next.js `redirects()` with `permanent: true`. Both send a 308. This is a config change outside today's metadata files. | `curl -sI https://visaprepper.com/index` shows `308` and `location: /` | R6 #17 | [ ] approved on ____ |
| H4 | **app.visaprepper.com: robots.txt, 404s, noindex, and shell metadata** (row H04; TECH-04). In the separate app project. Today every path returns the same 200 shell, `/robots.txt` is HTML, and the shell says `og:title "VisaPrep"`. | App project: (1) serve a real `text/plain` `/robots.txt`; (2) return 404 for unknown routes; (3) send `X-Robots-Tag: noindex` on authenticated and app routes (dashboard, billing, interview and similar); (4) fix the shell metadata per `brand-plan.md` O4. **Owner decision:** app.visaprepper.com/ (1 click, 31 impressions, Sep 5 to Nov 19) and /signup are indexed today. Either keep them indexable with corrected "VisaPrepper" metadata, or noindex them. **Do not** `Disallow` in robots.txt the URLs you want removed from the index: Google must crawl them to see the noindex. | `curl -sI https://app.visaprepper.com/dashboard` shows `x-robots-tag: noindex`; `curl -sI https://app.visaprepper.com/robots.txt` shows `content-type: text/plain`; `curl -sI https://app.visaprepper.com/zz-test` shows `404` | R4: app URLs move to "Excluded by 'noindex' tag" or "Not found (404)". R7: the app host's responses change. | [ ] approved on ____ |

H2 fallback header for `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "visa-prepperation.vercel.app" }],
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
    }
  ]
}
```

### C2. Related approvals that are not hosting

- **Search Console property for the vercel.app host (optional).** URL Inspection of `https://visa-prepperation.vercel.app/` needs a URL-prefix property for that host. Verifying it means adding a verification file or meta tag to the deployment, which is a site change plus a Search Console write. It is not needed if H2 redirects the host.
- **Analytics (prerequisite for conversion goals; outside the SEO-metadata scope).** Install analytics on the site and the app and tag the app CTAs; see `scorecard-30-60-90.md` section 5. Adding a script and updating the privacy page are code and visible changes that need owner approval.

---

## D. One-page run order

1. **Before deploy:** R1 to R8 (frozen baseline, including the pre-deploy 28-day export) and R9.
2. **Deploy day:** deploy the branch. Apply H1 and H2, plus H3 if approved. Verify each with `curl`.
3. **Same day:** run R6 with `TEST LIVE URL` on `/`, `/document-checks` and the 7 new posts. Then, with approval, run W1, W2, W3 and W4 in the order and quota given in part B.
4. **Day 7:** R5 (sitemap re-read; 51 discovered?), R6 on the W URLs, and R9.
5. **Weekly to day 30, then every 2 weeks to day 90:** R1 to R3 totals and R9 in the weekly log.
6. **Day 30, 60 and 90:** full R1 to R8 exports and the scorecard update (`scorecard-30-60-90.md`).
7. **H4** whenever the app project ships it, then R4 and R7 two weeks later.
