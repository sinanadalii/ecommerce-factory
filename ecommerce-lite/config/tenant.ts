import { headers } from "next/headers";
import type { ClientConfig } from "./types";
import type { ClientKey } from "./active-client";
import { resolveClientKey } from "./tenant-resolver";
import { getEffectiveClient } from "./client-store";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TENANT (runtime adapter) — resolves the active store for the CURRENT request.
 *
 * Reading the request host via `headers()` opts the route into dynamic
 * rendering, so the same deployment serves a different store per host
 * (true multi-tenancy) — no rebuild, no hardcoded client.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/** Read the incoming request host (proxy-aware: X-Forwarded-Host wins). */
async function getRequestHost(): Promise<string | null> {
  const h = await headers();
  return h.get("x-forwarded-host") ?? h.get("host");
}

/**
 * The single runtime entry point: the active store for this request.
 *
 * Resolution (host → key) is unchanged; the key is then mapped to its EFFECTIVE
 * config via the client store — i.e. the admin-edited override if one exists,
 * else the static seed. This is what makes admin edits appear instantly.
 */
export async function getActiveClient(): Promise<ClientConfig> {
  const key = resolveClientKey(await getRequestHost());
  return getEffectiveClient(key);
}

/** The active tenant key for this request (diagnostics / debugging). */
export async function getActiveClientKey(): Promise<ClientKey> {
  return resolveClientKey(await getRequestHost());
}
