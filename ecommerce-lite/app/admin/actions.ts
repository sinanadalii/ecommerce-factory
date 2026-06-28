"use server";

import { revalidatePath } from "next/cache";
import { isClientKey, type ClientKey } from "@/config/active-client";
import {
  getEffectiveClient,
  saveClient,
  resetClient,
} from "@/config/client-store";
import type {
  BrandTheme,
  Category,
  ClientConfig,
  Product,
  SectionSlot,
  Testimonial,
} from "@/config/types";

/**
 * Admin server actions — the write side of the no-code admin. Each loads the
 * tenant's current effective config, applies the edited slice, persists the new
 * full config, then revalidates so the storefront (and admin) reflect it.
 */

function assertKey(clientId: string): ClientKey {
  if (!isClientKey(clientId)) throw new Error(`Unknown client: ${clientId}`);
  return clientId;
}

/** Drop empty colour fields so an all-blank theme becomes "no override". */
function cleanTheme(theme: BrandTheme): BrandTheme | undefined {
  const entries = Object.entries(theme).filter(([, v]) => v && v.trim());
  return entries.length ? (Object.fromEntries(entries) as BrandTheme) : undefined;
}

/** Revalidate every route under the root layout (storefront + admin). */
function revalidateEverything(): void {
  revalidatePath("/", "layout");
}

export type ClientSettingsInput = {
  name: string;
  logo: string;
  theme: BrandTheme;
  sections: SectionSlot[];
};

/** Client editor save: brand name, logo, colours, and homepage section order/toggles. */
export async function saveClientSettings(
  clientId: string,
  input: ClientSettingsInput,
): Promise<void> {
  const key = assertKey(clientId);
  const config = await getEffectiveClient(key);

  const next: ClientConfig = {
    ...config,
    brand: {
      ...config.brand,
      name: input.name,
      logo: input.logo.trim() || undefined,
      theme: cleanTheme(input.theme),
    },
    // Keep the header/footer wordmarks in sync with the brand name.
    header: { ...config.header, brandName: input.name },
    footer: { ...config.footer, brandName: input.name },
    pages: {
      ...config.pages,
      home: { ...config.pages.home, sections: input.sections },
    },
  };

  await saveClient(key, next);
  revalidateEverything();
}

export type ContentInput = {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  categories: Category[];
  products: Product[];
  testimonials: Testimonial[];
  footer: { blurb: string; locale: string };
};

/** Content editor save: hero, categories, featured products, testimonials, footer text. */
export async function saveContent(
  clientId: string,
  input: ContentInput,
): Promise<void> {
  const key = assertKey(clientId);
  const config = await getEffectiveClient(key);

  const next: ClientConfig = {
    ...config,
    footer: { ...config.footer, blurb: input.footer.blurb, locale: input.footer.locale },
    content: {
      ...config.content,
      hero: {
        ...config.content.hero,
        eyebrow: input.hero.eyebrow,
        title: { line1: input.hero.titleLine1, line2: input.hero.titleLine2 },
        description: input.hero.description,
        primaryCta: { label: input.hero.primaryLabel, href: input.hero.primaryHref },
        secondaryCta: { label: input.hero.secondaryLabel, href: input.hero.secondaryHref },
      },
      categories: { ...config.content.categories, items: input.categories },
      featured: { ...config.content.featured, products: input.products },
      testimonials: { ...config.content.testimonials, items: input.testimonials },
    },
  };

  await saveClient(key, next);
  revalidateEverything();
}

/** Revert a tenant to its pristine seed config (clears the admin override). */
export async function resetClientConfig(clientId: string): Promise<void> {
  const key = assertKey(clientId);
  await resetClient(key);
  revalidateEverything();
}
