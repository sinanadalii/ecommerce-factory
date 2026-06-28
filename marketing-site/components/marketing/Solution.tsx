import { SOLUTION_PILLARS } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Heading } from "./Heading";
import { ICONS } from "./icons";

export function Solution() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 size-[36rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[160px]" />
      </div>

      <Container className="relative">
        <Heading
          eyebrow="The solution"
          title={
            <>
              Productize your ecommerce work
            </>
          }
          description="Ecommerce Factory turns one premium codebase into an unlimited line of client stores — fast to ship, beautiful by default, and easy to hand off."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {SOLUTION_PILLARS.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <div
                key={p.title}
                className="rounded-card border border-border bg-surface/50 p-7"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-gold/30 bg-gold-dim text-gold">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-serif text-xl text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
