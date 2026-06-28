import type { ComponentType } from "react";

import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { FlashSale } from "@/components/sections/FlashSale";
import { BestSellers } from "@/components/sections/BestSellers";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";

import type { SectionKey, SectionPropsMap } from "@/config/types";

/**
 * Section registry — maps template keys to EXISTING, now fully props-driven
 * section components. The mapped type guarantees each component's props match
 * the content shape declared for its key in `SectionPropsMap` (config/types).
 *
 * This file creates NO new components and NO styling — it is a typed lookup
 * table. The page resolves a key here and injects `clientConfig.content[key]`.
 */
export const sectionRegistry: {
  [K in SectionKey]: ComponentType<SectionPropsMap[K]>;
} = {
  hero: Hero,
  categories: Categories,
  featured: FeaturedProducts,
  flashSale: FlashSale,
  bestSellers: BestSellers,
  trust: TrustBadges,
  testimonials: Testimonials,
  newsletter: Newsletter,
};
