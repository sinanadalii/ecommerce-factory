/**
 * All marketing copy for the Ecommerce Factory sales site, in one place.
 * Conversion-focused; every section answers a specific buyer question.
 */

export const PRODUCT = {
  name: "Ecommerce Factory",
  tagline: "Launch, edit and sell from premium online stores in minutes.",
  email: "hello@ecommercefactory.com",
} as const;

const envUrl = (value: string | undefined): string | undefined => {
  value = value?.trim();
  return value && value !== "#" ? value : undefined;
};

const withPath = (base: string | undefined, path: string): string | undefined =>
  base ? `${base.replace(/\/+$/, "")}${path}` : undefined;

const DEFAULT_ENGINE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://ecommerce-factory-engine.sinanadali1379.workers.dev";
const ENGINE_URL = envUrl(process.env.NEXT_PUBLIC_ENGINE_URL) ?? DEFAULT_ENGINE_URL;

export const ENGINE_LINKS = {
  storefront: ENGINE_URL ?? "#demos",
  admin:
    envUrl(process.env.NEXT_PUBLIC_ENGINE_ADMIN_URL) ??
    withPath(ENGINE_URL, "/admin/dashboard") ??
    "#pricing",
  assistant:
    envUrl(process.env.NEXT_PUBLIC_ENGINE_ASSISTANT_URL) ??
    withPath(ENGINE_URL, "/admin/assistant") ??
    "#features",
  orders:
    envUrl(process.env.NEXT_PUBLIC_ENGINE_ORDERS_URL) ??
    withPath(ENGINE_URL, "/admin/orders") ??
    "#features",
  checkout:
    envUrl(process.env.NEXT_PUBLIC_ENGINE_CHECKOUT_URL) ??
    withPath(ENGINE_URL, "/checkout?product=camille-cashmere-coat") ??
    "#features",
  demos: {
    maisonNoir:
      envUrl(process.env.NEXT_PUBLIC_DEMO_MAISON_NOIR_URL) ??
      withPath(ENGINE_URL, "/admin/editor/demo-maison-noir") ??
      "#",
    lumen:
      envUrl(process.env.NEXT_PUBLIC_DEMO_LUMEN_URL) ??
      withPath(ENGINE_URL, "/admin/editor/demo-lumen") ??
      "#",
    terraAsh:
      envUrl(process.env.NEXT_PUBLIC_DEMO_TERRA_ASH_URL) ??
      withPath(ENGINE_URL, "/admin/editor/demo-terra-ash") ??
      "#",
  },
} as const;

export const NAV_LINKS = [
  { label: "Demos", href: "#demos" },
  { label: "Flow", href: "#phase-2-flow" },
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
  { value: "3", label: "distinct demo styles" },
  { value: "1", label: "multi-tenant engine" },
  { value: "AI", label: "assistant-ready editor" },
  { value: "Live", label: "checkout + orders flow" },
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
    title: "One system, real store flow",
    body: "A multi-tenant engine where landing, demo editing, checkout capture and admin orders now point at one working product.",
  },
  {
    icon: "sparkles",
    title: "AI-assisted editing",
    body: "Describe a direction and the assistant can tune presets, colours, fonts and hero copy, with a safe fallback when no API key is configured.",
  },
  {
    icon: "sliders",
    title: "Hand it to the client",
    body: "A stronger no-code admin lets clients edit brand, layout, product images, sale products, bestsellers and Persian font choices.",
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
      "A soft-luxury beauty/fashion direction with blush accents, rounded cards, editable product imagery and a demo editor ready for AI-guided changes.",
    image: ph("mf-hero", 1200, 1500),
    accent: "#f0a7c2",
    highlights: ["Beauty preset", "Editable product imagery", "AI-ready hero copy"],
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
      "A sharper tech storefront with cyan accents, tighter radius, geometric type and product sections that can be tuned from the Phase 2 admin.",
    image: ph("lt-hero", 1200, 1500),
    accent: "#72e4ff",
    highlights: ["Tech preset", "Sharper product grid", "Checkout-ready products"],
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
      "A warm lifestyle demo with calmer copy, softer radii and natural tones, built to show that stores can differ in style, not just in text.",
    image: ph("ta-hero", 1200, 1500),
    accent: "#d6b46d",
    highlights: ["Lifestyle preset", "Warm editorial tone", "Persian font support"],
    products: [
      { name: "Cedar & Ash Candle", price: "$72", image: ph("ta-p1", 600, 750) },
      { name: "Baby Alpaca Throw", price: "$340", image: ph("ta-p2", 600, 750) },
      { name: "Stoneware Vase", price: "$165", image: ph("ta-p3", 600, 750) },
    ],
    href: ENGINE_LINKS.demos.terraAsh,
  },
];

export const PHASE_TWO_FLOW = [
  {
    n: "01",
    title: "Choose a demo style",
    body: "Start from Beauty, Tech or Lifestyle. Each demo now has its own visual preset, not just different copy.",
    cta: "Browse demos",
    href: "#demos",
  },
  {
    n: "02",
    title: "Edit with admin or AI",
    body: "Use the stronger editor for products, imagery, fonts and layout, or ask the assistant to apply a brand direction.",
    cta: "Open AI assistant",
    href: ENGINE_LINKS.assistant,
  },
  {
    n: "03",
    title: "Capture checkout orders",
    body: "Product buttons now lead into a checkout flow, so a visitor can finish an order instead of hitting a dead end.",
    cta: "Test checkout",
    href: ENGINE_LINKS.checkout,
  },
  {
    n: "04",
    title: "Manage the client store",
    body: "Captured orders land in the admin orders panel, ready for fulfillment and customer follow-up.",
    cta: "View orders",
    href: ENGINE_LINKS.orders,
  },
] as const;

/* ── Features ─────────────────────────────────────────────────────────────── */

export const FEATURES = [
  {
    icon: "layers",
    title: "Multi-tenant engine",
    body: "Run every client store from one deployment, with admin edits and orders stored per tenant.",
  },
  {
    icon: "sliders",
    title: "Phase 2 admin editor",
    body: "Brand, colours, fonts, sections, hero imagery, categories and product groups are editable visually.",
  },
  {
    icon: "sparkles",
    title: "AI site assistant",
    body: "Ask for a visual direction and apply guided edits to theme presets, colours, fonts and hero copy.",
  },
  {
    icon: "store",
    title: "Demo Store Pack",
    body: "Three polished demos now have distinct visual styles: soft beauty, sharp tech and warm lifestyle.",
  },
  {
    icon: "terminal",
    title: "One-command setup",
    body: "`npm run setup` and you're live. Pick a demo or scaffold a blank store; the CLI registers and activates it for you.",
  },
  {
    icon: "zap",
    title: "Checkout and orders",
    body: "Product CTAs now enter checkout, capture customer details and show orders inside the admin panel.",
  },
  {
    icon: "smartphone",
    title: "Fast & mobile-first",
    body: "Built on Next.js. Storefronts are static-fast where they can be and dynamic only where they must be.",
  },
  {
    icon: "server",
    title: "Persian font support",
    body: "Shabnam and Vazirmatn are loaded, with Diodrum-ready font stacks for Persian storefront directions.",
  },
];

/* ── How it works ─────────────────────────────────────────────────────────── */

export const STEPS = [
  {
    n: "01",
    title: "Pick a demo",
    code: "open #demos",
    body: "Choose a soft beauty, sharp tech or warm lifestyle starting point.",
  },
  {
    n: "02",
    title: "Edit the site",
    code: "open /admin/assistant",
    body: "Use the AI assistant or the visual admin to tune copy, fonts, colours, products and layout.",
  },
  {
    n: "03",
    title: "Test checkout",
    code: "open /checkout",
    body: "Product cards lead into checkout, so the buying path is no longer a dead end.",
  },
  {
    n: "04",
    title: "Manage orders",
    code: "open /admin/orders",
    body: "Captured orders appear in admin for fulfillment, customer details and follow-up.",
  },
];

/* ── Comparison ───────────────────────────────────────────────────────────── */

export const COMPARISON = {
  columns: ["Traditional development", "Ecommerce Factory"],
  rows: [
    { label: "Demo variety", a: "Same layout, swapped copy", b: "Distinct beauty, tech and lifestyle presets" },
    { label: "Client edits", a: "Back to the dev queue", b: "Visual admin plus AI assistant" },
    { label: "Product imagery", a: "Manual code/config edits", b: "Editable hero, category and product images" },
    { label: "Buying path", a: "Demo-only buttons", b: "Checkout flow captures real orders" },
    { label: "Store operations", a: "Separate spreadsheet or inbox", b: "Orders panel inside admin" },
    { label: "Persian support", a: "Added later per project", b: "Shabnam, Vazirmatn and Diodrum-ready stacks" },
  ],
};

/* ── Pricing (placeholders) ───────────────────────────────────────────────── */

export const PRICING = [
  {
    name: "Starter",
    price: "$—",
    cadence: "one-time",
    tagline: "For freelancers shipping their first client stores.",
    features: ["1 brand / store", "Phase 2 editor", "Checkout capture", "Orders panel"],
    cta: "Get Starter",
    featured: false,
  },
  {
    name: "Studio",
    price: "$—",
    cadence: "one-time",
    tagline: "For studios running a handful of clients at once.",
    features: ["Up to 10 stores", "AI assistant", "Distinct demo presets", "Persian fonts"],
    cta: "Get Studio",
    featured: true,
  },
  {
    name: "Agency",
    price: "Custom",
    cadence: "",
    tagline: "For agencies productizing ecommerce at scale.",
    features: ["Unlimited stores", "Full white-label", "Custom AI workflows", "SLA support"],
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
    q: "Can the AI edit the demos?",
    a: "Yes. The Phase 2 assistant can apply guided edits to presets, colours, fonts and hero copy. If no OpenAI key is configured, a local fallback still applies safe style rules.",
  },
  {
    q: "How many stores can I run?",
    a: "As many as you like from a single install. Each client gets their own store and domain, all served by one deployment — so growth doesn't mean more codebases.",
  },
  {
    q: "Can customers actually place an order?",
    a: "Yes. Product CTAs now open checkout, capture customer details and create orders that appear inside the admin orders panel.",
  },
  {
    q: "Does it support Persian fonts?",
    a: "Yes. The editor exposes Shabnam, Vazirmatn and Diodrum-ready stacks, so Persian storefront directions can be tested from admin.",
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
      { label: "Phase 2 flow", href: "#phase-2-flow" },
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
