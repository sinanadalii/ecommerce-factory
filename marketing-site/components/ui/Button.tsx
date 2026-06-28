import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "gold" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs rounded-[6px]",
  md: "h-11 px-6 text-sm rounded-[7px]",
  lg: "h-14 px-8 text-sm rounded-[8px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] hover:shadow-[0_18px_50px_-18px_rgba(244,241,234,0.45)]",
  gold: "bg-gold text-background hover:bg-gold-bright shadow-[0_18px_50px_-20px_rgba(199,169,107,0.7)]",
  secondary:
    "border border-border-strong bg-white/[0.02] text-foreground hover:border-gold/50 hover:bg-white/[0.05]",
  ghost: "text-foreground hover:text-gold",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (CommonProps &
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
        href?: undefined;
      })
  | (CommonProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
        href: string;
      });

/** Polymorphic CTA — same component the product ships. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
