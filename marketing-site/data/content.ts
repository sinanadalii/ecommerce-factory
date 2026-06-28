/**
 * All marketing copy for the Ecommerce Factory sales site, in one place.
 * Conversion-focused; every section answers a specific buyer question.
 */

export const PRODUCT = {
  name: "Ecommerce Factory",
  tagline: "Launch premium online stores in minutes, not months.",
  email: "hello@ecommercefactory.com",
} as const;

const envUrl = (value: string | undefined): string | undefined => {
  value = value?.trim();
  return value && value !== "#" ? value : undefined;
};

const withPath = (base: string | undefined, path: string): string | undefined =>
  base ? `${base.replace(/\/+$/, "")}${path}` : undefined;

const DEFAULT_ENGINE_URL = "https://ecommerce-factory-engine.sinanadali1379.workers.dev";
const ENGINE_URL = envUrl(process.env.NEXT_PUBLIC_ENGINE_URL) ?? DEFAULT_ENGINE_URL;

export const ENGINE_LINKS = {
  storefront: ENGINE_URL ?? "#demos",
  admin:
    envUrl(process.env.NEXT_PUBLIC_ENGINE_ADMIN_URL) ??
    withPath(ENGINE_URL, "/admin/dashboard") ??
    "#pricing",
  demos: {
    maisonNoir: envUrl(process.env.NEXT_PUBLIC_DEMO_MAISON_NOIR_URL) ?? ENGINE_URL ?? "#",
    lumen: envUrl(process.env.NEXT_PUBLIC_DEMO_LUMEN_URL) ?? ENGINE_URL ?? "#",
    terraAsh: envUrl(process.env.NEXT_PUBLIC_DEMO_TERRA_ASH_URL) ?? ENGINE_URL ?? "#",
  },
} as const;

export const NAV_LINKS = [
  { label: "Demos", href: "#demos" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ── Social proof ─────────────────────────────────────────────────────────── */

export const PROOF_LOGOS = [
  "PIXELWORKS",
  "NORTHSIDE STUDIO",
  "MERIDIAN",
  "FOLK & CO",
  "BRIGHTLANE",
  "STUDIO KOTO",
];

export const PROOF_STATS = [
  { value: "1,200+", label: "Stores launched" },
  { value: "1 day", label: "Average time to launch" },
  { value: "120+ hrs", label: "Dev time saved per store" },
  { value: "4.9 / 5", label: "Agency satisfaction" },
];

/* ── Problem ──────────────────────────────────────────────────────────────── */

export const PROBLEMS = [
  {
    title: "Every client starts from zero",
    body: "You rebuild the same storefront, cart and admin for the tenth time — re-solving problems you solved last quarter.",
  },
  {
    title: "Weeks of build before a single sale",
    body: "Design, develop, QA, deploy. By the time it ships, the budget's gone and the timeline's blown.",
  },
  {
    title: "Custom builds don't scale",
    body: "Ten clients means ten codebases to patch, secure and babysit. Growth becomes a maintenance tax.",
  },
  {
    title: "Templates look like templates",
    body: "Off-the-shelf themes scream off-the-shelf — and your clients (and theirs) can tell at a glance.",
  },
];

/* ── Solution ─────────────────────────────────────────────────────────────── */

export const SOLUTION_PILLARS = [
  {
    icon: "layers",
    title: "One system, unlimited stores",
    body: "A multi-tenant engine where one install serves every client. New store, new domain — same deployment.",
  },
  {
    icon: "sparkles",
    title: "Premium by default",
    body: "A luxury, mobile-first design system tuned for conversion, so every store looks bespoke — not boilerplate.",
  },
  {
    icon: "sliders",
    title: "Hand it to the client",
    body: "A no-code admin lets clients edit their own brand, sections and products. They self-serve; you keep your weekends.",
  },
];

/* ── Interactive demo showcase ────────────────────────────────────────────── */

export type Demo = {
  id: string;
  name: string;
  vertical: string;
  tagline: string;
  blurb: string;
  image: string;
  accent: string; // swatch shown in the tab
  highlights: string[];
  products: { name: string; price: string; image: string }[];
  href: string;
};

const ph = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const DEMOS: Demo[] = [
  {
    id: "maison-noir",
    name: "MAISON NOIR",
    vertical: "Fashion",
    tagline: "Quiet luxury, made to last",
    blurb:
      "A luxury womenswear house: cashmere, tailoring and leather. Editorial hero, lookbook categories and an archive-sale countdown — built to feel like a boutique, not a template.",
    image: ph("mf-hero", 1200, 1500),
    accent: "#c7a96b",
    highlights: ["Editorial split hero", "Lookbook category grid", "Archive-sale countdown"],
    products: [
      { name: "Cashmere Wrap Coat", price: "$1,290", image: ph("mf-p1", 600, 750) },
      { name: "Silk Slip Dress", price: "$420", image: ph("mf-p2", 600, 750) },
      { name: "Wool Blazer", price: "$690", image: ph("mf-p3", 600, 750) },
    ],
    href: ENGINE_LINKS.demos.maisonNoir,
  },
  {
    id: "lumen",
    name: "LUMEN",
    vertical: "Tech",
    tagline: "Technology, beautifully quiet",
    blurb:
      "Premium consumer electronics: audio, wearables and smart home. Spec-forward product cards, a launch-style hero and time-boxed flash deals — Apple-grade polish, your client's catalogue.",
    image: ph("lt-hero", 1200, 1500),
    accent: "#9db4d4",
    highlights: ["Launch-style hero", "Spec-forward cards", "Flash-deal countdown"],
    products: [
      { name: "LUMEN One Headphones", price: "$399", image: ph("lt-p1", 600, 750) },
      { name: "LUMEN Watch Series 3", price: "$449", image: ph("lt-p2", 600, 750) },
      { name: "LUMEN Studio Monitors", price: "$1,290", image: ph("lt-p3", 600, 750) },
    ],
    href: ENGINE_LINKS.demos.lumen,
  },
  {
    id: "terra-ash",
    name: "TERRA & ASH",
    vertical: "Home & Lifestyle",
    tagline: "The art of the considered home",
    blurb:
      "Clean-burning fragrance, ceramics and textiles for a considered home. Slow-living storytelling, a refill program and curated gift edits — warm, tactile and unmistakably premium.",
    image: ph("ta-hero", 1200, 1500),
    accent: "#b08d57",
    highlights: ["Slow-living storytelling", "Refill-program trust", "Curated gift edits"],
    products: [
      { name: "Cedar & Ash Candle", price: "$72", image: ph("ta-p1", 600, 750) },
      { name: "Baby Alpaca Throw", price: "$340", image: ph("ta-p2", 600, 750) },
      { name: "Stoneware Vase", price: "$165", image: ph("ta-p3", 600, 750) },
    ],
    href: ENGINE_LINKS.demos.terraAsh,
  },
];

/* ── Features ─────────────────────────────────────────────────────────────── */

export const FEATURES = [
  {
    icon: "layers",
    title: "Multi-tenant engine",
    body: "Run every client store from one deployment. Each store gets its own domain; the system serves the right one automatically.",
  },
  {
    icon: "sliders",
    title: "No-code admin",
    body: "Brand, colours, homepage sections and product content — all editable visually. Changes go live instantly, no rebuild.",
  },
  {
    icon: "sparkles",
    title: "Premium design system",
    body: "A luxury-dark, mobile-first system tuned for conversion. Reusable sections mean every store looks custom-made.",
  },
  {
    icon: "store",
    title: "Demo Store Pack",
    body: "Three polished, ready-to-show stores — Fashion, Tech and Home. Win the pitch before you write a line of code.",
  },
  {
    icon: "terminal",
    title: "One-command setup",
    body: "`npm run setup` and you're live. Pick a demo or scaffold a blank store; the CLI registers and activates it for you.",
  },
  {
    icon: "zap",
    title: "Built for conversion",
    body: "Hero, social proof, flash sale, trust badges and testimonials — pre-assembled to sell, not just to look good.",
  },
  {
    icon: "smartphone",
    title: "Fast & mobile-first",
    body: "Built on Next.js. Storefronts are static-fast where they can be and dynamic only where they must be.",
  },
  {
    icon: "server",
    title: "Deploy anywhere, own the code",
    body: "Vercel, a VPS, or your client's own account. No platform lock-in — the codebase is yours.",
  },
];

/* ── How it works ─────────────────────────────────────────────────────────── */

export const STEPS = [
  {
    n: "01",
    title: "Install",
    code: "npm install",
    body: "Install once. Node 20+, and no database required to get a store on screen.",
  },
  {
    n: "02",
    title: "Create store",
    code: 'npm run create-store "Acme Co"',
    body: "Scaffolds a complete, ready-to-sell store and registers it with the system — in seconds.",
  },
  {
    n: "03",
    title: "Customize",
    code: "open /admin",
    body: "Brand, colours, sections and products — visually, no code. Then hand the admin to your client.",
  },
  {
    n: "04",
    title: "Deploy",
    code: "npm run build",
    body: "Ship to your host, point the domain, done. One install keeps serving every store you add.",
  },
];

/* ── Comparison ───────────────────────────────────────────────────────────── */

export const COMPARISON = {
  columns: ["Traditional development", "Ecommerce Factory"],
  rows: [
    { label: "Time to launch", a: "4–8 weeks", b: "Same day" },
    { label: "Cost per store", a: "$8k–$30k in dev time", b: "Minutes of setup" },
    { label: "Running 10 clients", a: "10 codebases to maintain", b: "1 install, 10 stores" },
    { label: "Design quality", a: "Depends on the budget", b: "Premium by default" },
    { label: "Client content edits", a: "Back to the dev queue", b: "Self-serve no-code admin" },
    { label: "Who owns the code", a: "Sometimes the platform", b: "Always you" },
  ],
};

/* ── Pricing (placeholders) ───────────────────────────────────────────────── */

export const PRICING = [
  {
    name: "Starter",
    price: "$—",
    cadence: "one-time",
    tagline: "For freelancers shipping their first client stores.",
    features: ["1 brand / store", "Full design system", "No-code admin", "Community support"],
    cta: "Get Starter",
    featured: false,
  },
  {
    name: "Studio",
    price: "$—",
    cadence: "one-time",
    tagline: "For studios running a handful of clients at once.",
    features: ["Up to 10 stores", "Demo Store Pack included", "Priority support", "White-label footer"],
    cta: "Get Studio",
    featured: true,
  },
  {
    name: "Agency",
    price: "Custom",
    cadence: "",
    tagline: "For agencies productizing ecommerce at scale.",
    features: ["Unlimited stores", "Full white-label", "Onboarding call", "SLA support"],
    cta: "Talk to us",
    featured: false,
  },
];

/* ── FAQ ──────────────────────────────────────────────────────────────────── */

export const FAQS = [
  {
    q: "Do I need to know how to code?",
    a: "To launch and customise a store, no — the setup command and the visual admin do the work. To deploy and point a domain, a little command-line comfort (or a developer for an hour) goes a long way.",
  },
  {
    q: "Can I use my own design?",
    a: "Yes. The premium design system is yours to re-theme from a single token file, and every store's content is fully editable. You're never locked into one look.",
  },
  {
    q: "How many stores can I run?",
    a: "As many as you like from a single install. Each client gets their own store and domain, all served by one deployment — so growth doesn't mean more codebases.",
  },
  {
    q: "Can I white-label it for clients?",
    a: "Absolutely. Hand clients the no-code admin to manage their own content, while your brand — or theirs — stays front and centre. Nothing points back to us.",
  },
  {
    q: "Where do I host it?",
    a: "Anywhere Next.js runs — Vercel, a VPS, or your client's own account. You own the code, so there's no platform lock-in and no per-store hosting tax.",
  },
  {
    q: "What about updates and maintenance?",
    a: "One codebase powers every store, so an improvement ships to all of them at once — not ten separate fixes. Maintenance stops scaling with your client count.",
  },
];

/* ── Footer ───────────────────────────────────────────────────────────────── */

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Demos", href: "#demos" },
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Support", href: "#" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];
