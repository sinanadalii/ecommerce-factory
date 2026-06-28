import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { clients, type ClientKey } from "@/config/active-client";
import { getAllEffectiveClients } from "@/config/client-store";
import { AssistantForm } from "@/components/admin/AssistantForm";

export const metadata = { title: "AI assistant" };

const ORDER = Object.keys(clients) as ClientKey[];

export default async function AssistantPage() {
  const all = await getAllEffectiveClients();
  const stores = ORDER.map((id) => ({
    id,
    name: all[id].brand.name,
    tagline: all[id].brand.tagline,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-3.5" strokeWidth={1.75} /> Dashboard
        </Link>
        <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold">
          Phase 2
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">AI site assistant</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Apply a described brand direction to a demo or production tenant. With
          OpenAI variables configured it uses the API; otherwise it applies the
          built-in Phase 2 style rules.
        </p>
      </div>

      <AssistantForm stores={stores} />
    </div>
  );
}
