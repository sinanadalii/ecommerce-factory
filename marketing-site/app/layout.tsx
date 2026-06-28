import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PRODUCT } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = `${PRODUCT.name} — ${PRODUCT.tagline}`;
const description =
  "A multi-tenant ecommerce engine with distinct demos, AI-assisted editing, checkout capture, orders admin and Persian font support.";

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${PRODUCT.name}` },
  description,
  keywords: [
    "ecommerce platform",
    "multi-tenant ecommerce",
    "white-label ecommerce",
    "ecommerce for agencies",
    "store builder",
    "Next.js ecommerce",
    PRODUCT.name,
  ],
  openGraph: { title, description, siteName: PRODUCT.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
