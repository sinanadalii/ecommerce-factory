import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

type PriceProps = {
  value: number;
  /** Original price; when higher than `value` it renders struck-through. */
  compareAt?: number;
  className?: string;
  size?: "sm" | "md";
};

/**
 * Price display with optional compare-at price. The sale price is tinted gold
 * so discounts read as a premium offer rather than a clearance shout.
 */
export function Price({ value, compareAt, className, size = "md" }: PriceProps) {
  const onSale = compareAt !== undefined && compareAt > value;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-medium tabular-nums",
          size === "md" ? "text-base" : "text-sm",
          onSale ? "text-gold" : "text-foreground",
        )}
      >
        {formatPrice(value)}
      </span>
      {onSale && (
        <span
          className={cn(
            "tabular-nums text-subtle line-through",
            size === "md" ? "text-sm" : "text-xs",
          )}
        >
          {formatPrice(compareAt)}
        </span>
      )}
    </div>
  );
}
