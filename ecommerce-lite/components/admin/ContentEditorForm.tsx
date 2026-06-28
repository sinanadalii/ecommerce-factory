"use client";

import { type Dispatch, type SetStateAction, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, Save, Trash2 } from "lucide-react";
import type {
  Category,
  FlashSaleProps,
  HeroProps,
  NewsletterProps,
  Product,
  SectionHeadingContent,
  Testimonial,
  TextAlign,
  TextScale,
  TrustBadgeItem,
  TrustIconKey,
} from "@/config/types";
import { saveContent } from "@/app/admin/actions";
import {
  AdminButton,
  Field,
  ImageField,
  IconAction,
  Panel,
  SelectField,
  TextAreaField,
  Toggle,
} from "@/components/admin/AdminUI";

type Props = {
  clientId: string;
  hero: HeroProps;
  categoryHeading: SectionHeadingContent;
  featuredHeading: SectionHeadingContent;
  flashSale: FlashSaleProps;
  bestSellerHeading: SectionHeadingContent;
  testimonialHeading: SectionHeadingContent;
  categories: Category[];
  products: Product[];
  flashSaleProducts: Product[];
  bestSellerProducts: Product[];
  trust: { badges: TrustBadgeItem[]; brandLogos: string[] };
  testimonials: Testimonial[];
  newsletter: NewsletterProps;
  footer: { blurb: string; locale: string };
};

const ALIGN_OPTIONS = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
];

const SIZE_OPTIONS = [
  { label: "Compact", value: "compact" },
  { label: "Default", value: "default" },
  { label: "Large", value: "large" },
];

const HERO_POSITION_OPTIONS = [
  { label: "Text left", value: "left" },
  { label: "Text center", value: "center" },
  { label: "Text right", value: "right" },
];

const TRUST_ICON_OPTIONS = [
  { label: "Truck", value: "truck" },
  { label: "Shield", value: "shield" },
  { label: "Refresh", value: "refresh" },
  { label: "Headset", value: "headset" },
];

function newId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function picsum(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background/40 px-3 py-2.5">
      <span className="text-sm text-foreground">{label}</span>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export function ContentEditorForm({
  clientId,
  hero,
  categoryHeading,
  featuredHeading,
  flashSale,
  bestSellerHeading,
  testimonialHeading,
  categories,
  products,
  flashSaleProducts,
  bestSellerProducts,
  trust,
  testimonials,
  newsletter,
  footer,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const [eyebrow, setEyebrow] = useState(hero.eyebrow);
  const [line1, setLine1] = useState(hero.title.line1);
  const [line2, setLine2] = useState(hero.title.line2);
  const [heroDesc, setHeroDesc] = useState(hero.description);
  const [primaryLabel, setPrimaryLabel] = useState(hero.primaryCta.label);
  const [primaryHref, setPrimaryHref] = useState(hero.primaryCta.href);
  const [secondaryLabel, setSecondaryLabel] = useState(hero.secondaryCta.label);
  const [secondaryHref, setSecondaryHref] = useState(hero.secondaryCta.href);
  const [heroProductImage, setHeroProductImage] = useState(hero.product.image);
  const [ratingValue, setRatingValue] = useState(hero.ratingValue);
  const [ratingSuffix, setRatingSuffix] = useState(hero.ratingSuffix);
  const [trustNote, setTrustNote] = useState(hero.trustNote);
  const [featuredBadge, setFeaturedBadge] = useState(hero.featuredBadge);
  const [heroSettings, setHeroSettings] = useState<NonNullable<HeroProps["settings"]>>(hero.settings ?? {});

  const [catHeading, setCatHeading] = useState<SectionHeadingContent>(categoryHeading);
  const [featHeading, setFeatHeading] = useState<SectionHeadingContent>(featuredHeading);
  const [bestHeading, setBestHeading] = useState<SectionHeadingContent>(bestSellerHeading);
  const [quoteHeading, setQuoteHeading] = useState<SectionHeadingContent>(testimonialHeading);
  const [flash, setFlash] = useState<FlashSaleProps>(flashSale);
  const [newsletterState, setNewsletterState] = useState<NewsletterProps>(newsletter);

  const [cats, setCats] = useState<Category[]>(categories);
  const [prods, setProds] = useState<Product[]>(products);
  const [flashProds, setFlashProds] = useState<Product[]>(flashSaleProducts);
  const [bestProds, setBestProds] = useState<Product[]>(bestSellerProducts);
  const [trustBadges, setTrustBadges] = useState<TrustBadgeItem[]>(trust.badges);
  const [brandLogos, setBrandLogos] = useState<string[]>(trust.brandLogos);
  const [quotes, setQuotes] = useState<Testimonial[]>(testimonials);

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
          ratingValue,
          ratingSuffix,
          trustNote,
          featuredBadge,
          settings: heroSettings,
        },
        categoryHeading: catHeading,
        featuredHeading: featHeading,
        bestSellerHeading: bestHeading,
        testimonialHeading: quoteHeading,
        flashSale: {
          badge: flash.badge,
          title: flash.title,
          subtitle: flash.subtitle,
          durationMs: Number(flash.durationMs) || 0,
          settings: flash.settings,
        },
        trust: { badges: trustBadges, brandLogos },
        newsletter: newsletterState,
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

  function updateHeading(
    setter: Dispatch<SetStateAction<SectionHeadingContent>>,
    patch: Partial<SectionHeadingContent>,
  ) {
    setter((current) => ({ ...current, ...patch }));
  }

  function renderHeadingPanel(
    title: string,
    description: string,
    value: SectionHeadingContent,
    setter: Dispatch<SetStateAction<SectionHeadingContent>>,
  ) {
    return (
      <Panel title={title} description={description}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Eyebrow" value={value.eyebrow ?? ""} onChange={(v) => updateHeading(setter, { eyebrow: v })} />
          <Field label="Title" value={value.title} onChange={(v) => updateHeading(setter, { title: v })} />
          <div className="sm:col-span-2">
            <TextAreaField
              label="Description"
              value={value.description ?? ""}
              onChange={(v) => updateHeading(setter, { description: v })}
            />
          </div>
          <SelectField
            label="Text align"
            value={value.align ?? "left"}
            onChange={(v) => updateHeading(setter, { align: v as TextAlign })}
            options={ALIGN_OPTIONS}
          />
          <SelectField
            label="Title size"
            value={value.titleSize ?? "default"}
            onChange={(v) => updateHeading(setter, { titleSize: v as TextScale })}
            options={SIZE_OPTIONS}
          />
          <SelectField
            label="Description size"
            value={value.descriptionSize ?? "default"}
            onChange={(v) => updateHeading(setter, { descriptionSize: v as TextScale })}
            options={SIZE_OPTIONS}
          />
          <ToggleRow
            label="Show action link"
            checked={value.showAction ?? true}
            onChange={(checked) => updateHeading(setter, { showAction: checked })}
          />
          <Field
            label="Action label"
            value={value.action?.label ?? ""}
            onChange={(label) => updateHeading(setter, { action: { label, href: value.action?.href ?? "#" } })}
          />
          <Field
            label="Action link"
            value={value.action?.href ?? ""}
            onChange={(href) => updateHeading(setter, { action: { label: value.action?.label ?? "View all", href } })}
          />
        </div>
      </Panel>
    );
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
              <div className="mb-3 flex items-center justify-between gap-3">
                <ToggleRow
                  label={p.hidden ? "Hidden on storefront" : "Visible on storefront"}
                  checked={!p.hidden}
                  onChange={(visible) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, hidden: !visible } : x)))}
                />
                <IconAction label="Remove product" onClick={() => setItems((cur) => cur.filter((_, idx) => idx !== i))}>
                  <Trash2 className="size-4" strokeWidth={1.75} />
                </IconAction>
              </div>
              <div className="grid gap-3 lg:grid-cols-[1fr_0.8fr_0.35fr] lg:items-end">
                <Field label={`Product ${i + 1}`} value={p.name} onChange={(v) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, name: v } : x)))} />
                <Field label="Category" value={p.category} onChange={(v) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, category: v } : x)))} />
                <Field label="Price" type="number" value={String(p.price)} onChange={(v) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, price: Number(v) || 0 } : x)))} />
              </div>
              <div className="mt-3">
                <ImageField label="Product image URL" value={p.image} onChange={(v) => setItems((cur) => cur.map((x, idx) => (idx === i ? { ...x, image: v } : x)))} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  return (
    <div className="space-y-6">
      <Panel title="Hero" description="Hero copy, CTAs, visual image and text placement.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Eyebrow" value={eyebrow} onChange={setEyebrow} />
          <Field label="Featured badge" value={featuredBadge} onChange={setFeaturedBadge} />
          <Field label="Title line 1" value={line1} onChange={setLine1} />
          <Field label="Title line 2 (accent)" value={line2} onChange={setLine2} />
          <div className="sm:col-span-2">
            <TextAreaField label="Description" value={heroDesc} onChange={setHeroDesc} />
          </div>
          <Field label="Primary button label" value={primaryLabel} onChange={setPrimaryLabel} />
          <Field label="Primary button link" value={primaryHref} onChange={setPrimaryHref} />
          <Field label="Secondary button label" value={secondaryLabel} onChange={setSecondaryLabel} />
          <Field label="Secondary button link" value={secondaryHref} onChange={setSecondaryHref} />
          <Field label="Rating value" value={ratingValue} onChange={setRatingValue} />
          <Field label="Rating suffix" value={ratingSuffix} onChange={setRatingSuffix} />
          <div className="sm:col-span-2">
            <Field label="Trust note" value={trustNote} onChange={setTrustNote} />
          </div>
          <div className="sm:col-span-2">
            <ImageField label="Hero product image URL" value={heroProductImage} onChange={setHeroProductImage} />
          </div>
        </div>
      </Panel>

      <Panel title="Hero text settings" description="Move the hero text, resize text and hide/show hero details.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SelectField label="Text position" value={heroSettings.textPosition ?? "left"} onChange={(v) => setHeroSettings((s) => ({ ...s, textPosition: v as "left" | "center" | "right" }))} options={HERO_POSITION_OPTIONS} />
          <SelectField label="Text align" value={heroSettings.textAlign ?? "left"} onChange={(v) => setHeroSettings((s) => ({ ...s, textAlign: v as TextAlign }))} options={ALIGN_OPTIONS} />
          <SelectField label="Title size" value={heroSettings.titleSize ?? "default"} onChange={(v) => setHeroSettings((s) => ({ ...s, titleSize: v as TextScale }))} options={SIZE_OPTIONS} />
          <SelectField label="Description size" value={heroSettings.descriptionSize ?? "default"} onChange={(v) => setHeroSettings((s) => ({ ...s, descriptionSize: v as TextScale }))} options={SIZE_OPTIONS} />
          <ToggleRow label="Show primary CTA" checked={heroSettings.showPrimaryCta ?? true} onChange={(v) => setHeroSettings((s) => ({ ...s, showPrimaryCta: v }))} />
          <ToggleRow label="Show secondary CTA" checked={heroSettings.showSecondaryCta ?? true} onChange={(v) => setHeroSettings((s) => ({ ...s, showSecondaryCta: v }))} />
          <ToggleRow label="Show trust row" checked={heroSettings.showTrustRow ?? true} onChange={(v) => setHeroSettings((s) => ({ ...s, showTrustRow: v }))} />
          <ToggleRow label="Show product chip" checked={heroSettings.showProductChip ?? true} onChange={(v) => setHeroSettings((s) => ({ ...s, showProductChip: v }))} />
          <ToggleRow label="Show featured badge" checked={heroSettings.showFeaturedBadge ?? true} onChange={(v) => setHeroSettings((s) => ({ ...s, showFeaturedBadge: v }))} />
        </div>
      </Panel>

      {renderHeadingPanel("Category heading", "Text above the category grid.", catHeading, setCatHeading)}
      <Panel title="Categories" description="Tiles in the category grid. Toggle visibility or remove any tile.">
        <div className="mb-5 flex justify-end">
          <AdminButton
            variant="ghost"
            onClick={() => setCats((c) => [...c, { id: newId("cat"), name: "New category", slug: "new-category", image: picsum(newId("cat-img"), 900, 1100), itemCount: 0 }])}
          >
            <Plus className="size-3.5" strokeWidth={2} /> Add
          </AdminButton>
        </div>
        <ul className="space-y-3">
          {cats.map((c, i) => (
            <li key={c.id} className="rounded-lg border border-border bg-background/40 p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <ToggleRow label={c.hidden ? "Hidden on storefront" : "Visible on storefront"} checked={!c.hidden} onChange={(visible) => setCats((cur) => cur.map((x, idx) => (idx === i ? { ...x, hidden: !visible } : x)))} />
                <IconAction label="Remove category" onClick={() => setCats((cur) => cur.filter((_, idx) => idx !== i))}>
                  <Trash2 className="size-4" strokeWidth={1.75} />
                </IconAction>
              </div>
              <div className="grid gap-3 lg:grid-cols-[1fr_0.3fr_1fr] lg:items-end">
                <Field label={`Category ${i + 1}`} value={c.name} onChange={(v) => setCats((cur) => cur.map((x, idx) => (idx === i ? { ...x, name: v } : x)))} />
                <Field label="Items" type="number" value={String(c.itemCount)} onChange={(v) => setCats((cur) => cur.map((x, idx) => (idx === i ? { ...x, itemCount: Number(v) || 0 } : x)))} />
                <ImageField label="Image URL" value={c.image} onChange={(v) => setCats((cur) => cur.map((x, idx) => (idx === i ? { ...x, image: v } : x)))} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      {renderHeadingPanel("Featured heading", "Text above featured products.", featHeading, setFeatHeading)}
      {renderProductPanel("Featured products", "Products shown in the Featured strip.", prods, setProds)}

      <Panel title="Flash sale copy and layout" description="Countdown section text, timer visibility and product visibility.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Badge" value={flash.badge} onChange={(v) => setFlash((f) => ({ ...f, badge: v }))} />
          <Field label="Duration ms" type="number" value={String(flash.durationMs)} onChange={(v) => setFlash((f) => ({ ...f, durationMs: Number(v) || 0 }))} />
          <Field label="Title" value={flash.title} onChange={(v) => setFlash((f) => ({ ...f, title: v }))} />
          <SelectField label="Text align" value={flash.settings?.textAlign ?? "left"} onChange={(v) => setFlash((f) => ({ ...f, settings: { ...f.settings, textAlign: v as TextAlign } }))} options={ALIGN_OPTIONS} />
          <SelectField label="Title size" value={flash.settings?.titleSize ?? "default"} onChange={(v) => setFlash((f) => ({ ...f, settings: { ...f.settings, titleSize: v as TextScale } }))} options={SIZE_OPTIONS} />
          <ToggleRow label="Show countdown" checked={flash.settings?.showCountdown ?? true} onChange={(v) => setFlash((f) => ({ ...f, settings: { ...f.settings, showCountdown: v } }))} />
          <ToggleRow label="Show flash products" checked={flash.settings?.showProducts ?? true} onChange={(v) => setFlash((f) => ({ ...f, settings: { ...f.settings, showProducts: v } }))} />
          <div className="sm:col-span-2">
            <TextAreaField label="Subtitle" value={flash.subtitle} onChange={(v) => setFlash((f) => ({ ...f, subtitle: v }))} />
          </div>
        </div>
      </Panel>
      {renderProductPanel("Flash sale products", "Products shown in the sale/countdown section.", flashProds, setFlashProds)}

      {renderHeadingPanel("Best sellers heading", "Text above the bestseller grid.", bestHeading, setBestHeading)}
      {renderProductPanel("Best sellers", "Products shown in the bestseller grid.", bestProds, setBestProds)}

      <Panel title="Trust badges and logos" description="Edit, hide or remove trust badges and press/logo marquee items.">
        <div className="mb-5 flex justify-end">
          <AdminButton variant="ghost" onClick={() => setTrustBadges((b) => [...b, { icon: "shield", title: "New badge", subtitle: "Short benefit" }])}>
            <Plus className="size-3.5" strokeWidth={2} /> Add badge
          </AdminButton>
        </div>
        <ul className="space-y-3">
          {trustBadges.map((badge, i) => (
            <li key={`${badge.title}-${i}`} className="rounded-lg border border-border bg-background/40 p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <ToggleRow label={badge.hidden ? "Hidden on storefront" : "Visible on storefront"} checked={!badge.hidden} onChange={(visible) => setTrustBadges((cur) => cur.map((x, idx) => (idx === i ? { ...x, hidden: !visible } : x)))} />
                <IconAction label="Remove trust badge" onClick={() => setTrustBadges((cur) => cur.filter((_, idx) => idx !== i))}>
                  <Trash2 className="size-4" strokeWidth={1.75} />
                </IconAction>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <SelectField label="Icon" value={badge.icon} onChange={(v) => setTrustBadges((cur) => cur.map((x, idx) => (idx === i ? { ...x, icon: v as TrustIconKey } : x)))} options={TRUST_ICON_OPTIONS} />
                <Field label="Title" value={badge.title} onChange={(v) => setTrustBadges((cur) => cur.map((x, idx) => (idx === i ? { ...x, title: v } : x)))} />
                <Field label="Subtitle" value={badge.subtitle} onChange={(v) => setTrustBadges((cur) => cur.map((x, idx) => (idx === i ? { ...x, subtitle: v } : x)))} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {brandLogos.map((logo, i) => (
            <div key={`${logo}-${i}`} className="flex items-end gap-2">
              <div className="flex-1">
                <Field label={`Logo ${i + 1}`} value={logo} onChange={(v) => setBrandLogos((cur) => cur.map((x, idx) => (idx === i ? v : x)))} />
              </div>
              <IconAction label="Remove logo" onClick={() => setBrandLogos((cur) => cur.filter((_, idx) => idx !== i))}>
                <Trash2 className="size-4" strokeWidth={1.75} />
              </IconAction>
            </div>
          ))}
          <AdminButton variant="ghost" onClick={() => setBrandLogos((cur) => [...cur, "NEW LOGO"])}>
            <Plus className="size-3.5" strokeWidth={2} /> Add logo
          </AdminButton>
        </div>
      </Panel>

      {renderHeadingPanel("Testimonials heading", "Text above the testimonial carousel.", quoteHeading, setQuoteHeading)}
      <Panel title="Testimonials" description="Customer quotes in the carousel. Toggle visibility or remove any quote.">
        <div className="mb-5 flex justify-end">
          <AdminButton variant="ghost" onClick={() => setQuotes((q) => [...q, { id: newId("t"), quote: "A wonderful experience.", author: "New Customer", role: "Role", location: "City", rating: 5, avatar: picsum(newId("t-img"), 160, 160) }])}>
            <Plus className="size-3.5" strokeWidth={2} /> Add
          </AdminButton>
        </div>
        <ul className="space-y-4">
          {quotes.map((t, i) => (
            <li key={t.id} className="rounded-lg border border-border bg-background/40 p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <ToggleRow label={t.hidden ? "Hidden on storefront" : "Visible on storefront"} checked={!t.hidden} onChange={(visible) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, hidden: !visible } : x)))} />
                <IconAction label="Remove testimonial" onClick={() => setQuotes((cur) => cur.filter((_, idx) => idx !== i))}>
                  <Trash2 className="size-4" strokeWidth={1.75} />
                </IconAction>
              </div>
              <div className="space-y-3">
                <TextAreaField label="Quote" rows={2} value={t.quote} onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, quote: v } : x)))} />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field label="Author" value={t.author} onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, author: v } : x)))} />
                  <Field label="Role" value={t.role} onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, role: v } : x)))} />
                  <Field label="Location" value={t.location} onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, location: v } : x)))} />
                </div>
                <ImageField label="Avatar URL" value={t.avatar} onChange={(v) => setQuotes((cur) => cur.map((x, idx) => (idx === i ? { ...x, avatar: v } : x)))} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Newsletter" description="Newsletter copy, form text and layout controls.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title" value={newsletterState.title} onChange={(v) => setNewsletterState((n) => ({ ...n, title: v }))} />
          <SelectField label="Text align" value={newsletterState.settings?.textAlign ?? "center"} onChange={(v) => setNewsletterState((n) => ({ ...n, settings: { ...n.settings, textAlign: v as TextAlign } }))} options={ALIGN_OPTIONS} />
          <SelectField label="Title size" value={newsletterState.settings?.titleSize ?? "default"} onChange={(v) => setNewsletterState((n) => ({ ...n, settings: { ...n.settings, titleSize: v as TextScale } }))} options={SIZE_OPTIONS} />
          <Field label="Input placeholder" value={newsletterState.placeholder} onChange={(v) => setNewsletterState((n) => ({ ...n, placeholder: v }))} />
          <Field label="Submit label" value={newsletterState.submitLabel} onChange={(v) => setNewsletterState((n) => ({ ...n, submitLabel: v }))} />
          <Field label="Success message" value={newsletterState.successMessage} onChange={(v) => setNewsletterState((n) => ({ ...n, successMessage: v }))} />
          <ToggleRow label="Show icon" checked={newsletterState.settings?.showIcon ?? true} onChange={(v) => setNewsletterState((n) => ({ ...n, settings: { ...n.settings, showIcon: v } }))} />
          <ToggleRow label="Show form" checked={newsletterState.settings?.showForm ?? true} onChange={(v) => setNewsletterState((n) => ({ ...n, settings: { ...n.settings, showForm: v } }))} />
          <ToggleRow label="Show disclaimer" checked={newsletterState.settings?.showDisclaimer ?? true} onChange={(v) => setNewsletterState((n) => ({ ...n, settings: { ...n.settings, showDisclaimer: v } }))} />
          <div className="sm:col-span-2">
            <TextAreaField label="Description" value={newsletterState.description} onChange={(v) => setNewsletterState((n) => ({ ...n, description: v }))} />
          </div>
          <div className="sm:col-span-2">
            <TextAreaField label="Disclaimer" value={newsletterState.disclaimer} onChange={(v) => setNewsletterState((n) => ({ ...n, disclaimer: v }))} />
          </div>
        </div>
      </Panel>

      <Panel title="Footer" description="Footer blurb and locale line.">
        <div className="space-y-4">
          <TextAreaField label="Blurb" value={blurb} onChange={setBlurb} />
          <Field label="Locale line" value={locale} onChange={setLocale} />
        </div>
      </Panel>

      <div className="sticky bottom-4 flex items-center justify-between gap-4 rounded-card border border-border bg-surface/90 p-4 backdrop-blur-xl">
        <div className="text-xs text-muted">
          {saved && !pending ? (
            <span className="inline-flex items-center gap-1.5 text-gold">
              <Check className="size-4" strokeWidth={2} /> Saved - storefront updated
            </span>
          ) : (
            <span>Editing content for {clientId}.</span>
          )}
        </div>
        <AdminButton onClick={save} disabled={pending}>
          <Save className="size-3.5" strokeWidth={1.75} /> {pending ? "Saving..." : "Save content"}
        </AdminButton>
      </div>
    </div>
  );
}
