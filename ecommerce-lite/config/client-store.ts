import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { ClientConfig } from "./types";
import { clients, type ClientKey } from "./active-client";

/**
 * CLIENT STORE - persistence behind the no-code admin.
 *
 * Cloudflare Workers use the CLIENT_CONFIGS KV binding. Plain Node.js/local
 * runs keep using .data/clients.json, so existing local development still works.
 */

const STORE_FILE = ".data/clients.json";
const KV_KEY = "client-overrides";

type Overrides = Partial<Record<ClientKey, ClientConfig>>;
type ClientConfigKV = Pick<KVNamespace, "get" | "put">;

async function getKvBinding(): Promise<ClientConfigKV | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as CloudflareEnv & { CLIENT_CONFIGS?: ClientConfigKV }).CLIENT_CONFIGS;

    if (!kv) {
      throw new Error(
        "Missing Cloudflare KV binding CLIENT_CONFIGS. Create a KV namespace and add it to wrangler.jsonc.",
      );
    }

    return kv;
  } catch (error) {
    if (error instanceof Error && error.message.includes("CLIENT_CONFIGS")) {
      throw error;
    }

    return null;
  }
}

async function readFileOverrides(): Promise<Overrides> {
  const [{ promises: fs }, path] = await Promise.all([import("node:fs"), import("node:path")]);

  try {
    const raw = await fs.readFile(path.join(process.cwd(), STORE_FILE), "utf8");
    return JSON.parse(raw) as Overrides;
  } catch {
    return {};
  }
}

async function writeFileOverrides(overrides: Overrides): Promise<void> {
  const [{ promises: fs }, path] = await Promise.all([import("node:fs"), import("node:path")]);
  const target = path.join(process.cwd(), STORE_FILE);

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, JSON.stringify(overrides, null, 2), "utf8");
}

async function readOverrides(): Promise<Overrides> {
  const kv = await getKvBinding();
  if (!kv) return readFileOverrides();

  const raw = await kv.get(KV_KEY);
  return raw ? (JSON.parse(raw) as Overrides) : {};
}

async function writeOverrides(overrides: Overrides): Promise<void> {
  const kv = await getKvBinding();
  if (!kv) {
    await writeFileOverrides(overrides);
    return;
  }

  await kv.put(KV_KEY, JSON.stringify(overrides));
}

/** The live config for a tenant: admin override if present, else the seed. */
export async function getEffectiveClient(key: ClientKey): Promise<ClientConfig> {
  const overrides = await readOverrides();
  return overrides[key] ?? clients[key];
}

/** All tenants' live configs for the admin dashboard. */
export async function getAllEffectiveClients(): Promise<Record<ClientKey, ClientConfig>> {
  const overrides = await readOverrides();
  const out = {} as Record<ClientKey, ClientConfig>;

  for (const key of Object.keys(clients) as ClientKey[]) {
    out[key] = overrides[key] ?? clients[key];
  }

  return out;
}

/** True when a tenant currently has an admin override. */
export async function isOverridden(key: ClientKey): Promise<boolean> {
  const overrides = await readOverrides();
  return overrides[key] !== undefined;
}

/** Persist a full config override for a tenant. */
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
