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
 * DEMO STORE PACK — TERRA & ASH (Home / Lifestyle)
 *
 * A presentation-ready home & lifestyle studio: clean-burning fragrance,
 * hand-made objects and slow-living essentials for a considered home. Fully
 * populated, conversion-led content. Reuses the shared design system unchanged.
 * ═══════════════════════════════════════════════════════════════════════════
 */

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ── Catalogue ────────────────────────────────────────────────────────────── */

const products: Product[] = [
  {
    id: "ta-01",
    slug: "no-04-cedar-ash-candle",
    name: "No. 04 Cedar & Ash Candle",
    category: "Candles",
    price: 72,
    rating: 4.9,
    reviewCount: 1840,
    image: img("dta-candle", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#23201c", "#6b5d4f", "#11110f"],
  },
  {
    id: "ta-02",
    slug: "black-fig-vetiver-diffuser",
    name: "Black Fig & Vetiver Diffuser",
    category: "Home Fragrance",
    price: 96,
    rating: 4.8,
    reviewCount: 962,
    image: img("dta-diffuser", 800, 1000),
    badges: ["New"],
    colors: ["#1c1c20", "#9a7b4f"],
  },
  {
    id: "ta-03",
    slug: "hand-thrown-stoneware-vase",
    name: "Hand-Thrown Stoneware Vase",
    category: "Ceramics & Tableware",
    price: 165,
    rating: 4.7,
    reviewCount: 438,
    image: img("dta-vase", 800, 1000),
    colors: ["#d8c7b0", "#6b5d4f", "#23201c"],
  },
  {
    id: "ta-04",
    slug: "baby-alpaca-throw",
    name: "Baby Alpaca Throw",
    category: "Textiles",
    price: 340,
    rating: 4.9,
    reviewCount: 1276,
    image: img("dta-throw", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#6b5d4f", "#d8c7b0", "#23201c"],
  },
  {
    id: "ta-05",
    slug: "smoked-glass-tumblers-set-of-4",
    name: "Smoked-Glass Tumblers, Set of 4",
    category: "Ceramics & Tableware",
    price: 120,
    rating: 4.7,
    reviewCount: 705,
    image: img("dta-tumblers", 800, 1000),
    badges: ["New"],
    colors: ["#3b3f4a", "#23201c"],
  },
  {
    id: "ta-06",
    slug: "patinated-brass-table-lamp",
    name: "Patinated Brass Table Lamp",
    category: "Lighting",
    price: 520,
    rating: 4.8,
    reviewCount: 312,
    image: img("dta-lamp", 800, 1000),
    colors: ["#c7a96b", "#6b5d4f"],
  },
  {
    id: "ta-07",
    slug: "ritual-incense-set",
    name: "Ritual Incense Set",
    category: "Home Fragrance",
    price: 58,
    compareAtPrice: 76,
    rating: 4.8,
    reviewCount: 1503,
    image: img("dta-incense", 800, 1000),
    badges: ["Limited"],
    colors: ["#23201c", "#9a7b4f"],
  },
  {
    id: "ta-08",
    slug: "washed-linen-cushion-cover",
    name: "Washed-Linen Cushion Cover",
    category: "Textiles",
    price: 84,
    rating: 4.6,
    reviewCount: 588,
    image: img("dta-cushion", 800, 1000),
    colors: ["#d8c7b0", "#6b5d4f", "#11110f"],
  },
  {
    id: "ta-09",
    slug: "carrara-marble-serving-board",
    name: "Carrara Marble Serving Board",
    category: "Ceramics & Tableware",
    price: 145,
    compareAtPrice: 190,
    rating: 4.7,
    reviewCount: 421,
    image: img("dta-board", 800, 1000),
    colors: ["#d8d8de", "#23201c"],
  },
  {
    id: "ta-10",
    slug: "atelier-eau-de-parfum-100ml",
    name: "Atelier Eau de Parfum, 100ml",
    category: "Fragrance",
    price: 185,
    rating: 4.9,
    reviewCount: 877,
    image: img("dta-parfum", 800, 1000),
    badges: ["Exclusive"],
    colors: ["#11110f", "#c7a96b"],
  },
  {
    id: "ta-11",
    slug: "soy-travel-candle-trio",
    name: "Soy Travel Candle Trio",
    category: "Candles",
    price: 64,
    compareAtPrice: 88,
    rating: 4.7,
    reviewCount: 1094,
    image: img("dta-trio", 800, 1000),
    badges: ["New"],
    colors: ["#6b5d4f", "#9a7b4f", "#23201c"],
  },
  {
    id: "ta-12",
    slug: "botanical-hand-care-duo",
    name: "Botanical Hand Care Duo",
    category: "Bath & Body",
    price: 52,
    compareAtPrice: 68,
    rating: 4.8,
    reviewCount: 1322,
    image: img("dta-handcare", 800, 1000),
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
  { id: "ta-c1", name: "Home Fragrance", slug: "home-fragrance", image: img("dta-cat-frag", 1200, 900), itemCount: 46, featured: true },
  { id: "ta-c2", name: "Candles", slug: "candles", image: img("dta-cat-candle", 900, 1100), itemCount: 41 },
  { id: "ta-c3", name: "Ceramics & Tableware", slug: "ceramics", image: img("dta-cat-ceramic", 900, 1100), itemCount: 58 },
  { id: "ta-c4", name: "Textiles", slug: "textiles", image: img("dta-cat-textile", 900, 1100), itemCount: 37 },
  { id: "ta-c5", name: "Lighting", slug: "lighting", image: img("dta-cat-light", 1200, 900), itemCount: 22, featured: true },
  { id: "ta-c6", name: "Gifting", slug: "gifting", image: img("dta-cat-gift", 900, 1100), itemCount: 64 },
];

/* ── Testimonials ─────────────────────────────────────────────────────────── */

const avatar = (seed: string) => img(seed, 160, 160);

const testimonials: Testimonial[] = [
  {
    id: "ta-t1",
    quote:
      "The Cedar & Ash candle completely changed my evenings. It fills the whole apartment without a hint of synthetic sweetness and burns clean to the very bottom. I'm on my fifth — it's become a ritual.",
    author: "Naomi Hart",
    role: "Interior Stylist",
    location: "Copenhagen, DK",
    rating: 5,
    avatar: avatar("dta-av-naomi"),
  },
  {
    id: "ta-t2",
    quote:
      "Everything arrives beautifully wrapped and entirely plastic-free. The stoneware vase has a maker's mark on the base — you can feel the hand that made it. My gifting is sorted for the entire year.",
    author: "Daniel Osei",
    role: "Chef",
    location: "Accra, GH",
    rating: 5,
    avatar: avatar("dta-av-daniel"),
  },
  {
    id: "ta-t3",
    quote:
      "I bought the alpaca throw on a whim and it's now the most-used thing in our home. Impossibly soft, warm without weight, and it still looks new after a year of nightly use on the sofa.",
    author: "Clara Mendoza",
    role: "Writer",
    location: "Mexico City, MX",
    rating: 5,
    avatar: avatar("dta-av-clara"),
  },
  {
    id: "ta-t4",
    quote:
      "Their scent concierge helped me find a signature fragrance over email in a single afternoon — thoughtful, unhurried, exactly right. The refill program means I'll never throw the bottle away. This is how shopping should feel.",
    author: "Yuki Tanaka",
    role: "Photographer",
    location: "Kyoto, JP",
    rating: 5,
    avatar: avatar("dta-av-yuki"),
  },
];

/* ── Reassurance / nav / footer ───────────────────────────────────────────── */

const trustBadges: TrustBadgeItem[] = [
  { icon: "truck", title: "Carbon-Neutral Delivery", subtitle: "Plastic-free, free over $75" },
  { icon: "shield", title: "Clean Ingredients", subtitle: "Non-toxic, cruelty-free, always" },
  { icon: "refresh", title: "Refillable by Design", subtitle: "Return & refill, save 15%" },
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
      { label: "Home Fragrance", href: "#categories" },
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

export const demoTerraAsh: ClientConfig = {
  brand: {
    name: "TERRA & ASH",
    tagline: "The art of the considered home",
    description:
      "TERRA & ASH — clean-burning fragrance, hand-made objects and slow-living essentials for a considered home. Carbon-neutral delivery, refillable by design.",
    email: "hello@terraandash.com",
    announcement: "Carbon-neutral delivery & free returns on orders over $75",
    theme: {
      stylePreset: "lifestyle",
      headingFont: "editorial",
      bodyFont: "inter",
      accent: "#d6b46d",
      accent2: "#9fbf9a",
      radius: "14px",
    },
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
      "The art of the considered home. Clean-burning fragrance, hand-made objects and slow-living essentials — made in small batches, refillable by design.",
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
        { key: "flashSale", enabled: true, note: "Seasonal sale — disable when no sale is live." },
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
      title: { line1: "A home that", line2: "breathes slowly." },
      description:
        "Hand-poured fragrance, kiln-fired ceramics and textiles you'll keep for years — small-batch objects made to turn a house into somewhere you exhale.",
      primaryCta: { label: "Shop the Collection", href: "#featured" },
      secondaryCta: { label: "Discover Scents", href: "#categories" },
      ratingValue: "4.9",
      ratingSuffix: "8,400+ reviews",
      trustNote: "Clean-burning · Refillable",
      featuredBadge: "Studio Favourite",
      product: products[0],
    },

    categories: {
      heading: {
        eyebrow: "Shop by Collection",
        title: "Set the mood",
        description:
          "Six collections to compose a home — from signature scents to hand-thrown ceramics, each made in small batches and refillable wherever it can be.",
        action: { label: "All collections", href: "#" },
      },
      items: categories,
    },

    featured: {
      heading: {
        eyebrow: "New In",
        title: "Just landed",
        description:
          "Fresh from the studio — seasonal scents and objects, poured and fired in limited batches.",
        action: { label: "View all new", href: "#" },
      },
      products: featured,
    },

    flashSale: {
      badge: "Studio Sale",
      title: "Up to 25% off, this weekend",
      subtitle:
        "A short markdown on the pieces that make a house feel like home. Carbon-neutral shipping still applies — once the timer ends, prices return to full.",
      durationMs: (2 * 86400 + 4 * 3600 + 40 * 60) * 1000,
      products: flashSale,
    },

    bestSellers: {
      heading: {
        eyebrow: "Most Loved",
        title: "Studio bestsellers",
        description:
          "The pieces our community reaches for again and again — the quiet soul of the studio.",
        action: { label: "Shop bestsellers", href: "#" },
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
        "Early access to seasonal drops, refill reminders and slow-living notes from the studio — plus 10% off your first order.",
      placeholder: "Enter your email",
      submitLabel: "Subscribe",
      successMessage: "Welcome in — enjoy 10% off your first order, on its way to your inbox.",
      disclaimer: "No spam, only the good stuff. Unsubscribe anytime.",
    },
  },
};
