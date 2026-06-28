"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { TestimonialsProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Auto-advancing testimonial carousel with manual controls and dots. Heading and
 * testimonial list are injected via `TestimonialsProps`.
 */
export function Testimonials({ heading, items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Auto-advance every 6s unless the user is hovering / focused within.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const active = items[index];

  return (
    <Section id="testimonials" className="border-t border-border">
      <SectionHeading {...heading} />

      <div
        className="relative mx-auto mt-12 max-w-3xl text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <Quote className="mx-auto size-9 fill-gold/20 text-gold" strokeWidth={1} />

        <blockquote
          key={active.id}
          className="animate-fade-up mt-6 font-serif text-2xl font-medium leading-snug text-foreground sm:text-[1.75rem]"
        >
          “{active.quote}”
        </blockquote>

        <div className="mt-7 flex flex-col items-center gap-3">
          <div className="flex" aria-hidden="true">
            {Array.from({ length: active.rating }).map((_, i) => (
              <Star key={i} className="size-4 fill-gold text-gold" strokeWidth={1.5} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="relative size-11 overflow-hidden rounded-full bg-surface">
              <Image
                src={active.avatar}
                alt={active.author}
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">{active.author}</p>
              <p className="text-xs text-muted">
                {active.role} · {active.location}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-9 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(index - 1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-2">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-border-strong hover:bg-muted",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </Section>
  );
}
