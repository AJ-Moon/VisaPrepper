export const SITE_URL = "https://visaprepper.com";
export const SITE_NAME = "VisaPrepper";

// The external VisaPrepper application (mock interview product itself).
// Every "Start Practicing" / "Log In" CTA on the marketing site should read
// from these two constants rather than hardcoding a URL.
export const EXTERNAL_APP_URL = "https://app.visaprepper.com";
export const EXTERNAL_LOGIN_URL = "https://app.visaprepper.com/login";

export const CONTACT_EMAIL = "hello@visaprepper.com";

export const CTA_PRIMARY_LABEL = "Start Practicing";
export const CTA_SECONDARY_LABEL = "See How It Works";

export type NavLink = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Visa Types", href: "/visa-types" },
  { label: "Features", href: "/features" },
  { label: "Languages", href: "/languages" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export const FOOTER_PRODUCT_LINKS: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Visa Types", href: "/visa-types" },
  { label: "Languages", href: "/languages" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export type Locale = {
  code: string;
  label: string;
  nativeLabel: string;
  status: "live" | "coming-soon";
};

// English is served unprefixed at "/" today. Urdu/Hindi/Bengali are
// intentionally not routed yet (see docs/i18n-architecture.md) — they're
// only ever rendered as "Coming Soon" chips, never as live/linkable pages,
// so we never misrepresent unfinished functionality as available.
export const LOCALES: Locale[] = [
  { code: "en", label: "English", nativeLabel: "English", status: "live" },
  { code: "ur", label: "Urdu", nativeLabel: "اردو", status: "coming-soon" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", status: "coming-soon" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", status: "coming-soon" },
];

export type VisaTypeSummary = {
  slug: string;
  code: string;
  name: string;
  shortLabel: string;
};

export const VISA_TYPES: VisaTypeSummary[] = [
  { slug: "b1-b2", code: "B1/B2", name: "Tourist & Business Visa", shortLabel: "Tourism & Business" },
  { slug: "f1", code: "F1", name: "Student Visa", shortLabel: "Students" },
  { slug: "h1b", code: "H1B", name: "Work Visa", shortLabel: "Professionals & Workers" },
  { slug: "h4", code: "H4", name: "Dependent Visa", shortLabel: "Dependents" },
  { slug: "j1", code: "J1", name: "Exchange Visitor Visa", shortLabel: "Exchange Visitors" },
  { slug: "family-immigrant", code: "Family / Immigrant", name: "Family-Based Immigrant Visa", shortLabel: "Family-Based Applicants" },
];
