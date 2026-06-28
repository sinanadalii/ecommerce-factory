import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Order received" };

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-xl px-5 text-center sm:px-8">
        <CheckCircle2 className="mx-auto size-12 text-gold" strokeWidth={1.5} />
        <p className="eyebrow mt-6">Order received</p>
        <h1 className="mt-3 font-serif text-4xl font-medium text-foreground">
          Your storefront captured the order.
        </h1>
        {order ? <p className="mt-3 font-mono text-xs text-subtle">Order ID: {order}</p> : null}
        <p className="mt-5 text-sm leading-relaxed text-muted">
          The store admin can now review this order in the phase two admin panel.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-gold/50 hover:text-gold"
        >
          Back to store
        </Link>
      </div>
    </section>
  );
}
