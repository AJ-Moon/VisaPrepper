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
  { id: "free", name: "Free", price: 0, description: "Start with your documents.", interviews: 0, checks: 1, personalized: false },
  { id: "starter", name: "Interview Starter", price: 15, description: "Prepare with three realistic interviews.", interviews: 3, checks: 10, personalized: true },
  { id: "complete", name: "Interview Plus", price: 35, description: "More time to work on your answers.", interviews: 8, checks: null, personalized: true },
] as const;
