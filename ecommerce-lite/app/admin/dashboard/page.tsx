import Link from "next/link";
import {
  Boxes,
  LayoutGrid,
  MessageSquareQuote,
  PencilRuler,
  FileText,
  TrendingUp,
  ShoppingCart,
  WandSparkles,
} from "lucide-react";
import { getActiveClient, getActiveClientKey } from "@/config/tenant";
import { getAllEffectiveClients, isOverridden } from "@/config/client-store";
import { clients, type ClientKey } from "@/config/active-client";
import type { ClientConfig } from "@/config/types";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

// Registry-derived, so every tenant (incl. the Demo Store Pack) is listed.
const ORDER = Object.keys(clients) as ClientKey[];

/** Deterministic mock KPIs derived from the config (no backend). */
function mockStats(config: ClientConfig) {
  const cats = config.content.categories.items.length;
  const prods = config.content.featured.products.length;
  const avg =
    config.content.featured.products.reduce((s, p) => s + p.price, 0) /
    Math.max(prods, 1);
  const orders = 180 + ((cats * 37 + prods * 53 + config.brand.name.length * 9) % 820);
  const revenue = Math.round(orders * avg);
  return { orders, revenue };
}

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Boxes;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background/40 px-3 py-2.5">
      <Icon className="size-4 shrink-0 text-gold" strokeWidth={1.75} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
        <p className="text-[0.625rem] uppercase tracking-[0.1em] text-subtle">{label}</p>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const [activeKey, activeConfig, all] = await Promise.all([
    getActiveClientKey(),
    getActiveClient(),
    getAllEffectiveClients(),
  ]);
  const overrides = await Promise.all(ORDER.map((k) => isOverridden(k)));

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">
          No-code factory
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">Store dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Edit any store visually — changes save to the runtime config and appear on
          the storefront instantly, no code or rebuild.
        </p>
      </div>

      {/* Active store banner */}
      <div className="flex flex-col gap-3 rounded-card border border-gold/30 bg-gold-dim p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.625rem] uppercase tracking-[0.16em] text-gold">
            This request resolves to
          </p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {activeConfig.brand.name}{" "}
            <span className="text-sm font-normal text-muted">({activeKey})</span>
          </p>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-muted">
          The active tenant is resolved per request from the host. Use a tenant
          domain/subdomain (or the env fallback) to preview a specific store.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/admin/orders"
          className="rounded-card border border-border bg-surface/50 p-4 transition-colors hover:border-gold/40"
        >
          <ShoppingCart className="size-5 text-gold" strokeWidth={1.75} />
          <h2 className="mt-3 text-sm font-semibold text-foreground">Orders & customers</h2>
          <p className="mt-1 text-xs text-muted">
            Review captured checkout orders across every tenant.
          </p>
        </Link>
        <Link
          href="/admin/assistant"
          className="rounded-card border border-border bg-surface/50 p-4 transition-colors hover:border-gold/40"
        >
          <WandSparkles className="size-5 text-gold" strokeWidth={1.75} />
          <h2 className="mt-3 text-sm font-semibold text-foreground">AI site assistant</h2>
          <p className="mt-1 text-xs text-muted">
            Describe a brand direction and apply a guided edit to a demo store.
          </p>
        </Link>
      </div>

      {/* Store cards */}
      <div className="grid gap-5 lg:grid-cols-3">
        {ORDER.map((key, i) => {
          const config = all[key as ClientKey];
          const enabled = config.pages.home.sections.filter((s) => s.enabled).length;
          const total = config.pages.home.sections.length;
          const kpi = mockStats(config);
          const edited = overrides[i];

          return (
            <div
              key={key}
              className="flex flex-col rounded-card border border-border bg-surface/50 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl text-foreground">{config.brand.name}</h2>
                  <p className="mt-0.5 text-xs text-muted">{config.brand.tagline}</p>
                </div>
                <span
                  className={
                    "shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] " +
                    (edited
                      ? "bg-gold text-background"
                      : "border border-border text-subtle")
                  }
                >
                  {edited ? "Edited" : "Seed"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <StatChip icon={ShoppingCart} label="Orders · 30d" value={kpi.orders.toLocaleString()} />
                <StatChip icon={TrendingUp} label="Revenue · 30d" value={formatPrice(kpi.revenue)} />
                <StatChip icon={LayoutGrid} label="Categories" value={String(config.content.categories.items.length)} />
                <StatChip icon={Boxes} label="Featured" value={String(config.content.featured.products.length)} />
                <StatChip icon={MessageSquareQuote} label="Reviews" value={String(config.content.testimonials.items.length)} />
                <StatChip icon={FileText} label="Sections" value={`${enabled}/${total}`} />
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  href={`/admin/clients/${key}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <PencilRuler className="size-3.5" strokeWidth={1.75} />
                  Brand &amp; layout
                </Link>
                <Link
                  href={`/admin/editor/${key}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-background transition-colors hover:bg-gold-bright"
                >
                  <FileText className="size-3.5" strokeWidth={1.75} />
                  Edit content
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tenant key hint (kept honest: seeds are also valid keys) */}
      <p className="text-xs text-subtle">
        Registered tenants: {Object.keys(clients).join(" · ")}. Add one by creating
        a <code className="text-muted">clients/client-*.ts</code>, registering it in{" "}
        <code className="text-muted">config/active-client.ts</code>, and mapping a
        domain in <code className="text-muted">config/tenant-resolver.ts</code>.
      </p>
    </div>
  );
}
