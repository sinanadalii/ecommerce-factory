import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { isClientKey } from "@/config/active-client";
import { getEffectiveClient, isOverridden } from "@/config/client-store";
import { ClientSettingsForm } from "@/components/admin/ClientSettingsForm";

export const metadata = { title: "Brand & layout" };

export default async function ClientEditorPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  if (!isClientKey(clientId)) notFound();

  const config = await getEffectiveClient(clientId);
  const edited = await isOverridden(clientId);

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
          Brand &amp; layout — {config.brand.name}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Edit the brand identity and which homepage sections appear, in what order.
          Saving updates the live config for <code className="text-subtle">{clientId}</code>.
        </p>
      </div>

      <ClientSettingsForm
        clientId={clientId}
        edited={edited}
        brand={config.brand}
        sections={config.pages.home.sections}
      />
    </div>
  );
}
