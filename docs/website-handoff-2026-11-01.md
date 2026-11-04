# Website handoff implementation — local review

Marketing checkout: `AJ-Moon/VisaPrepper`, base `29627faa82d6e9f0b4bde3107266cb73924d372b`. Local folder: `visaprepper-marketing/` beside the existing Visa-App application. The application workspace's existing changes were left intact. No commits, pushes, merges, deployment, activation, account/database changes, transactions, messages or provider calls were made.

## Changed files and reasons

- `components/marketing/DocumentSamples.tsx`, `lib/content/report-samples.ts`: selectable report excerpts, three keyboard-operable tabs, source evidence expansion, native modal with Escape/close and focus return. Preserve report summary, category, qualification and next-step hierarchy. Mobile uses stacked text, not scaled screenshots.
- `app/page.tsx`: calm interview positioning, clearer document offer, separate interview interest handoff, document sample immediately below the hero, retained interview illustration and surrounding structure. Testimonials unchanged.
- `components/layout/CtaButton.tsx`, `components/ui/Button.tsx`, `app/start/page.tsx`, `lib/config/site.ts`: distinguish document/interview intent on the marketing site; working public app root only. Policy links are reachable before leaving for authentication. No invented app query parameters.
- `lib/utils/dialog.ts`, `components/layout/SiteHeader.tsx`: shared explicit Tab/Shift+Tab focus wrapping for the sample, help and menu dialogs.
- `components/layout/WhatsAppHelp.tsx`, `app/contact/page.tsx`, `app/layout.tsx`, `app/globals.css`: contact link and compact sticky help control. Native modal is dismissible, focuses its close button and returns focus. Help hides while report samples, pricing or forms are visible. Safe-area padding and reduced-motion rules apply. No tracking/widget script.
- `components/marketing/Pricing.tsx`, `components/marketing/CheckCreditsFAQ.tsx`: unchanged $44 USD, 6 total interviews, 10 checks, 90 days, one-time purchase and repeat-purchase description. Explain bundle limits, reservation/consumption, terminal failure versus pause/resume, revised bundles, and retention separately. Keep refund exceptions and mandatory rights.
- `app/features/page.tsx`, `app/how-it-works/page.tsx`, `lib/content/faq.ts`, `components/marketing/CTASection.tsx`: document-review terminology and profile-later explanation; accurate current handoffs.
- `app/visa-interview-practice/page.tsx`, `app/visa-interview-practice/[country]/page.tsx`, `app/visa-types/page.tsx`, `lib/config/offering.ts`: narrow terminology and destination availability qualification, without inventing new countries or languages.
- `components/marketing/ProductDemoVideo.tsx`: preserve existing video, require intentional playback (remove autoplay and loop).
- `app/privacy/page.tsx`, `app/terms/page.tsx`: distinguish transcript storage, streamed voice and on-device camera measurements from recordings; explain file access expiry, deletion/extractions/profile values and allowance expiry using application code. Retain existing refund policy and legal rights.
- `tests/report-samples.test.ts`: corrected gross/net and date-gap invariants, citation labels and public allowlist checks.
- `scripts/verify-site.mjs`: updated handoff and report checks; GET-only verification, including on localhost. Removed all synthetic partner POSTs from this crawler.

## Provenance and privacy

Read `IMPLEMENTATION_PROMPT.md` and `README.md` completely. All nine extracted original handoff files were compared to the ZIP and are unchanged. The seven PNGs are reference-only and were inspected; none were copied to `public/`. The rejected generic PDF was not used.

US excerpts are faithful HTML transcriptions of screenshots 03 and 07: the education-history inconsistency and SELF versus Family support difference. Their source-evidence drawers were collapsed in the supplied images. No PDF page numbers, quotes from invisible source evidence, totals or universal issue counts were invented. The displayed limitation explicitly states the missing page references. This is a historical finding presentation, not independent legal validation.

UK and Schengen use the corrected exports in the existing local application workspace:

- `output/application-check/two-route-followup-offline-repair-20261031/reports/case-02-offline-report.html` and `.json`
- `output/application-check/two-route-followup-offline-repair-20261031/reports/case-01-offline-report.html` and `.json`

Only explicitly selected text and source/page labels ship. Each included UK/Schengen PDF quotation was programmatically checked against `source_facts`; no record UUIDs, passports/account identifiers, original report IDs, raw provider outputs, full exports or QA directories were copied. Public fixture source is 10,510 bytes. UK: employer `Document_08.pdf` page 1; six monthly payslips `Document_09.pdf` pages 1–6; bank credits `Document_10.pdf` pages 1–3. Schengen: policy `Document_08.pdf` page 1, bookings `Document_07.pdf` pages 1–2, saved travel dates explicitly identified without PDF attribution. Offline correction is not described as a fresh live Check.

## Application evidence and integration limits

Read-only inspection of the existing Visa-App workspace confirmed:

- `backend/services/product_access.py`: launch package is exactly 4400 cents, 6 interviews, 10 documents, 90 days; a guard rejects conflicting launch values.
- `backend/api/billing.py`: Stripe Checkout sessions use `mode=payment`, server-owned prices and a validated HTTPS `checkout.stripe.com` destination; signed event handling grants entitlements. `src/pages/Billing.tsx` also validates the destination.
- Marketing uses package key `complete-44-v1`, while application configuration uses `launch`. Marketing's existing offering gate expects its own key and a per-plan currency field that the current app package does not return. This contract needs alignment and an authorized checkout test before enabling. No release switch, keys, mode or webhook changed.
- Current public wording: **“The intended checkout uses Stripe. Live purchasing has not been enabled.”** The existing ready-only branch uses **“Payments processed by Stripe.”** No endorsement, seal, rating, wallet logos or VisaPrepper PCI certification claim.
- Public unauthenticated GET checks: `https://app.visaprepper.com/` returned 200; `/documents` and `/signup` returned 404. Handoff therefore links only to the working root. Local app source supports those deep routes, but authentication redirects to dashboard/setup and drops intent (`src/App.tsx`, `src/pages/auth/Login.tsx`, `Signup.tsx`). Full routing needs deployed app route/fallback support plus a validated, allowlisted return destination through login/signup/email confirmation. Marketing alone cannot resolve that.
- `backend/services/application_assets.py`: 10 files, 30 pages, 10 MiB per file, 20 MiB bundle, 10 OCR pages, 100,000 text characters. Upload is separate from Check reservation. `application_checks.py` saves durably before consumption and releases terminal failures; paused work resumes without a second reservation.
- Reusable-file 90-day expiry and deletion semantics were checked against application services, migrations and `src/pages/Privacy.tsx`. Cleanup's 24-hour statement is an operational target, not a guarantee. Legacy Document Check and accepted profile values follow different retention rules. No provider retention promise or company identity invented.
- App billing currently says completed purchases are final subject to law. Marketing retains the owner-supplied service/billing-failure refund exceptions and mandatory rights. Owner/app-side legal review must reconcile these texts before paid launch.

## WhatsApp

Owner-supplied number **+1 732 518 8581**. Link: https://wa.me/17325188581 . Normal external anchor, accessible name, `target=_blank`, `rel=noopener noreferrer`. Registration not independently verified. No messages sent, response-time or 24/7 promises. Public help warns against sending passports, bank statements or payment details and points to the secure app for uploads.

## Verification record

- `node --import tsx --test tests/*.test.ts`: 14 passed. Uses the same test files as `npm test`, avoiding the sandbox restriction on the tsx CLI's IPC pipe. Partner email test uses a mocked transport only.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build -- --webpack`: passed, all 48 generated pages, plus dynamic routes. Default Turbopack build was blocked by this environment's internal port binding. Initial font downloads also required network access. No project bundler configuration changed.
- `git diff --check`: passed.
- Public assets unchanged; no PDFs, ZIPs, JSONs, raw offline exports or supplied screenshots present in the five existing public media files. Testimonials and original handoff files unchanged.
- Clean `npm ci --ignore-scripts` was blocked by the repository lockfile missing `@emnapi/runtime` and `@emnapi/core` entries. Installed dependencies with `npm install --ignore-scripts --package-lock=false --no-audit --no-fund`; package manifest and lockfile unchanged. Owner should separately repair the existing lockfile before requiring reproducible CI installation.
- `npm run test:site -- http://127.0.0.1:3015`: passed against the production preview: 40 pages, 43 internal links, metadata/H1/canonical/schema, unchanged testimonial count, handoff destinations, sample markup, WhatsApp and checkout HTTP 503. This is HTTP/SSR verification, not browser interaction testing. The earlier dev-server crawl timed out during compilation; the production crawl completed.
- Production local preview: `http://127.0.0.1:3015`. Restart with `npm run start -- --hostname 127.0.0.1 --port 3015` from this checkout after the successful build. Preview opening in Codex was queued; browser automation could not attach.
- Browser automation recovered after a tool connection restart. Inspected desktop, tablet and mobile at 320/375/390/768/1280/1440px: document width matched viewport at every size; the expanded report had no horizontal overflow. Visually inspected report layouts at 320/390/768/1440px, homepage at 1440px and pricing/contact at 390px.
- Runtime checks: report tabs (click, ArrowRight, Home, End), native evidence Enter expansion, separate UK net-pay disclosure, report close/Escape/focus return, menu Escape/focus return, help open/Escape/focus return, pricing FAQ, protected-content help clearance, WhatsApp href/target/rel, both intent handoffs and disabled checkout. No forms filled/submitted or WhatsApp link followed. Explicit focus wrapping was added after the browser exposed a native end-of-dialog focus edge. Final rebuilt-browser checks passed: Tab wraps from the final summary to Close; Shift+Tab wraps from Close to the final summary; focus remains inside, Escape closes, and focus returns to Explore sample report.
- Browser console had no captured warnings/errors during the checked flows. Browser performance scores and full real-device testing were not performed; no scores are invented.
- Screenshots in `review/`: `desktop-home.jpg`, `desktop-report.jpg`, `desktop-expanded-uk.jpg`, `desktop-report-overview.jpg`, `tablet-report.jpg`, `mobile-report.jpg`, `mobile-us-evidence-320.jpg`, `mobile-contact.jpg`, `mobile-pricing.jpg`, `mobile-pricing-details.jpg`. These show only the local fictional public demonstration and contain no personal notifications. Screenshots are review evidence, not public assets.


## Finite remaining inputs / work

1. Owner's actual interview-result screenshots. Existing interview presentation remains intact; no new scores, transcripts or replacement report were invented.
2. Original expanded DS-160 report export (HTML/JSON or approved expanded source-evidence images) if full US evidence/page-level preview is required. The bounded selected historical excerpts already work without it.
3. App-host routing/auth return implementation and checkout-offer contract alignment, followed by separately authorized checkout integration testing. No activation in this package.
4. Owner/legal approval of retention/processor wording, refund reconciliation and business identity/governing-law choices already missing from draft policies. No legal jurisdiction or company identity supplied here.

