import { PROOF_LOGOS, PROOF_STATS } from "@/data/content";
import { Container } from "@/components/ui/Container";

export function SocialProof() {
  const logos = [...PROOF_LOGOS, ...PROOF_LOGOS];

  return (
    <section className="border-y border-border bg-surface/30 py-14">
      <Container>
        <p className="text-center text-xs uppercase tracking-[0.18em] text-subtle">
          Trusted by studios and freelancers shipping client stores
        </p>

        {/* Logo marquee */}
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent sm:w-32" />
          <div className="animate-marquee flex w-max items-center gap-14 pr-14">
            {logos.map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap text-sm font-semibold tracking-[0.12em] text-subtle"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border lg:grid-cols-4">
          {PROOF_STATS.map((s) => (
            <div key={s.label} className="bg-background px-5 py-7 text-center">
              <p className="font-serif text-3xl font-medium text-foreground sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[0.625rem] text-subtle">
          Figures illustrative of typical agency outcomes.
        </p>
      </Container>
    </section>
  );
}
