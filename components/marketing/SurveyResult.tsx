import { PREPARATION_SURVEY } from "@/lib/content/testimonials";
/** No visible claim without a complete, reviewed evidence record. Not visa approval. */
export function SurveyResult() {
  const s = PREPARATION_SURVEY;
  if (!s || !s.question || !s.evidenceReference || !s.method || !s.from || !s.to || !Number.isInteger(s.respondents) || s.respondents < 1 || !Number.isInteger(s.positiveResponses) || s.positiveResponses < 0 || s.positiveResponses > s.respondents) return null;
  return <aside className="rounded-2xl border p-6"><p>{Math.round(100*s.positiveResponses/s.respondents)}% of surveyed users reported feeling more prepared.</p><p className="mt-3 text-sm">{s.respondents} respondents · {s.from} to {s.to}. Question: {s.question}. Method: {s.method}. Self-reported preparation, not visa approval.</p></aside>;
}
