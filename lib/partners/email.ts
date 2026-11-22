import nodemailer from "nodemailer";
import { z } from "zod";
import type { PartnerApplication } from "./validation";

// The SMTP login is the sender, never the notification destination.
export const PARTNER_NOTIFICATION_RECIPIENT = "visaprepper@gmail.com";
export class PartnerEmailUnavailable extends Error {
  constructor(public readonly code: string, public readonly safeToRetry: boolean,
    public readonly smtpCode?: number) { super(code); }
}

export function gmailConfiguration() {
  const user = process.env.GMAIL_USER?.trim();
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!user || !z.email().safeParse(user).success || !password) {
    throw new PartnerEmailUnavailable("gmail_configuration_missing", true);
  }
  return { user, password };
}

export async function sendPartnerApplicationEmail(data: PartnerApplication, submittedAt = new Date().toISOString()) {
  const { user, password } = gmailConfiguration();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user, pass: password },
    connectionTimeout: 8_000, greetingTimeout: 8_000, socketTimeout: 15_000, dnsTimeout: 5_000,
    tls: { minVersion: "TLSv1.2", servername: "smtp.gmail.com" },
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "VisaPrepper", address: user },
      to: PARTNER_NOTIFICATION_RECIPIENT,
      replyTo: { name: data.fullName.replace(/[\r\n]+/g, " "), address: data.email },
      // A stable Message-ID aids reconciliation; the handler also suppresses duplicates within its running instance.
      messageId: `<partner-${data.requestId}@visaprepper.com>`,
      subject: `VisaPrepper partner application — ${data.businessName.replace(/[\r\n]+/g, " ")}`,
      text: [
        "New VisaPrepper partner application", "",
        `Application reference: ${data.requestId}`,
        `Submitted at (UTC): ${submittedAt}`,
        `Full name: ${data.fullName}`, `Email: ${data.email}`,
        `Business or creator name: ${data.businessName}`, `Country: ${data.country}`,
        `Partner type: ${data.partnerType}`, `Website or social profile: ${data.profileUrl}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Audience countries: ${data.audienceCountries.join(", ")}`,
        `Monthly applicants or audience: ${data.audienceRange}`, "",
        "How they will introduce VisaPrepper", data.introduction, "",
        "Experience helping visa applicants", data.experience || "Not provided", "",
        "Privacy acknowledgement: Yes", `Marketing updates: ${data.marketing ? "Yes" : "No"}`,
      ].join("\n"),
    });
    if (result.accepted?.some(address => String(address).toLowerCase() === PARTNER_NOTIFICATION_RECIPIENT)) {
      return { id: data.requestId, sent: true as const };
    }
    throw new PartnerEmailUnavailable("gmail_recipient_not_accepted",
      Boolean(result.rejected?.some(address => String(address).toLowerCase() === PARTNER_NOTIFICATION_RECIPIENT)));
  } catch (error) {
    if (error instanceof PartnerEmailUnavailable) throw error;
    const smtp = error as { code?: string; responseCode?: number; command?: string } | null;
    const responseCode = typeof smtp?.responseCode === "number" && smtp.responseCode >= 400 && smtp.responseCode < 600 ? smtp.responseCode : undefined;
    // Explicit SMTP rejection and pre-send authentication failures are safe to retry.
    // A lost connection/timeout may follow acceptance: never blindly resend it.
    const safeToRetry = smtp?.code === "EAUTH" || smtp?.code === "EENVELOPE" || responseCode !== undefined;
    const code = smtp?.code === "EAUTH" ? "gmail_authentication_failed"
      : smtp?.code === "ETIMEDOUT" ? "gmail_timeout"
      : safeToRetry ? "gmail_rejected" : "gmail_acceptance_unknown";
    throw new PartnerEmailUnavailable(code, safeToRetry, responseCode);
  } finally {
    // Cleanup must not turn an already accepted message into a reported failure.
    try { transport.close(); } catch { /* connection already closed */ }
  }
}
