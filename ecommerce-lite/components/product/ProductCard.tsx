"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/config/types";
import { cn, discountPercent, isAdminUploadImage } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Price } from "@/components/ui/Price";

type ProductCardProps = {
  product: Product;
  /** Eager-load the image for above-the-fold cards (better LCP). */
  priority?: boolean;
  className?: string;
};

/**
 * The single, reusable product card used across Featured, Flash Sale and Best
 * Sellers. Image hover-zooms, a wishlist toggle sits top-right, and an
 * "Add to Bag" bar reveals on hover (and is always visible on touch via focus).
 *
 * Phase 2: the purchase CTA opens checkout for the selected item.
 */
export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const [wished, setWished] = useState(false);
  const discount = discountPercent(product);

  return (
    <article className={cn("group flex flex-col", className)}>
      {/* Media */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          unoptimized={isAdminUploadImage(product.image)}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />

        {/* Readability scrim for the overlay controls */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />

        {/* Flags (top-left) */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount && <Badge tone="sale">-{discount}%</Badge>}
          {product.badges?.map((b) => (
            <Badge key={b} tone={b === "Bestseller" || b === "Exclusive" ? "gold" : "neutral"}>
              {b}
            </Badge>
          ))}
        </div>

        {/* Wishlist (top-right) */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={() => setWished((v) => !v)}
          className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-background hover:text-gold"
        >
          <Heart className={cn("size-4", wished && "fill-sale text-sale")} strokeWidth={1.5} />
        </button>

        {/* Add to bag — reveals on hover / focus-within */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <a
            href={`/checkout?product=${encodeURIComponent(product.slug)}`}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-[7px] bg-foreground text-sm font-medium text-background transition-colors hover:bg-white"
          >
            <ShoppingBag className="size-4" strokeWidth={1.75} />
            Buy now
          </a>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-subtle">
          {product.category}
        </p>
        <h3 className="mt-1 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-gold">
          {product.name}
        </h3>

        <div className="mt-2">
          <Rating value={product.rating} reviewCount={product.reviewCount} hideCount />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Price value={product.price} compareAt={product.compareAtPrice} />
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <span
                  key={c}
                  title={`Colour ${c}`}
                  className="size-3.5 rounded-full ring-1 ring-inset ring-white/15"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
