"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ExternalLink, WandSparkles } from "lucide-react";
import { applyAssistantEdit } from "@/app/admin/actions";
import { AdminButton, Panel, SelectField, TextAreaField } from "@/components/admin/AdminUI";

type StoreOption = {
  id: string;
  name: string;
  tagline: string;
};

type Props = {
  stores: StoreOption[];
};

export function AssistantForm({ stores }: Props) {
  const router = useRouter();
  const [clientId, setClientId] = useState(stores[0]?.id ?? "");
  const [prompt, setPrompt] = useState(
    "Make this demo feel more premium, support Persian font choices, and tune the hero for a softer launch.",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const selected = stores.find((store) => store.id === clientId);

  function applyEdit() {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const result = await applyAssistantEdit(clientId, prompt);
        setMessage(`${result.usedOpenAI ? "OpenAI" : "Local assistant"}: ${result.summary}`);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Assistant edit failed.");
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <Panel
        title="AI assistant"
        description="Describe the direction; the assistant applies a config edit to the selected store."
      >
        <div className="space-y-4">
          <SelectField
            label="Store"
            value={clientId}
            onChange={setClientId}
            options={stores.map((store) => ({
              label: `${store.name} (${store.id})`,
              value: store.id,
            }))}
          />

          <TextAreaField
            label="Instruction"
            value={prompt}
            onChange={setPrompt}
            rows={7}
          />

          <div className="flex flex-wrap items-center gap-3">
            <AdminButton onClick={applyEdit} disabled={pending || prompt.trim().length < 3}>
              <WandSparkles className="size-3.5" strokeWidth={1.75} />
              {pending ? "Applying..." : "Apply edit"}
            </AdminButton>
            {clientId ? (
              <Link
                href={`/admin/editor/${clientId}`}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border px-4 text-xs font-semibold text-foreground transition-colors hover:border-gold/50 hover:text-gold"
              >
                Open editor
                <ExternalLink className="size-3.5" strokeWidth={1.75} />
              </Link>
            ) : null}
          </div>

          {message ? (
            <p className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold-dim px-3 py-2 text-xs text-gold">
              <Check className="size-4" strokeWidth={2} />
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="rounded-lg border border-sale/40 bg-sale/10 px-3 py-2 text-xs text-sale">
              {error}
            </p>
          ) : null}
        </div>
      </Panel>

      <Panel title="Selected store" description="The edit is saved into this tenant override.">
        {selected ? (
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-background/40 p-4">
              <p className="text-[0.625rem] uppercase tracking-[0.14em] text-subtle">
                {selected.id}
              </p>
              <h2 className="mt-2 font-serif text-2xl text-foreground">{selected.name}</h2>
              <p className="mt-1 text-sm text-muted">{selected.tagline}</p>
            </div>
            <div className="space-y-2 text-xs leading-relaxed text-muted">
              <p>Examples: tech / sharper / cyan accent / Diodrum headings.</p>
              <p>Examples: beauty / soft blush / Shabnam body font / calmer hero.</p>
              <p>Examples: lifestyle / warmer tones / rounded cards / softer copy.</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">Choose a store first.</p>
        )}
      </Panel>
    </div>
  );
}
