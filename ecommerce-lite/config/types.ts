/**
 * ───────────────────────────────────────────────────────────────────────────
 * Website Factory — type contracts (single source of truth)
 *
 * Everything a store renders is described here as data. No UI, no styling.
 * `ClientConfig` is the shape of `config/client.ts`; swap that one object to
 * stand up a different store. The visual design system (tokens in
 * app/globals.css + the ui/ kit) is intentionally NOT represented here — it is
 * shared across all clients and stays untouched.
 * ───────────────────────────────────────────────────────────────────────────
 */

/* ── Domain content ───────────────────────────────────────────────────────── */

export type ProductBadge = "New" | "Bestseller" | "Limited" | "Exclusive";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badges?: ProductBadge[];
  colors?: string[];
  hidden?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  featured?: boolean;
  hidden?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  avatar: string;
  hidden?: boolean;
};

export type TrustIconKey = "truck" | "shield" | "refresh" | "headset";

export type TrustBadgeItem = {
  icon: TrustIconKey;
  title: string;
  subtitle: string;
  hidden?: boolean;
};

export type NavLink = { label: string; href: string };

export type FooterColumn = { title: string; links: NavLink[] };

export type SocialIconKey = "instagram" | "twitter" | "facebook" | "youtube";

export type SocialLink = { label: string; href: string; icon: SocialIconKey };

export type Cta = { label: string; href: string };

/** Content for the shared `SectionHeading` ui-kit component. */
export type TextAlign = "left" | "center" | "right";
export type TextScale = "compact" | "default" | "large";

export type SectionHeadingContent = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: Cta;
  align?: TextAlign;
  titleSize?: TextScale;
  descriptionSize?: TextScale;
  showAction?: boolean;
};

/* ── Per-section props ────────────────────────────────────────────────────── */

export type HeroProps = {
  eyebrow: string;
  /** Two display lines; line2 renders in the gold gradient. */
  title: { line1: string; line2: string };
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  ratingValue: string;
  ratingSuffix: string;
  trustNote: string;
  featuredBadge: string;
  product: Product;
  settings?: {
    textPosition?: "left" | "center" | "right";
    textAlign?: TextAlign;
    titleSize?: TextScale;
    descriptionSize?: TextScale;
    showPrimaryCta?: boolean;
    showSecondaryCta?: boolean;
    showTrustRow?: boolean;
    showProductChip?: boolean;
    showFeaturedBadge?: boolean;
  };
};

export type CategoriesProps = {
  heading: SectionHeadingContent;
  items: Category[];
};

/** Shared by the Featured and Best Sellers sections. */
export type ProductSectionProps = {
  heading: SectionHeadingContent;
  products: Product[];
};

export type FlashSaleProps = {
  badge: string;
  title: string;
  subtitle: string;
  /** Length of the sale window from first render, in ms. */
  durationMs: number;
  products: Product[];
  settings?: {
    textAlign?: TextAlign;
    titleSize?: TextScale;
    showCountdown?: boolean;
    showProducts?: boolean;
  };
};

export type TrustProps = {
  badges: TrustBadgeItem[];
  brandLogos: string[];
};

export type TestimonialsProps = {
  heading: SectionHeadingContent;
  items: Testimonial[];
};

export type NewsletterProps = {
  title: string;
  description: string;
  placeholder: string;
  submitLabel: string;
  successMessage: string;
  disclaimer: string;
  settings?: {
    textAlign?: TextAlign;
    titleSize?: TextScale;
    showIcon?: boolean;
    showForm?: boolean;
    showDisclaimer?: boolean;
  };
};

export type HeaderProps = {
  brandName: string;
  announcement: string;
  navLinks: NavLink[];
};

export type FooterProps = {
  brandName: string;
  blurb: string;
  columns: FooterColumn[];
  socials: SocialLink[];
  legalLinks: NavLink[];
  locale: string;
};

/* ── Page structure / registry keys ───────────────────────────────────────── */

export type SectionKey =
  | "hero"
  | "categories"
  | "featured"
  | "flashSale"
  | "bestSellers"
  | "trust"
  | "testimonials"
  | "newsletter";

/** Maps each section key to the props its component expects. */
export type SectionPropsMap = {
  hero: HeroProps;
  categories: CategoriesProps;
  featured: ProductSectionProps;
  flashSale: FlashSaleProps;
  bestSellers: ProductSectionProps;
  trust: TrustProps;
  testimonials: TestimonialsProps;
  newsletter: NewsletterProps;
};

export type SectionSlot = { key: SectionKey; enabled: boolean; note?: string };

export type PageStructure = { sections: SectionSlot[] };

/* ── Top-level client config ──────────────────────────────────────────────── */

/**
 * Optional per-tenant colour overrides, editable from the admin. When set, the
 * storefront layer additively injects these as CSS variables (the same tokens
 * the shared design system already reads). Unset → the shared theme is used
 * unchanged, so existing stores are unaffected.
 */
export type BrandTheme = {
  accent?: string;
  accent2?: string;
  background?: string;
  surface?: string;
  foreground?: string;
  muted?: string;
  border?: string;
  radius?: string;
  headingFont?: string;
  bodyFont?: string;
  stylePreset?: "luxury" | "tech" | "lifestyle" | "beauty";
};

export type BrandConfig = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  announcement: string;
  /** Optional logo image URL (admin-editable). */
  logo?: string;
  /** Optional colour overrides (admin-editable). */
  theme?: BrandTheme;
};

export type ClientConfig = {
  brand: BrandConfig;
  /** Theme tokens already live in app/globals.css (@theme) — referenced only. */
  theme: { tokens: string };
  header: HeaderProps;
  footer: FooterProps;
  pages: {
    home: PageStructure;
    // TODO(factory): plp, pdp, cart, search, notFound — see TEMPLATE_TODO.md
  };
  /** All section content, keyed to match the registry. */
  content: SectionPropsMap;
};

export type OrderStatus = "new" | "paid" | "fulfilling" | "shipped" | "cancelled";

export type StoreOrderItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

export type StoreOrder = {
  id: string;
  clientId: string;
  clientName: string;
  status: OrderStatus;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: StoreOrderItem[];
  subtotal: number;
  notes?: string;
};
