import { Check, X } from "lucide-react";
import { COMPARISON } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Heading } from "./Heading";

export function Comparison() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="Why switch"
          title="The math is simple"
          description="Same premium result. A fraction of the time, cost and maintenance — store after store."
        />

        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-card border border-border">
          {/* Header */}
          <div className="grid grid-cols-[1.3fr_1fr_1fr] border-b border-border bg-surface/40">
            <div className="px-4 py-4 sm:px-6" />
            <div className="px-3 py-4 text-center text-xs font-semibold text-muted sm:px-4">
              {COMPARISON.columns[0]}
            </div>
            <div className="bg-gold-dim px-3 py-4 text-center text-xs font-semibold text-gold sm:px-4">
              {COMPARISON.columns[1]}
            </div>
          </div>

          {/* Rows */}
          {COMPARISON.rows.map((row, i) => (
            <div
              key={row.label}
              className={
                "grid grid-cols-[1.3fr_1fr_1fr] items-center" +
                (i < COMPARISON.rows.length - 1 ? " border-b border-border" : "")
              }
            >
              <div className="px-3 py-4 text-xs font-medium text-foreground sm:px-6 sm:text-sm">
                {row.label}
              </div>
              <div className="flex h-full items-start gap-1.5 px-3 py-4 sm:px-4">
                <X className="mt-0.5 size-3.5 shrink-0 text-subtle" strokeWidth={2.5} />
                <span className="text-xs text-muted">{row.a}</span>
              </div>
              <div className="flex h-full items-start gap-1.5 bg-gold-dim px-3 py-4 sm:px-4">
                <Check className="mt-0.5 size-3.5 shrink-0 text-gold" strokeWidth={2.5} />
                <span className="text-xs font-medium text-foreground">{row.b}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
