# Visa Prepper: what the product actually supports (2026-11-21)

Date of all checks: **2026-11-21**. Live marketing pages were fetched at 10:55 UTC, the app shell at 10:57 UTC and social links at 11:02 UTC. All requests were plain unauthenticated GETs made with curl.
Every response came through Vercel edge `bom1` (Mumbai), so the request most likely left from South Asia. Geo-dependent behaviour was not tested.

## Sources compared

| # | Source | What was used |
|---|---|---|
| R | Repo clone at commit `99dac01` (the production commit). Path: `scratchpad/work/VisaPrepper` | `lib/config/{site,offering,offer,product-scope,live-offering}.ts`, `lib/content/*`, `content/visa-types/*`, `app/**/page.tsx`, the components the task named, `app/api/*`, `lib/seo/*`, `lib/partners/*` |
| L | Live `https://visaprepper.com`: 19 HTML pages, plus robots.txt and sitemap.xml | Raw HTML, parsed for title, robots, canonical, JSON-LD, anchors and scripts. The 14 `/_next/static` JS chunks were also grepped. Raw files: `out/product-truth/live/`, `out/product-truth/js/` |
| A | Public `https://app.visaprepper.com` | HTML shell and headers for `/` and `/login`. Same-shell probes of `/robots.txt`, `/sitemap.xml`, `/api/public/offering`, `/documents`, `/signup` and `/billing` (no data sent). The public client bundle `/assets/index-DUMkqlXH.js` (2,086,300 bytes, Last-Modified 2026-11-19 16:38:37 GMT) was grepped. Raw files: `out/product-truth/app/`, `out/product-truth/appjs/` |
| W | WebSearch (US index), 2026-11-21 | Google Play listing check |

App-bundle citations use the form `bundle@<character offset>` in `appjs/index.js`. Bundle evidence shows **client-side configuration only**. The server could override it, which cannot be checked without signing in, and nobody signed in.

---

## 1. Headline findings

1. **Bangladesh is blocked in the app but promoted on the site (contradicted).** The site tells Bangladeshi applicants to choose "Another country", pick Bangladesh and use the U.S. routes. The live app bundle blocks them:
   - Config: `coming_soon_countries:["BD"]`.
   - Gate message: "VisaPrepper is not yet available to applicants from Bangladesh. Bangladesh is coming soon." (bundle@191129, @192506). The gate in `te()` runs **before** the "open to all nationalities" check, so it applies to U.S. routes as well.
2. **Worldwide U.S. access is confirmed in the client config, with two limits.**
   - `us_routes_open_to_all_nationalities:true` (bundle@191208).
   - U.S., PR, GU, VI, AS and MP nationals are excluded.
   - Bangladesh is blocked, as above.
3. **UK, France, Italy, Germany and Schengen routes are only for Pakistani and Indian nationals.** Message: "This route is currently available to Pakistani and Indian applicants" (bundle@192902). The site only says these routes have "country-specific eligibility". That is consistent but vague.
4. **The site has no analytics of any kind.** Nothing in the repo or live HTML loads GA4, gtag, GTM, Vercel Web Analytics, Plausible, PostHog, a Meta pixel or anything similar. `/_vercel/insights/script.js` returns 404.
   - `/_vercel/speed-insights/script.js` returns 200: Vercel serves it, but no page loads it.
   - The app bundle has no analytics or UTM capture either.
   - Every app CTA goes to the same bare URL `https://app.visaprepper.com`, with no UTM or intent parameter, and most carry `rel="noopener noreferrer"`. **No organic conversion can currently be measured or attributed.**
5. **The app shell is off-brand and contradicts the site's scope.**
   - Title `VisaPrepper`. Meta description: "VisaPrep helps applicants from Pakistan, India, and Bangladesh prepare for U.S. visa interviews…". `og:title` is `VisaPrep`.
   - There is no robots meta tag and no `X-Robots-Tag` header.
   - Every path returns HTTP 200 with the same 910-byte shell (empty `<div id="root">`), including `/robots.txt`.
6. **Platform: web only.** No Google Play listing for Visa Prepper was found (W, 2026-11-21). The site says the Android and iPhone apps are "coming soon".
7. **The site's checkout hand-off does not match the app.**
   - The site's offer id is `complete-44-v1`. The app's package id is `launch` (bundle@938309).
   - Live `GET https://visaprepper.com/api/checkout-entry` returns **503**.
   - Nothing links to that endpoint, so users are not affected. Whether in-app Stripe checkout is enabled right now is **unknown**.

---

## 2. Evidence table

Status key: **confirmed** (repo, live site and app agree) · **partially_confirmed** (agree, but one source is silent or only indirect) · **unverified** (cannot be checked without signing in or private data) · **contradicted** (sources disagree).

### 2.1 Features

| Fact | Status | Repo (file:line) | Live site | App (public) |
|---|---|---|---|---|
| AI **video** mock interview (camera and microphone) built from the user's form and details | partially_confirmed | `app/page.tsx:34,89`; `app/how-it-works/page.tsx:17,30` | `/`, `/how-it-works`, `/features`: text is server-rendered | Bundle has the routes `/interview/device-check`, `/interview/session`, `/interview/report/:id`, plus a LiveKit real-time video SDK. Not exercised |
| Follow-up questions based on answers | partially_confirmed | `components/marketing/Pricing.tsx:25` | `/pricing` | Not verifiable publicly |
| Document consistency check (one bundle per check; U.S. checks need one DS-160 or DS-260 PDF) | partially_confirmed | `app/document-checks/page.tsx:36,41` | `/document-checks` | Bundle labels: "Run my free document check" and "1 free document check available" (bundle@941277 area). `/documents` route exists |
| Personalised document checklist, practice tips, results and scores | partially_confirmed | `app/page.tsx:31-37`; `app/features/page.tsx:21-27` | `/`, `/features` | Bundle: "Personalized feedback after each completed interview" (near bundle@940475) |
| Report explanation in Urdu (separate from the interview language). Hindi and Bengali explanation "coming soon" | confirmed | `lib/config/product-scope.ts:3`; `app/languages/page.tsx:25` | `/languages` | Bundle: "Urdu and English preparation are available. Hindi and Bengali preparation is coming soon." (bundle@1005970 area) |
| Sample document report on the website | confirmed | `components/marketing/DocumentSamples.tsx:48` (`id="sample-report"`) | `/#sample-report` is server-rendered on the homepage | n/a |

### 2.2 Pricing

| Fact | Status | Repo (file:line) | Live site | App (public) |
|---|---|---|---|---|
| $44 USD, one-time | confirmed | `lib/config/offer.ts:2-4`; `app/terms/page.tsx:52` | `/`, `/pricing`, `/terms` and 13 other pages contain "$44" | Bundle has a hard-coded list price `rX=4400` and the string "Commission on $44 list price" (bundle@1969668, @1973016, partner admin). The checkout price comes from the server (`price_cents`) |
| 6 AI video interviews, 10 document checks | partially_confirmed | `lib/config/offer.ts:4`; `lib/content/faq.ts:7` | `/`, `/pricing` | Counts come from server config (`n.interviews`, `n.documents ?? "Unlimited"`). Not visible without signing in |
| Valid for 90 days | partially_confirmed | `lib/config/offer.ts:4` | `/pricing`, `/terms` | Bundle defaults to `validity_days ?? 90` (bundle@940475); the server value is unknown |
| Free plan: 1 document check, no interview, no card | confirmed | `lib/config/offer.ts:6`; `components/marketing/Pricing.tsx:16` | `/pricing`: "1 document check for eligible users", "No AI video interview" | Signup copy "One free document check", "No credit card required" (bundle@813436). Free plan has `documents===1` |
| Payment through Stripe, inside the app after sign-in | partially_confirmed | `components/marketing/Pricing.tsx:30`; `app/terms/page.tsx:55` | `/pricing`, `/terms` | Bundle: "once Stripe confirms payment" (bundle@1089604) and a `checkout.stripe.com` reference. Checkout can be switched off from the server: "Interview packages can't be purchased right now" (bundle@941277) |
| "Live Stripe checkout is available in the app" (stated as current) | unverified | `app/document-checks/page.tsx:38`; `app/terms/page.tsx:55` | `/document-checks` | Server `checkoutReady` is unknown. The site's own gate `/api/checkout-entry` returns 503 live |
| JSON-LD Offer for $44 with `availability: InStock`, `eligibleRegion: Worldwide` | contradicted (scope) | `lib/seo/json-ld.tsx:59-70` | Homepage JSON-LD `SoftwareApplication` | "Worldwide" leaves out the Bangladesh block, U.S.-territory nationals and the PK/IN-only international routes |

### 2.3 Destinations and visa routes

| Fact | Status | Repo (file:line) | Live site | App (public) |
|---|---|---|---|---|
| U.S. visa types: B1/B2, F1, H1B, H4, J1, Family/Immigrant | confirmed | `lib/config/site.ts:74-81`; `content/visa-types/*.ts`; `lib/content/visa-types.ts:9` | `/visa-types` and `/visa-types/{b1-b2,f1,h1b,h4,j1,family-immigrant}` are all in the sitemap | `us_routes:["F1","B1/B2","H1B","H4","J1","Family"]` (bundle@191129 area). Labels at bundle@631391 |
| France, Italy, Germany: 6 categories each (Student, Skilled/employed work, Family reunion, Tourism, Business visit, Visit family/friends) | confirmed | `components/marketing/DestinationExplorer.tsx:5-9` | `/` (DestinationExplorer is server-rendered) | Route catalog (bundle@193114): `FR_*`, `IT_*`, `DE_*`, 6 each |
| UK: Student, Standard Visitor, Skilled Worker, Family reunion | confirmed | `DestinationExplorer.tsx:29` | `/` | `GB_VISITOR`, `GB_STUDENT`, `GB_WORK`, `GB_FAMILY` |
| "General Schengen" | partially_confirmed | `lib/config/offering.ts:8`; `app/visa-types/page.tsx:14` | `/visa-types` meta | `SCHENGEN_TOURISM`, `_BUSINESS`, `_FAMILY_VISIT` (3 categories only). The destination list also names **Spain, Netherlands and Switzerland** (bundle@415009). The site never names them |
| Document checking for **all** supported routes, including UK and Schengen | unverified | `lib/content/faq.ts:10`; `app/document-checks/page.tsx:40` | `/document-checks`, `/` | Bundle has UK student document fields (`GB_STUDENT`). Coverage on other routes is not verifiable |

### 2.4 Applicant countries

| Fact | Status | Repo (file:line) | Live site | App (public) |
|---|---|---|---|---|
| U.S. routes open to applicants worldwide through "Another country" plus their real nationality | partially_confirmed | `lib/config/product-scope.ts:4`; `lib/config/offering.ts:12` | 19 of 19 fetched pages contain "Another country" | `us_routes_open_to_all_nationalities:true`. Onboarding card "Another country / For U.S. visa preparation" (bundle@993915). Excluded: US, PR, GU, VI, AS and MP nationals. **Bangladesh is blocked** |
| India and Pakistan: U.S. plus international routes | confirmed | `lib/config/offering.ts:13-14`; `lib/content/practice-markets.ts` | `/visa-interview-practice/india`, `/visa-interview-practice/pakistan` | `applicant_countries:["PK","IN"]`. International routes allowed only for PK and IN |
| **Bangladesh: "choose Another country, select Bangladesh, use supported U.S. routes"** | **contradicted** | `components/marketing/LanguageWelcome.tsx:19`; `lib/config/offering.ts:15`; `content/blog/us-visa-interview-questions-bangladesh.mdx:18,83`; `app/blog/[slug]/page.tsx:87`; `app/blog/page.tsx:22` ("U.S. preparation available") | `/`, `/languages`, `/blog`, `/blog/us-visa-interview-questions-bangladesh` (all server-rendered) | `coming_soon_countries:["BD"]`. `te()` returns not allowed: "not yet available to applicants from Bangladesh. Bangladesh is coming soon." (bundle@192506). The app shell meta description instead says the product **helps Bangladesh** applicants |
| UK and European routes have country-specific eligibility | confirmed (vague) | `lib/config/product-scope.ts:5` | All main pages | Only PK and IN nationals (bundle@192902) |

### 2.5 Languages

| Fact | Status | Repo (file:line) | Live site | App (public) |
|---|---|---|---|---|
| U.S. interviews in English, Urdu, Hindi | confirmed (client) | `lib/config/site.ts:60-64`; `lib/config/product-scope.ts:2` | `/languages`, `/visa-types` | `de()` defaults to `["en","ur","hi"]` for U.S. routes (bundle@416040). Interview-language list is limited to en, ur and hi, then filtered by the server's `enabled_languages` (bundle@984793) |
| UK, France, Italy, Germany and Schengen interviews in English only | confirmed | `lib/config/product-scope.ts:2` | `/languages`, `/how-it-works` | All 25 international routes have `interview_languages:["en"]` (bundle@193114) |
| International preparation and explanation in English and Urdu | confirmed | `lib/config/product-scope.ts:3` | `/languages` | `explanation_languages:["en","ur"]` on every international route |
| U.S. preparation questions in English, Urdu, Hindi | partially_confirmed | `lib/config/product-scope.ts:3` | `/languages` | The prepared-question toggle offers en, ur and hi per route. The **feedback explanation** in Hindi is labelled "coming soon" in the app |
| Bengali interviews "coming soon" | confirmed | `lib/config/site.ts:64` | `/`, `/about`, `/languages`, Bangladesh blog post | Bengali appears in language lists only as "(coming soon)". It is not offered as an interview language |
| App interface only in English | confirmed | `app/languages/page.tsx:25` | `/languages` | "Saved preference; menus are currently in English" |
| Website language: English pages with short native-language intros. No hreflang beyond en, en-IN, en-PK and x-default | confirmed | `lib/content/practice-markets.ts:135-140` | Alternates on `/visa-interview-practice*` | n/a |

### 2.6 Platforms

| Fact | Status | Evidence |
|---|---|---|
| Web app live at app.visaprepper.com | confirmed | R `lib/config/site.ts:8`. A: HTTP 200 Vite SPA shell. JSON-LD `operatingSystem:"Web"` (`lib/seo/json-ld.tsx:54`) |
| Android and iOS apps "coming soon" | confirmed (as stated) | R `components/marketing/MobileApps.tsx:12-13,16-21,29` and `app/visa-interview-practice/[country]/page.tsx:102`. L: homepage, India and Pakistan pages |
| A Google Play listing for Visa Prepper exists | unverified (none found) | W 2026-11-21: three searches found no Visa Prepper or VisaPrepper Play listing, and no Play or App Store links in the site or app bundle. The lead's SERP showed a Google Play app "VisaPrepAI: US Visa Prep". WebSearch could not find it and its developer is **unknown**. If it belongs to the owner, it contradicts "coming soon". If not, it is a brand look-alike |

### 2.7 Social profiles (HTTP status only, 2026-11-21 11:02 UTC)

| Profile (from `lib/config/offering.ts:18-22`) | Result | Note |
|---|---|---|
| https://www.instagram.com/visaprepper/ | 200, no redirect | Instagram returns 200 for most handles, so the status alone proves nothing. The lead's SERP showed this profile |
| https://www.tiktok.com/@visaprepper | 200, no redirect | TikTok also returns 200 for unknown handles; existence is unconfirmed |
| https://www.facebook.com/visaprepper/ | **400** | Facebook commonly answers non-browser clients with 400; inconclusive |
| https://wa.me/17325188581 | 302 to api.whatsapp.com/send (200) | Whether the number is registered on WhatsApp cannot be seen from the status. `site.ts:83` says it has not been independently verified |

These three links also feed Organization `sameAs` (`lib/seo/json-ld.tsx:24`).

---

## 3. Conversion actions (exact destinations)

The live column shows which pages contain the anchor in server-rendered HTML, out of 19 fetched.

| # | Action / label | Destination (exact) | Where | Source | rel / intent | Measurable as organic conversion? |
|---|---|---|---|---|---|---|
| 1 | "Start Free" (header, desktop and mobile) | `https://app.visaprepper.com` | All 19 pages | `components/layout/SiteHeader.tsx:17,18,23`, through `CtaButton.tsx:6` | `noopener noreferrer`, `data-intent="free"` | **No**: no tracker, no UTM, Referer stripped |
| 2 | "Log In" | `https://app.visaprepper.com` (same URL as Start Free; the app has a `/login` route that is not used) | All 19 pages | `SiteHeader.tsx:17,22`; `lib/config/site.ts:9` | No `rel`, so the default policy sends the origin as referrer | No |
| 3 | "Check my documents free" (free document check) | `https://app.visaprepper.com` | 13 pages, including CTASection, hero and pricing card | `components/marketing/CTASection.tsx:23`; `app/page.tsx:59,107`; `Pricing.tsx:17`; `app/visa-interview-practice/page.tsx:47` | noreferrer, `data-intent="free"` | No |
| 4 | "Check my documents" | `https://app.visaprepper.com` | `/document-checks` | `app/document-checks/page.tsx:24` | noreferrer, free | No |
| 5 | "Explore interview practice" (start practicing) | `https://app.visaprepper.com` | `/` hero | `app/page.tsx:59` | noreferrer, `data-intent="paid"` | No |
| 6 | "Continue to the app · $44 package" (pricing and checkout intent) | `https://app.visaprepper.com` (not a checkout URL) | `/`, `/pricing` | `Pricing.tsx:26` | noreferrer, paid | No |
| 7 | "Explore UK / France / Italy / Germany routes in the app" | `https://app.visaprepper.com` | `/` | `DestinationExplorer.tsx:30,40,50,60` | noreferrer | No |
| 8 | Blog CTAs "Continue to the app for interview practice" and "check your documents free"; MDX `<AppCTA>` | `https://app.visaprepper.com` | 7 posts | `content/blog/{b1-b2-visa-interview-questions:154, f1-visa-interview-questions-and-answers:147, free-ai-visa-mock-interview-online:148, h1b-visa-interview-questions:130, h4-visa-interview-questions:118, j1-visa-interview-questions:154, mock-visa-interview-online:89}.mdx`; `components/blog/mdx-components.tsx:35` | Markdown link | No |
| 9 | "Continue to the app" on `/start` | `https://app.visaprepper.com` | `/start`: noindex, follow; not linked internally; not in sitemap | `app/start/page.tsx:6,14` | noreferrer | No |
| 10 | Pricing navigation ("See prices", "Six interviews for $44", "See the interview package") | `/#pricing`, `/pricing` | CTASection, visa-type pages, practice pages | `CTASection.tsx:25`; `app/visa-types/[slug]/page.tsx:36` | Internal | Page views only, and there is no analytics |
| 11 | Server checkout hand-off | `GET /api/checkout-entry` would 303 to `https://app.visaprepper.com/billing?package=complete-44-v1`. **Live: 503 JSON** | Nothing links to it | `app/api/checkout-entry/route.ts:5,7`; `lib/config/live-offering.ts:9,17` | n/a | Not in use. The app's checkout link is `/billing?package=launch` |
| 12 | WhatsApp: "Chat with us on WhatsApp" | `https://wa.me/17325188581` (`target=_blank`) | "WhatsApp help" dialog on every page, and `/contact` | `components/ui/WhatsAppButton.tsx:14`; `components/layout/WhatsAppHelp.tsx:12,17`; `app/contact/page.tsx:49` | noopener noreferrer | No |
| 13 | Phone | `tel:+17325188581` | Footer, all pages | `components/layout/SiteFooter.tsx:89` | none | No |
| 14 | Contact email | `mailto:hello@visaprepper.com` | Footer (all pages) and `/contact` | `SiteFooter.tsx:81`; `app/contact/page.tsx:37` | none | No |
| 15 | Partner application: "Apply to Become a Partner" and "Open the Partner Application Form" | `/partners/apply`. The form POSTs JSON to `/api/partners`; the server emails a Gmail inbox (`lib/partners/email.ts:6`) | `/` and `/partners` | `app/page.tsx:105`; `app/partners/page.tsx:5`; `components/partners/PartnerForm.tsx:26` | Internal | Only by counting received emails. Success is shown in-page (`PartnerForm.tsx:52`) with **no thank-you URL**, so a page-view goal would not work even with analytics |
| 16 | Social follow (Instagram, TikTok, Facebook) | URLs in §2.7 | Footer (all pages) and `/contact` | `SiteFooter.tsx:37`; `app/contact/page.tsx:55` | noopener noreferrer | No |
| 17 | Sample report (engagement) | `/#sample-report` | `/`, `/pricing`, CTAs | `Pricing.tsx:18`; `app/page.tsx:61` | Internal | No |

### Measurability summary

- **Marketing site, repo:**
  - `package.json` has no `@vercel/analytics`, `@vercel/speed-insights` or other tracking dependency.
  - `app/layout.tsx` loads only the Organization JSON-LD, the header, the footer and WhatsAppHelp.
  - Grepping `app`, `components`, `lib`, `content`, `public`, `scripts` and `next.config.ts` for gtag, googletagmanager, GA4, `G-xxxx`, `@vercel/analytics`, plausible, posthog, `fbq(`, connect.facebook.net, clarity, hotjar, umami, mixpanel, amplitude, fathom, `next/script` and dataLayer finds nothing. The only hit was the word "plausible" in blog prose.
  - The privacy page (`app/privacy/page.tsx`) does not mention cookies or analytics.
- **Marketing site, live:**
  - The same patterns find nothing in the 19 HTML pages or the 14 JS chunks.
  - `/_vercel/insights/script.js` returns 404, so Vercel Web Analytics is not served.
  - `/_vercel/speed-insights/script.js` returns 200 (application/javascript), so the project probably has Speed Insights enabled. No page references it, so no data is collected.
- **App:**
  - The shell has no tracking tags.
  - The bundle has no gtag, GA, GTM, PostHog init, Plausible, Meta pixel, `utm_` handling or `document.referrer` use.
  - "PostHog Cloud" appears only as a line in a sample admin cost table (bundle@682446).
- **Intent and source are lost at the hand-off.**
  - Free and paid CTAs share one URL, and the `data-intent` attribute is never read.
  - 12 of the 14 app links on the homepage carry `rel="noreferrer"`. Only the two "Log In" links do not.
  - So the app cannot tell an organic visitor from any other.
- **What is measurable today:** Google Search Console clicks and impressions only. Per `docs/seo-indexing-2026-10-19.md:5`, GSC was verified on 2026-10-19, but it is **not connected in this session**. App-side signups and purchases may exist in the app database, which is unknown and not accessible.

---

## 4. Public app pages (app.visaprepper.com)

| URL | HTTP | `<title>` | Meta description | robots meta | X-Robots-Tag | Visible without JavaScript |
|---|---|---|---|---|---|---|
| `/` | 200 (Vercel, `last-modified` 2026-11-19 16:38:17 GMT) | `VisaPrepper` | "VisaPrep helps applicants from Pakistan, India, and Bangladesh prepare for U.S. visa interviews through application-aware practice and feedback." `og:title` = "VisaPrep" | none | none | Nothing: an empty `<div id="root">` |
| `/login` | 200, identical bytes (same md5) | same | same | none | none | Nothing |
| `/robots.txt`, `/sitemap.xml`, `/documents`, `/signup`, `/billing`, `/api/public/offering` | 200, same 910-byte HTML shell | — | — | — | — | No real robots.txt or sitemap. All 8 probed paths return the same shell, a soft-404 pattern |

- The client router (from the bundle) defines: `/`, `/login`, `/signup`, `/reset-password`, `/setup`, `/start`, `/dashboard`, `/documents`, `/documents/reports/:id`, `/interview/*`, and other signed-in application routes (not listed here).
- Signup copy, rendered only by JavaScript: "Create your VisaPrepper account", "One free document check", "No credit card required", "Free interview preparation tips" (bundle@813239).
- The app was **not** rendered in a browser. The built-in browser uses a shared, persistent profile that could hold an owner session. What the app shows after JavaScript runs is inferred from bundle strings.

---

## 5. Discrepancies (site vs config vs app)

1. **Bangladesh access: site and repo say yes, app says no.** Repo and site: `LanguageWelcome.tsx:19`, `offering.ts:15`, `us-visa-interview-questions-bangladesh.mdx:18,83`, `app/blog/[slug]/page.tsx:87` and `app/blog/page.tsx:22` say Bangladeshi nationals can use U.S. routes and that the nationality is saved as Bangladesh. The app bundle (built 2026-11-19) blocks BD as "coming soon" for all routes (bundle@191129/@192506). Server-side behaviour is unknown.
2. **The app's meta description is off-brand and wrongly scoped.** It says "VisaPrep" (and `og:title` says "VisaPrep") instead of VisaPrepper. It describes the audience as Pakistan, India and Bangladesh, while the marketing site says U.S. applicants worldwide and the app blocks Bangladesh.
3. **The site's checkout hand-off does not match the app.**
   - Site offer id `complete-44-v1` (`offer.ts:3`, `live-offering.ts:9`); app package id `launch` (bundle@938309).
   - `getCheckoutReady()` fetches `app.visaprepper.com/api/public/offering`, which returns the HTML shell, so the gate can never pass.
   - Live `/api/checkout-entry` returns 503.
   - The route is not linked, so users are unaffected. But the copy "Live Stripe checkout is available in the app" (`document-checks/page.tsx:38`, `terms/page.tsx:55`) cannot be confirmed.
4. **Homepage hero says "select 'Other'"** (`app/page.tsx:58`). Every other page, and the app's onboarding card, says "Another country". The app's country dropdown does contain "Other country" (bundle `Bo` list), but the U.S.-for-all path uses "Another country".
5. **Stale comment in `site.ts:87`.** It says `/documents` and `/signup` return 404. Live, both return HTTP 200 with the SPA shell, and both exist as client routes. Any 404 would be client-side.
6. **JSON-LD claims are broader than the app allows.** Offer `eligibleRegion: Worldwide` and Service `areaServed: "Worldwide for supported U.S. visa routes"` (`json-ld.tsx:69`, `document-checks/page.tsx:20`, `visa-interview-practice/page.tsx:41`) leave out Bangladesh and U.S.-territory nationals. Offer `availability: InStock` (`json-ld.tsx:67`) stands while checkout readiness is unknown.
7. **"General Schengen" undersells the app.** The site's wording (`offering.ts:8`, `/visa-types` meta) hides that the app also lists Spain, Netherlands and Switzerland, and covers only 3 Schengen categories: tourism, business and family visit.
8. **"Hindi preparation" is described two ways.** The site says U.S. preparation questions are available in Hindi (`product-scope.ts:3`). App settings say "Hindi and Bengali preparation is coming soon" for the feedback-explanation language. It is ambiguous, not a hard contradiction.
9. **Hosting and brand-search observations from the lead's SERP check:**
   - A Google Play app "VisaPrepAI: US Visa Prep" ranks for "visaprepper"; it could not be found via WebSearch and its owner is unknown.
   - The app subdomain is fully crawlable: no robots rules, 200 on every path, the same title on every page. Whether Google has indexed it is **unknown** without GSC.
10. **Copy that is both visible and used as metadata.** `practice-markets.ts` `description` (lines 32 and 86) is the meta description for the India and Pakistan pages, and it is also **rendered visibly** on the `/visa-interview-practice` cards (`app/visa-interview-practice/page.tsx:63`). Changing it is not a metadata-only change.

---

## 6. Assumptions and limits

- The scratchpad clone at `99dac01` matches production. The live HTML matched the repo on every claim checked (titles, canonicals, copy).
- App-bundle strings reflect client configuration on 2026-11-19 (Last-Modified). Server config such as `enabled_languages`, `routeEnabled`, `checkoutReady`, package counts and prices may differ and was not checked.
- No sign-in, account creation, form submission or data entry anywhere. Only GETs. `/api/checkout-entry` is a public GET that sends no data.
- I went slightly beyond the "/ and /login only" example and probed six more app paths with plain GETs. All returned the identical public shell.
- Social-profile status codes do not prove a profile exists (Instagram and TikTok return 200 generically, and Facebook rejects curl with 400).
- WebSearch is a US-only index. Not finding a Play listing does not prove there is none.
- No search volumes, rankings or difficulty figures appear here; none were needed or invented.
- Untrusted content: none of the fetched pages, SERPs or the app bundle contained text addressed to the agent. The app bundle contains sample admin and dashboard data (fake users and costs); it was treated as data and its personal-looking sample values are not reproduced.
