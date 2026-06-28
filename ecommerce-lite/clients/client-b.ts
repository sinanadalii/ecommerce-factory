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
 * CLIENT B — "LUMEN" (fine watches & jewelry). A full ClientConfig.
 *
 * Same factory, same shared design system — different store. Swapping the active
 * client (config/active-client.ts) regenerates the entire homepage from this
 * object alone: no component, theme or styling change.
 * ═══════════════════════════════════════════════════════════════════════════
 */

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ── Catalogue ────────────────────────────────────────────────────────────── */

const products: Product[] = [
  {
    id: "p-01",
    slug: "automatic-dress-watch",
    name: "Automatic Dress Watch",
    category: "Watches",
    price: 2400,
    rating: 4.9,
    reviewCount: 142,
    image: img("lumen-dress-watch", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#1c1c20", "#c7a96b", "#3b3f4a"],
  },
  {
    id: "p-02",
    slug: "skeleton-tourbillon",
    name: "Skeleton Tourbillon",
    category: "Watches",
    price: 5200,
    rating: 5.0,
    reviewCount: 38,
    image: img("lumen-tourbillon", 800, 1000),
    badges: ["Exclusive"],
    colors: ["#11110f", "#c7a96b"],
  },
  {
    id: "p-03",
    slug: "gold-signet-ring",
    name: "Gold Signet Ring",
    category: "Jewelry",
    price: 680,
    rating: 4.8,
    reviewCount: 96,
    image: img("lumen-signet", 800, 1000),
    badges: ["New"],
    colors: ["#c7a96b", "#e4cd95"],
  },
  {
    id: "p-04",
    slug: "diamond-tennis-bracelet",
    name: "Diamond Tennis Bracelet",
    category: "Jewelry",
    price: 1850,
    rating: 4.9,
    reviewCount: 64,
    image: img("lumen-bracelet", 800, 1000),
    colors: ["#d8d8de", "#c7a96b"],
  },
  {
    id: "p-05",
    slug: "pave-hoop-earrings",
    name: "Pavé Hoop Earrings",
    category: "Jewelry",
    price: 540,
    rating: 4.7,
    reviewCount: 88,
    image: img("lumen-hoops", 800, 1000),
    badges: ["New"],
    colors: ["#e4cd95", "#d8d8de"],
  },
  {
    id: "p-06",
    slug: "italian-leather-strap",
    name: "Italian Leather Strap",
    category: "Leather Goods",
    price: 120,
    rating: 4.8,
    reviewCount: 210,
    image: img("lumen-strap", 800, 1000),
    colors: ["#16110d", "#5b4636", "#23201c"],
  },
  {
    id: "p-07",
    slug: "onyx-cufflinks",
    name: "Onyx Cufflinks",
    category: "Accessories",
    price: 240,
    compareAtPrice: 320,
    rating: 4.8,
    reviewCount: 73,
    image: img("lumen-cufflinks", 800, 1000),
    badges: ["Limited"],
    colors: ["#11110f", "#c7a96b"],
  },
  {
    id: "p-08",
    slug: "pearl-drop-necklace",
    name: "Pearl Drop Necklace",
    category: "Jewelry",
    price: 760,
    rating: 4.7,
    reviewCount: 51,
    image: img("lumen-pearl", 800, 1000),
    colors: ["#f4f1ea", "#c7a96b"],
  },
  {
    id: "p-09",
    slug: "steel-chronograph",
    name: "Steel Chronograph",
    category: "Watches",
    price: 1980,
    compareAtPrice: 2480,
    rating: 4.8,
    reviewCount: 119,
    image: img("lumen-chrono", 800, 1000),
    colors: ["#3b3f4a", "#d8d8de", "#1c1c20"],
  },
  {
    id: "p-10",
    slug: "tortoise-sunglasses",
    name: "Tortoise Acetate Sunglasses",
    category: "Eyewear",
    price: 320,
    rating: 4.9,
    reviewCount: 47,
    image: img("lumen-sunglasses", 800, 1000),
    badges: ["Exclusive"],
    colors: ["#5b4636", "#23201c"],
  },
  {
    id: "p-11",
    slug: "rose-gold-bangle",
    name: "Rose Gold Bangle",
    category: "Jewelry",
    price: 430,
    compareAtPrice: 560,
    rating: 4.6,
    reviewCount: 82,
    image: img("lumen-bangle", 800, 1000),
    badges: ["New"],
    colors: ["#e4cd95", "#c7a96b"],
  },
  {
    id: "p-12",
    slug: "titanium-fountain-pen",
    name: "Titanium Fountain Pen",
    category: "Writing",
    price: 180,
    compareAtPrice: 240,
    rating: 4.7,
    reviewCount: 64,
    image: img("lumen-pen", 800, 1000),
    colors: ["#3b3f4a", "#11110f"],
  },
];

const featured: Product[] = [products[0], products[2], products[4], products[9]];
const flashSale: Product[] = products.filter((p) => p.compareAtPrice !== undefined);
const bestSellers: Product[] = [
  products[0],
  products[3],
  products[5],
  products[1],
  products[7],
  products[9],
];

/* ── Categories ───────────────────────────────────────────────────────────── */

const categories: Category[] = [
  { id: "c-01", name: "Watches", slug: "watches", image: img("lumen-cat-watches", 1200, 900), itemCount: 34, featured: true },
  { id: "c-02", name: "Jewelry", slug: "jewelry", image: img("lumen-cat-jewelry", 900, 1100), itemCount: 58 },
  { id: "c-03", name: "Eyewear", slug: "eyewear", image: img("lumen-cat-eyewear", 900, 1100), itemCount: 22 },
  { id: "c-04", name: "Leather Goods", slug: "leather-goods", image: img("lumen-cat-leather", 900, 1100), itemCount: 27 },
  { id: "c-05", name: "Gifting", slug: "gifting", image: img("lumen-cat-gifting", 1200, 900), itemCount: 40, featured: true },
  { id: "c-06", name: "Writing", slug: "writing", image: img("lumen-cat-writing", 900, 1100), itemCount: 16 },
];

/* ── Testimonials ─────────────────────────────────────────────────────────── */

const avatar = (seed: string) => img(seed, 160, 160);

const testimonials: Testimonial[] = [
  {
    id: "t-01",
    quote:
      "My grandfather wore a LUMEN; now I do too. The movement is flawless and the finishing rewards a loupe. This is a watch I'll hand down, not replace.",
    author: "Henry Caldwell",
    role: "Collector",
    location: "Geneva, CH",
    rating: 5,
    avatar: avatar("lumen-avatar-henry"),
  },
  {
    id: "t-02",
    quote:
      "The engraving service made the bracelet unforgettable for our anniversary. It arrived in a lacquered box with a certificate — every detail felt like a ceremony.",
    author: "Priya Anand",
    role: "Surgeon",
    location: "Singapore, SG",
    rating: 5,
    avatar: avatar("lumen-avatar-priya"),
  },
  {
    id: "t-03",
    quote:
      "I was nervous buying fine jewelry online. The atelier walked me through sizing on a call and resizing was free. It fits like it was made for me — because it was.",
    author: "Marco Ferreira",
    role: "Architect",
    location: "Lisbon, PT",
    rating: 5,
    avatar: avatar("lumen-avatar-marco"),
  },
  {
    id: "t-04",
    quote:
      "Five years on, my chronograph still keeps time to the second and looks better with every wear. Servicing was complimentary and quick. Worth every cent.",
    author: "Eleanor Voss",
    role: "Investor",
    location: "Zurich, CH",
    rating: 5,
    avatar: avatar("lumen-avatar-eleanor"),
  },
];

/* ── Reassurance / nav / footer ───────────────────────────────────────────── */

const trustBadges: TrustBadgeItem[] = [
  { icon: "truck", title: "Insured Worldwide Shipping", subtitle: "Fully insured, signature on delivery" },
  { icon: "shield", title: "5-Year Movement Warranty", subtitle: "Every timepiece guaranteed" },
  { icon: "refresh", title: "Complimentary Resizing", subtitle: "Free ring & strap adjustments" },
  { icon: "headset", title: "Atelier Concierge", subtitle: "Speak to a horologist, 7 days a week" },
];

const brandLogos: string[] = ["GQ", "ROBB REPORT", "HODINKEE", "ESQUIRE", "MONOCLE", "WALLPAPER"];

const navLinks: NavLink[] = [
  { label: "New In", href: "#featured" },
  { label: "Timepieces", href: "#categories" },
  { label: "Private Sale", href: "#flash-sale" },
  { label: "The Icons", href: "#bestsellers" },
  { label: "Journal", href: "#newsletter" },
];

const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "#featured" },
      { label: "Watches", href: "#categories" },
      { label: "Jewelry", href: "#categories" },
      { label: "Private Sale", href: "#flash-sale" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Insurance", href: "#" },
      { label: "Servicing & Repairs", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Contact Atelier", href: "#" },
    ],
  },
  {
    title: "The Maison",
    links: [
      { label: "Our Heritage", href: "#" },
      { label: "Craftsmanship", href: "#" },
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

export const clientB: ClientConfig = {
  brand: {
    name: "LUMEN",
    tagline: "Time, considered",
    description:
      "LUMEN — Swiss-made timepieces and fine jewelry, engineered to be handed down. Insured worldwide shipping and complimentary lifetime servicing.",
    email: "concierge@lumen.watch",
    announcement: "Complimentary insured shipping & engraving on every order",
  },

  theme: { tokens: "app/globals.css" },

  header: {
    brandName: "LUMEN",
    announcement: "Complimentary insured shipping & engraving on every order",
    navLinks,
  },

  footer: {
    brandName: "LUMEN",
    blurb:
      "Time, considered. Swiss-made timepieces and fine jewelry — engineered to be handed down, not replaced.",
    columns: footerColumns,
    socials: socialLinks,
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    locale: "Switzerland (CHF)",
  },

  pages: {
    home: {
      sections: [
        { key: "hero", enabled: true },
        { key: "categories", enabled: true },
        { key: "featured", enabled: true },
        { key: "flashSale", enabled: true, note: "Private sale — disable between sale windows." },
        { key: "bestSellers", enabled: true },
        { key: "trust", enabled: true },
        { key: "testimonials", enabled: true },
        { key: "newsletter", enabled: true },
      ],
    },
  },

  content: {
    hero: {
      eyebrow: "The Horology Edit",
      title: { line1: "Time, beautifully", line2: "engineered." },
      description:
        "Swiss-made timepieces and fine jewelry, finished by hand and built to outlive trends — and their owners.",
      primaryCta: { label: "Explore Timepieces", href: "#featured" },
      secondaryCta: { label: "Book an Appointment", href: "#categories" },
      ratingValue: "4.9",
      ratingSuffix: "1,800+ reviews",
      trustNote: "Swiss-made · Lifetime servicing",
      featuredBadge: "Icon",
      product: products[0],
    },

    categories: {
      heading: {
        eyebrow: "Browse the Maison",
        title: "Explore by category",
        description:
          "Six houses of craft, from in-house movements to hand-set stones, refreshed with every collection.",
        action: { label: "All categories", href: "#" },
      },
      items: categories,
    },

    featured: {
      heading: {
        eyebrow: "New In",
        title: "New arrivals",
        description:
          "The latest from the atelier — released in limited numbers and rarely repeated.",
        action: { label: "View all new", href: "#" },
      },
      products: featured,
    },

    flashSale: {
      badge: "Private Sale",
      title: "Up to 25% off select pieces",
      subtitle:
        "A rare reduction on a handful of icons. When the clock stops, prices return to full.",
      durationMs: (5 * 3600 + 20 * 60 + 0) * 1000,
      products: flashSale,
    },

    bestSellers: {
      heading: {
        eyebrow: "The Icons",
        title: "Most coveted",
        description:
          "The references collectors ask for by name — the heart of the LUMEN canon.",
        action: { label: "Shop the icons", href: "#" },
      },
      products: bestSellers,
    },

    trust: {
      badges: trustBadges,
      brandLogos,
    },

    testimonials: {
      heading: {
        eyebrow: "Collector Stories",
        title: "Worn for a lifetime",
        align: "center",
      },
      items: testimonials,
    },

    newsletter: {
      title: "Join the collectors' circle",
      description:
        "Early access to limited releases, invitations to private viewings, and horology notes from the atelier.",
      placeholder: "Enter your email",
      submitLabel: "Subscribe",
      successMessage: "You're in — your invitation to private viewings is on its way.",
      disclaimer: "No spam, only the good stuff. Unsubscribe anytime.",
    },
  },
};
