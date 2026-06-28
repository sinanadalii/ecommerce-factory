import type { ReactNode } from "react";
import { FEATURES } from "@/data/content";
import { Container } from "@/components/ui/Container";
import { Heading } from "./Heading";
import { ICONS } from "./icons";

/** Render `inline code` segments inside body copy as styled <code>. */
function withCode(text: string): ReactNode {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.8em] text-gold">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="Features"
          title="Everything Phase 2 connects."
          description="A complete path from demo selection to AI-assisted editing, checkout capture and order management."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <div key={f.title} className="bg-background p-6 transition-colors hover:bg-surface/40">
                <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-gold">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{withCode(f.body)}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
