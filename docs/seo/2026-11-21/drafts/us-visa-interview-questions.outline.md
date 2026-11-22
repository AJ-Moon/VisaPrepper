# Outline: US visa interview questions (generic hub)

Status: outline only, not a post. Prepared 2026-11-21. Priority **P1** (cluster G-QHUB in `../keyword-clusters.md`). Target URL: `https://visaprepper.com/blog/us-visa-interview-questions` (new; the URL does not exist yet).

## Metadata

| Field | Value | Notes |
|---|---|---|
| Title (visible H1, frontmatter `title`) | US Visa Interview Questions by Visa Type: What Each One Checks | 62 chars; also the Article `headline` (limit 110) |
| `seoTitle` | US Visa Interview Questions and How to Answer | 45 chars; renders as 59 with " \| VisaPrepper". Same as the `metadata-plan.csv` draft at the time of writing |
| Meta description (`seoDescription`, new SEO-only field) | Common US visa interview questions grouped by visa type (B1/B2, F1, H1B, H4, J1, family), what each one checks and how to answer from your own facts. | 149 chars. Same as the `metadata-plan.csv` draft at the time of writing |
| Visible `description` (shown in BlogPostHeader/BlogCard) | Common U.S. visa interview questions by visa type, what each one checks and how to prepare true, specific answers from your own application. | 140 chars |
| `slug` | us-visa-interview-questions | |
| `primaryKeyword` | US visa interview questions | |
| `market` | omit | Worldwide hub. The enum only allows pakistan, india, bangladesh |
| `tags` | ["interview-questions", "b1-b2", "f1", "h1b", "h4", "j1", "family"] | |
| `author` / `authorRole` | Visa Prepper Editorial Team / Visa interview preparation content team | Same as existing posts |

Frontmatter skeleton (existing MDX format; `seoDescription` works only once the uncommitted field in `lib/content/posts.ts` ships):

```yaml
---
title: "US Visa Interview Questions by Visa Type: What Each One Checks"
seoTitle: "US Visa Interview Questions and How to Answer"
seoDescription: "Common US visa interview questions grouped by visa type (B1/B2, F1, H1B, H4, J1, family), what each one checks and how to answer from your own facts."
slug: "us-visa-interview-questions"
description: "Common U.S. visa interview questions by visa type, what each one checks and how to prepare true, specific answers from your own application."
publishDate: "<publish date>"
author: "Visa Prepper Editorial Team"
authorRole: "Visa interview preparation content team"
primaryKeyword: "US visa interview questions"
tags: ["interview-questions", "b1-b2", "f1", "h1b", "h4", "j1", "family"]
faq: [see FAQ section below]
---
```

> Reconciliation note (2026-11-21): An untracked MDX draft with this slug appeared in the clone on 2026-11-21 (another workflow step, not this one). It uses the same H1 and seoTitle and this seoDescription: "US visa interview questions for B1/B2, F1, H1B, H4, J1 and family visas: what each one checks, likely follow-ups and how to answer from your own facts." Either description fits; keep one.

## Queries

| Query | Role | Volume (source, date) | Evidence |
|---|---|---|---|
| us visa interview questions | primary | India 1,000; Pakistan 140 (Semrush, research date 2026-09-08, separate databases, not summed) | Highest measured term in the map; no generic page exists. Today it falls to the India guide in the `in` database |
| visa interview questions | secondary | unknown | autocomplete 2026-11-21 |
| us embassy interview questions / embassy interview questions / consular interview questions | secondary | unknown | autocomplete 2026-11-21 |
| what to say in us visa interview / how to pass us visa interview questions | secondary | unknown | autocomplete 2026-11-21 |
| us visa interview preparation questions and answers | secondary | unknown | autocomplete 2026-11-21 |
| us visa interview questions for children / kids / minors / dependents | secondary | unknown | autocomplete 2026-11-21 |
| us visa interview questions for couples / housewife | secondary | unknown | autocomplete 2026-11-21 |
| "What are the 10 main interview questions?", "What is the best answer for why you want to go to the USA?" | People Also Ask phrasing to answer in headings or FAQ | n/a | Recurring PAA on F1, B1/B2, Pakistan and Nigeria SERPs (competitors.md, 2026-11-21) |

Organic difficulty: unknown (no difficulty data for this exact query in `gl=us`). Proxy only: the related SERP "us visa interview questions pakistan" (gl=pk, 2026-11-21) was soft, with video, UGC and document dumps in 7 of 8 organic slots. Semrush KD (third-party, 2026-09-08): 30 (in), 24 (pk).

## Target reader need

Someone with a U.S. visa interview coming up, often before they know which guide applies to them, wants to see the questions officers commonly ask, understand what each question is really checking, and learn how to answer from their own facts instead of memorizing sample answers. They then want to go deeper into their own visa type.

## Cannibalization guardrails

- This page owns the generic head ("us visa interview questions") and routes readers to the visa-type guides. Keep each visa-type section to roughly 120-200 words plus a link. The full question lists stay in the existing guides.
- Do not put a country in the title or H1. The India, Pakistan and Bangladesh guides keep their "<country>" wording; interlink both ways.
- Do not use "preparation" or "by embassy" in the title. `/blog/us-visa-interview-preparation-any-country` owns that wording.
- Do not repeat the follow-up drill or the nervousness routine. Link to `/blog/visa-interview-follow-up-questions` and `/blog/visa-interview-nervous-forget-answer`.
- No logistics (what to wear, appointment steps). They belong to official instructions and a possible later interview-day post.

## Outline (H2/H3)

1. **Intro (no heading):** no list can predict your questions; officers decide what to ask based on your application. This guide groups common topics by visa type and explains what each one checks.
2. **H2: What every U.S. visa interview is checking**
   - Most nonimmigrant applicants are presumed to be intending immigrants until they show otherwise (not H-1B, L or V); the burden is on the applicant (9 FAM 302.1-2).
   - 214(b) covers any unmet category requirement (for example F-1 funding), not only "ties".
   - The officer decides on the basis of your answers, your application and your documents (22 CFR 41.102(a)).
3. **H2: Questions almost every applicant hears**
   - H3: "Why are you going to the United States?"
   - H3: "Who is paying for the trip or program?"
   - H3: "What will you do after this trip or program?"
   - H3: "Have you travelled before? Have you ever been refused a visa?"
   - H3: "Who do you know in the United States?"
   - Each H3: what it checks, one fictional weak answer, one specific answer built from the reader's own facts.
4. **H2: Questions by visa type**
   - H3: B1/B2 visitors → link the B1/B2 guide (and the parents post once it exists)
   - H3: F1 students → link the F1 guide, the funding post and the 7-day plan
   - H3: H1B workers → link the H1B guide
   - H3: H4 dependents → link the H4 guide
   - H3: J1 exchange visitors → link the J1 guide
   - H3: Family-based immigrant visas → link `/visa-types/family-immigrant` (and the spouse post once it exists). One line: immigrant visas use the DS-260, not the DS-160.
5. **H2: Questions for children, older parents and couples applying together**
   - Since Oct 1, 2025, applicants under 14 and over 79 generally need an in-person interview (dated, medium confidence).
   - Each applicant has their own application; answers about shared plans should match because they come from the same real facts.
6. **H2: Follow-up questions: where answers get tested** (short, link the follow-up post)
7. **H2: If you were refused before** (two or three sentences, link the 214(b) guide; a refusal not overcome rules out an interview waiver)
8. **H2: How to prepare answers without memorizing a script**
   - Fact sheet, DS-160 review (link the DS-160 post), documents (link the checklist), answering aloud (link the nervousness post).
9. **H2: Guides by country and language**
   - India, Pakistan and Bangladesh guides; the worldwide preparation post; later the Philippines and Hindi/Urdu posts.
   - Do not invite Bangladeshi readers into the app (the app currently blocks Bangladesh nationals; see `../blog-refresh-recommendations.md` X1).
10. **H2: Practice with your own application** (CTA, see below)
11. **FAQ** (frontmatter `faq` only; the template renders it visibly after the body and builds FAQPage JSON-LD from it)

## Original examples and checklist ideas

- **"Question → what it checks → weak → specific" table** for the five common questions, using fictional applicants (labelled fictional): a visitor attending a niece's graduation, an F-1 student with a scholarship plus family support, an H-1B engineer at a client site, an H-4 spouse, a J-1 research scholar.
- **One-page fact sheet template:** trip or program dates, who pays which cost (with amounts and currency), job or studies at home, prior travel, prior refusals, U.S. contacts, and the DS-160 answer each line must match.
- **"Three-way match" check:** DS-160 answer ↔ document ↔ spoken answer, with three fictional mismatches (an employer name spelled differently, a trip length that changed, a sponsor who changed) and how to explain each truthfully.
- **Question-family map:** a simple table showing which question families each visa type adds (for example F1 adds program choice and academics; H1B adds role, worksite and petition; J1 adds sponsor and program category; family adds relationship history).
- **"Answer in 20 seconds, then stop" drill:** answer, pause, and let the follow-up come. Link the follow-up post for the full drill.

## Contextual internal links (all verified in `out/url-inventory.csv`, HTTP 200 on 2026-11-21)

- /blog/b1-b2-visa-interview-questions
- /blog/f1-visa-interview-questions-and-answers
- /blog/f1-visa-interview-who-will-pay
- /blog/f1-visa-mock-interview-online-7-day-plan
- /blog/h1b-visa-interview-questions
- /blog/h4-visa-interview-questions
- /blog/j1-visa-interview-questions
- /visa-types/family-immigrant
- /blog/visa-interview-follow-up-questions
- /blog/visa-interview-nervous-forget-answer
- /blog/214b-visa-refusal-guide
- /blog/ds-160-interview-consistency
- /blog/us-visa-interview-documents-checklist
- /blog/us-visa-interview-preparation-any-country
- /blog/us-visa-interview-questions-india
- /blog/us-visa-interview-questions-pakistan
- /blog/us-visa-interview-questions-bangladesh (informational link only; no app-access promise)
- /visa-interview-practice (commercial practice page)
- /visa-types (all supported U.S. categories)
- /document-checks
- /pricing
- /#interview-example (sample report on the homepage)

Add later, once published: /blog/b1-b2-visa-interview-questions-for-parents, /blog/spouse-visa-interview-questions-ir1-cr1, /blog/us-visa-interview-questions-philippines, /blog/us-visa-interview-in-hindi-urdu.

## Product CTA (preparation tool framing)

- Place one `<AppCTA label="Check my documents free" intent="free" />` after "How to prepare answers..." and rely on the template CTASection at the end.
- Copy direction: "VisaPrepper builds a practice interview from your own application and asks follow-up questions, then shows what to explain more clearly. Start with one free document check (eligible users). AI video interviews are in the one-time $44 USD package: six interviews and ten document checks, valid for 90 days. U.S. interview practice is available in English, Urdu or Hindi."
- Required framing: VisaPrepper is a preparation tool. It does not predict questions or outcomes, does not give legal advice, and the consular officer makes the decision.
- Do not say "free mock interview" anywhere.

## FAQ (visible; 3-4 questions)

1. *Is there an official list of U.S. visa interview questions?* Officers decide what to ask based on your application and answers; treat any list as practice topics, not a script. (Do not claim the State Department "says" this unless a source is found on the day of writing.)
2. *How long does a U.S. visa interview take?* No official duration exists; be ready for a short exchange with follow-ups.
3. *What if I do not understand a question?* Ask the officer to repeat or rephrase. Interpreter rules are set by each embassy; check your appointment instructions.
4. *Can practice guarantee approval?* No. Practice helps you explain true facts clearly; eligibility and the decision rest with the consular officer.

## Official sources to cite (all checked 2026-11-21)

| Claim | Source | Confidence |
|---|---|---|
| Presumption of immigrant intent; burden on applicant; 214(b) covers any category requirement | https://fam.state.gov/FAM/09FAM/09FAM030201.html (9 FAM 302.1-2) | high |
| Personal appearance ages 14-79; officer decides on representations, application and documents | https://www.ecfr.gov/current/title-22/section-41.102 | high |
| Interview waivers narrowed from Oct 1, 2025; under 14 and over 79 generally interview | https://travel.state.gov/content/travel/en/News/visas-news/interview-waiver-update-sept-18-2025.html | medium (direct fetch blocked; archived copy 2026-07-12) |
| Apply in country of nationality or residence; social media "public" instruction for F, M, J, H-1B, H-4 and other categories | https://in.usembassy.gov/visas/ and https://pk.usembassy.gov/visas/ (site notices) | high (read directly, HTTP 200) |
| B-2 includes visits with relatives; B-1 excludes local employment | https://www.ecfr.gov/current/title-22/section-41.31 | high |
| Officers may ask how education, living and travel costs will be paid (F-1) | https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html | medium |
| DS-160 confirmation page required at the interview | https://fam.state.gov/FAM/09FAM/09FAM040303.html | high |
| Immigrant visa interview: officer may require answers to any material question | https://www.ecfr.gov/current/title-22/section-42.62 | high |
| 214(b) refusal: may reapply at any time with new application and fee | https://fam.state.gov/FAM/09FAM/09FAM040310.html | high |

## Pre-publish checks

- Recheck the waiver and residence-rule pages in a normal browser and date the sentence ("as of <date>").
- Confirm every linked post still exists and its H1 still matches the anchor text used.
- The FAQ lives only in frontmatter `faq`: `app/blog/[slug]/page.tsx` renders it visibly (FAQAccordion) and the same array feeds FAQPage JSON-LD, so do not repeat it in the body.
- Add the hub link back from the existing guides only when the owner allows body edits (`../blog-refresh-recommendations.md`, section 5).
