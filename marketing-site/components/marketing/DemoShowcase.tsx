"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { DEMOS } from "@/data/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "./Heading";

export function DemoShowcase() {
  const [active, setActive] = useState(0);
  const demo = DEMOS[active];

  return (
    <section id="demos" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="Interactive demos"
          title="One engine. Three premium storefronts."
          description="The same system, themed three ways. Click through real demo stores you can show a client tomorrow — all built from one codebase."
        />

        {/* Tabs */}
        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-2.5 sm:flex-row sm:justify-center">
          {DEMOS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={cn(
                "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all sm:flex-1",
                i === active
                  ? "border-gold/50 bg-gold-dim"
                  : "border-border bg-surface/40 hover:border-border-strong",
              )}
            >
              <span
                className="size-2.5 shrink-0 rounded-full ring-2 ring-inset ring-white/10"
                style={{ backgroundColor: d.accent }}
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-foreground">{d.name}</span>
                <span className="block text-[0.6875rem] text-muted">{d.vertical}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Active demo */}
        <div key={demo.id} className="animate-fade-up mt-10 grid items-center gap-10 lg:grid-cols-2">
          {/* Info */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-3">{demo.vertical}</p>
            <h3 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">{demo.name}</h3>
            <p className="mt-1 text-sm italic text-gold">{demo.tagline}</p>
            <p className="mt-5 text-base leading-relaxed text-muted">{demo.blurb}</p>

            <ul className="mt-6 space-y-2.5">
              {demo.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-foreground">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-gold-dim text-gold">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={demo.href} variant="secondary" size="md">
                View live demo
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </Button>
              <Button href="#cta" variant="ghost" size="md">
                Use as a starter →
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="relative order-1 lg:order-2">
            <div
              className="absolute -inset-4 -z-10 rounded-[28px] blur-2xl"
              style={{ backgroundColor: `${demo.accent}14` }}
            />
            <div className="overflow-hidden rounded-[14px] border border-border-strong bg-surface shadow-[0_40px_120px_-50px_rgba(0,0,0,0.8)]">
              <div className="flex items-center gap-3 border-b border-border bg-background/60 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1 text-[0.625rem] text-subtle">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: demo.accent }} />
                  {demo.id}.com
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                <span className="hidden sm:inline">Shop</span>
                <span className="font-serif text-xs tracking-[0.2em] text-foreground">{demo.name}</span>
                <span className="hidden sm:inline">Bag</span>
              </div>

              <div className="px-4 py-6 text-center">
                <p className="font-serif text-lg font-medium text-foreground sm:text-2xl">{demo.tagline}</p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 px-4 pb-5">
                {demo.products.map((p) => (
                  <div key={p.name}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface-2">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 30vw, 200px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-1.5 truncate text-[0.625rem] text-foreground">{p.name}</p>
                    <p className="text-[0.625rem]" style={{ color: demo.accent }}>
                      {p.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
