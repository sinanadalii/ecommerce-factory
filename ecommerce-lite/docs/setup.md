# Setup — install & run

Get a store running in a few minutes. No prior experience needed.

## 1. What you need

- A computer with **Node.js 20 or newer** ([download](https://nodejs.org)).
- A terminal (Terminal on Mac, PowerShell on Windows).

## 2. Install

In the project folder, run:

```bash
npm install
```

This downloads everything the product needs. You only do this once.

## 3. Create your first store

```bash
npm run setup
```

You'll be asked to choose:

1. A **demo store** (Fashion, Tech, or Home/Lifestyle) — great for a quick look.
2. A **blank store** — start from scratch with your own brand name.

Either way, your store is ready immediately.

## 4. Start it

```bash
npm run dev
```

Open **http://localhost:3000** in your browser — that's your storefront.
Open **http://localhost:3000/admin** to customise it.

## 5. Go live (when you're ready)

```bash
npm run build
npm run start
```

This runs the production version. Before deploying to real customers, see
[usage.md](./usage.md) → *Going live*.

---

Next: **[usage.md](./usage.md)** — creating and customising stores.
