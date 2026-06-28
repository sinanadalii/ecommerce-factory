import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section heading: gold eyebrow, serif display title, optional supporting line. */
export function Heading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed text-muted", centered && "mx-auto max-w-xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
