import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import type { HeroProps, TextAlign, TextScale } from "@/config/types";
import { cn, formatPrice, isAdminUploadImage } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

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
  settings,
}: HeroProps) {
  const textPosition = settings?.textPosition ?? "left";
  const textAlign = settings?.textAlign ?? (textPosition === "center" ? "center" : textPosition === "right" ? "right" : "left");
  const titleSize = settings?.titleSize ?? "default";
  const descriptionSize = settings?.descriptionSize ?? "default";

  const titleClasses: Record<TextScale, string> = {
    compact: "text-[2.25rem] sm:text-5xl lg:text-[3.5rem]",
    default: "text-[2.75rem] sm:text-6xl lg:text-[4.25rem]",
    large: "text-[3.25rem] sm:text-7xl lg:text-[5rem]",
  };
  const descriptionClasses: Record<TextScale, string> = {
    compact: "text-sm",
    default: "text-base sm:text-lg",
    large: "text-lg sm:text-xl",
  };
  const alignClasses: Record<TextAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const rowAlign: Record<TextAlign, string> = {
    left: "sm:justify-start",
    center: "sm:justify-center",
    right: "sm:justify-end",
  };
  const trustAlign: Record<TextAlign, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const showPrimaryCta = settings?.showPrimaryCta ?? true;
  const showSecondaryCta = settings?.showSecondaryCta ?? true;
  const showTrustRow = settings?.showTrustRow ?? true;
  const showProductChip = settings?.showProductChip ?? true;
  const showFeaturedBadge = settings?.showFeaturedBadge ?? true;

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-24 top-10 size-[26rem] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 size-[30rem] rounded-full bg-gold-dim blur-[140px]" />
      </div>

      <Container className="relative">
        <div
          className={cn(
            "grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24",
            textPosition === "center" && "lg:grid-cols-1",
          )}
        >
          <div
            className={cn(
              "animate-fade-up max-w-xl",
              alignClasses[textAlign],
              textPosition === "center" && "mx-auto",
              textPosition === "right" && "lg:order-2 lg:ml-auto",
            )}
          >
            <p className="eyebrow mb-5">{eyebrow}</p>
            <h1 className={cn("font-serif font-medium leading-[1.04] tracking-tight text-foreground", titleClasses[titleSize])}>
              {title.line1}
              <br />
              <span className="text-gold-gradient">{title.line2}</span>
            </h1>
            <p
              className={cn(
                "mt-6 max-w-md leading-relaxed text-muted",
                descriptionClasses[descriptionSize],
                textAlign === "center" && "mx-auto",
                textAlign === "right" && "ml-auto",
              )}
            >
              {description}
            </p>

            {(showPrimaryCta || showSecondaryCta) && (
              <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row", rowAlign[textAlign])}>
                {showPrimaryCta && (
                  <Button href={primaryCta.href} variant="gold" size="lg">
                    {primaryCta.label}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                )}
                {showSecondaryCta && (
                  <Button href={secondaryCta.href} variant="secondary" size="lg">
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}

            {showTrustRow && (
              <div className={cn("mt-10 flex flex-wrap items-center gap-x-8 gap-y-4", trustAlign[textAlign])}>
                <div className="flex items-center gap-2">
                  <div className="flex" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold text-gold" strokeWidth={1.5} />
                    ))}
                  </div>
                  <span className="text-sm text-muted">
                    <span className="font-semibold text-foreground">{ratingValue}</span> - {ratingSuffix}
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <span className="text-sm text-muted">{trustNote}</span>
              </div>
            )}
          </div>

          <div
            className={cn(
              "relative mx-auto w-full max-w-md lg:max-w-none",
              textPosition === "center" && "max-w-xl",
              textPosition === "right" && "lg:order-1",
            )}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-surface">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                unoptimized={isAdminUploadImage(product.image)}
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {showProductChip && (
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-border-strong bg-background/80 p-3 pr-5 shadow-2xl backdrop-blur-xl sm:left-6">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="56px"
                    unoptimized={isAdminUploadImage(product.image)}
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
            )}

            {showFeaturedBadge && (
              <div className="absolute -right-2 top-6 hidden items-center gap-2 rounded-full border border-border-strong bg-background/80 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:flex">
                <Star className="size-4 fill-gold text-gold" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-foreground">{featuredBadge}</span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
