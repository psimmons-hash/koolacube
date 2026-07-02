# Koolacube CMS — Handoff

Resume doc for the CMS build on `koolacubenext`. Last updated after **Phase 1 complete & live-verified**.

## TL;DR

- A Supabase-backed admin CMS at `/admin`, modeled on the sibling project `../hvacrnext`.
- Goal: **every text on the site is editable** via structured field editors (not freeform).
- **Phase 1 = DONE and verified** against the live Supabase project (login works, tables exist, round-trip passes, `npm run build` green).
- **Phase 2 = NOT STARTED**: per-page text editors at `/admin/pages` (currently a placeholder). This is the remaining work.
- Full approved plan: `C:\Users\Frank\.claude\plans\virtual-gathering-lantern.md`.

## Connection / credentials

- Supabase project URL: `https://cjebtnwjpbthtysdrese.supabase.co`
- Keys live in `koolacubenext/.env.local` (gitignored): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable `sb_publishable_…`), `SUPABASE_SERVICE_ROLE_KEY` (secret `sb_secret_…`). New-style Supabase API keys — confirmed working with `@supabase/supabase-js`.
- Admin user already created + granted admin role: **psimmons@hvacrgroup.com.au** (password set during bootstrap; not stored in repo — rotate via Users → set password). ⚠️ Was shared in chat; recommend rotating.
- All SQL has been run (the combined `supabase/all.sql`). 8 tables exist: `user_profiles`, `activity_logs`, `site_settings`, `faqs`, `units`, `industries`, `messages`, `page_content`.

## Run it

```
cd koolacubenext
npm run dev          # note: if 3000 is busy it uses 3001
```
Then `/admin/login` → sign in. Public site at `/`.

`npx tsc --noEmit` and `npm run build` both pass clean.

## Architecture notes (important gotchas)

- **Route groups:** public pages live under `src/app/(site)/*` (so the admin doesn't inherit the marketing header/footer). The `(site)` group does NOT change URLs. Root `src/app/layout.tsx` is minimal (html/body); `(site)/layout.tsx` holds header/footer/JSON-LD; `admin/layout.tsx` holds the sidebar shell.
  - Gotcha when moving files: the IDE's node processes locked the top-level `buy/` and `hire/` dirs — had to move their *sub*dirs individually. If you move route dirs again and hit "permission denied", move the children.
- **Client/server import split (critical):** server-only libs (anything importing `@/lib/supabase/server` → `next/headers`) must NOT be imported by `"use client"` components, even transitively. This bit us twice:
  - `settings.ts` is client-safe (types + `SETTINGS_DEFAULTS` + `telHref`); the server reader is `settings.server.ts` (`getSettings`).
  - `FaqList` (client) imports only the **type** from `@/lib/faqs` and takes `items` as a required prop.
  - Rule: when a client component needs a type from a server-touching lib, use `import type`. When it needs data, pass it as props from a server parent.
- **Icons can't be stored in the DB.** Units/Industries store an icon **name string**; `src/lib/icons.ts` maps name→Lucide component via `getIcon(name)`. Editors pick from `ICON_NAMES`.
- **Public reads fall back to in-code defaults** so the site renders before anything is seeded: `DEFAULT_FAQS` (`lib/faqs.ts`), `DEFAULT_UNITS` (`lib/units.ts`), `DEFAULT_INDUSTRIES` (`lib/industries.ts`), `SETTINGS_DEFAULTS` (`lib/settings.ts`).
- **RLS pattern:** public can `select` published rows; any authenticated user can write (app-layer RBAC controls who reaches the admin). `messages` has no public insert — the contact form writes via the **service-role** client in `src/app/(site)/contact/actions.ts`. Logs are written via service role.
- **Known tradeoff:** public pages are now dynamic (SSR) because settings/faqs/units/industries use the cookie-based server client. Works fine. To restore static/ISR later: give public readers a plain anon client (no cookies) wrapped in `unstable_cache` with tags, and `revalidateTag` on save.

## Phase 1 file map

Foundation: `src/lib/supabase/{client,server,admin,logging}.ts`, `src/lib/rbac.ts`, `src/middleware.ts`, `src/lib/utils.ts`, `src/components/ui/{button,input,label,textarea,modal}.tsx`, `src/components/admin/fields.tsx` (StringList + IconPicker).

Admin shell: `src/app/admin/{layout,page,loading,AdminSidebar,actions}.tsx`, `src/app/admin/login/page.tsx`, `src/app/admin/home/page.tsx`.

Sections — each is `page.tsx` (server fetch, `force-dynamic`) + `*Client.tsx` + `actions.ts`:
- `src/app/admin/settings/*` → edits `site_settings`; wired into header/footer/CtaStrip/JSON-LD via `getSettings`.
- `src/app/admin/messages/*` → inbox (list/detail/status/delete).
- `src/app/admin/faqs/*` → CRUD + drag reorder + publish.
- `src/app/admin/units/*` → CRUD w/ specs + applications editor; "import current units" seed.
- `src/app/admin/industries/*` → CRUD w/ challenges + helps editor; seed.
- `src/app/admin/users/*` → create user, edit role/permissions, set password, delete.
- `src/app/admin/logs/*` → read-only audit feed.
- `src/app/admin/pages/page.tsx` → **PLACEHOLDER** (Phase 2 lands here).

Public wiring changed: `(site)/layout.tsx`, `components/site/{SiteHeader,SiteFooter,PageHero,ContactForm,FaqList}.tsx`, `(site)/page.tsx` (FAQ section async), `(site)/available-units/page.tsx`, `(site)/industries/page.tsx`, `lib/jsonld.ts`, `lib/site.ts` (unchanged consts).

SQL: `supabase/*.sql` (per-table) + `supabase/all.sql` (combined) + `supabase/README.md`.

Also done earlier this session (pre-CMS): legacy WordPress redirects in `next.config.ts`; `#faqs` anchor on home.

## Phase 2 — COMPLETE ✅

**All 23 pages are editable** via `/admin/pages`: `content` (13), `hire` (4), `buy` (3), about, contact, and **home**. The contact page also includes a full **enquiry-form editor** (labels, Need/Hire-Buy/Site-Access options, show/hide + required toggles for optional fields, acknowledgement, submit label, success message — `src/lib/content/contact-form.ts`, consumed by `ContactForm`). Build green (35 pages), tsc clean, homepage + all routes smoke-tested 200.

The CMS is feature-complete. Any future page added to the site: add it to `PAGES` in `registry.ts`, give it defaults + a `render-*`/editor following an existing template, and wire the `[key]` dispatch.

**Photo galleries (added 2026-07-02):** the 4 hire + 3 buy pages each have an optional admin-managed photo gallery. Optional `galleryTitle`/`galleryIntro`/`gallery: {src, alt}[]` on `HireStored`/`BuyStored`; uploads go to the public `media` bucket via the existing `ImageUploader` (WebP conversion), using the new `GalleryList` field in `components/admin/fields.tsx`. Public rendering is `components/site/PageGallery.tsx` (section hidden while empty, so defaults are unchanged). On buy pages the first gallery photo doubles as the Product JSON-LD image when `productImage` is unset.

### Historical progress notes

Per template, the pattern is: serializable defaults in `src/lib/content/<tpl>.ts` (icons as name strings) → `src/lib/content/render-<tpl>.tsx` (`get*Page` / `*Metadata` / `render*Page`, resolves icons via `getIcon`) → public page reduced to a tiny file calling those → an editor in `src/app/admin/pages/[key]/<Tpl>PageEditor.tsx` → wired into the `[key]/page.tsx` dispatch. Shared field kit: `src/components/admin/fields.tsx` (`StringList` with `multiline`, `PairList`, `IconPicker`). Icons added to `lib/icons.ts` as needed (Wallet, RefreshCw, ClipboardCheck, ShieldCheck, Lock, Cpu, Check). Hire/Buy advantages + About compliance/support store icon NAME strings.

**REMAINING — `home` (`/`) only.** `src/app/(site)/page.tsx` (~657 lines) has these editable sections (all currently hardcoded `const` arrays + JSX): Hero (badge, two-part title, intro, CTA labels, 3 trust pills), ProductCards (tag, heading, 3 products{type,price,daily,blurb}, footnote), Positioning (tag, heading, intro, industries[]), IncludedExcluded (tag, heading, included[], excluded[]), HireVsBuy (tag, heading, decisions[{need,best}], cta label), AvailablePreview (tag, heading, viewAll label, units[3]{type,dims,power,price,status}), TrustSection (tag, heading, intro, trust[{icon,label}]), ServiceArea (tag, heading, two blocks{label,headline,sub}, areas[]), Faq (tag+heading; list already from DB — leave), FinalCta (heading, intro, cta labels). FAQ stays DB-driven (`getPublishedFaqs`). Build a `HomeStored` in `src/lib/content/home.ts`, a `render-home.tsx` that rebuilds the layout (keep `SectionTag`), convert the page to a tiny file, add `HomePageEditor.tsx`, wire `entry.key === "home"` in the dispatch. It's the biggest editor — do it as a focused pass and verify the rendered homepage visually.

**Status of remaining infra notes (original):**

(historical) Earlier this slice covered just the `content` template:
- `src/lib/content/registry.ts` — `PAGES` (all 23 routes grouped, with `key`/`path`/`template`), `ContentPageData` type, `CONTENT_DEFAULTS` (defaults for all 13 content routes), `pathToKey`/`pageByKey`.
- `src/lib/content/page-content.server.ts` — generic `getPageContent(path, defaults)` (DB override shallow-merged over defaults) + `getAllPageOverrides()`.
- `src/lib/content/render-content.tsx` — `getContentPage` / `contentPageMetadata` / `renderContentPage` shared helpers.
- All 13 content routes under `src/app/(site)/…` reduced to ~12-line files using those helpers (text + SEO meta now DB-editable, fall back to defaults).
- Admin: `src/app/admin/pages/page.tsx` (list grouped by `group`, shows "Customised"), `src/app/admin/pages/[key]/page.tsx` (dispatch by template), `[key]/ContentPageEditor.tsx`, `pages/actions.ts` (`savePageContent` / `resetPageContent`). Permission `pages`. Build green, tsc clean.

**REMAINING — hire / buy / home / simple templates.** The `/admin/pages/[key]` route already lists these and shows "editor for this page type is coming" for non-content templates. To finish each, follow the content pattern: add a `*Stored` type + defaults to the registry, a `render-<tpl>.tsx` helper, convert the public pages to tiny files, add an editor component, and wire it into the `[key]` dispatch + extend `savePageContent` usage.

- **hire** (4 routes: `/hire/cold-room|freezer-room|dual-temp|long-term`): data shape is `HireData` (exported from `components/site/HireContent.tsx`). Current defaults are the `const data` objects inside each `hire/*/page.tsx` (all read this session). **Icon gotcha:** `HireData.advantages[].icon` is a `LucideIcon` — store as an icon *name string* and resolve via `getIcon()` at render (define a `HireStored` = HireData with `advantages: {icon: string,…}[]`). `defaultAdvantages` uses Zap/Boxes/Wrench; `long-term` also uses **Wallet** and **RefreshCw** — add those two to `src/lib/icons.ts` `ICONS`. Add `metaTitle`/`metaDescription` to the stored shape (pages currently have static `metadata`).
- **buy** (3 routes: `/buy/new|ex-hire|custom`): data shape `BuyData` (exported from `components/site/BuyContent.tsx`; `advantages` reuses `defaultAdvantages` → same icon-string treatment). Defaults are the `const data` in each `buy/*/page.tsx` — **not yet read**; read them first.
- **home** (`/`): bespoke, large (`(site)/page.tsx`, ~654 lines, many sections). Decide which sections to expose; biggest effort.
- **simple** (`/about`, `/contact`): bespoke (`about/page.tsx` ~213 lines; `contact/page.tsx` ~74 lines, hosts `ContactForm`). Editable hero/intro/body sections.

### Original plan reference (per the approved plan)
Build the "edit every text" layer:

1. **Content registry** `src/lib/content/registry.ts`: map each route → `{ label, template, defaults }`. Move the existing hardcoded page data objects (the `HireData` in each `hire/*` page, `BuyData` in each `buy/*` page, `ContentPage` props in the ~12 location/SEO pages + `service-areas`, plus home/about/contact bespoke) into these defaults.
2. **Server reader** `getPageContent(path, defaults)` (a `*.server.ts`): merge `page_content.data` (jsonb, keyed by `path`) over the in-code defaults.
3. **Public pages** become async server components that read `getPageContent` and pass the (DB-or-default) object into the existing presentational components — `HireContent`, `BuyContent`, `ContentPage` stay unchanged. Icons stay code-side (string-key mapping).
4. **Admin `/admin/pages`**: list routes grouped by template; build a small fixed set of editors keyed by template:
   - `HirePageEditor` (HireData) → 4 hire routes
   - `BuyPageEditor` (BuyData) → 3 buy routes
   - `ContentPageEditor` (eyebrow/crumb/title/intro/bullets) → ~12 location/SEO routes + service-areas
   - `HomePageEditor` (bespoke sections) → `/`
   - `SimplePageEditor` → `/about`, `/contact`
   - Each editor also edits SEO `metadata` (title/description), stored in the same `page_content.data`.
   - Reuse `StringList` / repeatable patterns from `src/components/admin/fields.tsx` and the `Modal`/`Toggle` from `src/components/ui/modal.tsx`.
5. `actions.ts`: upsert `page_content` by path + `logActivity` + `revalidatePath(route)`. Permission key already exists: `pages`.

Verification for Phase 2: edit a hire page hero + a spec, a location page's bullets, and a home section → confirm the public page reflects it after save; unedited pages still render from code defaults.

## Resuming checklist

- [ ] `npm run dev`, confirm `/admin/login` works.
- [ ] Build Phase 2 per the section above (registry → server reader → public page conversions → `/admin/pages` editors → actions).
- [ ] `npx tsc --noEmit` + `npm run build` after each step.
- [ ] Update the task list (TaskCreate/Update) and this file when done.
