import { createHash } from "node:crypto";
import { partnerApplicationSchema, type PartnerApplication } from "./validation";
import { gmailConfiguration, PartnerEmailUnavailable, sendPartnerApplicationEmail } from "./email";

const headers = { "Cache-Control": "no-store" };
const failureMessage = "We could not send your application. Your answers are still here. Please try again later or email visaprepper@gmail.com.";
const uncertainMessage = "We could not confirm delivery. Your answers are still here. To avoid duplicate emails, please contact visaprepper@gmail.com with this reference before submitting again.";
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
const RECEIPT_TTL = 24 * 60 * 60 * 1000;
type Receipt = { id: string; digest: string; submittedAt: string; updatedAt: number; state: "pending" | "accepted" | "retryable" | "uncertain"; acceptedAt?: string };
function sameOrigin(request: Request) {
  try {
    const rawOrigin = request.headers.get("origin");
    if (!rawOrigin) return false;
    const origin = new URL(rawOrigin);
    // Next may construct request.url with an internal hostname behind a proxy.
    // The actual Host header is the browser's destination; never trust an arbitrary forwarded host.
    const host = request.headers.get("host") ?? new URL(request.url).host;
    const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
    return origin.origin === rawOrigin && origin.host === host.toLowerCase()
      && (origin.protocol === "https:" || (origin.protocol === "http:" && loopback));
  } catch { return false; }
}
export function submissionDigest(data: PartnerApplication) {
  const { requestId: _requestId, ...content } = data;
  void _requestId;
  return hash(JSON.stringify({ ...content, audienceCountries: [...content.audienceCountries].sort() }));
}
type Dependencies = {
  send?: typeof sendPartnerApplicationEmail;
  configure?: () => unknown;
  now?: () => Date;
  log?: (record: Record<string, unknown>) => void;
};
export function createPartnerHandler(dependencies: Dependencies = {}) {
  const send = dependencies.send ?? sendPartnerApplicationEmail;
  const configure = dependencies.configure ?? gmailConfiguration;
  const now = () => (dependencies.now?.() ?? new Date());
  const writeLog = dependencies.log ?? ((record) => console.warn("Partner application delivery", record));
  const log = (record: Record<string, unknown>) => { try { writeLog(record); } catch { /* Logging cannot change delivery status. */ } };
  // Best-effort per warm function instance, not a cross-instance exactly-once guarantee.
  // Bounded caches store hashes/status only. No applicant answers are retained here.
  const receipts = new Map<string, Receipt>();
  const bindings = new Map<string, { digest: string; updatedAt: number }>();
  const rates = new Map<string, { count: number; until: number }>();
  return async function POST(request: Request) {
    if (!sameOrigin(request)) return Response.json({ error: "Please use the form on this website." }, { status: 403, headers });
    if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({ error: "Invalid form format." }, { status: 415, headers });
    let requestId: string | undefined;
    try {
      const time = now().getTime();
      for (const [key, rate] of rates) if (rate.until <= time) rates.delete(key);
      for (const [key, record] of receipts) if (record.updatedAt + RECEIPT_TTL <= time) receipts.delete(key);
      for (const [key, binding] of bindings) if (binding.updatedAt + RECEIPT_TTL <= time) bindings.delete(key);
      // On Vercel, x-forwarded-for is supplied by the hosting proxy. Its hash expires in a minute.
      const ip = hash(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown");
      if (!rates.has(ip) && rates.size >= 5000) return Response.json({ error: failureMessage, retryable: true }, { status: 503, headers });
      const rate = rates.get(ip) ?? { count: 0, until: time + 60_000 };
      rate.count++; rates.set(ip, rate);
      if (rate.count > 10) return Response.json({ error: "Please wait a minute before trying again. Your answers are still here.", retryable: true }, { status: 429, headers: { ...headers, "Retry-After": "60" } });
      const reader = request.body?.getReader();
      if (!reader) return Response.json({ error: "Form is empty." }, { status: 400, headers });
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        size += value.length;
        if (size > 16384) { await reader.cancel(); return Response.json({ error: "Your application is too long." }, { status: 413, headers }); }
        chunks.push(value);
      }
      let payload: unknown;
      try { payload = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
      catch { return Response.json({ error: "Invalid form format." }, { status: 400, headers }); }
      const parsed = partnerApplicationSchema.safeParse(payload);
      if (!parsed.success) return Response.json({ error: "Please check the highlighted answers.", fields: parsed.error.flatten().fieldErrors, retryable: true }, { status: 400, headers });
      const data = parsed.data; requestId = data.requestId;
      const digest = submissionDigest(data);
      const binding = bindings.get(data.requestId);
      if (binding && binding.digest !== digest) return Response.json({ error: "This submission reference belongs to different answers. Your answers are still here. Please reload the form before starting a new application.", reference: data.requestId, retryable: false }, { status: 409, headers });
      const existing = receipts.get(digest);
      if (existing && !binding) {
        if (bindings.size >= 4000) return Response.json({ error: failureMessage, retryable: true }, { status: 503, headers });
        bindings.set(data.requestId, { digest, updatedAt: time });
      }
      const success = (record: Receipt, status: number) => Response.json({ id: data.requestId, reference: record.id, status: "accepted", acceptedAt: record.acceptedAt, message: "Your application has been accepted by our email service. We will review it and contact you by email." }, { status, headers });
      if (existing?.state === "accepted") return success(existing, 200);
      if (existing && (existing.state === "pending" || existing.state === "uncertain")) {
        if (existing.state === "pending" && time - existing.updatedAt > 120_000) existing.state = "uncertain";
        return Response.json({ error: existing.state === "pending" ? "Your submission is still processing. Your answers are still here. Please wait a moment before checking again." : uncertainMessage, reference: existing.id, retryable: existing.state === "pending" }, { status: 409, headers: { ...headers, "Retry-After": "10" } });
      }
      configure(); // Configuration failures never reserve a send or claim success.
      if ((!existing && receipts.size >= 1000) || (!binding && bindings.size >= 4000)) {
        return Response.json({ error: failureMessage, reference: data.requestId, retryable: true }, { status: 503, headers });
      }
      const receipt: Receipt = existing ?? { id: data.requestId, digest, submittedAt: new Date(time).toISOString(), updatedAt: time, state: "pending" };
      receipt.state = "pending"; receipt.updatedAt = time;
      // No await between lookup/reservation: concurrent requests in this instance cannot both send.
      receipts.set(digest, receipt); bindings.set(data.requestId, { digest, updatedAt: time });
      try {
        await send({ ...data, requestId: receipt.id }, receipt.submittedAt);
      } catch (error) {
        const known = error instanceof PartnerEmailUnavailable;
        const retryable = known && error.safeToRetry;
        receipt.state = retryable ? "retryable" : "uncertain"; receipt.updatedAt = now().getTime();
        log({ event: "partner_email_failed", reference: receipt.id, code: known ? error.code : "gmail_acceptance_unknown", ...(known && error.smtpCode ? { smtpCode: error.smtpCode } : {}) });
        return Response.json({ error: retryable ? failureMessage : uncertainMessage, reference: receipt.id, retryable }, { status: 503, headers });
      }
      receipt.state = "accepted"; receipt.updatedAt = now().getTime(); receipt.acceptedAt = new Date(receipt.updatedAt).toISOString();
      log({ event: "partner_email_accepted", reference: receipt.id });
      return success(receipt, 201);
    } catch (error) {
      log({ event: "partner_submission_unavailable", ...(requestId ? { reference: requestId } : {}), code: error instanceof PartnerEmailUnavailable ? error.code : "unexpected_failure" });
      return Response.json({ error: failureMessage, reference: requestId, retryable: true }, { status: 503, headers });
    }
  };
}
