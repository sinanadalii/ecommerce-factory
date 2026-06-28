import { ArrowRight, Check } from "lucide-react";
import { ENGINE_LINKS } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section id="cta" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-border bg-surface px-6 py-16 text-center sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)]" />
          <div className="pointer-events-none absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold/10 blur-[130px]" />

          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow mb-4">Get started</p>
            <h2 className="font-serif text-3xl font-medium leading-tight text-foreground balance sm:text-5xl">
              Stop rebuilding the same store.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              Launch your next ten client storefronts from one install. Premium by
              default, no-code for clients, owned by you.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={ENGINE_LINKS.admin} variant="gold" size="lg">
                Start building
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="#demos" variant="secondary" size="lg">
                Book a demo
              </Button>
            </div>

            <div className="mt-7 inline-flex items-center gap-3 rounded-lg border border-border bg-background/60 px-4 py-2.5">
              <span className="select-none font-mono text-xs text-subtle">$</span>
              <code className="font-mono text-xs text-foreground">npm install &amp;&amp; npm run setup</code>
            </div>

            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-subtle">
              {["No platform lock-in", "Own the code", "Cancel anytime"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-gold" strokeWidth={2} /> {t}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
