// Paid-social measurement for the marketing site only. The app
// (app.visaprepper.com) never loads the Meta Pixel, so document,
// interview and report screens stay outside Meta's reach.

/**
 * Meta dataset (pixel) ID from Events Manager. Empty means the pixel never
 * loads. Pixel IDs are public: they ship in page code once installed.
 */
export const META_PIXEL_ID = "";

/**
 * Countries, from Vercel's visitor-country header, where the pixel may load.
 * They match the ad markets. Everywhere else the pixel stays off, which also
 * keeps it away from visitors covered by cookie-consent rules (EU, UK, US states).
 */
export const PIXEL_COUNTRIES: readonly string[] = ["PK", "IN"];

/**
 * Pages where the pixel may record events. Pages about refusals, spouses or
 * other personal circumstances stay out, so no URL sent to Meta hints at a
 * visitor's visa history or status. Add a page here before an ad links to it.
 */
export const TRACKED_PATHS: readonly string[] = [
  "/",
  "/document-checks",
  "/visa-interview-practice",
  "/pricing",
  "/blog/us-visa-interview-documents-checklist",
];

/** Ad landing pages that also send ViewContent. */
export const LANDING_PATHS: readonly string[] = [
  "/document-checks",
  "/visa-interview-practice",
  "/blog/us-visa-interview-documents-checklist",
];

/**
 * Campaign fields copied from a landing-page URL onto links to the app, so the
 * app can count sign-ups by campaign. Any other query parameter is dropped.
 */
export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
