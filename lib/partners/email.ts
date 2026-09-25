import type { PartnerApplication } from "./validation";

const RECIPIENT = "ajmoon2202@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT)}`;

export class PartnerEmailUnavailable extends Error {}

export async function sendPartnerApplicationEmail(data: PartnerApplication, transport: typeof fetch = fetch) {
  const payload = {
    _subject: `Visa Prepper partner application — ${data.businessName}`,
    _template: "table",
    _captcha: "false",
    _replyto: data.email,
    requestId: data.requestId,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone || "Not provided",
    businessOrCreatorName: data.businessName,
    country: data.country,
    partnerType: data.partnerType,
    socialProfile: data.profileUrl,
    audienceCountries: data.audienceCountries.join(", "),
    monthlyAudience: data.audienceRange,
    introduction: data.introduction,
    experience: data.experience || "Not provided",
    marketingUpdates: data.marketing ? "Yes" : "No",
  };
  const response = await transport(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://visaprepper.com",
      Referer: "https://visaprepper.com/partners/apply",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
    redirect: "error",
    cache: "no-store",
  });
  if (!response.ok) throw new PartnerEmailUnavailable("Email relay rejected the application.");
  const result = await response.json() as { success?: boolean | string };
  if (result.success !== true && result.success !== "true") throw new PartnerEmailUnavailable("Email relay did not confirm delivery.");
  return { id: data.requestId, sent: true as const };
}
