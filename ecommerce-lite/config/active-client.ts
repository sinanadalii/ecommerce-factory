import type { ClientConfig } from "./types";
import { clientA } from "@/clients/client-a";
import { clientB } from "@/clients/client-b";
import { clientC } from "@/clients/client-c";
import { demoMaisonNoir } from "@/clients/demo-maison-noir";
import { demoLumen } from "@/clients/demo-lumen";
import { demoTerraAsh } from "@/clients/demo-terra-ash";
// @factory:imports  (created-store imports are added above this line by `npm run create-store`)

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CLIENT REGISTRY — the set of stores the system can serve.  [FROZEN v1]
 *
 * Two clearly separated environments share one registry but never one another's
 * routing (see config/tenant-resolver.ts):
 *   • PRODUCTION stores — real, host-routed (client-a/-b/-c, and any you create).
 *   • DEMO stores       — showcase only; served explicitly via demo mode, never
 *                         in the production flow. Their keys start with `demo-`.
 *
 * Add a store with `npm run create-store "<name>"` (it edits this file for you).
 * ═══════════════════════════════════════════════════════════════════════════
 */
export const clients = {
  // Production stores
  "client-a": clientA, // MAISON NOIR — luxury womenswear
  "client-b": clientB, // LUMEN        — fine watches & jewelry
  "client-c": clientC, // TERRA & ASH  — home fragrance & objects
  // Demo stores (showcase only)
  "demo-maison-noir": demoMaisonNoir, // Fashion
  "demo-lumen": demoLumen, //            Tech
  "demo-terra-ash": demoTerraAsh, //     Home / Lifestyle
  // @factory:stores  (created stores are added above this line)
} satisfies Record<string, ClientConfig>;

/** Every store key, derived from the registry above (single source of truth). */
export type ClientKey = keyof typeof clients;

/** Last-resort fallback when no host matches and no override is set. */
export const DEFAULT_CLIENT: ClientKey = "client-a";

/** Narrowing guard for arbitrary strings (env values, host lookups). */
export function isClientKey(value: string | undefined | null): value is ClientKey {
  return value != null && value in clients;
}

/** A demo (showcase-only) store — by convention its key starts with `demo-`. */
export function isDemoKey(key: ClientKey): boolean {
  return key.startsWith("demo-");
}
