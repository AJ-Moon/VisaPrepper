export type PartnerAttempt = { id: string; fingerprint: string; blocked?: boolean; accepted?: boolean; reference?: string };
export const PARTNER_ATTEMPT_KEY = "visaprepper:partner-submission";
export async function preparePartnerAttempt(values: Record<string, unknown>, previous: PartnerAttempt | null): Promise<PartnerAttempt> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(values)));
  const fingerprint = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
  return previous?.fingerprint === fingerprint ? previous : { id: crypto.randomUUID(), fingerprint };
}
export function readPartnerAttempt(): PartnerAttempt | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(PARTNER_ATTEMPT_KEY) ?? "null");
    return value && typeof value.id === "string" && /^[0-9a-f-]{36}$/i.test(value.id)
      && typeof value.fingerprint === "string" && /^[0-9a-f]{64}$/.test(value.fingerprint)
      && (value.blocked === undefined || typeof value.blocked === "boolean")
      && (value.accepted === undefined || typeof value.accepted === "boolean")
      && (value.reference === undefined || (typeof value.reference === "string" && /^[0-9a-f-]{36}$/i.test(value.reference))) ? value : null;
  } catch { return null; }
}
export function savePartnerAttempt(attempt: PartnerAttempt | null) {
  // Only the reference/hash is stored, never the applicant's answers.
  try {
    if (attempt) sessionStorage.setItem(PARTNER_ATTEMPT_KEY, JSON.stringify(attempt));
    else sessionStorage.removeItem(PARTNER_ATTEMPT_KEY);
  } catch { /* The form also works when browser storage is unavailable. */ }
}
