# Blog refresh recommendations (for later; post bodies are frozen)

Date: 2026-11-21. Repo: production commit 99dac01 (clone on branch `seo/metadata-2026-11-21`). Companion files in this folder: `blog-inventory.csv` (one row per post), `metadata-plan.csv` (the metadata that can ship now), `keyword-clusters.md`, and `drafts/*.outline.md` (new posts).

## Read this first

- **Nothing in this file can ship under the current owner constraints.** Every item changes visible body copy, visible frontmatter (`title`, `description`, `faq`) or internal links inside a post. Ship only the metadata in `metadata-plan.csv` now. Apply this file when the owner approves body edits, one post at a time, and bump `updatedDate` only for posts whose content actually changed.
- **Status today:** 20 posts. 14 are marked `refresh`, 6 `keep`, 0 `consolidate`. Two posts are on a conditional consolidation watch (section 4).
- **Line numbers** refer to `content/blog/<slug>.mdx` at commit 99dac01. Re-check them before editing, because they move.
- **Re-verify policy facts on the day you edit.** travel.state.gov returned HTTP 403 to automated clients on 2026-11-21, so anything sourced only from travel.state.gov is marked **medium** and must be rechecked in a normal browser. Federal Register, eCFR, FAM, USCIS, ICE and the embassy pages listed below were read directly on 2026-11-21 (**high**).
- **Product facts** come from `lib/config/offer.ts`, `lib/config/product-scope.ts` and `evidence/product-facts.md` (live app bundle built 2026-11-19, checked 2026-11-21): $44 USD one-time = 6 AI video interviews + 10 document checks, valid 90 days. Free plan = 1 document check for eligible users, no AI interview. U.S. interviews in English, Urdu, Hindi. Bengali "coming soon". The app blocks Bangladesh nationals and excludes U.S./territory nationals.
- No search volumes or rankings are added here. Search Console is not connected, so impressions and clicks are unknown.

## 1. Sources used in this file

Every row was checked on 2026-11-21. "Direct" means the page text was read. "Blocked" means only a search excerpt or an archived copy was seen.

| ID | Official source | How checked (2026-11-21) | Confidence |
|---|---|---|---|
| S1 | https://in.usembassy.gov/visas/ , https://pk.usembassy.gov/visas/ , https://ph.usembassy.gov/visas/ (site notices) | Direct, HTTP 200. Each says: book NIV interviews in your country of residence or nationality; fees are non-refundable and non-transferable; applicants for A-3, C-3 (domestic worker), G-5, H-1B, H-3, H-4, F, I, J, M, K-1, K-2, K-3, Q, R-1, R-2, S, T, TN, TD and U visas are told to set all social media accounts to "public"; Proclamation 10998 applicants may still apply and attend interviews but may be found ineligible | high |
| S2 | https://travel.state.gov/content/travel/en/News/visas-news/interview-waiver-update-sept-18-2025.html | Blocked; archived copy (2026-07-12) and embassy reprints | medium |
| S3 | https://www.ecfr.gov/current/title-22/section-41.102 | Direct (eCFR current to 2026-11-19) | high |
| S4 | https://www.ecfr.gov/current/title-22/section-41.101 and https://travel.state.gov/en/newsroom/visas/2026/adjudicating-nonimmigrant-visa--niv--applicants-in-their-country.html | eCFR direct; State page blocked (archived copy last updated Dec 12, 2025) | high (eCFR) / medium (State) |
| S5 | https://www.ice.gov/sevis/i901 and https://www.ice.gov/sevis/i901/faq | Direct (via facts reference) | high |
| S6 | https://fam.state.gov/FAM/09FAM/09FAM030201.html (9 FAM 302.1: 214(b), 221(g), six-month passport rule) | Direct | high |
| S7 | https://fam.state.gov/FAM/09FAM/09FAM040310.html (9 FAM 403.10: refusal letters, reapplying, 221(g) one-year rule) | Direct | high |
| S8 | https://fam.state.gov/FAM/09FAM/09FAM040303.html (DS-160 confirmation page) | Direct | high |
| S9 | https://www.federalregister.gov/documents/2025/12/19/2025-23570/restricting-and-limiting-the-entry-of-foreign-nationals-to-protect-the-security-of-the-united-states (Proclamation 10998) | Direct (full text) | high |
| S10 | https://www.federalregister.gov/documents/2026/08/03/2026-15726/visas-visa-bond-program and https://travel.state.gov/content/travel/en/News/visas-news/countries-subject-to-visa-bonds.html | FR direct; State list blocked (archived copy "Last Updated: May 13, 2026" lists Bangladesh and Nepal from Jan 21, 2026; India, Pakistan and the Philippines not listed in that copy) | high (rule) / medium (list) |
| S11 | https://www.federalregister.gov/documents/2025/09/24/2025-18601/restriction-on-entry-of-certain-nonimmigrant-workers , https://www.federalregister.gov/documents/2026/09/23/2026-19554/restriction-on-entry-of-certain-nonimmigrant-workers , https://www.uscis.gov/newsroom/alerts/h-1b-faq , https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations | Direct | high (interaction of the 2026 extension with the court order: unverified) |
| S12 | https://travel.state.gov/content/travel/en/News/visas-news/announcement-of-expanded-screening-and-vetting-for-visa-applicants.html and the H-1B/H-4 announcement | Blocked (search excerpt); now corroborated by S1 | medium (S1 is the high-confidence citation) |
| S13 | https://www.federalregister.gov/documents/2026/07/17/2026-14439/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant | Direct | high |
| S14 | https://www.ecfr.gov/current/title-22/section-41.31 and https://fam.state.gov/FAM/09FAM/09FAM040202.html (9 FAM 402.2, CT:VISA-2193, 03-19-2026) | Direct | high |
| S15 | https://www.ecfr.gov/current/title-22/section-22.1 (MRV $185 B/F/J; $205 H) and https://fam.state.gov/FAM/09FAM/09FAM060105.html (non-refundable) | Direct | high |
| S16 | https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html and https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html | Blocked (search excerpts) | medium |
| S17 | https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html and https://travel.state.gov/content/dam/visas/Enhanced%20Vetting/CA%20-%20FAQs%20on%20Social%20Media%20Collection%20-%206-4-2019%20(v.2).pdf | Blocked | medium |
| S18 | https://bd.usembassy.gov/interview-steps/ | Direct, HTTP 200: officers "speak and understand Bangla" and will interview in Bangla or English; "English competency is not a requirement" | high |
| S19 | https://www.ecfr.gov/current/title-22/section-42.65 , https://www.ecfr.gov/current/title-22/section-42.66 , https://www.uscis.gov/i-864 (Last Reviewed/Updated 09/04/2026: only the 08/24/26 edition accepted from Oct 1, 2026) | Direct (eCFR current to 2026-11-19; USCIS page copy saved 2026-11-21 in out/blogplan-official/) | high |
| S20 | https://travel.state.gov/content/dam/visas/Statistics/Non-Immigrant-Statistics/RefusalRates/FY25.pdf | Blocked; Internet Archive copy read (FY2025 adjusted B refusal rates: India 22.04%, Pakistan 52.32%, Bangladesh 61.45%, Philippines 30.76%) | medium (archived official file) |

## 2. Cross-cutting fixes (apply in every post listed)

| # | Issue | Posts and lines | Change when allowed | Source |
|---|---|---|---|---|
| X1 | **Worldwide / Bangladesh access claim contradicts the app.** "VisaPrepper supports U.S. visa applicants worldwide ... choose Another country" appears in 13 posts. The app blocks Bangladesh nationals and excludes U.S./territory nationals. Most direct: "This free plan is available to readers everywhere." | 214b:61; b1-b2-visa-mock-interview-scenarios:109; best-ai:87; f1-7-day-plan:102 (incl. "available to readers everywhere"); free-ai:108; documents-checklist:16, 98, 100; any-country:17, 22, 83, 87; bangladesh:18, 83; follow-up:88; nervous:60; who-will-pay:83 | Owner decision first (product or copy). If the app keeps blocking Bangladesh, change the shared sentence to name the exception (for example "...worldwide, except applicants from Bangladesh, where access is coming soon") and drop "available to readers everywhere". If the app unblocks Bangladesh, no copy change. | evidence/product-facts.md (app bundle 2026-11-19, checked 2026-11-21) |
| X2 | **Social media "public" instruction missing.** Embassy notices now list F, M, J, H-1B and H-4 among the categories told to set accounts to public. All applicants list 5 years of social media identifiers on the DS-160. No such instruction was found for B1/B2, so never claim one for visitors. | f1-questions, f1-7-day-plan (Day 1/Day 7), j1, h1b, h4, india (F1 and H1B sections), pakistan (F1 section), bangladesh (F1 section), documents-checklist, ds-160 | Add one dated sentence per post, in the section named in section 3. Safe phrasing: "As of 2026-11-21, U.S. embassy notices ask F, M, J, H-1B and H-4 applicants (among other categories) to set social media accounts to public. List your identifiers accurately on the DS-160. Do not delete or hide accounts to look different." Never imply VisaPrepper reviews social media. | S1 (high); S12, S17 (medium) |
| X3 | **Interview waivers narrowed (Oct 1, 2025).** Most first-time applicants, H-1B renewals, applicants under 14 and over 79 now generally interview in person; a refusal not overcome rules out a waiver. | b1-b2-questions, f1-questions, h1b:97, h4:70-73, india, any-country, 214b, documents-checklist | Add the dated rule where the post discusses renewals, children or elderly parents. Do not mention the old "48-month" rule or say dropbox is available for students. | S2 (medium), S3 (high) |
| X4 | **Apply in your country of nationality or residence.** | 214b, f1-questions, h1b (third-country stamping), b1-b2-questions, india, pakistan, bangladesh, documents-checklist (any-country already covers it) | One sentence plus link to the existing any-country post. | S1 (high), S4 |
| X5 | **Proclamation 10998 (from Jan 1, 2026).** 39 countries plus Palestinian Authority documents; B-1/B-2, F, M and J partially suspended for the partial list (e.g., Nigeria). India, Pakistan, Bangladesh, Philippines are not listed. | any-country, f1-questions, j1, b1-b2-questions, documents-checklist | Dated note that tells listed nationals to check State guidance. Do not copy the full country list into evergreen posts; cite the proclamation and date. | S9 (high), S1 (high) |
| X6 | **B1/B2 visa bonds.** Program permanent from Aug 3, 2026; amount set at the interview; bond only after an officer directs it; Pay.gov only; a bond does not guarantee issuance. | b1-b2-questions (Family visits section mentions Bangladesh), bangladesh, documents-checklist (Visitor documents), any-country | Dated note naming Bangladesh (listed Jan 21, 2026, archived list) and pointing to the live list. Never state an amount for a specific applicant. | S10 |
| X7 | **Year in visible H1** ("2026") goes stale on 2027-01-01. | h1b:2, h4:2, j1:2 (frontmatter `title`, which is the visible H1 and Article `headline`) | Remove the year before 2027-01-01. `seoTitle` values have no year, so `<title>` is unaffected. | n/a |
| X8 | **Unverified "Stripe checkout in the app" claims.** `/api/checkout-entry` returns 503; app checkout can be switched off server-side. | best-ai:85; b1-b2-visa-mock-interview-scenarios:107 (keep post) | Replace with "Purchases are completed in the app" unless the owner confirms checkout is live. | evidence/product-facts.md |
| X9 | **Unsourced generalizations.** | f1-questions:31 ("Most last just a few minutes"); b1-b2-questions:84 ("one of the most common reasons a B1/B2 application doesn't move forward"); h4:31 ("H4 interviews are often shorter than the H1B interview itself"); f1-questions:141 ("the same way a real interview would") | Soften to non-statistical wording ("Interviews are often short, so..."; "Vague answers make it harder to show..."), and change the product line to "follows up when an answer needs more detail, as an officer might". | No official statistic exists |
| X10 | **Links to the new posts** (after each new post is published). | See section 5 | Add one contextual link per listed section. | n/a |

## 3. Per-post refresh instructions (priority order)

### 3.1 `h1b-visa-interview-questions` (priority 1)

URL https://visaprepper.com/blog/h1b-visa-interview-questions. 1,287 body words; updated 2026-11-17; no official outbound links at all.

1. **Frontmatter `title`** "H1B Visa Interview Questions 2026: ..." → drop "2026" (X7).
2. **New short H2 after "What an H1B interview is actually checking" (line 25): "2025-2026 changes to know before your interview" (dated "as of [edit date]").**
   - $100,000 payment: Proclamation 10973 (effective Sept 21, 2025) requires it for certain new H-1B petitions for beneficiaries outside the U.S.; it does not apply to valid visas already issued, earlier petitions, or in-country extensions/changes of status; it is one-time per new petition. Extended to Sept 21, 2027 by Proclamation 11069. A federal court vacated the implementing guidance on June 8, 2026 and the First Circuit denied a stay on July 24, 2026; DHS says it is complying while it considers next steps. Frame it as the employer's petition matter, not an interview question, and give no legal conclusions about a specific case. Source: S11 (high; interaction of the extension with the court order unverified).
   - Social media "public" instruction for H-1B and H-4 (X2). Source: S1 (high).
   - Optional: EO 14431 (Sept 18, 2026) on sponsor layoffs, implementation unknown (https://www.federalregister.gov/documents/2026/09/23/2026-19555/enhancing-program-integrity-and-interagency-coordination-in-the-administration-of-the-h-1b, checked 2026-11-21, high). Optional: the $103,265 cap-petition fee is **proposed only** (https://www.federalregister.gov/documents/2026/08/25/2026-17324/fee-for-certain-h-1b-petitions, checked 2026-11-21); label it "proposed" or omit.
3. **"Employment history and renewals" (line 88), sentence at line 97** "If an interview is required for a renewal or extension..." → "Since October 1, 2025, H-1B renewals are generally outside the interview-waiver categories, so expect an in-person interview unless your embassy tells you otherwise." Source: S2 (medium), S3 (high).
4. **"How the interview typically flows" (line 29)**: add the residence rule for applicants who used third-country stamping (X4). Source: S1, S4.
5. **Add official links** (USCIS H-1B page from S11; State temporary-worker page, recheck in a browser). If a fee is mentioned, MRV for H is $205 (S15, high).
6. **Link** the new hub `/blog/us-visa-interview-questions` from "Sample H1B interview questions to practice with" (line 99) after it is published.

### 3.2 `f1-visa-interview-questions-and-answers` (priority 2)

URL https://visaprepper.com/blog/f1-visa-interview-questions-and-answers. 1,539 words; updated 2026-11-17.

1. **H2 "A funding exercise for South Asian students" (line 33)** → rename to a worldwide scope (for example "A funding exercise you can do with your own numbers"); keep the examples, labelled as examples.
2. **"Funding and your sponsor" (line 60)**: add the SEVIS I-901 fee (F-1 $350 as of 2026-11-21), paid on FMJfee.com before the interview, allow at least three business days; point readers to the cost estimate on their own I-20. Source: S5 (high); https://fam.state.gov/FAM/09FAM/09FAM040205.html (I-901 before issuance, high). Add one line that funding is itself an F-1 requirement, so a 214(b) refusal can be about funds, not only ties (S6, high), linking the 214(b) guide.
3. **Line 31** "Most last just a few minutes" → soften (X9).
4. **"How to actually prepare, not just study a list" (line 137)**: add the F/M/J social media instruction (X2, S1 high) and that first-time F-1 applicants should expect an in-person interview (X3, S2 medium).
5. **"Ties to home and plans after graduation" (line 88)**: one dated sentence on the fixed period of admission (effective Sept 15, 2026; program length, max 4 years; extensions through USCIS) as a post-arrival status rule, not an interview requirement. Source: S13 (high). If OPT fees come up, the $70,000/$30,000 figures are **proposed only** (https://www.federalregister.gov/documents/2026/10/08/2026-20660/optional-practical-training-fees, checked 2026-11-21).
6. **Worldwide audience note** (X5): F visas partially suspended for listed nationalities under Proclamation 10998 (S9, high).
7. **Line 141** product line "the same way a real interview would" → soften (X9).
8. Link the new hub from "Sample F1 interview questions to practice with" (line 111) after publishing.

### 3.3 `b1-b2-visa-interview-questions` (priority 3)

URL https://visaprepper.com/blog/b1-b2-visa-interview-questions. 1,467 words; updated 2026-11-17.

1. **Line 84** "one of the most common reasons a B1/B2 application doesn't move forward" → soften (X9).
2. **"Family visits from Pakistan, India and Bangladesh" (line 37)**: add a dated visa-bond sentence (X6): nationals of listed countries, including Bangladesh (listed Jan 21, 2026), may be asked to post a bond after the officer finds them otherwise eligible; amount set at the interview; check the live list. Source: S10. After the parents post is published, link it here ("If you are a parent visiting an adult child...").
3. **"How the interview typically flows" (line 33)**: add who interviews in person since Oct 1, 2025 (first-time applicants; under 14 and over 79; limited 12-month B1/B2 renewal waiver). Source: S2 (medium), S3 (high).
4. **"Purpose of your trip" (line 49)**: add the B-2 definition (tourism, visits with friends or relatives, rest, medical treatment) and that B-2 excludes travel mainly to give birth for a child's citizenship. Source: S14 (high). Never coach on avoiding scrutiny of pregnancy or medical travel.
5. **New worldwide note** (X5): B-1/B-2 partially suspended for listed nationalities (S9, high).
6. **Optional, dated:** MRV fee $185 (S15, high), non-refundable if refused. The $750 expedited-appointment fee runs only July 1 to Dec 31, 2026 at selected posts (https://www.federalregister.gov/documents/2026/06/09/2026-11513/schedule-of-fees-for-consular-services-department-of-state-and-overseas-embassies-and, checked 2026-11-21); omit it if the refresh happens after Dec 31, 2026.
7. Link the new hub from "Sample B1/B2 interview questions to practice with" (line 113).

### 3.4 `us-visa-interview-documents-checklist` (priority 4)

URL https://visaprepper.com/blog/us-visa-interview-documents-checklist. 1,045 words; updated 2026-11-17. Keep the current `seoTitle` (the page appears for the brand query).

1. **"Nonimmigrant interview basics" (line 31)**: add a short dated core list: passport valid at least six months beyond the intended stay unless a country agreement exempts you (S6, high; S16, medium); DS-160 confirmation page with barcode (S8, high); fee receipt if payment was due before the interview; a printed photo only if the DS-160 upload failed (S16, medium). End with "your embassy's appointment instructions are the final checklist".
2. **"Student documents: connect funding to the course" (line 39)**: name Form I-20 (signed) and the I-901 receipt for F/M ($350); for J, Form DS-2019 and the I-901 ($220; $35 for au pair, camp counselor and summer work travel; $0 for government-sponsored G-1/G-2/G-3/G-7). Source: S5 (high).
3. **"Visitor documents: purpose, costs and plans afterward" (line 53)**: add the visa-bond note (X6). After the parents post is published, link it here.
4. **"Work, dependent, exchange and immigrant cases" (line 63)**: name Form I-797 for H-1B/H-4; for immigrant visas name the DS-260 confirmation page, civil documents with translations, police certificates, the panel-physician medical exam and Form I-864 with the sponsor's tax transcript (only the 08/24/26 I-864 edition accepted from Oct 1, 2026). Source: S19 (high). After publishing, link `/blog/spouse-visa-interview-questions-ir1-cr1`.
5. **"Local preparation: Pakistan, India and Bangladesh" (line 74)**: add the residence rule (X4) and keep local examples clearly labelled as examples.
6. Add the social media sentence (X2) under student and work documents.
7. FAQ line 16 and lines 98, 100: X1.

### 3.5 `us-visa-interview-preparation-any-country` (priority 5)

URL https://visaprepper.com/blog/us-visa-interview-preparation-any-country. 1,017 words; published 2026-11-17.

1. **"What you need to check locally" (line 49)**: add a dated "rules that depend on your nationality" block: Proclamation 10998 (listed nationals can still apply and interview but may be found ineligible; S1 and S9, high), the visa-bond list (S10), the narrowed interview waivers (S2, S3), and the social media instruction for listed categories (S1). Link to the official pages rather than copying country lists.
2. **"First verify where you should apply" (line 35)**: quote the embassy notice that application fees are non-refundable and non-transferable (S1, high).
3. FAQ line 17 and lines 22, 83, 87: X1.
4. After publishing, link the new hub (questions intent) and the Philippines post (as a worked country example).

### 3.6 `us-visa-interview-questions-india` (priority 6)

URL https://visaprepper.com/blog/us-visa-interview-questions-india. 706 words (thin); updated 2026-11-04 (older than siblings).

1. **"H1B interview questions: explain the work, not just the title" (line 44)**: $100,000 payment status in one dated paragraph (S11) and the H-1B/H-4 social media instruction (S1).
2. **"F1 student visa questions: course choice and education loans" (line 28)**: I-901 fee (S5) and F social media instruction (S1). Optional context, labelled as a sum of official monthly tables: F-1 issuances to Indian nationals fell about 53% from FY2024 to FY2025 (evidence/market-priority.md; https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics/nonimmigrant-visa-statistics.html, blocked, archived copies).
3. **"Visitor questions: parents, family visits and business trips" (line 58)**: elderly parents over 79 now generally interview in person (S2, S3). After publishing, link the parents post here.
4. **"Documents and appointments in India" (line 68)**: residence rule (X4, S1).
5. **"AI video interview practice in Hindi" (line 82)**: keep, and after publishing link `/blog/us-visa-interview-in-hindi-urdu`. Note that Hindi report explanations are "coming soon" in the app; the interview itself can be practised in Hindi (evidence/product-facts.md).
6. Expand toward the 1,500-2,500 word target; bump `updatedDate`.

### 3.7 `us-visa-interview-questions-bangladesh` (priority 7, blocked on a product decision)

URL https://visaprepper.com/blog/us-visa-interview-questions-bangladesh. 736 words (thin); updated 2026-11-17.

1. **Resolve X1 first.** FAQ line 18 and line 83 tell Bangladeshi applicants to choose "Another country" and select Bangladesh; the app blocks them. Either the app opens or these lines change. Do not refresh anything else until this is settled.
2. **"Visitor interview questions: family and business trips" (line 51)**: add the visa-bond paragraph (X6): Bangladesh listed from Jan 21, 2026 (archived State list, medium); the officer sets the amount at the interview; Form I-352 and Pay.gov only after the officer directs; a bond does not guarantee issuance. Source: S10.
3. **"F1 visa interview in Bangladesh: what to practice" (line 27)**: F social media instruction (S1) and I-901 (S5).
4. **"Bengali preparation and current availability" (line 79)**: add the official interview-language fact: Dhaka officers interview in Bangla or English and "English competency is not a requirement" (S18, high).
5. Optional: FY2025 adjusted B refusal rate for Bangladesh 61.45% (S20, medium).
6. Expand toward 1,500 words.

### 3.8 `ds-160-interview-consistency` (priority 8)

URL https://visaprepper.com/blog/ds-160-interview-consistency. 698 words; updated 2026-11-17; second most linked post.

1. **Line 22 and frontmatter `description`** "for applicants in Pakistan, India, and Bangladesh" → worldwide scope (the meta description is already handled by `seoDescription` in metadata-plan.csv).
2. **Line 30** "Its DS-160 FAQ also explains how to reprint a lost confirmation page" → unverified (current FAQ wording not seen; an archived embassy page says consulates cannot reproduce lost barcodes). Replace with "Keep a saved PDF and a printed copy; follow your embassy's instructions if it is lost." Source: S17 (medium).
3. **"What if something is wrong or has changed?" (line 68)**: add that a submitted DS-160 generally cannot be edited; embassy FAQs usually say to complete a new DS-160 and update the appointment to the new barcode (S17, medium; phrase as "generally").
4. **"6. Previous travel and visa history" (line 56)**: add a seventh check, social media identifiers used in the last five years (S17, medium; S1 for categories told to set accounts public).
5. Add "each applicant, including children, needs their own DS-160" (S17, medium).
6. Optional: the post has no in-body CTA; the template CTASection already covers it, so no change is required.

### 3.9 `214b-visa-refusal-guide` (priority 9)

URL https://visaprepper.com/blog/214b-visa-refusal-guide. 756 words (thinnest visa-topic guide); updated 2026-11-17.

1. **FAQ "How long do I have to wait to reapply after a 214(b) refusal?" (lines 15-16)**: answer directly: there is no mandatory waiting period; the standard refusal letter says you may reapply at any time with a new application, photo, fee and interview, ideally with new information or changed circumstances. Source: S7 (high).
2. **"What Section 214(b) covers" (line 23)**: add that 214(b) covers failing any requirement of the category (for example F-1 funding), not only ties. Source: S6 (high).
3. **"214(b) and 221(g) are different" (line 29)**: add the 221(g) one-year rule (within one year, no new DS-160 and no new MRV fee). Source: S7, https://fam.state.gov/FAM/09FAM/09FAM040304.html (high).
4. **"Review the details for your own category" (line 43)**: a refusal that was not overcome rules out an interview waiver, so expect an in-person interview (S3 high, S2 medium); apply in your country of nationality or residence (X4).
5. Optional: MRV fee $185 for B/F/J, not refunded if refused (S15, high).
6. Link the new hub after publishing.

### 3.10 `f1-visa-interview-who-will-pay` (priority 10)

URL https://visaprepper.com/blog/f1-visa-interview-who-will-pay. 599 words; no FAQ (so no FAQPage JSON-LD); updated 2026-11-17.

1. **Frontmatter `description`** "Simple funding exercises for South Asian students" → worldwide (meta handled by `seoDescription`).
2. **"Make one clear funding note" (line 17)**: add the I-901 fee ($350, S5) and the I-20 cost estimate; add that funding is an F-1 requirement (S6) with a link to the 214(b) guide.
3. **Line 83**: X1.
4. **Add a 3-question FAQ** (what if several people pay; how to describe a loan that is not yet disbursed; what to do if numbers differ from the I-20). Keep answers factual and non-guaranteeing.
5. Conditional consolidation: see section 4.

### 3.11 `h4-visa-interview-questions` (priority 11)

URL https://visaprepper.com/blog/h4-visa-interview-questions. 1,374 words; updated 2026-11-17; no official links.

1. **Frontmatter `title`**: drop "2026" (X7).
2. **Line 31** "H4 interviews are often shorter than the H1B interview itself" → soften (X9).
3. **"Your principal applicant's status" (line 46)**: add the H-4 social media instruction (X2, S1).
4. **"Children applying as H4 dependents" (lines 70-73)**: add that since Oct 1, 2025 children under 14 generally need an in-person interview (S2 medium, S3 high).
5. **FAQ "Can I work on H4 status?" (line 17)**: keep the hedge. No proposed rule rescinding H-4 EAD was found (secondary sources only); do not assert changes. Do not claim the $100,000 H-1B payment applies to H-4 (no official statement found; S11).
6. Add official links (USCIS H-1B page S11; State temporary-worker page, recheck).

### 3.12 `j1-visa-interview-questions` (priority 12)

URL https://visaprepper.com/blog/j1-visa-interview-questions. 1,496 words; updated 2026-11-17; no official links.

1. **Frontmatter `title`**: drop "2026" (X7).
2. **"Your DS-2019 and SEVIS record" (line 108)**: add the I-901 tiers ($220 standard J; $35 au pair, camp counselor, summer work travel; $0 for G-1/G-2/G-3/G-7) and that government-sponsored J programs are also MRV-exempt. Sources: S5 (high), S15 item 22(b) (high).
3. **"Plans during and after the program" (line 99)**: fixed period of admission for J from Sept 15, 2026 (S13, high), framed as a post-arrival rule.
4. **"How the interview typically unfolds" (line 38)**: J social media instruction (S1) and first-time in-person interview (S2, S3).
5. Worldwide note: J partially suspended for listed nationalities (S9).
6. Add official links: https://travel.state.gov/content/travel/en/us-visas/study/exchange.html (blocked, recheck) and S5.

### 3.13 `best-ai-visa-interview-tools` (priority 13, monthly vendor check)

URL https://visaprepper.com/blog/best-ai-visa-interview-tools. 1,229 words; updated 2026-11-17.

1. **Line 25** "Sources were reviewed on 17 November 2026": re-verify every vendor row monthly and update the date only when the table changes. A separate scan on 2026-11-21 (evidence/competitors.md, prices may be IP-localised) matched Permito, VisaMind and Visaz; VisaInterview.ai and VisaIsle were not re-checked.
2. **Coverage gap**: tools seen ranking or cited on 2026-11-21 SERPs are missing (visavi.ai, VisaMonk, Visa Interview AI, SzewMate, GreetAI, Prevo, Creatium Coach). Add only after checking each public page on the day of the edit; keep the publisher disclosure.
3. **Line 85** "Purchases use Stripe checkout in the app": X8.
4. **Line 87**: X1.
5. This post makes no dated U.S. visa-policy claims, so no official-source changes are needed.

### 3.14 `us-visa-interview-questions-pakistan` (priority 14, light)

URL https://visaprepper.com/blog/us-visa-interview-questions-pakistan. 860 words; updated 2026-11-04. Keep the current `seoTitle`.

1. **Line 86** "[See the one-time packages](/#pricing)" → singular: "See the $44 one-time package" (one paid package exists; `lib/config/offer.ts`).
2. **"F1 student interview questions: explain your funding" (line 46)**: F social media instruction (S1) and I-901 (S5).
3. **"Before travelling for your appointment" (line 74)**: residence rule (S1). Pakistan is not on the Proclamation 10998 lists (S9). Pakistan was not on the archived visa-bond list (May 13, 2026; S10, medium): do not state either way unless rechecked live.
4. Optional, if the owner wants to answer "rejection rate" searches: FY2025 adjusted B refusal rate for Pakistan 52.32% (S20, medium), presented as an official statistic with its fiscal year, not a prediction.
5. After publishing, link `/blog/us-visa-interview-in-hindi-urdu` from "A short English or Urdu practice session" (line 82).

## 4. Consolidation decisions

- **No post is consolidated now.** No Search Console data exists, so no merge can be justified by shared queries.
- **Conditional 1:** `f1-visa-interview-who-will-pay` → `f1-visa-interview-questions-and-answers` (301) only if Search Console shows no distinct impressions after 90 days of data. Needs body edits to the F1 guide and a redirect in `next.config`, so owner approval is required.
- **Conditional 2:** `mock-visa-interview-online`, `free-ai-visa-mock-interview-online` and `best-ai-visa-interview-tools` split one family of queries. If Search Console later shows two of them sharing the same queries, merge the weaker into `/blog/mock-visa-interview-online` and keep `/visa-interview-practice` as the commercial page.

## 5. Internal links to add after the new posts are published

| New post (outline in `drafts/`) | Add a link from (existing post → section) |
|---|---|
| `/blog/us-visa-interview-questions` | f1-questions → "Sample F1 interview questions"; b1-b2-questions → "Sample B1/B2 interview questions"; h1b → "Sample H1B interview questions"; h4 → "Sample H4 interview questions"; j1 → "Sample J1 interview questions"; any-country → "A preparation exercise that travels well"; india, pakistan → intro paragraph; 214b → "Practice the next detail"; follow-up → intro; mock-visa-interview-online → "Question lists" |
| `/blog/b1-b2-visa-interview-questions-for-parents` | b1-b2-questions → "Family visits from Pakistan, India and Bangladesh"; india → "Visitor questions: parents, family visits and business trips"; pakistan → "Visitor visa interview questions"; b1-b2-visa-mock-interview-scenarios → "Scenario 2: visiting family or friends"; documents-checklist → "Visitor documents" |
| `/blog/us-visa-interview-questions-philippines` | any-country → "What you need to check locally" (as a worked example) |
| `/blog/us-visa-interview-in-hindi-urdu` | india → "AI video interview practice in Hindi"; pakistan → "A short English or Urdu practice session"; ds-160 → "Can I complete the form in Urdu, Hindi or Bengali?"; nervous → "Preparing in a language you understand" |
| `/blog/spouse-visa-interview-questions-ir1-cr1` | documents-checklist → "Work, dependent, exchange and immigrant cases"; bangladesh and pakistan → the lines that already send family-petition readers to `/visa-types/family-immigrant` (add the spouse post next to it) |

Non-blog pages (`/languages`, `/visa-types/*`, `/visa-interview-practice/*`) could also link to the new posts, but that is a visible content change on product pages and is out of scope now.

## 6. Keep posts: small issues logged for the same future edit

| Post | Issue | Line |
|---|---|---|
| `f1-visa-mock-interview-online-7-day-plan` | "This free plan is available to readers everywhere" (X1); Day 7 checklist omits the I-901 receipt and DS-160 confirmation page (S5, S8); social media instruction (X2) | 102; Day 7 section |
| `free-ai-visa-mock-interview-online` | X1 at line 108; H2 "Free practice for Pakistan, India and Bangladesh" (line 104) narrower than the worldwide audience; typo "One free document Check" (stray capital) | 104-108, 140 |
| `b1-b2-visa-mock-interview-scenarios` | X1 at 109; X8 at 107; the "no final travel plans before a visa is issued" guidance (line 48) was seen only in an older visitor-page version (S16, medium): recheck | 48, 107, 109 |
| `visa-interview-follow-up-questions` | X1 at 88; consider a FAQ (none today, 630 words) | 88 |
| `visa-interview-nervous-forget-answer` | X1 at 60 | 60 |
| `mock-visa-interview-online` | No issues; metadata only | n/a |

## 7. Pre-publish checklist for any refresh

1. Recheck every travel.state.gov claim in a normal browser on the edit day (waivers, bonds, Proclamation 10998 status, residence rule, social media notice). Update the "as of" date in the copy.
2. Keep government fees dated and attributed (S15, S5); never imply the $44 VisaPrepper package includes government fees.
3. No approval guarantees; the consular officer decides; VisaPrepper is a preparation tool and does not give legal advice.
4. Keep FAQ JSON-LD matched to the visible FAQ.
5. Bump `updatedDate` only when content changed; keep `seoTitle`/`seoDescription` from metadata-plan.csv unless the body change alters the page's focus.
6. Resolve X1 (Bangladesh/worldwide) before touching the Bangladesh guide.
