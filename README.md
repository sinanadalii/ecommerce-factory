# Ecommerce Factory

**Launch premium, multi-tenant online stores from a single codebase.** This
repository contains two applications:

| App | Folder | What it is |
| --- | --- | --- |
| **Engine** | [`ecommerce-lite/`](./ecommerce-lite) | The product — a multi-tenant store engine with a no-code admin, a demo store pack, and a setup CLI. |
| **Marketing site** | [`marketing-site/`](./marketing-site) | The sales/landing page that sells the engine. |

Both apps are built with **Next.js 15 (App Router)**, **React 19**,
**Tailwind CSS v4** and **TypeScript**, and share one luxury-dark design system.

---

## Repository structure

```
ecommerce-factory/
├─ ecommerce-lite/      # the engine (multi-tenant store system + admin + CLI)
├─ marketing-site/      # the marketing / landing site
└─ README.md            # you are here
```

> Each app is self-contained with its own `package.json`. There is no root
> install step — install and run each app from its own folder.

---

## Prerequisites

- **Node.js 20+** ([download](https://nodejs.org))
- A terminal (PowerShell, Terminal, etc.)

---

## Run the engine (`ecommerce-lite`)

```bash
cd ecommerce-lite
npm install
npm run setup        # guided: pick a demo store or a blank one
npm run dev          # http://localhost:3000   ·   admin at /admin
```

Create a brand-new store any time:

```bash
npm run create-store "Acme Co"
```

Production build:

```bash
npm run build && npm run start
```

More detail in [`ecommerce-lite/docs/`](./ecommerce-lite/docs) (setup · usage · architecture).

---

## Run the marketing site (`marketing-site`)

```bash
cd marketing-site
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build && npm run start
```

> Tip: to run both apps at once locally, start them in two terminals — the
> second will offer the next free port (e.g. 3001).

---

## Deploy (Vercel recommended)

This is a **monorepo with two apps**, so create **two Vercel projects** from the
same GitHub repository — one per app — using each app's folder as the project
**Root Directory**:

| Vercel project | Root Directory | Notes |
| --- | --- | --- |
| `ecommerce-factory-engine` | `ecommerce-lite` | Set `PRODUCT_MODE=production` (default). The homepage renders dynamically per host. |
| `ecommerce-factory-marketing` | `marketing-site` | Static — no environment variables required. |

Steps:

1. Push this repo to GitHub (see below) and import it in Vercel.
2. Add a project, set **Root Directory** to `ecommerce-lite`, deploy.
3. Add a second project, set **Root Directory** to `marketing-site`, deploy.
4. (Engine) point each client's domain at the engine project and map it in
   `ecommerce-lite/config/tenant-resolver.ts`.

Vercel auto-detects Next.js — no custom build command needed. Both apps also run
anywhere Next.js runs (a VPS, a container, etc.).

### Environment variables

Copy the example files and adjust as needed (both are git-ignored once copied):

```bash
cp ecommerce-lite/.env.example  ecommerce-lite/.env.local
cp marketing-site/.env.example  marketing-site/.env.local
```

- **Engine** — `PRODUCT_MODE` (`production` | `demo`) and optional `ACTIVE_CLIENT`.
  In `production` mode, demo stores are never served.
- **Marketing site** — none required.

---

## License

Proprietary. © Ecommerce Factory. All rights reserved.
