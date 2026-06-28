# Template System — TODO Ledger

> **PRODUCT FREEZE — v1 LOCKED.** The multi-tenant system, the no-code admin and
> the Demo Store Pack are final for v1. Stabilization pass applied: the
> experimental bare-alias routing and dev-only subdomain shortcuts were removed,
> the dead `resolveActiveClient` helper was deleted, and production vs demo
> routing are now cleanly separated (production = host-routed real stores; demos =
> showcase-only via `ACTIVE_CLIENT`). No new features/architecture were added.
> Mental model: **ClientConfig → Resolver → Storefront**, and **Admin → ClientConfig → Storefront**.
>
> **PRODUCTIZED — v1.0.0.** Packaged for sale to agencies: `npm run setup`
> (onboarding) and `npm run create-store "<name>"` (scaffold + register + activate)
> wrap the manual steps; a `PRODUCT_MODE` env guard guarantees demo data can never
> appear in the production flow; `ClientKey` now derives from the registry (one
> source of truth, codegen markers); non-technical docs live in `/docs`. Packaging
> only — no storefront features, architecture or UI changed.

The store is now a **fully data-driven factory**: every section is a typed,
props-driven component fed from a single `config/client.ts`. The items below are
**intentionally NOT implemented** because each would require new UI components,
theme/design-system changes, or new styling logic — all out of scope by the
current rules. They are the backlog for a future, rules-relaxed phase.

> Rules in force: no UI/design changes · no new visual components · ui kit +
> theme untouched · only data-flow / component-contract refactors · missing → TODO.

---

## What IS done

- ✅ **Single source of truth** (`config/client.ts`) — brand, header, footer,
  page structure and ALL section content in one swappable object.
- ✅ **Type contracts** (`config/types.ts`) — domain types, per-section props,
  `SectionPropsMap`, `ClientConfig`.
- ✅ **Section prop injection** — all 8 sections + Header + Footer are fully
  props-driven; **no component imports content**. (Former `TODO(section-props)`.)
- ✅ **Section registry** (`templates/registry.ts`) — `SectionKey` → props-driven
  component, type-checked against `SectionPropsMap`.
- ✅ **Config-driven page** (`app/page.tsx`) — renders `config.pages.home` and
  injects `config.content[key]` as props (config → page → sections).
- ✅ **Config-driven shell** (`app/layout.tsx`) — metadata + Header/Footer from config.
- ✅ **Multi-tenant factory** — `clients/client-a|b|c.ts` (3 full stores) +
  `config/active-client.ts` (`clients` registry). (Former `TODO(content-presets)`.)
- ✅ **Runtime per-request tenancy** — `config/tenant-resolver.ts` (host → tenant,
  priority: domain → env → default) + `config/tenant.ts` (`getActiveClient()` reads
  the request host via `headers()`). `/` is now dynamically rendered; one
  deployment serves every tenant. (Former `TODO(per-tenant-routing)`.) Verified
  across domains, subdomains, env fallback and default — no cross-tenant leakage.
- ✅ **No-code admin layer** — `/admin` (dashboard + client editor + content
  editor) edits any store visually. Persistence: `config/client-store.ts` writes
  admin overrides to `.data/clients.json`; `getActiveClient()` reads the EFFECTIVE
  config (override ?? seed) so edits sync to the storefront instantly, no rebuild.
  Storefront moved into the `(storefront)` route group so `/admin` has its own
  chrome. Design system, storefront components and resolver untouched. Verified:
  live brand/content/section edits reflect on a running server; Reset restores seed.

- ✅ **Demo Store Pack** — three polished, presentation-ready stores
  (`clients/demo-maison-noir.ts` Fashion, `demo-lumen.ts` Tech, `demo-terra-ash.ts`
  Home/Lifestyle): complete `ClientConfig`s, realistic catalogues, premium copy,
  conversion-led sections. Registered as tenants (domains + `fashion`/`tech`/`home`
  aliases); dashboard + `getAllEffectiveClients` made registry-derived. Content
  only — shared design system untouched; original seeds + default unaffected.

- ✅ **Product packaging (v1.0.0)** — `npm run setup` (guided onboarding: demo or
  blank) + `npm run create-store "<name>"` (scaffold a complete `ClientConfig`,
  register it via codegen markers, activate it). `PRODUCT_MODE` guard (demo data
  can't leak into production). `ClientKey` derived from the registry. `.env.example`
  + non-technical `/docs` (setup · usage · architecture). Product-facing README.

These add zero design-system/storefront changes — only an additive config + admin layer.

---

## TODO — content & presets

- [x] **DONE(content-presets):** Multiple named client configs + selector —
      shipped as `clients/client-a|b|c.ts` + `config/active-client.ts`.
- [ ] **TODO(cms-adapter):** Generate each `ClientConfig` from a CMS / commerce
      API (Shopify, Sanity, etc.) instead of hand-authoring `clients/*.ts`.
- [x] **DONE(client-json):** Non-devs edit content via the `/admin` UI; overrides
      persist to `.data/clients.json` (the `client-store` overlay).
- [ ] **TODO(admin-auth):** The admin is unauthenticated (demo). Gate `/admin`
      behind auth before any non-local use.
- [ ] **TODO(durable-store):** `.data/clients.json` persists per Node instance;
      move to a DB/KV for multi-instance / serverless durability.
- [ ] **TODO(admin-tenant-crud):** Create/delete tenants and edit the other
      product lists (flash sale, best sellers) + trust/nav from the admin UI.
- [x] **DONE(per-tenant-routing):** Active client resolved per request from the
      host (domain → env → default) via `config/tenant-resolver.ts` + `tenant.ts`.
- [ ] **TODO(tenant-cache):** Cache resolved tenant per host and add an unknown-
      host strategy (e.g. marketing splash vs. silent default) for production.
- [ ] **TODO(middleware-rewrite):** Optionally resolve in `middleware.ts` and
      pass the tenant via a header, to keep pages thinner and enable edge caching.

## TODO — theming (out of scope by rule)

- [ ] **TODO(theme-presets):** Brand/theme presets (alt palettes, fonts).
      _Blocked by rule:_ "do not modify design system / theme system." Tokens in
      `app/globals.css` must stay as-is. (`config.theme` only *references* them.)
- [ ] **TODO(theme-switch):** Light mode / multi-brand token switching.

## TODO — additional page templates (need new components)

- [ ] **TODO(plp):** Category / product-listing page template.
- [ ] **TODO(pdp):** Product-detail page template.
- [ ] **TODO(cart):** Cart + mini-cart templates.
- [ ] **TODO(checkout):** Checkout flow template.
- [ ] **TODO(search):** Search results template.
- [ ] **TODO(not-found):** Branded 404 template.
      _All blocked:_ none can be assembled from the current section set; each
      needs new components. `ClientConfig.pages` already has slots reserved.

## TODO — section configurability (need new component props/variants)

- [ ] **TODO(section-variants):** Layout variants (e.g. alternate Hero / card
      styles, configurable grid columns). _Blocked:_ would be new components /
      new styling. Current props cover content, not layout.

## TODO — platform / factory plumbing

- [ ] **TODO(cart-state):** Real cart & wishlist state (handlers are stubs in
      `ProductCard` and `Header`).
- [ ] **TODO(schema-validation):** Validate `config/client.ts` against a schema
      (e.g. zod) at build time.
- [ ] **TODO(feature-flags):** Per-section feature flags / A-B testing.
- [ ] **TODO(analytics):** Section-level analytics / event hooks.
- [ ] **TODO(i18n-rtl):** Internationalisation + RTL toggle.
- [ ] **TODO(cli):** Factory CLI / generator to scaffold a new `config/client.ts`.
