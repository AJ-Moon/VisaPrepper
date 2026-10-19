# SEO and indexing audit — 19 October 2026

## Confirmed state

- The owner confirmed that Google Search Console is already verified on 19 October 2026. A missing verification meta tag is not evidence that ownership is unverified; verification can use DNS or another supported method.
- The public homepage returns HTTP 200, including a request with a Googlebot user agent. The response has no `X-Robots-Tag: noindex`, and the HTML has no `noindex` meta tag. A user-agent check does not prove that every verified Googlebot IP receives the same response.
- `https://visaprepper.com/robots.txt` allows public pages, excludes API/admin paths and advertises `https://visaprepper.com/sitemap.xml`.
- The sitemap was reachable and contained 37 public canonical URLs before this release. The homepage canonical uses `https://visaprepper.com`.
- Public search results retrieved the homepage and several internal pages. Some snippets still contain last month's availability and pricing. These results show discovery, but do not establish current Google ranking for the owner's location, account or device.
- Before this release, the `WebSite` structured data used `Visa Prepper` for both `name` and `alternateName`, so it did not associate the compact `VisaPrepper` brand with its spaced form.

## Website changes in this release

- Use the exact VisaPrepper brand in the homepage title, visible logo, social metadata and linked Organization/WebSite/SoftwareApplication entities. Preserve Visa Prepper and visaprepper.com as alternate names.
- Add a general AI video interview service overview and distinct India/Pakistan service pages, with self-canonicals and reciprocal en/en-IN/en-PK/x-default alternatives. These add three routes to the 37-page sitemap.
- Link the service pages from the homepage, country/language selector, footer, blog and visa-type pages so crawlers and visitors can discover them.
- Correct all six visa-type pages from Pakistan-only/English-and-Urdu messaging to current India/Pakistan and English/Urdu/Hindi support. Remove the India blog's obsolete coming-soon rendering branch.
- Expand the existing tools comparison with factual VisaPrepper/VisaMind and VisaPrepper/InterviewIvy sections and primary product links. Keep a single useful comparison rather than generating pages for every competitor name.
- Retain the free/paid distinction, approved package entitlements and current app availability. No invented ratings, approval outcomes or store URLs are added.

## Free search research and page mapping

Public Google autocomplete requests used English with `gl=in` and `gl=pk` on 19 October 2026. Suggestions are wording signals, not search volumes, unique users or ranking estimates. Many suggestions were identical across the two country parameters.

| Query family | Observed or closely related intent | Relevant page |
| --- | --- | --- |
| Brand | VisaPrepper, Visa Prepper, VisaPrepper app | Homepage and about |
| AI practice | ai visa interview practice; visa interview practice with ai | Service overview |
| India | f1 visa mock interview online free india; visa interview questions in hindi | India page, free-tools guide and language page |
| Pakistan | us visa interview pakistan; us visa interview in urdu | Pakistan page, country guide and language page |
| Forms | ds 160 checker; ds 160 checklist | Consistency guide and document-check explanation |
| Alternatives | Product-format and offer comparisons | Existing AI tools comparison |

Do not target appointment login/status/slot searches as if the app offers those services. Broad visa-application traffic must be matched to the actual preparation, checklist and interview features.

## Findings that require account or hosting access

Search Console is verified, but this audit did not inspect its private reports. Google's selected canonical, last crawl, Page Indexing exclusions, sitemap processing status and country/query performance remain unknown. Public search snippets cannot substitute for those reports.

The live redirect chain was:

| Requested URL | Response | Destination |
| --- | --- | --- |
| `http://visaprepper.com/` | 308 | `https://visaprepper.com/` |
| `https://www.visaprepper.com/` | 307 | `https://visaprepper.com/` |
| `http://www.visaprepper.com/` | 308 | `https://www.visaprepper.com/`, then the 307 above |

Change the hosting/domain redirect for `www` to permanent 308, preserving the requested path and query. Hosting can apply this redirect before Next.js receives a request, so an application redirect alone may not change its live response. Recheck the actual domain responses after changing the hosting setting.

## Search Console steps after publishing

1. Open the verified domain property for `visaprepper.com`.
2. Inspect `https://visaprepper.com/`. Record the indexing status, last crawl, crawl permission, indexing permission, user-declared canonical and Google-selected canonical. If Google selects a different URL, inspect that URL and the redirect/canonical signals before requesting another crawl.
3. Run **Test live URL**. Confirm that Google can retrieve the current HTML and its VisaPrepper brand data, then use **Request indexing** for the homepage and the new country/service pages where appropriate.
4. Check **Sitemaps** for `https://visaprepper.com/sitemap.xml`. Submit it if absent or errored; confirm successful retrieval and discovery of the new URLs. Repeated submission of an unchanged sitemap does not accelerate crawling.
5. Review **Page indexing**, **Manual actions** and **Security issues**. Resolve any reported cause using the specific report; do not infer a penalty from a low branded position alone.

## Weekly measurement

Use Search Console's **Performance → Search results** report. Compare complete recent periods and retain a baseline from before this release; search data can lag. Filter Pakistan and India separately, then examine the global total.

- Brand queries: `visaprepper`, `visa prepper`, and the domain spelling.
- Service queries: AI visa interview, visa interview practice online, video visa interview, visa interview preparation app and document/form checks.
- Problems: unclear answers, interview confidence, follow-up questions and DS-160 consistency.
- Pages: homepage, India/Pakistan service pages, comparison content and related preparation guides.

Track impressions, clicks, click-through rate and average position by country, query and landing page. Check which queries actually appear rather than treating a keyword list as proof of demand. Choose future content from relevant queries and genuine gaps. Do not create near-duplicate pages for every competitor name or city.

The website improvements strengthen search signals and relevance. Google controls discovery, indexing and ranking; no implementation can guarantee every related query, competitor-brand query or first-page result. Account-level indexing evidence and ongoing performance data determine the next action.

## Primary references

- [Google: Site names in Search](https://developers.google.com/search/docs/appearance/site-names) — consistent homepage naming, `WebSite` data and genuine alternate names.
- [Google: Ask Google to recrawl URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) — URL Inspection, owner/full-user access and realistic crawl timelines.
- [Google: The site search operator](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site) — search-operator results are not a complete indexing report.
- [Google: Canonical URL consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — permanent redirects, canonicals and sitemap signals.
- [Google: Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) — useful regional URLs, explicit links and avoidance of forced location redirects.
