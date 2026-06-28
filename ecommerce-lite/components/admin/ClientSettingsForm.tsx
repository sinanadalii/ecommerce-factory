"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, Check, RotateCcw, Save } from "lucide-react";
import type { BrandConfig, SectionKey, SectionSlot } from "@/config/types";
import { saveClientSettings, resetClientConfig } from "@/app/admin/actions";
import {
  AdminButton,
  ColorField,
  Field,
  IconAction,
  Panel,
  Toggle,
} from "@/components/admin/AdminUI";

const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Hero",
  categories: "Categories",
  featured: "Featured products",
  flashSale: "Flash sale",
  bestSellers: "Best sellers",
  trust: "Trust badges",
  testimonials: "Testimonials",
  newsletter: "Newsletter",
};

type Props = {
  clientId: string;
  edited: boolean;
  brand: BrandConfig;
  sections: SectionSlot[];
};

export function ClientSettingsForm({ clientId, edited, brand, sections }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(brand.name);
  const [logo, setLogo] = useState(brand.logo ?? "");
  const [accent, setAccent] = useState(brand.theme?.accent ?? "");
  const [background, setBackground] = useState(brand.theme?.background ?? "");
  const [surface, setSurface] = useState(brand.theme?.surface ?? "");
  const [foreground, setForeground] = useState(brand.theme?.foreground ?? "");
  const [slots, setSlots] = useState<SectionSlot[]>(sections);

  function move(index: number, dir: -1 | 1) {
    const next = [...slots];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSlots(next);
  }

  function toggle(index: number, value: boolean) {
    setSlots((cur) => cur.map((s, i) => (i === index ? { ...s, enabled: value } : s)));
  }

  function save() {
    setSaved(false);
    startTransition(async () => {
      await saveClientSettings(clientId, {
        name,
        logo,
        theme: { accent, background, surface, foreground },
        sections: slots,
      });
      setSaved(true);
      router.refresh();
    });
  }

  function reset() {
    startTransition(async () => {
      await resetClientConfig(clientId);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Brand identity */}
        <Panel title="Brand identity" description="Name, logo and accent colours.">
          <div className="space-y-4">
            <Field label="Brand name" value={name} onChange={setName} placeholder="Store name" />
            <Field
              label="Logo image URL"
              value={logo}
              onChange={setLogo}
              placeholder="https://… (optional)"
            />

            {/* Preview */}
            <div
              className="flex items-center gap-3 rounded-lg border border-border p-4"
              style={{ backgroundColor: background || undefined }}
            >
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="" className="h-7 w-auto object-contain" />
              ) : null}
              <span
                className="font-serif text-xl tracking-[0.18em]"
                style={{ color: accent || foreground || undefined }}
              >
                {name || "Brand"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <ColorField label="Accent" value={accent} onChange={setAccent} />
              <ColorField label="Background" value={background} onChange={setBackground} />
              <ColorField label="Surface" value={surface} onChange={setSurface} />
              <ColorField label="Foreground" value={foreground} onChange={setForeground} />
            </div>
            <p className="text-[0.6875rem] leading-relaxed text-subtle">
              Leave colours blank to use the shared theme. Set values to override the
              storefront tokens for this store only — the design system stays untouched.
            </p>
          </div>
        </Panel>

        {/* Section order */}
        <Panel
          title="Homepage sections"
          description="Drag order with the arrows; toggle to show/hide. Order and visibility apply instantly."
        >
          <ul className="space-y-2">
            {slots.map((slot, i) => (
              <li
                key={slot.key}
                className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2.5"
              >
                <span className="w-5 text-center text-xs tabular-nums text-subtle">{i + 1}</span>
                <span className="flex-1 text-sm text-foreground">
                  {SECTION_LABELS[slot.key]}
                </span>
                <div className="flex items-center gap-1">
                  <IconAction label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>
                    <ArrowUp className="size-4" strokeWidth={1.75} />
                  </IconAction>
                  <IconAction
                    label="Move down"
                    onClick={() => move(i, 1)}
                    disabled={i === slots.length - 1}
                  >
                    <ArrowDown className="size-4" strokeWidth={1.75} />
                  </IconAction>
                </div>
                <Toggle
                  checked={slot.enabled}
                  onChange={(v) => toggle(i, v)}
                  label={`Toggle ${SECTION_LABELS[slot.key]}`}
                />
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-card border border-border bg-surface/90 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-xs text-muted">
          {saved && !pending ? (
            <span className="inline-flex items-center gap-1.5 text-gold">
              <Check className="size-4" strokeWidth={2} /> Saved — storefront updated
            </span>
          ) : (
            <span>{edited ? "This store has unsaved edits over its seed." : "Editing the seed config."}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant="danger" onClick={reset} disabled={pending} title="Revert to seed">
            <RotateCcw className="size-3.5" strokeWidth={1.75} /> Reset to seed
          </AdminButton>
          <AdminButton onClick={save} disabled={pending}>
            <Save className="size-3.5" strokeWidth={1.75} /> {pending ? "Saving…" : "Save changes"}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
