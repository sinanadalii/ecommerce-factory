import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock, ShoppingBag } from "lucide-react";
import { getActiveClient } from "@/config/tenant";
import type { Product } from "@/config/types";
import { formatPrice, isAdminUploadImage } from "@/lib/utils";
import { placeOrder } from "./actions";

export const metadata = { title: "Checkout" };

function allProducts(config: Awaited<ReturnType<typeof getActiveClient>>): Product[] {
  return [
    config.content.hero.product,
    ...config.content.featured.products,
    ...config.content.flashSale.products,
    ...config.content.bestSellers.products,
  ].filter((product) => !product.hidden);
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const [{ product: productSlug }, config] = await Promise.all([searchParams, getActiveClient()]);
  const products = allProducts(config);
  const product = products.find((p) => p.slug === productSlug) ?? products[0];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-3.5" strokeWidth={1.75} /> Continue shopping
          </Link>
          <p className="eyebrow mt-8">Secure checkout</p>
          <h1 className="mt-3 font-serif text-4xl font-medium text-foreground">
            Finish your order
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Phase 2 checkout captures the order and sends it to the store admin.
            A real payment gateway can be connected next without changing this flow.
          </p>

          <form action={placeOrder} className="mt-8 space-y-5 rounded-card border border-border bg-surface/50 p-5">
            <input type="hidden" name="productSlug" value={product.slug} />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Full name</span>
                <input required name="name" className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
                <input required type="email" name="email" className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted">Phone</span>
                <input required name="phone" className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium text-muted">Shipping address</span>
                <textarea required name="address" rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium text-muted">Notes</span>
                <textarea name="notes" rows={2} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground" />
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold px-5 text-sm font-semibold text-background transition-colors hover:bg-gold-bright"
            >
              <Lock className="size-4" strokeWidth={1.75} />
              Place order
            </button>
          </form>
        </div>

        <aside className="rounded-card border border-border bg-surface/50 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShoppingBag className="size-4 text-gold" strokeWidth={1.75} />
            Order summary
          </div>
          <div className="mt-5 flex gap-4">
            <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-card bg-surface-2">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="96px"
                unoptimized={isAdminUploadImage(product.image)}
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{product.name}</p>
              <p className="mt-1 text-xs text-muted">{product.category}</p>
              <p className="mt-3 text-sm font-semibold text-gold">{formatPrice(product.price)}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className="text-foreground">Calculated later</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
