import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  /** Accessible label — required since the button is icon-only. */
  label: string;
  children: ReactNode;
  /** Optional numeric badge (cart / wishlist counts). */
  count?: number;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label">;

/**
 * Circular icon-only action used in the header (search, wishlist, cart, menu).
 * Renders an accessible label and an optional count chip.
 */
export function IconButton({
  label,
  children,
  count,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors duration-200 hover:bg-white/[0.06] hover:text-gold",
        className,
      )}
      {...rest}
    >
      {children}
      {count !== undefined && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-[1.1rem] items-center justify-center rounded-full bg-gold px-1 text-[0.625rem] font-bold leading-[1.1rem] text-background">
          {count}
        </span>
      )}
    </button>
  );
}
