import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CategoriesProps } from "@/config/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Editorial category grid. Featured tiles span two columns on desktop to break
 * the rhythm; every tile hover-zooms its image and reveals an arrow affordance.
 *
 * Content (heading + tiles) is injected via `CategoriesProps`.
 */
export function Categories({ heading, items }: CategoriesProps) {
  return (
    <Section id="categories">
      <SectionHeading {...heading} />

      <div className="mt-12 grid auto-rows-[14rem] grid-cols-2 gap-4 sm:auto-rows-[18rem] lg:grid-cols-4">
        {items.map((cat) => (
          <a
            key={cat.id}
            href="#featured"
            className={cn(
              "group relative overflow-hidden rounded-card bg-surface",
              cat.featured && "lg:col-span-2",
            )}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes={cat.featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent transition-opacity duration-300 group-hover:from-background/90" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <h3 className="font-serif text-xl font-medium text-foreground sm:text-2xl">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-muted">{cat.itemCount} pieces</p>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-background/50 text-foreground backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-background">
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
