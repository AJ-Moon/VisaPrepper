export const SITE_URL = "https://visaprepper.com";
export const SITE_NAME = "VisaPrepper";
// Date of the last substantive marketing content update, not the build time.
export const SITE_CONTENT_UPDATED = "2026-09-08";

// The external VisaPrepper application (mock interview product itself).
// Every "Start Practicing" / "Log In" CTA on the marketing site should read
// from these two constants rather than hardcoding a URL.
export const EXTERNAL_APP_URL = "https://app.visaprepper.com";
export const EXTERNAL_LOGIN_URL = "https://app.visaprepper.com/login";

export const CONTACT_EMAIL = "hello@visaprepper.com";

export const CTA_PRIMARY_LABEL = "Start free";
export const CTA_SECONDARY_LABEL = "See prices";

export type NavLink = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavLink[] = [
  { label: "Destinations", href: "/visa-types" },
  { label: "Prices", href: "/#pricing" },
  { label: "Languages", href: "/languages" },
  { label: "Free tips", href: "/blog" },
];

export const FOOTER_PRODUCT_LINKS: NavLink[] = [
  { label: "Prices", href: "/#pricing" },
  { label: "What you get", href: "/features" },
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

// Interview language availability; the website uses English routes with
// short native-language introductions, not full translated pages.
export const LOCALES: Locale[] = [
  { code: "en", label: "English", nativeLabel: "English", status: "live" },
  { code: "ur", label: "Urdu", nativeLabel: "اردو", status: "live" },
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
