import test from "node:test";
import assert from "node:assert/strict";
import { REPORT_SAMPLES } from "../lib/content/report-samples";
import { CONTACT_PHONE_URL, WHATSAPP_URL, DOCUMENT_APP_URL, EXTERNAL_APP_URL } from "../lib/config/site";

test("simple document examples preserve gross-period arithmetic and distinguish matching net payments", () => {
  const uk = REPORT_SAMPLES.find(sample => sample.id === "uk")!;
  const gross = uk.findings[0];
  assert.deepEqual(gross.values.map(v => v.value), ["£36,000 annual gross base salary", "£2,500 monthly gross base pay"]);
  for (const value of ["12 months", "30,000", "6,000", "Neither"]) assert.ok(gross.explanation.includes(value), value);
  assert.match(uk.agreement!, /net payments do not explain/);
  const schengen = REPORT_SAMPLES.find(sample => sample.id === "schengen")!;
  assert.deepEqual(schengen.findings[0].values.map(v => v.value), ["15 December 2026", "16 December 2026"]);
  assert.match(schengen.findings[1].explanation, /13–14 December/);
  assert.match(schengen.findings[0].nextStep, /other coverage/);
});

test("public document examples have direct comparisons and no evidence or provenance payload", () => {
  const text = JSON.stringify(REPORT_SAMPLES);
  assert.doesNotMatch(text, /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|\.pdf|page \d|saved application|evidence|provenance|export|provider_payload|report_id/i);
  assert.equal(REPORT_SAMPLES.length, 3);
  for (const sample of REPORT_SAMPLES) {
    assert.ok(sample.findings.length > 1, "expanded reports have another example");
    for (const finding of sample.findings) {
      assert.equal(finding.values.length, 2);
      assert.ok(finding.explanation && finding.nextStep);
    }
  }
  assert.equal(DOCUMENT_APP_URL, EXTERNAL_APP_URL);
  assert.equal(WHATSAPP_URL, "https://wa.me/17325188581");
  assert.equal(CONTACT_PHONE_URL, "tel:+17325188581");
});
