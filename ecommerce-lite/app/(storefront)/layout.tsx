import type { Metadata } from "next";
import { getActiveClient } from "@/config/tenant";
import { buildThemeCss } from "@/config/theme-style";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Storefront chrome (skip link + Header + main + Footer), resolved per request
 * from the active tenant. Identical DOM to before — just relocated here so that
 * /admin does not inherit the store header/footer.
 *
 * Adds one additive, opt-in touch: when the active tenant has admin-set brand
 * colours, their CSS-variable overrides are injected. Tenants without colours
 * render nothing extra, so existing stores are byte-for-byte unchanged.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { brand } = await getActiveClient();
  return {
    title: {
      default: `${brand.name} — ${brand.tagline}`,
      template: `%s — ${brand.name}`,
    },
    description: brand.description,
    keywords: [
      "luxury fashion",
      "cashmere",
      "tailoring",
      "designer clothing",
      "premium ecommerce",
      brand.name,
    ],
    openGraph: {
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.description,
      siteName: brand.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} — ${brand.tagline}`,
      description: brand.description,
    },
  };
}

export default async function StorefrontLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { header, footer, brand } = await getActiveClient();
  const themeCss = buildThemeCss(brand.theme);

  return (
    <>
      {themeCss && <style dangerouslySetInnerHTML={{ __html: themeCss }} />}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header {...header} />
      <main id="main">{children}</main>
      <Footer {...footer} />
    </>
  );
}
