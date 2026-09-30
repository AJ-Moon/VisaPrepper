import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CONTACT_EMAIL } from "@/lib/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Refund Policy",
  description: "Visa Prepper refunds apply to verified service or billing failures. Read eligibility, exclusions and how to request help with a purchase.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs entries={[{ name: "Home", path: "/" }, { name: "Refund Policy", path: "/refund-policy" }]} />
      </Container>
      <Container className="py-10 sm:py-14">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Refund Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: September 30, 2026</p>

        <div className="mt-8 max-w-3xl rounded-2xl border bg-sage-soft p-6">
          <p className="font-semibold text-primary">Refunds are available for genuine service or billing failures.</p>
          <p className="mt-3 leading-relaxed">We do not offer refunds simply because you change your mind or do not like the product. If something we promised does not work or is not delivered, contact us so we can investigate and put it right.</p>
        </div>

        <div className="prose-vp mt-8 max-w-3xl">
          <h2>When a refund applies</h2>
          <p>A refund may apply when we verify a genuine failure on Visa Prepper&apos;s side, such as:</p>
          <ul>
            <li>You were charged, but your purchased package or credits were not provided.</li>
            <li>A technical failure prevents you from using a paid feature or receiving the interview report included in your purchase.</li>
            <li>A failed interview or document check incorrectly uses a credit and we cannot restore it or provide the affected service.</li>
            <li>A billing error results in a duplicate or incorrect charge.</li>
          </ul>
          <p>We review the affected purchase and service records. Where possible, we first correct the problem, restore access or credits, or provide the missing service. If a verified service failure cannot be resolved within a reasonable time, a full or partial refund applies according to the part of your purchase affected. Verified duplicate or incorrect charges will be corrected.</p>

          <h2>When we do not offer a refund</h2>
          <p>Except where applicable law requires otherwise, the following are not grounds for a refund:</p>
          <ul>
            <li>A change of mind or deciding that you no longer need the product.</li>
            <li>Simply disliking the experience, questions, feedback or scores when the service works as described.</li>
            <li>Receiving a visa refusal, missing your real interview, or getting a result you hoped would be different.</li>
            <li>Not using your package or allowing its stated validity period to expire.</li>
            <li>Problems caused solely by your internet connection, device, browser permissions, camera or microphone.</li>
            <li>Incorrect or incomplete information that you provide for your practice interview or document check.</li>
          </ul>
          <p>If a feature is genuinely faulty or materially different from what was advertised, we review it as a service failure even if you also describe your experience as disappointing. Visa Prepper helps you prepare; it does not guarantee visa approval or a particular interview score.</p>

          <h2>How to request help or a refund</h2>
          <p>Email <a href={`mailto:${CONTACT_EMAIL}?subject=Refund%20request`}>{CONTACT_EMAIL}</a> with the subject &ldquo;Refund request&rdquo;. Include:</p>
          <ul>
            <li>The email address used for your Visa Prepper account.</li>
            <li>Your order or payment reference and purchase date.</li>
            <li>A short explanation of what failed and when it happened.</li>
            <li>Any relevant error message or screenshot, with sensitive information removed.</li>
          </ul>
          <p>Report the issue as soon as you notice it so we can investigate. Do not send passwords, full card details, passports or private visa documents by email. We may ask for further information needed to verify the purchase or failure, and we will explain the outcome of our review.</p>

          <h2>Approved refunds</h2>
          <p>Approved refunds are returned through the original payment method where supported. The time for the refund to appear depends on the payment provider and your bank. A refund of an affected service also removes the corresponding refunded credits or access.</p>

          <h2>Your rights and earlier purchases</h2>
          <p>This policy does not limit any refund, cancellation or other consumer rights that cannot be excluded under applicable law. Earlier purchases retain the refund terms agreed at the time of purchase; this update does not remove those rights.</p>
          <p>Read this policy together with our <Link href="/terms">Terms of Service</Link>. For questions about a purchase, <Link href="/contact">contact our team</Link>.</p>
        </div>
      </Container>
    </>
  );
}
