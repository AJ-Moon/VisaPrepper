# VisaPrepper marketing site

The public marketing website for VisaPrepper — an AI visa mock-interview
platform. Next.js (App Router), fully static export, deployed to GitHub
Pages via GitHub Actions.

## Stack

- Next.js 16 (App Router), TypeScript, `output: 'export'` — fully static, no server
- Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`)
- `motion` (Framer Motion's successor) for the homepage hero scroll animation
- Blog: plain `.mdx` files + `gray-matter` + `next-mdx-remote/rsc`
- Deploy: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`)

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build, outputs static site to ./out
npm run lint
```

## Project structure

```
app/                    routes (App Router)
components/             UI components (layout/, hero/, marketing/, blog/, faq/, ui/)
content/blog/*.mdx      the 12 launch articles — add new posts here
content/visa-types/*.ts structured content for each visa-type landing page
lib/config/site.ts      SINGLE SOURCE for the app URL, contact email, nav links, visa types, locales
lib/content/            content loaders (posts.ts, visa-types.ts)
lib/seo/                metadata + JSON-LD helpers
docs/i18n-architecture.md   how to add real Urdu/Hindi/Bengali locales later (not built yet — see file)
```

## Things you'll want to change before/at launch

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

## Deploying (GitHub Pages)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is already
written and will auto-deploy on every push to `main` — but this repo hasn't
been pushed to GitHub yet. To go live:

1. **Create the GitHub repo** (from this directory):
   ```bash
   gh repo create visaprepper --public --source=. --remote=origin
   ```
   (No `gh` CLI? Create an empty repo named `visaprepper` at
   github.com/new, then: `git remote add origin <the repo's URL>`.)

2. **Push:**
   ```bash
   git add -A
   git commit -m "Initial VisaPrepper marketing site"
   git push -u origin main
   ```

3. **Turn on Pages**: repo Settings → Pages → Source → **GitHub Actions**
   (not "Deploy from a branch"). The workflow will run automatically on the
   push above — check the Actions tab for progress. Once it finishes, your
   site is live at `https://<your-username>.github.io/visaprepper/`.

4. **Custom domain (visaprepper.com), when DNS is ready:**
   - Add a `public/CNAME` file containing exactly `visaprepper.com` (no
     protocol), commit, and push. Don't add this before DNS is actually
     pointed at GitHub Pages — GitHub acts on this file's presence
     immediately, which can break the interim `github.io` URL in the
     meantime.
   - Point your DNS at GitHub Pages per
     [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
   - Once DNS has propagated, enable "Enforce HTTPS" in the same repo
     Settings → Pages screen.
   - No code changes needed beyond the `CNAME` file — `next.config.ts`
     already reads its `basePath` from what the deploy workflow detects, so
     the site adapts automatically once a custom domain is attached.

After the initial push, every future `git push` to `main` redeploys the site
automatically — that's the whole point of the Actions workflow.
