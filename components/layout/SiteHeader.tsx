"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/layout/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { PRIMARY_NAV, EXTERNAL_LOGIN_URL } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-shadow duration-200",
        scrolled
          ? "border-border bg-background/90 shadow-sm shadow-black/5 backdrop-blur"
          : "border-transparent bg-background/70 backdrop-blur"
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-18">
        <Link href="/" className="shrink-0" aria-label="VisaPrepper home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton href={EXTERNAL_LOGIN_URL} variant="ghost" size="md" external>
            Log In
          </LinkButton>
          <CtaButton />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </Container>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <Container className="flex h-16 items-center justify-between sm:h-18">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </Container>
          <Container className="flex flex-col gap-1 pt-4 pb-8">
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3.5 text-lg font-medium text-foreground hover:bg-surface-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 px-3">
              <LinkButton
                href={EXTERNAL_LOGIN_URL}
                variant="secondary"
                size="lg"
                className="w-full"
                external
              >
                Log In
              </LinkButton>
              <CtaButton size="lg" className="w-full" />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
