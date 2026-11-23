"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { EXTERNAL_APP_URL, EXTERNAL_SIGNUP_URL } from "@/lib/config/site";
import { META_PIXEL_ID } from "@/lib/tracking/config";
import {
  type Attribution,
  isLandingPath,
  isPixelCountry,
  isTrackedPath,
  pickAttribution,
  toQueryString,
  withAttribution,
} from "@/lib/tracking/attribution";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: Fbq;
  loaded?: boolean;
  version?: string;
  disablePushState?: boolean;
  allowDuplicatePageViews?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const STORAGE_KEY = "vp_attribution";

/** Campaign fields from this URL, or from earlier in the same tab session. */
function rememberAttribution(): Attribution {
  const fromUrl = pickAttribution(window.location.search);
  try {
    const query = toQueryString(fromUrl);
    if (query) {
      window.sessionStorage.setItem(STORAGE_KEY, query);
      return fromUrl;
    }
    return pickAttribution(window.sessionStorage.getItem(STORAGE_KEY) ?? "");
  } catch {
    return fromUrl;
  }
}

function decorateAppLinks(attribution: Attribution) {
  if (!toQueryString(attribution)) return;
  for (const link of document.querySelectorAll<HTMLAnchorElement>(`a[href^="${EXTERNAL_APP_URL}"]`)) {
    link.href = withAttribution(link.href, attribution);
  }
}

/**
 * Meta's standard pixel queue, set up before fbevents.js loads. Automatic
 * events (button clicks, page metadata) and automatic page views on client
 * navigation are switched off, so only the events below are ever sent.
 */
function initPixel(pixelId: string): Fbq {
  if (window.fbq) return window.fbq;
  const fbq = function (this: unknown) {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    if (fbq.callMethod) fbq.callMethod(...Array.from(args));
    else fbq.queue?.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  fbq.disablePushState = true;
  // Page views are sent by hand on each tracked route change, so Meta must
  // not drop the second and later ones as duplicates of the first load.
  fbq.allowDuplicatePageViews = true;
  window.fbq = fbq;
  window._fbq = fbq;
  fbq("set", "autoConfig", false, pixelId);
  fbq("init", pixelId);
  return fbq;
}

export function MetaPixel() {
  const pathname = usePathname();
  const [pixelOn, setPixelOn] = useState(false);
  const attribution = useRef<Attribution>({});
  const eligible = useRef<Promise<boolean> | null>(null);

  // Campaign tags travel to the app on every page; this involves no Meta code.
  useEffect(() => {
    attribution.current = rememberAttribution();
    decorateAppLinks(attribution.current);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link || !link.href.startsWith(EXTERNAL_APP_URL)) return;
      link.href = withAttribution(link.href, attribution.current);
      if (window.fbq && link.href.startsWith(EXTERNAL_SIGNUP_URL) && isTrackedPath(window.location.pathname)) {
        window.fbq("trackCustom", "StartSignup");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!META_PIXEL_ID || !isTrackedPath(pathname)) return;
    let cancelled = false;
    eligible.current ??= fetch("/api/geo", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country?: unknown } | null) => isPixelCountry(data?.country))
      .catch(() => false);
    eligible.current.then((ok) => {
      if (!ok || cancelled) return;
      const fbq = initPixel(META_PIXEL_ID);
      fbq("track", "PageView");
      if (isLandingPath(pathname)) fbq("track", "ViewContent");
      setPixelOn(true);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return pixelOn ? (
    <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
  ) : null;
}
