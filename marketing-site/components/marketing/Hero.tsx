import Image from "next/image";
import { ArrowRight, Check, Terminal } from "lucide-react";
import { ENGINE_LINKS } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const MOCK_PRODUCTS = [
  { name: "Cashmere Wrap Coat", price: "$1,290", seed: "hero-p1" },
  { name: "Silk Slip Dress", price: "$420", seed: "hero-p2" },
  { name: "Wool Blazer", price: "$690", seed: "hero-p3" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -top-24 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center pt-16 text-center sm:pt-24">
          {/* Announcement */}
          <a
            href="#demos"
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-muted backdrop-blur transition-colors hover:border-gold/40 hover:text-foreground"
          >
            <span className="inline-block size-1.5 rounded-full bg-gold" />
            Phase 2 is live: AI editor, checkout and orders
            <ArrowRight className="size-3.5" strokeWidth={1.75} />
          </a>

          {/* Headline */}
          <h1 className="animate-fade-up mt-7 max-w-4xl font-serif text-[2.6rem] font-medium leading-[1.03] tracking-tight text-foreground balance sm:text-6xl lg:text-[4.5rem]">
            Launch editable stores with{" "}
            <span className="text-gold-gradient">AI, checkout and admin.</span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Ecommerce Factory is now connected end to end: choose a styled demo,
            edit it visually or with AI, capture checkout orders and manage them
            from the admin panel.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={ENGINE_LINKS.admin} variant="gold" size="lg">
              Open admin
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href={ENGINE_LINKS.assistant} variant="secondary" size="lg">
              Try AI assistant
            </Button>
          </div>

          <p className="animate-fade-up mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-subtle">
            {["Distinct demo styles", "Persian fonts", "Checkout + orders"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-gold" strokeWidth={2} /> {t}
              </span>
            ))}
          </p>
        </div>

        {/* Product preview — a mini storefront inside a browser frame */}
        <div className="animate-fade-up relative mx-auto mt-16 max-w-5xl sm:mt-20">
          <div className="absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-[28px] bg-gold/[0.04] blur-2xl" />
          <div className="overflow-hidden rounded-[14px] border border-border-strong bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-border bg-background/60 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
                <span className="size-3 rounded-full bg-white/15" />
              </div>
              <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1 text-[0.6875rem] text-subtle">
                <span className="size-1.5 rounded-full bg-gold" /> maisonnoir.com
              </div>
            </div>

            {/* Mini storefront */}
            <div className="relative">
              <div className="flex items-center justify-between border-b border-border px-5 py-3 text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                <span className="hidden sm:inline">New In</span>
                <span className="font-serif text-sm tracking-[0.2em] text-foreground">MAISON NOIR</span>
                <span className="hidden sm:inline">Bag (2)</span>
              </div>

              <div className="px-5 py-8 text-center sm:py-12">
                <p className="eyebrow mb-3">Autumn / Winter ’26</p>
                <p className="font-serif text-2xl font-medium text-foreground sm:text-4xl">
                  The art of <span className="text-gold-gradient">restraint.</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 px-5 pb-6 sm:gap-4">
                {MOCK_PRODUCTS.map((p) => (
                  <div key={p.seed}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2">
                      <Image
                        src={`https://picsum.photos/seed/${p.seed}/500/640`}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 30vw, 280px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 truncate text-[0.6875rem] text-foreground">{p.name}</p>
                    <p className="text-[0.6875rem] text-gold">{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating terminal chip */}
          <div className="absolute -left-3 -top-5 hidden rounded-xl border border-border-strong bg-background/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-left-8 sm:flex sm:items-center sm:gap-3">
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-gold/15 text-gold">
              <Terminal className="size-4" strokeWidth={1.75} />
            </span>
            <code className="font-mono text-xs text-foreground">
              npm run create-store <span className="text-gold">&quot;Acme Co&quot;</span>
            </code>
          </div>

          {/* Floating "published" chip */}
          <div className="absolute -bottom-5 -right-3 hidden items-center gap-2 rounded-full border border-border-strong bg-background/90 px-4 py-2 shadow-2xl backdrop-blur-xl sm:-right-8 sm:flex">
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-gold text-background">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
            <span className="text-xs font-medium text-foreground">Store live in ~60s</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
