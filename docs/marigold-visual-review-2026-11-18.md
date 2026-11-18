# VisaPrepper marigold visual refinement

18 November 2026. Local preview: http://127.0.0.1:3016/ . No commit, push or deployment.

## Visual changes

The live public application stylesheet `/assets/index-CFgrBeYb.css` supplies `#F5B841` marigold, `#FDF0D2` soft marigold and `#7A4F00` marigold ink. The older saved application checkout still has teal tokens; no application files were changed. The marketing refinement uses the live application's marigold palette, preserving existing forest, cream, sage, typography, layout and content.

Centralized tokens in `app/globals.css`:

- Marigold: `#F5B841`.
- Hover: `#EDAA2A`.
- Soft accent: `#FDF0D2`.
- Dark accent text: `#7A4F00`.
- Decorative warm border: `#DFC58F`.

Primary conversion accents use forest text on marigold. Secondary actions, support/WhatsApp, form controls, report status colors and most navigation remain in their established green/neutral treatments. Marigold is concentrated in conversion moments and small accents, not mechanically applied to every section. The approximate color balance was used as a design direction, not a measured pixel-area claim.

- Hero: primary free-document CTA, small eyebrow rule and underline beneath the existing “better preparation.” phrase. Existing headline words and CTA labels/destinations are unchanged.
- Hero illustration: restrained SAMPLE border/text, selected icon surfaces, sparkle and next-step detail. Existing content, illustration structure and assets remain.
- Navigation: marigold Start Free buttons and warm underline on hover; neutral/green links retained.
- Features: selected pale-marigold icon tiles and warm card borders on homepage and Features page, with restrained hover treatments.
- How It Works: marigold step markers on homepage and the existing How It Works page.
- Pricing: thin marigold inset accent, soft existing-eyebrow treatment, dark accent checkmarks and marigold paid-package CTA. Free package stays green. Pricing text and entitlements unchanged.
- Final CTA: marigold primary action against the existing forest background, also applied in the shared CTA section used on other marketing pages.
- Motion: gentle color transitions and a 1px CTA hover lift only for hover-capable devices with no reduced-motion preference. Existing reduced-motion overrides remain, and content visibility does not depend on animation.

## Exact source files changed

1. `app/globals.css`
2. `app/page.tsx`
3. `app/features/page.tsx`
4. `app/how-it-works/page.tsx`
5. `components/ui/Button.tsx`
6. `components/layout/CtaButton.tsx`
7. `components/layout/SiteHeader.tsx`
8. `components/marketing/HeroFixVisual.tsx`
9. `components/marketing/Pricing.tsx`
10. `components/marketing/CTASection.tsx`

The new accent variant is explicitly selected at relevant conversion points; the default primary button remains forest green. No dependency, form/email handler, application source, billing setting, route, product claim or article changed during this task. 218 other starting files remained byte-identical, preserving existing uncommitted work. The previously prepared release commit/archive has not been replaced; this visual revision remains in the local working tree for review.

## Verification

- Existing automated tests: **34 passed, 0 failed**.
- ESLint: passed.
- TypeScript: passed.
- Default production build (`npm run build`): passed; 52 generated outputs. Existing informational parent-lockfile scope warning remains.
- GET-only crawl: **44 canonical pages / 45 internal targets passed**.
- Full pre/post build comparison across all 44 pages: exact normalized visible copy, titles, meta tags, canonicals/alternates, structured-data objects and link destinations unchanged. Sitemap XML unchanged. Results: `review/2026-11-18-marigold/verification.json`.
- `git diff --check`: passed.
- Palette contrast calculations: forest text on marigold 7.00:1; hover 6.15:1; dark accent text on pale marigold 6.30:1; forest text on pale marigold 8.80:1; pale SAMPLE text on forest 8.80:1. These cover the new specified combinations, not an automated audit of every rendered pixel.
- Accent buttons retain visible focus states, including a light separator on cream and a gold outline on the forest CTA surface. Existing reduced-motion rules were preserved. These were checked in source, not through runtime keyboard testing.

## Browser and screenshot limitation

The browser tool returned “Local browser access is unavailable for this chat” before a page could open. No fresh before/after screenshots, desktop/tablet/mobile rendered layout review, measured overflow check, hover inspection or runtime keyboard/reduced-motion verification was completed. Historical screenshots remain untouched; none are presented as screenshots of this marigold revision. No screenshots were simulated or fabricated.

The local production preview remains running for manual review at:

- Homepage: http://127.0.0.1:3016/
- Pricing: http://127.0.0.1:3016/pricing
- Features: http://127.0.0.1:3016/features
- How It Works: http://127.0.0.1:3016/how-it-works

Review at 1440px, tablet, 390px and 320px before approving production: headline underline/wrapping, CTA focus/hover, mobile menu, selected feature cards, paid-card eyebrow wrapping and final CTA. No confirmed accessibility or responsive defect was found in the available source/contrast/build checks; rendered behavior remains unverified.

Local email credentials are deliberately unset. No messages, account changes, paid calls or transactions were made. No production changes.
