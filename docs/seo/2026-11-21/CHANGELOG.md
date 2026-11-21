# Change log: branch `seo/metadata-2026-11-21`

Base: `codex/marketing-readiness-2026-11-19` @ `99dac01`, the production commit on 2026-11-21.

Scope:
- Changed: SEO metadata, structured data and indexing signals, plus seven new blog posts.
- Unchanged:
  - Visible copy and design on existing pages, except that the auto-generated post-card lists on `/blog` and in existing posts' related-posts sections now include the new posts.
  - All dates.
  - Fonts.

## Code (metadata and structured data only)

| File | Change | Plan id |
|---|---|---|
| `lib/content/posts.ts` | New optional frontmatter field `seoDescription`, used only for the meta description. The visible `description` is unchanged. | C01 |
| `app/blog/[slug]/page.tsx` | Meta description uses `seoDescription ?? description`; `article:author` is now the `/about` URL; imports `SITE_URL`. | C02, C10 |
| `app/layout.tsx` | Removed root `alternates.canonical: "/"`, which error pages inherited. Added preview directives `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`. | C03, C04 |
| `lib/seo/json-ld.tsx` | Article markup changes and trailing-slash URLs (details below). | C05, C06, C07 |
| `app/document-checks/page.tsx` | Service JSON-LD gets `@id …/document-checks#service`. | C08 |
| `scripts/verify-site.mjs` | Expects the new homepage title and 51 sitemap routes. | C17, C18 |

Details for `lib/seo/json-ld.tsx`:
- **Article markup gains:** `@id` (`…#article`), `url`, `image`, `isPartOf` (WebSite), and publisher logo width and height.
- **Author:** the visible byline "Visa Prepper Editorial Team" is now an Organization with `@id …/#editorial-team`, `url /about` and `parentOrganization` VisaPrepper. The author type is chosen from an explicit set.
- **URLs:** Organization and SoftwareApplication `url` now end with a trailing slash.

## Titles and descriptions (56 rows from `metadata-plan.csv`, phase 1)

- Static pages: homepage, `/blog`, `/contact` (description only), `/document-checks`, `/how-it-works`, `/languages`, `/partners` (description only), `/privacy`, `/refund-policy`, `/terms`, `/visa-interview-practice`, `/visa-types`.
- Practice-market titles: India and Pakistan (`lib/content/practice-markets.ts`; the titles are metadata only).
- Visa-type `metaTitle` and `metaDescription`: B1/B2, F1, H1B, H4, J1, family-immigrant.
- Existing blog posts: `seoTitle` updated or added and `seoDescription` added on 20 posts. Bodies, visible descriptions and dates are unchanged.
- Homepage title is now "VisaPrepper (Visa Prepper): AI U.S. Visa Interview Practice".
- **Held:**
  - M011, the `/features` title, because `/features` ranks for the brand query.
  - C09, `contactPoint`, which needs the owner to confirm the phone number.
  - C12, the `/document-checks` lastmod, because the owner forbids date changes.
  - The `/contact` and `/partners` titles, because they rank for the brand query.

## New blog posts (`content/blog/`, publishDate 2026-11-21)

1. `us-visa-interview-questions`: hub of questions by visa type.
2. `b1-b2-visa-interview-questions-for-parents`
3. `us-visa-interview-questions-philippines`
4. `us-visa-interview-day-what-to-expect`
5. `f1-visa-second-attempt-after-214b`
6. `us-visa-interview-in-hindi-urdu`
7. `spouse-visa-interview-questions-ir1-cr1`

Each post went through:
- an independent policy fact-check against official sources;
- a product, SEO and format review;
- a revision;
- a browser check that its cited official pages load and support the sentences that cite them.

All posts use only the existing `<Disclaimer>` and `<AppCTA>` components.

## Tests

- `tests/global-positioning.test.ts`: post count 20 → 27.
- `tests/seo-implementation.test.ts`: sitemap count 44 → 51.
- New `tests/seo-metadata-2026-11-21.test.ts`, which checks:
  - snippet lengths;
  - no approval promises in SEO descriptions;
  - Article markup links the byline to the brand and website;
  - new posts are dated today, cite official sources, have FAQs and appear in the sitemap;
  - primary keywords are unique;
  - the root canonical is removed;
  - an existing publish date is unchanged.

## Docs

- `docs/seo/2026-11-21/` holds all deliverables. See `README.md`.
