import { COMPLETE_OFFER, FREE_OFFER } from "./offer";

export const DESTINATIONS = [
  { name: "United States", flag: "🇺🇸", status: "live", detail: "Preparation topics · check route access in the app" },
  { name: "France & Schengen", flag: "🇫🇷", status: "live", detail: "Preparation topics · check route access in the app" },
  { name: "Italy & Schengen", flag: "🇮🇹", status: "live", detail: "Preparation topics · check route access in the app" },
  { name: "United Kingdom", flag: "🇬🇧", status: "live", detail: "Preparation topics · check route access in the app" },
  { name: "Germany & general Schengen", flag: "🇩🇪", status: "live", detail: "Preparation topics · check route access in the app" },
] as const;

export const APPLICANT_COUNTRIES = [
  { name: "Pakistan", flag: "🇵🇰", status: "live" },
  { name: "India", flag: "🇮🇳", status: "live" },
  { name: "Bangladesh", flag: "🇧🇩", status: "coming-soon" },
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
