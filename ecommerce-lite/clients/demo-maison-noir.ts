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
 * DEMO STORE PACK — MAISON NOIR (Fashion)
 *
 * A presentation-ready luxury fashion house: cashmere, tailoring and leather,
 * made in small ateliers. Fully populated, conversion-led content — no
 * placeholders. Reuses the shared design system unchanged (content only).
 * ═══════════════════════════════════════════════════════════════════════════
 */

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ── Catalogue ────────────────────────────────────────────────────────────── */

const products: Product[] = [
  {
    id: "mn-01",
    slug: "camille-cashmere-coat",
    name: "The Camille Cashmere Coat",
    category: "Outerwear",
    price: 1290,
    rating: 4.9,
    reviewCount: 412,
    image: img("dmn-coat", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#1c1c20", "#c7a96b", "#6b5d4f"],
  },
  {
    id: "mn-02",
    slug: "bias-cut-silk-slip-dress",
    name: "Bias-Cut Silk Slip Dress",
    category: "Dresses",
    price: 420,
    rating: 4.8,
    reviewCount: 268,
    image: img("dmn-slip", 800, 1000),
    badges: ["New"],
    colors: ["#2a2a2e", "#7d2e3c", "#d8c7b0"],
  },
  {
    id: "mn-03",
    slug: "double-faced-wool-blazer",
    name: "Double-Faced Wool Blazer",
    category: "Tailoring",
    price: 690,
    rating: 4.9,
    reviewCount: 331,
    image: img("dmn-blazer", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#1a1a1d", "#3b3f4a", "#6b5d4f"],
  },
  {
    id: "mn-04",
    slug: "hand-lasted-chelsea-boot",
    name: "Hand-Lasted Leather Chelsea Boot",
    category: "Footwear",
    price: 540,
    rating: 4.7,
    reviewCount: 174,
    image: img("dmn-boot", 800, 1000),
    colors: ["#16110d", "#5b4636"],
  },
  {
    id: "mn-05",
    slug: "silk-satin-midi-skirt",
    name: "Pleated Silk-Satin Midi Skirt",
    category: "Skirts",
    price: 360,
    rating: 4.7,
    reviewCount: 142,
    image: img("dmn-skirt", 800, 1000),
    badges: ["New"],
    colors: ["#23201c", "#9a7b4f", "#1c1c20"],
  },
  {
    id: "mn-06",
    slug: "featherweight-merino-roll-neck",
    name: "Featherweight Merino Roll-Neck",
    category: "Knitwear",
    price: 240,
    rating: 4.9,
    reviewCount: 389,
    image: img("dmn-knit", 800, 1000),
    colors: ["#11110f", "#d8c7b0", "#6b5d4f"],
  },
  {
    id: "mn-07",
    slug: "structured-calfskin-tote",
    name: "Structured Calfskin Tote",
    category: "Bags & Accessories",
    price: 980,
    compareAtPrice: 1180,
    rating: 4.9,
    reviewCount: 256,
    image: img("dmn-tote", 800, 1000),
    badges: ["Limited"],
    colors: ["#16110d", "#c7a96b"],
  },
  {
    id: "mn-08",
    slug: "high-rise-wide-leg-trouser",
    name: "High-Rise Wide-Leg Trouser",
    category: "Tailoring",
    price: 320,
    rating: 4.7,
    reviewCount: 203,
    image: img("dmn-trouser", 800, 1000),
    colors: ["#1a1a1d", "#3b3f4a", "#6b5d4f"],
  },
  {
    id: "mn-09",
    slug: "belted-gabardine-trench",
    name: "Belted Gabardine Trench",
    category: "Outerwear",
    price: 890,
    compareAtPrice: 1150,
    rating: 4.8,
    reviewCount: 297,
    image: img("dmn-trench", 800, 1000),
    colors: ["#23201c", "#9a7b4f"],
  },
  {
    id: "mn-10",
    slug: "liquid-satin-column-gown",
    name: "Liquid Satin Column Gown",
    category: "Eveningwear",
    price: 1480,
    rating: 5.0,
    reviewCount: 118,
    image: img("dmn-gown", 800, 1000),
    badges: ["Exclusive"],
    colors: ["#1c1c20", "#7d2e3c"],
  },
  {
    id: "mn-11",
    slug: "quilted-silk-bomber",
    name: "Quilted Silk Bomber",
    category: "Outerwear",
    price: 540,
    compareAtPrice: 720,
    rating: 4.6,
    reviewCount: 161,
    image: img("dmn-bomber", 800, 1000),
    badges: ["New"],
    colors: ["#16110d", "#3b3f4a", "#c7a96b"],
  },
  {
    id: "mn-12",
    slug: "suede-horsebit-loafer",
    name: "Suede Horsebit Loafer",
    category: "Footwear",
    price: 460,
    compareAtPrice: 580,
    rating: 4.7,
    reviewCount: 224,
    image: img("dmn-loafer", 800, 1000),
    colors: ["#23201c", "#5b4636", "#11110f"],
  },
];

const featured: Product[] = [products[0], products[1], products[2], products[9]];
const flashSale: Product[] = products.filter((p) => p.compareAtPrice !== undefined);
const bestSellers: Product[] = [
  products[0],
  products[2],
  products[5],
  products[3],
  products[7],
  products[9],
];

/* ── Categories ───────────────────────────────────────────────────────────── */

const categories: Category[] = [
  { id: "mn-c1", name: "Outerwear", slug: "outerwear", image: img("dmn-cat-outer", 1200, 900), itemCount: 54, featured: true },
  { id: "mn-c2", name: "Tailoring", slug: "tailoring", image: img("dmn-cat-tailor", 900, 1100), itemCount: 47 },
  { id: "mn-c3", name: "Dresses", slug: "dresses", image: img("dmn-cat-dress", 900, 1100), itemCount: 63 },
  { id: "mn-c4", name: "Knitwear", slug: "knitwear", image: img("dmn-cat-knit", 900, 1100), itemCount: 38 },
  { id: "mn-c5", name: "Footwear", slug: "footwear", image: img("dmn-cat-foot", 1200, 900), itemCount: 41, featured: true },
  { id: "mn-c6", name: "Bags & Accessories", slug: "accessories", image: img("dmn-cat-bags", 900, 1100), itemCount: 72 },
];

/* ── Testimonials ─────────────────────────────────────────────────────────── */

const avatar = (seed: string) => img(seed, 160, 160);

const testimonials: Testimonial[] = [
  {
    id: "mn-t1",
    quote:
      "The Camille coat is the single best thing I own. Three winters in and it still draws compliments from strangers — the cashmere has only grown softer. It feels like an heirloom I happened to buy myself.",
    author: "Eliza Moreau",
    role: "Creative Director",
    location: "Paris, FR",
    rating: 5,
    avatar: avatar("dmn-av-eliza"),
  },
  {
    id: "mn-t2",
    quote:
      "I've stopped buying fast fashion entirely. One MAISON NOIR blazer replaced a closet full of jackets that never quite fit. The tailoring is genuinely couture-level, and returns took ninety seconds.",
    author: "Amara Okafor",
    role: "Gallery Owner",
    location: "London, UK",
    rating: 5,
    avatar: avatar("dmn-av-amara"),
  },
  {
    id: "mn-t3",
    quote:
      "Everything arrives in that matte black box with a hand-written note. It's the rare brand that feels as considered online as a boutique on Rue Saint-Honoré. I send every gift from here now.",
    author: "Sofia Bianchi",
    role: "Curator",
    location: "Milan, IT",
    rating: 5,
    avatar: avatar("dmn-av-sofia"),
  },
  {
    id: "mn-t4",
    quote:
      "I wore the satin gown to a gallery opening and was asked about it all night. Impeccable drape, a silhouette that actually flatters, and a price that — for this quality — is honestly fair.",
    author: "Naomi Adeyemi",
    role: "Architect",
    location: "New York, US",
    rating: 5,
    avatar: avatar("dmn-av-naomi"),
  },
];

/* ── Reassurance / nav / footer ───────────────────────────────────────────── */

const trustBadges: TrustBadgeItem[] = [
  { icon: "truck", title: "Complimentary Shipping", subtitle: "Express, insured, on orders over $300" },
  { icon: "refresh", title: "Lifetime Repairs", subtitle: "Free alterations & repairs, forever" },
  { icon: "shield", title: "Ethically Made", subtitle: "Small ateliers, traceable supply chain" },
  { icon: "headset", title: "Personal Styling", subtitle: "Book a stylist, 7 days a week" },
];

const brandLogos: string[] = ["VOGUE", "HARPER'S BAZAAR", "GQ", "ELLE", "L'OFFICIEL", "TATLER"];

const navLinks: NavLink[] = [
  { label: "New In", href: "#featured" },
  { label: "Collections", href: "#categories" },
  { label: "The Edit Sale", href: "#flash-sale" },
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "Journal", href: "#newsletter" },
];

const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#featured" },
      { label: "Outerwear", href: "#categories" },
      { label: "Tailoring", href: "#categories" },
      { label: "The Edit Sale", href: "#flash-sale" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Delivery", href: "#" },
      { label: "Returns & Repairs", href: "#" },
      { label: "Size & Fit Guide", href: "#" },
      { label: "Book a Stylist", href: "#" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Our Atelier", href: "#" },
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

export const demoMaisonNoir: ClientConfig = {
  brand: {
    name: "MAISON NOIR",
    tagline: "Quiet luxury, made to last",
    description:
      "MAISON NOIR — a considered wardrobe of cashmere, tailoring and leather, made in small ateliers and built to outlive the season. Ethically crafted, lifetime-repaired, delivered worldwide.",
    email: "care@maisonnoir.com",
    announcement: "Complimentary worldwide shipping & returns on orders over $300",
    theme: {
      stylePreset: "beauty",
      headingFont: "editorial",
      bodyFont: "inter",
      accent: "#f0a7c2",
      accent2: "#d8b4fe",
      radius: "16px",
    },
  },

  theme: { tokens: "app/globals.css" },

  header: {
    brandName: "MAISON NOIR",
    announcement: "Complimentary worldwide shipping & returns on orders over $300",
    navLinks,
  },

  footer: {
    brandName: "MAISON NOIR",
    blurb:
      "Quiet luxury, made to last. Considered pieces in cashmere, tailoring and leather — crafted in small ateliers and repaired for life.",
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
        { key: "flashSale", enabled: true, note: "Seasonal — disable between edits." },
        { key: "bestSellers", enabled: true },
        { key: "trust", enabled: true },
        { key: "testimonials", enabled: true },
        { key: "newsletter", enabled: true },
      ],
    },
  },

  content: {
    hero: {
      eyebrow: "Autumn / Winter '26 · The Atelier Edit",
      title: { line1: "The art of", line2: "restraint." },
      description:
        "A wardrobe edited down to what lasts — cashmere that softens with age, tailoring cut by hand, leather worn for decades. Bought once, kept for life.",
      primaryCta: { label: "Discover the Collection", href: "#featured" },
      secondaryCta: { label: "Book a Styling Appointment", href: "#categories" },
      ratingValue: "4.9",
      ratingSuffix: "3,200+ verified reviews",
      trustNote: "Carbon-neutral · Lifetime repairs",
      featuredBadge: "Atelier Icon",
      product: products[0],
    },

    categories: {
      heading: {
        eyebrow: "Shop by Category",
        title: "Find your edit",
        description:
          "Six departments, each refreshed every season with pieces chosen for longevity over trend — and never restocked once they sell out.",
        action: { label: "All categories", href: "#" },
      },
      items: categories,
    },

    featured: {
      heading: {
        eyebrow: "New In",
        title: "Featured this season",
        description:
          "The pieces our stylists are reaching for now — cut in limited runs and rarely repeated.",
        action: { label: "View all new", href: "#" },
      },
      products: featured,
    },

    flashSale: {
      badge: "The Edit Sale",
      title: "Archive pieces, up to 30% off",
      subtitle:
        "A rare reduction on a curated handful of past-season icons. When the timer ends, they return to the archive — not the shelf.",
      durationMs: (13 * 3600 + 24 * 60 + 10) * 1000,
      products: flashSale,
    },

    bestSellers: {
      heading: {
        eyebrow: "Loved by Thousands",
        title: "The house icons",
        description:
          "The pieces clients return for, season after season — the quiet backbone of a considered wardrobe.",
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
        eyebrow: "Client Stories",
        title: "Worn, kept, handed down",
        align: "center",
      },
      items: testimonials,
    },

    newsletter: {
      title: "Join the inner circle",
      description:
        "Private access to new arrivals, atelier dispatches and members-only archive sales — plus 10% off your first order.",
      placeholder: "Enter your email",
      submitLabel: "Subscribe",
      successMessage: "Welcome to the house — your 10% code is on its way.",
      disclaimer: "Considered words only. Unsubscribe anytime.",
    },
  },
};
