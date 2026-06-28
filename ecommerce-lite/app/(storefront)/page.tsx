import type { ComponentType } from "react";
import { getActiveClient } from "@/config/tenant";
import { sectionRegistry } from "@/templates/registry";

/**
 * Homepage — resolved per request. The active store is derived from the request
 * host (config/tenant.ts → resolver → effective store), so different hosts (and
 * any admin edits) render here with no code changes. Pure composition glue.
 */
export default async function HomePage() {
  const { pages, content } = await getActiveClient();

  return (
    <>
      {pages.home.sections
        .filter((section) => section.enabled)
        .map((section) => {
          // Registry + content are both keyed by SectionKey and stay in sync via
          // SectionPropsMap; the cast is only to spread the per-key union here.
          const Section = sectionRegistry[section.key] as ComponentType<
            Record<string, unknown>
          >;
          const props = content[section.key] as Record<string, unknown>;
          return <Section key={section.key} {...props} />;
        })}
    </>
  );
}
