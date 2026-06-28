import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import type { HeroProps } from "@/config/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Product-focused hero. Editorial split layout: persuasive copy + dual CTAs on
 * the left, a hero garment with floating product / rating chips on the right.
 * Ambient gold glows sit behind everything for depth.
 *
 * Fully props-driven — all content arrives via `HeroProps` from the client config.
 */
export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  ratingValue,
  ratingSuffix,
  trustNote,
  featuredBadge,
  product,
}: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-24 top-10 size-[26rem] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 size-[30rem] rounded-full bg-gold-dim blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24">
          {/* Copy */}
          <div className="animate-fade-up max-w-xl">
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className="font-serif text-[2.75rem] font-medium leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
              {title.line1}
              <br />
              <span className="text-gold-gradient">{title.line2}</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={primaryCta.href} variant="gold" size="lg">
                {primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <div className="flex" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" strokeWidth={1.5} />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  <span className="font-semibold text-foreground">{ratingValue}</span> ·{" "}
                  {ratingSuffix}
                </span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted">{trustNote}</span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-surface">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating product chip */}
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-border-strong bg-background/80 p-3 pr-5 shadow-2xl backdrop-blur-xl sm:left-6">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-subtle">
                  {product.category}
                </p>
                <p className="text-sm font-medium text-foreground">{product.name}</p>
                <p className="text-sm font-medium text-gold">{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -right-2 top-6 hidden items-center gap-2 rounded-full border border-border-strong bg-background/80 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:flex">
              <Star className="size-4 fill-gold text-gold" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-foreground">{featuredBadge}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
