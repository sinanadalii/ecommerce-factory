import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  /** Optional "view all" style link, right-aligned on desktop. */
  action?: { label: string; href: string };
  align?: "left" | "center";
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
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
        )}
      </div>

      {action && (
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
