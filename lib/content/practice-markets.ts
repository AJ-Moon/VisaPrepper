import { SITE_URL } from "@/lib/config/site";
import type { FaqEntry } from "@/lib/seo/json-ld";

export type PracticeMarket = {
  slug: "india" | "pakistan";
  name: string;
  countryCode: string;
  locale: string;
  href: string;
  title: string;
  description: string;
  h1: string;
  languages: string;
  nativeLang: "hi" | "ur";
  nativeIntro: string;
  intro: string;
  examplesHeading: string;
  examples: { title: string; description: string }[];
  checklist: string[];
  guideLinks: { label: string; href: string }[];
  faqs: FaqEntry[];
};

export const PRACTICE_MARKETS: PracticeMarket[] = [
  {
    slug: "india",
    name: "India",
    countryCode: "IN",
    locale: "en-IN",
    href: "/visa-interview-practice/india",
    title: "AI Video Visa Interview Practice in India",
    description: "Practice visa interviews in India with AI video, English or Hindi, your own application details, document checks and personal feedback. Start with one free check.",
    h1: "AI video visa interview practice for applicants in India.",
    languages: "English and Hindi",
    nativeLang: "hi",
    nativeIntro: "अपने जवाब रटें नहीं। अपनी बात साफ़ कहने की तैयारी करें।",
    intro: "Your loan, work trip or family visit needs its own explanation. Practice a complete video conversation based on your form and personal details. Find unclear answers, then work on those points before your appointment.",
    examplesHeading: "Practice the details that matter in your case.",
    examples: [
      {
        title: "Explain your education loan",
        description: "Know your approved loan, family support and remaining costs. Keep INR and USD clearly labelled so a rupee balance does not become a dollar figure in your answer.",
      },
      {
        title: "Make your course choice personal",
        description: "Explain which subjects fit your earlier study or work. Practice why this course and university suit your plans, using personal details rather than general statements about rankings.",
      },
      {
        title: "Describe a work or client trip",
        description: "Say who employs you, which client you will meet and why you need to travel. Check your role, work location and dates against your application.",
      },
      {
        title: "Prepare parents for a family visit",
        description: "Let each parent explain who they will see, where they will stay, how long they will visit and who is paying, in their own words.",
      },
    ],
    checklist: [
      "Your final application details and planned travel dates.",
      "Your course, employer or family visit information.",
      "Funding amounts with each currency clearly marked.",
    ],
    guideLinks: [
      { label: "U.S. visa interview questions for India", href: "/blog/us-visa-interview-questions-india" },
      { label: "F1 interview questions and preparation", href: "/blog/f1-visa-interview-questions-and-answers" },
      { label: "How to explain who will pay", href: "/blog/f1-visa-interview-who-will-pay" },
      { label: "Visitor and business interview questions", href: "/blog/b1-b2-visa-interview-questions" },
    ],
    faqs: [
      {
        question: "Can I practice a visa interview in Hindi?",
        answer: "Yes. English and Hindi practice are available. Follow your visa authority's language instructions for the real appointment.",
      },
      {
        question: "Can I pay in Indian rupees?",
        answer: "The package is priced at $44 USD. Check the final currency and total at checkout. Your bank may apply conversion charges or other fees.",
      },
    ],
  },
  {
    slug: "pakistan",
    name: "Pakistan",
    countryCode: "PK",
    locale: "en-PK",
    href: "/visa-interview-practice/pakistan",
    title: "AI Video Visa Interview Practice in Pakistan",
    description: "Practice visa interviews in Pakistan with AI video in English or Urdu. Check your form, explain your sponsor clearly and get feedback. One document check is free.",
    h1: "AI video visa interview practice for applicants in Pakistan.",
    languages: "English and Urdu",
    nativeLang: "ur",
    nativeIntro: "اپنے اصل حالات کے مطابق تیاری کریں، اعتماد سے جواب دیں۔",
    intro: "A difficult question can make familiar details hard to explain. Practice on video using your own form, documents and personal details. Find unclear answers and missing facts early, with feedback to use before trying again.",
    examplesHeading: "Find the gaps before the real conversation.",
    examples: [
      {
        title: "Be clear about your sponsor",
        description: "If your father is paying and an uncle also contributes, know who covers which costs. Practice the real arrangement and compare your answer with your form and financial details.",
      },
      {
        title: "Explain a study gap honestly",
        description: "Put your work, courses or other activities into a clear timeline. Explain what you actually did during the gap without hiding dates or learning somebody else's story.",
      },
      {
        title: "Understand a form an agent filled",
        description: "Read the final version yourself. Check dates, employment, funding and family details. Practice explaining what you submitted instead of relying on what the agent remembers.",
      },
      {
        title: "Keep a family trip consistent",
        description: "Review accommodation, visit length and budget together. Each applicant should understand their own plan instead of giving different dates or guessing a relative's address.",
      },
    ],
    checklist: [
      "The final form you or your agent prepared.",
      "Your sponsor's details and confirmed funding plan.",
      "Your study, employment and travel timeline.",
    ],
    guideLinks: [
      { label: "U.S. visa interview questions for Pakistan", href: "/blog/us-visa-interview-questions-pakistan" },
      { label: "Keep your DS-160 and answers consistent", href: "/blog/ds-160-interview-consistency" },
      { label: "What to do when nerves make you forget", href: "/blog/visa-interview-nervous-forget-answer" },
      { label: "Prepare for follow-up questions", href: "/blog/visa-interview-follow-up-questions" },
    ],
    faqs: [
      {
        question: "Can I practice my visa interview in Urdu?",
        answer: "Yes. English and Urdu practice are available. Follow the language arrangements given for your real appointment.",
      },
      {
        question: "Can I use a form prepared by an agent?",
        answer: "Yes. Review and share your final form details. Checks can flag inconsistencies, but you remain responsible for the information you submit.",
      },
    ],
  },
];

export const PRACTICE_LANGUAGE_ALTERNATES = {
  en: `${SITE_URL}/visa-interview-practice`,
  "en-IN": `${SITE_URL}/visa-interview-practice/india`,
  "en-PK": `${SITE_URL}/visa-interview-practice/pakistan`,
  "x-default": `${SITE_URL}/visa-interview-practice`,
};

export function getPracticeMarket(slug: string): PracticeMarket | undefined {
  return PRACTICE_MARKETS.find((market) => market.slug === slug);
}
