import test from "node:test";
import assert from "node:assert/strict";
import { INTERVIEW_SAMPLE as sample, INTERVIEW_REPORT_TABS } from "../lib/content/interview-sample";

test("fictional examples connect believable answers to specific preparation without real measurements", () => {
  assert.equal(sample.label, "Illustrative sample");
  assert.match(sample.description, /Fictional answers and feedback/);
  assert.equal(sample.examples[0].answer, "My father is sponsoring me. He runs an established business, and he can afford my tuition and living expenses. We also have savings set aside for my studies.");
  assert.equal(sample.examples[1].question, "Why did you choose this university?");
  assert.equal(sample.examples[2].question, "What will you do after graduation?");
  assert.match(sample.examples[2].nextStep, /Don’t invent job offers or commitments/);
  assert.deepEqual(INTERVIEW_REPORT_TABS, ["Summary", "Priorities", "Answer Review", "Transcript"]);
  const text = JSON.stringify(sample);
  assert.doesNotMatch(text, /fundingScore|communication|camera|\d+\/100|\d+%|words\/min|2 minutes|real mock interview|He afford me|Yeah, yeah|report_id|https?:|@/i);
});
