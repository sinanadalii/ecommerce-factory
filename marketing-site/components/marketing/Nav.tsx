"use client";

import { useEffect, useState } from "react";
import { Boxes, Menu, X } from "lucide-react";
import { NAV_LINKS, PRODUCT } from "@/data/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-background/0",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-gold/15 text-gold ring-1 ring-inset ring-gold/30">
                <Boxes className="size-4.5" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {PRODUCT.name}
              </span>
            </a>

            <nav className="hidden items-center gap-7 lg:flex">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[0.8125rem] font-medium text-muted transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="#demos"
                className="text-[0.8125rem] font-medium text-muted transition-colors hover:text-foreground"
              >
                Live demos
              </a>
              <Button href="#cta" variant="gold" size="sm">
                Get started
              </Button>
            </div>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn("fixed inset-0 z-50 lg:hidden", open ? "" : "pointer-events-none")}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-overlay backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col bg-surface transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="text-sm font-semibold">{PRODUCT.name}</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-foreground"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>
          <nav className="flex flex-col p-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-white/[0.04] hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto border-t border-border p-5">
            <Button href="#cta" variant="gold" size="md" className="w-full" onClick={() => setOpen(false)}>
              Get started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
