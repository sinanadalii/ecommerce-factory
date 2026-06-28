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
 * CLIENT A — "MAISON NOIR" (luxury womenswear). A full ClientConfig.
 *
 * One tenant of the factory. Selected via config/active-client.ts. The page
 * injects each content slice into the matching section as props
 * (config → page → sections). No section imports content directly; the shared
 * design system (tokens in app/globals.css + ui/ kit) is untouched.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/** Stable Lorem Picsum URL for a seed (demo imagery). */
const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ── Catalogue ────────────────────────────────────────────────────────────── */

const products: Product[] = [
  {
    id: "p-01",
    slug: "cashmere-wrap-coat",
    name: "Cashmere Wrap Coat",
    category: "Outerwear",
    price: 890,
    rating: 4.9,
    reviewCount: 214,
    image: img("maison-coat", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#1c1c20", "#c7a96b", "#6b5d4f"],
  },
  {
    id: "p-02",
    slug: "silk-slip-dress",
    name: "Bias-Cut Silk Slip Dress",
    category: "Dresses",
    price: 320,
    rating: 4.8,
    reviewCount: 132,
    image: img("maison-slip", 800, 1000),
    badges: ["New"],
    colors: ["#2a2a2e", "#7d2e3c", "#d8c7b0"],
  },
  {
    id: "p-03",
    slug: "tailored-wool-blazer",
    name: "Tailored Wool Blazer",
    category: "Tailoring",
    price: 540,
    rating: 4.9,
    reviewCount: 188,
    image: img("maison-blazer", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#1a1a1d", "#3b3f4a"],
  },
  {
    id: "p-04",
    slug: "leather-chelsea-boots",
    name: "Leather Chelsea Boots",
    category: "Footwear",
    price: 460,
    rating: 4.7,
    reviewCount: 96,
    image: img("maison-boots", 800, 1000),
    colors: ["#16110d", "#5b4636"],
  },
  {
    id: "p-05",
    slug: "pleated-midi-skirt",
    name: "Pleated Satin Midi Skirt",
    category: "Skirts",
    price: 240,
    rating: 4.6,
    reviewCount: 74,
    image: img("maison-skirt", 800, 1000),
    badges: ["New"],
    colors: ["#23201c", "#9a7b4f", "#1c1c20"],
  },
  {
    id: "p-06",
    slug: "merino-roll-neck",
    name: "Merino Roll-Neck Knit",
    category: "Knitwear",
    price: 180,
    rating: 4.8,
    reviewCount: 159,
    image: img("maison-knit", 800, 1000),
    colors: ["#11110f", "#d8c7b0", "#6b5d4f"],
  },
  {
    id: "p-07",
    slug: "structured-tote-bag",
    name: "Structured Leather Tote",
    category: "Accessories",
    price: 620,
    compareAtPrice: 780,
    rating: 4.9,
    reviewCount: 203,
    image: img("maison-tote", 800, 1000),
    badges: ["Limited"],
    colors: ["#16110d", "#c7a96b"],
  },
  {
    id: "p-08",
    slug: "wide-leg-trousers",
    name: "Wide-Leg Wool Trousers",
    category: "Tailoring",
    price: 260,
    rating: 4.7,
    reviewCount: 118,
    image: img("maison-trousers", 800, 1000),
    colors: ["#1a1a1d", "#3b3f4a", "#6b5d4f"],
  },
  {
    id: "p-09",
    slug: "double-breasted-trench",
    name: "Double-Breasted Trench",
    category: "Outerwear",
    price: 720,
    compareAtPrice: 980,
    rating: 4.8,
    reviewCount: 167,
    image: img("maison-trench", 800, 1000),
    colors: ["#23201c", "#9a7b4f"],
  },
  {
    id: "p-10",
    slug: "satin-evening-gown",
    name: "Satin Evening Gown",
    category: "Dresses",
    price: 1180,
    rating: 5.0,
    reviewCount: 64,
    image: img("maison-gown", 800, 1000),
    badges: ["Exclusive"],
    colors: ["#1c1c20", "#7d2e3c"],
  },
  {
    id: "p-11",
    slug: "quilted-bomber",
    name: "Quilted Silk Bomber",
    category: "Outerwear",
    price: 390,
    compareAtPrice: 520,
    rating: 4.6,
    reviewCount: 89,
    image: img("maison-bomber", 800, 1000),
    badges: ["New"],
    colors: ["#16110d", "#3b3f4a", "#c7a96b"],
  },
  {
    id: "p-12",
    slug: "suede-loafers",
    name: "Suede Tassel Loafers",
    category: "Footwear",
    price: 340,
    compareAtPrice: 430,
    rating: 4.7,
    reviewCount: 121,
    image: img("maison-loafers", 800, 1000),
    colors: ["#23201c", "#5b4636", "#11110f"],
  },
];

// Curated strips (same derivations the old /data modules used).
const featured: Product[] = [products[0], products[1], products[2], products[9]];
const flashSale: Product[] = products.filter((p) => p.compareAtPrice !== undefined);
const bestSellers: Product[] = [
  products[5],
  products[3],
  products[7],
  products[2],
  products[10],
  products[4],
];

/* ── Categories ───────────────────────────────────────────────────────────── */

const categories: Category[] = [
  { id: "c-01", name: "Outerwear", slug: "outerwear", image: img("cat-outerwear", 1200, 900), itemCount: 48, featured: true },
  { id: "c-02", name: "Tailoring", slug: "tailoring", image: img("cat-tailoring", 900, 1100), itemCount: 36 },
  { id: "c-03", name: "Dresses", slug: "dresses", image: img("cat-dresses", 900, 1100), itemCount: 52 },
  { id: "c-04", name: "Knitwear", slug: "knitwear", image: img("cat-knitwear", 900, 1100), itemCount: 29 },
  { id: "c-05", name: "Footwear", slug: "footwear", image: img("cat-footwear", 1200, 900), itemCount: 41, featured: true },
  { id: "c-06", name: "Accessories", slug: "accessories", image: img("cat-accessories", 900, 1100), itemCount: 67 },
];

/* ── Testimonials ─────────────────────────────────────────────────────────── */

const avatar = (seed: string) => img(seed, 160, 160);

const testimonials: Testimonial[] = [
  {
    id: "t-01",
    quote:
      "The cashmere coat is the finest piece in my wardrobe. The weight, the drape, the stitching — everything feels considered. It arrived in packaging worthy of the price.",
    author: "Eliza Moreau",
    role: "Creative Director",
    location: "Paris, FR",
    rating: 5,
    avatar: avatar("avatar-eliza"),
  },
  {
    id: "t-02",
    quote:
      "I order a lot of luxury online and returns are usually a nightmare. Here it took ninety seconds. The tailoring fit true to size on the first try — almost unheard of.",
    author: "Jonathan Pierce",
    role: "Architect",
    location: "New York, US",
    rating: 5,
    avatar: avatar("avatar-jonathan"),
  },
  {
    id: "t-03",
    quote:
      "Every detail signals care, from the matte black box to the hand-written note. This is the rare brand that feels as premium online as it does in a boutique.",
    author: "Amara Okafor",
    role: "Gallery Owner",
    location: "London, UK",
    rating: 5,
    avatar: avatar("avatar-amara"),
  },
  {
    id: "t-04",
    quote:
      "I bought the satin gown for an opening and received three compliments before I'd taken my coat off. Impeccable quality and a silhouette that actually flatters.",
    author: "Sofia Bianchi",
    role: "Curator",
    location: "Milan, IT",
    rating: 5,
    avatar: avatar("avatar-sofia"),
  },
];

/* ── Reassurance / nav / footer ───────────────────────────────────────────── */

const trustBadges: TrustBadgeItem[] = [
  { icon: "truck", title: "Complimentary Shipping", subtitle: "Express delivery on orders over $250" },
  { icon: "refresh", title: "30-Day Returns", subtitle: "Free, no-questions-asked returns" },
  { icon: "shield", title: "Secure Checkout", subtitle: "256-bit encrypted payments" },
  { icon: "headset", title: "Personal Concierge", subtitle: "Style advice, 7 days a week" },
];

const brandLogos: string[] = ["VOGUE", "HARPER'S", "GQ", "ELLE", "L'OFFICIEL", "TATLER"];

const navLinks: NavLink[] = [
  { label: "New In", href: "#featured" },
  { label: "Women", href: "#categories" },
  { label: "Sale", href: "#flash-sale" },
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
      { label: "Sale", href: "#flash-sale" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Delivery", href: "#" },
      { label: "Returns & Exchanges", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Contact Concierge", href: "#" },
    ],
  },
  {
    title: "The House",
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

export const clientA: ClientConfig = {
  brand: {
    name: "MAISON NOIR",
    tagline: "Modern luxury, quietly made",
    description:
      "MAISON NOIR — a considered wardrobe of cashmere, tailoring and leather. Premium fashion essentials, ethically made and delivered worldwide.",
    email: "care@maisonnoir.com",
    announcement: "Complimentary express shipping on orders over $250 — worldwide",
  },

  theme: { tokens: "app/globals.css" },

  header: {
    brandName: "MAISON NOIR",
    announcement: "Complimentary express shipping on orders over $250 — worldwide",
    navLinks,
  },

  footer: {
    brandName: "MAISON NOIR",
    blurb:
      "Modern luxury, quietly made. Considered pieces in cashmere, tailoring and leather — made to outlast the season.",
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
        { key: "flashSale", enabled: true, note: "Seasonal — disable when no sale is live." },
        { key: "bestSellers", enabled: true },
        { key: "trust", enabled: true },
        { key: "testimonials", enabled: true },
        { key: "newsletter", enabled: true },
      ],
    },
  },

  content: {
    hero: {
      eyebrow: "New Season · Autumn / Winter",
      title: { line1: "Quiet luxury,", line2: "made to last." },
      description:
        "A considered wardrobe of cashmere, tailoring and leather — crafted in small runs by artisans who sign their work.",
      primaryCta: { label: "Shop the Collection", href: "#featured" },
      secondaryCta: { label: "Explore Lookbook", href: "#categories" },
      ratingValue: "4.9",
      ratingSuffix: "2,400+ reviews",
      trustNote: "Ethically made · Free returns",
      featuredBadge: "Bestseller",
      product: products[0],
    },

    categories: {
      heading: {
        eyebrow: "Shop by Category",
        title: "Find your edit",
        description:
          "Six curated departments, each refreshed every season with pieces chosen for longevity over trend.",
        action: { label: "All categories", href: "#" },
      },
      items: categories,
    },

    featured: {
      heading: {
        eyebrow: "New In",
        title: "Featured this season",
        description:
          "The pieces our stylists are reaching for now — limited quantities, restocked rarely.",
        action: { label: "View all new", href: "#" },
      },
      products: featured,
    },

    flashSale: {
      badge: "Flash Sale",
      title: "Up to 30% off, today only",
      subtitle:
        "A rare markdown on house favourites. Once the timer ends, prices return to full.",
      durationMs: (11 * 3600 + 45 * 60 + 30) * 1000,
      products: flashSale,
    },

    bestSellers: {
      heading: {
        eyebrow: "Loved by Thousands",
        title: "Best sellers",
        description:
          "The icons of the house — the pieces clients return for, season after season.",
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
        eyebrow: "Client Stories",
        title: "Worn and loved",
        align: "center",
      },
      items: testimonials,
    },

    newsletter: {
      title: "Join the inner circle",
      description:
        "Early access to new arrivals, private sales and styling notes from the atelier. Enjoy 10% off your first order.",
      placeholder: "Enter your email",
      submitLabel: "Subscribe",
      successMessage: "You're in — check your inbox for 10% off.",
      disclaimer: "No spam, only the good stuff. Unsubscribe anytime.",
    },
  },
};
