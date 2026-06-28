# Ecommerce Factory

**Launch premium online stores from a single config.** Spin up a polished,
mobile-first storefront in minutes, customise it visually, and run many stores
from one install. Built for agencies and developers.

> **Install → Create store → Customise → Deploy.** That's the whole product.

```bash
npm install      # one-time
npm run setup    # pick a demo or a blank store
npm run dev      # open http://localhost:3000  (admin at /admin)
```

📚 **Docs:** [Setup](./docs/setup.md) · [Usage](./docs/usage.md) · [How it works](./docs/architecture.md)

> Built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS v4**,
> **TypeScript** and **lucide-react**. Premium luxury-dark design system, three
> polished demo stores, and a no-code admin — included.

---

## Quick start

```bash
npm install
npm run setup                     # guided: choose a demo or a blank store
npm run dev                       # http://localhost:3000  ·  admin at /admin
```

```bash
npm run create-store "Acme Co"    # or scaffold a store directly
npm run build && npm run start    # production build
```

**Which store renders is resolved per request**, by priority (no rebuild):

1. **Production domain / subdomain** — real stores only, mapped in
   `config/tenant-resolver.ts` (`lumen.watch` → LUMEN, `maison-noir.<host>` → MAISON NOIR).
2. **Environment variable** — `ACTIVE_CLIENT` / `NEXT_PUBLIC_ACTIVE_CLIENT`
   (explicit override; also the showcase path for demo stores).
3. **Default fallback** — `DEFAULT_CLIENT` in `config/active-client.ts`.

```bash
# Try production tenants locally against one running server (simulate the host):
curl -H "x-forwarded-host: lumen.watch"      http://localhost:3000   # → LUMEN
curl -H "x-forwarded-host: terraandash.com"  http://localhost:3000   # → TERRA & ASH
curl http://localhost:3000                                            # → default (MAISON NOIR)

# Showcase a demo store (demos are never host-routed):
ACTIVE_CLIENT=demo-lumen npm run start
```

> Demo imagery is served from [Lorem Picsum](https://picsum.photos) (stable,
> deterministic by seed), so the page renders real photography with zero API
> keys. Replace the `image` fields in the active `clients/client-*.ts` with your
> own product photos for a real store.

---

## Design philosophy: reuse, don't reinvent

The homepage is assembled from **one small design system** — never bespoke,
one-off markup per section. Three layers:

1. **UI kit** (`components/ui/`) — the design-system primitives. Tokens live in
   `app/globals.css`.
2. **Reusable building blocks** (`components/product/`) — most importantly the
   single `ProductCard`, shared by Featured, Flash Sale **and** Best Sellers.
3. **Sections** (`components/sections/`) — each is a thin, **fully props-driven**
   composition of the above. No section imports content; it all arrives as typed
   props from the config. Swap the config, get a new store.

Re-theme the **entire** store by editing the `@theme` block in
`app/globals.css` (one accent colour, two fonts, the surfaces).

---

## Folder structure

```
ecommerce-lite/
├─ app/
│  ├─ layout.tsx          # Root shell only (html/body, fonts, global CSS)
│  ├─ (storefront)/       # Storefront route group
│  │  ├─ layout.tsx       #   chrome (Header/Footer) + metadata + theme injection
│  │  └─ page.tsx         #   homepage — renders config → props per section
│  ├─ admin/              # ★ NO-CODE ADMIN (layer on top; storefront untouched)
│  │  ├─ layout.tsx       #   admin shell
│  │  ├─ dashboard/       #   active client + stats + links
│  │  ├─ clients/[id]/    #   brand · logo · colours · section order/toggles
│  │  ├─ editor/[id]/     #   hero · categories · products · testimonials · footer
│  │  └─ actions.ts       #   server actions (save/reset) → persist + revalidate
│  └─ globals.css         # Tailwind v4 + luxury-dark design tokens (@theme)
│
├─ components/
│  ├─ ui/                 # Design system (reused everywhere)
│  │  ├─ Button.tsx       #   polymorphic CTA (primary/gold/secondary/ghost)
│  │  ├─ Badge.tsx        #   pill labels (New, -30%, Bestseller)
│  │  ├─ Container.tsx    #   page width + gutters
│  │  ├─ Section.tsx      #   vertical rhythm wrapper
│  │  ├─ SectionHeading.tsx
│  │  ├─ IconButton.tsx   #   header actions w/ count chip
│  │  ├─ Rating.tsx       #   star rating
│  │  └─ Price.tsx        #   price + compare-at
│  │
│  ├─ product/
│  │  ├─ ProductCard.tsx  # ★ THE reusable card (image, wishlist, add-to-bag)
│  │  └─ ProductGrid.tsx  #   responsive grid → maps products to cards
│  │
│  ├─ layout/
│  │  ├─ Header.tsx       # Logo, nav, search, wishlist, cart (mobile drawer)
│  │  └─ Footer.tsx
│  │
│  └─ sections/           # ALL props-driven — no content imports
│     ├─ Hero.tsx
│     ├─ Categories.tsx
│     ├─ FeaturedProducts.tsx
│     ├─ FlashSale.tsx        # live countdown (mock)
│     ├─ BestSellers.tsx
│     ├─ TrustBadges.tsx      # guarantees + press marquee
│     ├─ Testimonials.tsx     # auto-advancing carousel
│     └─ Newsletter.tsx       # email capture w/ success state
│
├─ clients/               # ★ ONE FILE PER STORE (each a full ClientConfig)
│  ├─ client-a.ts         #   MAISON NOIR — luxury womenswear (seed)
│  ├─ client-b.ts         #   LUMEN       — fine watches & jewelry (seed)
│  ├─ client-c.ts         #   TERRA & ASH — home fragrance & objects (seed)
│  ├─ demo-maison-noir.ts #   ★ Demo Pack — Fashion (presentation-ready)
│  ├─ demo-lumen.ts       #   ★ Demo Pack — Tech
│  └─ demo-terra-ash.ts   #   ★ Demo Pack — Home / Lifestyle
│
├─ config/
│  ├─ types.ts            # all contracts (domain, section props, ClientConfig)
│  ├─ active-client.ts    # client registry + ClientKey + DEFAULT_CLIENT fallback
│  ├─ tenant-resolver.ts  # host → tenant (domain → env → default), pure logic
│  ├─ tenant.ts           # getActiveClient() — request host → EFFECTIVE config
│  ├─ client-store.ts     # ★ persistence: admin overrides (.data/clients.json) over seed
│  └─ theme-style.ts      # optional per-tenant colour-token CSS (admin-set)
│
├─ templates/
│  └─ registry.ts         # SectionKey → props-driven section component
│
└─ lib/
   └─ utils.ts            # cn(), formatPrice(), pad2(), discountPercent()
```

---

## Template system (multi-tenant Website Factory)

**The whole product, in two lines (frozen v1):**

```
ClientConfig  →  Runtime Resolver  →  Storefront
Admin  →  updates ClientConfig  →  reflects in Storefront
```

That is the entire mental model. Everything below is just where each arrow lives.

The whole store is **data-driven**. No section imports content; data flows
**client config → page → sections** as typed props. Multiple stores live side by
side in `clients/`, and the live one is resolved **per request from the host**.

```
                       request host (X-Forwarded-Host / Host)
                                        │
clients/client-a.ts ─┐                  ▼
clients/client-b.ts  ├─► active-client ─► tenant-resolver ─► tenant.getActiveClient()
clients/client-c.ts ─┘    (registry)     (domain→env→default)        │
                                                                     ▼
app/{layout,page}.tsx  await getActiveClient(), and for each enabled section…
templates/registry     …resolve SectionKey → component…
                       …inject config.content[key] as props
```

```ts
// app/page.tsx — resolved per request (no content, no styling)
const { pages, content } = await getActiveClient();
pages.home.sections.filter((s) => s.enabled).map((s) => {
  const Section = sectionRegistry[s.key];
  return <Section key={s.key} {...content[s.key]} />;
});
```

Reading the request host via `headers()` makes `/` dynamically rendered
(`ƒ` in the build output) — the same deployment serves a different store per host.

Type safety holds end-to-end: every `clients/*.ts` is typed `ClientConfig`, and
`registry` + `config.content` are both keyed by `SectionKey` and validated against
`SectionPropsMap` (`config/types.ts`) — a content slice can never drift from the
props its section expects.

**The active store is resolved at runtime** (domain → env → default). No client
is hardcoded in the app; the homepage, header, footer and every section
regenerate from whichever tenant the request resolves to. Verified end-to-end:
each host renders its own store with no cross-tenant leakage and zero component
changes.

**Add a new tenant:**

1. Create `clients/client-d.ts` exporting a `ClientConfig` (copy an existing one).
2. Register it in `config/active-client.ts` (`clients` map + `ClientKey`).
3. Map its domain/subdomain in `config/tenant-resolver.ts`. Done — no
   component/theme/styling change.

All three stores share the **same** design system (tokens in `app/globals.css` +
the `ui/` kit) — only content differs. Deeper factory features (theme presets,
new page types like PLP/PDP/cart, real cart state) are tracked, unimplemented, in
[`TEMPLATE_TODO.md`](./TEMPLATE_TODO.md).

---

## Demo Store Pack

Three fully polished, presentation-ready stores ship in `clients/` — complete
`ClientConfig`s with realistic catalogues, premium copywriting and conversion-led
sections (no placeholder data). All three reuse the shared design system
unchanged; they differ by **content only**.

> **Showcase only.** Demo stores are *never* host-routed in production — that keeps
> production and demo routing fully separated. Serve one explicitly with its env
> key, or open/edit it in `/admin`.

| Store | Vertical | Showcase command |
|---|---|---|
| **MAISON NOIR** | Fashion | `ACTIVE_CLIENT=demo-maison-noir npm run start` |
| **LUMEN** | Tech | `ACTIVE_CLIENT=demo-lumen npm run start` |
| **TERRA & ASH** | Home / Lifestyle | `ACTIVE_CLIENT=demo-terra-ash npm run start` |

They are registered as their own tenants (in `config/active-client.ts`), so they
appear in `/admin` and are editable — without touching the production
`client-a/-b/-c` seeds, their domains, or the default store.

---

## No-code admin

A visual admin layer (`/admin`) lets non-developers edit any store — **no code,
no rebuild**. It is strictly additive: the design system, storefront components
and tenant resolver are unchanged.

- **`/admin/dashboard`** — the active (host-resolved) store, per-tenant stats,
  and links into the editors.
- **`/admin/clients/[clientId]`** — brand name, logo, colours, and homepage
  **section order + show/hide**.
- **`/admin/editor/[clientId]`** — hero, categories, products, testimonials and
  footer text.

**How it syncs (config → store → storefront):**

```
Admin save ─► server action ─► client-store.ts writes .data/clients.json
                                         │  (admin override per tenant)
getActiveClient() ─► resolve host→key ─► getEffectiveClient(key)
                                         └─ override if present, else seed
```

Because the storefront is dynamic and reads the *effective* config per request,
a save appears on the next page load — verified live: editing the brand, hero,
products and toggling a section all reflected on a running server with no
restart, and **Reset** restores the pristine seed. Persistence is a simple local
JSON file (`.data/clients.json`, git-ignored); the static `clients/*.ts` remain
the seeds and are never mutated.

> The optional `brand.logo` / `brand.theme` fields are additive — unset (as all
> seeds are), the storefront renders byte-identically; set, colours are injected
> as the same CSS variables the shared theme already uses (the design system
> itself is never edited).

---

## Homepage sections

1. **Header** — logo, nav, search panel, wishlist & cart (with counts), mobile drawer
2. **Hero** — product-focused with dual CTAs and floating product/rating chips
3. **Categories** — editorial grid with featured tiles spanning two columns
4. **Featured products** — four-up "New In" edit
5. **Flash sale** — live countdown UI + discounted products
6. **Best sellers** — six-up social-proof grid
7. **Trust badges** — service guarantees + scrolling press marquee
8. **Testimonials** — auto-advancing carousel with manual controls
9. **Newsletter** — email capture with inline success state
10. **Footer** — brand, link columns, socials, payment/legal bar

---

## Wiring it to a real store

The demo is intentionally state-free. To make it live:

- **Cart / wishlist** — `ProductCard` and `Header` have stubbed handlers; wire
  them to your store (Zustand, Context, Shopify Hydrogen, etc.).
- **Content** — `config/client.ts` is hand-authored mock data; generate it from a
  CMS / commerce API instead (same `ClientConfig` shape from `config/types.ts`).
- **Newsletter** — point `Newsletter`'s `onSubmit` at Klaviyo / Mailchimp.
- **Images** — swap Picsum URLs for your CDN; `next.config.mjs` already allows
  remote patterns.

---

## Accessibility & quality notes

- Mobile-first throughout; tested layouts from 360px up.
- Keyboard-visible focus rings, skip-link, `aria-label`s on icon-only controls.
- `prefers-reduced-motion` disables animations.
- Semantic landmarks (`header`, `main`, `footer`, `article`, `blockquote`).
- Images use `next/image` with explicit `sizes` for good LCP/CLS.
