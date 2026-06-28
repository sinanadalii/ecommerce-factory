import type {
  Category,
  ClientConfig,
  FooterColumn,
  NavLink,
  Product,
  SocialLink,
  Testimonial,
  TrustBadgeItem,
} from "@/config/types";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CLIENT C — "TERRA & ASH" (luxury home fragrance & objects). A full ClientConfig.
 *
 * Same factory, same shared design system — a third store. Demonstrates that the
 * homepage fully regenerates from content alone when this client is made active
 * in config/active-client.ts.
 * ═══════════════════════════════════════════════════════════════════════════
 */

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ── Catalogue ────────────────────────────────────────────────────────────── */

const products: Product[] = [
  {
    id: "p-01",
    slug: "cedar-ash-candle",
    name: "Cedar & Ash Candle",
    category: "Candles",
    price: 68,
    rating: 4.9,
    reviewCount: 312,
    image: img("terra-candle", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#23201c", "#6b5d4f", "#11110f"],
  },
  {
    id: "p-02",
    slug: "black-fig-diffuser",
    name: "Black Fig Reed Diffuser",
    category: "Fragrance",
    price: 92,
    rating: 4.8,
    reviewCount: 176,
    image: img("terra-diffuser", 800, 1000),
    badges: ["New"],
    colors: ["#1c1c20", "#9a7b4f"],
  },
  {
    id: "p-03",
    slug: "stoneware-vase",
    name: "Hand-Thrown Stoneware Vase",
    category: "Ceramics",
    price: 140,
    rating: 4.7,
    reviewCount: 88,
    image: img("terra-vase", 800, 1000),
    colors: ["#d8c7b0", "#6b5d4f", "#23201c"],
  },
  {
    id: "p-04",
    slug: "alpaca-throw-blanket",
    name: "Alpaca Throw Blanket",
    category: "Textiles",
    price: 320,
    rating: 4.9,
    reviewCount: 134,
    image: img("terra-throw", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#6b5d4f", "#d8c7b0", "#23201c"],
  },
  {
    id: "p-05",
    slug: "smoked-glass-tumblers",
    name: "Smoked Glass Tumblers, Set of 4",
    category: "Glassware",
    price: 110,
    rating: 4.7,
    reviewCount: 96,
    image: img("terra-tumblers", 800, 1000),
    badges: ["New"],
    colors: ["#3b3f4a", "#23201c"],
  },
  {
    id: "p-06",
    slug: "brass-table-lamp",
    name: "Patinated Brass Table Lamp",
    category: "Lighting",
    price: 480,
    rating: 4.8,
    reviewCount: 52,
    image: img("terra-lamp", 800, 1000),
    colors: ["#c7a96b", "#6b5d4f"],
  },
  {
    id: "p-07",
    slug: "incense-ritual-set",
    name: "Incense Ritual Set",
    category: "Fragrance",
    price: 54,
    compareAtPrice: 72,
    rating: 4.8,
    reviewCount: 203,
    image: img("terra-incense", 800, 1000),
    badges: ["Limited"],
    colors: ["#23201c", "#9a7b4f"],
  },
  {
    id: "p-08",
    slug: "linen-cushion-cover",
    name: "Washed Linen Cushion Cover",
    category: "Textiles",
    price: 78,
    rating: 4.6,
    reviewCount: 71,
    image: img("terra-cushion", 800, 1000),
    colors: ["#d8c7b0", "#6b5d4f", "#11110f"],
  },
  {
    id: "p-09",
    slug: "marble-serving-board",
    name: "Marble Serving Board",
    category: "Ceramics",
    price: 130,
    compareAtPrice: 175,
    rating: 4.7,
    reviewCount: 64,
    image: img("terra-board", 800, 1000),
    colors: ["#d8d8de", "#23201c"],
  },
  {
    id: "p-10",
    slug: "eau-de-parfum-100ml",
    name: "Eau de Parfum, 100ml",
    category: "Fragrance",
    price: 165,
    rating: 4.9,
    reviewCount: 142,
    image: img("terra-parfum", 800, 1000),
    badges: ["Exclusive"],
    colors: ["#11110f", "#c7a96b"],
  },
  {
    id: "p-11",
    slug: "soy-travel-candle-trio",
    name: "Soy Travel Candle Trio",
    category: "Candles",
    price: 60,
    compareAtPrice: 84,
    rating: 4.7,
    reviewCount: 119,
    image: img("terra-trio", 800, 1000),
    badges: ["New"],
    colors: ["#6b5d4f", "#9a7b4f", "#23201c"],
  },
  {
    id: "p-12",
    slug: "botanical-hand-cream-duo",
    name: "Botanical Hand Cream Duo",
    category: "Bath",
    price: 46,
    compareAtPrice: 62,
    rating: 4.8,
    reviewCount: 156,
    image: img("terra-handcream", 800, 1000),
    colors: ["#d8c7b0", "#9a7b4f"],
  },
];

const featured: Product[] = [products[0], products[1], products[3], products[9]];
const flashSale: Product[] = products.filter((p) => p.compareAtPrice !== undefined);
const bestSellers: Product[] = [
  products[0],
  products[3],
  products[1],
  products[5],
  products[9],
  products[2],
];

/* ── Categories ───────────────────────────────────────────────────────────── */

const categories: Category[] = [
  { id: "c-01", name: "Fragrance", slug: "fragrance", image: img("terra-cat-fragrance", 1200, 900), itemCount: 44, featured: true },
  { id: "c-02", name: "Candles", slug: "candles", image: img("terra-cat-candles", 900, 1100), itemCount: 38 },
  { id: "c-03", name: "Ceramics", slug: "ceramics", image: img("terra-cat-ceramics", 900, 1100), itemCount: 51 },
  { id: "c-04", name: "Textiles", slug: "textiles", image: img("terra-cat-textiles", 900, 1100), itemCount: 33 },
  { id: "c-05", name: "Lighting", slug: "lighting", image: img("terra-cat-lighting", 1200, 900), itemCount: 19 },
  { id: "c-06", name: "Gifting", slug: "gifting", image: img("terra-cat-gifting", 900, 1100), itemCount: 62 },
];

/* ── Testimonials ─────────────────────────────────────────────────────────── */

const avatar = (seed: string) => img(seed, 160, 160);

const testimonials: Testimonial[] = [
  {
    id: "t-01",
    quote:
      "The Cedar & Ash candle transformed my evenings. It fills the whole apartment without being cloying, and burns clean to the very bottom. I'm on my fourth.",
    author: "Naomi Hart",
    role: "Interior Stylist",
    location: "Copenhagen, DK",
    rating: 5,
    avatar: avatar("terra-avatar-naomi"),
  },
  {
    id: "t-02",
    quote:
      "Everything arrives beautifully wrapped and totally plastic-free. The stoneware vase is a work of art — you can feel the maker's hand in it. Gifting sorted for the year.",
    author: "Daniel Osei",
    role: "Chef",
    location: "Accra, GH",
    rating: 5,
    avatar: avatar("terra-avatar-daniel"),
  },
  {
    id: "t-03",
    quote:
      "I bought the alpaca throw on a whim and it's now the most-used thing in our home. Impossibly soft, and it still looks new after a year of nightly use.",
    author: "Clara Mendoza",
    role: "Writer",
    location: "Mexico City, MX",
    rating: 5,
    avatar: avatar("terra-avatar-clara"),
  },
  {
    id: "t-04",
    quote:
      "The scent concierge helped me find a signature fragrance over email in a day. Thoughtful, unhurried, and spot on. This is how online shopping should feel.",
    author: "Yuki Tanaka",
    role: "Photographer",
    location: "Kyoto, JP",
    rating: 5,
    avatar: avatar("terra-avatar-yuki"),
  },
];

/* ── Reassurance / nav / footer ───────────────────────────────────────────── */

const trustBadges: TrustBadgeItem[] = [
  { icon: "truck", title: "Carbon-Neutral Delivery", subtitle: "Plastic-free, free over $75" },
  { icon: "shield", title: "Clean Ingredients", subtitle: "Non-toxic, cruelty-free formulas" },
  { icon: "refresh", title: "30-Day Returns", subtitle: "Unused or unboxed, no fuss" },
  { icon: "headset", title: "Scent Concierge", subtitle: "Find your signature, 7 days a week" },
];

const brandLogos: string[] = ["KINFOLK", "CEREAL", "ELLE DECOR", "MONOCLE", "DWELL", "T MAGAZINE"];

const navLinks: NavLink[] = [
  { label: "New In", href: "#featured" },
  { label: "Collections", href: "#categories" },
  { label: "Sale", href: "#flash-sale" },
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "Journal", href: "#newsletter" },
];

const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#featured" },
      { label: "Fragrance", href: "#categories" },
      { label: "Candles", href: "#categories" },
      { label: "Sale", href: "#flash-sale" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Returns", href: "#" },
      { label: "Refill Program", href: "#" },
      { label: "Care Guide", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "The Studio",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Twitter", href: "#", icon: "twitter" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "YouTube", href: "#", icon: "youtube" },
];

/* ── The config ───────────────────────────────────────────────────────────── */

export const clientC: ClientConfig = {
  brand: {
    name: "TERRA & ASH",
    tagline: "Atmosphere, by design",
    description:
      "TERRA & ASH — clean-burning candles, fragrance and hand-made objects for a considered home. Carbon-neutral delivery and refillable by design.",
    email: "hello@terraandash.com",
    announcement: "Carbon-neutral delivery & free returns on orders over $75",
  },

  theme: { tokens: "app/globals.css" },

  header: {
    brandName: "TERRA & ASH",
    announcement: "Carbon-neutral delivery & free returns on orders over $75",
    navLinks,
  },

  footer: {
    brandName: "TERRA & ASH",
    blurb:
      "Atmosphere, by design. Clean-burning candles, fragrance and hand-made objects for a considered home.",
    columns: footerColumns,
    socials: socialLinks,
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    locale: "United States (USD $)",
  },

  pages: {
    home: {
      sections: [
        { key: "hero", enabled: true },
        { key: "categories", enabled: true },
        { key: "featured", enabled: true },
        { key: "flashSale", enabled: true, note: "Weekend sale — disable when no sale is live." },
        { key: "bestSellers", enabled: true },
        { key: "trust", enabled: true },
        { key: "testimonials", enabled: true },
        { key: "newsletter", enabled: true },
      ],
    },
  },

  content: {
    hero: {
      eyebrow: "The Autumn Atmosphere",
      title: { line1: "Make every room", line2: "a ritual." },
      description:
        "Clean-burning candles, fragrance and hand-made objects — designed to slow a room down and make it yours.",
      primaryCta: { label: "Shop the Collection", href: "#featured" },
      secondaryCta: { label: "Explore Scents", href: "#categories" },
      ratingValue: "4.8",
      ratingSuffix: "5,600+ reviews",
      trustNote: "Clean ingredients · Refillable",
      featuredBadge: "Bestseller",
      product: products[0],
    },

    categories: {
      heading: {
        eyebrow: "Shop by Collection",
        title: "Set the mood",
        description:
          "Six collections to compose a home — from signature scents to hand-thrown ceramics, made in small batches.",
        action: { label: "All collections", href: "#" },
      },
      items: categories,
    },

    featured: {
      heading: {
        eyebrow: "New In",
        title: "Just landed",
        description:
          "Fresh from the studio — seasonal scents and objects, made in limited batches.",
        action: { label: "View all new", href: "#" },
      },
      products: featured,
    },

    flashSale: {
      badge: "Weekend Sale",
      title: "Up to 25% off home favourites",
      subtitle:
        "A short markdown on the pieces that make a house a home. When the timer ends, prices return to full.",
      durationMs: (1 * 86400 + 6 * 3600 + 30 * 60) * 1000,
      products: flashSale,
    },

    bestSellers: {
      heading: {
        eyebrow: "Most Loved",
        title: "Best sellers",
        description:
          "The pieces our community reaches for again and again — the soul of the studio.",
        action: { label: "Shop best sellers", href: "#" },
      },
      products: bestSellers,
    },

    trust: {
      badges: trustBadges,
      brandLogos,
    },

    testimonials: {
      heading: {
        eyebrow: "From Our Community",
        title: "Loved at home",
        align: "center",
      },
      items: testimonials,
    },

    newsletter: {
      title: "Join the studio list",
      description:
        "Early access to seasonal drops, refill reminders and slow-living notes from the studio. Enjoy 10% off your first order.",
      placeholder: "Enter your email",
      submitLabel: "Subscribe",
      successMessage: "You're in — enjoy 10% off your first order, on its way to your inbox.",
      disclaimer: "No spam, only the good stuff. Unsubscribe anytime.",
    },
  },
};
