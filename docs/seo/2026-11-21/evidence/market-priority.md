# VisaPrepper: market priority and country/language keywords (U.S. visa interview prep)

Prepared 2026-11-21. Scope: which applicant countries deserve priority for U.S. visa interview preparation content, and which country-modified searches each market shows. This is research only. No repo source file was edited.

Owner constraints applied throughout: no visible page-content changes and no design changes. The only actions recommended are SEO metadata changes and **new** MDX blog posts. Advice about existing articles is written as refresh notes for docs, not as body edits.

Data access in this session: no Google Search Console, no paid keyword APIs. Search volumes are only the prior Semrush rows dated 2026-09-08 from `docs/seo-keyword-map.md`, matched on exact keyword and country database. Everything else is `unknown`. Google Ads competition is not used anywhere, and no organic difficulty score is invented.

---

## 1. Sources and how they were obtained (all checked 2026-11-21)

`travel.state.gov` returned **HTTP 403 (Cloudflare bot check)** to curl, WebFetch and the in-app browser on 2026-11-21. I did not try to get past the bot check. Official files were therefore read from **Internet Archive copies of the official State Department URLs**. Each archive timestamp is listed below. The live "official URL" is given first, then the archived copy that was actually read.

| Data | Official URL | Copy read (archive timestamp) | Local file |
|---|---|---|---|
| FY2024 NIV issuances by visa class and nationality (annual "NIV Detail Table") | https://travel.state.gov/content/dam/visas/Statistics/Non-Immigrant-Statistics/NIVDetailTables/FY24NIVDetailTable.xlsx | web.archive.org/web/20260430115050/… | `out/statedept/FY24NIVDetailTable.xlsx` (sha256 ea8488b6…ae71a) |
| Listing page showing FY24 as the latest annual detail table | https://travel.state.gov/content/travel/en/legal/visa-law0/visa-statistics/nonimmigrant-visa-statistics.html | web.archive.org/web/20260628192306/… | `out/statedept/wayback-20260628-nonimmigrant-visa-statistics.html` |
| FY2025 monthly "NIV Issuances by Nationality and Visa Class" (Oct 2024 to Sep 2025, 12 XLSX files) | https://travel.state.gov/content/dam/visas/Statistics/Non-Immigrant-Statistics/MonthlyNIVIssuances/Excel/FY2025/<MONTH YEAR> - NIV Issuances by Nationality and Visa Class.xlsx | archive timestamps 20250122 to 20260430, one per file | `out/statedept/fy2025-monthly/*.xlsx` |
| FY2025 B-visa adjusted refusal rates by nationality | https://travel.state.gov/content/dam/visas/Statistics/Non-Immigrant-Statistics/RefusalRates/FY25.pdf | web.archive.org/web/20260117170931/… | `out/statedept/RefusalRates-FY25.pdf` |
| NIV applicants must schedule in country of nationality or residence | https://travel.state.gov/content/travel/en/News/visas-news/adjudicating-nonimmigrant-visa-applicants-in-their-country-of-residence-sep-6-2025.html and the current URL …/adjudicating-niv-applicants-in-their-country-of-residence.html | 20251010023448 ("Last Updated: October 9, 2025") and 20260706202729 ("Last Updated: December 12, 2025") | `out/statedept/wb-*-adjudicating-*.html` |
| Interview waivers narrowed (effective 2025-09-02, then 2025-10-01) | …/News/visas-news/interview-waiver-update-july-25-2025.html and …/interview-waiver-update-sept-18-2025.html | 20260701160024, 20260712090453 | `out/statedept/wb-*-interview-waiver-*.html` |
| Proclamation 10998 visa suspensions (effective 2026-01-01) | …/News/visas-news/suspension-of-visa-issuance-to-foreign-nationals-to-protect-the-security-of-the-united-states.html | 20260709215313 ("Last Updated: February 2, 2026") | `out/statedept/wb-*-suspension-*.html` |
| Countries subject to B1/B2 visa bonds | …/News/visas-news/countries-subject-to-visa-bonds.html | 20260713145749 ("Last Updated: May 13, 2026") | `out/statedept/wb-*-visa-bonds.html` |
| Visa services paused in Juba, Kinshasa and Kampala | …/News/visas-news/temporary-pause-of-visa-operations.html | 20260711011558 ("Last Updated: May 18, 2026") | `out/statedept/wb-*-temporary-pause-*.html` |
| Interview-language evidence: post supplements (IV interview instructions) for New Delhi, Islamabad, Manila, Kathmandu, Accra, Nairobi, Lagos, Dhaka, Colombo | travel.state.gov/content/travel/en/us-visas/Supplements/Supplements_by_Post/<POST>.html | archive timestamps 20260430 to 20260713 | `out/embassy/supp-*.html` |
| Interview-language evidence: embassy pages (fetched live, HTTP 200) | bd.usembassy.gov/interview-steps/ · vn.usembassy.gov/frequently-asked-questions-nonimmigrant-visas/ · br.usembassy.gov/frequently-asked-questions-on-non-immigrant-visas/ · do.usembassy.gov/interpreter-guidance-for-visa-applicants/ · tr.usembassy.gov/niv-interview-guidelines/ · lk.usembassy.gov/visas/important-visa-information/ | live, 2026-11-21 | `out/embassy/*.html` |
| Country-modifier searches | Google autocomplete `suggestqueries.google.com/complete/search?client=firefox&hl=<hl>&gl=<cc>` | live, 2026-11-21 11:15 to 11:30 UTC (270 seeds, 12 markets plus a gl=us baseline) | `out/autocomplete/market-autocomplete-2026-11-21.jsonl` |

**FY2025 caveat.** No official **annual** FY2025 detail table was found. The latest archived listing page, dated 2026-06-28, still shows FY24 as the newest annual table. The live page could not be checked on 2026-11-21. The "FY2025" figures below are **my sum of the 12 official monthly tables** for October 2024 to September 2025. They are not the official annual table, which may contain revisions.

**What the numbers measure.** These are visas **issued** by nationality, not applicants, interviews or refusals. For visitor (B) visas, I also give a rough count of B applications decided: FY2025 B issuances ÷ (1 − FY2025 adjusted B refusal rate). It is a heuristic, not an official figure. The adjusted refusal rate is defined per applicant and adjusted for refusals that were later overcome. No comparable refusal rates were used for F, H or J visas.

B-visa total = `B1 + B1/B2 + B2`. Mexico's `BBBCC`/`BBBCV` border-crossing cards are excluded: 1,911,752 in FY2024 and 2,004,876 in FY2025.

---

## 2. Policy context that changes market priority (official, dated)

1. **Interview in your own country (since 2025-09-06).** The State Department says nonimmigrant applicants "should schedule their visa interview appointments at the U.S. Embassy or Consulate in their country of nationality or residence". Applicants who book elsewhere "might find that it will be more difficult to qualify". Fees are not refunded or transferred. In the Dec 12, 2025 version, nationals of 19 listed countries use designated posts: Afghanistan → Islamabad, Iran → Dubai, Venezuela → Bogota, and so on. Source: the Sep 6, 2025 notice (copy last updated Oct 9, 2025) and the current notice (copy last updated Dec 12, 2025). *Impact:* preparation content needs to match the applicant's home or residence post. Content for Gulf residents who are not nationals is now a distinct, valid audience.
2. **Far fewer interview waivers.** From 2025-09-02, superseded on 2025-10-01, nearly all NIV applicants, including those under 14 and over 79, "will generally require an in-person interview". The main exception is renewing a full-validity B visa or BCC (and H-2A) within 12 months. *Impact:* more people now need a real interview, which increases demand for practice.
3. **Visa suspensions under Proclamation 10998 (effective 2026-01-01).** Full suspension for 19 nationalities. Partial suspension of **B-1/B-2, F, M and J** visas for 19 more, **including Nigeria**, Angola, Côte d'Ivoire, Senegal, Tanzania, Zambia, Zimbabwe, Venezuela and Cuba. This is as of the archived page dated Feb 2, 2026. Status on 2026-11-21 is unknown because the live page was blocked.
4. **B1/B2 visa bonds of $5,000, $10,000 or $15,000**, set at the interview, for listed nationalities. The list includes **Bangladesh and Nepal** (from 2026-01-21), **Nigeria** (2026-01-21), **Ethiopia** (2026-04-02) and **Uganda** (2026-01-21). Source: archived list dated May 13, 2026.
5. **Visa services paused** at Kampala, Kinshasa and Juba from 2026-05-18 (Ebola). Source: archived notice dated May 18, 2026.

---

## 3. Official volume: top nationalities by visa class

FY2024 is the official annual table. FY2025 is the sum of the 12 official monthly tables. Shares are of all nationalities.

#### B-1, B-1/B-2, B-2 combined

| Rank | FY2024 nationality | FY2024 issuances | Share | FY2025 nationality | FY2025 issuances | Share |
|---:|---|---:|---:|---|---:|---:|
| 1 | Brazil | 1,117,727 | 17.1% | India | 964,981 | 15.0% |
| 2 | India | 899,606 | 13.8% | China - mainland | 942,541 | 14.7% |
| 3 | China - mainland | 649,238 | 9.9% | Brazil | 878,501 | 13.7% |
| 4 | Colombia | 437,784 | 6.7% | Colombia | 550,706 | 8.6% |
| 5 | Argentina | 273,335 | 4.2% | Argentina | 268,145 | 4.2% |
| 6 | Ecuador | 228,585 | 3.5% | Dominican Republic | 183,608 | 2.9% |
| 7 | Philippines | 157,165 | 2.4% | Ecuador | 181,627 | 2.8% |
| 8 | Dominican Republic | 152,456 | 2.3% | Peru | 130,020 | 2.0% |
| 9 | Peru | 133,142 | 2.0% | Vietnam | 122,045 | 1.9% |
| 10 | Vietnam | 119,373 | 1.8% | Philippines | 120,503 | 1.9% |
| 11 | Turkey | 111,041 | 1.7% | Turkey | 112,813 | 1.8% |
| 12 | Pakistan | 107,399 | 1.6% | Guatemala | 105,509 | 1.6% |
| | **All nationalities** | **6,541,622** | | **All nationalities** | **6,417,533** | |

Pakistan was #14 in FY2025 with 74,159 (−31%). Nigeria was #18 with 53,973 (−26%).

#### F-1

| Rank | FY2024 nationality | FY2024 issuances | Share | FY2025 nationality | FY2025 issuances | Share |
|---:|---|---:|---:|---|---:|---:|
| 1 | India | 86,067 | 21.5% | China - mainland | 58,897 | 20.5% |
| 2 | China - mainland | 82,654 | 20.6% | India | 40,077 | 13.9% |
| 3 | Vietnam | 18,454 | 4.6% | Vietnam | 15,808 | 5.5% |
| 4 | Korea, South | 14,786 | 3.7% | Korea, South | 11,861 | 4.1% |
| 5 | Nepal | 13,184 | 3.3% | France | 7,222 | 2.5% |
| 6 | Japan | 8,775 | 2.2% | Brazil | 7,201 | 2.5% |
| 7 | France | 7,553 | 1.9% | Japan | 6,913 | 2.4% |
| 8 | Brazil | 7,431 | 1.9% | Nepal | 6,361 | 2.2% |
| 9 | Taiwan | 7,365 | 1.8% | Mexico | 6,040 | 2.1% |
| 10 | Italy | 6,534 | 1.6% | Taiwan | 6,035 | 2.1% |
| 11 | Mexico | 6,422 | 1.6% | Italy | 6,009 | 2.1% |
| 12 | Nigeria | 6,175 | 1.5% | Germany | 5,535 | 1.9% |
| | **All nationalities** | **400,737** | | **All nationalities** | **287,872** | |

Bangladesh was #13 in both years (6,089 then 5,160). Pakistan was #18 then #16 (4,483 then 4,191). F-1 issuances to Indian nationals fell **53%** and to Nepali nationals **52%** from FY2024 to FY2025.

#### H-1B

| Rank | FY2024 nationality | FY2024 issuances | Share | FY2025 nationality | FY2025 issuances | Share |
|---:|---|---:|---:|---|---:|---:|
| 1 | India | 150,647 | 68.6% | India | 148,298 | 69.1% |
| 2 | China - mainland | 31,735 | 14.4% | China - mainland | 27,680 | 12.9% |
| 3 | Philippines | 3,562 | 1.6% | Philippines | 3,350 | 1.6% |
| 4 | Korea, South | 2,289 | 1.0% | Korea, South | 2,329 | 1.1% |
| 5 | Mexico | 1,954 | 0.9% | Mexico | 2,230 | 1.0% |
| 6 | Taiwan | 1,830 | 0.8% | Taiwan | 2,048 | 1.0% |
| 7 | Brazil | 1,801 | 0.8% | Brazil | 1,899 | 0.9% |
| 8 | Pakistan | 1,664 | 0.8% | Great Britain and Northern Ireland | 1,584 | 0.7% |
| 9 | Great Britain and Northern Ireland | 1,462 | 0.7% | Pakistan | 1,540 | 0.7% |
| 10 | France | 974 | 0.4% | France | 1,029 | 0.5% |
| | **All nationalities** | **219,659** | | **All nationalities** | **214,591** | |

H-4 is even more concentrated: India had 108,930 (77.9%) in FY2024 and 113,089 (77.4%) in FY2025.

#### J-1

| Rank | FY2024 nationality | FY2024 issuances | Share | FY2025 nationality | FY2025 issuances | Share |
|---:|---|---:|---:|---|---:|---:|
| 1 | Mexico | 17,707 | 5.5% | Great Britain and Northern Ireland | 16,462 | 5.6% |
| 2 | Great Britain and Northern Ireland | 15,903 | 4.9% | Mexico | 16,316 | 5.6% |
| 3 | China - mainland | 14,297 | 4.4% | China - mainland | 13,464 | 4.6% |
| 4 | Germany | 14,219 | 4.4% | Germany | 12,948 | 4.4% |
| 5 | Spain | 13,257 | 4.1% | Spain | 12,896 | 4.4% |
| 6 | Colombia | 12,658 | 3.9% | France | 10,879 | 3.7% |
| 7 | India | 12,080 | 3.7% | Brazil | 10,523 | 3.6% |
| 8 | Brazil | 11,862 | 3.7% | Jamaica | 10,300 | 3.5% |
| 9 | France | 11,781 | 3.6% | Thailand | 9,701 | 3.3% |
| 10 | Jamaica | 10,477 | 3.2% | Colombia | 9,345 | 3.2% |
| | **All nationalities** | **322,820** | | **All nationalities** | **292,696** | |

J-1 demand is spread thinly across many countries, led by European and Latin American nationals. It is not a reason to prioritize any single country market. Jamaica's high J-1 rank (#8 in FY2025) is the one notable English-speaking exception.

Full per-nationality files: `out/statedept/fy24-niv-by-nationality-core-classes.csv` and `out/statedept/fy25-niv-by-nationality-core-classes-from-monthly.csv`.

---

## 4. Ranked market list

**Method.** Interview-demand proxy = rough count of B applications decided (FY2025) + F-1 + H-1B + H-4 + J-1 issuances (FY2025). This is multiplied by a **language-fit weight** and a **policy weight**. Both weights are my editorial judgments, shown openly so they can be challenged. They are not data.

- Language-fit weight: 1.0 when the post interviews in a language the product supports beyond English (Hindi or Urdu) as well as English. 0.8 when a post source shows English is the default interview language. 0.5 to 0.6 when English is an offered option alongside a local language the product lacks. 0.5 when unknown. 0.1 to 0.25 when the market is language-mismatched (Spanish, Portuguese, Chinese, Vietnamese, Turkish, Arabic).
- Policy weight: 0.2 for active B/F/J suspensions or paused posts. 0.9 for B1/B2 visa-bond countries. Otherwise 1.0.
- "Likely English" appears only where a cited source says English is handled at that post. Otherwise the cell says `unknown`.

| # | Market | FY25 core-5 issuances (FY24) | FY25 B adj. refusal | Rough B applications decided | Interview language evidence (source) | Product language fit | Existing site pages | Policy flags | Weighted score | Recommendation |
|---:|---|---:|---:|---:|---|---|---|---|---:|---|
| 1 | **India** | 1,275,059 (1,257,330) | 22.04% | ~1,237,790 | Likely English; also Hindi, Punjabi, Malayalam, Tibetan, Tamil handled without interpreter (New Delhi supplement) | **English + Hindi (+Urdu)** | `/visa-interview-practice/india`, `/blog/us-visa-interview-questions-india` | none found | 1,547,868 | **Deepen with new India-specific posts** (parents' B1/B2; H-1B/H-4 stamping; Hindi-intent) |
| 2 | **Pakistan** | 83,300 (117,364) | 52.32% | ~155,535 | Likely English; also Urdu (Islamabad supplement) | **English + Urdu** | `/visa-interview-practice/pakistan`, `/blog/us-visa-interview-questions-pakistan` | none found | 164,676 | **Deepen with new posts** (visit-visa/family visit; F-1 experience; Urdu-intent) |
| 3 | **Philippines** | 132,782 (170,513) | 30.76% | ~174,037 | Likely English; or Filipino (Manila supplement) | English only | none (worldwide pages) | none found | 111,790 | **New country post: highest-value new market** |
| 4 | Jamaica | 82,172 (97,042) | 44.26% | ~125,506 | unknown (no post language statement retrieved) | English | none | none found | 68,860 | Worldwide pages for now; candidate post after language and search-intent check |
| 5 | **Ghana** | 19,164 (29,069) | 64.34% | ~41,054 | Likely English; interpreter only if applicant lacks English (Accra supplement) | English | none | none found | 36,462 | New country post, second wave |
| 6 | **Kenya** | 14,487 (19,621) | 68.23% | ~36,185 | Likely English; interpreter only if applicant lacks English (Nairobi supplement) | English | none | none found | 31,341 | New country post, second wave |
| 7 | **Bangladesh** | 34,282 (43,040) | 61.45% | ~73,025 | Bangla or English; "English competency is not a requirement" (bd.usembassy.gov) | English; Bengali "coming soon" | `/blog/us-visa-interview-questions-bangladesh` | B1/B2 visa bond from 2026-01-21 | 28,496 | Served by existing guide; new posts on visa bond and F-1; priority rises when Bengali ships |
| 8 | **Nepal** | 24,343 (39,335) | 69.47% | ~53,796 | Likely English; or Nepali (Kathmandu supplement) | English only | none | B1/B2 visa bond from 2026-01-21 | 27,772 | **New F-1-led country post** |
| 9 | Nigeria | 60,443 (81,491) | 57.00% | ~125,519 | unknown (Lagos supplement does not name a language) | English | none | **B-1/B-2, F, M, J partially suspended (PP 10998, from 2026-01-01); visa bond** | 13,199 | **Do not invest now**; worldwide and H-1B/H-4 pages; recheck policy status |
| 10 | Vietnam | 139,736 (139,926) | 22.08% | ~156,629 | Vietnamese or English, at applicant's choice. F-1 students whose I-20 shows English proficiency may be asked to demonstrate it (vn.usembassy.gov) | English only | none | none found | 43,580 | Worldwide F-1 posts only; mismatched language for visitors |
| 11 | Sri Lanka | 9,582 (11,521) | 33.35% | ~12,804 | Sinhala or Tamil without interpreter; English unknown (lk.usembassy.gov) | English | none | none found | 4,156 | Worldwide pages |
| 12 | Ethiopia | 18,354 (22,376) | 53.64% | ~36,048 | unknown | English | none | visa bond from 2026-04-02 | 10,176 | Worldwide pages |
| 13 | Uganda | 6,295 (7,995) | 57.58% | ~11,898 | unknown | English | none | **Kampala visa services paused from 2026-05-18**; visa bond | 789 | Worldwide pages |
| — | Gulf residents (UAE etc., non-nationals) | n/a (issuance data is by nationality; post-level data not analysed) | n/a | n/a | unknown | English/Urdu/Hindi fit for South Asian residents | `/blog/us-visa-interview-preparation-any-country` | residence rule (see §2) | n/a | Candidate worldwide post; autocomplete shows UAE-resident preparation queries (see §6) |

Weighted-score table with all columns: `out/statedept/market-priority-table.csv`.

### Large but language-mismatched (do not prioritize for country posts)

| Market | FY25 core-5 issuances | Why not a priority now |
|---|---:|---|
| China - mainland | 1,047,033 | No Chinese interview support. Interview language unknown. Google search access in mainland China is limited (general knowledge, not verified in this run). |
| Brazil | 899,327 | Interviews in "Portuguese or English" (br.usembassy.gov FAQ). No Portuguese support. |
| Colombia | 565,033 | Spanish-speaking market; no Spanish support. Also the designated post for Venezuelan nationals. |
| Argentina, Ecuador, Dominican Republic, Peru, Guatemala, Costa Rica, Honduras, El Salvador | 54,829 to 277,184 each | Spanish; the Dominican Republic post interviews in "Spanish and English". No Spanish support. |
| Mexico | 53,544 (+2,004,876 BCC) | Spanish; most visitor issuances are BCCs. |
| Turkey | 123,507 | Ankara interviews in Turkish, Farsi, Arabic and English. No Turkish support. |
| Egypt, Saudi Arabia | 38,970; 52,675 | Arabic; no Arabic support. Interview language unknown. |

One sensible exception within these markets: **F-1 students.** The Vietnam embassy says students whose I-20 shows English proficiency should be ready to demonstrate it. English F-1 practice is therefore useful even in non-English markets. The existing worldwide F-1 posts should serve these students. No country post is needed.

---

## 5. Which markets justify a new country-specific post

| Market | New post? | Proposed slug (new MDX only) | Evidence |
|---|---|---|---|
| Philippines | **Yes, first** | `/blog/us-visa-interview-questions-philippines` | 120,503 B issuances in FY2025; ~174k rough B applications decided; English or Filipino at Manila; rich preparation-intent autocomplete (see §6) |
| Nepal | **Yes** (F-1 led) | `/blog/f1-visa-interview-nepal` | F-1 rank #5 FY24 and #8 FY25; 69.47% B refusal rate; visa bond; autocomplete centres on "f1 visa interview nepal". The seed "us visa interview questions nepal" returned no suggestions |
| India | **Yes**, topic posts (not more country landing pages) | e.g. `/blog/b1-b2-visa-interview-questions-for-parents-india`; `/blog/h1b-h4-visa-stamping-interview-india`; `/blog/us-visa-interview-questions-in-hindi` | India is #1 for B (FY25), H-1B (69%) and H-4 (77%); autocomplete shows parents, H-1B/H-4 and Hindi intents |
| Pakistan | **Yes**, topic posts | e.g. `/blog/us-visit-visa-interview-pakistan`; `/blog/f1-visa-interview-pakistan` | 52% B refusal rate; autocomplete for "us visit visa interview pakistan" and "f1 visa interview experience pakistan" |
| Bangladesh | Topic posts only | e.g. `/blog/us-visa-bond-interview` (worldwide, dated); Bengali-intent post only after Bengali interviews launch | Many "us visa bond bangladesh" variants; Bengali-script "আমেরিকা ভিসা ইন্টারভিউ প্রশ্ন এবং উত্তর" |
| Ghana, Kenya | Second wave | `/blog/us-visa-interview-questions-ghana`, `/blog/us-visa-interview-questions-kenya` | English-default posts; high refusal rates; lower volume; thin preparation autocomplete (§6) |
| Gulf residents | Optional worldwide post | e.g. `/blog/us-visa-interview-as-a-resident-uae` | Residence rule (§2.1); "us visa interview questions in dubai" and "us visa for indian uae residents" in gl=ae autocomplete |
| Nigeria, Jamaica, Vietnam, Sri Lanka, Ethiopia, Uganda | No (worldwide pages) | n/a | Policy restriction (Nigeria, Uganda), unverified language (Jamaica), language mismatch (Vietnam), or low volume |

Implementation note for new posts: `lib/content/posts.ts` limits `market` to `pakistan | india | bangladesh`. New Philippines, Nepal, Ghana or Kenya posts must **omit `market`**. They will then list in the general blog grid. Adding enum values would be a code change, which is outside this workflow. Use `seoTitle` for `<title>`. The frontmatter `description` is shown on the page, so write it as visible copy. The working tree of the clone now has an uncommitted `seoDescription` field in `lib/content/posts.ts` and `app/blog/[slug]/page.tsx`. That change was made by another workflow step, not by this research. If it ships, new posts can also set `seoDescription` for the meta description.

---

## 6. Country-modifier keyword findings (Google autocomplete, 2026-11-21)

**Method.** 270 seeds were run on 2026-11-21 between 11:15 and 11:22 UTC, all with HTTP status ok. 94 seeds returned no suggestions. Seed patterns: "us visa interview questions <country>", "f1 visa interview <country>", "b1/b2 visa interview <country>", "us visa interview <country> experience", "us embassy <city> interview", "us visa interview <city>", native-script and "in <language>" phrasing, plus policy seeds (bond, ban, waiver). Each market used its own `gl`. `out/kw-markets.csv` has 720 rows: 710 unique suggestions left after filtering out non-U.S.-visa noise, plus 10 Semrush rows carried from 2026-09-08. Of these, 404 rows have a candidate target URL. The rest are navigational, official-process, policy or broad head terms and are marked `none (...)`. **Every country-modified volume is `unknown`** unless an exact 2026-09-08 Semrush row exists.

**Patterns that hold across markets**
- Country-modified autocomplete is **dominated by appointment and logistics queries**: wait time, login, address, slots, dates. VisaPrepper should not target these.
- Preparation intent shows up as "questions and answers", "tips", "how to pass", "what to bring", "attire/dress code" and "experience".
- "<country> reddit" variants appear in almost every market, which suggests forum results compete for these searches. The SERPs were not checked in this run.
- "mock visa interview <country>" returned **no suggestions in any market**. The one country-modified mock query was India's "f1 visa mock interview online free india". In the gl=us baseline, mock and practice intent is **not country-modified**: "mock visa interview ai", "visa mock interview online free", "visa interview practice with ai". Keep commercial or practice targeting on the worldwide product and blog pages, not on country posts.
- The gl=us baseline surfaced **"b1 b2 visa interview questions for parents in india"**, "us visa interview questions for parents" and "b1 b2 visa interview questions for siblings". The parents' visitor-visa angle is visible even without a country seed.

### India (gl=in): existing coverage; deepen with topic posts
- Preparation: "us visa interview questions india", "questions asked in us visa interview in india", "us visa interview tips india", "us b1 b2 visa interview questions india", **"b1 b2 visa interview questions for indian parents"**, "b1 b2 visa interview questions for parents in india", "latest b1 b2 visa interview questions in india", "how to prepare for us visa interview in india", "us visa interview experience india".
- Work visas: "h1b visa interview india experience", "us h1b visa interview experience india", "h4 visa interview india", "h4 visa stamping india", "us visa interview waiver india h1b".
- Hindi intent, typed in Latin script: "us visa interview questions in hindi", "us visa interview questions and answers for b1 b2 in hindi", "us tourist visa interview questions and answers in hindi". The Devanagari seed "अमेरिका वीजा इंटरव्यू" returned mostly English suggestions such as "american visa interview questions in hindi". The second Devanagari seed returned nothing.
- Refusal: "us visa rejection indian family", "us visa rejection indian student", "us visa denial indian homemaker reddit".
- Cities (Mumbai, New Delhi, Chennai, Hyderabad, Kolkata): mostly address, timing and wait-time queries. A few preparation fragments: "us embassy mumbai interview questions", "us visa interview chennai questions", "us visa interview chennai dress code", "us consulate hyderabad interview experience".
- Semrush (in, 2026-09-08): us visa interview questions 1,000 (KD 30); f1 student visa interview questions 480 (KD 16); h1b visa interview questions 590 (KD 26); h4 visa interview questions 390 (KD 17); documents required for us visa interview 720 (KD 41); us tourist visa interview questions 320 (KD 20).
- Targets: `/blog/us-visa-interview-questions-india` and `/visa-interview-practice/india` (Hindi). New post candidates: (1) B1/B2 interview for parents visiting children in the U.S.; (2) H-1B/H-4 visa stamping interview in India; (3) U.S. visa interview questions in Hindi, as an English article with correctly marked Hindi practice prompts and no fake translation.

### Pakistan (gl=pk): existing coverage; deepen with topic posts
- "us visa interview questions and answers pakistan", **"us b1 b2 visa interview questions and answers pakistan"**, **"us visit visa interview pakistan"**, "usa visit visa interview in pakistan", "documents required for us visa interview b1 b2 pakistan", "f1 visa interview experience pakistan", "f1 visa interview pakistan reddit", "h1b visa stamping pakistan", "us embassy islamabad interview questions".
- Refusal: "us visa rejection rate pakistan 2025", "us visa refusal rate pakistan". An official figure can answer this: the FY2025 adjusted B refusal rate for Pakistan is 52.32%.
- Urdu intent in Latin script: "us visa interview questions in urdu", "us visa interview questions for tourist in urdu". Urdu-script seeds returned nothing.
- Semrush (pk, 2026-09-08): us visa interview questions 140 (KD 24); usa visitor visa interview questions 90 (KD 26); us visa interview questions pakistan 30 (KD 0, uncertain).
- Targets: `/blog/us-visa-interview-questions-pakistan` and `/visa-interview-practice/pakistan` (Urdu). New post candidates: a "US visit visa interview from Pakistan" post on family visits, and an F-1 interview post for Pakistani students.

### Philippines (gl=ph): strongest new-market preparation intent
- "us visa interview questions philippines", "common questions in us visa interview philippines", "sample questions for us visa interview philippines", "us visa interview questions and answers for b1 b2 philippines", "how to pass us tourist visa interview philippines", "tips to pass us visa interview philippines", "what to bring in us visa interview philippines", "us visa interview philippines attire", "what to wear in us visa interview philippines", "us embassy manila interview questions", "us embassy manila interview checklist", "us visa denied philippines", "philippines us visa refusal rate".
- Volume: unknown (no Semrush ph data).
- Target: **NEW `/blog/us-visa-interview-questions-philippines`**, a visitor-led post with an F-1 section. Use the FY2025 B refusal rate (30.76%) and Manila's English or Filipino interviews as sourced facts. Keep attire and logistics short and point to official instructions.

### Nepal (gl=np): F-1-led new post
- "f1 visa interview nepal", "f1 visa interview experience nepal", "f1 visa interview nepal reddit", "documents required for f1 visa interview in nepal", "f1 visa interview date in nepal", "f1 visa nepal", "us visa bond nepal", "us visa bond for nepalese", "us visa bond pilot program nepal", "us visa rejection rate nepal".
- No suggestions for "us visa interview questions nepal", "b1 b2 visa interview questions nepal", "us visa interview questions in nepali" or either Nepali-script seed.
- Target: **NEW `/blog/f1-visa-interview-nepal`**. Sourced facts: F-1 issuances 13,184 (FY2024) and 6,361 (FY2025); B refusal rate 69.47%; English or Nepali at Kathmandu; B1/B2 visa bond from 2026-01-21. Mention the bond only with the dated official source.

### Bangladesh (gl=bd): existing guide; topic posts on bond and Bengali
- English preparation intent is thin. "us visa interview questions bangladesh" and "f1 visa interview questions bangladesh" returned no suggestions. Found instead: "us embassy dhaka interview preparation", "us embassy dhaka interview checklist", "how to pass us tourist visa interview".
- Visa bond (many variants): "us visa bond bangladesh", "us visa bond for bangladeshi", "us tourist visa bond for bangladeshi", "how to pay us visa bond from bangladesh", "us visa bond for bangladesh is that permanent", "us adds bangladesh to visa bond list". Also "us visa bangladesh ban".
- Bengali script: "আমেরিকা ভিসা ইন্টারভিউ প্রশ্ন এবং উত্তর" (questions and answers), "আমেরিকা টুরিস্ট ভিসা ইন্টারভিউ প্রশ্ন", "আমেরিকা ভিজিট ভিসা ইন্টারভিউ".
- Semrush (bd, 2026-09-08): american visa interview questions 30 (KD 0); f1 visa interview bangladesh 30 (KD 0).
- Targets: the existing Bangladesh guide, plus a candidate worldwide post on the B1/B2 visa bond and the interview. That post would serve Bangladesh, Nepal, Nigeria and the other listed countries, dated and citing the State Department list. A Bengali-intent post should wait until Bengali interviews launch, so the page does not promise an unavailable feature.

### Ghana (gl=gh) and Kenya (gl=ke): second wave
- Ghana: "us embassy ghana interview questions", "f1 visa interview in ghana", "ghanaian student us visa denied", "us visa refusal rate in ghana", "us visa ghana ban", "us ghana visa restrictions". The rest is appointments.
- Kenya: "us visa interview questions in kenya", "us student visa requirements for kenyan citizens", "us visa rejection rate kenya", "us embassy nairobi interview".
- Both are thin on preparation intent and have no volume data. Treat new posts as second wave. They are justified by English-default interviews and B refusal rates of 64% and 68%, not by observed search depth.

### Nigeria (gl=ng): policy-dominated; no country post
- "us visa ban nigeria 2026", "has us visa ban on nigeria been lifted", "us visa ban nigeria update", "us visa bond for nigerians", "us introduces $15000 visa bond for nigerians", "documents required for f1 visa interview in nigeria", "reasons for us visa refusal in nigeria".
- Proclamation 10998 partially suspends Nigerian B, F and J visas (§2), so search interest is mainly policy news. VisaPrepper should not chase this. The worldwide F-1, B1/B2 and refusal pages are enough.

### Jamaica (gl=jm), Sri Lanka (gl=lk), Vietnam (gl=vn)
- Jamaica: "us embassy jamaica interview questions and answers". Otherwise appointments. "h1b visa stamping in jamaica for indian citizens" suggests Indian interest in third-country stamping. The residence rule (§2.1) affects that.
- Sri Lanka: "us visa interview questions in sri lanka", "us visa interview sri lanka reddit". Thin.
- Vietnam: English seeds are sparse. Vietnamese queries include "phỏng vấn visa mỹ bằng tiếng anh hay tiếng việt" ("interview in English or Vietnamese?"), "câu hỏi phỏng vấn visa mỹ tiếng anh", "câu hỏi phỏng vấn visa mỹ f1" and "câu hỏi phỏng vấn visa mỹ du học". The language mismatch is confirmed. Serve F-1 students through the worldwide F-1 posts only.

### Gulf residents (gl=ae): possible worldwide post
- "us visa interview questions in dubai", "us visa interview questions and answers dubai", "us visit visa interview dubai", "documents required for us visa interview b1 b2 dubai", "us visa for indian uae residents", "us visa appointment for indians in dubai", "h1b visa stamping in dubai for indian", "can i apply for us visa from dubai".
- "us visa interview dubai for pakistani" returned nothing.
- Candidate: a worldwide new post on interviewing as a resident (not a national) under the residence rule. It would use Dubai and Abu Dhabi as examples, cite the residence-proof requirement and the "more difficult to qualify" warning from §2.1, and link the India and Pakistan practice pages for language support. Medium priority. Size it first with "NIV Issuances by Post" data.

---

## 7. Metadata-only and docs-only follow-ups tied to markets (within owner constraints)

- `content/blog/us-visa-interview-questions-bangladesh.mdx` has **no `seoTitle`**, so `<title>` falls back to the visible `title`. A metadata-only fix is to add `seoTitle`, for example "US Visa Interview Questions in Bangladesh (F1, B1/B2)". Check rendering before shipping.
- Refresh notes for docs only, with no body edits. **India** guide: F-1 issuances fell 53% in FY2025; add a parents' B1/B2 section to a future new post rather than editing the guide. **Pakistan** guide: B issuances fell 31% and the B refusal rate was 52.32% in FY2025. **Bangladesh** guide: mention the visa bond (from 2026-01-21) and Bangla-or-English interviews in a new post. All three guides should point to the residence rule (§2.1) the next time the owner approves a body refresh.
- Do **not** create city or consulate landing pages for Mumbai, Chennai, Hyderabad, Delhi or Kolkata. Most autocomplete suggestions for those cities are about addresses, wait times and appointments, which belong to official channels. Separate city pages would add doorway risk, and the prior SEO doc already ruled them out.
- `hreflang`: country practice pages already declare `en-IN` and `en-PK`. Add no new alternates for Philippines or Nepal blog posts, because they would be English articles, not localized duplicates.

---

## 8. Data gaps and caveats

- `travel.state.gov` was blocked by a Cloudflare bot check on 2026-11-21. Policy status after each archive date is **unknown**, especially Proclamation 10998, visa bonds and the Kampala pause. Recheck in a normal browser before publishing any policy claim.
- No official FY2025 annual NIV detail table was found. FY2025 = sum of monthly tables.
- Issuances are not applicants. Rough B application counts use B refusal rates only. F, H and J applications decided are unknown.
- Interview-language evidence comes mostly from post supplements written for **immigrant-visa** interviews, used as a proxy for which languages a post handles. NIV-specific statements were found only for Bangladesh, Vietnam, Brazil, the Dominican Republic and Turkey.
- Search volumes are unknown for every country-modified keyword. The only volumes are the Semrush rows dated 2026-09-08 (pk/in/bd). Autocomplete shows that a query exists, not how often it is searched. No organic difficulty data exists beyond those Semrush KD values.
- No GSC data, so no impressions or click baselines by country.
- Gulf-resident volume (by post) was not analysed. The State Department also publishes "NIV Issuances by Post and Visa Class", which could size Dubai and Abu Dhabi.
- No fetched page, SERP or file contained instructions addressed to the agent.
