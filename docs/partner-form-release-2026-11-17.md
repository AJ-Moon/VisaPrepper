# VisaPrepper marketing release — Gmail partner form

17 November 2026. Source complete locally; not deployed, committed or pushed.

Preview: http://127.0.0.1:3016/partners/apply . Local Gmail credentials are deliberately unset, so UI checks cannot send real email.

## Established failure and production state

The owner confirmed Vercel project `visa-prepperation` is still running the November 5 deployment at `77b062c`. Inspection of that exact Git revision shows `lib/partners/email.ts` sends through FormSubmit to `ajmoon2202@gmail.com`. It does not read either Gmail variable. The historical “Email relay rejected the application” error is its explicit non-2xx relay-error path; the precise reason FormSubmit rejected that send is not established here.

The owner has confirmed Production now has `GMAIL_USER=visaprepper@gmail.com` and `GMAIL_APP_PASSWORD`. No password was requested, read, printed or changed by this task. These settings were owner-checked, not independently authenticated by the agent. The newer Gmail handler must be deployed before they affect partner delivery. [Vercel documents that environment changes apply only to new deployments](https://vercel.com/docs/environment-variables/managing-environment-variables).

## Implemented behavior

- Fixed server-side notification destination: `PARTNER_NOTIFICATION_RECIPIENT = "visaprepper@gmail.com"`. It is independent of the SMTP sender login and does not rely on hello@ forwarding.
- Existing Nodemailer Gmail SMTP transport retained: authenticated sender, encrypted port 465, certificate verification retained, minimum TLS 1.2, explicit DNS/connection/greeting/socket timeouts, connection cleanup. The route stays on Node.js and declares a 60-second function duration. No new dependencies or service were added.
- Full plain-text email includes the applicant name, email, business/creator name, country, partner type, social/profile URL, optional phone, audience countries/range, introduction, optional experience, privacy acknowledgement, marketing preference, server-generated UTC submission timestamp and reference. Applicant email is Reply-To; applicant names cannot inject line breaks into that header. Stable Message-ID aids reconciliation.
- Success requires Gmail SMTP to report the intended recipient as accepted. Browser success also requires an accepted API response matching the submission ID. This confirms provider acceptance, not inbox arrival.
- Browser prevents concurrent clicks immediately, disables controls while sending and reuses a stable ID for unchanged retries. Tab-session storage contains only a reference, fingerprint and delivery status, never answers. Previously accepted attempts in that tab are not resent.
- Bounded, short-lived per-instance caches suppress simultaneous/repeated identical submissions and reject a reused reference with changed answers. No Redis, application database, new database, disk persistence or queue.
- Explicit SMTP rejection/authentication failure remains retryable. Connection loss or uncertain acceptance blocks automatic resending, retains answers and supplies a reference plus a direct partner-team email link. No SMTP automatic retry is performed. Check Gmail for the reference before manually resending an uncertain application.
- Strict server validation, honeypot, 16 KiB request limit and best-effort per-instance 10-per-minute network rate limit remain. Cross-site and insecure public-origin requests reject. Corrected same-origin checking to use the actual request Host when Next constructs an internal request URL; HTTPS remains required outside loopback development.
- Field errors and delivery errors retain completed form values and focus an accessible error summary. Missing audience-country feedback is now plain language. Layout stays within the approved design.
- Privacy now accurately describes Gmail/Google, the fixed destination and temporary duplicate/rate-limit metadata. Public contact and WhatsApp details are unchanged. Deploy Privacy together with the form; the older live policy still describes FormSubmit.

## Important no-storage limitation

Duplicate suppression and rate limiting are best-effort across the browser tab and a running function instance. They are not a durable cross-instance exactly-once guarantee. Separate cold-started Vercel instances, separate browsers or expired metadata can bypass the server cache. SMTP itself has an ambiguous-outcome window if the connection is lost after acceptance. A stable Message-ID alone is not an inbox deduplication guarantee. This release honors the owner's explicit no-Redis/no-database requirement; it does not claim stronger guarantees than it implements.

## Verification performed

- Provider-free automated tests: **34 passed, 0 failed**, including mocked Gmail authentication/options, fixed recipient independent of sender, Reply-To, all fields/timestamp/Message-ID, missing configuration, explicit rejection, authentication failure, timeout, redacted diagnostics, concurrent duplicate suppression, receipt replays, reference conflicts, browser attempt persistence and origin/validation/honeypot/size/rate controls.
- ESLint: passed.
- TypeScript (`npx tsc --noEmit`) and final build's type check: passed.
- Production build (`npm run build -- --webpack`): passed, 52 outputs. Existing informational parent-lockfile warning remains.
- Final GET-only SEO/navigation crawl: **44 canonical pages and 45 internal link targets passed**. Existing titles/descriptions, canonicals, JSON-LD, sitemap, robots/indexability, app-entry CTAs, pricing/live-offer messaging, three new articles, comparison, samples, video order, testimonials and WhatsApp are preserved.
- Public client JavaScript scan: no Gmail transport or `GMAIL_APP_PASSWORD` variable name in client bundles.
- Actual local browser checks at 390px: missing audience-country validation, friendly linked field error, focus on error summary, and a deliberate unconfigured-Gmail failure all retained entered answers. Local server emitted only the reference and `gmail_configuration_missing` diagnostic. SMTP was not called.
- Form/error layouts checked at **1440, 390 and 320px** with no document-level overflow. Screenshots and DOM checks are under `review/2026-11-17-gmail/`. Successful SMTP acceptance and API responses were tested with mocked transport. The actual browser success screen and real inbox arrival await an authorized production test.
- Valid local partner/privacy routes returned 200. The intentional unsupported-country negative test returned 404; Next logs an internal NoFallback diagnostic for that expected 404. No valid-route failure was found.
- `git diff --check`: passed. 213 existing starting files outside the six edited files remained byte-identical. The separate application repository's tracked diff remains empty.

No new production submission, real SMTP authentication, checkout, payment, provider-AI call, account change or deployment was performed. **Actual production Gmail acceptance and inbox arrival are not confirmed.**

## Changed files in this task

Existing files:

- `lib/partners/email.ts`
- `app/api/partners/route.ts`
- `components/partners/PartnerForm.tsx`
- `lib/partners/validation.ts`
- `app/privacy/page.tsx`
- `tests/offer-and-partners.test.ts`

New files:

- `lib/partners/handler.ts`
- `lib/partners/client-submission.ts`
- `tests/partner-delivery.test.ts`
- this release note and local review artifacts.

Homepage, language/global panel, all blogs, SEO metadata, pricing, Stripe, testimonials, WhatsApp, package manifests/lock and application code were left unchanged during this task.

## Deployment handoff

The complete current marketing source (including all prior uncommitted website/SEO work) is packaged in `/tmp/visaprepper-marketing-release-2026-11-17.zip`, with an included SHA-256 file manifest. It excludes Git metadata, dependencies/build output, private env files, hosting credentials, local screenshots and old evidence exports. The package contains `.env.example` with an empty password field; no actual secret values.

Local source branch: `codex/marketing-release-2026-11-04`; existing local HEAD: `b7916f384023ed4c9b8ecdcf4f1f8b075e2d4071`. Release changes remain uncommitted and have not been pushed. The archive contains the working tree, not just that HEAD.

Required production variables on **visa-prepperation**:

| Variable | Required setting |
| --- | --- |
| `GMAIL_USER` | Authenticated Gmail sender; owner confirmed visaprepper@gmail.com |
| `GMAIL_APP_PASSWORD` | Google app password stored as a Production server secret; owner confirmed added |

No recipient variable, Redis/KV, database, additional provider or Stripe setting is required. Do not place Gmail credentials in NEXT_PUBLIC variables or source control.

The release candidate is ready for an **approved deployment**, subject to the stated no-storage limitation. Keep the existing Vercel project/domain. After approval, deploy this complete source and Privacy together using the Production environment. Do not redeploy the old November 5 source as the fix.

After deployment, obtain authorization for exactly one clearly labelled production test. Confirm accepted API/success UI, the `partner_email_accepted` reference in Vercel logs, and the actual email in visaprepper@gmail.com (Inbox or Spam), including all fields, timestamp and Reply-To. Confirm one notification. Provider acceptance alone must not be described as inbox delivery. No production email test is authorized or performed by this handoff.
