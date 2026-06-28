# Usage — creating & customising stores

Everything here is done with one command or in the visual admin. No code required.

## Create a store

**The easy way — guided:**

```bash
npm run setup
```

Pick a demo store or a blank one. Done.

**Direct — name a new store:**

```bash
npm run create-store "Acme Outfitters"
```

This builds a complete, ready-to-use store, registers it, and makes it active.
Open http://localhost:3000 to see it.

## Customise it (visually)

Open **http://localhost:3000/admin**:

- **Dashboard** — every store at a glance, with quick stats.
- **Brand & layout** — store name, logo, colours, and which homepage sections
  show (and in what order). Drag-free reordering with arrows; toggle to hide.
- **Edit content** — hero, categories, products, testimonials and footer text.

Hit **Save** and your storefront updates instantly — no rebuild. Made a mess?
**Reset to seed** restores the original.

## Production vs demo

The product keeps two kinds of store completely separate:

- **Production stores** — your real shops. Served on your real domains.
- **Demo stores** — the three showcase stores, for presentations only.

Demo stores are **never** shown to real customers. They only appear in **demo
mode**, which `npm run setup` turns on for you when you pick a demo. Your real
stores are unaffected.

## Going live

1. Build the production version:
   ```bash
   npm run build && npm run start
   ```
2. Make sure you're in production mode (the default) — see `.env.example`.
3. Point your domain at the store. Map it once in
   `config/tenant-resolver.ts` (or ask your developer to) — then that domain
   always shows that store.

That's the whole loop: **Install → Create store → Customise → Deploy.**

---

Next: **[architecture.md](./architecture.md)** — how it works, in plain terms.
