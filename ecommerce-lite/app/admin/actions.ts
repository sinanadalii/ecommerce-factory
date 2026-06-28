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
  FlashSaleProps,
  NewsletterProps,
  Product,
  SectionHeadingContent,
  SectionSlot,
  Testimonial,
  TrustBadgeItem,
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
    productImage: string;
    ratingValue: string;
    ratingSuffix: string;
    trustNote: string;
    featuredBadge: string;
    settings: NonNullable<ClientConfig["content"]["hero"]["settings"]>;
  };
  categoryHeading: SectionHeadingContent;
  featuredHeading: SectionHeadingContent;
  bestSellerHeading: SectionHeadingContent;
  testimonialHeading: SectionHeadingContent;
  flashSale: Pick<FlashSaleProps, "badge" | "title" | "subtitle" | "durationMs" | "settings">;
  trust: { badges: TrustBadgeItem[]; brandLogos: string[] };
  newsletter: NewsletterProps;
  categories: Category[];
  products: Product[];
  flashSaleProducts: Product[];
  bestSellerProducts: Product[];
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
        product: { ...config.content.hero.product, image: input.hero.productImage },
        ratingValue: input.hero.ratingValue,
        ratingSuffix: input.hero.ratingSuffix,
        trustNote: input.hero.trustNote,
        featuredBadge: input.hero.featuredBadge,
        settings: input.hero.settings,
      },
      categories: { ...config.content.categories, heading: input.categoryHeading, items: input.categories },
      featured: { ...config.content.featured, heading: input.featuredHeading, products: input.products },
      flashSale: { ...config.content.flashSale, ...input.flashSale, products: input.flashSaleProducts },
      bestSellers: { ...config.content.bestSellers, heading: input.bestSellerHeading, products: input.bestSellerProducts },
      trust: { ...config.content.trust, badges: input.trust.badges, brandLogos: input.trust.brandLogos },
      testimonials: { ...config.content.testimonials, heading: input.testimonialHeading, items: input.testimonials },
      newsletter: input.newsletter,
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

type AssistantPatch = {
  summary?: string;
  theme?: Partial<BrandTheme>;
  hero?: {
    eyebrow?: string;
    titleLine1?: string;
    titleLine2?: string;
    description?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    productImage?: string;
  };
  footer?: {
    blurb?: string;
  };
};

type AssistantResult = {
  summary: string;
  usedOpenAI: boolean;
};

const STYLE_PRESETS = new Set(["luxury", "tech", "lifestyle", "beauty"]);
const FONT_VALUES = new Set(["inter", "playfair", "shabnam", "diodrum", "vazirmatn", "editorial", "geometric"]);

function cleanString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function cleanAssistantPatch(value: unknown): AssistantPatch | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as AssistantPatch;
  const theme = raw.theme && typeof raw.theme === "object" ? raw.theme : undefined;
  const cleanThemePatch: Partial<BrandTheme> = {};

  if (theme) {
    for (const key of ["accent", "accent2", "background", "surface", "foreground", "muted", "border", "radius"] as const) {
      const text = cleanString(theme[key]);
      if (text) cleanThemePatch[key] = text;
    }

    const preset = cleanString(theme.stylePreset);
    if (preset && STYLE_PRESETS.has(preset)) {
      cleanThemePatch.stylePreset = preset as BrandTheme["stylePreset"];
    }

    const headingFont = cleanString(theme.headingFont);
    if (headingFont && FONT_VALUES.has(headingFont)) cleanThemePatch.headingFont = headingFont;

    const bodyFont = cleanString(theme.bodyFont);
    if (bodyFont && FONT_VALUES.has(bodyFont)) cleanThemePatch.bodyFont = bodyFont;
  }

  return {
    summary: cleanString(raw.summary),
    theme: Object.keys(cleanThemePatch).length ? cleanThemePatch : undefined,
    hero: raw.hero && typeof raw.hero === "object" ? raw.hero : undefined,
    footer: raw.footer && typeof raw.footer === "object" ? raw.footer : undefined,
  };
}

function extractJson(text: string): unknown | null {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)?.[1];
  const candidate = fenced ?? trimmed;

  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

function fallbackAssistantPatch(prompt: string): AssistantPatch {
  const lower = prompt.toLowerCase();
  const theme: Partial<BrandTheme> = {};
  const hero: NonNullable<AssistantPatch["hero"]> = {};
  const summary: string[] = [];

  if (lower.includes("tech") || prompt.includes("تک") || prompt.includes("فناوری")) {
    Object.assign(theme, {
      stylePreset: "tech",
      headingFont: "geometric",
      bodyFont: "inter",
      accent: "#72e4ff",
      accent2: "#8a7cff",
      radius: "4px",
    } satisfies Partial<BrandTheme>);
    Object.assign(hero, {
      eyebrow: "Signal / Systems",
      titleLine1: "Engineered for",
      titleLine2: "momentum.",
      description: "A sharper storefront direction with cooler light, tighter geometry and a more technical product rhythm.",
    });
    summary.push("tech preset");
  }

  if (lower.includes("life") || lower.includes("home") || prompt.includes("لایف") || prompt.includes("خانه")) {
    Object.assign(theme, {
      stylePreset: "lifestyle",
      headingFont: "editorial",
      bodyFont: "inter",
      accent: "#d6b46d",
      accent2: "#9fbf9a",
      radius: "14px",
    } satisfies Partial<BrandTheme>);
    Object.assign(hero, {
      eyebrow: "Slow Living Edit",
      titleLine1: "A softer way",
      titleLine2: "to arrive.",
      description: "A warmer lifestyle direction with relaxed spacing, natural tones and calmer editorial language.",
    });
    summary.push("lifestyle preset");
  }

  if (lower.includes("beauty") || lower.includes("soft") || prompt.includes("زیبایی") || prompt.includes("بیوتی")) {
    Object.assign(theme, {
      stylePreset: "beauty",
      headingFont: "editorial",
      bodyFont: "inter",
      accent: "#f0a7c2",
      accent2: "#d8b4fe",
      radius: "18px",
    } satisfies Partial<BrandTheme>);
    Object.assign(hero, {
      eyebrow: "Beauty Studio",
      titleLine1: "Rituals with",
      titleLine2: "a soft glow.",
      description: "A gentler beauty direction with blush highlights, softer radius and a more fluid editorial voice.",
    });
    summary.push("beauty preset");
  }

  if (lower.includes("shabnam") || prompt.includes("شبنم")) {
    theme.bodyFont = "shabnam";
    summary.push("Shabnam body font");
  }

  if (lower.includes("diodrum") || prompt.includes("دیودرام")) {
    theme.headingFont = "diodrum";
    summary.push("Diodrum heading font");
  }

  if (lower.includes("vazir") || prompt.includes("وزیر")) {
    theme.bodyFont = "vazirmatn";
    summary.push("Vazirmatn body font");
  }

  const hex = prompt.match(/#[0-9a-f]{3,6}\b/i)?.[0];
  if (hex) {
    theme.accent = hex;
    summary.push(`accent ${hex}`);
  }

  if (!Object.keys(theme).length && !Object.keys(hero).length) {
    Object.assign(theme, {
      stylePreset: "luxury",
      headingFont: "editorial",
      accent: "#c7a96b",
      radius: "10px",
    } satisfies Partial<BrandTheme>);
    summary.push("default luxury tuning");
  }

  return {
    summary: `Applied ${summary.join(", ")}.`,
    theme,
    hero: Object.keys(hero).length ? hero : undefined,
  };
}

async function getOpenAISettings(): Promise<{ apiKey?: string; model?: string }> {
  const fromProcess = {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL,
  };

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const cloudflareEnv = env as CloudflareEnv & {
      OPENAI_API_KEY?: string;
      OPENAI_MODEL?: string;
    };

    return {
      apiKey: fromProcess.apiKey ?? cloudflareEnv.OPENAI_API_KEY,
      model: fromProcess.model ?? cloudflareEnv.OPENAI_MODEL,
    };
  } catch {
    return fromProcess;
  }
}

function responseText(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const response = body as {
    output_text?: string;
    output?: Array<{ content?: Array<{ text?: string; type?: string }> }>;
  };

  if (typeof response.output_text === "string") return response.output_text;

  return (
    response.output
      ?.flatMap((item) => item.content ?? [])
      .map((part) => part.text)
      .filter(Boolean)
      .join("\n") ?? ""
  );
}

async function openAIAssistantPatch(prompt: string, config: ClientConfig): Promise<AssistantPatch | null> {
  const { apiKey, model } = await getOpenAISettings();
  if (!apiKey || !model) return null;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "You edit ecommerce demo store configs. Return only compact JSON with optional keys summary, theme, hero, footer. Use theme.stylePreset as luxury, tech, lifestyle, or beauty. Use font values inter, playfair, shabnam, diodrum, vazirmatn, editorial, or geometric. Do not include markdown.",
        },
        {
          role: "user",
          content: JSON.stringify({
            request: prompt,
            current: {
              brandName: config.brand.name,
              theme: config.brand.theme ?? {},
              hero: {
                eyebrow: config.content.hero.eyebrow,
                titleLine1: config.content.hero.title.line1,
                titleLine2: config.content.hero.title.line2,
                description: config.content.hero.description,
              },
            },
          }),
        },
      ],
    }),
  });

  if (!response.ok) return null;

  const body = (await response.json()) as unknown;
  const text = responseText(body);
  if (!text) return null;

  return cleanAssistantPatch(extractJson(text));
}

/** Apply an AI-assisted visual/content direction to a selected demo or tenant. */
export async function applyAssistantEdit(clientId: string, prompt: string): Promise<AssistantResult> {
  const key = assertKey(clientId);
  const request = prompt.trim();
  if (request.length < 3) throw new Error("Describe the change first.");

  const config = await getEffectiveClient(key);
  let openAIPatch: AssistantPatch | null = null;
  try {
    openAIPatch = await openAIAssistantPatch(request, config);
  } catch {
    openAIPatch = null;
  }
  const patch = openAIPatch ?? fallbackAssistantPatch(request);

  const nextTheme = cleanTheme({
    ...(config.brand.theme ?? {}),
    ...(patch.theme ?? {}),
  });

  const next: ClientConfig = {
    ...config,
    brand: {
      ...config.brand,
      theme: nextTheme,
    },
    content: {
      ...config.content,
      hero: {
        ...config.content.hero,
        eyebrow: cleanString(patch.hero?.eyebrow) ?? config.content.hero.eyebrow,
        title: {
          line1: cleanString(patch.hero?.titleLine1) ?? config.content.hero.title.line1,
          line2: cleanString(patch.hero?.titleLine2) ?? config.content.hero.title.line2,
        },
        description: cleanString(patch.hero?.description) ?? config.content.hero.description,
        primaryCta: {
          ...config.content.hero.primaryCta,
          label: cleanString(patch.hero?.primaryLabel) ?? config.content.hero.primaryCta.label,
        },
        secondaryCta: {
          ...config.content.hero.secondaryCta,
          label: cleanString(patch.hero?.secondaryLabel) ?? config.content.hero.secondaryCta.label,
        },
        product: {
          ...config.content.hero.product,
          image: cleanString(patch.hero?.productImage) ?? config.content.hero.product.image,
        },
      },
    },
    footer: {
      ...config.footer,
      blurb: cleanString(patch.footer?.blurb) ?? config.footer.blurb,
    },
  };

  await saveClient(key, next);
  revalidateEverything();

  return {
    summary: patch.summary ?? (openAIPatch ? "AI edit applied." : "Fallback assistant edit applied."),
    usedOpenAI: openAIPatch !== null,
  };
}
