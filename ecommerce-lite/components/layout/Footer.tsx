import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FooterProps, SocialIconKey } from "@/config/types";
import { Container } from "@/components/ui/Container";

const socialIcons: Record<SocialIconKey, LucideIcon> = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
};

/**
 * Global footer: brand, link columns, socials, payment row, legal bar. All
 * content arrives via `FooterProps` from the client config.
 */
export function Footer({
  brandName,
  blurb,
  columns,
  socials,
  legalLinks,
  locale,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="font-serif text-2xl tracking-[0.2em] text-foreground">
              {brandName}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted">{blurb}</p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Icon className="size-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brandName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-muted"
              >
                {link.label}
              </a>
            ))}
            <span className="hidden sm:inline">·</span>
            <span>{locale}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
