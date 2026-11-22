# Metadata plan: titles, descriptions, structured data and indexing (2026-11-21)

**Site:** https://visaprepper.com. **Baseline:** production commit `99dac01` (branch `codex/marketing-readiness-2026-11-19`, deployed 2026-11-21). Every "current" value in this plan was read with `git show HEAD:<path>`, so it is the deployed text, not the clone's working tree.
**Companion file:** `metadata-plan.csv` in this folder, with one row per field (143 rows) and IDs M001-M121 (pages and posts), C01-C18 (code and config) and H01-H04 (hosting).
**Inputs:** `keyword-map.csv` and `keyword-clusters.md` (this folder), plus `url-inventory.csv`, `evidence/schema-brand.md` and `evidence/technical-findings.md` from the earlier steps.
**Owner constraints applied:** no visible content changes and no design changes. Every proposal is a title tag, a meta description, OG/Twitter values (which follow automatically), canonical, robots, sitemap or JSON-LD, or the metadata of a new blog post. **`visible_content_impact` is `false` on all 143 rows.** Nothing in the repo was edited by this step.
**Data limits:** Google Search Console is not connected, so rankings, clicks, impressions and the canonical Google selected are **unknown**. No paid keyword tools were used. The only search volumes quoted are the Semrush rows dated 2026-09-08 (pk, in and bd databases), as carried in `keyword-map.csv`.

## 1. Summary

- **57 field changes and 32 explicit keeps** across all 44 indexable URLs, plus `/start` (noindex, kept as is). That is 30 title changes and 27 description changes. Every indexable URL has a title row and a description row in the CSV.
- **P1, ship first:**
  - The homepage title and description (brand cluster), together with the two hosting fixes H01 and H02.
  - The `/document-checks` title and description, and the `/visa-interview-practice` description.
  - The `/visa-types/f1` and `/visa-types/b1-b2` titles and descriptions, and the `/visa-interview-practice/india` title.
  - New `seoDescription` fields for the P1 question guides (F1, B1/B2, H1B, H4, the documents checklist, any-country, India and Pakistan).
- **Strong titles kept:**
  - `/visa-interview-practice`, `/pricing` and `/about`.
  - The legal pages.
  - The H1B, H4, documents-checklist and Pakistan guides.
  - `/contact`, `/partners` and `/partners/apply` are kept for now: they are the only owned results on the brand SERP today (see 6.2).
- **Blog meta descriptions** use a new SEO-only frontmatter field, `seoDescription`. The visible `description` stays unchanged. This needs code changes C01 and C02 (two lines).
- **Structured data:** Article author linking and `@id`/`url`/`isPartOf`/`image` (C05, C06), a trailing slash on the Organization and SoftwareApplication `url` (C07), and a Service `@id` on `/document-checks` (C08). The brand name stays `VisaPrepper`, with alternateName `["Visa Prepper", "visaprepper.com"]` (C11).
- **Indexing:**
  - Remove the root canonical (C03).
  - Add preview-only robots directives (C04).
  - Leave the sitemap and robots.txt as they are, except one optional lastmod (C12).
  - No new noindex (C16).
  - The hosting duplicates (www 307, the vercel.app alias, `/index`) are owner actions H01-H03.

## 2. How this plan was verified

1. **Source of each string.** Each field was traced to the place it is read:
   - `app/**/page.tsx` metadata objects.
   - `content/visa-types/*.ts` `metaTitle`/`metaDescription`, read only in `app/visa-types/[slug]/page.tsx` `generateMetadata`.
   - `lib/content/practice-markets.ts` `title`, read only in `generateMetadata`.
   - Blog `seoTitle`, read only in `app/blog/[slug]/page.tsx` `generateMetadata`.

   Two fields are **visible** and were therefore not edited:
   - Blog frontmatter `description`, shown in `BlogPostHeader` and `BlogCard`.
   - `PRACTICE_MARKETS[*].description`, rendered on the `/visa-interview-practice` hub cards (`app/visa-interview-practice/page.tsx:63`).

   The CSV column `current_occurrences_in_source` counts each current string across app/components/lib/content. Every count above 1 was checked and is a substring of another metadata or title string, never visible JSX.
2. **Test build of the whole plan (2026-11-21).** HEAD was exported to a throwaway folder (`scratchpad/out/plan-verify/`, not the repo), and every change row plus code changes C01-C08 and C17 was applied there.
   - `npm test`: **34/34 pass**. This covers the repo's own rules: visa-type `metaTitle` under 60 characters and `metaDescription` under 180; listed `seoTitle`s under 65; brand entities still `VisaPrepper` with the same alternates and a plain-string logo.
   - `next build`: OK.
   - `scripts/verify-site.mjs` against the local build: **PASS**. All 44 pages return 200, titles and descriptions are unique, canonicals equal the URL, there is no noindex, and the updated homepage title assertion holds.
   - **The visible `<body>` markup, with scripts removed, is byte-identical on 46 of 46 prerendered HTML files** compared with a build of unmodified HEAD.
   - The claude-seo `validate-schema.py` hook returned exit 0 with no warnings on `/`, `/document-checks`, `/visa-types/f1`, `/visa-interview-practice/india` and two blog posts.
   - With the local server running: `/start` still renders `noindex, follow`, and a 404 renders `noindex` with no canonical.
   - Google Fonts could not be fetched in the sandbox, so `lib/fonts.ts` was replaced with a stub **in the throwaway copy only**. Fonts do not affect metadata.
3. **Accuracy of descriptions.** Each new description names only things the page body or visible copy contains. Example: the documents-checklist description lists passport, DS-160 confirmation, fee receipt, photo and Form I-20, which the body names. It does **not** list DS-2019 or I-797, which keyword-clusters.md suggested but the body does not mention. No description promises approval or a free interview. Product facts match `lib/config/offer.ts`: the free plan is 1 document check and 0 interviews; the $44 USD package is 6 interviews and 10 checks over 90 days.

## 3. Pages and posts

Rendered title = source value + ` | VisaPrepper` (`app/layout.tsx` template). The homepage uses `title.absolute`. OG title, Twitter title and og:image alt reuse the source title through `buildPageMetadata`. og:description and twitter:description reuse the meta description. So **no separate OG/Twitter edits are needed**: they follow each row. Full rationales are in the CSV `rationale` column, and the main ones are repeated under each table.

### 3.1 Static pages (`app/**/page.tsx`)

| URL | Current title source value | Proposed rendered title (chars) | Proposed meta description (chars) | Cluster / P | IDs |
|---|---|---|---|---|---|
| `/` | VisaPrepper \| U.S. Visa Interview Practice & Document Checks | **VisaPrepper (Visa Prepper): AI U.S. Visa Interview Practice** (59) | **VisaPrepper: AI video mock interviews built on your U.S. visa application, plus document checks. One free check for eligible users; $44 for 6 interviews.** (153) | BR / P1 | M001, M002 |
| `/about` | About the AI Visa Interview Practice App | **keep** (54) | keep (150) | (supports BR) / - | M003, M004 |
| `/blog` | U.S. Visa Interview Preparation Guides & Practice Plans | **U.S. Visa Interview Guides & Practice Plans \| VisaPrepper** (57) | keep (153) | (hub; supports G-PREP) / P3 | M005, M006 |
| `/contact` | Contact Visa Prepper | **keep (deferred)** (34) | **Contact the VisaPrepper team by email or WhatsApp for help choosing a package, using your account or billing. Use the secure app for visa documents.** (148) | (supports BR) / P3 | M007, M008 |
| `/document-checks` | Visa Application & Document Consistency Checks | **Visa Document Check: DS-160 Consistency Review \| VisaPrepper** (60) | **Compare your DS-160 or DS-260 PDF with supporting documents to find missing, unclear or conflicting details. One free document check for eligible users.** (152) | PR-DOC / P1 | M009, M010 |
| `/features` | Visa Interview Practice & Document Checks | **What You Get: AI Interviews & Document Checks \| VisaPrepper** (59) | keep (136) | (support page) / P3 | M011, M012 |
| `/how-it-works` | How VisaPrepper Interview Practice Works | **How AI Visa Interview Practice Works \| VisaPrepper** (50) | keep (145) | (support page) / P3 | M013, M014 |
| `/languages` | Visa Interview Preparation Languages | **U.S. Visa Interview Practice in Urdu & Hindi \| VisaPrepper** (58) | keep (158) | LANG-HIUR (support) / P2 | M015, M016 |
| `/partners` | Visa Prepper Partner Program | **keep (deferred)** (42) | **Help visa applicants prepare. Consultants, education advisers, travel businesses and creators can apply to the VisaPrepper partner program.** (139) | (supports BR) / P3 | M017, M018 |
| `/partners/apply` | Apply to the Visa Prepper Partner Program | **keep (deferred)** (55) | keep (139) | (utility) / - | M019, M020 |
| `/pricing` | Pricing: Six Interviews for $44 USD | **keep** (49) | keep (133) | (support page) / - | M021, M022 |
| `/privacy` | Privacy Policy | **keep** (28) | **How VisaPrepper collects, uses, and protects your information, including application details and practice interview records.** (124) | (legal) / P3 | M023, M024 |
| `/refund-policy` | Refund Policy | **keep** (27) | **VisaPrepper refunds apply to verified service or billing failures. Read eligibility, exclusions and how to request help with a purchase.** (136) | (legal) / P3 | M025, M026 |
| `/terms` | Terms of Service | **keep** (30) | **The terms for using the VisaPrepper website and practice interview platform: purchases, free access, refunds, acceptable use, disclaimers and liability.** (152) | (legal) / P3 | M027, M028 |
| `/start` | Start your preparation | **keep** (36) | - | (utility; noindex) / - | M029 |
| `/visa-interview-practice` | AI Visa Mock Interview & Simulator | **keep** (48) | **AI video visa mock interview built on your own application, with follow-up questions and answer feedback. One free document check; 6 interviews for $44.** (152) | PR-AI / P1 | M030, M031 |
| `/visa-types` | Visa Interview Practice by Visa Type | **keep** (50) | **Practice B1/B2, F1, H1B, H4, J1 and family immigrant visa interviews for the U.S., plus supported UK, France, Italy, Germany and Schengen routes.** (145) | S-UKEU / P3 | M036, M037 |

- **M001** `/` title: Brand cluster BR (P1). On 2026-11-21 the homepage was missing from page-1 web results for 'visaprepper' (gl=us/in/pk/ng); Google auto-corrects to 'visa prepper' in gl=in and rewrote the homepage title link to 'Visa Prepper'. Keeps the preferred name 'VisaPrepper' first (matches og:site_name and WebSite.name per evidence/schema-brand.md) and adds the spaced form, which the visible copy already uses ('VisaPrepper, also written Visa Prepper'). 'AI' covers 'visa prepper ai'. Document checks move to the description (/document-checks owns that cluster). Diverges from the technical audit's 'keep until GSC': the homepage holds no page-1 brand position to lose. Ship in the same deploy as the hosting fixes. Requires updating scripts/verify-site.mjs:59.
- **M002** `/` description: Brand-first snippet for navigational queries, then both products and the real offer. Facts match visible hero copy ('One free document check for eligible users. The $44 USD one-time package includes 6 interviews and 10 document checks'). No free-interview or approval claim.
- **M005** `/blog` title: Rendered title is 69 chars today (truncation, TECH-08). Dropping 'Preparation' also stops the index page competing with /blog/us-visa-interview-preparation-any-country, the G-PREP target for 'us visa interview preparation'.
- **M008** `/contact` description: Brand spelling consistency (evidence/schema-brand.md E4, description half). Drops 'press inquiries', which the page does not mention; adds the two channels shown on the page (email, WhatsApp) and its 'use the secure app for documents' instruction.
- **M009** `/document-checks` title: PR-DOC (P1): front-loads 'visa document check' and adds 'DS-160 ... review' (both P1 rows). Avoids 'DS-160 checker', which meant CEAC status lookup on the 2026-11-21 SERP. Stays distinct from the blog post (moved to 'DS-160 Mistakes ...').
- **M010** `/document-checks` description: Current is 171 chars (TECH-09). New text names what is compared, matches visible scope ('U.S. Checks review one DS-160 or DS-260 application PDF'; 'Eligible users receive one free document check') and makes no certification claim.
- **M011** `/features` title: Cannibalization flag #4: 'Visa Interview Practice & Document Checks' repeats the commercial head owned by /visa-interview-practice. New title matches the page's breadcrumb/eyebrow 'What you get'. /features appears on the brand SERP; the brand suffix is unchanged, so risk is low.
- **M013** `/how-it-works` title: Removes the doubled brand ('How VisaPrepper ... | VisaPrepper', evidence/schema-brand.md E7) and adds 'AI visa interview practice'.
- **M015** `/languages` title: Supports LANG-HIUR (P2): names the two differentiating languages (U.S. interviews support English, Urdu and Hindi). Product/practice wording keeps it distinct from the planned NEW post 'US Visa Interview Questions in Hindi and Urdu'.
- **M018** `/partners` description: Brand spelling consistency (evidence/schema-brand.md E5, description half). No commission promise in the snippet; the page itself says 'eligible paid referrals'.
- **M024** `/privacy` description: Brand spelling only (evidence/schema-brand.md E8).
- **M026** `/refund-policy` description: Brand spelling only (evidence/schema-brand.md E8).
- **M028** `/terms` description: Brand spelling (evidence/schema-brand.md E8) and a more useful 91 -> ~150 char snippet listing the page's own H2 topics (New purchases and free access, Refunds, Acceptable use, Disclaimers, Limitation of liability).
- **M031** `/visa-interview-practice` description: PR-AI (P1): adds 'AI video' and the real offer so the snippet answers 'is it free?' honestly (free = 1 document check; interviews are in the $44 package, as the page's own FAQ says).
- **M037** `/visa-types` description: Names the six U.S. visa types the page links to (the page's main job) and keeps UK/EU as 'supported ... routes' so it does not imply worldwide UK/EU eligibility (the app limits those to PK/IN applicants).

### 3.2 Applicant-country practice pages (`lib/content/practice-markets.ts`)

| URL | Current title source value | Proposed rendered title (chars) | Proposed meta description (chars) | Cluster / P | IDs |
|---|---|---|---|---|---|
| `/visa-interview-practice/india` | Visa Interview Practice in India | **U.S. Visa Interview Practice in India \| VisaPrepper** (51) | keep (154) | C-INPR / P1 | M032, M033 |
| `/visa-interview-practice/pakistan` | Visa Interview Practice in Pakistan | **U.S. Visa Interview Practice in Pakistan \| VisaPrepper** (54) | keep (157) | (supports C-PK, LANG-HIUR) / P2 | M034, M035 |

- **M032** `/visa-interview-practice/india` PRACTICE_MARKETS[india].title: C-INPR (P1): adds 'U.S.' to match the primary query 'us visa interview preparation india'; 51 chars rendered. keyword-clusters.md suggested 'Visa Interview Practice in India (English, Hindi, Urdu)', which renders at 69 chars; the languages already lead the meta description and the eyebrow.
- **M034** `/visa-interview-practice/pakistan` PRACTICE_MARKETS[pakistan].title: Parallel to India for consistency; adds 'U.S.'; 54 chars rendered. Not a primary cluster target, so no stronger change.

`market.description` stays as it is (rows M033, M035). It is visible on the hub page, and it is already accurate at 154 and 157 characters. If it ever needs to change, add an optional `metaDescription` to the `PracticeMarket` type that only `generateMetadata` reads. The hreflang cluster (en, en-IN, en-PK, x-default) is unchanged.

### 3.3 Visa-type pages (`content/visa-types/*.ts`)

| URL | Current title source value | Proposed rendered title (chars) | Proposed meta description (chars) | Cluster / P | IDs |
|---|---|---|---|---|---|
| `/visa-types/b1-b2` | B1/B2 Visa Mock Interview Practice | **B1/B2 Tourist Visa Mock Interview (AI Video) \| VisaPrepper** (58) | **AI video B1/B2 mock interview built on your own trip: purpose, who pays, itinerary and plans afterward, with follow-up questions. For applicants worldwide.** (155) | PR-B1B2MOCK / P1 | M038, M039 |
| `/visa-types/f1` | F1 Visa Mock Interview Practice | **F1 Visa Mock Interview Online (AI Video) \| VisaPrepper** (54) | **AI video F1 mock interview built on your application: university choice, study funding and plans after graduation, with follow-up questions. Worldwide.** (151) | PR-F1MOCK / P1 | M040, M041 |
| `/visa-types/h1b` | H1B Visa Interview Practice | **H1B Visa Mock Interview Practice (AI Video) \| VisaPrepper** (57) | keep (141) | PR-H1BMOCK / P2 | M042, M043 |
| `/visa-types/h4` | H4 Visa Interview Practice | **H4 Visa Mock Interview Practice (AI Video) \| VisaPrepper** (56) | keep (154) | PR-H4MOCK / P3 | M044, M045 |
| `/visa-types/j1` | J1 Visa Interview Practice | **J1 Visa Mock Interview Practice (AI Video) \| VisaPrepper** (56) | keep (148) | PR-J1MOCK / P3 | M046, M047 |
| `/visa-types/family-immigrant` | Family Visa Interview Practice | **Family Immigrant Visa Mock Interview Practice \| VisaPrepper** (59) | **Practice your family immigrant visa interview as a spouse, parent, child or sibling: relationship history, petitioner and case details in your own words.** (153) | PR-FAMMOCK / P3 | M048, M049 |

- **M038** `/visa-types/b1-b2` metaTitle: PR-B1B2MOCK (P1): keeps 'B1/B2 ... Mock Interview' and adds 'Tourist' (P2 'us tourist visa mock interview') and the format. Google still showed a retired 'in Pakistan' title on 2026-11-21, so a fresh title also prompts a rewrite.
- **M039** `/visa-types/b1-b2` metaDescription: Current 159 chars has no format or 'mock interview' wording; new text names AI video and the page's topics (purpose, who is paying, itinerary, return plans).
- **M040** `/visa-types/f1` metaTitle: PR-F1MOCK (P1): exact primary 'f1 visa mock interview online' plus 'AI' ('ai f1 visa interview'). The 7-day blog post moves off this head (see its seoTitle row).
- **M041** `/visa-types/f1` metaDescription: Adds 'mock interview' and 'AI video' to the current topics (university, funding, after graduation).
- **M042** `/visa-types/h1b` metaTitle: PR-H1BMOCK (P2): adds 'Mock' and the format; keeps 'questions' wording for the blog guide (/blog/h1b-visa-interview-questions).
- **M044** `/visa-types/h4` metaTitle: PR-H4MOCK (P3): same pattern as H1B.
- **M046** `/visa-types/j1` metaTitle: PR-J1MOCK (P3): same pattern as H1B.
- **M048** `/visa-types/family-immigrant` metaTitle: PR-FAMMOCK (P3): 'Family Immigrant Visa' is clearer than 'Family Visa' (which can mean a family visitor trip); adds 'Mock'. 59 chars rendered.
- **M049** `/visa-types/family-immigrant` metaDescription: Names the four relationship cases the page covers (whoItsFor/intro: spouse, parent, child, sibling).

### 3.4 Existing blog posts (`content/blog/*.mdx` frontmatter)

`seoTitle` is an existing metadata-only field. `seoDescription` is new (C01, C02). If a post has no `seoDescription`, the visible `description` stays its meta description.

| URL | Current title source value | Proposed rendered title (chars) | Proposed meta description (chars) | Cluster / P | IDs |
|---|---|---|---|---|---|
| `/blog/214b-visa-refusal-guide` | 214(b) Visa Refusal: Preparing for Your Next Interview | **214(b) Visa Refusal: How to Prepare to Reapply \| VisaPrepper** (60) | **What a 214(b) refusal means, how it differs from 221(g), and how to review your real facts and practice before you reapply. No outcome guarantees.** (146) | G-214B / P2 | M050, M051 |
| `/blog/b1-b2-visa-interview-questions` | B1/B2 Visa Interview Questions for Visitors | **B1/B2 US Tourist Visa Interview Questions \| VisaPrepper** (55) | **Practice B1/B2 visa interview questions on trip purpose, who pays, ties to home, travel history and business visits, using your own facts, not a script.** (152) | Q-B1B2 / P1 | M052, M053 |
| `/blog/b1-b2-visa-mock-interview-scenarios` | B1/B2 Visa Mock Interview: Follow-Up Practice | **B1/B2 Mock Interview Scenarios and Follow-Ups \| VisaPrepper** (59) | **Three B1/B2 mock interview scenarios (tourism, family visit, business trip) with realistic follow-up questions to rehearse aloud using your real facts.** (151) | PR-B1B2SCEN / P3 | M054, M055 |
| `/blog/best-ai-visa-interview-tools` | AI Visa Interview Tools: A Practical Comparison | **AI Visa Interview Practice Tools Compared \| VisaPrepper** (55) | keep (149) | PR-COMP / P2 | M056, M057 |
| `/blog/ds-160-interview-consistency` | (none; <title> falls back to visible title: DS-160 Form and Confirmation Page: Before Your Interview) | **DS-160 Mistakes to Check Before Your Interview \| VisaPrepper** (60) | **Check your DS-160 before a U.S. visa interview: confirmation page vs appointment, names, funding, dates, travel history and answers an agent entered.** (149) | G-DS160 / P2 | M058, M059 |
| `/blog/f1-visa-interview-questions-and-answers` | F1 Visa Interview Questions & Practice | **F1 Student Visa Interview Questions & Tips \| VisaPrepper** (56) | **Practice F1 visa interview questions on your university, sponsor, funding, academics and plans after study, with honest answers that hold up to follow-ups.** (155) | Q-F1 / P1 | M060, M061 |
| `/blog/f1-visa-interview-who-will-pay` | (none; <title> falls back to visible title: Who Will Pay for Your Studies? F1 Interview Practice) | **F1 Interview: Who Will Pay for Your Studies? \| VisaPrepper** (58) | **Prepare a truthful answer to the F1 question 'Who will pay for your studies?' Organize sponsor, savings, loan and scholarship details by cost and currency.** (155) | Q-F1PAY / P2 | M062, M063 |
| `/blog/f1-visa-mock-interview-online-7-day-plan` | F1 Visa Mock Interview Online: 7-Day Practice Plan | **F1 Visa Interview Prep: A 7-Day Practice Plan \| VisaPrepper** (59) | keep (156) | Q-F1PREP / P2 | M064, M065 |
| `/blog/free-ai-visa-mock-interview-online` | Free Visa Mock Interview Options: What’s Included | **Free Visa Mock Interview Online: What You Get \| VisaPrepper** (59) | **Free visa mock interview options compared: question lists, AI samples and voice trials. VisaPrepper's free plan is one document check, not an interview.** (152) | PR-FREE / P2 | M066, M067 |
| `/blog/h1b-visa-interview-questions` | H1B Visa Interview Questions & Preparation | **keep** (56) | **Practice H1B visa interview questions on your role, employer, worksite, client placement, salary and petition, and explain your actual job clearly.** (147) | Q-H1B / P1 | M068, M069 |
| `/blog/h4-visa-interview-questions` | H4 Visa Interview Questions & Preparation | **keep** (55) | **Practice H4 visa interview questions on your marriage, your spouse's H1B job and status, children applying with you, U.S. plans and documents to review.** (152) | Q-H4 / P1 | M070, M071 |
| `/blog/j1-visa-interview-questions` | J1 Visa Interview Questions & Preparation | **J1 Visa Interview Questions by Program Type \| VisaPrepper** (57) | **J1 visa interview questions for students, scholars, interns, au pairs and work-and-travel: sponsor, DS-2019, funding, home ties and the two-year rule.** (150) | Q-J1 / P2 | M072, M073 |
| `/blog/mock-visa-interview-online` | (none; <title> falls back to visible title: Online Visa Interview Practice: How to Prepare Your Own Answers) | **Online Visa Interview Practice: Which Format? \| VisaPrepper** (59) | keep (153) | PR-MOCKINFO / P2 | M074, M075 |
| `/blog/us-visa-interview-documents-checklist` | US Visa Interview Documents Checklist | **keep** (51) | **Organize US visa interview documents by case: passport, DS-160 confirmation, fee receipt, photo, I-20 for students, plus visitor and work records.** (146) | G-DOCS / P1 | M076, M077 |
| `/blog/us-visa-interview-preparation-any-country` | U.S. Visa Interview Prep: What Changes by Embassy? | **US Visa Interview Preparation From Any Country \| VisaPrepper** (60) | **Preparing for a U.S. visa interview from any country? Check where to apply, DS-160 vs DS-260, local appointment rules and what stays the same everywhere.** (153) | G-PREP / C-OTHER / P1 | M078, M079 |
| `/blog/us-visa-interview-questions-bangladesh` | (none; <title> falls back to visible title: US Visa Interview Questions in Bangladesh: F1 and Visitors) | **US Visa Interview Questions in Bangladesh \| VisaPrepper** (55) | **Practice U.S. F1 and visitor visa interview questions from Bangladesh: family funding in BDT and USD, scholarships, Dhaka appointments and name checks.** (151) | C-BD / P3 | M080, M081 |
| `/blog/us-visa-interview-questions-india` | US Visa Interview Questions in India | **US Visa Interview Questions in India (F1, H1B) \| VisaPrepper** (60) | **Practice US visa interview questions in India: F1 education loans, H1B job and client-site details, parents visiting family, and appointment checks.** (148) | C-IN / P1 | M082, M083 |
| `/blog/us-visa-interview-questions-pakistan` | US Visa Interview Questions in Pakistan | **keep** (53) | **Practice US visa interview questions in Pakistan for B1/B2 family visits and F1 study: PKR/USD funding, DS-160s filled by someone else, Urdu practice.** (150) | C-PK / P1 | M084, M085 |
| `/blog/visa-interview-follow-up-questions` | (none; <title> falls back to visible title: Visa Interview Follow-Up Questions: How to Practice) | **Visa Interview Follow-Up Questions & Examples \| VisaPrepper** (59) | keep (156) | G-FOLLOW / P3 | M086, M087 |
| `/blog/visa-interview-nervous-forget-answer` | Nervous About Your Visa Interview? How to Practice | **Nervous About Your Visa Interview? 5 Steps \| VisaPrepper** (56) | keep (154) | G-NERV / P3 | M088, M089 |

- **M050** `/blog/214b-visa-refusal-guide` seoTitle: G-214B (P2): 'reapply' matches the dominant follow-up intent; rendered 68 -> 60 chars (TECH-08). Test requires seoTitle < 65.
- **M051** `/blog/214b-visa-refusal-guide` seoDescription: Search snippet mirrors the body's sections (214(b) vs 221(g), separating known facts from guesses, practice) and keeps the no-guarantee note.
- **M052** `/blog/b1-b2-visa-interview-questions` seoTitle: Q-B1B2 (P1): adds 'US Tourist Visa Interview Questions' (Semrush in: 320, 2026-09-08) beside 'B1/B2 visa interview questions'; mirrors the visible H1. 'for Visitors' dropped; the NEW parents post will own 'for parents'.
- **M053** `/blog/b1-b2-visa-interview-questions` seoDescription: Topics are the post's H3s (Purpose, Finances, Ties to home, Travel history, Business travel).
- **M054** `/blog/b1-b2-visa-mock-interview-scenarios` seoTitle: Cannibalization flag #3: moves the post off the 'B1/B2 Visa Mock Interview' head owned by /visa-types/b1-b2 and onto its own 'scenarios' intent.
- **M055** `/blog/b1-b2-visa-mock-interview-scenarios` seoDescription: Visible description is 158 chars; snippet names the three scenarios (H2s 'Scenario 1-3').
- **M056** `/blog/best-ai-visa-interview-tools` seoTitle: PR-COMP (P2): rendered 61 -> 55 chars; 'Practice Tools Compared' fits 'best ai visa interview app/tool' without a best-product claim (the post is a disclosed comparison). Test requires < 65.
- **M058** `/blog/ds-160-interview-consistency` seoTitle: G-DS160 (P2): no seoTitle today, so the 70-char H1 is used. 'DS-160 mistakes' is the cluster's lead row and stays distinct from /document-checks ('DS-160 consistency review'). 60 chars rendered.
- **M059** `/blog/ds-160-interview-consistency` seoDescription: Visible description limits scope to 'Pakistan, India or Bangladesh'; the snippet uses the worldwide framing and the post's six review items.
- **M060** `/blog/f1-visa-interview-questions-and-answers` seoTitle: Q-F1 (P1): covers 'f1 student visa interview questions' (Semrush in: 480), 'f1 visa interview questions' (bd: 30) and 'f1 visa interview tips' in 56 rendered chars. Keeps this the only title leading with 'F1 ... Interview Questions'.
- **M061** `/blog/f1-visa-interview-questions-and-answers` seoDescription: Visible description is 159 chars; snippet lists the post's H3 topics.
- **M062** `/blog/f1-visa-interview-who-will-pay` seoTitle: Q-F1PAY (P2): no seoTitle today (66 rendered); 'F1 Interview' first front-loads the cluster query; 58 rendered.
- **M063** `/blog/f1-visa-interview-who-will-pay` seoDescription: Visible description is 161 chars and limited to 'South Asian students'; snippet matches the body's sections (parent/relative, loan, scholarship, several sources, currency labels).
- **M064** `/blog/f1-visa-mock-interview-online-7-day-plan` seoTitle: Cannibalization flag #2: 'F1 Visa Mock Interview Online' competes with /visa-types/f1. New title targets the cluster's preparation intent; 59 rendered (64 today).
- **M066** `/blog/free-ai-visa-mock-interview-online` seoTitle: PR-FREE (P2): exact 'visa mock interview online free' order; mirrors the visible H1 ('Free AI Visa Mock Interview Online: What Do You Actually Get?'); 59 rendered. Never promises a free interview.
- **M067** `/blog/free-ai-visa-mock-interview-online` seoDescription: Because the title says 'free', the snippet states plainly that the VisaPrepper free plan is one document check and no interview (matches the body section 'What Visa Prepper includes for free').
- **M069** `/blog/h1b-visa-interview-questions` seoDescription: Adds the exact head phrase and the post's H3 topics (role, employer and worksite, third-party/client placements, salary and LCA, petition).
- **M071** `/blog/h4-visa-interview-questions` seoDescription: Visible description is 165 chars (TECH-09 truncation); snippet lists the post's H3s (relationship, principal's status, U.S. plans, children, documents).
- **M072** `/blog/j1-visa-interview-questions` seoTitle: Q-J1 (P2): 'by Program Type' reflects the post's structure and serves 'j1 visa interview questions for teachers / hotel management' long-tail; 57 rendered.
- **M073** `/blog/j1-visa-interview-questions` seoDescription: Snippet names the categories (H3s) and DS-2019 / two-year home residency, which the body covers.
- **M074** `/blog/mock-visa-interview-online` seoTitle: PR-MOCKINFO (P2): no seoTitle today (77 rendered, the longest on the site). New title keeps the informational 'which format' angle and leaves commercial heads to /visa-interview-practice; 59 rendered.
- **M077** `/blog/us-visa-interview-documents-checklist` seoDescription: Snippet names concrete items for 'documents required for us visa interview' (Semrush in: 720). Only items the body names are listed (passport, DS-160 confirmation, fee receipt, photo, Form I-20); DS-2019 and I-797 are NOT named in the body, so they are left out.
- **M078** `/blog/us-visa-interview-preparation-any-country` seoTitle: G-PREP (P1): front-loads the head term 'us visa interview preparation' and mirrors the visible H1; 60 rendered (64 today).
- **M079** `/blog/us-visa-interview-preparation-any-country` seoDescription: Visible description is 167 chars (TECH-09); snippet follows the H2s (where to apply, what stays consistent, what to check locally, DS-160 not universal).
- **M080** `/blog/us-visa-interview-questions-bangladesh` seoTitle: C-BD (P3): no seoTitle today (72 rendered); matches sibling India/Pakistan pattern; 55 rendered. Owner alert stays open: the app blocked Bangladesh nationals in the 2026-11-19 build.
- **M081** `/blog/us-visa-interview-questions-bangladesh` seoDescription: Visible description is 160 chars; snippet matches the H2s and does not promise app access.
- **M082** `/blog/us-visa-interview-questions-india` seoTitle: C-IN (P1): adds the two visa types Indian searchers pair with the query (visible H1 'F1, H1B and Visitors'); 60 rendered.
- **M083** `/blog/us-visa-interview-questions-india` seoDescription: Adds the exact query phrase and the post's H2 topics (education loans, H1B, parents/family visits, documents and appointments).
- **M085** `/blog/us-visa-interview-questions-pakistan` seoDescription: Adds the exact query phrase and the H2s (visitor family visits, F1 funding, 'If someone else filled in your DS-160', English or Urdu practice).
- **M086** `/blog/visa-interview-follow-up-questions` seoTitle: G-FOLLOW (P3): no seoTitle today (65 rendered); 'Examples' reflects the three worked examples; 59 rendered. Visible description already says 'after your first ... answer', which keeps post-interview status searchers from being misled.
- **M088** `/blog/visa-interview-nervous-forget-answer` seoTitle: G-NERV (P3): the body has a numbered 5-step routine; 56 rendered (64 today). Test requires < 65.

Visible descriptions (for reference; none of them is edited):

| URL | Visible `description` today (unchanged; chars) | Note |
|---|---|---|
| `/blog/214b-visa-refusal-guide` | Understand a 214(b) refusal, distinguish it from 221(g), and prepare your real facts before reapplying. No approval prediction or guaranteed outcome. (149) | replaced in search snippet by new seoDescription |
| `/blog/b1-b2-visa-interview-questions` | Practice B1/B2 answers for tourism, family visits and business trips. Clarify purpose, costs and plans afterward using your actual application. (143) | replaced in search snippet by new seoDescription |
| `/blog/b1-b2-visa-mock-interview-scenarios` | Rehearse B1/B2 visitor, family-visit and business-trip scenarios. Check your facts, answer aloud and practice realistic follow-ups without memorizing scripts. (158) | replaced in search snippet by new seoDescription |
| `/blog/best-ai-visa-interview-tools` | Compare VisaPrepper, Permito, VisaInterview.ai, VisaMind, VisaIsle and Visaz using public features, document workflows, trial allowances and pricing. (149) | kept as the meta description |
| `/blog/ds-160-interview-consistency` | Review your DS-160 form before a U.S. visa interview in Pakistan, India or Bangladesh. Check the confirmation page, funding, dates and answers an agent entered. (160) | replaced in search snippet by new seoDescription |
| `/blog/f1-visa-interview-questions-and-answers` | Practice F1 visa interview questions using your real university, funding and study plans. Understand common topics, avoid scripts and prepare specific answers. (159) | replaced in search snippet by new seoDescription |
| `/blog/f1-visa-interview-who-will-pay` | Prepare a truthful F1 visa interview answer about your sponsor, family savings, education loan or scholarship. Simple funding exercises for South Asian students. (161) | replaced in search snippet by new seoDescription |
| `/blog/f1-visa-mock-interview-online-7-day-plan` | Turn your F-1 documents into a seven-day spoken practice routine: course choice, funding, realistic follow-ups, timed mock interviews and a final checklist. (156) | kept as the meta description |
| `/blog/free-ai-visa-mock-interview-online` | Compare free question guides, AI samples and document checks. Learn what VisaPrepper includes free and what the $44 interview package adds. (139) | replaced in search snippet by new seoDescription |
| `/blog/h1b-visa-interview-questions` | Prepare H1B interview answers about your petition, employer, role and qualifications. Review work locations and practice explaining your actual job clearly. (156) | replaced in search snippet by new seoDescription |
| `/blog/h4-visa-interview-questions` | Prepare H4 interview answers about your relationship, your spouse’s status and supporting documents. Review your actual details and practice consistent explanations. (165) | replaced in search snippet by new seoDescription |
| `/blog/j1-visa-interview-questions` | Prepare J1 interview answers about your exchange program, sponsor, funding and plans afterward. Practice using your actual DS-2019 and program details. (151) | replaced in search snippet by new seoDescription |
| `/blog/mock-visa-interview-online` | Compare question lists, spoken practice and adaptive AI visa mock interviews. Learn how your application details can make follow-up practice more useful. (153) | kept as the meta description |
| `/blog/us-visa-interview-documents-checklist` | Organize U.S. visa interview documents by category. Separate official requirements from optional consistency checks and prepare the right supporting records. (157) | replaced in search snippet by new seoDescription |
| `/blog/us-visa-interview-preparation-any-country` | Separate general U.S. interview preparation from local embassy procedures. Understand nationality, residence, application location, forms and appointment instructions. (167) | replaced in search snippet by new seoDescription |
| `/blog/us-visa-interview-questions-bangladesh` | Prepare for a U.S. visa interview from Bangladesh with student and visitor questions, funding exercises, document checks and a Dhaka appointment planning guide. (160) | replaced in search snippet by new seoDescription |
| `/blog/us-visa-interview-questions-india` | U.S. visa interview preparation for Indian applicants: student funding, education loans, H1B work details, family visits and documents to review. (145) | replaced in search snippet by new seoDescription |
| `/blog/us-visa-interview-questions-pakistan` | Prepare U.S. visa interview answers about your trip, study plans and funding. English and Urdu exercises, official links and application-based next steps. (154) | replaced in search snippet by new seoDescription |
| `/blog/visa-interview-follow-up-questions` | Prepare for questions that come after your first visa interview answer. Try student, visitor and work examples using your own facts, not a memorized script. (156) | kept as the meta description |
| `/blog/visa-interview-nervous-forget-answer` | A practical routine for nervous visa applicants: separate missing facts from hard-to-explain answers, practice follow-ups and choose one useful next step. (154) | kept as the meta description |

### 3.5 New blog posts (metadata only)

From the keyword-clusters.md plan. **Six of these posts appeared as untracked drafts in the clone's working tree while this plan was being written.** Another workflow step created them; this step did not create or edit them. Their `seoTitle` values already match the planned titles. Their `seoDescription`s are 146-155 characters, and a spot-check found the topics they name in each draft body. They are marked "draft exists; keep" in the CSV. For the other ten posts, titles are planned now and descriptions are written once each body exists.

| URL | Current title source value | Proposed rendered title (chars) | Proposed meta description (chars) | Cluster / P | IDs |
|---|---|---|---|---|---|
| `/blog/us-visa-interview-questions` | US Visa Interview Questions and How to Answer | **keep** (59) | keep (151) | G-QHUB / P1 | M090, M091 |
| `/blog/b1-b2-visa-interview-questions-for-parents` | B1/B2 Visa Interview Questions for Parents | **keep** (56) | keep (155) | Q-B1B2PAR / P1 | M092, M093 |
| `/blog/us-visa-interview-questions-philippines` | US Visa Interview Questions in the Philippines | **keep** (60) | keep (146) | C-PH / P1 | M094, M095 |
| `/blog/us-visa-interview-in-hindi-urdu` | US Visa Interview Questions in Hindi and Urdu | **keep** (59) | keep (152) | LANG-HIUR / P2 | M096, M097 |
| `/blog/f1-visa-second-attempt-after-214b` | F1 Visa Second Attempt After a 214(b) Refusal | **keep** (59) | keep (151) | Q-F1RETRY / P2 | M098, M099 |
| `/blog/spouse-visa-interview-questions-ir1-cr1` | n/a (post not written yet) | **Spouse Visa Interview Questions (IR1/CR1) \| VisaPrepper** (55) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | Q-SPOUSE / P2 | M100, M101 |
| `/blog/immigrant-visa-interview-questions` | n/a (post not written yet) | **Family Immigrant Visa Interview Questions \| VisaPrepper** (55) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | Q-IV / P2 | M102, M103 |
| `/blog/us-visa-interview-day-what-to-expect` | US Visa Interview Process: What to Expect | **keep** (55) | keep (151) | G-DAY / P2 | M104, M105 |
| `/blog/us-visit-visa-interview-pakistan` | n/a (post not written yet) | **US Visit Visa Interview From Pakistan (B1/B2) \| VisaPrepper** (59) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | C-PKVISIT / P2 | M106, M107 |
| `/blog/f1-visa-interview-nepal` | n/a (post not written yet) | **F1 Visa Interview Questions in Nepal \| VisaPrepper** (50) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | C-NP / P2 | M108, M109 |
| `/blog/us-visa-interview-waiver-dropbox` | n/a (post not written yet) | **US Visa Interview Waiver: Who Still Needs One \| VisaPrepper** (59) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | G-WAIVER / P3 | M110, M111 |
| `/blog/221g-administrative-processing-explained` | n/a (post not written yet) | **221(g) Administrative Processing Explained \| VisaPrepper** (56) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | G-221G / P3 | M112, M113 |
| `/blog/us-visa-bond-interview` | n/a (post not written yet) | **US Visa Bond and Your B1/B2 Interview \| VisaPrepper** (51) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | G-BOND / P3 | M114, M115 |
| `/blog/us-visa-interview-questions-ghana` | n/a (post not written yet) | **US Visa Interview Questions in Ghana \| VisaPrepper** (50) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | C-GH / P3 | M116, M117 |
| `/blog/us-visa-interview-questions-kenya` | n/a (post not written yet) | **US Visa Interview Questions in Kenya \| VisaPrepper** (50) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | C-KE / P3 | M118, M119 |
| `/blog/us-visa-interview-uae-residents` | n/a (post not written yet) | **US Visa Interview in the UAE as a Resident \| VisaPrepper** (56) | Write after the body is final: 140-155 chars summarising what the body actually covers; no approval guarantee. | C-AE / P3 | M120, M121 |

Publishing any new post changes three hard-coded counts: `tests/global-positioning.test.ts:12` (20 posts), `tests/seo-implementation.test.ts:5` (44 sitemap entries) and `scripts/verify-site.mjs:8` (44 routes). See C18. Each new post also needs a unique `primaryKeyword`, which a test checks. A post outside Pakistan, India or Bangladesh must omit `market`, because the enum only allows those three.

## 4. Structured data, canonical, robots and sitemap (code and config)

| ID | Status / P | URL scope | File | Field | Current | Proposed | Why |
|---|---|---|---|---|---|---|---|
| C01 | change / P1 | all /blog/* posts | `lib/content/posts.ts` | frontmatterSchema | no seoDescription key (z.object drops unknown keys) | Add `seoDescription: z.string().optional()` to frontmatterSchema. | Required for every seoDescription row; `description` stays the visible text. [Working tree of the clone already contains this edit, uncommitted, made by another workflow step.] |
| C02 | change / P1 | all /blog/* posts | `app/blog/[slug]/page.tsx` | generateMetadata -> buildPageMetadata.description | description: post.description | description: post.seoDescription ?? post.description (generateMetadata only; leave buildArticleJsonLd description = post.description and all JSX unchanged). | Routes the SEO-only text to meta description, og:description and twitter:description. [Already in the clone's working tree, uncommitted.] |
| C03 | change / P2 | 404 and any future page without its own canonical | `app/layout.tsx` | metadata.alternates.canonical | alternates: { canonical: "/" } | Remove the root canonical. Every live page sets its own via buildPageMetadata. | TECH-11: 404s currently inherit canonical https://visaprepper.com. [Already in the clone's working tree, uncommitted.] |
| C04 | change / P3 | all indexable pages | `app/layout.tsx` | metadata.robots | (none) | robots: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 }  (preview directives only; do not add index/follow) | TECH-14. The working tree variant also sets index:true/follow:true and a googleBot block; that is redundant (index,follow is the default) and makes 404s carry both an 'index' robots meta from the layout and Next's injected 'noindex'. Prefer the preview-only form. Verified in a throwaway build of HEAD + this plan (2026-11-21): pages render robots 'max-video-preview:-1, max-image-preview:large, max-snippet:-1'; /start still renders 'noindex, follow' (page robots overrides the layout's, shallow merge); a 404 renders 'noindex' plus the preview meta and no canonical. |
| C05 | change / P2 | all /blog/* posts | `lib/seo/json-ld.tsx` | buildArticleJsonLd.author (+ type selection) | author: { "@type": post.author === "Visa Prepper Editorial Team" ? "Organization" : "Person", name: post.author } | ORGANIZATION_AUTHORS = new Set(["Visa Prepper Editorial Team"]); author = { "@type": "Organization", "@id": `${SITE_URL}/#editorial-team`, name: post.author, url: `${SITE_URL}/about`, parentOrganization: { "@id": `${SITE_URL}/#organization` } } for those bylines, else { "@type": "Person", name } | evidence/schema-brand.md E1+E2: links the unlinked author entity to the publisher; name stays identical to the visible byline. [Already in the clone's working tree, uncommitted.] |
| C06 | change / P3 | all /blog/* posts | `lib/seo/json-ld.tsx` | buildArticleJsonLd @id/url/isPartOf/image/publisher.logo | no @id, url, isPartOf or image; publisher.logo without dimensions | Add "@id": `${url}#article`, url, isPartOf: { "@id": `${SITE_URL}/#website` }, image: [`${SITE_URL}/opengraph-image`], publisher.logo width 1254 / height 1254. | evidence/schema-brand.md E3 option A (existing 1200x630 brand card; no new design). [Already in the clone's working tree, uncommitted.] Note: #website is only defined on /, which is fine for @id references. |
| C07 | change / P3 | all pages / homepage | `lib/seo/json-ld.tsx` | buildOrganizationJsonLd.url and buildSoftwareApplicationJsonLd.url | url: SITE_URL  (https://visaprepper.com) | url: `${SITE_URL}/` | evidence/schema-brand.md E10, cosmetic: matches WebSite.url and mainEntityOfPage. tests/seo.test.ts compares new URL(...).href so it still passes. Keep Organization.logo a plain URL string: tests/seo.test.ts:27 asserts that exact string. |
| C08 | change / P3 | /document-checks | `app/document-checks/page.tsx` | Service JSON-LD @id | (no @id) | "@id": `${SITE_URL}/document-checks#service` | evidence/schema-brand.md E11: the other three Service nodes already have #service ids. |
| C09 | hold / hold | all pages | `lib/seo/json-ld.tsx` | Organization.contactPoint | (none) | Only after the owner confirms the phone: contactPoint { "@type": "ContactPoint", contactType: "customer support", email: "hello@visaprepper.com", telephone: "+1-732-518-8581" } | evidence/schema-brand.md E12. lib/config/site.ts says the WhatsApp number is owner-supplied and not independently verified, so do not ship without confirmation. |
| C10 | change / P3 | all /blog/* posts | `app/blog/[slug]/page.tsx` | openGraph.authors (article:author) | authors: [post.author]  (plain text) | authors: [`${SITE_URL}/about`] | evidence/schema-brand.md E9 (Info): the OG spec expects a profile URL. Optional. |
| C11 | keep / keep | / (all brand entities) | `lib/config/site.ts + lib/seo/json-ld.tsx` | WebSite/Organization/SoftwareApplication name + alternateName | name "VisaPrepper"; alternateName ["Visa Prepper", "visaprepper.com"] | keep | Per evidence/schema-brand.md 3.1: keep 'VisaPrepper' as the preferred site name (domain, logo, header wordmark, og:site_name, all titles). keyword-clusters.md suggested flipping to 'Visa Prepper'; not adopted, because the spaced form is already the first alternateName and a flip would restart reprocessing. tests/seo.test.ts also locks these values. |
| C12 | change / P3 | /document-checks | `lib/seo/content-dates.ts` | PAGE_UPDATED["/document-checks"] | "2026-11-17" | "2026-11-21" (only if the owner agrees the 99dac01 FAQ/scope wording change is substantive) | TECH-10. Do NOT bump lastmod for the metadata-only changes in this plan; lastmod should reflect main-content changes. |
| C13 | keep / keep | /sitemap.xml | `app/sitemap.ts` | routes, changefreq, priority | 44 URLs; changefreq/priority present | keep | No URL is added or removed. changefreq/priority are ignored by Google but harmless. New posts are added automatically from getAllPosts() with lastmod = publishDate. |
| C14 | keep / keep | /robots.txt | `app/robots.ts` | rules | Allow /; Disallow /api/, /admin/; Sitemap | keep | Correct as is; no AI crawler blocked; /start must stay crawlable for its noindex to be seen. |
| C15 | keep / keep | /start | `app/start/page.tsx` | robots | { index: false, follow: true } | keep | Utility redirect page; stays noindex,follow and out of the sitemap. |
| C16 | keep / keep | /terms, /privacy, /refund-policy, /contact, /partners, /partners/apply | `(no file)` | noindex decision | indexable | keep indexable (no new noindex) | Not thin by intent (each is a unique, required utility/legal page) and three of them are the only owned results on the brand SERP today. Noindexing them would not make Google rank the homepage, which first needs the hosting/canonical fixes. Revisit after Search Console is connected. |
| C17 | change / P1 | / (test script) | `scripts/verify-site.mjs` | line 59 homepage title assertion | assert.match(home,/<title>VisaPrepper \\| U.S. Visa Interview Practice &amp; Document Checks<\/title>/, ...) | Update the regex to the new homepage title: /<title>VisaPrepper \(Visa Prepper\): AI U.S. Visa Interview Practice<\/title>/ | Required by the homepage title change; otherwise `npm run test:site` fails. |
| C18 | change / P2 | /blog (tests) | `tests/global-positioning.test.ts:12, tests/seo-implementation.test.ts:5, scripts/verify-site.mjs:8` | post and sitemap counts | posts.length === 20; sitemap entries === 44; verify-site routes.length === 44 | Increase all three counts by the number of new posts published (20 -> 20+n posts, 44 -> 44+n sitemap entries/routes). | Only needed when NEW blog posts ship; metadata changes do not affect counts. Each new post also needs a unique primaryKeyword (test). |

**Working-tree note.** The clone's working tree already holds uncommitted edits for C01, C02, C03, C05 and C06, and a variant of C04. Another workflow step made them (`git status`: `app/blog/[slug]/page.tsx`, `app/layout.tsx`, `lib/content/posts.ts`, `lib/seo/json-ld.tsx`). This plan treats them as proposals. They are not deployed, and this step did not touch them.

On C04: the working-tree version sets `index: true, follow: true` plus a `googleBot` block. Because Next merges metadata shallowly (`node_modules/next/dist/docs/.../generate-metadata.md`, "Merging"), `/start` keeps its own `noindex, follow` either way. A 404, however, would then carry an `index, follow` robots meta next to Next's injected `noindex`. The preview-only form avoids that, and it was the form used in the test build.

## 5. Hosting and off-repo items (owner actions, no page content)

| ID | Status / P | URL scope | File | Field | Current | Proposed | Why |
|---|---|---|---|---|---|---|---|
| H01 | change / P1 | https://www.visaprepper.com/* | `Vercel project > Domains (not in repo)` | www redirect status | 307 Temporary to apex | 308 Permanent to https://visaprepper.com (path and query preserved) | TECH-02; brand/homepage canonical signal. Owner action; not a code change. |
| H02 | change / P1 | https://visa-prepperation.vercel.app/* | `Vercel project > Domains (not in repo)` | production alias | 200, indexable duplicate (canonical only) | 308 to https://visaprepper.com, or at minimum X-Robots-Tag: noindex for that host | TECH-03 / schema-brand 3.3: duplicate homepage host. Owner action. |
| H03 | change / P3 | https://visaprepper.com/index | `Vercel redirect (hosting config)` | redirect | 200 duplicate of / (canonical /) | 308 to / | TECH-12. Hosting config, owner approval needed. |
| H04 | change / P2 | https://app.visaprepper.com/* | `separate app project (not this repo)` | robots/noindex + shell metadata | no robots.txt, soft-404s, og:title 'VisaPrep', description names only Pakistan/India/Bangladesh | Serve text/plain robots.txt, 404 unknown routes, X-Robots-Tag: noindex on app routes, align shell metadata to 'VisaPrepper' and worldwide U.S. scope | TECH-04. Outside this repo; listed so the owner can hand it to the app project. |

## 6. Decisions and where this plan diverges from the inputs

1. **Homepage title changes, despite TECH-01's "keep until GSC".**
   - On 2026-11-21 the homepage was absent from page-1 results for `visaprepper` in gl=us/in/pk/ng, so there is no brand position to lose.
   - Google auto-corrected the query to `visa prepper` in gl=in, and rewrote the homepage title link to "Visa Prepper" for the quoted query.
   - The new title keeps `VisaPrepper` first and adds the spaced form, which the visible copy already uses ("VisaPrepper, also written Visa Prepper").
   - Ship it in the same deploy as H01/H02, and update `scripts/verify-site.mjs:59` (C17).
   - The cause of the missing homepage is still **unknown** without Search Console URL Inspection. Metadata alone may not fix it.
2. **Contact and partner titles held back.** evidence/schema-brand.md E4-E6 suggests removing "Visa Prepper" from these titles. But `/contact` (gl=pk, gl=ng) and `/partners` (gl=in) were the #1 results for the brand query, and their titles are the only ones that carry both spellings. Only their descriptions get the spelling fix now. Revisit the titles once the homepage ranks.
3. **Brand entity name stays `VisaPrepper`** (evidence/schema-brand.md 3.1). keyword-clusters.md suggested `name: "Visa Prepper"` with alternateName `VisaPrepper`; that was not adopted:
   - The logo, header wordmark, domain, og:site_name and all title suffixes say VisaPrepper.
   - The spaced form is already the first alternateName.
   - `tests/seo.test.ts` locks these values.
4. **India practice title shortened.** It is `U.S. Visa Interview Practice in India` (51 rendered), not the suggested `... (English, Hindi, Urdu)` (69 rendered). The languages already lead the visible eyebrow and the meta description.
5. **Some cluster suggestions not adopted:**
   - The H1B and H4 guide titles stay as they are. The H1B body does not cover "stamping", and "for Spouses" would drop the children sub-intent the H4 guide also covers.
   - The documents-checklist description leaves out DS-2019 and I-797, which the body does not name.
6. **No new noindex** (C16). The legal, contact and partner pages are small but unique and expected. Three of them are the only owned brand results today, and noindexing them would not make Google rank the homepage. `/start` stays noindex.
7. **No lastmod bumps for metadata-only edits.** C12 is the only optional exception: the 99dac01 FAQ/scope wording on `/document-checks`, if the owner considers it substantive.

## 7. Rollout order

1. **Deploy 1 (P1 + P2 metadata, plus C01-C08 and C17):** all `change` rows with phase 1. Set up H01 and H02 in Vercel on the same day.
2. **Deploy 2 (phase 2):** the `/features` title (M011) and the optional C10.
3. **New posts:** as each is published, update C18 counts and add internal links to them from new posts only (existing post bodies stay unchanged).
4. **After deploy (owner, once Search Console is connected):**
   - Inspect `/`, `https://www.visaprepper.com/` and `https://visa-prepperation.vercel.app/`, and record the canonical Google selected.
   - Request indexing for `/`, `/visa-types/*` (Google still showed retired "in Pakistan" titles) and the changed blog URLs.
   - Re-check the `visaprepper` and `"visa prepper"` SERPs after 2-4 weeks.
   - Validate one blog post and `/` in validator.schema.org and the Rich Results Test. FAQ rich results were discontinued for all sites from 2026-05-07 (evidence/schema-brand.md 4), so FAQPage markup brings no rich result.

## 8. Security note

All SERP, competitor and third-party data reached this step only through the earlier steps' files. No fetched content contained instructions aimed at an agent, and none was acted on. The six draft posts and the working-tree code edits in the clone came from other workflow steps. They were read for alignment only and were not modified.
