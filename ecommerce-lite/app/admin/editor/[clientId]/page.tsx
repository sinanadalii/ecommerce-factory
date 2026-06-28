import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { isClientKey } from "@/config/active-client";
import { getEffectiveClient } from "@/config/client-store";
import { ContentEditorForm } from "@/components/admin/ContentEditorForm";

export const metadata = { title: "Edit content" };

export default async function ContentEditorPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  if (!isClientKey(clientId)) notFound();

  const config = await getEffectiveClient(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-3.5" strokeWidth={1.75} /> Dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">
          Edit content — {config.brand.name}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Hero, categories, products, testimonials and footer text. Saving updates the
          live store for <code className="text-subtle">{clientId}</code> instantly.
        </p>
      </div>

      <ContentEditorForm
        clientId={clientId}
        hero={config.content.hero}
        categories={config.content.categories.items}
        products={config.content.featured.products}
        testimonials={config.content.testimonials.items}
        footer={{ blurb: config.footer.blurb, locale: config.footer.locale }}
      />
    </div>
  );
}
