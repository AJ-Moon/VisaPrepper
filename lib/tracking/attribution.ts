import { EXTERNAL_APP_URL } from "@/lib/config/site";
import { ATTRIBUTION_KEYS, LANDING_PATHS, PIXEL_COUNTRIES, TRACKED_PATHS } from "@/lib/tracking/config";

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;

// Plain tokens only: letters, digits and . _ ~ -. Name ads accordingly
// (for example doccheck_feed_v1). Values with spaces or other characters are dropped.
const SAFE_VALUE = /^[A-Za-z0-9._~-]{1,500}$/;

const APP_ORIGIN = new URL(EXTERNAL_APP_URL).origin;

/** Keeps the allowlisted campaign fields that have plain values. */
export function pickAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  const picked: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value && SAFE_VALUE.test(value)) picked[key] = value;
  }
  return picked;
}

export function toQueryString(attribution: Attribution): string {
  const params = new URLSearchParams();
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    if (value) params.set(key, value);
  }
  return params.toString();
}

/** Adds campaign fields to links into the app. Other links come back unchanged. */
export function withAttribution(href: string, attribution: Attribution): string {
  if (!toQueryString(attribution)) return href;
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href;
  }
  if (url.origin !== APP_ORIGIN) return href;
  for (const key of ATTRIBUTION_KEYS) {
    const value = attribution[key];
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}

function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

export function isTrackedPath(pathname: string): boolean {
  return TRACKED_PATHS.includes(normalizePath(pathname));
}

export function isLandingPath(pathname: string): boolean {
  return LANDING_PATHS.includes(normalizePath(pathname));
}

export function isPixelCountry(code: unknown): boolean {
  return typeof code === "string" && PIXEL_COUNTRIES.includes(code.toUpperCase());
}
