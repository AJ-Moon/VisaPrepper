# Visa Prepper SEO workflow (2026-11-21)

This folder holds the research, audit, keyword map, implementation record and verification for the November 2026 SEO pass on https://visaprepper.com.

Audience: anyone in the world preparing for a U.S. visa interview.

Visa Prepper is a preparation tool. Visa decisions belong to consular officers.

## Owner rules that shaped this pass

- **Allowed:** SEO metadata only (titles, meta descriptions, Open Graph, canonical, robots directives, sitemap, structured data), plus **new** blog posts in the existing MDX format.
- **Not allowed:**
  - No visible page-copy or design changes.
  - Existing blog bodies stay as written; refresh advice is in `blog-refresh-recommendations.md`.
  - **No date changes** anywhere (publishDate, updatedDate, sitemap lastmod).
  - Fonts and preloads stay as they are.
- **Publishing:** work is published through GitHub. The owner's local clone was not touched.
- **Base:** the work was branched from the commit that was live on 2026-11-21: `codex/marketing-readiness-2026-11-19` @ `99dac01`.

## Start here

| File | What it is |
|---|---|
| `seo-audit.md` / `audit-data.json` | Prioritized audit. Contains: Claude SEO health score (73/100), verified findings with evidence and affected URLs, implementation status, owner actions and product-truth alerts. |
| `keyword-map.csv` | About 1,000 keywords. Columns: cluster, intent, country, language, volume (only where a dated source exists, otherwise `unknown`), organic-difficulty proxy, competing URLs, priority, target URL, action and status. |
| `keyword-clusters.md` | One primary target page per cluster, cannibalization flags, gap posts, market priority and methodology. |
| `metadata-plan.csv` / `.md` | Every title and description decision per URL, with rationale. Says which rows were applied, held or kept. |
| `brand-plan.md` | Brand rule set. Preferred name **VisaPrepper**; alternates "Visa Prepper" and "visaprepper.com". |
| `blog-inventory.csv` / `blog-refresh-recommendations.md` | All existing posts: query cluster, reader need, keep, refresh or consolidate, overlaps, and stale claims checked against dated official sources. |
| `drafts/*.outline.md` | Outlines behind the new posts. Further topics are listed in `keyword-clusters.md`. |
| `search-console-checklist.md` | Exact owner actions and exports. Read-only steps are separate from write steps that need approval. |
| `scorecard-30-60-90.md` / `.csv` / `scorecard-weekly-log-template.csv` | Baseline and 30/60/90-day targets for branded and non-branded clicks and impressions, priority URLs indexed, and conversions. |
| `url-inventory.csv` | Union of the crawl, sitemap and repo routes, plus host and URL variants and the new posts. |
| `evidence/` | Raw evidence. Includes: product truth, schema and brand audit, technical findings, competitors, market priority, official visa facts, SERP observations, Trends, and the Search Console readout (`evidence/gsc/`). |
| `verification/` | Before and after test, lint, build and site-check results; visible-text and metadata diff; Claude SEO page checks. |
| `scripts/` | `snapshot.py`, `compare_snapshots.py` and `apply_metadata_plan.py`, used for the no-visible-change proof and the metadata rollout. |
| `CHANGELOG.md` | What changed in the repo on this branch. |

## Tool versions used

| Tool | Version |
|---|---|
| Claude SEO plugin | v2.6.2, `github.com/AgriciDaniel/claude-seo` @ `468ed5b` |
| Claude SEO runtime | isolated venv, Python 3.12; Playwright 1.65.2 with Chromium; beautifulsoup4 4.15.0; lxml 6.1.3 |
| Site | Next.js 16.3.4, React 19.2.8 |
| Node / npm | Node 20.19.6, npm 10.8.2 |
| Agent | Claude Code (Claude Opus 5.5), multi-agent workflows |

## Data inputs and their limits

**Google Search Console**
- Domain property `sc-domain:visaprepper.com`.
- Read-only, on 2026-11-21, through the owner's signed-in Chrome, at the owner's request.
- Data range: 2026-09-05 to 2026-11-19.
- No writes were made.
- No built-in branded-queries filter is offered for this property. Use the regex `(?i)visa\s?prep|prepper|visaper|visaprep`.

**Search volume**
- OpenSEO, DataForSEO and Google Keyword Planner were not connected, so no paid data was used.
- The only volumes come from Semrush, dated 2026-09-08 (pk, in, bd), already in `docs/seo-keyword-map.md`.
- Every other volume is `unknown`.

**Google autocomplete**
- Public endpoint, queried across gl = us, in, pk, bd, ng, np, gh, ph, vn, ke and ae.
- It shows wording and intent signals, not volume.

**Google Trends**
- Relative indexes only. See `evidence/google-trends-2026-11-21.md`.
- "ai visa interview" is mixed with job-interview searches about Visa Inc.

**SERPs**
- Dated google.com captures on desktop, hl=en, pws=0, in two browsers:
  - **Built-in browser:** clean profile.
  - **Owner's Chrome:** signed in, so results may be personalized.
- See `evidence/serp-observations.csv` and `evidence/serp-new-post-heads-2026-11-21.csv`.

**Official visa facts**
- Sources: travel.state.gov, eCFR, Federal Register, the FAM, ICE/FMJfee, USCIS and embassy sites.
- All were checked on 2026-11-21.
- travel.state.gov sometimes returns 403 to scripts. Those pages were confirmed in a browser.

## Re-run this workflow (new Claude session or another machine)

1. **Get the code.** Do not use the owner's working copy.
   ```bash
   git clone https://github.com/AJ-Moon/VisaPrepper.git && cd VisaPrepper
   ```
   ```bash
   git checkout seo/metadata-2026-11-21   # or the branch that is live in Vercel
   ```
   ```bash
   npm ci
   ```
2. **Install Claude SEO.** In Claude Code:
   ```text
   /plugin marketplace add AgriciDaniel/claude-seo
   /plugin install claude-seo@agricidaniel-claude-seo
   /seo setup
   ```
   Without the plugin, clone the repo and run its runtime directly:
   ```bash
   export CLAUDE_SEO_DATA_DIR="$PWD/.claude-seo-data"
   ```
   ```bash
   git clone https://github.com/AgriciDaniel/claude-seo.git ../claude-seo && ../claude-seo/scripts/claude-seo setup
   ```
3. **Audit.** In Claude Code, run `/seo audit https://visaprepper.com/`. Record the plugin version (`git -C ../claude-seo log -1`) and the crawl scope.
4. **Verify locally before pushing anything:**
   ```bash
   npm test && npm run lint && npx tsc --noEmit && npm run build
   ```
   ```bash
   npx next start -p 3102
   ```
   ```bash
   npm run test:site -- http://localhost:3102
   ```
5. **Prove no visible content changed.**
   - Take a `snapshot.py` of a build of the base commit and of your branch, then compare them:
     ```bash
     python3 -I docs/seo/2026-11-21/scripts/snapshot.py http://localhost:3102 after.json
     ```
     ```bash
     python3 -I docs/seo/2026-11-21/scripts/compare_snapshots.py before.json after.json report.md
     ```
   - Only the auto-generated post-card lists may differ, when posts are added.
   - The scripts need `beautifulsoup4` and `lxml`; the Claude SEO venv has both.
6. **Validate structured data:**
   ```bash
   python3 -I ../claude-seo/hooks/validate-schema.py saved-page.html
   ```
   Also check one page in validator.schema.org and in the Rich Results Test.
7. **Search Console.** Follow `search-console-checklist.md`:
   - Read-only exports go into `evidence/gsc/<date>/`.
   - Write actions (Request indexing, sitemap submit) need the owner's approval.
8. **Keywords.**
   - Refresh autocomplete and SERPs for the P1 clusters in `keyword-clusters.md`, and record date, market, device and browser.
   - Add volumes only from a dated source.
   - Assign each cluster exactly one target page before writing anything new.
9. **Measure.** Each week, fill `scorecard-weekly-log-template.csv` from Search Console with the branded regex and its complement, and record index status for the priority URLs.

## Approvals still needed from the owner

- **Merge to the live branch:** merge `seo/metadata-2026-11-21` into the branch Vercel deploys to production. That publishes the changes.
- **Hosting fixes (Vercel):**
  - www → apex as a 308 permanent redirect.
  - Redirect `visa-prepperation.vercel.app` to the apex, or send `noindex` on it.
  - `/index` → `/`.
  - App subdomain: real robots.txt, noindex, 404s for unknown routes, and VisaPrepper branding.
- **Search Console writes:** Request indexing for `/document-checks` (Google does not know this URL yet), `/` and the new posts.
- **Product and content decisions, outside this pass:**
  - Bangladesh is blocked in the app but promoted on the site.
  - Analytics need installing to measure organic sign-ups.
  - The phone number must be confirmed before adding `contactPoint`.
