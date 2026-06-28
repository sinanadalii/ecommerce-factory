import { PROBLEMS } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Heading } from "./Heading";

export function Problem() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="The problem"
          title="Client ecommerce is stuck in the past"
          description="Bespoke builds are slow and don't scale. Templates are fast but look it. Agencies are stuck choosing between margin and quality."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className="rounded-card border border-border bg-surface/40 p-6 transition-colors hover:border-border-strong"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
