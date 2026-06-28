# How it works (in plain terms)

You don't need any of this to use the product — but here's the whole idea on one
page.

## The mental model

```
   A store's content   →   the system picks the right store   →   the storefront
   (one "config")                                                  your customers see

   The admin           →   edits that content                 →   storefront updates
```

That's it. Two arrows. Everything else is detail.

## The three things

1. **Stores are content, not code.**
   Each store is a single description — its name, colours, products, sections and
   copy. Creating a store means creating one of these; customising it means
   editing it (in the admin).

2. **One install serves many stores.**
   The same product can run many shops at once. When a visitor arrives, the
   system looks at the web address and shows that store's content. Different
   address → different store, from the same install.

3. **The admin edits the content; the storefront reflects it.**
   Save in the admin and the matching storefront updates on the next page load.
   Nothing is rebuilt; nothing is re-coded.

## Production vs demo

- **Production stores** are your real shops, shown on your real domains.
- **Demo stores** are three polished showcases for presentations. They are kept
  strictly separate and are **never** shown in the production flow.

## What you actually touch

| To… | You use… |
| --- | --- |
| Create a store | `npm run setup` or `npm run create-store "<name>"` |
| Customise a store | the visual admin at `/admin` |
| Run it locally | `npm run dev` |
| Go live | `npm run build && npm run start` + your domain |

You never have to understand "tenants", "resolvers" or "configs by hand" — the
setup command and the admin do it for you.

---

Back to **[setup.md](./setup.md)** · **[usage.md](./usage.md)**.
