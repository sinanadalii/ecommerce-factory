import Image from "next/image";
import Link from "next/link";
import { PackageCheck, ReceiptText } from "lucide-react";
import { clients, type ClientKey } from "@/config/active-client";
import { getAllOrders } from "@/config/order-store";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Orders" };

const ORDER = Object.keys(clients) as ClientKey[];

export default async function OrdersPage() {
  const orders = await getAllOrders(ORDER);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">
          Phase 2 commerce
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">Orders</h1>
        <p className="mt-1 text-sm text-muted">
          Orders captured from storefront checkout flows across every tenant.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-card border border-border bg-surface/50 p-8 text-center">
          <ReceiptText className="mx-auto size-10 text-gold" strokeWidth={1.5} />
          <h2 className="mt-4 text-lg font-semibold text-foreground">No orders yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Place a test order from a storefront product card and it will appear here.
          </p>
          <Link
            href="/"
            target="_blank"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-xs font-semibold text-foreground hover:border-gold/50 hover:text-gold"
          >
            Open storefront
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-card border border-border bg-surface/50 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-mono text-sm font-semibold text-foreground">{order.id}</h2>
                    <span className="rounded-full bg-gold-dim px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-gold">
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {order.clientName} · {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-left lg:text-right">
                  <p className="text-sm font-semibold text-foreground">{formatPrice(order.subtotal)}</p>
                  <p className="text-xs text-muted">{order.customer.name} · {order.customer.email}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.75fr]">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex gap-3 rounded-lg border border-border bg-background/40 p-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-surface-2">
                        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="mt-1 text-xs text-muted">
                          Qty {item.quantity} · {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-border bg-background/40 p-3 text-sm">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <PackageCheck className="size-4 text-gold" strokeWidth={1.75} />
                    Customer details
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-muted">
                    <p>{order.customer.phone}</p>
                    <p>{order.customer.address}</p>
                    {order.notes ? <p>Notes: {order.notes}</p> : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
