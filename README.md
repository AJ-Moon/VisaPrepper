# VisaPrepper marketing site

The public marketing website for VisaPrepper — an AI visa mock-interview
platform. Next.js (App Router), deployed on Vercel.

## Stack

- Next.js 16 (App Router), TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`)
- `motion` for subtle scroll entrances and 3D card movement, simplified on small screens and for reduced-motion preferences
- Blog: plain `.mdx` files + `gray-matter` + `next-mdx-remote/rsc`
- Deploy: Vercel, connected to this GitHub repo — every push to `main` deploys automatically

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint
```

## Project structure

```
app/                    routes (App Router)
components/             UI components (layout/, hero/, marketing/, blog/, faq/, ui/)
content/blog/*.mdx      the preparation articles — add new posts here
content/visa-types/*.ts structured content for each visa-type landing page
lib/config/site.ts      SINGLE SOURCE for the app URL, contact email, nav links, visa types, locales
lib/config/offering.ts  package pricing, destination availability, and social profiles
lib/content/            content loaders (posts.ts, visa-types.ts)
lib/seo/                metadata + JSON-LD helpers
docs/i18n-architecture.md   how to add real Urdu/Hindi/Bengali locales later (not built yet — see file)
```

## Things you'll want to change before/at launch

The Android section says “Available on Google Play” per the owner's launch
status. Its store logo is informational until the owner supplies the actual
listing URL; no placeholder download link is used.

Brand assets in `public/images/brand/`: `visaprepper.jpg` is the owner-supplied
logo, used unchanged (with CSS framing for the small header mark).
`google-play.png` is the official lockup downloaded from Google's
[Partner Marketing Hub](https://partnermarketinghub.withgoogle.com/brands/google-play/google-play/lockups-icons-badges/?folder=86718).
The favicon uses the supplied logo. The previous favicon remains in Git history.

All in **`lib/config/site.ts`**:

- `EXTERNAL_APP_URL` / `EXTERNAL_LOGIN_URL` — currently `https://app.visaprepper.com`.
  Every "Start Practicing" / "Log In" button reads from here, so changing it
  in this one file updates the whole site.
- `CONTACT_EMAIL` — currently `hello@visaprepper.com`. Shown on `/contact`
  and in the footer. Make sure this inbox actually exists / forwards
  somewhere before launch.

**Legal pages**: `/privacy` and `/terms` are solid drafts covering the
standard sections, but were written by an AI, not a lawyer. Given the site
handles interview recordings and applicants across multiple countries,
have them reviewed by counsel before treating them as final — especially
the "governing law" gap (none was specified, since none was provided) and
any country-specific data protection requirements (e.g. India's DPDP Act)
that may apply to your actual user base.

## Adding a new blog post

Add a `.mdx` file to `content/blog/`. Frontmatter is validated at build time
(`lib/content/posts.ts`) — a missing required field fails the build loudly
instead of shipping a broken page. Required fields: `title`, `slug`,
`description`, `publishDate`, `author`, `primaryKeyword`. Optional:
`updatedDate`, `authorRole`, `tags` (drives "related posts"), `faq` (renders
an FAQ section + FAQPage schema), `draft: true` (excludes it from the site).

Drop a `<Disclaimer>...</Disclaimer>` anywhere in the MDX body for the
callout box style used across the launch articles.

## Adding/editing a visa type page

Each of the 6 visa-type landing pages (`/visa-types/[slug]`) is driven by a
typed content object in `content/visa-types/*.ts` (see `types.ts` for the
shape). Add a new file + register it in `lib/content/visa-types.ts`'s
`ALL_VISA_TYPES` array to add a new visa type.

## Deploying (Vercel)

This repo is already connected to Vercel — pushing to `main` triggers a
production deployment automatically, no config file needed (Vercel
zero-configs Next.js).

**Custom domain (visaprepper.com):** add it under the Vercel project's
Settings → Domains, then point your DNS at Vercel per the records shown
there. No code changes needed — `metadataBase` in `app/layout.tsx` already
points at `https://visaprepper.com`, so canonical/OG tags are correct from
the first deploy regardless of the interim `*.vercel.app` URL.

**Environment**: no environment variables are required for a working build.
See `.env.example` for release gates. Paid checkout stays disabled until the
application confirms the approved $44 / 6 interviews / 10 checks / 90-day offer.
Partner submissions stay disabled until a private, durable submission API is
configured. Neither feature should be enabled by changing marketing copy alone.

## Release verification

```bash
npm test
npm run lint
npm run build
npm run test:site -- http://localhost:3004
```

The site checker is read-only against non-local origins. Synthetic partner
submission tests run only on localhost. See `docs/release-readiness.md` for
the remaining app, partner, store-link and SEO dependencies.
