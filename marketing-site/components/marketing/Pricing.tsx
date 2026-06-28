import { Check } from "lucide-react";
import { ENGINE_LINKS, PRICING } from "@/data/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "./Heading";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="Pricing"
          title="Pick the workflow you want to productize."
          description="Pricing is still placeholder, but the preview now shows the real Phase 2 surface: editor, AI assistant, checkout and orders."
        />

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {PRICING.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-card border p-7",
                tier.featured
                  ? "border-gold/50 bg-gold-dim shadow-[0_30px_90px_-50px_rgba(199,169,107,0.6)]"
                  : "border-border bg-surface/40",
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-background">
                  Most popular
                </span>
              )}

              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-serif text-4xl font-medium text-foreground">{tier.price}</span>
                {tier.cadence && <span className="text-xs text-subtle">{tier.cadence}</span>}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tier.tagline}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-gold-dim text-gold">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href={ENGINE_LINKS.admin}
                variant={tier.featured ? "gold" : "secondary"}
                size="md"
                className="mt-7 w-full"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-subtle">
          Placeholder pricing for this preview. Phase 2 functionality is available in the engine now.
        </p>
      </Container>
    </section>
  );
}
