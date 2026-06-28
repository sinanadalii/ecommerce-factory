import type { ProductSectionProps } from "@/config/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

/**
 * Best sellers — social proof through the most-loved pieces, six up. Heading and
 * product list are injected via `ProductSectionProps`.
 */
export function BestSellers({ heading, products }: ProductSectionProps) {
  return (
    <Section id="bestsellers" className="border-t border-border">
      <SectionHeading {...heading} />
      <ProductGrid products={products} columns={3} className="mt-12" />
    </Section>
  );
}
