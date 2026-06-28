import { ArrowRight } from "lucide-react";
import { STEPS } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Heading } from "./Heading";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="How it works"
          title="From zero to deployed in four steps"
          description="The whole workflow, start to finish. No hidden setup, no surprise config — what you see is the product."
        />

        {/* Flow pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
          {STEPS.map((s, i) => (
            <span key={s.title} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-surface/50 px-3 py-1 font-medium text-foreground">
                {s.title}
              </span>
              {i < STEPS.length - 1 && <ArrowRight className="size-3.5 text-subtle" strokeWidth={2} />}
            </span>
          ))}
        </div>

        {/* Step cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col rounded-card border border-border bg-surface/40 p-6">
              <span className="font-mono text-xs text-gold">{s.n}</span>
              <h3 className="mt-2 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-muted">{s.body}</p>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                <span className="select-none font-mono text-xs text-subtle">$</span>
                <code className="truncate font-mono text-xs text-foreground">{s.code}</code>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
