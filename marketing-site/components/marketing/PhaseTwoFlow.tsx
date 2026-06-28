import { ArrowUpRight, Bot, CreditCard, Palette, ReceiptText } from "lucide-react";
import { PHASE_TWO_FLOW } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Heading } from "./Heading";

const ICONS = [Palette, Bot, CreditCard, ReceiptText] as const;

export function PhaseTwoFlow() {
  return (
    <section id="phase-2-flow" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="Phase 2 flow"
          title="From landing page to a working store."
          description="The marketing site now points to the real engine paths: demo editing, AI assistance, checkout and order management."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PHASE_TWO_FLOW.map((step, index) => {
            const Icon = ICONS[index] ?? Palette;

            return (
              <article
                key={step.n}
                className="flex min-h-[260px] flex-col rounded-card border border-border bg-surface/40 p-6 transition-colors hover:border-gold/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-gold">{step.n}</span>
                  <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-gold">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                </div>

                <h3 className="mt-5 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                  {step.body}
                </p>

                <a
                  href={step.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold transition-colors hover:text-gold-bright"
                >
                  {step.cta}
                  <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                </a>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
