# VisaPrepper marketing revision — local review, 2 November 2026

Preview: http://127.0.0.1:3015/ (document example: /#sample-report; interview: /#interview-example).

Continued the existing modified AJ-Moon/VisaPrepper checkout at `/Users/ayeshakhaldoon/Documents/ChatGPT/New project/visaprepper-marketing`, base `29627faa82d6e9f0b4bde3107266cb73924d372b`. Read its AGENTS.md, relevant installed Next.js documentation and the complete 1 November implementation report before editing. This revision preserves the previous implementation; it is not a fresh clone. SHA-256 comparison confirms all 54 previously modified tracked files in the surrounding Visa-App workspace remain unchanged. No application/backend/scoring files were edited.

This is a bounded local marketing revision, not release certification. No paid AI/provider calls, account/database changes, payment sessions or transactions, messages, commits, pushes, merges, deployments or activation occurred. Credentials and release switches were not changed.

## Changes in this revision

| Files | Result |
| --- | --- |
| `app/page.tsx` | Hero → existing intentional-playback product video → document examples → separate real interview feedback. Removed the superseded generic interview-example block; preserved the rest of the cream/green layout and testimonials. |
| `components/marketing/ProductDemoVideo.tsx` | Preserved the existing video/poster, native controls, responsive aspect ratio and no autoplay/loop. `preload="none"` avoids unnecessary video loading; reserved aspect ratio limits layout movement. No measured performance score is claimed. |
| `components/marketing/DocumentSamples.tsx`, `lib/content/report-samples.ts` | One concise finding per homepage country tab, labelled compared values, explanation, next step and expandable evidence. Exact requested section/button labels. The expanded dialog follows the selected country and contains fuller supported findings. Public internal QA/export wording was replaced with explanations. |
| `components/marketing/InterviewSamples.tsx`, `lib/content/interview-sample.ts` (new) | Responsive selectable text recreated from real report screenshots. Homepage leads with the father-funding question excerpt, exact “He afford me.” answer excerpt, feedback and preparation step. Expanded report has Summary / Priorities / Answer Review / Communication / Transcript, with the source-supported coaching framework and three selected transcript answers. Read-only: no AI action buttons. |
| `components/marketing/HeroFixVisual.tsx` | Existing illustration design now uses the real unclear funding explanation and preparation framework; removed invented confidence-decline feedback. |
| `components/marketing/BundleExplanation.tsx` (new), `components/marketing/Pricing.tsx` | Exact visible bundle explanation at the document offer and pricing, with verified file/page/size limits; secondary disclosure explains OCR/text limits and legacy single-document flow. Existing $44 USD once / six total interviews / ten checks / 90 days and separate one-time free check retained. |
| `lib/config/site.ts`, `components/layout/WhatsAppHelp.tsx` | Correct encoded prefilled message for +1 732 518 8581. Existing contact links share this constant. Help also clears the interview showcase; existing pricing/form/document clearance and modal behaviour preserved. Content update date is 2 November. |
| `components/marketing/Pricing.tsx`, `lib/content/faq.ts` | Replace claims about detecting confidence problems with answer clarity and consistency. Aspirational preparation copy and owner-confirmed testimonials remain intact. |
| `app/start/page.tsx` | Explicit document sample label. Removed “Payments processed by Stripe” even from the ready-only branch. Disabled checkout guard remains intact. Current wording describes intended integration and unavailable purchasing without an endorsement or live-processing claim. |
| `scripts/verify-site.mjs`, `tests/report-samples.test.ts`, `tests/interview-sample.test.ts` | Cover section order, separate showcases, bundle copy, exact WhatsApp message, real-excerpt limitations/privacy, existing offers and checkout gate. Site crawler remains GET-only. |
| `review/2026-11-02/`, this report | Sanitized local browser review images and precise revision record. Earlier report/images are retained. |

## Document sample provenance

Original handoff ZIP prompt/README and its seven US reference screenshots were read in the previous implementation. That work and the original references are retained. This revision simplifies the public presentation using the same sources:

- **US:** historical DS-160 screenshot 07 supports SELF versus saved Family support; screenshot 03 supports the education-history finding. The original expanded source drawers/PDF page references are still unavailable. No page numbers or hidden source quotes were invented. The public report states this limitation and distinguishes the saved-profile difference from the report's education inconsistency.
- **UK:** corrected saved report `output/application-check/two-route-followup-offline-repair-20261031/reports/case-02-offline-report.html` and `.json` in the surrounding application workspace. Employer `Document_08.pdf` p1 shows £36,000 annual gross base; six `Document_09.pdf` payslips p1–6 show £2,500 monthly gross base. £30,000 annualisation assumes twelve repeated monthly amounts, leaving £6,000 to clarify. Neither record is selected as correct and no financial eligibility decision is made. The separate matching £2,018.45 net payslip/bank-credit evidence remains available in the expanded report, explicitly not an extra problem or a resolution of gross salary differences.
- **UK additional detail:** `after_report.findings[1]` supports unresolved TB-evidence applicability. Selected bundle evidence did not establish a requirement or absence from the complete application. The public drawer labels applicant-declared stay/residence/application/arrival values as saved facts, not independently verified PDF evidence. No PDF page is fabricated. Original finding was rechecked in this revision.
- **Schengen:** corrected saved `case-01-offline-report.html` and `.json` from the same directory. Policy `Document_08.pdf` p1 ends 15 December 2026 at 23:59; saved trip ends 16 December 2026. Bookings `Document_07.pdf` p1–2 leave the night of 13–14 December undocumented in selected evidence. Other cover, arrangements, applicability and exceptions remain unresolved; no definitive legal failure is asserted.

UK/Schengen are selected fictional demonstration findings from saved corrected reports, not newly run checks. US remains selected historical document-review content. Public text does not describe internal offline repair, export names or QA directories. Only allowlisted excerpt fields ship; raw exports do not.

## Real interview evidence and limits

Inspected the nine interview screenshots found on the Desktop (2 November, 8:06:47 through 8:07:49 PM), the eight supplied homepage screenshots (8:00:36 through 8:01:02 PM), and the nine report images attached in this chat. The attached report views confirm the same Summary, expanded funding topic, Priorities, Answer Review/coaching, Communication and Transcript content. Browser chrome, private report address, notifications, tabs, account elements and desktop overlays were not copied or reproduced.

The source describes an approximately two-minute, four-answer, funding-focused session. That context is visible beside the homepage example and in the dialog. It establishes neither the normal full-interview duration nor its coverage. **41/100 is labelled only as a funding topic score**, never an overall interview score or approval probability. The prior 73 for an unpractised topic is excluded; no progress or decline is inferred.

Question 1 is a verbatim excerpt omitting the introductory greeting; it is explicitly labelled an excerpt. The homepage answer is the exact excerpt “He afford me.” The expanded transcript retains the actual selected answer wording, including “Because I, uh, my father have other properties and some documents, I, I'll show you in attachment files with my form.” Question 2 is deliberately shortened and labelled an excerpt with an ellipsis; no complete question is invented. The report's actual funding-source → amount → use → total cost → capacity framework and practice prompt appear as preparation, not a model script to memorise.

Communication values are explicitly associated with this short sample: typical 136 words/min (average 119), four measured answers, one faster than 180 and one slower than 90; one filler word, 2.9 per 100 words; about one second to start; no long pauses. Camera values are face visible 95%, camera direction 58%, steady framing 99%. They are not emotion, honesty, accent or confidence detection, and are not presented as part of the practice score. The measurement context still includes all four original answers despite the public transcript omission.

### Apparent source-report issues recorded for application follow-up

These observations do not change stored reports, scoring or backend behaviour:

1. “Full Mock” label versus a two-minute, funding-focused session; the public sample describes the actual observed session.
2. Empty summary strengths section despite positive observations in the funding topic notes; public summary attributes those observations to the topic notes instead of inventing a strength summary.
3. “Worth preparing” and “Needs attention” labels surround the same funding result; marketing does not invent a new scoring interpretation or silently change application statuses.
4. The interviewer's 3,000,000 PKR tuition / 500,000 PKR living-cost amounts and landscaping-business premise cannot be grounded from screenshots alone. Amounts are excluded from selected public questions. The business question is retained exactly as asked, with an explicit note that its premise is not independently verified.
5. Final answer **“Her interview.”** appears unusual. Its accuracy is unverified, so that entire turn is omitted from selected public excerpts and the omission is disclosed. It was not corrected or reinterpreted. Owner verification against the original audio/transcript would be needed before using it publicly.

No original screenshots, raw reports, private URLs, report/account identifiers, exports or rejected generic PDF were added to public assets. The five pre-existing public media files remain unchanged.

## Bundle and offer verification — current code inspection

Rechecked `backend/services/application_assets.py`: max 10 files, 30 total pages, 10 MiB each, 20 MiB total, 10 OCR pages, 100,000 extracted characters. `application_checks.py` selects the bundle and performs one `application_check_reserve` call for that check; per-file upload is separate. This supports the visible bundle explanation. Legacy single-document Document Check is separately qualified; the bundle promise is not extended to that older flow. The free allowance of one check once is based on existing configured behaviour, not a live account/database test.

Rechecked `backend/services/product_access.py`: the only launch package is 4400 cents, six interviews, ten documents, 90 days, and checkout defaults off. The paid ten-check package is described separately from the free allowance; no unlimited uploads are implied.

## Integration findings: verified now versus inherited

| Area | Verified on 2 November | Remaining scope / historical context |
| --- | --- | --- |
| Public app routing | Non-mutating unauthenticated GET: app root 200; `/documents`, `/signup`, `/login`, `/api/public/offering` each 404. | Root-only marketing app handoff retained. `/documents` and `/signup` failures were also in the earlier report; this revision confirms them now and adds login/offering checks. These are public host responses, not a diagnosis of authenticated routes. |
| Authentication return | Current local `Login.tsx:36` and `Signup.tsx:46` navigate to dashboard/setup. Marketing `/start?intent=free` explains manual Documents continuation; app anchor points to the verified root. | App needs deployed route/fallback support and validated, allowlisted intent/return continuity through login, signup and email confirmation. No account was created or authenticated flow completed. |
| Checkout contract | Current marketing requires `complete-44-v1`, exact entitlements, per-plan USD and explicit enablement; current app configuration uses `launch` without that per-plan currency shape. Local checkout-entry GET returns 503. Default `/start` shows unavailable checkout and no payment link. | Same mismatch as prior report, rechecked now. The public offering endpoint is currently 404, so live contract/processor behaviour is unverified. Align application contract and separately authorize integration testing before any activation. |
| Stripe | Existing intended integration documented by previous code inspection; no live checkout exercised here. No “Payments processed by Stripe” claim remains in this revised start page. | No live processing, endorsement, transaction or webhook delivery is certified. Credentials/switches untouched. |
| Policy / reproducible install | Earlier policy edits and package files preserved. | Owner/legal review of refund-policy differences, retention/processor wording, identity and governing-law choices remains inherited work. Prior clean-install lockfile failure is inherited, not rerun in this revision. |

## Verification actually performed

- `node --import tsx --test tests/*.test.ts`: **16/16 passed** after final source edits. The default `npm test` wrapper hits the environment's tsx CLI IPC-pipe EPERM restriction; the direct Node loader runs those same test files. Partner transport tests are mocked and send no messages.
- `npm run lint`: passed. `npx tsc --noEmit`: passed. `git diff --check`: passed.
- `npm run build -- --webpack`: passed, 48 static/generated pages plus dynamic routes. One informational warning notes the surrounding workspace's pnpm lockfile is outside the marketing Git repository. Bundler configuration was not changed. The previous report's default Turbopack environment restriction was not repeated here.
- Final production `npm run test:site -- http://127.0.0.1:3015`: **passed, 40 pages / 43 internal links**. GET-only crawl covers metadata, navigation/intent links, unchanged 30 testimonials, offer values, report markup, no autoplay, WhatsApp and checkout returning 503. No forms submitted. Local networking required sandbox access; the initial unprivileged attempt was blocked before connecting.
- Browser inspection used the final production build. Desktop 1440px and phone 320/390px were visually inspected; page/dialog width checks also covered 375/768/1280px. At 320/375/390/768/1280/1440px the inspected page width matched viewport. At 320/375/390/768/1280px the expanded interview dialog's scroll width matched its client width. The 320px document dialog likewise had no horizontal overflow and a visible 44px close control. Interview tabs scroll inside their own strip, without overflowing the dialog; keyboard End brings Transcript into view.
- Clicked all three homepage country tabs: exactly **one** `data-document-finding` each, correct labels/values. Expanded report opens for the selected country; all three countries expose their supported fuller findings. Tested country ArrowRight / Home / End, evidence Enter expansion, UK net-agreement disclosure, all five interview sections and interview Home / End.
- Both report dialogs: verified initial Close focus, Tab/Shift+Tab boundary wrapping, focus staying inside, Escape and close-button dismissal, and focus returning to the opener. Mobile menu and help dialog Escape/focus return also passed. Native modal isolation prevents help interacting over report dialogs.
- Video DOM and mobile visual inspection confirm it is immediately before document samples, controls available, paused initially, no autoplay and `preload="none"`; responsive media has reserved dimensions. Full video playback/performance/real-device testing was not performed.
- Pricing bundle disclosure and credit-use FAQ worked by keyboard. Help hides with document/interview samples and pricing visible; mobile navigation controls remained reachable. Existing free/signup and paid-interest links were inspected and clicked locally within their verified limits; no authentication or payment attempt made.
- WhatsApp href inspection: host `wa.me`, path `/17325188581`; decoded text exactly **“Hi VisaPrepper! I’m applying for a visa and would like help getting started. Can you guide me?”**. `_blank`, `noopener noreferrer`, accessible label retained. Link not followed, no message sent, no reply-time promise. Account registration is not independently verified.
- No captured browser warnings/errors in the checked flows. No Lighthouse/performance/accessibility score or exhaustive device certification is claimed.
- 54 pre-existing tracked Visa-App modifications matched their start-of-revision SHA-256 values. Public media, package manifest/lockfile and testimonials remain unchanged.

## Review screenshots and preview

All screenshots below capture the sanitized local website only. They are review evidence outside `public/`, not original report screenshots or public marketing assets. Desktop is 1440×1000; phones are 320×800 or 390×844.

- `review/2026-11-02/desktop-home.jpg`
- `review/2026-11-02/desktop-document.jpg`
- `review/2026-11-02/desktop-document-expanded-uk.jpg`
- `review/2026-11-02/desktop-interview.jpg`
- `review/2026-11-02/desktop-interview-expanded.jpg`
- `review/2026-11-02/mobile-document-320.jpg`
- `review/2026-11-02/mobile-document-dialog-320.jpg`
- `review/2026-11-02/mobile-interview-390.jpg`
- `review/2026-11-02/mobile-answer-review-390.jpg`
- `review/2026-11-02/mobile-interview-dialog-390.jpg`
- `review/2026-11-02/mobile-video-order-390.jpg`
- `review/2026-11-02/mobile-pricing-390.jpg`

A detached production preview process serves only `127.0.0.1:3015` and was left running for Chrome. If it is later stopped, from the existing marketing folder run `npm run start -- --hostname 127.0.0.1 --port 3015` after a successful build. Preview log: `/private/tmp/visaprepper-marketing-preview.log`.

## Specific remaining inputs and work before ads

1. **Optional richer US evidence:** approved expanded DS-160 source drawers or original report export/PDF evidence for page-level citations. Current bounded historical excerpts visibly disclose the gap and do not need invented content.
2. **Report accuracy follow-up:** verify the final transcript turn against audio and establish the source of the interviewer’s tuition/living amounts and landscaping-business details. Resolve the apparent report label/strength/status inconsistencies in a separate application task. They are recorded above, not changed here.
3. **Application integration:** fix public deep routing/fallback and authentication-return intent, then test a real user journey under separate authorization. Marketing currently states its root-only handoff limitation.
4. **Checkout:** align package ID/currency/entitlement contract and public offering route; reconcile billing/refund text and perform separately authorized integration testing. Keep checkout disabled until that work is approved. No activation is part of this revision.
5. **Inherited website launch work:** owner/legal approval of incomplete company/jurisdiction and retention/processor/refund wording; existing lockfile repair for reproducible clean CI installation. These earlier observations were not independently revalidated beyond preserving their files.

The requested interview screenshots are now supplied and used; they are no longer a missing input.
