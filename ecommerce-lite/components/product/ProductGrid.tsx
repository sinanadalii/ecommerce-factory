import type { Product } from "@/config/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  /** Max columns at the largest breakpoint (2, 3 or 4). Defaults to 4. */
  columns?: 2 | 3 | 4;
  /** Number of leading cards to image-prioritise (above-the-fold tuning). */
  priorityCount?: number;
  className?: string;
};

const columnClasses: Record<NonNullable<ProductGridProps["columns"]>, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

/**
 * Responsive grid that maps products to the reusable ProductCard. Mobile-first:
 * two columns on phones, expanding to `columns` on large screens.
 */
export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
  className,
}: ProductGridProps) {
  const visibleProducts = products.filter((product) => !product.hidden);

  return (
    <div className={cn("grid gap-x-5 gap-y-10 sm:gap-x-6", columnClasses[columns], className)}>
      {visibleProducts.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}
