"use client";

import { type Dispatch, type SetStateAction, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, Save, Trash2 } from "lucide-react";
import type { Category, HeroProps, Product, Testimonial } from "@/config/types";
import { saveContent } from "@/app/admin/actions";
import {
  AdminButton,
  Field,
  IconAction,
  Panel,
  TextAreaField,
} from "@/components/admin/AdminUI";

type Props = {
  clientId: string;
  hero: HeroProps;
  categories: Category[];
  products: Product[];
  flashSaleProducts: Product[];
  bestSellerProducts: Product[];
  testimonials: Testimonial[];
  footer: { blurb: string; locale: string };
};

/** Browser-stable unique-ish id for newly added items. */
function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function picsum(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function ContentEditorForm({
  clientId,
  hero,
  categories,
  products,
  flashSaleProducts,
  bestSellerProducts,
  testimonials,
  footer,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  // Hero (flat)
  const [eyebrow, setEyebrow] = useState(hero.eyebrow);
  const [line1, setLine1] = useState(hero.title.line1);
  const [line2, setLine2] = useState(hero.title.line2);
  const [heroDesc, setHeroDesc] = useState(hero.description);
  const [primaryLabel, setPrimaryLabel] = useState(hero.primaryCta.label);
  const [primaryHref, setPrimaryHref] = useState(hero.primaryCta.href);
  const [secondaryLabel, setSecondaryLabel] = useState(hero.secondaryCta.label);
  const [secondaryHref, setSecondaryHref] = useState(hero.secondaryCta.href);
  const [heroProductImage, setHeroProductImage] = useState(hero.product.image);

  // Lists (hold full objects, edit a subset, preserve the rest)
  const [cats, setCats] = useState<Category[]>(categories);
  const [prods, setProds] = useState<Product[]>(products);
  const [flashProds, setFlashProds] = useState<Product[]>(flashSaleProducts);
  const [bestProds, setBestProds] = useState<Product[]>(bestSellerProducts);
  const [quotes, setQuotes] = useState<Testimonial[]>(testimonials);

  // Footer
  const [blurb, setBlurb] = useState(footer.blurb);
  const [locale, setLocale] = useState(footer.locale);

  function save() {
    setSaved(false);
    startTransition(async () => {
      await saveContent(clientId, {
        hero: {
          eyebrow,
          titleLine1: line1,
          titleLine2: line2,
          description: heroDesc,
          primaryLabel,
          primaryHref,
          secondaryLabel,
          secondaryHref,
          productImage: heroProductImage,
        },
        categories: cats,
        products: prods,
        flashSaleProducts: flashProds,
        bestSellerProducts: bestProds,
        testimonials: quotes,
        footer: { blurb, locale },
      });
      setSaved(true);
      router.refresh();
    });
  }

  function renderProductPanel(
    title: string,
    description: string,
    items: Product[],
    setItems: Dispatch<SetStateAction<Product[]>>,
  ) {
    return (
      <Panel
        title={title}
        description={description}
        actions={
          <AdminButton
            variant="ghost"
            onClick={() =>
              setItems((p) => [
                ...p,
                {
                  id: newId("p"),
                  slug: "new-product",
                  name: "New product",
                  category: "Uncategorised",
                  price: 0,
                  rating: 4.5,
                  reviewCount: 0,
                  image: picsum(newId("p-img"), 800, 1000),
                },
              ])
            }
          >
            <Plus className="size-3.5" strokeWidth={2} /> Add
          </AdminButton>
        }
      >
        <ul className="space-y-3">
          {items.map((p, i) => (
            <li key={p.id} className="rounded-lg border border-border bg-background/40 p-3">
              <div className="grid gap-3 lg:grid-cols-[1fr_0.8fr_0.35fr_auto] lg:items-end">
                <Field
                  label={`Product ${i + 1}`}
                  value={p.name}
                  onChange={(v) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, name: v } : x)))}
                />
                <Field
                  label="Category"
                  value={p.category}
                  onChange={(v) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, category: v } : x)))}
                />
                <Field
                  label="Price"
                  type="number"
                  value={String(p.price)}
                  onChange={(v) =>
                    setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, price: Number(v) || 0 } : x)))
                  }
                />
                <IconAction label="Remove product" onClick={() => setItems((cur) => cur.filter((_, idx) => idx !== i))}>
                  <Trash2 className="size-4" strokeWidth={1.75} />
                </IconAction>
              </div>
              <div className="mt-3">
                <Field
                  label="Product image URL"
                  value={p.image}
                  onChange={(v) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, image: v } : x)))}
                />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <Panel title="Hero" description="The headline section at the top of the homepage.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Eyebrow" value={eyebrow} onChange={setEyebrow} />
          <div className="hidden sm:block" />
          <Field label="Title line 1" value={line1} onChange={setLine1} />
          <Field label="Title line 2 (accent)" value={line2} onChange={setLine2} />
          <div className="sm:col-span-2">
            <TextAreaField label="Description" value={heroDesc} onChange={setHeroDesc} />
          </div>
          <Field label="Primary button label" value={primaryLabel} onChange={setPrimaryLabel} />
          <Field label="Primary button link" value={primaryHref} onChange={setPrimaryHref} />
          <Field label="Secondary button label" value={secondaryLabel} onChange={setSecondaryLabel} />
          <Field label="Secondary button link" value={secondaryHref} onChange={setSecondaryHref} />
          <div className="sm:col-span-2">
            <Field
              label="Hero product image URL"
              value={heroProductImage}
              onChange={setHeroProductImage}
            />
          </div>
        </div>
      </Panel>

      {/* Categories */}
      <Panel
        title="Categories"
        description="Tiles in the category grid."
        actions={
          <AdminButton
            variant="ghost"
            onClick={() =>
              setCats((c) => [
                ...c,
                {
                  id: newId("cat"),
                  name: "New category",
                  slug: "new-category",
                  image: picsum(newId("cat-img"), 900, 1100),
                  itemCount: 0,
                },
              ])
            }
          >
            <Plus className="size-3.5" strokeWidth={2} /> Add
          </AdminButton>
        }
      >
        <ul className="space-y-3">
          {cats.map((c, i) => (
            <li key={c.id} className="flex items-end gap-3 rounded-lg border border-border bg-background/40 p-3">
              <div className="flex-1">
                <Field
                  label={`Category ${i + 1}`}
                  value={c.name}
                  onChange={(v) => setCats((cur) => cur.map((x, idx) => (idx === i ? { ...x, name: v } : x)))}
                />
              </div>
              <div className="w-28">
                <Field
                  label="Items"
                  type="number"
                  value={String(c.itemCount)}
                  onChange={(v) =>
                    setCats((cur) => cur.map((x, idx) => (idx === i ? { ...x, itemCount: Number(v) || 0 } : x)))
                  }
                />
              </div>
              <div className="flex-1">
                <Field
                  label="Image URL"
                  value={c.image}
                  onChange={(v) => setCats((cur) => cur.map((x, idx) => (idx === i ? { ...x, image: v } : x)))}
                />
              </div>
              <IconAction label="Remove category" onClick={() => setCats((cur) => cur.filter((_, idx) => idx !== i))}>
                <Trash2 className="size-4" strokeWidth={1.75} />
              </IconAction>
            </li>
          ))}
        </ul>
      </Panel>

      {renderProductPanel("Featured products", "The products shown in the Featured strip.", prods, setProds)}
      {renderProductPanel("Flash sale products", "Products shown in the sale/countdown section.", flashProds, setFlashProds)}
      {renderProductPanel("Best sellers", "Products shown in the bestseller grid.", bestProds, setBestProds)}

      {/* Testimonials */}
      <Panel
        title="Testimonials"
        description="Customer quotes in the carousel."
        actions={
          <AdminButton
            variant="ghost"
            onClick={() =>
              setQuotes((q) => [
                ...q,
                {
                  id: newId("t"),
                  quote: "A wonderful experience.",
                  author: "New Customer",
                  role: "Role",
                  location: "City",
                  rating: 5,
                  avatar: picsum(newId("t-img"), 160, 160),
                },
              ])
            }
          >
            <Plus className="size-3.5" strokeWidth={2} /> Add
          </AdminButton>
        }
      >
        <ul className="space-y-4">
          {quotes.map((t, i) => (
            <li key={t.id} className="rounded-lg border border-border bg-background/40 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-subtle">Testimonial {i + 1}</span>
                <IconAction label="Remove testimonial" onClick={() => setQuotes((cur) => cur.filter((_, idx) => idx !== i))}>
                  <Trash2 className="size-4" strokeWidth={1.75} />
                </IconAction>
              </div>
              <div className="space-y-3">
                <TextAreaField
                  label="Quote"
                  rows={2}
                  value={t.quote}
                  onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, quote: v } : x)))}
                />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field
                    label="Author"
                    value={t.author}
                    onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, author: v } : x)))}
                  />
                  <Field
                    label="Role"
                    value={t.role}
                    onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, role: v } : x)))}
                  />
                  <Field
                    label="Location"
                    value={t.location}
                    onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, location: v } : x)))}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Footer */}
      <Panel title="Footer" description="Footer blurb and locale line.">
        <div className="space-y-4">
          <TextAreaField label="Blurb" value={blurb} onChange={setBlurb} />
          <Field label="Locale line" value={locale} onChange={setLocale} />
        </div>
      </Panel>

      {/* Save bar */}
      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-card border border-border bg-surface/90 p-4 backdrop-blur-xl">
        <div className="text-xs text-muted">
          {saved && !pending ? (
            <span className="inline-flex items-center gap-1.5 text-gold">
              <Check className="size-4" strokeWidth={2} /> Saved — storefront updated
            </span>
          ) : (
            <span>Editing content for {clientId}.</span>
          )}
        </div>
        <AdminButton onClick={save} disabled={pending}>
          <Save className="size-3.5" strokeWidth={1.75} /> {pending ? "Saving…" : "Save content"}
        </AdminButton>
      </div>
    </div>
  );
}
