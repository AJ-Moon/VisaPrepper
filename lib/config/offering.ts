import { COMPLETE_OFFER, FREE_OFFER } from "./offer";

export const DESTINATIONS = [
  { name: "United States", flag: "🇺🇸", status: "live", detail: "Interview practice and document checks" },
  { name: "France & Schengen", flag: "🇫🇷", status: "live", detail: "Interview practice and document checks" },
  { name: "Italy & Schengen", flag: "🇮🇹", status: "live", detail: "Interview practice and document checks" },
  { name: "United Kingdom", flag: "🇬🇧", status: "live", detail: "Interview practice and document checks" },
  { name: "Germany & general Schengen", flag: "🇩🇪", status: "live", detail: "Interview practice and document checks" },
] as const;

export const APPLICANT_COUNTRIES = [
  { name: "Worldwide", flag: "🌍", href: "/visa-interview-practice", detail: "Supported U.S. routes · choose your nationality" },
  { name: "Pakistan", flag: "🇵🇰", href: "/visa-interview-practice/pakistan", detail: "U.S. and eligible international routes" },
  { name: "India", flag: "🇮🇳", href: "/visa-interview-practice/india", detail: "U.S. and eligible international routes" },
  { name: "Bangladesh", flag: "🇧🇩", href: "/blog/us-visa-interview-questions-bangladesh", detail: "Supported U.S. routes · choose your nationality" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/visaprepper/" },
  { label: "TikTok", href: "https://www.tiktok.com/@visaprepper" },
  { label: "Facebook", href: "https://www.facebook.com/visaprepper/" },
];

export const PLANS = [
  { ...FREE_OFFER, description: "One document check and preparation guides.", personalized: false },
  { ...COMPLETE_OFFER, description: "Six interviews. Ten document checks. 90 days to practice.", personalized: true },
] as const;
