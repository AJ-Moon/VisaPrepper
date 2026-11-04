# Public marketing examples — 3 November 2026

Local preview: http://127.0.0.1:3015/ . Open `/#sample-report` for documents or `/#interview-example` for interview feedback. The rebuilt production preview is left running for local Chrome review.

Continued the existing modified AJ-Moon/VisaPrepper checkout. This revision supersedes the public-example descriptions in the 2 November report; that earlier report remains a historical implementation record. No clean clone, reset, commits, pushes, deployment or activation. No paid AI calls, messages, account/database operations or application/scoring changes.

## Changed files

| File | Change |
| --- | --- |
| `lib/content/interview-sample.ts` | Replaced real-report excerpts with the three owner-written fictional examples: funding, university choice and plans after graduation. Exact supplied questions, answers, feedback titles, feedback and next steps retained. No scores, dates, duration, real transcript data or communication measurements remain. |
| `components/marketing/InterviewSamples.tsx` | Homepage uses the full funding example; expanded Answer Review adds university choice and graduation plans. Label is “Illustrative sample” with explicit fictional demonstration wording. Summary, Priorities and Transcript reflect those same fictional examples. Removed Communication tab and real-session snapshot. Transcript is clearly a fictional practice conversation without question-number citations. Dialog design, responsive cards, keyboard tabs and focus behaviour retained. |
| `components/marketing/HeroFixVisual.tsx` | Existing illustration now uses a short excerpt from the fictional funding answer and feedback about explaining costs. Removed real-excerpt labels and original weak answer. Existing visual structure retained. |
| `lib/content/report-samples.ts` | Simplified public data to direct labelled comparisons, explanation and next step. Removed evidence payloads, filenames, page references, saved-source labels, provenance and technical limitation text. Retained supported additional document findings and correct gross-to-gross salary arithmetic; matching net pay remains separate context. |
| `components/marketing/DocumentSamples.tsx` | Removed evidence drawers and citation/provenance UI from homepage and expanded dialogs. One finding per homepage country; two findings per expanded country. UK matching net pay is a plain context block, not another problem. One short preparation/visa-decision note on the page and one within each modal, without repeated card disclaimers. Country tabs, selected-country modal, layout and focus handling retained. |
| `tests/interview-sample.test.ts`, `tests/report-samples.test.ts` | Updated content/privacy regressions for fictional examples, absence of real measurements/evidence payloads, additional document examples, salary/date semantics and unchanged WhatsApp text. Obsolete assertions requiring real-session data and public citations were replaced. |
| `scripts/verify-site.mjs` | Updated the existing GET-only crawl to check new illustrative wording and reject obsolete public sample content. Video order, testimonials, pricing, navigation and disabled-checkout checks retained. |
| `review/2026-11-03/` and this report | New local desktop/mobile review images and handoff. |

## Preserved behaviour

- Cream/green brand, logo, typography, country tabs, report dialogs and surrounding layout retained.
- Hero → existing product video → document examples → interview feedback order unchanged. Video remains intentional playback with native controls, no autoplay and `preload="none"`.
- WhatsApp number and exact encoded prefilled message unchanged. No chat opened or message sent.
- Bundle explanation, limits, pricing, testimonials, navigation and checkout guard unchanged. Local checkout entry still returns HTTP 503.
- SHA-256 comparison: all **54 previously modified tracked Visa-App files unchanged**. All **11 selected protected marketing files** unchanged, including homepage composition, video, bundle explanation, pricing, testimonials, WhatsApp control/config, checkout gate and dependency manifests. Actual customer application evidence/citations and stored reports were not touched.
- Historical source provenance remains in local handoff documents; raw screenshots/reports were not copied into public assets. No additional source material is needed for these owner-supplied fictional interview examples.

## Checks performed and actual results

- `node --import tsx --test tests/*.test.ts`: **14/14 passed**. Same test files as the npm script; direct loader avoids the previously documented tsx CLI IPC restriction. Mocked partner transport sends no messages.
- `npm run lint`: passed. `npx tsc --noEmit`: passed. `git diff --check`: passed.
- `npm run build -- --webpack`: passed, all 48 generated pages plus dynamic routes. Existing warning about the surrounding repository's ignored pnpm lockfile remains; no bundler or dependency changes.
- `npm run test:site -- http://127.0.0.1:3015`: **passed — 40 pages / 43 internal links**, GET-only. Includes disabled checkout HTTP 503; no forms submitted or payment sessions created.
- Browser visually inspected desktop **1440px**, phones **320px and 390px**, and checked dialog widths at **320/375/390/768px**. Page scroll width matched viewport; dialog scroll width matched client width. Narrow interview tabs scroll within their own strip, with keyboard End bringing Transcript into view.
- Homepage country tabs: clicked all three; exactly one finding each. Expanded reports: selected country retained, two useful findings in each; UK net-pay context remains distinct. Interview expanded Answer Review has three examples, including two beyond the homepage.
- Interview Summary, Priorities, Answer Review and Transcript were inspected; no real-session facts or measurements remain. Public sample evidence drawers count is zero; obsolete labels/filenames/statistics were absent in rendered content.
- Both report dialogs: verified initial Close focus, keyboard Home/End/ArrowRight tab navigation, Tab/Shift+Tab wrapping, focus staying inside, Escape dismissal, close-button dismissal and focus return. Mobile menu Escape/focus return also passed.
- Mobile help clears the interview content; existing protected-file comparison confirms help, bundle and pricing logic unchanged. Video sequence and no-autoplay/preload attributes rechecked in the browser. No captured browser warnings/errors during checked flows.
- Initial browser connection needed a session reset; inspection then completed against the final build. One read-only DOM check used an unsupported helper and was replaced with supported DOM inspection; no application failure resulted.

## Review images

All images show the revised sanitized local marketing demonstration, not private source reports. New images are outside `public/`:

- `review/2026-11-03/desktop-interview.jpg`
- `review/2026-11-03/desktop-expanded-interview.jpg`
- `review/2026-11-03/desktop-document.jpg`
- `review/2026-11-03/mobile-homepage-interview.jpg`
- `review/2026-11-03/mobile-university-example.jpg`
- `review/2026-11-03/mobile-document-dialog-320.jpg`
- `review/2026-11-03/mobile-transcript-320.jpg`
- `review/2026-11-03/mobile-hero-320.jpg`

This revision verifies the local marketing demonstration. Prior app routing/authentication-return, live checkout-contract, policy and clean-install findings remain outside this revision and were not newly certified or activated. No real-device or performance-score claim is made.
