"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import type { FlashSaleProps } from "@/config/types";
import { pad2 } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { ProductGrid } from "@/components/product/ProductGrid";

type TimeLeft = { d: number; h: number; m: number; s: number };

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff / 3_600_000) % 24),
    m: Math.floor((diff / 60_000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

/** Single countdown unit box. */
function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border-strong bg-background/60 font-serif text-2xl tabular-nums text-foreground backdrop-blur-sm sm:h-16 sm:w-16 sm:text-3xl">
        {pad2(value)}
      </div>
      <span className="mt-2 text-[0.625rem] uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
    </div>
  );
}

/**
 * Flash sale with a live (mock) countdown. The target is set on mount so the
 * server/client markup matches — units render as 00 until hydration. All copy,
 * the sale window and the product list arrive via `FlashSaleProps`.
 */
export function FlashSale({ badge, title, subtitle, durationMs, products }: FlashSaleProps) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = Date.now() + durationMs;
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  const t = time ?? { d: 0, h: 0, m: 0, s: 0 };

  return (
    <Section id="flash-sale" className="relative overflow-hidden border-t border-border">
      {/* Warm urgency glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-sale/10 blur-[140px]" />
      </div>

      <div className="relative flex flex-col items-center gap-8 rounded-[20px] border border-border bg-surface/50 p-6 sm:p-10 lg:flex-row lg:justify-between">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-sale/15 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-sale">
            <Zap className="size-3.5 fill-sale" strokeWidth={0} />
            {badge}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted lg:mx-0">{subtitle}</p>
        </div>

        {/* Countdown */}
        <div
          className="flex items-center gap-2 sm:gap-3"
          role="timer"
          aria-label="Time remaining in flash sale"
        >
          <CountUnit value={t.d} label="Days" />
          <span className="pb-6 font-serif text-2xl text-subtle">:</span>
          <CountUnit value={t.h} label="Hrs" />
          <span className="pb-6 font-serif text-2xl text-subtle">:</span>
          <CountUnit value={t.m} label="Min" />
          <span className="pb-6 font-serif text-2xl text-subtle">:</span>
          <CountUnit value={t.s} label="Sec" />
        </div>
      </div>

      <ProductGrid products={products} columns={4} className="mt-12" />
    </Section>
  );
}
