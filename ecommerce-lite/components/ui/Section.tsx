import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  as?: ElementType;
  children: ReactNode;
  /** Classes for the outer element (backgrounds, vertical padding overrides). */
  className?: string;
  /** Classes for the inner max-width container. */
  containerClassName?: string;
  /** Drop the default container to render full-bleed content. */
  bleed?: boolean;
};

/**
 * Layout primitive that enforces consistent vertical rhythm: a full-bleed outer
 * element with mobile-first padding, wrapping a centered Container. Every
 * homepage section composes from this so spacing stays uniform.
 */
export function Section({
  id,
  as: Tag = "section",
  children,
  className,
  containerClassName,
  bleed = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("relative w-full scroll-mt-24 py-16 sm:py-20 lg:py-28", className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </Tag>
  );
}
