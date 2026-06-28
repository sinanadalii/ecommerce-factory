import { Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TrustIconKey, TrustProps } from "@/config/types";
import { Container } from "@/components/ui/Container";

const icons: Record<TrustIconKey, LucideIcon> = {
  truck: Truck,
  shield: ShieldCheck,
  refresh: RefreshCw,
  headset: Headset,
};

/**
 * Reassurance strip: four service guarantees above a quietly scrolling marquee
 * of press mentions. Badges and logos arrive via `TrustProps`.
 */
export function TrustBadges({ badges, brandLogos }: TrustProps) {
  // Duplicate the logo list so the marquee loops seamlessly.
  const marquee = [...brandLogos, ...brandLogos];

  return (
    <section className="border-y border-border bg-surface/40">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-14 lg:grid-cols-4">
          {badges.map((badge) => {
            const Icon = icons[badge.icon];
            return (
              <div key={badge.title} className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold-dim text-gold">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{badge.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Press marquee */}
      <div className="relative overflow-hidden border-t border-border py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="animate-marquee flex w-max items-center gap-16 pr-16">
          {marquee.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="font-serif text-xl tracking-[0.2em] text-subtle"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
