"use client";

import { useEffect, useState } from "react";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";
import type { HeaderProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/IconButton";
import { Container } from "@/components/ui/Container";

/**
 * Sticky site header: announcement bar, brand wordmark, primary nav, and the
 * search / wishlist / cart actions. Mobile-first — nav collapses into a drawer
 * and search opens an inline panel. Counts are mock values.
 *
 * Brand, announcement and nav links arrive via `HeaderProps` from the client config.
 */
export function Header({ brandName, announcement, navLinks }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement strip */}
      <div className="bg-gold text-background">
        <p className="mx-auto max-w-[1280px] px-5 py-2 text-center text-[0.6875rem] font-medium uppercase tracking-[0.16em] sm:px-8">
          {announcement}
        </p>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled || searchOpen
            ? "border-border bg-background/85 backdrop-blur-xl"
            : "border-transparent bg-background",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            {/* Left: mobile menu + nav */}
            <div className="flex flex-1 items-center gap-1">
              <IconButton
                label="Open menu"
                className="lg:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </IconButton>

              <nav className="hidden items-center gap-7 lg:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[0.8125rem] font-medium tracking-wide text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Center: brand */}
            <a
              href="#top"
              className="shrink-0 font-serif text-xl tracking-[0.22em] text-foreground sm:text-2xl"
            >
              {brandName}
            </a>

            {/* Right: actions */}
            <div className="flex flex-1 items-center justify-end gap-0.5">
              <IconButton
                label={searchOpen ? "Close search" : "Search"}
                onClick={() => setSearchOpen((v) => !v)}
              >
                {searchOpen ? (
                  <X className="size-5" strokeWidth={1.5} />
                ) : (
                  <Search className="size-5" strokeWidth={1.5} />
                )}
              </IconButton>
              <IconButton label="Wishlist" count={2} className="hidden sm:inline-flex">
                <Heart className="size-5" strokeWidth={1.5} />
              </IconButton>
              <IconButton label="Shopping bag" count={3}>
                <ShoppingBag className="size-5" strokeWidth={1.5} />
              </IconButton>
            </div>
          </div>

          {/* Inline search panel */}
          {searchOpen && (
            <div className="pb-4">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-3 rounded-[10px] border border-border bg-surface px-4 py-3"
              >
                <Search className="size-5 shrink-0 text-subtle" strokeWidth={1.5} />
                <input
                  autoFocus
                  type="search"
                  placeholder="Search for pieces, categories, edits…"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-subtle focus:outline-none"
                />
              </form>
            </div>
          )}
        </Container>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        {/* Scrim */}
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-overlay backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Panel */}
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-surface transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <span className="font-serif text-lg tracking-[0.18em]">{brandName}</span>
            <IconButton label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="size-5" strokeWidth={1.5} />
            </IconButton>
          </div>
          <nav className="flex flex-col px-2 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-white/[0.04] hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto border-t border-border px-6 py-5">
            <a
              href="#newsletter"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
            >
              <Heart className="size-4" strokeWidth={1.5} /> Wishlist (2)
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
