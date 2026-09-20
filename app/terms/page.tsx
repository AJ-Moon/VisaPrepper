import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of the Visa Prepper website and practice interview platform.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]} />
      </Container>
      <Container className="py-10 sm:py-14">
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: September 20, 2026</p>

        <div className="prose-vp mt-8 max-w-3xl">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{" "}
            {SITE_NAME} website and practice interview platform (the &ldquo;Service&rdquo;).
            By using the Service, you agree to these Terms.
          </p>

          <h2>What Visa Prepper is</h2>
          <p>
            Visa Prepper is an independent visa interview preparation and
            practice tool. It helps applicants prepare with interviews built
            around their own circumstances and provides feedback on their
            answers and communication.
          </p>
          <p>
            <strong>
              Visa Prepper is not the U.S. Department of State, U.S.
              Citizenship and Immigration Services (USCIS), or any embassy or
              consulate.
            </strong>{" "}
            Visa Prepper does not make, influence, or have access to any
            actual visa decision. Nothing in the Service guarantees visa
            approval, predicts an outcome, or constitutes individualized
            immigration or legal advice. For legal advice about your specific
            case, consult a qualified immigration attorney.
          </p>

          <h2>New purchases and free access</h2>
          <p>The new package costs $44 USD once. It includes six AI practice interviews and ten document checks, including revised documents. The allowance is valid for 90 days from purchase. Six means six interviews total. There is no monthly subscription.</p>
          <p>Free access includes one document check once, preparation guides and a sample report. It does not include a live AI interview. You can buy the paid package again for more practice. Earlier purchases keep their original credits and terms. A new purchase must not remove valid remaining credits or reports.</p>
          <p>Check the final currency, total and refund terms before paying. If refund terms are missing or unclear, contact us before purchase. No refund guarantee is made on this page. Checkout stays unavailable until the new package is connected and release checks are complete.</p>
          <h2>Your account and responsibilities</h2>
          <ul>
            <li>You must provide accurate information when creating an account.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>
              You are responsible for the accuracy of the application details
              you share — Visa Prepper builds your practice interview from
              what you provide, and cannot verify it independently.
            </li>
          </ul>

          <h2>Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to disrupt, reverse-engineer, or interfere with the Service</li>
            <li>Misuse the Service to generate false documentation or misrepresent your identity to others</li>
            <li>Share your account access with people it wasn&rsquo;t created for</li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            The Service, including its design, software, and content, is
            owned by {SITE_NAME} or its licensors and is protected by
            applicable intellectual property laws. You retain ownership of
            the information and recordings you provide, and grant us the
            right to process them to operate the Service as described in our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>No guaranteed outcomes</h2>
          <p>
            Visa Prepper is a preparation and practice tool. We do not
            guarantee visa approval, interview success, or any specific
            outcome. Visa decisions are made solely by the relevant
            government authority based on factors outside Visa Prepper&rsquo;s
            knowledge or control.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind,
            express or implied. We do not warrant that the Service will be
            uninterrupted, error-free, or that feedback will be complete or
            free of mistakes.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {SITE_NAME} will not be
            liable for any indirect, incidental, or consequential damages
            arising from your use of the Service, including any visa
            interview outcome.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate access to the Service for violation
            of these Terms. You may stop using the Service and request
            account deletion at any time.
          </p>

          <h2>Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Service after changes take effect means you accept the updated
            Terms.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about these Terms can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
