# Verification summary (final run, 2026-11-22)

Branch `seo/metadata-2026-11-21`, built locally with `next build` and served with `next start`.

| Check | Base commit 99dac01 | This branch |
|---|---|---|
| `npm test` | 34/34 pass | 39/39 pass (adds `tests/seo-metadata-2026-11-21.test.ts`) |
| `npm run lint` | pass | pass |
| `npx tsc --noEmit` | pass | pass |
| `npm run build` | pass (52 static outputs) | pass (59 static outputs; 7 new posts) |
| `npm run test:site` (repo site checker, local) | — | PASS: 51 pages, 52 internal link targets; titles and descriptions unique, canonicals equal the URL, no noindex, JSON-LD parses |
| Visible text on existing pages (`scripts/compare_snapshots.py`) | baseline snapshot | No differences outside the auto-generated post-card lists (`/blog` index and the related-posts blocks on existing posts), which now include the new posts |
| Claude SEO `hooks/validate-schema.py` | — | exit 0 on `/`, `/document-checks`, `/visa-interview-practice`, `/visa-types/f1`, `/visa-interview-practice/india`, `/blog/214b-visa-refusal-guide` and all 7 new posts |
| Claude SEO `page_checks.py` | — | Only issues the site already had: homepage first image lazy-loaded (Medium, design or code, outside scope); new posts' wide tables (Low) |
| 404 page | inherited homepage canonical | `noindex`, no canonical |
| `/start` | `noindex, follow` | `noindex, follow` (unchanged) |

## Still needs verification on the live site after deploy

- Rendered HTML on production for `/`, one visa-type page and one new post: `<title>`, meta description, canonical, JSON-LD.
- Search Console URL Inspection and Request indexing (owner approval).
- The hosting redirects (www 308, vercel.app alias, `/index`). These are Vercel settings, not code.
- Rich Results Test and validator.schema.org on one blog post.
- Visual review: `/blog/us-visa-interview-questions` (desktop) and `/blog/us-visa-interview-in-hindi-urdu` (375 px mobile) were checked on the local build. Both render in the existing blog template with one H1 and no horizontal page overflow. Hindi and Urdu snippets are marked `lang` and `dir="rtl"` (13 each). Wide tables scroll inside their container, as in existing posts. The other five new posts were not screenshot-reviewed.
