"use client";

import { type ReactNode, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Admin-only form controls. These are part of the admin LAYER — they reuse the
 * existing design tokens (bg-surface, border-border, text-gold, …) but never
 * modify the storefront design system or its components.
 */

export function Panel({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-card border border-border bg-surface/50 p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-foreground">{title}</h2>
          {description && <p className="mt-1 text-xs text-muted">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-subtle">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-gold/50 focus:outline-none"
      />
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  placeholder = "/uploads/image.png or https://...",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File): Promise<void> {
    setUploading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("file", file);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: data,
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "Upload failed.");
      }

      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="block">
      <span className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-subtle">
        {label}
      </span>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-gold/50 focus:outline-none"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border px-4 text-xs font-semibold text-foreground transition-colors hover:border-gold/50 hover:text-gold disabled:pointer-events-none disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.currentTarget.value = "";
            if (file) void upload(file);
          }}
        />
      </div>
      {value ? (
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background/40 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="size-12 rounded-md object-cover" />
          <code className="min-w-0 truncate text-xs text-muted">{value}</code>
        </div>
      ) : null}
      {error ? <p className="mt-1.5 text-xs text-sale">{error}</p> : null}
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-subtle">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-subtle transition-colors focus:border-gold/50 focus:outline-none"
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-subtle">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground transition-colors focus:border-gold/50 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-background text-foreground">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const swatch = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : "#000000";
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-subtle">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={swatch}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`${label} colour picker`}
          className="size-10 shrink-0 cursor-pointer rounded-lg border border-border bg-background"
        />
        <input
          type="text"
          value={value}
          placeholder="#000000 or empty"
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 font-mono text-sm text-foreground placeholder:text-subtle transition-colors focus:border-gold/50 focus:outline-none"
        />
      </div>
    </label>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-gold" : "bg-border-strong",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 transform rounded-full bg-background transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

export function AdminButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
  title?: string;
}) {
  const variants = {
    primary: "bg-gold text-background hover:bg-gold-bright",
    ghost: "border border-border text-foreground hover:border-gold/50 hover:text-gold",
    danger: "border border-sale/40 text-sale hover:bg-sale/10",
  } as const;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-4 text-xs font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
      )}
    >
      {children}
    </button>
  );
}

export function IconAction({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-8 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-gold/50 hover:text-gold disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
