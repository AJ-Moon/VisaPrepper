import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { LanguageChip } from "@/components/marketing/LanguageChip";
import {
  CONTACT_EMAIL,
  FOOTER_LEGAL_LINKS,
  FOOTER_PRODUCT_LINKS,
  LOCALES,
  SITE_NAME,
} from "@/lib/config/site";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal-800 text-on-charcoal">
      <Container className="grid gap-10 py-14 sm:py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo onCharcoal />
          <p className="mt-4 text-sm leading-relaxed text-on-charcoal-muted">
            Realistic visa interview practice built around your application.
          </p>
          <p className="mt-6 text-sm text-on-charcoal-muted">
            Preparing applicants across{" "}
            <span className="text-on-charcoal">Pakistan</span>,{" "}
            <span className="text-on-charcoal">India</span> and{" "}
            <span className="text-on-charcoal">Bangladesh</span>.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {LOCALES.map((locale) => (
              <li key={locale.code}>
                <LanguageChip locale={locale} size="sm" onCharcoal />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-on-charcoal">Product</h2>
          <ul className="mt-4 space-y-3">
            {FOOTER_PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-on-charcoal-muted transition-colors hover:text-on-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-on-charcoal">Company</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link
                href="/about"
                className="text-sm text-on-charcoal-muted transition-colors hover:text-on-charcoal"
              >
                About
              </Link>
            </li>
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-on-charcoal-muted transition-colors hover:text-on-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-on-charcoal-muted transition-colors hover:text-on-charcoal"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border-on-charcoal">
        <Container className="flex flex-col gap-3 py-6 text-xs leading-relaxed text-on-charcoal-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="max-w-2xl sm:text-end">
            {SITE_NAME} is an independent visa interview preparation tool. It
            is not the U.S. Department of State, USCIS, or any embassy or
            consulate, and does not decide visa eligibility or predict
            interview outcomes.
          </p>
        </Container>
      </div>
    </footer>
  );
}
