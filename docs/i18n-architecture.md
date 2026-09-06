# Future localization architecture (Urdu, Hindi, Bengali)

This site ships English-only today, served unprefixed at `/`. This document
describes how to add real Urdu (`/ur`), Hindi (`/hi`), and Bengali (`/bn`)
localized versions later, without restructuring what already exists.

**Do not build stub `/ur`, `/hi`, `/bn` pages ahead of real content.** Thin or
placeholder localized pages are an SEO liability if crawled, and the brief
this site was built from is explicit that unfinished functionality must never
be presented as available. The homepage/footer language chips reflect this:
English links to `/`, the other three render as non-linking chips labeled
"Coming Soon" until real content exists.

## What's already in place to make this additive, not a rewrite

1. **Logical CSS properties everywhere** — `ps-`/`pe-`/`ms-`/`me-`/`text-start`/`text-end`
   are used instead of `pl-`/`pr-`/`ml-`/`mr-`/`text-left` throughout. These
   render identically in LTR today and flip automatically under `dir="rtl"`,
   which Urdu will need.
2. **Shared components take copy as props**, not hardcoded English strings
   (`FeatureSection`, `StepCard`, `VisaTypeCard`, `SectionHeading`, etc.).
   Localizing content becomes "pass a different content object", not
   "rewrite the component."
3. **Content lives in typed data files** (`content/visa-types/*.ts`,
   `content/blog/*.mdx`) separate from presentation — the same shape can be
   mirrored per locale.

## The pattern to follow when a locale is actually ready

Add a **sibling** route tree, not a nested one — English stays at the
unprefixed root:

```
app/
├── page.tsx                  # English, unprefixed — unchanged
├── visa-types/...            # English — unchanged
├── blog/...                  # English — unchanged
└── [locale]/                 # NEW — only ever ur / hi / bn, never "en"
    ├── layout.tsx             # sets <html lang={locale} dir={locale === 'ur' ? 'rtl' : 'ltr'}>
    ├── page.tsx
    ├── visa-types/[slug]/page.tsx
    └── blog/[slug]/page.tsx
```

`app/[locale]/layout.tsx`'s `generateStaticParams` should return **only**
`[{ locale: 'ur' }, { locale: 'hi' }, { locale: 'bn' }]` — never `'en'`, which
stays unprefixed at the true root.

Content mirrors today's shape under a locale-scoped path, e.g.
`content/ur/blog/*.mdx` and `content/ur/visa-types/*.ts`, so
`getPostBySlug(locale, slug)` extends the existing function by adding a
parameter rather than restructuring it.

## Fonts for each locale (not loaded today)

Add these to `lib/fonts.ts` only when the locale actually ships:

- **Urdu**: Noto Nastaliq Urdu (display/headings) + Noto Sans Arabic (body —
  more legible at small sizes than Nastaliq)
- **Hindi**: Hind or Noto Sans Devanagari
- **Bengali**: Hind Siliguri or Noto Sans Bengali

The narrow Noto subsets already used for the homepage/footer language chips
(`lib/fonts.ts` → `notoUrdu`, `notoHindi`, `notoBengali`) are the same
families — just widen the loaded weight/subset range when a locale goes from
"chip label only" to "full page."

## What NOT to add until there's more than one live locale

- No `next-intl`/`react-i18next` routing library — not worth the dependency
  for a single live locale.
- No `hreflang` / `alternates.languages` entries in metadata — they would
  point at URLs that don't exist yet, which is a real SEO error, not a
  neutral placeholder.
- No middleware-based automatic locale redirect — this is a static export
  (`output: 'export'`), and Next.js Middleware does not run under static
  export. A manual language-switcher link (as used today) is sufficient and
  fully static-export-compatible; automatic `Accept-Language` redirection
  isn't a hard requirement here.

## Deployment note

Adding `[locale]` routes is fully compatible with the existing GitHub Pages
static export pipeline — it's mechanically the same `generateStaticParams`
pattern already used for `/visa-types/[slug]` and `/blog/[slug]`. No changes
to `next.config.ts` or `.github/workflows/deploy.yml` are needed.
