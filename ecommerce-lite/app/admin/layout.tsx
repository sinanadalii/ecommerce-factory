import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Store, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin · Ecommerce Factory",
};

/**
 * Admin chrome — a distinct shell for the no-code admin, separate from the
 * storefront. Built entirely from existing design tokens; adds no design-system
 * changes and never renders the storefront header/footer.
 */
export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground"
            >
              <LayoutDashboard className="size-4 text-gold" strokeWidth={1.75} />
              Factory Admin
            </Link>
            <nav className="hidden items-center gap-5 text-xs text-muted sm:flex">
              <Link href="/admin/dashboard" className="transition-colors hover:text-foreground">
                Dashboard
              </Link>
            </nav>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-gold/50 hover:text-gold"
          >
            <Store className="size-3.5" strokeWidth={1.75} />
            View store
            <ExternalLink className="size-3" strokeWidth={1.75} />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-5 py-8">{children}</div>
    </div>
  );
}
