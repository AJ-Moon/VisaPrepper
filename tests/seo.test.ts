import test from "node:test";
import assert from "node:assert/strict";
import { SITE_URL } from "../lib/config/site";
import {
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebsiteJsonLd,
} from "../lib/seo/json-ld";
import { buildPageMetadata } from "../lib/seo/metadata";

test("brand schema connects the website and application to one publisher", () => {
  const organization = buildOrganizationJsonLd();
  const website = buildWebsiteJsonLd();
  const application = buildSoftwareApplicationJsonLd();

  assert.equal(organization["@id"], `${SITE_URL}/#organization`);
  assert.equal(website["@id"], `${SITE_URL}/#website`);
  assert.equal(application["@id"], `${SITE_URL}/#software`);
  assert.deepEqual(website.publisher, { "@id": organization["@id"] });
  assert.deepEqual(application.publisher, { "@id": organization["@id"] });

  for (const entity of [organization, website, application]) {
    assert.equal(entity.name, "VisaPrepper");
    assert.deepEqual(entity.alternateName, ["Visa Prepper", "visaprepper.com"]);
    assert.equal(new URL(entity.url).href, new URL(SITE_URL).href);
  }
  assert.equal(organization.logo, `${SITE_URL}/images/brand/visaprepper.jpg`);
  assert.equal(website.inLanguage, "en");
  assert.deepEqual(application.inLanguage, ["en", "ur", "hi"]);
});

test("application offers retain the current price and applicant availability", () => {
  const application = buildSoftwareApplicationJsonLd();
  assert.deepEqual(application.offers.map((offer) => offer.price).sort((a, b) => a - b), [0, 44]);

  for (const offer of application.offers) {
    assert.equal(offer["@type"], "Offer");
    assert.equal(offer.priceCurrency, "USD");
    assert.deepEqual(offer.eligibleRegion, [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "India" },
    ]);
    assert.ok(offer.url.startsWith(`${SITE_URL}/`));
  }
});

test("brand entities do not advertise unsupported review ratings", () => {
  for (const entity of [buildOrganizationJsonLd(), buildWebsiteJsonLd(), buildSoftwareApplicationJsonLd()]) {
    assert.ok(!("aggregateRating" in entity));
    assert.ok(!("review" in entity));
    assert.ok(!("reviewRating" in entity));
  }
});

test("page metadata keeps the public canonical and social brand consistent", () => {
  const metadata = buildPageMetadata({
    title: "Interview preparation",
    description: "Preparation for your own application.",
    path: "/features",
  });
  assert.equal(metadata.alternates?.canonical, `${SITE_URL}/features`);
  assert.equal(metadata.openGraph?.url, `${SITE_URL}/features`);
  assert.equal(metadata.openGraph?.siteName, "VisaPrepper");
});
