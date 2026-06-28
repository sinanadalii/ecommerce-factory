import type { ProductSectionProps } from "@/config/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

/**
 * "New In" — a tight, four-up edit of the season's featured pieces. Heading and
 * product list are injected via `ProductSectionProps`.
 */
export function FeaturedProducts({ heading, products }: ProductSectionProps) {
  return (
    <Section id="featured" className="border-t border-border">
      <SectionHeading {...heading} />
      <ProductGrid products={products} columns={4} className="mt-12" />
    </Section>
  );
}
