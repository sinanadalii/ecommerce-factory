import type { Product } from "@/config/types";

/**
 * Minimal class-name joiner. Keeps the dependency surface small — no clsx /
 * tailwind-merge needed for a demo of this size.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as a USD price string, e.g. 149 -> "$149.00". */
export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value);
}

/** Pad a number to two digits for countdown timers, e.g. 5 -> "05". */
export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/** Discount percentage from a product's compare-at price, rounded — or null. */
/** Uploaded images are served by an internal API route, so Next's image optimizer should bypass them. */
export function isAdminUploadImage(src: string): boolean {
  return src.startsWith("/api/uploads/");
}

export function discountPercent(product: Product): number | null {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
    return null;
  }
  return Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
  );
}
