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
 * DEMO STORE PACK — LUMEN (Tech)
 *
 * A presentation-ready premium consumer-tech brand: audio, wearables and smart
 * home that disappear into the everyday. Fully populated, conversion-led
 * content. Reuses the shared design system unchanged (content only).
 * ═══════════════════════════════════════════════════════════════════════════
 */

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ── Catalogue ────────────────────────────────────────────────────────────── */

const products: Product[] = [
  {
    id: "lm-01",
    slug: "lumen-one-headphones",
    name: "LUMEN One — Wireless Headphones",
    category: "Audio",
    price: 399,
    rating: 4.9,
    reviewCount: 5821,
    image: img("dlm-headphones", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#1c1c20", "#3b3f4a", "#d8d8de"],
  },
  {
    id: "lm-02",
    slug: "lumen-buds-pro",
    name: "LUMEN Buds Pro",
    category: "Audio",
    price: 199,
    rating: 4.8,
    reviewCount: 4310,
    image: img("dlm-buds", 800, 1000),
    badges: ["New"],
    colors: ["#11110f", "#d8d8de"],
  },
  {
    id: "lm-03",
    slug: "lumen-watch-series-3",
    name: "LUMEN Watch Series 3",
    category: "Wearables",
    price: 449,
    rating: 4.9,
    reviewCount: 3987,
    image: img("dlm-watch", 800, 1000),
    badges: ["Bestseller"],
    colors: ["#1a1a1d", "#c7a96b", "#3b3f4a"],
  },
  {
    id: "lm-04",
    slug: "lumen-aura-smart-lamp",
    name: "LUMEN Aura — Smart Lamp",
    category: "Smart Home",
    price: 179,
    rating: 4.7,
    reviewCount: 1622,
    image: img("dlm-lamp", 800, 1000),
    colors: ["#d8d8de", "#c7a96b"],
  },
  {
    id: "lm-05",
    slug: "lumen-pulse-fitness-band",
    name: "LUMEN Pulse — Fitness Band",
    category: "Wearables",
    price: 129,
    rating: 4.6,
    reviewCount: 2740,
    image: img("dlm-band", 800, 1000),
    badges: ["New"],
    colors: ["#11110f", "#7d2e3c", "#3b3f4a"],
  },
  {
    id: "lm-06",
    slug: "lumen-go-portable-speaker",
    name: "LUMEN Go — Portable Speaker",
    category: "Audio",
    price: 149,
    rating: 4.8,
    reviewCount: 3155,
    image: img("dlm-speaker", 800, 1000),
    colors: ["#1c1c20", "#6b5d4f"],
  },
  {
    id: "lm-07",
    slug: "lumen-charge-pad-duo",
    name: "LUMEN Charge — Pad Duo",
    category: "Accessories",
    price: 79,
    compareAtPrice: 99,
    rating: 4.7,
    reviewCount: 2098,
    image: img("dlm-charger", 800, 1000),
    badges: ["Limited"],
    colors: ["#11110f", "#d8d8de"],
  },
  {
    id: "lm-08",
    slug: "lumen-frame-4k-display",
    name: "LUMEN Frame — 4K Smart Display",
    category: "Displays",
    price: 599,
    rating: 4.8,
    reviewCount: 1144,
    image: img("dlm-display", 800, 1000),
    colors: ["#1a1a1d", "#3b3f4a"],
  },
  {
    id: "lm-09",
    slug: "lumen-cam-security-camera",
    name: "LUMEN Cam — Security Camera",
    category: "Smart Home",
    price: 159,
    compareAtPrice: 199,
    rating: 4.7,
    reviewCount: 2613,
    image: img("dlm-cam", 800, 1000),
    colors: ["#11110f", "#d8d8de"],
  },
  {
    id: "lm-10",
    slug: "lumen-studio-monitors",
    name: "LUMEN Studio — Reference Monitors (Pair)",
    category: "Audio",
    price: 1290,
    rating: 5.0,
    reviewCount: 612,
    image: img("dlm-monitors", 800, 1000),
    badges: ["Exclusive"],
    colors: ["#16110d", "#1c1c20"],
  },
  {
    id: "lm-11",
    slug: "lumen-keys-mechanical-keyboard",
    name: "LUMEN Keys — Mechanical Keyboard",
    category: "Accessories",
    price: 169,
    compareAtPrice: 219,
    rating: 4.8,
    reviewCount: 1877,
    image: img("dlm-keyboard", 800, 1000),
    badges: ["New"],
    colors: ["#1c1c20", "#c7a96b", "#d8d8de"],
  },
  {
    id: "lm-12",
    slug: "lumen-dock-usb-c-hub",
    name: "LUMEN Dock — USB-C Hub",
    category: "Accessories",
    price: 89,
    compareAtPrice: 119,
    rating: 4.6,
    reviewCount: 3402,
    image: img("dlm-dock", 800, 1000),
    colors: ["#3b3f4a", "#11110f"],
  },
];

const featured: Product[] = [products[0], products[2], products[1], products[9]];
const flashSale: Product[] = products.filter((p) => p.compareAtPrice !== undefined);
const bestSellers: Product[] = [
  products[0],
  products[2],
  products[5],
  products[1],
  products[8],
  products[7],
];

/* ── Categories ───────────────────────────────────────────────────────────── */

const categories: Category[] = [
  { id: "lm-c1", name: "Audio", slug: "audio", image: img("dlm-cat-audio", 1200, 900), itemCount: 28, featured: true },
  { id: "lm-c2", name: "Wearables", slug: "wearables", image: img("dlm-cat-wear", 900, 1100), itemCount: 19 },
  { id: "lm-c3", name: "Smart Home", slug: "smart-home", image: img("dlm-cat-home", 900, 1100), itemCount: 34 },
  { id: "lm-c4", name: "Displays", slug: "displays", image: img("dlm-cat-display", 900, 1100), itemCount: 12 },
  { id: "lm-c5", name: "Accessories", slug: "accessories", image: img("dlm-cat-acc", 1200, 900), itemCount: 56, featured: true },
  { id: "lm-c6", name: "Bundles", slug: "bundles", image: img("dlm-cat-bundle", 900, 1100), itemCount: 9 },
];

/* ── Testimonials ─────────────────────────────────────────────────────────── */

const avatar = (seed: string) => img(seed, 160, 160);

const testimonials: Testimonial[] = [
  {
    id: "lm-t1",
    quote:
      "The LUMEN One is the first pair of headphones I've owned where the noise cancelling genuinely makes a plane feel quiet. Twenty-eight hours of battery, and the app doesn't beg me to make an account. Flawless.",
    author: "Marcus Bell",
    role: "Audio Engineer",
    location: "Berlin, DE",
    rating: 5,
    avatar: avatar("dlm-av-marcus"),
  },
  {
    id: "lm-t2",
    quote:
      "I kitted out my whole apartment with LUMEN — lamp, camera, display — and they actually talk to each other without a cloud subscription. Setup took minutes. This is what smart home was supposed to feel like.",
    author: "Priya Nair",
    role: "Product Designer",
    location: "Singapore, SG",
    rating: 5,
    avatar: avatar("dlm-av-priya"),
  },
  {
    id: "lm-t3",
    quote:
      "Returned a watch on day 29 of the trial, no questions, full refund in two days — then bought the Series 3 anyway because it's that good. Support replied in eleven minutes. Rare to feel this looked-after.",
    author: "Diego Santos",
    role: "Marathon Coach",
    location: "Lisbon, PT",
    rating: 5,
    avatar: avatar("dlm-av-diego"),
  },
  {
    id: "lm-t4",
    quote:
      "The Studio monitors replaced a pair that cost twice as much. Reference-flat, beautifully built, and they look like furniture, not gear. My mixes have never translated better.",
    author: "Aisha Rahman",
    role: "Music Producer",
    location: "Los Angeles, US",
    rating: 5,
    avatar: avatar("dlm-av-aisha"),
  },
];

/* ── Reassurance / nav / footer ───────────────────────────────────────────── */

const trustBadges: TrustBadgeItem[] = [
  { icon: "truck", title: "Free 2-Day Shipping", subtitle: "On every order, no minimum" },
  { icon: "refresh", title: "30-Day Home Trial", subtitle: "Love it or return it, free" },
  { icon: "shield", title: "2-Year Warranty", subtitle: "Plus free lifetime firmware updates" },
  { icon: "headset", title: "Expert Support", subtitle: "Real humans, 7 days a week" },
];

const brandLogos: string[] = ["WIRED", "THE VERGE", "TECHCRUNCH", "ENGADGET", "CNET", "FAST COMPANY"];

const navLinks: NavLink[] = [
  { label: "New", href: "#featured" },
  { label: "Shop All", href: "#categories" },
  { label: "Deals", href: "#flash-sale" },
  { label: "Bestsellers", href: "#bestsellers" },
  { label: "Support", href: "#newsletter" },
];

const footerColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "New Releases", href: "#featured" },
      { label: "Audio", href: "#categories" },
      { label: "Smart Home", href: "#categories" },
      { label: "Deals", href: "#flash-sale" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Warranty & Repairs", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Company",
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

export const demoLumen: ClientConfig = {
  brand: {
    name: "LUMEN",
    tagline: "Technology, beautifully quiet",
    description:
      "LUMEN — premium audio, wearables and smart home, designed to disappear into the everyday. Free shipping, a 30-day home trial and a 2-year warranty on every device.",
    email: "hello@lumen.io",
    announcement: "Free 2-day shipping & a 30-day home trial on every device",
  },

  theme: { tokens: "app/globals.css" },

  header: {
    brandName: "LUMEN",
    announcement: "Free 2-day shipping & a 30-day home trial on every device",
    navLinks,
  },

  footer: {
    brandName: "LUMEN",
    blurb:
      "Technology, beautifully quiet. Premium audio, wearables and smart home — engineered to work the moment you open the box, and to last for years.",
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
        { key: "flashSale", enabled: true, note: "Run for launch windows / sale events." },
        { key: "bestSellers", enabled: true },
        { key: "trust", enabled: true },
        { key: "testimonials", enabled: true },
        { key: "newsletter", enabled: true },
      ],
    },
  },

  content: {
    hero: {
      eyebrow: "New · The Autumn Lineup",
      title: { line1: "Technology that", line2: "disappears." },
      description:
        "Audio you forget you're wearing. A home that just works. Devices engineered to do their job beautifully — then get out of your way.",
      primaryCta: { label: "Shop the Lineup", href: "#featured" },
      secondaryCta: { label: "Compare Devices", href: "#categories" },
      ratingValue: "4.8",
      ratingSuffix: "12,000+ reviews",
      trustNote: "2-year warranty · 30-day trial",
      featuredBadge: "Editor's Choice",
      product: products[0],
    },

    categories: {
      heading: {
        eyebrow: "Shop by Category",
        title: "Build your setup",
        description:
          "Six families of devices, designed to work flawlessly on their own — and even better together, with no cloud subscription required.",
        action: { label: "Shop all", href: "#" },
      },
      items: categories,
    },

    featured: {
      heading: {
        eyebrow: "New & Notable",
        title: "Just launched",
        description:
          "The devices our team is using right now — and the ones reviewers can't stop writing about.",
        action: { label: "View all new", href: "#" },
      },
      products: featured,
    },

    flashSale: {
      badge: "Flash Deals",
      title: "Up to 25% off, this week only",
      subtitle:
        "A short run of price drops across accessories and smart home. Free shipping and the 30-day trial still apply — when the timer ends, prices reset.",
      durationMs: (1 * 86400 + 8 * 3600 + 15 * 60) * 1000,
      products: flashSale,
    },

    bestSellers: {
      heading: {
        eyebrow: "Most Loved",
        title: "Bestsellers",
        description:
          "The devices tens of thousands of customers reach for first — and the reason they come back for the rest of the lineup.",
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
        eyebrow: "Reviews",
        title: "Rated 4.8 by 12,000+ owners",
        align: "center",
      },
      items: testimonials,
    },

    newsletter: {
      title: "Join LUMEN Insiders",
      description:
        "Early access to launches, members-only pricing and the occasional product secret — straight to your inbox. Enjoy 10% off your first order.",
      placeholder: "Enter your email",
      submitLabel: "Subscribe",
      successMessage: "You're in — your 10% welcome code is on the way.",
      disclaimer: "No spam, just good gear. Unsubscribe anytime.",
    },
  },
};
