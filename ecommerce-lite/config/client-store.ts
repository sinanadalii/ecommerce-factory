import { promises as fs } from "node:fs";
import path from "node:path";
import type { ClientConfig } from "./types";
import { clients, type ClientKey } from "./active-client";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CLIENT STORE — the simple persistence layer behind the no-code admin.
 *
 * The "effective" config for a tenant is: the admin-saved override if one
 * exists, otherwise the static seed from clients/*.ts. Overrides are persisted
 * to a local JSON file (no backend) and read fresh per request, so an admin
 * save reflects on the storefront on the very next request.
 *
 * Server-only by construction (uses node:fs and is imported only from server
 * components / server actions — never from client components or the ui kit).
 * ═══════════════════════════════════════════════════════════════════════════
 */

const STORE_FILE = path.join(process.cwd(), ".data", "clients.json");

type Overrides = Partial<Record<ClientKey, ClientConfig>>;

async function readOverrides(): Promise<Overrides> {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf8");
    return JSON.parse(raw) as Overrides;
  } catch {
    // No file yet → no overrides.
    return {};
  }
}

async function writeOverrides(overrides: Overrides): Promise<void> {
  await fs.mkdir(path.dirname(STORE_FILE), { recursive: true });
  await fs.writeFile(STORE_FILE, JSON.stringify(overrides, null, 2), "utf8");
}

/** The live config for a tenant: admin override if present, else the seed. */
export async function getEffectiveClient(key: ClientKey): Promise<ClientConfig> {
  const overrides = await readOverrides();
  return overrides[key] ?? clients[key];
}

/** All tenants' live configs (for the admin dashboard). Registry-derived, so it
 *  stays exhaustive as tenants (e.g. the Demo Store Pack) are added. */
export async function getAllEffectiveClients(): Promise<Record<ClientKey, ClientConfig>> {
  const overrides = await readOverrides();
  const out = {} as Record<ClientKey, ClientConfig>;
  for (const key of Object.keys(clients) as ClientKey[]) {
    out[key] = overrides[key] ?? clients[key];
  }
  return out;
}

/** True when a tenant currently has an admin override (vs. the pristine seed). */
export async function isOverridden(key: ClientKey): Promise<boolean> {
  const overrides = await readOverrides();
  return overrides[key] !== undefined;
}

/** Persist a full config override for a tenant (called by admin server actions). */
export async function saveClient(key: ClientKey, config: ClientConfig): Promise<void> {
  const overrides = await readOverrides();
  await writeOverrides({ ...overrides, [key]: config });
}

/** Drop a tenant's override, reverting it to the static seed. */
export async function resetClient(key: ClientKey): Promise<void> {
  const overrides = await readOverrides();
  if (overrides[key] === undefined) return;
  const next = { ...overrides };
  delete next[key];
  await writeOverrides(next);
}
