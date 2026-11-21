# Official U.S. visa facts reference for Visa Prepper writers and reviewers

Checked: **2026-11-21** (every row below was checked on this date).
Scope: U.S. nonimmigrant visas (B1/B2, F-1, J-1, H-1B/H-4), the facts Visa Prepper blog posts and new articles are most likely to mention.
Rule for use: cite the official URL in the row, keep the "checked" date in any doc or review note, and re-check anything marked **medium** or **unverified** before publishing a specific number or date.

## How this was checked (read first)

- **Blocked to automation (HTTP 403 on 2026-11-21):** travel.state.gov (old `/content/travel/...` and new `/en/newsroom/...` paths), usembassy.gov embassy sites, www.state.gov, and congress.gov HTML pages. For these, the official page was found with web search and only the search excerpt was seen. Those rows are marked **medium** and say "direct fetch blocked". No browser-header spoofing or other workaround was used.
- **Read directly (primary text):** Federal Register (API metadata + full text from govinfo.gov), Public Law 119-21 (govinfo.gov), eCFR (22 CFR, current to 2026-11-19), the State Department's Foreign Affairs Manual (fam.state.gov, 9 FAM), uscis.gov, ice.gov, whitehouse.gov, studyinthestates.dhs.gov, and a CRS report PDF (congress.gov). Rows from these are **high** unless noted.
- **Confidence key:** high = primary official text read directly; medium = official page located, but only a search excerpt or embassy reprint was seen (direct fetch blocked), or the official text is older than the policy change; unverified = could not confirm from an official source.
- **9 FAM caveat:** FAM chapters carry their own revision dates (shown in rows). Some predate 2025 policy changes; FAM is used here for durable rules (214(b), 221(g), fees mechanics), not for the 2025-2026 waiver or residence changes.
- No fetched page or search result contained instructions aimed at the agent (no prompt-injection seen).

---

## Summary table

| # | Topic | Fact (as officially stated) | Official URL | Checked | Confidence |
|---|---|---|---|---|---|
| 1 | MRV fee, non-petition visas | $185 per person for non-petition nonimmigrant visas except E (covers B1/B2, F, M, J). | https://www.ecfr.gov/current/title-22/section-22.1 (Item 21(a)) | 2026-11-21 | high |
| 2 | MRV fee, petition-based | $205 for H, L, O, P, Q and R visas. | https://www.ecfr.gov/current/title-22/section-22.1 (Item 21(b)) | 2026-11-21 | high |
| 3 | MRV fee, E and K | $315 for E visas; $265 for K (fiancé) visas. | https://www.ecfr.gov/current/title-22/section-22.1 (Items 21(c), 21(d)) | 2026-11-21 | high |
| 4 | MRV fee exemption, J | No fee for J applicants in official U.S. Government-sponsored exchanges (DS-2019 program number starting G-1, G-2, G-3 or G-7). | https://www.ecfr.gov/current/title-22/section-22.1 (Item 22(b)); https://travel.state.gov/content/travel/en/us-visas/study/exchange.html | 2026-11-21 | high (eCFR); medium (TSG page, fetch blocked) |
| 5 | MRV fee is non-refundable | The MRV fee "must be paid regardless of whether the visa is issued or refused." A separate reciprocity (issuance) fee may apply after approval, depending on nationality. | https://fam.state.gov/FAM/09FAM/09FAM060105.html (9 FAM 601.5-3(A)); https://fam.state.gov/FAM/09FAM/09FAM040304.html | 2026-11-21 | high |
| 6 | Last MRV change | Current MRV amounts took effect June 17, 2023 (B1/B2 rose from $160 to $185). No later MRV rule found in the Federal Register. | https://www.federalregister.gov/documents/2023/03/28/2023-06290/schedule-of-fees-for-consular-services-nonimmigrant-and-special-visa-fees; https://travel.state.gov/content/travel/en/News/visas-news/niv-fee-increases-to-take-effect-june-17-2023.html | 2026-11-21 | high |
| 7 | Expedited appointment fee | Optional $750 fee for an expedited B1/B2 interview appointment within ten business days at selected posts. Temporary rule effective July 1 to December 31, 2026. | https://www.federalregister.gov/documents/2026/06/09/2026-11513/schedule-of-fees-for-consular-services-department-of-state-and-overseas-embassies-and | 2026-11-21 | high |
| 8 | Visa integrity fee: law | Enacted by Public Law 119-21 sec. 100007 (approved July 4, 2025). Fee is the greater of $250 or a DHS-set amount for FY2025, inflation-adjusted each year from FY2026. Charged by DHS "at the time of such issuance". Cannot be waived; may be reimbursed later to compliant visa holders. | https://www.govinfo.gov/content/pkg/PLAW-119publ21/html/PLAW-119publ21.htm | 2026-11-21 | high |
| 9 | Visa integrity fee: collection status | DHS (July 22, 2025) said the fee "requires cross-agency coordination before implementing; the fee will be implemented in a future publication." No implementing Federal Register document found. CRS (Oct 9, 2026): "could not verify that this fee had been implemented." Not listed in the State fee schedule (22 CFR 22.1). **Whether consulates collect it today: unverified.** FY2026 amount: unknown. | https://www.federalregister.gov/documents/2025/07/22/2025-13738/uscis-immigration-fees-required-by-hr-1-reconciliation-bill; https://www.congress.gov/crs_external_products/R/PDF/R47857/R47857.8.pdf | 2026-11-21 | high (status as documented); collection = unverified |
| 10 | Interview waiver, July 25, 2025 | Narrowed waiver categories effective Sept 2, 2025. The page itself says it is superseded by the Sept 18, 2025 update. | https://travel.state.gov/content/travel/en/News/visas-news/interview-waiver-update-july-25-2025.html | 2026-11-21 | medium (direct fetch blocked) |
| 11 | Interview waiver, current rule | Effective Oct 1, 2025, waivers are generally limited to: diplomatic/official categories (A-1, A-2, C-3 with exceptions, G-1 to G-4, NATO-1 to 6, TECRO E-1); renewals of a full-validity B-1, B-2, B1/B2 visa or Border Crossing Card within 12 months of expiry, where the applicant was at least 18 at prior issuance; and H-2A renewals on the same terms. Conditions: apply in country of nationality or usual residence, never refused (unless overcome or waived), no apparent ineligibility. Applicants under 14 and over 79 now generally need an in-person interview. Officers can still require an interview. No 2026 waiver update found. | https://travel.state.gov/content/travel/en/News/visas-news/interview-waiver-update-sept-18-2025.html | 2026-11-21 | medium (direct fetch blocked; consistent embassy reprints) |
| 12 | Interview rule (regulation) | Applicants aged 14 to 79 must appear unless waived. A waiver is not available to an applicant who is not a national or resident of the country where they apply, or who was previously refused (unless the refusal was overcome). | https://www.ecfr.gov/current/title-22/section-41.102 | 2026-11-21 | high |
| 13 | Apply in country of nationality or residence | Since Sept 6, 2025 (reissued July 15, 2026): book at the embassy/consulate in your country of nationality or residence, or at a designated post if your country has no routine visa operations. You must be able to show residence if applying on that basis. Applying elsewhere may make qualifying harder, appointment waits are much longer, and fees are not refunded or transferable. Exempt: A, G, C-2, C-3, NATO, diplomatic/official, UN HQ travel; rare humanitarian/medical/foreign-policy exceptions. Existing appointments generally not cancelled (2026 version). | https://travel.state.gov/content/travel/en/News/visas-news/adjudicating-niv-applicants-in-their-country-of-residence.html; https://travel.state.gov/en/newsroom/visas/2026/adjudicating-nonimmigrant-visa--niv--applicants-in-their-country.html | 2026-11-21 | medium (direct fetch blocked) |
| 14 | Place of application (regulation) | Apply at the consular office with jurisdiction over your place of residence, unless a post where you are physically present agrees to accept the case. | https://www.ecfr.gov/current/title-22/section-41.101 | 2026-11-21 | high |
| 15 | Online presence, F/M/J (June 2025) | June 18, 2025: comprehensive vetting, including online presence, of all F, M and J applicants; they are told to set privacy on all social media profiles to "public". | https://travel.state.gov/content/travel/en/News/visas-news/announcement-of-expanded-screening-and-vetting-for-visa-applicants.html; https://www.state.gov/releases/office-of-the-spokesperson/2025/06/announcement-of-expanded-screening-and-vetting-for-visa-applicants | 2026-11-21 | medium (both direct fetches blocked) |
| 16 | Online presence, later expansions | H-1B and H-4: from Dec 15, 2025. A-3, C-3 (domestic workers), G-5, H-3, H-4 of H-3, K-1/K-2/K-3, Q, R-1/R-2, S, T, U: from March 30, 2026. I, TN, TD: from Oct 1, 2026. B1/B2 was not found in these lists. | https://travel.state.gov/content/travel/en/News/visas-news/announcement-of-expanded-screening-and-vetting-for-h-1b-and-dependent-h-4-visa-applicants.html; https://travel.state.gov/en/newsroom/visas/2026/announcement-of-expanded-screening-and-vetting-for-visa-applicants.html | 2026-11-21 | medium (direct fetch blocked) |
| 17 | Social media identifiers on DS-160 | Since 2019, applicants list social media identifiers used in the last five years on the visa application. | https://travel.state.gov/content/dam/visas/Enhanced%20Vetting/CA%20-%20FAQs%20on%20Social%20Media%20Collection%20-%206-4-2019%20(v.2).pdf | 2026-11-21 | medium (direct fetch blocked) |
| 18 | 214(b) meaning | Most applicants (not H-1B, L, V) are presumed to be intending immigrants until they satisfy the officer otherwise. The burden is on the applicant (INA 291). 214(b) covers failing any requirement of the category (for example, F-1 funding), not only "ties". | https://fam.state.gov/FAM/09FAM/09FAM030201.html (9 FAM 302.1-2) | 2026-11-21 | high |
| 19 | 214(b) reapplication | Not a permanent ineligibility. No waiver, no appeal. The standard refusal letter says you "may reapply at any time" with a new application form and photo, a new fee and a new interview, and should bring new information or show changed circumstances. Officers must not encourage or discourage reapplying. | https://fam.state.gov/FAM/09FAM/09FAM040310.html (9 FAM 403.10); https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/visa-denials.html | 2026-11-21 | high (FAM); medium (TSG, fetch blocked) |
| 20 | 221(g) basics | A refusal for an incomplete application: missing information or documents, or pending administrative processing. It is legally a refusal even if later overcome. | https://fam.state.gov/FAM/09FAM/09FAM030201.html (9 FAM 302.1-8) | 2026-11-21 | high |
| 21 | 221(g) one-year rule | Within one year of the refusal: no new DS-160 and no new MRV fee. After one year: new DS-160 and new fee (unless the delay was the U.S. Government's). | https://fam.state.gov/FAM/09FAM/09FAM040310.html; https://fam.state.gov/FAM/09FAM/09FAM040304.html | 2026-11-21 | high |
| 22 | Administrative processing | The officer says at the end of the interview if administrative processing is needed. How long it takes varies by case. Afterwards the applicant may be found eligible or still ineligible. | https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/administrative-processing-information.html | 2026-11-21 | medium (direct fetch blocked) |
| 23 | DS-160 confirmation page | Bring the DS-160 confirmation page (it has a barcode). Without it the case may not be processed. | https://fam.state.gov/FAM/09FAM/09FAM040303.html; https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html | 2026-11-21 | high (FAM); medium (FAQ) |
| 24 | DS-160 editing | Once submitted, a DS-160 is locked and can't be changed unless the consular section unlocks it. Embassy FAQs say to fill out a new DS-160 for corrections and update the appointment to the new barcode. Current travel.state.gov FAQ wording was not seen. | https://travel.state.gov/content/dam/visas/AILA/AILA-Agenda-Fall-2019.pdf; https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms/ds-160-online-nonimmigrant-visa-application/ds-160-faqs.html | 2026-11-21 | medium |
| 25 | Visitor (B1/B2) interview documents | Passport valid at least six months beyond the period of stay (unless a country agreement exempts you); DS-160 confirmation page; fee receipt if you must pay before the interview; one printed photo only if the DS-160 photo upload failed. Officers may ask for more (trip purpose, intent to depart, ability to pay). | https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html | 2026-11-21 | medium (direct fetch blocked) |
| 26 | Student (F-1) interview documents | Passport (six-month rule); DS-160 confirmation page; fee receipt if required; Form I-20 signed by you and the school official. SEVIS I-901 fee must be paid before the interview. Officers may request transcripts, test scores, evidence of intent to depart, and proof of how you will pay costs. | https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html; https://fam.state.gov/FAM/09FAM/09FAM040205.html | 2026-11-21 | medium (TSG); high (FAM I-901 rule) |
| 27 | Exchange (J-1) documents | Form DS-2019 from the program sponsor. SEVIS fee is paid unless the program is government-sponsored (G-1/G-2/G-3/G-7). J-2 dependents need their own DS-2019 and pay no SEVIS fee. | https://travel.state.gov/content/travel/en/us-visas/study/exchange.html; https://www.ice.gov/sevis/i901/faq | 2026-11-21 | medium (TSG); high (ICE) |
| 28 | Six-month passport rule (law) | A nonimmigrant without a passport valid at least six months from the date of applying for admission is inadmissible under INA 212(a)(7)(B). Country agreements can exempt this. | https://fam.state.gov/FAM/09FAM/09FAM030201.html (9 FAM 302.1-4(A)) | 2026-11-21 | high |
| 29 | SEVIS I-901 fee amounts | F or M: $350. J: $220. J au pair, camp counselor or summer work/travel: $35. Government-sponsored J (G-1/2/3/7): $0. Pay at FMJfee.com before the interview and allow at least three business days. Dependents pay nothing. Reapplying within 12 months of payment generally means no new fee. | https://www.ice.gov/sevis/i901; https://www.ice.gov/sevis/i901/faq | 2026-11-21 | high |
| 30 | Travel ban, June 2025 | Proclamation 10949 (signed June 4, 2025, effective June 9, 2025): full suspension for 12 countries, partial for 7. | https://www.federalregister.gov/documents/2025/06/10/2025-10669/restricting-the-entry-of-foreign-nationals-to-protect-the-united-states-from-foreign-terrorists-and | 2026-11-21 | high |
| 31 | Travel ban, current (from Jan 1, 2026) | Proclamation 10998 (signed Dec 16, 2025, effective 12:01 a.m. EST Jan 1, 2026). Full suspension: 19 countries plus Palestinian Authority travel documents. Partial: 20 countries. Full list in section 11 below. | https://www.federalregister.gov/documents/2025/12/19/2025-23570/restricting-and-limiting-the-entry-of-foreign-nationals-to-protect-the-security-of-the-united-states | 2026-11-21 | high |
| 32 | Travel ban: scope | Applies only to people outside the U.S. on the effective date who did not hold a valid visa. No visa issued before the effective date is revoked. Exceptions include green-card holders, dual nationals on a non-listed passport, A/C-2/C-3/G/NATO visas, athletes for major events, and case-by-case national-interest exceptions. India, Pakistan and Bangladesh are not listed. | Same FR document (secs. 6, 8); https://travel.state.gov/content/travel/en/News/visas-news/suspension-of-visa-issuance-to-foreign-nationals-to-protect-the-security-of-the-united-states.html | 2026-11-21 | high (FR); medium (TSG) |
| 33 | H-1B $100,000: proclamation | Proclamation 10973 (signed Sept 19, 2025; effective 12:01 a.m. EDT Sept 21, 2025, for 12 months) restricts H-1B entry unless the petition is accompanied by a $100,000 payment. | https://www.federalregister.gov/documents/2025/09/24/2025-18601/restriction-on-entry-of-certain-nonimmigrant-workers | 2026-11-21 | high |
| 34 | H-1B $100,000: official scope | Applies to new petitions filed at or after the effective time for beneficiaries outside the U.S. without a valid H-1B visa, or those asking for consular or port-of-entry notification or pre-flight inspection. Does not apply to valid H-1B visas already issued, petitions filed earlier, renewals, or granted amendments, changes of status or extensions for people inside the U.S. It is a one-time payment per new petition, not annual. Current H-1B holders can still travel. | https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations; https://www.whitehouse.gov/releases/2025/09/h-1b-faq/ | 2026-11-21 | high |
| 35 | H-1B $100,000: court status | June 8, 2026: the D. Mass. court vacated the agency guidance implementing the payment (State of California v. Mullin, 1:25-cv-13829). July 24, 2026: the First Circuit denied a stay. DHS "will comply with the court's order while DHS considers next steps" and plans to collect if the order is lifted. | https://www.uscis.gov/newsroom/alerts/h-1b-faq; https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations (updated 09/21/2026) | 2026-11-21 | high |
| 36 | H-1B $100,000: 2026 extension | Proclamation 11069 (signed Sept 18, 2026) extends the restriction 12 months from 12:01 a.m. EDT Sept 21, 2026 (to Sept 21, 2027). The USCIS pages checked do not yet describe it, and how it interacts with the court order is unclear. | https://www.federalregister.gov/documents/2026/09/23/2026-19554/restriction-on-entry-of-certain-nonimmigrant-workers | 2026-11-21 | high (text); interaction with court order = unverified |
| 37 | H-1B proposed fee | DHS proposed rule (Aug 25, 2026): a $103,265 fee on all H-1B cap-subject petitions. **Proposed only, not final.** | https://www.federalregister.gov/documents/2026/08/25/2026-17324/fee-for-certain-h-1b-petitions | 2026-11-21 | high |
| 38 | Visa bonds (B1/B2) | Pilot from Aug 20, 2025. A permanent program took effect Aug 3, 2026: officers may require a bond of up to $20,000 from B-1/B-2 applicants who are nationals of countries listed on travel.state.gov. Bangladesh appears on the list with a Jan 21, 2026 date. India and Pakistan: not verified. | https://www.federalregister.gov/documents/2026/08/03/2026-15726/visas-visa-bond-program; https://travel.state.gov/content/travel/en/News/visas-news/countries-subject-to-visa-bonds.html | 2026-11-21 | high (rule); medium (country list, fetch blocked) |
| 39 | F/J fixed period of admission | DHS final rule effective Sept 15, 2026 replaces "duration of status" for F, J and I with a fixed admission period. F students: program length, max 4 years, with a 30-day arrival window and 30-day departure period. More time means an extension request to USCIS. | https://www.federalregister.gov/documents/2026/07/17/2026-14439/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant; https://studyinthestates.dhs.gov/final-rule-establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-quick | 2026-11-21 | high |
| 40 | Birth tourism | B-2 "pleasure" excludes getting a visa mainly to obtain U.S. citizenship for a child by giving birth in the U.S. (22 CFR 41.31). EO 14419 (Aug 6, 2026) directs State and DHS to act against birth tourism. | https://www.ecfr.gov/current/title-22/section-41.31; https://www.federalregister.gov/documents/2026/08/11/2026-16404/ending-birth-tourism | 2026-11-21 | high |
| 41 | Proposed OPT fees | DHS proposed rule (Oct 8, 2026): $70,000 for initial OPT and $30,000 for subsequent OPT. **Proposed only.** | https://www.federalregister.gov/documents/2026/10/08/2026-20660/optional-practical-training-fees | 2026-11-21 | high |
| 42 | Immigrant visa pause (not NIV) | A Jan 2026 pause on immigrant visas for nationals of 75 countries ended Aug 21, 2026 under a court order (CLINIC v. Rubio). It never applied to nonimmigrant visas. | https://travel.state.gov/content/travel/en/News/visas-news/immigrant-visa-processing-updates-for-nationalities-at-high-risk-of-public-benefits-usage.html | 2026-11-21 | medium (direct fetch blocked) |

---

## Topic notes and safe phrasing

Visa Prepper is a preparation tool. It does not file applications, book appointments, predict outcomes or give legal advice. Visa decisions belong to consular officers (and admission to CBP). Every topic note below ends with phrasing that fits that position.

### 1. Visa application (MRV) fees

- The State Department's own fee schedule in regulation (22 CFR 22.1, eCFR current to 2026-11-19) lists: $185 for non-petition visas except E (B1/B2, F, M, J and others), $205 for H/L/O/P/Q/R, $315 for E, and $265 for K. Item 26 is the $750 expedite fee.
- 9 FAM 601.5 confirms the MRV fee is owed whether the visa is issued or refused. A separate reciprocity (issuance) fee can apply after approval, depending on nationality.
- The $750 expedite option buys an earlier appointment only, and only at selected posts, from July 1 to December 31, 2026. It does not affect the decision.
- **Safe phrasing:** "As of 2026-11-21, the State Department's fee schedule lists a $185 application fee for B1/B2, F-1 and J-1 visas and $205 for petition-based categories such as H-1B. Fees are set by the U.S. government and can change. Confirm the current amount on travel.state.gov or your embassy's site before paying. The fee is generally not refunded if a visa is refused." Do not say "$185 visa fee" without a date. Do not imply Visa Prepper's price includes or replaces government fees.

### 2. Visa integrity fee

- It exists in law (P.L. 119-21 sec. 100007): at least $250, inflation-adjusted, charged at visa issuance, not waivable, possibly reimbursable later.
- No official source seen shows it being collected. DHS said it would be implemented "in a future publication". No such Federal Register publication was found through 2026-11-21. CRS could not verify implementation as of Oct 9, 2026. It is not in the State fee schedule.
- Secondary sites disagree. Do not cite them.
- **Safe phrasing:** "A 2025 U.S. law created a 'visa integrity fee' of at least $250, payable when a nonimmigrant visa is issued. As of 2026-11-21 we could not find an official notice that collection has begun. Check travel.state.gov for the current status." Never state it as a fee applicants currently pay, and never give a FY2026 amount (unknown).

### 3. Interview waiver changes (Sept 2 and Oct 1, 2025)

- The July 25, 2025 notice (effective Sept 2, 2025) was replaced by the Sept 18, 2025 notice (effective Oct 1, 2025).
- Under the Oct 1, 2025 rule, outside diplomatic and official categories, a waiver is generally limited to: renewing a full-validity B1/B2 visa or Border Crossing Card within 12 months of expiry, having been 18 or older when it was issued, plus the matching H-2A renewal rule.
- You must also apply in your country of nationality or residence, have no prior refusal (unless overcome or waived), and have no apparent ineligibility. Children under 14 and adults over 79 now generally interview.
- First-time F-1, J-1, H-1B and most B1/B2 applicants should expect an in-person interview. The regulation (22 CFR 41.102) lets the Department narrow waivers and still allows any officer to require an interview.
- **Safe phrasing:** "Since October 1, 2025, most U.S. nonimmigrant visa applicants, including first-time students and visitors, generally need an in-person interview. Limited renewal waivers exist. Check your embassy's current instructions to see whether you qualify. An officer can still ask anyone to interview." Avoid "interview waiver/dropbox is available for students" or the old "48-month" rule.

### 4. Apply in your country of nationality or residence

- The State Department announcement of Sept 6, 2025, republished July 15, 2026, directs applicants to their country of nationality or residence, or a designated post.
- Applying elsewhere can make qualifying harder and means longer waits. Fees are not refunded or transferred.
- The underlying regulation (22 CFR 41.101) ties the application to the consular district of residence unless a post agrees to accept it.
- **Safe phrasing:** "U.S. State Department guidance asks most nonimmigrant applicants to apply in their country of nationality or residence. If you apply elsewhere, expect longer waits and possibly more difficulty showing you qualify. Confirm which post can take your application on its official website." This fits the existing post `/blog/us-visa-interview-preparation-any-country`, which already links the 2026 State page.

### 5. Social media and online presence vetting

- F, M and J applicants (June 18, 2025) were told to set all social media profiles to "public". Later notices added H-1B and H-4 (Dec 15, 2025); A-3, C-3 domestic workers, G-5, H-3, K, Q, R, S, T and U (March 30, 2026); and I, TN and TD (Oct 1, 2026).
- All applicants list social media identifiers used in the last five years on the DS-160 (since 2019).
- No official instruction was found that B1/B2 applicants must make profiles public. Do not claim one.
- **Safe phrasing:** "The State Department asks F-1, M-1 and J-1 applicants (and, since later notices, H-1B/H-4 and several other categories) to set their social media profiles to public for vetting. Every applicant must list recent social media identifiers on the DS-160. List them accurately; don't delete or hide accounts to look different." Never suggest scrubbing, hiding or changing online history to influence an officer, and never imply Visa Prepper reviews social media.

### 6. INA 214(b) refusal

- Official meaning: the applicant did not establish eligibility for the visa category. Most often this means not overcoming the presumption of immigrant intent, but it can be any unmet requirement (for example, F-1 funding). It is not permanent, and there is no waiver or appeal.
- To reapply: new DS-160, new fee and new interview, ideally with new information or changed circumstances. There is no official minimum waiting period.
- **Safe phrasing:** "A 214(b) refusal means the officer was not satisfied, at that interview, that you met the requirements for that visa. It is not a permanent ban, and you may reapply with a new application and fee. Officials suggest reapplying when you have new information or your circumstances have changed. Practice can help you explain your real situation clearly, but it can't change the facts or guarantee a different decision." Avoid "reapply after X months" rules (unofficial) and "214(b) means weak ties" as the only meaning.

### 7. INA 221(g) and administrative processing

- A 221(g) refusal is legally a refusal. The case can be reopened when the applicant supplies the requested documents or information, or when administrative processing finishes.
- Within one year of the refusal, there is no new DS-160 and no new fee. After one year, both are needed (unless the delay was the government's).
- Administrative processing has no fixed timeline, and the outcome can be issuance or continued ineligibility.
- **Safe phrasing:** "A 221(g) refusal usually means the officer needs more information, documents or administrative processing before deciding. Follow the instructions on your 221(g) letter. Timelines vary by case, and no one outside the government can speed up or predict the outcome." Do not promise timeframes. Do not describe 221(g) as "approved, pending".

### 8. DS-160 basics

- The DS-160 is the online nonimmigrant application. Bring the confirmation page with its barcode. The photo is normally uploaded in the form (bring a printed one only if the upload failed). Each applicant, including children, needs their own DS-160.
- After submission the form is locked. Embassy FAQs say corrections generally need a new DS-160, and the appointment must be updated to the new barcode. The current travel.state.gov FAQ wording on this was not seen, so phrase it as "generally" and point to post instructions.
- **Safe phrasing:** "You generally can't edit a DS-160 after you submit it. If something is wrong, follow your embassy's instructions. Often that means completing a new DS-160 and updating your appointment with the new confirmation number. Your interview answers should match what you truthfully submitted." This matches the existing `/blog/ds-160-interview-consistency` post.

### 9. Documents to bring (visitor, student, exchange)

- Visitor (State Department visitor page): passport valid at least six months beyond the stay (unless a country agreement exempts you), DS-160 confirmation page, fee receipt if payment was due before the interview, and a printed photo only if the upload failed.
- Student: add the Form I-20 (signed by student and school official) and proof that the SEVIS I-901 fee was paid before the interview. Exchange: Form DS-2019.
- Officers may ask for evidence of purpose, finances, academics and intent to depart. Each post publishes its own instructions.
- **Safe phrasing:** "Typical items listed by the State Department include your passport, DS-160 confirmation page, fee receipt (if required), and for students your Form I-20 and SEVIS fee payment (Form DS-2019 for J-1). Your embassy's appointment instructions are the final checklist." Visa Prepper's document check should be described as a consistency/preparation review, never as official verification.

### 10. SEVIS I-901 fee

- F or M: $350. J: $220. J au pair, camp counselor and summer work/travel: $35. Government-sponsored J: $0.
- Pay at FMJfee.com before the interview and allow at least three business days. F-2 and J-2 dependents don't pay. Reapplying within 12 months of payment generally means no new fee.
- **Safe phrasing:** "As of 2026-11-21, ICE lists the SEVIS I-901 fee as $350 for F-1 students and $220 for most J-1 exchange visitors. Pay only on the official FMJfee.com site, before your interview." This is separate from the visa application fee.

### 11. Entry and visa restrictions by nationality (presidential proclamations)

- **Proclamation 10998, in force from Jan 1, 2026** (supersedes or extends 10949):
  - **Full suspension:** Afghanistan, Burma, Chad, Republic of the Congo, Equatorial Guinea, Eritrea, Haiti, Iran, Libya, Somalia, Sudan, Yemen (continued from June 2025); Burkina Faso, Laos, Mali, Niger, Sierra Leone, South Sudan, Syria (added); and anyone using Palestinian Authority-issued or endorsed travel documents.
  - **Partial suspension** (immigrants, plus B-1, B-2, B-1/B-2, F, M and J visas; reduced validity for other nonimmigrant visas): Burundi, Cuba, Togo, Venezuela (continued); Angola, Antigua and Barbuda, Benin, Cote d'Ivoire, Dominica, Gabon, The Gambia, Malawi, Mauritania, Nigeria, Senegal, Tanzania, Tonga, Zambia, Zimbabwe (added).
  - **Turkmenistan:** nonimmigrant B/F/M/J suspension lifted; immigrant visas still suspended.
- Proclamation 10949 (effective June 9, 2025) originally listed 12 full and 7 partial countries (partial: Burundi, Cuba, Laos, Sierra Leone, Togo, Turkmenistan, Venezuela).
- India, Pakistan and Bangladesh are not on either list.
- Applies only to people outside the U.S. without a valid visa on the effective date. Earlier visas are not revoked. According to the State Department, affected nationals can still apply and interview but may be found ineligible.
- No Federal Register proclamation changing these lists was found after Dec 19, 2025 (search run 2026-11-21). The State Department's notice, as summarized in search results, said the 10998 suspensions remained in place as of about Aug 2026.
- **Safe phrasing:** "Some nationalities face full or partial U.S. entry and visa restrictions under Presidential Proclamation 10998 (in effect since January 1, 2026). If you are a national of a listed country, check the State Department's current guidance before booking. Visa Prepper can help you practise, but cannot change eligibility under these rules." Always cite the proclamation and date. Never present the list as permanent.

### 12. H-1B $100,000 payment

- Proclamation 10973 (effective Sept 21, 2025) is extended by Proclamation 11069 to Sept 21, 2027.
- Officially clarified scope: new petitions for beneficiaries outside the U.S. without a valid H-1B visa (or those asking for consular or port-of-entry notification). It does not cover existing valid visas, earlier petitions, renewals, or granted in-country changes of status, amendments or extensions. It is a one-time payment, and H-1B holders can still travel.
- On June 8, 2026 a federal court vacated DHS's implementing guidance, and on July 24, 2026 the First Circuit denied a stay. DHS says it is complying while it considers next steps.
- The September 2026 extension's interaction with that order is not explained on the USCIS pages checked. Separately, DHS has *proposed* a $103,265 fee on H-1B cap petitions, and EO 14431 (Sept 18, 2026) tells agencies to consider employer layoffs.
- No official statement was found that the $100,000 applies to H-4 dependents. Do not claim it does.
- **Safe phrasing:** "A September 2025 presidential proclamation (extended in September 2026) requires a $100,000 payment for certain new H-1B petitions for workers outside the U.S. Its implementation has been affected by a 2026 court ruling, so employers should check current USCIS guidance. The payment is the employer's petition matter, not part of the visa interview." For H-1B/H-4 interview posts, keep this as context and link USCIS. Do not give legal conclusions on whether a specific case owes it.

### 13. Other late-2025 and 2026 changes worth knowing

- **Visa bonds (B1/B2):** permanent from Aug 3, 2026, up to $20,000, for nationals of countries listed on travel.state.gov. Bangladesh appears with a Jan 21, 2026 date (medium). Relevant to the Bangladesh guide: say "may be required to post a bond if your nationality is listed; check the State Department list". Do not state an amount for a given applicant.
- **F/J fixed period of admission (effective Sept 15, 2026):** F-1 admission now carries a fixed end date (program length, max 4 years) instead of "duration of status". Students extend through USCIS. Phrase it as a post-arrival status rule, not an interview requirement.
- **Birth tourism:** B-2 cannot be used mainly to give birth in the U.S. to obtain citizenship for the child (22 CFR 41.31), and EO 14419 (Aug 6, 2026) reinforces this. Never coach applicants on how to avoid scrutiny of pregnancy or medical travel. Advise truthful answers.
- **Proposed only, not in effect:** OPT fees of $70,000/$30,000 (Oct 8, 2026); removing the 60-day grace period (Sept 11, 2026); the $103,265 H-1B cap petition fee (Aug 25, 2026). Label any mention "proposed".
- **Immigrant visa pause for 75 countries:** Jan 2026 to Aug 21, 2026 (ended by court order). It was immigrant-visa only.
- **Not verified:** July 2025 reductions in nonimmigrant visa validity/reciprocity for certain countries (mentioned by CRS). Check the country reciprocity page (travel.state.gov, blocked to automation) before stating specifics for India, Pakistan or Bangladesh.

---

## Items marked unverified

1. Whether the visa integrity fee is currently collected at any consulate, and its FY2026 inflation-adjusted amount.
2. Current exact wording of the travel.state.gov DS-160 FAQ on editing after submission.
3. Whether India or Pakistan are on the visa bond country list (Bangladesh: medium, Jan 21, 2026 date).
4. How Proclamation 11069 (Sept 2026 H-1B extension) is being implemented in light of the June 8, 2026 vacatur and the First Circuit's July 24, 2026 stay denial.
5. Country-specific reciprocity changes (visa validity and number of entries) for India, Pakistan and Bangladesh.
6. Any travel.state.gov news after the search-indexed items (latest seen: a Nov 16, 2026 adoption notice; a Sept 18, 2026 online-presence expansion).

## Repo cross-check (read-only, clone @ 99dac01)

- The existing posts mostly avoid hard numbers for government fees, waivers or proclamations, which matches the safe-phrasing approach above.
- `/blog/214b-visa-refusal-guide` statements (no appeal, reapply with new information, 214(b) vs 221(g)) agree with 9 FAM 302.1 and 9 FAM 403.10.
- `/blog/us-visa-interview-preparation-any-country` links the July 2026 State Department residence guidance URL. That page exists per search (medium).
- If a refresh adds numbers, use rows 1-9, 29 and 31-36 with their dates.
