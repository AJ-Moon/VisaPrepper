// Quotes supplied by the owner and confirmed as real testimonials on 2026-09-20.
// Preserve the customer's wording. No ratings or visa outcomes were supplied.
export type PublicTestimonial = {
  id: string; displayName: string; country: string; destination: string;
  visaCategory: string; quote: string;
};
// Keep private consent evidence outside public page props and browser bundles.
export type ApprovedTestimonialRecord = PublicTestimonial & {
  specificProblem: string; outcomeMayBeMentioned: boolean;
  consentReference: string; rating?: number;
};
// Deliberately interleaved: no adjacent destination repeats, including the loop seam.
export const APPROVED_TESTIMONIALS: PublicTestimonial[] = [
  {
    "id": "review-1",
    "displayName": "Ayesha",
    "country": "Pakistan",
    "destination": "United States",
    "visaCategory": "US F-1 student visa",
    "quote": "My form said my father would pay, but during practice I kept mentioning my uncle. The AI noticed the difference and asked me to explain who was actually funding me. I corrected my documents and prepared one clear, truthful answer."
  },
  {
    "id": "review-14",
    "displayName": "Aditya",
    "country": "India",
    "destination": "Italy",
    "visaCategory": "Italy student visa",
    "quote": "I had the university admission letter, but I was not ready to explain where I would live or how far it was from campus. The AI asked about the address, rent and travel. That helped me prepare the missing details."
  },
  {
    "id": "review-8",
    "displayName": "Farhan",
    "country": "Bangladesh",
    "destination": "United States",
    "visaCategory": "US H-1B work visa",
    "quote": "I knew my job well, but I started stuttering when I had to explain it simply. The interviewer made me practise my duties, employer and work location several times. My answer became shorter and easier to understand."
  },
  {
    "id": "review-18",
    "displayName": "Zoya",
    "country": "Pakistan",
    "destination": "France",
    "visaCategory": "France student visa",
    "quote": "My weakest part was accommodation. I knew the residence name but not the monthly cost, booking period or distance from my university. The AI kept asking until I knew what information I still needed."
  },
  {
    "id": "review-2",
    "displayName": "Arjun",
    "country": "India",
    "destination": "United States",
    "visaCategory": "US F-1 student visa",
    "quote": "I kept saying I chose the university because it was ‘very good.’ The interviewer asked about the course, subjects and my future plan. It helped me give a real answer instead of a general one."
  },
  {
    "id": "review-25",
    "displayName": "Mahmud",
    "country": "Bangladesh",
    "destination": "Germany",
    "visaCategory": "Germany work visa",
    "quote": "I used technical words when explaining my job and then lost my point. The feedback helped me describe my role, experience and main duties in simple language without speaking for too long."
  },
  {
    "id": "review-6",
    "displayName": "Bilal",
    "country": "Pakistan",
    "destination": "United States",
    "visaCategory": "US B1/B2 visitor visa",
    "quote": "I said I would stay for three weeks, but my travel plan showed twelve days. The AI caught it immediately. I checked my dates and learnt to explain the final plan without confusing myself."
  },
  {
    "id": "review-27",
    "displayName": "Rafiya",
    "country": "Bangladesh",
    "destination": "United Kingdom",
    "visaCategory": "UK student visa",
    "quote": "I knew the course title but not the main modules. I also could not explain why I chose this university over the others. The AI asked the same issue in different ways until my answer became clear and personal."
  },
  {
    "id": "review-3",
    "displayName": "Tanvir",
    "country": "Bangladesh",
    "destination": "United States",
    "visaCategory": "US F-1 student visa",
    "quote": "I was very nervous and spoke too fast in my first practice. After repeating the interview, I was calmer and my answers became much clearer. The final practice felt completely different from the first one."
  },
  {
    "id": "review-16",
    "displayName": "Imran",
    "country": "Pakistan",
    "destination": "Italy",
    "visaCategory": "Italy work visa",
    "quote": "I could name my employer but could not explain the contract, salary and daily work clearly. The practice questions helped me understand the important parts of my own job offer before the interview."
  },
  {
    "id": "review-9",
    "displayName": "Neha",
    "country": "India",
    "destination": "United States",
    "visaCategory": "US L-1 work visa",
    "quote": "The practice felt serious, which was exactly what I needed. I stopped giving rushed answers and became more comfortable speaking to someone who did not already know my background."
  },
  {
    "id": "review-20",
    "displayName": "Mehedi",
    "country": "Bangladesh",
    "destination": "France",
    "visaCategory": "France visitor visa",
    "quote": "I had not calculated my full trip budget. When the interviewer asked about flights, hotels and daily expenses, I only knew the total in my bank account. The practice helped me prepare a realistic breakdown."
  },
  {
    "id": "review-4",
    "displayName": "Sana",
    "country": "Pakistan",
    "destination": "United States",
    "visaCategory": "US F-1 student visa",
    "quote": "I had a two-year study gap and was trying to avoid the question. The practice interview kept asking what I did during that time. It helped me prepare an honest timeline with my work and course details."
  },
  {
    "id": "review-24",
    "displayName": "Sneha",
    "country": "India",
    "destination": "Germany",
    "visaCategory": "Germany student visa",
    "quote": "My answer to ‘Why Germany?’ sounded copied from the internet. The interviewer asked how the course subjects matched my previous degree and career plan. That helped me make the answer specific to me."
  },
  {
    "id": "review-11",
    "displayName": "Nusrat",
    "country": "Bangladesh",
    "destination": "United States",
    "visaCategory": "US B1/B2 visitor visa",
    "quote": "I had prepared answers in my head, but saying them out loud was much harder. The repeated interviews helped me stop freezing and answer in a normal, direct way."
  },
  {
    "id": "review-30",
    "displayName": "Faisal",
    "country": "Pakistan",
    "destination": "United Kingdom",
    "visaCategory": "UK spouse visa",
    "quote": "I understood our case, but I was weak on the financial and accommodation questions. The practice made me check the income amount, home details and supporting documents instead of giving rough answers."
  },
  {
    "id": "review-5",
    "displayName": "Rohan",
    "country": "India",
    "destination": "United States",
    "visaCategory": "US F-1 student visa",
    "quote": "My answer about coming back home sounded uncertain. The report showed that I was speaking about jobs in America instead of my actual career plan in India. I rewrote the answer around my real long-term plan."
  },
  {
    "id": "review-15",
    "displayName": "Sadia",
    "country": "Bangladesh",
    "destination": "Italy",
    "visaCategory": "Italy family reunification visa",
    "quote": "I gave different answers about my husband’s address because I was mixing his old and new home. The report pointed out the mismatch. I checked the accommodation documents and learnt the correct address."
  },
  {
    "id": "review-10",
    "displayName": "Hamza",
    "country": "Pakistan",
    "destination": "United States",
    "visaCategory": "US spouse immigrant visa",
    "quote": "I mixed up the dates of our first meeting, engagement and marriage. The AI kept asking about the timeline until I saw where I was getting confused. I reviewed the dates with my documents and prepared a clear sequence."
  },
  {
    "id": "review-21",
    "displayName": "Hira",
    "country": "Pakistan",
    "destination": "France",
    "visaCategory": "France business visa",
    "quote": "I kept describing the company but was not answering why I personally needed to travel. The report showed that I was missing the main point. I prepared a clear answer about the meetings, invitation and travel dates."
  },
  {
    "id": "review-7",
    "displayName": "Priya",
    "country": "India",
    "destination": "United States",
    "visaCategory": "US B1/B2 visitor visa",
    "quote": "I said I was paying for the trip myself, but my bank documents included money recently sent by my brother. The questions showed me that I needed to understand my own funds and explain the transfer properly."
  },
  {
    "id": "review-26",
    "displayName": "Pooja",
    "country": "India",
    "destination": "Germany",
    "visaCategory": "Germany family reunification visa",
    "quote": "I was unsure about my spouse’s employer, work start date and our accommodation size. These sounded like small details, but I kept mixing them up. The practice showed me what I needed to confirm before the interview."
  },
  {
    "id": "review-12",
    "displayName": "Vikram",
    "country": "India",
    "destination": "United States",
    "visaCategory": "US H-4 dependent visa",
    "quote": "I liked that every practice was not exactly the same. The follow-up questions made me listen carefully instead of repeating memorised lines. I felt much more ready after the later sessions."
  },
  {
    "id": "review-29",
    "displayName": "Ishita",
    "country": "India",
    "destination": "United Kingdom",
    "visaCategory": "UK Standard Visitor visa",
    "quote": "The biggest change was my confidence. I stopped trying to memorise full paragraphs and started answering the question that was actually asked. It made me sound much more natural."
  },
  {
    "id": "review-13",
    "displayName": "Mahnoor",
    "country": "Pakistan",
    "destination": "Italy",
    "visaCategory": "Italy student visa",
    "quote": "I knew my mother was sponsoring me, but I could not explain her income or the source of the funds. The interview showed me exactly what I did not know. I reviewed the financial papers and prepared the correct figures."
  },
  {
    "id": "review-19",
    "displayName": "Rahul",
    "country": "India",
    "destination": "France",
    "visaCategory": "France student visa",
    "quote": "At first my confidence was very low and I sounded unsure even when my answer was correct. Repeating the interviews helped me speak slowly and stop changing my answer halfway through."
  },
  {
    "id": "review-23",
    "displayName": "Usman",
    "country": "Pakistan",
    "destination": "Germany",
    "visaCategory": "Germany student visa",
    "quote": "I had opened my blocked account but did not know the exact amount or monthly access. The financial questions exposed that gap immediately. I checked the documents and stopped guessing the numbers."
  },
  {
    "id": "review-17",
    "displayName": "Kavya",
    "country": "India",
    "destination": "Italy",
    "visaCategory": "Italy visitor visa",
    "quote": "I was scared of the interview and kept overthinking every answer. Practising in a realistic setting helped me relax, listen to the full question and speak more naturally."
  },
  {
    "id": "review-22",
    "displayName": "Ananya",
    "country": "India",
    "destination": "France",
    "visaCategory": "France family visa",
    "quote": "I found the interview much more useful than practising with relatives. My family already knew everything, but the AI made me explain it from the beginning. That showed me which parts were not clear."
  },
  {
    "id": "review-28",
    "displayName": "Ali",
    "country": "Pakistan",
    "destination": "United Kingdom",
    "visaCategory": "UK Skilled Worker visa",
    "quote": "I was confused about the difference between my job title, occupation code and daily duties. The mock interviewer helped me explain the role using the same correct information shown in my work documents."
  }
];
export type SurveyEvidence = { question: string; respondents: number; positiveResponses: number; from: string; to: string; method: string; evidenceReference: string };
export const PREPARATION_SURVEY: SurveyEvidence | null = null;
