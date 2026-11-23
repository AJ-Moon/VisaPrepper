import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import sitemap from "../app/sitemap";
import { ATTRIBUTION_KEYS, LANDING_PATHS, PIXEL_COUNTRIES, TRACKED_PATHS } from "../lib/tracking/config";
import { isLandingPath, isPixelCountry, isTrackedPath, pickAttribution, withAttribution } from "../lib/tracking/attribution";

test("only allowlisted campaign fields with plain values are kept", () => {
  const picked = pickAttribution(
    "?utm_source=meta&utm_medium=paid_social&utm_campaign=vp_test1&utm_content=doccheck_feed_v1&utm_term=120210000000000&fbclid=IwAR0abc-DEF_123" +
      "&email=a%40b.com&nationality=PK&visa=f1&utm_extra=x",
  );
  assert.deepEqual(picked, {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "vp_test1",
    utm_content: "doccheck_feed_v1",
    utm_term: "120210000000000",
    fbclid: "IwAR0abc-DEF_123",
  });
  assert.deepEqual(pickAttribution("?utm_source=meta%20ads&utm_campaign=%3Cscript%3E&utm_content=a%40b.com"), {});
  assert.deepEqual(pickAttribution("?utm_source=" + "x".repeat(501)), {});
  assert.deepEqual([...ATTRIBUTION_KEYS].sort(), ["fbclid", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term"]);
});

test("campaign fields are added to app links only", () => {
  const tags = { utm_source: "meta", utm_campaign: "vp_test1" };
  assert.equal(withAttribution("https://app.visaprepper.com/signup", tags), "https://app.visaprepper.com/signup?utm_source=meta&utm_campaign=vp_test1");
  assert.equal(withAttribution("https://app.visaprepper.com/signup?utm_source=email", tags), "https://app.visaprepper.com/signup?utm_source=email&utm_campaign=vp_test1");
  assert.equal(withAttribution("https://visaprepper.com/pricing", tags), "https://visaprepper.com/pricing");
  assert.equal(withAttribution("https://wa.me/17325188581", tags), "https://wa.me/17325188581");
  assert.equal(withAttribution("https://app.visaprepper.com", {}), "https://app.visaprepper.com");
  assert.equal(withAttribution("not a url", tags), "not a url");
});

test("the pixel is limited to the ad markets and to pages that reveal nothing personal", () => {
  assert.deepEqual([...PIXEL_COUNTRIES], ["PK", "IN"]);
  assert.ok(isPixelCountry("pk") && isPixelCountry("IN"));
  for (const code of ["US", "GB", "DE", "BD", "", null, undefined, 42]) assert.equal(isPixelCountry(code), false, String(code));

  const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
  for (const path of TRACKED_PATHS) {
    assert.ok(sitemapPaths.has(path), `tracked path ${path} is a public page`);
    assert.doesNotMatch(path, /214b|refus|reject|spouse|ir1|cr1|second-attempt|hindi|urdu|pakistan|india|bangladesh|philippines/i, path);
  }
  for (const path of LANDING_PATHS) assert.ok(TRACKED_PATHS.includes(path), `${path} must also be tracked`);
  assert.ok(isTrackedPath("/document-checks/") && isLandingPath("/document-checks"));
  assert.equal(isTrackedPath("/blog/f1-visa-second-attempt-after-214b"), false);
  assert.equal(isTrackedPath("/privacy"), false);
});

test("pixel code sends no customer data and stays off the app", () => {
  const source = fs.readFileSync("components/analytics/MetaPixel.tsx", "utf8");
  assert.match(source, /fbq\("set", "autoConfig", false, pixelId\)/, "automatic events off");
  assert.match(source, /disablePushState = true/, "no automatic page views on client navigation");
  assert.match(source, /allowDuplicatePageViews = true/, "hand-sent page views on later tracked routes are not dropped");
  assert.match(source, /fbq\("init", pixelId\);/, "init without advanced-matching data");
  const calls = [...source.matchAll(/fbq\("(?:track|trackCustom)", "([A-Za-z]+)"\)/g)].map((m) => m[1]);
  assert.deepEqual(calls.sort(), ["PageView", "StartSignup", "ViewContent"]);
  assert.doesNotMatch(source, /\bem\b|email|phone|external_id|nationality/i);
  assert.ok(fs.readFileSync("app/layout.tsx", "utf8").includes("<MetaPixel />"));
});

test("the privacy policy describes the pixel", () => {
  const privacy = fs.readFileSync("app/privacy/page.tsx", "utf8");
  assert.match(privacy, /<h2>Advertising measurement<\/h2>/);
  assert.match(privacy, /does not run inside the Visa Prepper app/);
  assert.match(privacy, /Automatic advanced matching is turned off/);
});
