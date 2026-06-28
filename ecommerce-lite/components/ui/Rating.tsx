import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingProps = {
  value: number; // 0–5
  reviewCount?: number;
  className?: string;
  /** Hide the numeric "(214)" count, e.g. in compact cards. */
  hideCount?: boolean;
};

/**
 * Five-star rating display. Whole stars fill to the rounded value; the exact
 * score and review count sit alongside for credibility.
 */
export function Rating({ value, reviewCount, className, hideCount }: RatingProps) {
  const filled = Math.round(value);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < filled ? "fill-gold text-gold" : "fill-transparent text-subtle",
            )}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-muted">
        {value.toFixed(1)}
        {!hideCount && reviewCount !== undefined && (
          <span className="text-subtle"> ({reviewCount})</span>
        )}
      </span>
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5
        {reviewCount !== undefined ? ` from ${reviewCount} reviews` : ""}
      </span>
    </div>
  );
}
