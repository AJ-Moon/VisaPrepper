import { COMPLETE_OFFER, FREE_OFFER } from "./offer";

export const DESTINATIONS = [
  { name: "United States", flag: "🇺🇸", status: "live", detail: "Student, visitor, work & family visas" },
  { name: "France & Schengen", flag: "🇫🇷", status: "coming-soon", detail: "Visa interview preparation" },
  { name: "Italy & Schengen", flag: "🇮🇹", status: "coming-soon", detail: "Visa interview preparation" },
  { name: "United Kingdom", flag: "🇬🇧", status: "coming-soon", detail: "Visa interview preparation" },
  { name: "Germany & general Schengen", flag: "🇩🇪", status: "coming-soon", detail: "Visa interview preparation" },
] as const;

export const APPLICANT_COUNTRIES = [
  { name: "Pakistan", flag: "🇵🇰", status: "live" },
  { name: "India", flag: "🇮🇳", status: "coming-soon" },
  { name: "Bangladesh", flag: "🇧🇩", status: "coming-soon" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/visaprepper/" },
  { label: "TikTok", href: "https://www.tiktok.com/@visaprepper" },
  { label: "Facebook", href: "https://www.facebook.com/visaprepper/" },
];

export const PLANS = [
  { ...FREE_OFFER, description: "One document check and preparation guides.", personalized: false },
  { ...COMPLETE_OFFER, description: "Six interviews. Ten document checks. 90 days to practise.", personalized: true },
] as const;
