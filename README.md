# Koolacube

Marketing website for **Koolacube** — commercial cold room, freezer room and dual-temp
hire and sales across SE Queensland. Built with Next.js (App Router).

This project was migrated from a TanStack Start app and is intentionally free of any
Lovable scaffolding/tooling.

## Tech stack

- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (theme tokens defined in `src/app/globals.css`)
- **lucide-react** for icons
- **zod** for contact-form validation
- Fonts: **Inter** + **Barlow Condensed** via `next/font/google`

Dependency footprint is deliberately lean — no UI component library is bundled.

## Getting started

Requires **Node 18.18+** (Node 20+ recommended).
Source repository migrated to psimmons-hash on 25 August 2026.
```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run eslint
```

## Project structure

```
src/
  app/
    layout.tsx            Root layout: fonts, default metadata, header + footer shell
    globals.css           Tailwind import + design tokens (brand colours, fonts)
    page.tsx              Home page
    icon.png              Favicon (browser-tab logo)
    sitemap.ts            Generates /sitemap.xml
    not-found.tsx         404 page
    error.tsx             Error boundary
    about/                About page
    contact/              Contact page (renders the client ContactForm)
    available-units/      Cooler / Freezer / Dual Temp spec pages
    industries/           Industry sector landing page
    hire/                 cold-room · freezer-room · dual-temp · long-term
    buy/                  new · ex-hire · custom
    <seo-landing-pages>/  cold-room-hire-brisbane, …-for-butchers, etc.
  components/
    site/
      SiteHeader.tsx      Sticky nav + dropdowns + mobile menu (client component)
      SiteFooter.tsx      Footer
      PageHero.tsx        Shared page hero + CtaStrip
      ContentPage.tsx     Simple hero + bullets layout (used by SEO landing pages)
      HireContent.tsx     Data-driven layout for the four Hire tabs
      BuyContent.tsx      Data-driven layout for the three Buy tabs
      ContactForm.tsx     Zod-validated enquiry form (client component)
      FaqList.tsx         Home-page FAQ accordion (client component)
public/
  koolacube-logo.webp     Logo used in header & footer
  hero-coldroom.jpg, unit-*.jpg
  robots.txt
```

## Editing content

Most pages are **data-driven** — edit the data object at the top of the page file, not
the markup:

- **Hire tabs** (`src/app/hire/*/page.tsx`) — each exports a `HireData` object rendered by
  `HireContent`. Shared "Koolacube Advantages" and "Use Cases" live in
  `HireContent.tsx` as `defaultAdvantages` / `defaultUseCases`.
- **Buy tabs** (`src/app/buy/*/page.tsx`) — each exports a `BuyData` object rendered by
  `BuyContent`.
- **Industries** (`src/app/industries/page.tsx`) and **Available Units**
  (`src/app/available-units/page.tsx`) — edit the `industries` / `units` arrays in the file.
- **SEO landing pages** — render `ContentPage` with `title`, `intro` and `bullets` props.

Common changes:

| Want to change… | Edit |
| --- | --- |
| Nav links / dropdowns | `src/components/site/SiteHeader.tsx` |
| Footer links / contact details | `src/components/site/SiteFooter.tsx` |
| Brand colours, radius, fonts | `:root` tokens in `src/app/globals.css` |
| Default `<title>` / social metadata | `metadata` in `src/app/layout.tsx` |
| Per-page `<title>` / description | `metadata` export in that page file |
| Logo (header & footer) | replace `public/koolacube-logo.webp` |
| Browser-tab icon | replace `src/app/icon.png` |

## Page metadata & SEO

- Per-page `<title>`, description and Open Graph tags are set via the `metadata` export in
  each `page.tsx`.
- `metadataBase` is set to `https://koolacube.com.au` in `src/app/layout.tsx`.
- `src/app/sitemap.ts` lists all routes and uses the same domain — **update both if the
  production domain changes.**

## Deployment (Vercel)

This is a standard Next.js App Router project — Vercel detects it **zero-config**
(no `vercel.json` needed). Node version is pinned via `.nvmrc` (22) and
`engines.node` (`>=20`).

### Option A — Git (recommended)

1. Push this repo to GitHub/GitLab/Bitbucket:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset = **Next.js**, Root Directory = `./` (repo root). Leave build &
   output settings at their defaults (`npm run build`).
4. Deploy. Every push to `main` ships to production; other branches get preview URLs.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # first run links/creates the project (preview deploy)
vercel --prod   # production deploy
```

### Before going live

- **Set the production domain.** Update `https://koolacube.com.au` in
  `src/app/layout.tsx` (`metadataBase`), `src/app/sitemap.ts`, and `public/robots.txt`
  if the real domain differs, then add the domain under Vercel → Settings → Domains.
- No environment variables are required (the contact form is client-side only).

### Local production build

```bash
npm run build && npm run start
```
