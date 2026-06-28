import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centered page width + gutters (mirrors the product's Container). */
export function Container({
  as: Tag = "div",
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {children}
    </Tag>
  );
}
