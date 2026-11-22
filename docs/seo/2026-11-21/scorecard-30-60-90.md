# SEO scorecard: baseline and 30/60/90-day goals

- **Date:** 2026-11-21
- **Companion files:**
  - `scorecard-30-60-90.csv`: one row per metric, with the exact filter, baseline and targets. Each regex sits in its own `query_regex` column, ready to copy into Search Console.
  - `scorecard-weekly-log-template.csv`: the weekly log, with the baseline row filled in.
- **What is scored:** branch `seo/metadata-2026-11-21`. It contains 56 phase-1 metadata rows, code rows C01-C08, C10 and C17, and 7 new blog posts, plus hosting fixes H1-H4 from `search-console-checklist.md` part C.
- **Day 0** is the production deploy date of that branch. It is not deployed yet; write the date here: `Day 0 = ____-__-__`. Day 30, 60 and 90 count from it.
- **Every target is a goal range, not a promise.** Rankings depend on Google, competitors and seasonality. A miss triggers a review (section 6), not an automatic change.

---

## 1. Measurement rules

- **Source.** Google Search Console, property `sc-domain:visaprepper.com`, **Performance > Search results**, with **Search type: Web**. The lead read it read-only on 2026-11-21 through the owner's signed-in Chrome profile, at the owner's request (`evidence/gsc/README.md`).
- **Checkpoint window.** Use the 28 days ending on the latest date Search Console has data for. It usually lags by about 2 days. Record the exact date range in the log.
- **Official 28-day baseline.** Export the 28 days ending on the deploy date before you deploy (checklist R1 step 8). Until that exists, section 2 gives a pro-rated estimate from the 76-day period.
- **Brand definition.** Query filter **Custom (regex)**: `(?i)visa\s?prep|prepper|visaper|visaprep`.
  - Search Console offers no built-in "Branded queries" filter for this property (as of 2026-11-21).
  - The regex also catches the brand-adjacent queries "visa prep" and "prepper interview".
- **Anonymised queries.** Search Console hides rare queries, and query filters drop them. On 2026-11-21 the 109 reported queries carried about 1 of the 22 clicks. So:
  - Branded rows probably **undercount** brand searches. The homepage took 7 clicks at average position 3.9, and some of those were likely brand searches hidden by anonymisation.
  - Non-branded performance is tracked as **total minus branded**, which includes anonymised queries. The "Doesn't match regex" filter is kept as a diagnostic only.
- **Average-position rule.** Score an average-position goal only when the page and query filter has **10 or more impressions** in the window. Otherwise record "insufficient data". That is not a miss.
- **Priority URLs (14).** The status of each is read in URL Inspection (Google-selected canonical and verdict):
  - `/`
  - `/document-checks`
  - `/visa-interview-practice`
  - `/visa-types/f1`
  - `/visa-types/b1-b2`
  - `/visa-interview-practice/india`
  - `/visa-interview-practice/pakistan`
  - the 7 new posts: `/blog/us-visa-interview-questions`, `/blog/b1-b2-visa-interview-questions-for-parents`, `/blog/us-visa-interview-questions-philippines`, `/blog/us-visa-interview-day-what-to-expect`, `/blog/f1-visa-second-attempt-after-214b`, `/blog/us-visa-interview-in-hindi-urdu` and `/blog/spouse-visa-interview-questions-ir1-cr1`

---

## 2. Baseline (Search Console, Sep 5 to Nov 19, 2026, 76 days; read 2026-11-21)

| Metric | Baseline (76 days) | Pro-rated per 28 days (estimate) | Notes |
|---|---|---|---|
| Total clicks | 22 | ~8 | CTR 1.5%; average position 25.9 |
| Total impressions | 1.45K (device split: 476 + 967 + 8 = 1,451) | ~535 | Mobile 12 clicks / 476 impressions; Desktop 10 / 967; Tablet 0 / 8 |
| **Branded** clicks / impressions (regex rows) | **0 / 16**; average position 4.9 | 0 / ~6 | visa prep 13 (position 3.5); prepper interview 2 (14.5); visaper 1 (3.0). No "visaprepper" or "visa prepper" query among the reported rows. |
| **Non-branded** clicks / impressions (total minus branded) | **22 / ~1,435** | ~8 / ~529 | Mostly anonymised queries. The "Doesn't match regex" rows carried ~1 click; their impressions were not recorded. |
| Homepage (all queries) | 7 clicks / 107 impressions / position 3.9 | - | Not yet split by brand regex (scorecard row S04) |
| Top countries | Pakistan 10/208; India 4/228; United States 2/403 | - | - |
| Indexed site URLs | **35 of 44** sitemap URLs (Page indexing report); 37 of 44 counting URL Inspection | - | URL Inspection shows /visa-types/b1-b2 and /blog/f1-visa-mock-interview-online-7-day-plan indexed; the report lags. Totals: 37 indexed (35 site URLs + app.visaprepper.com/ and /signup); 10 not indexed. |
| Sitemap | Success; read Nov 20; 44 discovered | - | After deploy: 51 URLs |
| Priority URLs indexed | **5 of 14** | - | Detail in section 4 |
| Brand SERP, clean session | Homepage absent from page-1 web results for "visaprepper" in gl=us, gl=in, gl=pk and gl=ng | - | The owner's signed-in Chrome showed the homepage at #1 for gl=us; that is personalised and not used as the baseline. |
| Google displayed site name | Not recorded (unknown) | - | - |
| **Organic sign-ups** | **Unmeasured** | - | No analytics on the site or app. Every CTA links to the bare `https://app.visaprepper.com`, with no UTM and with `noreferrer` (`evidence/product-facts.md`). |

---

## 3. Targets at day 30, 60 and 90 (goal ranges)

| ID | Metric | Baseline | Day 30 | Day 60 | Day 90 |
|---|---|---|---|---|---|
| S01 | Branded clicks (28 days) | 0 | 0-5 | 2-10 | 5-20 |
| S02 | Branded impressions (28 days) | ~6 (16 in 76 days) | 10-40 | 20-80 | 30-150 |
| S03 | Branded average position | 4.9 | 5.0 or better | 4.0 or better | 3.0 or better |
| S04 | Homepage share of brand clicks | not recorded | record | homepage is the top brand page | homepage takes most brand clicks, position 3.0 or better |
| S05 | Non-branded clicks (total minus branded, 28 days) | ~8 | 8-20 | 12-35 | 20-60 |
| S06 | Non-branded impressions (total minus branded, 28 days) | ~529 | 500-1,200 | 800-2,000 | 1,200-3,500 |
| S07 | Non-branded "Doesn't match regex" rows | ~1 click | record | record | record |
| S08 | Sitemap URLs indexed | 35 of 44 | 40-46 of 51 | 44-49 of 51 | 47-51 of 51 |
| S09 | Priority URLs indexed | 5 of 14 | 10-14 of 14, including /document-checks and at least 4 new posts | 12-14 of 14 | 14 of 14 (any exception documented with the Search Console reason) |
| S24-S37 | Average position, cluster target pages (section 4) | see section 4 | first rows appear | see section 4 | see section 4 |
| S38-S43 | Homepage position, clean brand SERP | absent from page 1 | page 1 in at least 2 of 3 markets ("visaprepper") | top 3 in at least 2 of 3 markets | top 3 in all 3 markets (us, in, pk), on 2 consecutive checks |
| S44 | Displayed site name | unknown | record | "VisaPrepper" or "Visa Prepper" | "VisaPrepper" or "Visa Prepper" |
| S45 | Verified organic sign-ups | unmeasured | measurement live | first 28-day count recorded (this becomes the baseline) | range set at day 60 from that baseline (proposal: not below the day-60 count) |

How the ranges were set:

- **Low ends** sit at or near the baseline. Holding steady through the off-season is not a failure.
- **High ends** assume that the 7 posts and `/document-checks` are indexed by day 30 to 60, and that the hosting fixes are live on day 0.
- **Seasonality.** Google Trends gives a relative index only (`evidence/google-trends-2026-11-21.md`). On that index, "us visa interview questions" fell from the high 20s in July 2026 to 9-14 in October and November 2026. The day-90 window falls in roughly February 2027, outside the student-visa peak.
- **No traffic forecast** was made from Trends or keyword volumes. The "ai visa interview" Trends series is contaminated by Visa Inc. job-interview searches.

---

## 4. Priority URLs: index status and cluster position

Cluster average position is measured in **Performance > Search results**:

1. Set **Search type: Web**.
2. Click **+ Add filter > Page > Exact URL** and enter the page URL.
3. Click **+ Add filter > Query > Custom (regex) > Matches regex** and enter the cluster regex from the table.
4. Read **Average position**. Turn on the Average position card if it is hidden.
5. Secondary check: replace the Query filter with **Exact query** and the primary query. Exact queries are often anonymised at this volume.

The 2026-11-21 SERP checks are in `evidence/serp-observations.csv` and `evidence/serp-new-post-heads-2026-11-21.csv`. The new-post head SERPs were read in the owner's Chrome, so they describe the competition, not a neutral rank.

| Page | Primary query | Cluster regex (Search Console) | Index status 2026-11-21 | Position baseline | Day 30 | Day 60 | Day 90 |
|---|---|---|---|---|---|---|---|
| `/` | visaprepper / visa prepper | `(?i)visa\s?prep\|prepper\|visaper\|visaprep` | Indexed (URL Inspection: crawled Nov 21; Google canonical = declared) | Brand rows 4.9; homepage all queries 3.9 | 5.0 or better | 3.0 or better | 1.0-3.0 |
| `/document-checks` | visa document check | `(?i)document\|ds.?160\|ds.?260\|check\|review` | **Unknown to Google** (URL Inspection) | No data | indexed; first rows | 40 or better | 10-25 |
| `/visa-interview-practice` | ai visa mock interview | `(?i)mock\|simulat\|practice\|\bai\b` | Indexed (report; crawled Nov 6) | Page all queries 16.4 (43 impressions); not in the top 10 for four head queries on 2026-11-21 | 30 or better | 25 or better | 10-20 |
| `/visa-types/f1` | f1 visa mock interview online | `(?i)mock\|practice\|simulat` | Indexed (report; crawled Sep 29) | Page 3.0 (3 impressions); not in the top 10 for "f1 visa mock interview online free ai" (in) | first rows | 40 or better | 10-25 |
| `/visa-types/b1-b2` | b1 b2 visa mock interview | `(?i)mock\|practice\|simulat` | Indexed (URL Inspection; report lags) | No data | first rows | 40 or better | 10-25 |
| `/visa-interview-practice/india` | us visa interview preparation india | `(?i)practice\|prep\|mock\|coach\|training` | Indexed (report; crawled Nov 6) | Page 23.8 (4 impressions) | first rows | 40 or better | 10-25 |
| `/visa-interview-practice/pakistan` | us visa interview preparation pakistan | `(?i)practice\|prep\|mock\|coach\|training` | **Discovered - currently not indexed** (report; not URL-inspected) | Page 1.0 (1 impression) | indexed; first rows | 40 or better | 10-25 |
| `/blog/us-visa-interview-questions` (head) | us visa interview questions | `(?i)visa interview questions?` | Not published | Not live; SERP led by sdstate.edu, boundless.com, travel.state.gov, shorelight.com | indexed | 60 or better | 20-40 |
| `/blog/b1-b2-visa-interview-questions-for-parents` | b1 b2 visa interview questions for parents | `(?i)parent\|mother\|father\|mom\|dad` | Not published | Not live; SERP includes three AI-product competitors | indexed | 40 or better | 8-20 |
| `/blog/us-visa-interview-questions-philippines` | us visa interview questions philippines | `(?i)philippine\|manila\|filipino\|pinoy` | Not published | Not live | indexed | 40 or better | 8-20 |
| `/blog/us-visa-interview-day-what-to-expect` (head) | us visa interview process | `(?i)process\|what to expect\|interview day\|how long\|what to wear\|dress` | Not published | Not live; official pages lead | indexed | 60 or better | 20-40 |
| `/blog/f1-visa-second-attempt-after-214b` | f1 visa second attempt | `(?i)second\|2nd\|again\|reapply\|re-apply\|after (refusal\|rejection\|214)` | Not published | Not live; forums lead | indexed | 40 or better | 8-20 |
| `/blog/us-visa-interview-in-hindi-urdu` | us visa interview questions in hindi | `(?i)hindi\|urdu` | Not published | Not live; not in the top 10 for "us visa interview questions in hindi" (in) or "us visa interview in urdu" (pk) | indexed | 40 or better | 8-20 |
| `/blog/spouse-visa-interview-questions-ir1-cr1` | spouse visa interview questions | `(?i)spouse\|marriage\|married\|ir.?1\|cr.?1\|husband\|wife` | Not published | Not live; rapidvisa.com and law firms lead | indexed | 40 or better | 10-25 |

"Indexed" for a new post at day 30 is the goal for at least 4 of the 7; all 7 by day 60.

Notes on reading the regexes:

- Search Console uses RE2 regex syntax.
- The `\|` in the table is only Markdown escaping. Type a plain `|` in Search Console, or copy the regex from the `query_regex` column of `scorecard-30-60-90.csv`.
- The Page filter limits each regex to its own page, so overlap between clusters does not matter.

---

## 5. Verified conversions (prerequisite: owner installs analytics)

- **Baseline:** unmeasured. Nothing on visaprepper.com or app.visaprepper.com loads analytics. Every app CTA ("Start Free", "Check my documents free", "Continue to the app · $44 package") links to the bare `https://app.visaprepper.com` with no UTM, and most carry `noreferrer`. Organic sign-ups cannot be counted or attributed today.
- **Owner action. This is outside the SEO-metadata scope and needs the owner's decision and approval:**
  1. Choose an analytics tool and install it on **both** the site and the app.
  2. Fire a CTA-click event on the marketing site. The CTAs already carry `data-intent="free"` or `"paid"`.
  3. Carry the landing page and source into the app, for example as a URL parameter on the CTA link or through first-party attribution stored at sign-up.
  4. Fire a **sign-up completed** event in the app. This is the "verified conversion".
  5. Optionally, fire a purchase event for the $44 package.
  6. Update the privacy page to mention analytics. That is a visible content change and needs approval.
- **Metric definition, once live:** sign-ups completed in the 28-day window where the session's source is Google organic search.
  - Report it together with the landing page.
  - Search Console clicks are **not** a proxy for sign-ups, and no conversion number should be estimated before the tool exists.
- **Goals:**
  - Day 30: measurement is live and one test sign-up is recorded end to end.
  - Day 60: the first full 28-day organic sign-up count is recorded. That count is the conversion baseline.
  - Day 90: a goal range is set from the day-60 baseline. The proposal is no lower than the day-60 count.

---

## 6. Review triggers (at day 60 and day 90)

| Signal | Check before changing anything |
|---|---|
| Priority URL still not indexed | Run URL Inspection, then `TEST LIVE URL`: is the response 200, is indexing allowed, and is the canonical self? Request indexing once more, with approval. Check internal links to the page. |
| Homepage still absent from the brand SERP | Check the Google-selected canonical for `/`. Confirm H1 and H2 are live (`curl -sI`). Check Crawl stats for the www host. Do **not** change the preferred name (`brand-plan.md`). |
| Non-branded below the low end | Compare with seasonality (Trends, same weeks a year earlier once 16 months of data exist). Check whether the 7 posts are indexed and whether the SERPs gained new features, such as AI Overviews or videos. |
| Branded impressions flat while position improves | Brand demand comes from marketing outside search. Report it, but it is not an SEO failure. |
| Average position "insufficient data" | Not a miss. Keep recording. |

---

## 7. Weekly log

- **File:** `scorecard-weekly-log-template.csv` has 35 columns, a filled baseline row and rows for weeks 1 to 13.
- **Cadence:** fill one row per week. Use **Date: Last 7 days** for the Search Console fields, and record the exact range.
- **The baseline row covers 76 days,** so it is not directly comparable to the 7-day rows. At day 30, 60 and 90, also fill the 28-day checkpoint values into the scorecard (section 3).

| Column group | Columns | Where to read it |
|---|---|---|
| Window | week, week_start, week_end, gsc_date_range_used | Search Console Date chip |
| Totals | total_clicks, total_impressions, total_ctr, total_avg_position | Performance, no filter |
| Brand | branded_clicks, branded_impressions, branded_avg_position | Query > Custom (regex) > Matches regex > `(?i)visa\s?prep|prepper|visaper|visaprep` |
| Non-brand | nonbranded_clicks_total_minus_branded, nonbranded_impressions_total_minus_branded (computed); nonbranded_regex_clicks, nonbranded_regex_impressions | Computed values, plus the same regex with "Doesn't match regex" |
| Homepage | homepage_clicks, homepage_impressions, homepage_avg_position | Page > Exact URL > `https://visaprepper.com/` |
| Indexing | sitemap_status, sitemap_last_read, sitemap_discovered_pages, indexed_submitted_urls, priority_urls_indexed_of_14, priority_urls_not_indexed | Indexing > Sitemaps; Indexing > Pages (All submitted pages); URL Inspection |
| Brand SERP | serp_visaprepper_us/in/pk, serp_visa_prepper_us/in/pk, site_name_label | Clean session per `brand-plan.md` section 4.1 |
| Context | changes_shipped, owner_actions_done, notes, recorded_by | Deploys, hosting changes and Search Console write actions (with approval date) |

Markdown version, for anyone who prefers to log in a doc:

| Week | Range | Clicks | Impr. | Brand clicks / impr. / position | Non-brand clicks / impr. | Home clicks / impr. / position | Indexed (submitted) | Priority indexed /14 | Brand SERP us / in / pk (homepage position) | Site name | Changes / owner actions | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| baseline | 2026-09-05..11-19 (76 days) | 22 | 1,451 | 0 / 16 / 4.9 | 22 / ~1,435 | 7 / 107 / 3.9 | 35 of 44 | 5 | absent / absent / absent | unknown | branch not deployed | signed-in Chrome showed #1 (personalised) |
| 1 | | | | | | | | | | | | |
| 2 | | | | | | | | | | | | |
