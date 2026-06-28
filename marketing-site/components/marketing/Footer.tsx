import { Boxes, Github, Twitter, Linkedin } from "lucide-react";
import { FOOTER_COLUMNS, PRODUCT } from "@/data/content";
import { Container } from "@/components/ui/Container";

const SOCIALS = [
  { label: "GitHub", icon: Github },
  { label: "Twitter", icon: Twitter },
  { label: "LinkedIn", icon: Linkedin },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/30">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-gold/15 text-gold ring-1 ring-inset ring-gold/30">
                <Boxes className="size-4.5" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {PRODUCT.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{PRODUCT.tagline}</p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-muted transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {PRODUCT.name}. All rights reserved.</p>
          <p>Built with the {PRODUCT.name} design system.</p>
        </div>
      </Container>
    </footer>
  );
}
