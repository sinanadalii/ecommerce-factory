import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { TextAlign, TextScale } from "@/config/types";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  /** Optional "view all" style link, right-aligned on desktop. */
  action?: { label: string; href: string };
  align?: TextAlign;
  titleSize?: TextScale;
  descriptionSize?: TextScale;
  showAction?: boolean;
  className?: string;
};

/**
 * The recurring section header: small gold eyebrow, serif display title, an
 * optional supporting line, and an optional inline action link. Reused by every
 * section so headings stay visually consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  titleSize = "default",
  descriptionSize = "default",
  showAction = true,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const right = align === "right";
  const titleClasses: Record<TextScale, string> = {
    compact: "text-2xl sm:text-3xl lg:text-4xl",
    default: "text-3xl sm:text-4xl lg:text-[2.75rem]",
    large: "text-4xl sm:text-5xl lg:text-[3.35rem]",
  };
  const descriptionClasses: Record<TextScale, string> = {
    compact: "text-sm",
    default: "text-base",
    large: "text-lg",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center",
        right && "sm:flex-row-reverse",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center", right && "ml-auto text-right")}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className={cn("font-serif font-medium leading-[1.1] tracking-tight text-foreground", titleClasses[titleSize])}>
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 leading-relaxed text-muted", descriptionClasses[descriptionSize])}>{description}</p>
        )}
      </div>

      {action && showAction && (
        <a
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-gold"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </a>
      )}
    </div>
  );
}
