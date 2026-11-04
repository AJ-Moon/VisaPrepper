import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "How Visa Prepper collects, uses, and protects your information, including application details and practice interview records.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]} />
      </Container>
      <Container className="py-10 sm:py-14">
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: November 1, 2026</p>

        <div className="prose-vp mt-8 max-w-3xl">
          <p>
            This Privacy Policy explains how {SITE_NAME} (&ldquo;Visa Prepper,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us&rdquo;) collects, uses, and protects information when you use our
            website and practice interview platform (the &ldquo;Service&rdquo;). It applies to
            visitors of this marketing website and to applicants using the
            Visa Prepper application.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Account information</strong> you provide when you sign
              up, such as your name and email address.
            </li>
            <li>
              <strong>Application and case details</strong> you choose to
              share to build your practice interview — for example your visa
              type, program or job, funding, sponsor, travel history, and
              similar circumstances.
            </li>
            <li>
              <strong>Interview records</strong> — questions, typed or transcribed answers, and feedback. Voice is streamed for live transcription; the app stores transcripts rather than applicant audio. Optional camera coaching is analysed on your device; summary measurements are sent to the service, rather than images or video.
            </li>
            <li>
              <strong>Usage and device information</strong>, such as browser
              type, device type, and general usage patterns on our website
              and app, collected automatically to keep the Service working
              well.
            </li>
          </ul>

          <h2>Partner applications</h2>
          <p>If you apply to become a partner, we use your contact, business, audience and application details to review the request and respond. Optional marketing consent is separate. Do not include passports, visa documents, bank details or applicant information.</p>
          <p>Partner applications are sent through FormSubmit, our email-form delivery provider, and then delivered to the Visa Prepper team by email. FormSubmit may temporarily process and retain submission data to provide that service. Applications are not public testimonials. The same data access and deletion contact below applies.</p>
          <h2>How we use your information</h2>
          <ul>
            <li>To generate and conduct your adaptive practice interviews</li>
            <li>To analyze your answers and communication and produce your feedback reports</li>
            <li>To operate, maintain, and improve the Service</li>
            <li>To communicate with you about your account or the Service</li>
            <li>To meet legal, security, and fraud-prevention obligations</li>
          </ul>

          <h2>How your information is protected</h2>
          <p>
            We use reasonable technical and organizational safeguards to
            protect your information, including encryption in transit and
            access controls limiting who can view your application details
            and interview records. No method of transmission or storage is
            completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>How long we keep your information</h2>
          <p>
            Account information, saved application details, pre-fill extractions and interview records are kept until you delete your account. A paid package’s 90-day validity is an allowance period, not a promise to retain reports for that period.

          </p>

          <p>Reusable Application Check files have a separate 90-day access period from upload. Previously issued private links last up to two minutes. Scheduled cleanup removes expired files, extraction caches and associated report evidence, with an operational target of 24 hours after expiry. You can delete files sooner. Deleting an Application Check report alone leaves reusable assets available until you delete them or they expire. Values you have accepted into your profile remain editable there.</p>
          <p>Legacy Document Check PDFs are retained until that check, application or account is deleted. Deleting a check removes its PDF, extracted text, report and file name; a minimal billing record remains. Pre-fill PDFs are not retained, but extracted text and suggested values are stored. Account deletion first removes uploaded files and then linked records; an unsuccessful file deletion is reported so you can retry. Provider backups and security records may remain on their own schedules.</p>
          <h2>Document review, interview processing and help</h2>
          <p>Document text, OCR evidence and relevant application facts are processed to produce a review. Suggested profile values are saved only when you accept them. Review does not authenticate an issuer or establish visa eligibility.</p>
          <p>The app uses OpenAI for document and interview processing, LiveKit for live audio transport, and AssemblyAI or Soniox for transcription. Storage is turned off on the app’s OpenAI requests; this does not establish a provider retention guarantee. Hosting, account and private file services also process data as needed to operate the app.</p>
          <p>WhatsApp help is an optional external link. Opening it takes you to WhatsApp under its own terms and privacy practices. Do not send passports, bank statements or payment details there; use the secure app for documents.</p>
          <h2>Sharing your information</h2>
          <p>
            We do not sell your personal information. We may share
            information with service providers who help us operate the
            Service (for example, hosting and infrastructure providers),
            under confidentiality and data protection obligations, or where
            required by law.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            Depending on where you live, you may have rights to access,
            correct, or delete your personal information, or to object to
            certain processing. You can exercise these rights by contacting
            us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2>International users</h2>
          <p>
            Visa Prepper currently supports applicants in Pakistan, with
            India available and Bangladesh coming soon. Our infrastructure may process
            information in countries other than your own. We take steps
            intended to protect your information consistent with this
            Privacy Policy wherever it is processed.
          </p>

          <h2>Children&rsquo;s privacy</h2>
          <p>
            The Service is intended for visa applicants and is not directed
            to children. We do not knowingly collect personal information
            from children under 13 (or the relevant minimum age in your
            country).
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will
            update the &ldquo;Last updated&rdquo; date above when we do, and material
            changes will be communicated where appropriate.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about this Privacy Policy can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
