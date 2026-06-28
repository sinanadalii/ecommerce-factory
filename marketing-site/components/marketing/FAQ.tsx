"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Heading } from "./Heading";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border py-20 sm:py-28">
      <Container>
        <Heading
          eyebrow="FAQ"
          title="Questions buyers ask"
          description="Still unsure? Reach out — we'd rather you buy with confidence."
        />

        <div className="mx-auto mt-12 max-w-2xl divide-y divide-border rounded-card border border-border bg-surface/30">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-medium text-foreground">{item.q}</span>
                  <Plus
                    className={cn(
                      "size-4 shrink-0 text-gold transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
