import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "gold" | "sale" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-background/80 text-foreground backdrop-blur-sm",
  gold: "bg-gold text-background",
  sale: "bg-sale text-white",
  outline: "border border-border-strong bg-background/60 text-foreground backdrop-blur-sm",
};

type BadgeProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

/**
 * Small pill label — product flags ("New", "Bestseller"), discount tags, etc.
 * Uppercase, letter-spaced for the editorial luxury feel.
 */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
