"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail } from "lucide-react";
import type { NewsletterProps, TextAlign, TextScale } from "@/config/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * Newsletter capture. Mock submit — validates a non-empty email and swaps to a
 * success state. All copy arrives via `NewsletterProps`; wire `onSubmit` to your
 * ESP (Klaviyo, Mailchimp, etc.).
 */
export function Newsletter({
  title,
  description,
  placeholder,
  submitLabel,
  successMessage,
  disclaimer,
  settings,
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const textAlign = settings?.textAlign ?? "center";
  const titleSize = settings?.titleSize ?? "default";
  const showIcon = settings?.showIcon ?? true;
  const showForm = settings?.showForm ?? true;
  const showDisclaimer = settings?.showDisclaimer ?? true;
  const alignClasses: Record<TextAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  const titleClasses: Record<TextScale, string> = {
    compact: "text-2xl sm:text-3xl",
    default: "text-3xl sm:text-4xl",
    large: "text-4xl sm:text-5xl",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <Section id="newsletter">
      <div className="relative overflow-hidden rounded-[24px] border border-border bg-surface px-6 py-14 text-center sm:px-12 lg:py-20">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 size-[28rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold/10 blur-[120px]" />
        </div>

        <div className={cn("relative mx-auto max-w-xl", alignClasses[textAlign])}>
          {showIcon && (
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-gold/30 bg-gold-dim text-gold">
              <Mail className="size-5" strokeWidth={1.5} />
            </span>
          )}
          <h2 className={cn("font-serif font-medium leading-tight text-foreground", showIcon ? "mt-6" : "", titleClasses[titleSize])}>
            {title}
          </h2>
          <p className={cn("mt-4 max-w-md text-base leading-relaxed text-muted", textAlign === "center" && "mx-auto", textAlign === "right" && "ml-auto")}>
            {description}
          </p>

          {submitted && showForm ? (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold-dim px-6 py-3.5 text-sm font-medium text-foreground">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-gold text-background">
                <Check className="size-4" strokeWidth={2.5} />
              </span>
              {successMessage}
            </div>
          ) : showForm ? (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="h-14 flex-1 rounded-[8px] border border-border bg-background px-5 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-gold/50 focus:outline-none"
              />
              <Button type="submit" variant="gold" size="lg">
                {submitLabel}
              </Button>
            </form>
          ) : null}

          {showDisclaimer && <p className="mt-4 text-xs text-subtle">{disclaimer}</p>}
        </div>
      </div>
    </Section>
  );
}
